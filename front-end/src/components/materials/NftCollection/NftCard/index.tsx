import classes from "./classes.module.scss";
import NftTokenResponseResource from "common/resources/nfts/NftTokenResponseResource";

type IProps = {
	token: NftTokenResponseResource;
};

export default function NftCard({ token }: IProps) {
	// const handleCopy = (text: string) => {
	// 	navigator.clipboard.writeText(text);
	// 	alert("Copied to clipboard");
	// };

	// const formatAddress = (address: string) => {
	// 	return `${address.slice(0, 6)}...${address.slice(-6)}`;
	// };

	return (
		<div className={classes.root}>
			<div className={classes.info}>
				<div>
					<img src={token.image} alt={token.name} />
				</div>
				<div>
					<span>Name - </span>
					{token.name}
				</div>
				<div>
					<span>Description - </span>
					{token.description}
				</div>
				<div>
					<span>Owner - </span>
					{/* <span
							className={classes.address}
							onClick={() => handleCopy(token ?? "")}>
							{owner ? formatAddress(owner) : "Loading..."}
							<span className={classes["copy-icon"]}>📋</span>
						</span> */}
				</div>
			</div>
		</div>
	);
}
