import { Router } from "express";
import UserMap from "../mappers/UserMap";
import CreateUserService from "../services/CreateUserService";
import UpdateUserAvatarService from "../services/UpdateUserAvatarService";
import ensureAthenticated from "../middlewares/ensureAuthenticated";
import multer from "multer";
import uploadConfig from "../config/upload";


const usersRouter = Router();
const upload = multer(uploadConfig);

usersRouter.post("/", async (request, response) => {
    const { name, email, password } = request.body;

    const createUser = new CreateUserService();

    const user = await createUser.execute({
      name,
      email,
      password,
    });

    const mappedUser = UserMap.toDTO(user);

    return response.json(mappedUser);

});

usersRouter.patch(
  "/avatar",
  ensureAthenticated,
  upload.single("avatar"),
  async (request, response) => {

        const updateUserAvatar = new UpdateUserAvatarService();

        const user = await updateUserAvatar.execute({
            user_id: request.user.id,
            avatarFilename: request.file.filename,
        });

        const mappedUser = UserMap.toDTO(user);


        return response.json(mappedUser);

  }
);

export default usersRouter;
