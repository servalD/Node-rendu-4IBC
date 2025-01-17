import express, { Router } from "express";
import ApiResponses from "../ApiResponse";
import UserService from "../../services/UserService";
import RequireBodyValidation from "../middlewares/RequireBodyValidation";
import UserCreateRequestResource from "../../../../commons/dist/resources/user/UserCreateRequestResource";
import UserResponseResource from "../../../../commons/dist/resources/user/UserResponseResource";
export default (superRouter: Router) => {
  const router = express.Router();
  superRouter.use("/users", router);

  router.get("/", async (req, res) => {
    ApiResponses.httpSuccess(
      res,
      UserResponseResource.hydrateArray<UserResponseResource>(
        await UserService.getInstance().getAll()
      )
    );
  });

  router.post(
    "/",
    RequireBodyValidation(UserCreateRequestResource),
    async (req, res) => {
      ApiResponses.httpSuccess(
        res,
        UserResponseResource.hydrate<UserResponseResource>(
          await UserService.getInstance().create(req.body)
        )
      );
    }
  );

  // do a get by id route that calls the service
  // and returns the response resource
  router.get("/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    const user = await UserService.getInstance().getById(id);
    if (!user) {
      ApiResponses.httpNotFound(res, {
        message: "User not found",
      });
      return;
    }
    ApiResponses.httpSuccess(
      res,
      UserResponseResource.hydrate<UserResponseResource>(user)
    );
  });

  // do a get by id route that calls the service
  // and returns the response resource
  router.get("/email/:email", async (req, res) => {
    const email = req.params.email;
    const user = await UserService.getInstance().isUniqueEmail(email);
    if (!user) {
      ApiResponses.httpSuccess(res, { exists: true });

      return;
    }
    ApiResponses.httpSuccess(res, {
      message: "User not found",
      exists: false,
    });
  });

  /* router.get(`/:id(${uuidMatcher})`, AddZerosToId(), (req, res) => {
		ApiResponses.httpSuccess(res, {
			...req.params,
			...req.query,
		});
	}); */
};
