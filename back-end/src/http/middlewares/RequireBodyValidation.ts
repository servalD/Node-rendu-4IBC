import { NextFunction, RequestHandler, Response } from "express";
import ApiResponses from "../ApiResponse";
import Resource from "../../../../commons/dist/Resource";

export default function RequireBodyValidation<T extends Resource>(
  ResourceClass: new () => T,
  groups: string[] = []
): RequestHandler {
  return async (request, response, next) => {
    try {
      const resource = (ResourceClass as any as T & typeof Resource).hydrate<T>(
        request.body,
        { groups: [...groups] }
      );

      await resource.validateOrReject({ groups: [...groups] });
      request.body = resource;
      next();
    } catch (error) {
      ApiResponses.httpBadRequest(response, error);
    }
  };
}
