import AppError from '@shared/errors/AppError';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import UpdateProfileService from './UpdateProfileService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let updateProfile: UpdateProfileService;

describe('UpdateProfile', () => {
    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository();
        fakeHashProvider = new FakeHashProvider();

        updateProfile = new UpdateProfileService(
            fakeUsersRepository,
            fakeHashProvider,
        );
    });

    it('shold be able to update the profile', async () => {
        const user = await fakeUsersRepository.create({
            name: 'Rod Andrade',
            email: 'rod@teste.com',
            password: '123456',
        });

        const updatedUser = await updateProfile.execute({
            user_id: user.id,
            name: 'Rod Carneiro',
            email: 'rodrigo@teste.com',
        });
        expect(updatedUser.name).toBe('Rod Carneiro');
        expect(updatedUser.email).toBe('rodrigo@teste.com');
    });

    it('shold be able to change to another user email', async () => {
        await fakeUsersRepository.create({
            name: 'Rod Andrade',
            email: 'rod@teste.com',
            password: '123456',
        });

        const user = await fakeUsersRepository.create({
            name: 'Test',
            email: 'test@teste.com',
            password: '123456',
        });

        await expect(
            updateProfile.execute({
                user_id: user.id,
                name: 'Rod Carneiro',
                email: 'rod@teste.com',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('shold be able to update the password', async () => {
        const user = await fakeUsersRepository.create({
            name: 'Rod Andrade',
            email: 'rod@teste.com',
            password: '123456',
        });

        const updatedUser = await updateProfile.execute({
            user_id: user.id,
            name: 'Rod Carneiro',
            email: 'rodrigo@teste.com',
            old_password: '123456',
            password: '123123',
        });
        expect(updatedUser.password).toBe('123123');
    });

    it('shold not be able to update the password without old password', async () => {
        const user = await fakeUsersRepository.create({
            name: 'Rod Andrade',
            email: 'rod@teste.com',
            password: '123456',
        });

        await expect(
            updateProfile.execute({
                user_id: user.id,
                name: 'Rod Carneiro',
                email: 'rodrigo@teste.com',
                password: '123123',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('shold not be able to update the password with wrong old password', async () => {
        const user = await fakeUsersRepository.create({
            name: 'Rod Andrade',
            email: 'rod@teste.com',
            password: '123456',
        });

        await expect(
            updateProfile.execute({
                user_id: user.id,
                name: 'Rod Carneiro',
                email: 'rodrigo@teste.com',
                password: '123123',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('shold not be able update the profile from non-existing user', async () => {
        expect(
            updateProfile.execute({
                user_id: 'non-existing-user-id',
                name: 'Test',
                email: 'test@example.com',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});