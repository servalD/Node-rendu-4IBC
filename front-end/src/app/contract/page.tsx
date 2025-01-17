"use client";
import "reflect-metadata";
import Di from "../../commons/src/injectables/Di";
import UserService from "@/services/UserService";
import { container } from "tsyringe";
import ShowContractValue from "@/components/materials/ShowContractValue";
import BasicContractMaterial from "@/components/materials/BasicContractMaterial";
import { useAccount } from "wagmi";
import classes from "./classes.module.scss";
import { BasicContractHistory } from "@/components/materials/BasicContractHistory";

Di.setUserService(container.resolve(UserService));
export default function Contract() {
	const { isConnected } = useAccount();

	return (
		<div className={classes.root}>
			{isConnected && (
				<>
					<BasicContractMaterial />
					<ShowContractValue />
					<BasicContractHistory />
				</>
			)}
		</div>
	);
}
