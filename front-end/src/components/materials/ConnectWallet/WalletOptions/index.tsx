"use client";
import { useEffect, useState } from "react";
import { Connector, useConnect } from "wagmi";
import classes from "./classes.module.scss"; // Import du fichier CSS

export function WalletOptions() {
	const { connectors, connect } = useConnect();

	return (
		<div className={classes["wallet-options"]}>
			<div className={classes["wallet-option-title"]}>Choose a Wallet</div>
			{connectors.map((connector) => (
				<WalletOption
					key={connector.id}
					connector={connector}
					onClick={() => {
						connect({ connector });
					}}
				/>
			))}
		</div>
	);
}

function WalletOption({
	connector,
	onClick,
}: {
	connector: Connector;
	onClick: () => void;
}) {
	const [ready, setReady] = useState(false);

	useEffect(() => {
		(async () => {
			const provider = await connector.getProvider();
			console.log("provider", provider);
			setReady(!!provider);
		})();
	}, [connector]);

	return (
		<button
			className={ready ? "" : classes["disabled"]}
			disabled={!ready}
			onClick={onClick}>
			{connector.name}
		</button>
	);
}
