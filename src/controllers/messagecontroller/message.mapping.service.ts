import { MessageModel } from './message.model';
import { Message } from '../../domain/entities/message.domain.entity';

export const MapDomainToModels = (entities: Array<Message>): Array<MessageModel> => {
	const models: Array<MessageModel> = new Array<MessageModel>();
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

export const MapDomainToModel = (entity: Message | null): MessageModel | null => {
	if (entity) {
		const model: MessageModel = {
			id: entity.id,
			messagedate: entity.messagedate,
			messagetext: entity.messagetext,
			userid: entity.userid	
		};
		return model;
	} else {
		return null;
	}
};