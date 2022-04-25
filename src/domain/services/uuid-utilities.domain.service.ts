import { v4 as uuidv4, NIL as NIL_UUID, validate as uuidValidate } from 'uuid';

export const IsValidUUID = (uuid: string | null): boolean => {
	if (uuid === undefined || uuid === null || uuid.trim().length === 0 || uuid.trim() === NIL_UUID || !uuidValidate(uuid)) {
		return false;
	} else {
		return true;
	}
}
export const GetEmptyUUID = (): string => {
	return NIL_UUID;
}
export const GetNewUUID = (): string => {
	const uuid = uuidv4();
	return uuid;
}