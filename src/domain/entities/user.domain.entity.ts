export interface IUser {
	id: string,
	firstname: string,
	lastname: string,
	email: string | null,
	mobilephone: string | null,
	loginid: string,
	passwordhash: string | null,
	salt: string | null
}
export class User implements IUser {
	public id: string;
	public firstname: string;
	public lastname: string;
	public email: string | null;
	public mobilephone: string | null;
	public loginid: string;
	public passwordhash: string | null;
	public salt: string | null;
	public get fullname(): string {
		const name = (this.firstname ?? '').trim() + ' ' + (this.lastname ?? '').trim();
		return name.trim();
	}
	
	constructor(id: string, firstname: string, lastname: string, email: string | null, mobilephone: string | null, loginid: string, 
		passwordhash: string | null, salt: string | null) {
			
		this.id = id;
		this.firstname = firstname;
		this.lastname = lastname;
		this.email = email;
		this.mobilephone = mobilephone;
		this.loginid = loginid;
		this.passwordhash = passwordhash;
		this.salt = salt;
	}
}