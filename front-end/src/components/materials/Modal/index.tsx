"use client";
import React from "react";
import classes from "./classes.module.scss";

const Modal = ({ children, isOpen, onClose }) => {
	if (!isOpen) return null;

	return (
		<div className={classes.overlay} onClick={onClose}>
			<div
				className={classes.modal}
				onClick={(e) => e.stopPropagation()} // Empêche la fermeture lorsqu'on clique dans la modal
			>
				<button className={classes.closeButton} onClick={onClose}>
					✕
				</button>
				<div className={classes.content}>{children}</div>
			</div>
		</div>
	);
};

export default Modal;
