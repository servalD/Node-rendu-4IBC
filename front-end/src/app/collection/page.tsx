"use client";
import "reflect-metadata";
import classes from "./classes.module.scss";
import { useState } from "react";
import NftCollection from "@/components/materials/NftCollection";
import { Address, isAddress } from "viem";

export default function Contract() {
	const [contractAddress, setContractAddress] = useState<Address>(
		"0xe9B39C0731805B7BaB27Aa00A901F4119EAe1B22",
	);

	const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);
		const address = formData.get("contractAddress");
		if (!address) return;
		if (isAddress(address as string)) {
			setContractAddress(address as Address);
			return;
		}
		alert("Adresse non valide");
	};

	return (
		<div className={classes.root}>
			<div className={classes.inputWrapper}>
				<form onSubmit={onFormSubmit}>
					<input
						type="text"
						name="contractAddress"
						placeholder="Contract address"
						className={classes.inputField}
					/>
					<button className={classes.searchButton}>Search</button>
				</form>
			</div>
			{contractAddress && <h1>{contractAddress}</h1>}
			{contractAddress && <NftCollection address={contractAddress} />}
		</div>
	);
}
