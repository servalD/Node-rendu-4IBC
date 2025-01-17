"use client";
import {
	useReadBasicContractGetPayableValue,
	useReadBasicContractGetValue,
} from "@/generated";
import { formatUnits } from "viem";
import classes from "./classes.module.scss"; // Import du fichier CSS

export default function ShowContractValue() {
	const { data } = useReadBasicContractGetValue();
	const { data: dataPayable } = useReadBasicContractGetPayableValue();

	if (data === undefined || dataPayable === undefined) return <>Loading ...</>;

	return (
		<div className={classes.container}>
			<table className={classes.table}>
				<thead>
					<tr>
						<th>Data Value</th>
						<th>Data Payable Value</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>{formatUnits(data, 0)}</td>
						<td>{formatUnits(dataPayable, 0)}</td>
					</tr>
				</tbody>
			</table>
		</div>
	);
}
