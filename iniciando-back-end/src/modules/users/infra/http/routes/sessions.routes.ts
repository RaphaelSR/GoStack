import {Router} from 'express';
import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';
import UserMap from '@modules/users/config/mappers/UserMap';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
   
        const {email, password} = request.body;

        const authenticateUser = new AuthenticateUserService();

       const { user, token } = await authenticateUser.execute({
            email,
            password,
        })

        const mappedUser = UserMap.toDTO(user);

        return response.json({ mappedUser, token });

});

export default sessionsRouter;