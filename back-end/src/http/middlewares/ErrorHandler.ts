import { Request, Response, NextFunction } from "express";
import ApiResponses from "../ApiResponse";

export default function errorHandler(
	error: any,
	_req: Request,
	response: Response,
	_next: NextFunction,
) {
	ApiResponses.httpInternalError(response, {
		error: error.message,
	});
}
