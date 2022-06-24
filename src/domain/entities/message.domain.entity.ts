export interface IMessage {
	id: string | null,
	userid: string,
	messagedate: Date | null,
	messagetext: string
}

export class Message {
	public id: string | null;
	public userid: string;
	public messagedate: Date | null;
	public messagetext: string;
	
	constructor(id: string | null, userid: string, messagedate: Date | null, messagetext: string) {
		this.id = id;
		this.userid = userid;
		this.messagedate = messagedate;
		this.messagetext = messagetext;
	}
}