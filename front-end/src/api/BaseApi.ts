import ModuleConfig from "@/config";

export enum ContentType {
	Json = "application/json",
	FormData = "multipart/form-data",
}

export default abstract class BaseApi {
	protected readonly baseApiUrl = ModuleConfig.getInstance().getConfig().apiUrl;
	protected buildHeaders(contentType: ContentType) {
		const headers = new Headers();
		headers.set("Content-Type", contentType);
		return headers;
	}

	protected buildBody(body: { [key: string]: unknown }): string {
		return JSON.stringify(body);
	}

	protected async processResponse<T>(response: Response): Promise<T> {
		let responseContent: unknown;

		if (response.headers.get("content-type")?.includes(ContentType.Json)) {
			responseContent = await response.json();
		} else {
			responseContent = await response.text();
		}

		if (!response.ok) {
			return Promise.reject(responseContent);
		}

		return responseContent as T;
	}

	protected async getRequest<T>(url: string) {
		const request = async () => {
			return fetch(url, {
				method: "GET",
				headers: this.buildHeaders(ContentType.Json),
			});
		};

		return request().then((response) => this.processResponse<T>(response));
	}

	protected async postRequest<T>(url: string, body: { [key: string]: unknown }) {
		const request = async () => {
			return fetch(url, {
				method: "POST",
				headers: this.buildHeaders(ContentType.Json),
				body: this.buildBody(body),
			});
		};

		return request().then((response) => this.processResponse<T>(response));
	}
}
