import { Address } from "viem";
import classes from "./classes.module.scss";
import {
	useReadMyNftCollectionOwnerOf,
	useReadMyNftCollectionTokenUri,
} from "@/generated";
import { parseUnits } from "viem";
import PinataApi from "@/api/PinataApi";
import { useEffect, useState } from "react";

enum CardStatus {
	Loading,
	Success,
	Error,
}

type NftMetadata = {
	name: string;
	description: string;
	image: string;
};

type IProps = {
	address: Address;
	tokenId: number;
};

const pinataApi = PinataApi.getInstance();

export default function NftCard({ address, tokenId }: IProps) {
	const [status, setStatus] = useState<CardStatus>(CardStatus.Loading);
	const [metadata, setMetadata] = useState<NftMetadata | null>(null);
	const [image, setImage] = useState<string | null>(null);

	const { data: owner } = useReadMyNftCollectionOwnerOf({
		address,
		args: [parseUnits(tokenId.toString(), 0)],
	});

	const { data: tokenURI } = useReadMyNftCollectionTokenUri({
		address,
		args: [parseUnits(tokenId.toString(), 0)],
	});

	const handleCopy = (text: string) => {
		navigator.clipboard.writeText(text);
		alert("Copied to clipboard");
	};

	const formatAddress = (address: string) => {
		return `${address.slice(0, 6)}...${address.slice(-6)}`;
	};

	useEffect(() => {
		if (tokenURI) {
			const ipfsPart = tokenURI.split("ipfs://");

			pinataApi
				.get(ipfsPart[1])
				.then((res) => {
					const metadata = JSON.parse(res);
					setMetadata(metadata);
				})
				.catch((e) => {
					setStatus(CardStatus.Error);
					console.log("ON ERROR : ", e);
				});
		}
	}, [tokenURI]);

	useEffect(() => {
		if (metadata) {
			console.log("metadata: ", metadata);
			const ipfsPart = metadata.image.split("ipfs://");
			pinataApi
				.getImage(ipfsPart[1])
				.then((res) => {
					const url = URL.createObjectURL(res);
					setImage(url);
					setStatus(CardStatus.Success);
				})
				.catch((e) => {
					setStatus(CardStatus.Error);
					console.log("ON ERROR : ", e);
				});
		}
	}, [metadata]);

	if (status === CardStatus.Error) return <></>;
	return (
		<div className={classes.root}>
			{status === CardStatus.Success && metadata && image && (
				<div className={classes.info}>
					<div>
						<img src={image} alt={metadata.name} />
					</div>
					<div>
						<span>Name - </span>
						{metadata.name}
					</div>
					<div>
						<span>Description - </span>
						{metadata.description}
					</div>
					<div>
						<span>Owner - </span>
						<span
							className={classes.address}
							onClick={() => handleCopy(owner ?? "")}>
							{owner ? formatAddress(owner) : "Loading..."}
							<span className={classes["copy-icon"]}>📋</span>
						</span>
					</div>
				</div>
			)}
			{status === CardStatus.Loading && <div>Loading...</div>}
		</div>
	);
}
