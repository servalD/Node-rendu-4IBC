import UserCreateRequestResource from "../../../commons/dist/resources/user/UserCreateRequestResource";
import DbClient from "../databases/DbClient";

export default class UserService {
  private static userService: UserService;

  public static getInstance() {
    if (!this.userService) {
      this.userService = new UserService();
    }

    return this.userService;
  }

  private dbClient: DbClient = DbClient.getInstance();

  public async isUniqueEmail(email: string) {
    const user = await this.dbClient.user.findFirst({
      where: {
        email,
      },
    });

    return !user;
  }

  public async getAll() {
    const users = await this.dbClient.user.findMany({
      include: {
        posts: true,
      },
    });
    console.log(users);
    return users;
  }

  public getById(id: number) {
    return this.dbClient.user.findUnique({
      where: {
        id,
      },
      include: {
        posts: true,
      },
    });
  }

  public create(user: UserCreateRequestResource) {
    return this.dbClient.user.create({
      data: {
        ...user,
        blockchainAddress: "",
      },
    });
  }
}
