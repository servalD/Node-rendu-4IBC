import { Expose } from "class-transformer";
import Resource from "../../Resource";
import { IsEmail, IsNotEmpty, MinLength } from "class-validator";
import CustomAsync from "../../decorators/CustomAsync";
import Di from "../../injectables/Di";

export default class UserCreateRequestResource extends Resource {
  @Expose()
  @IsEmail()
  @CustomAsync(
    (email: string) => {
      return Di.getUserService().isUniqueEmail(email);
    },
    {
      message: "Email already exists",
    }
  )
  public email!: string;

  @Expose()
  @MinLength(6)
  public name!: string;

  @Expose()
  @MinLength(6)
  public firstName!: string;

  @Expose()
  @IsNotEmpty()
  public password!: string;
}
