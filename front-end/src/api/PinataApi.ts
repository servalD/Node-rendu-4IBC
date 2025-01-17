export default class PinataApi {
	private static instance: PinataApi;

	private apiUrl: string = `https://black-marginal-catfish-869.mypinata.cloud/ipfs/`;

	public static getInstance(): PinataApi {
		if (!PinataApi.instance) {
			PinataApi.instance = new PinataApi();
		}

		return PinataApi.instance;
	}

	public async get(ipfsUrl: string) {
		return this.getRequest(this.apiUrl + ipfsUrl);
	}

	public async getImage(ipfsUrl: string) {
		return this.getImageRequest(this.apiUrl + ipfsUrl);
	}

	protected async getRequest(url: string) {
		const headers = new Headers();
		headers.set("Accept", "text/plain");

		return fetch(url, {
			method: "GET",
			headers: headers,
		})
			.then((response) => {
				if (response.ok) {
					return response.text();
				}
				throw new Error(response.statusText);
			})
			.catch((e) => {
				throw e;
			});
	}

	protected async getImageRequest(url: string) {
		return fetch(url)
			.then((response) => {
				if (response.ok) {
					return response.blob();
				}
				throw new Error(response.statusText);
			})
			.catch((e) => {
				throw e;
			});
	}
}
