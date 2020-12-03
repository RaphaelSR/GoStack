import AddAvatarFieldToUsers1600791313466 from '../shared/infra/database/migrations/1600791313466-AddAvatarFieldToUsers';
import User from '../modules/users/infra/typeorm/entities/User';

// Retira o password da resposta.

export default class UserMap {
	public static toDTO(user: User): Omit<User, 'password'> {
		return {
			id: user.id,
			name: user.name,
			email: user.email,
			avatar: user.avatar,
			created_at: user.created_at,
			updated_at: user.updated_at,
		};
	}
}