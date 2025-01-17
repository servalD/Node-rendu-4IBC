import UserServiceClassToken from "./UserServiceClassToken";

export default abstract class Di {
  private static userService: UserServiceClassToken;

  public static getUserService() {
    if (!this.userService) throw new Error("UserService not found");
    return this.userService;
  }

  public static setUserService(userService: UserServiceClassToken) {
    this.userService = userService;
  }
}
