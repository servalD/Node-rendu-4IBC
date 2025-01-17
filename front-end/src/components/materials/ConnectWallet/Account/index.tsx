"use client";
import { useAccount, useDisconnect, useEnsAvatar, useEnsName } from "wagmi";
import classes from "./classes.module.scss";

export function Account() {
	const { address } = useAccount();
	const { disconnect } = useDisconnect();
	const { data: ensName } = useEnsName({ address });
	const { data: ensAvatar } = useEnsAvatar({ name: ensName! });

	// Fonction pour tronquer l'adresse
	const formatAddress = (addr: string) => `${addr.slice(0, 4)}...${addr.slice(-4)}`;

	return (
		<div className={classes.account}>
			{ensAvatar && (
				<img alt="ENS Avatar" src={ensAvatar} className={classes.avatar} />
			)}
			{address && (
				<div className={classes.details}>
					<span className={classes.ensName}>
						{ensName ? ensName : formatAddress(address)}
					</span>
					{ensName && (
						<span className={classes.address}>
							({formatAddress(address)})
						</span>
					)}
				</div>
			)}
			<button className={classes.disconnect} onClick={() => disconnect()}>
				Disconnect
			</button>
		</div>
	);
}
