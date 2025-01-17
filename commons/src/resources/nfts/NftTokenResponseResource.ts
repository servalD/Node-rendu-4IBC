import { Expose } from "class-transformer";
import Resource from "../../Resource";

export default class NftTokenResponseResource extends Resource {
  @Expose()
  public id!: string;

  @Expose()
  public tokenId!: string;

  @Expose()
  public name!: string;

  @Expose()
  public description!: string;

  @Expose()
  public image!: string;

  @Expose()
  public createdAt!: Date;

  @Expose()
  public updatedAt!: Date;
}
