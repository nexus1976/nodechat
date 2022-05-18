import { UserModel } from './user.model';
import { User } from '../../domain/entities/user.domain.entity';

export const MapDomainToModels = (entities: Array<User>): Array<UserModel> => {
	const models: Array<UserModel> = new Array<UserModel>();
	if (entities && entities.length && entities.length > 0) {
		entities.forEach(entity => {
			if (entity) {
				const model = MapDomainToModel(entity);
				if (model) {
					models.push(model);
				}
			}
		});
	}
	return models;
};

export const MapDomainToModel = (entity: User | null): UserModel | null => {
	if (entity) {
		const model: UserModel = {
			id: entity.id,
			email: entity.email,
			firstname: entity.firstname,
			lastname: entity.lastname,
			loginid: entity.loginid,
			mobilephone: entity.mobilephone
		};
		return model;
	} else {
		return null;
	}
};
