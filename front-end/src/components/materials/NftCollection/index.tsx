import { Address } from "viem";
import classes from "./classes.module.scss";
import {
	useReadMyNftCollectionName,
	useReadMyNftCollectionTokenCount,
} from "@/generated";
import NftCard from "./NftCard";

type IProps = {
	address: Address;
};

export default function NftCollection({ address }: IProps) {
	const { data: collectionName } = useReadMyNftCollectionName({
		address,
	});

	const { data: numberOfTokens } = useReadMyNftCollectionTokenCount({
		address,
	});

	return (
		<div className={classes.root}>
			<h1>
				<span>{collectionName}</span> - <span>{numberOfTokens} tokens</span>
			</h1>
			{/* Container des cartes */}
			<div className={classes["cards-container"]}>
				{numberOfTokens &&
					[...Array(parseInt(numberOfTokens.toString()))].map((_, index) => (
						<NftCard key={index} address={address} tokenId={index} />
					))}
			</div>
		</div>
	);
}
