"use client";

import React from "react";
import { WagmiProvider } from "wagmi";
import WagmiConfig from "../../../app/WagmiConfig";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function Providers({ children }: { children: React.ReactNode }) {
	return (
		<QueryClientProvider client={queryClient}>
			<WagmiProvider config={WagmiConfig}>{children}</WagmiProvider>
		</QueryClientProvider>
	);
}
