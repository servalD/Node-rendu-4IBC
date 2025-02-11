import type { Metadata } from "next";
import classes from "./classes.module.scss";

export const metadata: Metadata = {
	title: "Users page",
	description: "Generated by create next app",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return <div className={classes.root}>{children}</div>;
}
