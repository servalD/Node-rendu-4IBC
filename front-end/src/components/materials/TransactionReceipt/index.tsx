"use client";
import { useEffect, useState } from "react";
import { useTransactionConfirmations } from "wagmi";
import { formatUnits } from "viem";
type IProps = {
	hash: `0x${string}`;
};

export default function TransactionReceipt(props: IProps) {
	const { data: confirmationData, refetch } = useTransactionConfirmations({
		hash: props.hash,
	});

	const [refetcher, setRefetcher] = useState(setInterval(() => {}, 500));

	useEffect(() => {
		setRefetcher(
			setInterval(() => {
				refetch();
			}, 500),
		);
	}, [refetch]);

	useEffect(() => {
		console.log(
			"Confirmation data : ",
			confirmationData && parseInt(formatUnits(confirmationData, 0)),
		);
		if (confirmationData && parseInt(formatUnits(confirmationData, 0)) >= 3) {
			console.log("Clearing interval");
			clearInterval(refetcher);
			setInterval(() => {}, 500);
		}
	}, [confirmationData, refetcher]);

	console.log("Hash in subcomponent : ", props.hash);
	return <></>;
}
