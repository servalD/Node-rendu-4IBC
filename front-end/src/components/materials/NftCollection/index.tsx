import { Address } from "viem";
import classes from "./classes.module.scss";
import NftCard from "./NftCard";
import { useEffect, useState } from "react";
import CollectionApi from "@/api/CollectionApi";
import NftCollectionResponseResource from "common/resources/nfts/NftCollectionResponseResource";

type IProps = {
	address: Address;
};

export default function NftCollection({ address }: IProps) {
	const [collection, setCollection] = useState<NftCollectionResponseResource | null>(
		null,
	);

	useEffect(() => {
		CollectionApi.getInstance()
			.getByAddress(address)
			.then((collection) => {
				setCollection(collection);
			});
	}, [address]);

	if (!collection) return "Loading...";
	return (
		<div className={classes.root}>
			<h1>
				<span>{collection.name}</span> -{" "}
				<span>{collection.tokens.length} tokens</span>
			</h1>
			{/* Container des cartes */}
			<div className={classes["cards-container"]}>
				{collection.tokens.map((token) => (
					<NftCard key={token.id} token={token} />
				))}
			</div>
		</div>
	);
}
