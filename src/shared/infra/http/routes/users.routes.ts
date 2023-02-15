import { Router } from "express";
import multer from "multer";

import uploadConfig from "../../../../config/upload";
import { CreateUserController } from "../../../../modules/accounts/useCases/createUser/CreateUserController";
import { ProfileUserController } from "../../../../modules/accounts/useCases/profileUser/ProfileUserController";
import { UpdateUserAvatarController } from "../../../../modules/accounts/useCases/updateUserAvatar/UpdateUserAvatarController";
import { ensureAutheticated } from "../middlewares/ensureAuthenticated";

const userRoutes = Router();

const createUserController = new CreateUserController();
const updateUserAvatarController = new UpdateUserAvatarController();
const profileUserController = new ProfileUserController();

const uploadAvatar = multer(uploadConfig);

userRoutes.post("/", createUserController.handle);

userRoutes.patch(
  "/avatar",
  ensureAutheticated,
  uploadAvatar.single("avatar"),
  updateUserAvatarController.handle
);

userRoutes.get("/profile", ensureAutheticated, profileUserController.handle);

export { userRoutes };
