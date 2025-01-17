"use client";

import UserApi from "@/api/UserApi";
import { useEffect, useState } from "react";
import UserResponseResource from "../../commons/src/resources/user/UserResponseResource";
import UserCreateRequestResource from "../../commons/src/resources/user/UserCreateRequestResource";

import Di from "../../commons/src/injectables/Di";
import UserService from "@/services/UserService";
import { container } from "tsyringe";
import classes from "./classes.module.scss";

Di.setUserService(container.resolve(UserService));
export default function Users() {
	const [users, setUsers] = useState<UserResponseResource[]>([]);

	useEffect(() => {
		UserApi.getInstance()
			.getAll()
			.then((users) => {
				setUsers(users);
			})
			.catch((err) => console.error(err));
	}, []);

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const form = event.target as HTMLFormElement;

		const userResource = UserCreateRequestResource.hydrate<UserCreateRequestResource>(
			{
				name: form["lastName"].value,
				email: form["email"].value,
				password: form["password"].value,
				firstName: form["firstName"].value,
			},
		);

		try {
			await userResource.validateOrReject();
			UserApi.getInstance()
				.createUser(userResource)
				.then((user) => {
					setUsers((prevState) => [...prevState, user]);
				});
		} catch (err) {
			alert("Error while creating user");
			console.error(err);
		}
	};

	return (
		<div>
			<form onSubmit={handleSubmit} className={classes.form}>
				<div className={classes.title}>Register a user</div>
				<input type="email" name="email" placeholder="Email" />
				<input type="text" name="firstName" placeholder="First name" />
				<input type="text" name="lastName" placeholder="Last name" />
				<input type="password" name="password" placeholder="Password" />
				<button type="submit">Create</button>
			</form>
			<table className={classes.table}>
				<thead>
					<tr>
						<th>Email</th>
						<th>Firstname</th>
					</tr>
				</thead>
				<tbody>
					{users.map((user) => {
						return (
							<tr key={user.email}>
								<td>{user.email}</td>
								<td>{user.firstName}</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
}
