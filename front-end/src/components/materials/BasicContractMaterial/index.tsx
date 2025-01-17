"use client";
import {
	useWriteBasicContractSetPayableValue,
	useWriteBasicContractSetValue,
} from "@/generated";
import { useEffect, useState } from "react";
import { parseEther, parseUnits } from "viem";
import TransactionReceipt from "../TransactionReceipt";
import classes from "./classes.module.scss"; // Import du fichier CSS

export default function BasicContractMaterial() {
	const [value, setValue] = useState<string>("100");
	const [payableValue, setPayableValue] = useState<string>("50");

	const {
		writeContractAsync: writeContractSetValue,
		isPending,
		isSuccess,
		data: transactionHash,
	} = useWriteBasicContractSetValue();

	const { writeContractAsync: writeContractPayableValue } =
		useWriteBasicContractSetPayableValue();

	const updateContractSetValue = () => {
		writeContractSetValue({
			args: [parseUnits(value, 0)],
		}).then((tx) => {
			console.log(tx);
		});
	};

	const updateContractPayableValue = () => {
		writeContractPayableValue({
			args: [parseUnits(payableValue, 0)],
			value: parseEther("0.001"),
		}).then((tx) => {
			console.log(tx);
		});
	};

	useEffect(() => {
		if (isPending) {
			console.log("Pending");
		}
		if (isSuccess) {
			console.log("Success : ", transactionHash);
		}
	}, [isSuccess, isPending, transactionHash]);

	return (
		<div className={classes.container}>
			<div className={classes.formGroup}>
				<label htmlFor="contractValue" className={classes.label}>
					Set contract value
				</label>
				<input
					id="contractValue"
					type="number"
					value={value}
					onChange={(e) => setValue(e.target.value)}
					className={classes.input}
				/>
				<button
					onClick={updateContractSetValue}
					className={classes.button}
					disabled={isPending}>
					Update
				</button>
			</div>

			<div className={classes.formGroup}>
				<label htmlFor="payableValue" className={classes.label}>
					Set contract payable value
				</label>
				<input
					id="payableValue"
					type="number"
					value={payableValue}
					onChange={(e) => setPayableValue(e.target.value)}
					className={classes.input}
				/>
				<button
					onClick={updateContractPayableValue}
					className={classes.button}
					disabled={isPending}>
					Update
				</button>
			</div>

			{isSuccess && transactionHash && (
				<TransactionReceipt hash={transactionHash} />
			)}
		</div>
	);
}
