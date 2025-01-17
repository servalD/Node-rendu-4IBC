"use client";
import React, { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation"; // Importer usePathname
import classes from "./classes.module.scss";
import Modal from "../Modal";
import ConnectWallet from "../ConnectWallet";
import { useAccount } from "wagmi";
import { Account } from "../ConnectWallet/Account";

const Header = () => {
	const pathname = usePathname(); // Récupérer la route active

	const [isModalOpen, setIsModalOpen] = useState(false);

	const connectWallet = async () => {
		setIsModalOpen(true);
	};

	const onCloseModal = useCallback(() => {
		setIsModalOpen(false);
	}, []);

	const { isConnected } = useAccount();

	useEffect(() => {
		if (isConnected) {
			setIsModalOpen(false);
		}
	}, [isConnected]);
	return (
		<header className={classes.header}>
			<div className={classes.logo}>My simple App</div>
			<nav className={classes.nav}>
				<Link
					href="/users"
					className={`${classes.tab} ${
						pathname === "/users" ? classes.active : ""
					}`}>
					User
				</Link>
				{isConnected && (
					<Link
						href="/contract"
						className={`${classes.tab} ${
							pathname === "/contract" ? classes.active : ""
						}`}>
						Basic contract
					</Link>
				)}
				{isConnected && (
					<Link
						href="/collection"
						className={`${classes.tab} ${
							pathname === "/collection" ? classes.active : ""
						}`}>
						Collections
					</Link>
				)}
			</nav>
			<div className={classes.wallet}>
				{isConnected ? (
					<Account />
				) : (
					<button onClick={connectWallet} className={classes.connect}>
						Connect Wallet
					</button>
				)}
			</div>
			<Modal isOpen={isModalOpen} onClose={onCloseModal}>
				<ConnectWallet />
			</Modal>
		</header>
	);
};

export default Header;
