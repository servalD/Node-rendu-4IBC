import BaseApi from "./BaseApi";
import NftCollectionResponseResource from "../../../commons/dist/resources/nfts/NftCollectionResponseResource";
import { Address } from "viem";

export default class CollectionApi extends BaseApi {
	private static instance: CollectionApi;

	private apiUrl: string = `${this.baseApiUrl}/collections`;

	public static getInstance(): CollectionApi {
		if (!CollectionApi.instance) {
			CollectionApi.instance = new CollectionApi();
		}

		return CollectionApi.instance;
	}

	public async getAll() {
		return this.getRequest<NftCollectionResponseResource[]>(this.apiUrl);
	}

	public async getByAddress(address: Address) {
		return this.getRequest<NftCollectionResponseResource>(
			`${this.apiUrl}/${address}`,
		);
	}
}
