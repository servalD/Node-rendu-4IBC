import developmentConfig from "./development.json";
import stagingConfig from "./staging.json";
import productionConfig from "./production.json";

export default class ModuleConfig {
	private static instance: ModuleConfig;

	public static getInstance(): ModuleConfig {
		if (!ModuleConfig.instance) {
			ModuleConfig.instance = new ModuleConfig();
		}

		return ModuleConfig.instance;
	}

	private constructor() {
		this.setConfig();
	}

	private config: typeof developmentConfig = developmentConfig;

	public getConfig() {
		return this.config;
	}

	private setConfig() {
		switch (process.env["NEXT_PUBLIC_APP_ENV"]) {
			case "production":
				this.config = productionConfig;
				break;
			case "staging":
				this.config = stagingConfig;
				break;
		}
	}
}
