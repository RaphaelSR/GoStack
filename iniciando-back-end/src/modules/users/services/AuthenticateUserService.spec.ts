import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import AuthenticateUserService from './AuthenticateUserService';
import CreateUserService from './CreateUserService';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUser: CreateUserService;
let authenticcaUser: AuthenticateUserService;

describe('AuthenticateUser', () => {
    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository();
        fakeHashProvider = new FakeHashProvider();

        createUser = new CreateUserService(
            fakeUsersRepository,
            fakeHashProvider,
        );
        authenticcaUser = new AuthenticateUserService(
            fakeUsersRepository,
            fakeHashProvider,
        );
    });

    it('shold be able to authenticate', async () => {
        const user = await createUser.execute({
            name: 'Rod Andrade',
            email: 'rod@teste.com',
            password: '123456',
        });

        const response = await authenticcaUser.execute({
            email: 'rod@teste.com',
            password: '123456',
        });
        expect(response).toHaveProperty('token');
        expect(response.user).toEqual(user);
    });

    it('shold not be able to authenticate with non existing user', async () => {
        await expect(
            authenticcaUser.execute({
                email: 'rod@teste.com',
                password: '123456',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('shold not be able to authenticate withwrong password', async () => {
        await createUser.execute({
            name: 'Rod Andrade',
            email: 'rod@teste.com',
            password: '123456',
        });

        await expect(
            authenticcaUser.execute({
                email: 'rod@teste.com',
                password: 'wrong-password',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});