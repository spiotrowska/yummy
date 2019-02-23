export class AuthUserModel {
	public token: string;
	public isLogged?: boolean;

	constructor() {
		this.isLogged = false;
	}
}
