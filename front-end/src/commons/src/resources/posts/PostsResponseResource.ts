import { Expose, Type } from "class-transformer";
import UserResponseResource from "../user/UserResponseResource";

export default class PostsResponseResource {
  @Expose()
  public id!: number;

  @Expose()
  public title!: string;

  @Expose()
  public content!: string;

  @Expose()
  public author!: string;

  @Expose()
  public createdAt!: Date;

  @Expose()
  public updatedAt!: Date;

  @Expose()
  public published!: boolean;

  @Expose()
  @Type(() => UserResponseResource)
  public user?: UserResponseResource;
}
