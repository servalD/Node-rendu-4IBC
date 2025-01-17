import express, { Router } from "express";
import ApiResponses from "../ApiResponse";
import uuidMatcher from "../uuidMatcher";
import AddZerosToId from "../middlewares/AddZerosToId";

export default (superRouter: Router) => {
	const router = express.Router();
	superRouter.use("/test", router);

	// router.param("id", (req, res, next, id) => {
	// 	if (id !== "0") {
	// 		return ApiResponses.httpBadRequest(res, {
	// 			error: "Invalid id",
	// 		});
	// 	}

	// 	next();
	// });

	router.get("/", (req, res) => {
		ApiResponses.httpCreated(res, {
			Hello: "world",
		});
	});

	router.get(`/:id(${uuidMatcher})`, AddZerosToId(), (req, res) => {
		ApiResponses.httpSuccess(res, {
			...req.params,
			...req.query,
		});
	});
};
