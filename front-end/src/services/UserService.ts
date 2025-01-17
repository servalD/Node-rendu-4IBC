import UserApi from "@/api/UserApi";
import UserServiceClassToken from "../commons/src/injectables/UserServiceClassToken";

export default class UserService implements UserServiceClassToken {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	isUniqueEmail(email: string): Promise<boolean> {
		return UserApi.getInstance()
			.findByEmail(email)
			.then((response) => {
				return !response.exists;
			});
	}
}
