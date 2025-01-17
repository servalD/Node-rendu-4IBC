"use client";
import { http, createConfig } from "wagmi";
import { mainnet, sepolia } from "wagmi/chains";
import { coinbaseWallet } from "wagmi/connectors";
export default createConfig({
	chains: [mainnet, sepolia],
	connectors: [coinbaseWallet()],
	transports: {
		[mainnet.id]: http(),
		[sepolia.id]: http(),
	},
});
