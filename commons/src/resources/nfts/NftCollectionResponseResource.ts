import { Expose, Type } from "class-transformer";
import Resource from "../../Resource";
import NftTokenResponseResource from "./NftTokenResponseResource";

export default class NftCollectionResponseResource extends Resource {
  @Expose()
  public id!: string;

  @Expose()
  public name!: string;

  @Expose()
  public symbol!: string;

  @Expose()
  public contractAddress!: string;

  @Expose()
  @Type(() => NftTokenResponseResource)
  public tokens!: NftTokenResponseResource[];

  @Expose()
  public createdAt!: Date;

  @Expose()
  public updatedAt!: Date;
}
