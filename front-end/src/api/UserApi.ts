import BaseApi from "./BaseApi";
import UserResponseResource from "../../../commons/dist/resources/user/UserResponseResource";
import UserCreateRequestResource from "../../../commons/dist/resources/user/UserCreateRequestResource";

export default class UserApi extends BaseApi {
	private static instance: UserApi;

	private apiUrl: string = `${this.baseApiUrl}/users`;

	public static getInstance(): UserApi {
		if (!UserApi.instance) {
			UserApi.instance = new UserApi();
		}

		return UserApi.instance;
	}

	public async getAll() {
		return this.getRequest<UserResponseResource[]>(this.apiUrl);
	}

	public createUser(body: UserCreateRequestResource) {
		return this.postRequest<UserResponseResource>(this.apiUrl, {
			...body,
		});
	}

	public findByEmail(email: string) {
		return this.getRequest<{ exists: boolean }>(`${this.apiUrl}/email/${email}`);
	}
}
