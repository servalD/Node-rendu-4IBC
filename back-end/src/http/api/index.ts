import express, { Router } from "express";
import TestController from "./TestController";
import UserController from "./UserController";
import CollectionController from "./CollectionController";
export default (superRouter: Router) => {
  const router = express.Router();
  superRouter.use("/api", router);

  TestController(router);
  UserController(router);
  CollectionController(router);
};
