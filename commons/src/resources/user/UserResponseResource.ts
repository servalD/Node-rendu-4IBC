import { Expose, Type } from "class-transformer";
import Resource from "../../Resource";
import PostsResponseResource from "../posts/PostsResponseResource";

export default class UserResponseResource extends Resource {
  @Expose()
  public email!: string;

  @Expose()
  public name!: string;

  @Expose()
  public firstName!: string;

  @Expose()
  @Type(() => PostsResponseResource)
  public posts?: PostsResponseResource[];
}
