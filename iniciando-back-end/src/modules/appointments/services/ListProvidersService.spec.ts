import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import ListProvidersService from './ListProvidersService';

let fakeUsersRepository: FakeUsersRepository;

let listProviders: ListProvidersService;

describe('ListProviders', () => {
    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository();

        listProviders = new ListProvidersService(fakeUsersRepository);
    });

    it('shold be able to list the providers', async () => {
        const user1 = await fakeUsersRepository.create({
            name: 'Rod Andrade',
            email: 'rod@teste.com',
            password: '123456',
        });

        const user2 = await fakeUsersRepository.create({
            name: 'Gleyce Andrade',
            email: 'gleyce@teste.com',
            password: '123456',
        });

        const loggedUser = await fakeUsersRepository.create({
            name: 'Renan Andrade',
            email: 'renan@teste.com',
            password: '123456',
        });

        const providers = await listProviders.execute({
            user_id: loggedUser.id,
        });
        expect(providers).toEqual([user1, user2]);
    });
});