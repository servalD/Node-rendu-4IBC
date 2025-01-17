import Di from "../../../commons/dist/injectables/Di";
import UserService from "../services/UserService";
import { container } from "tsyringe";

Di.setUserService(container.resolve(UserService));
