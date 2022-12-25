import { Router } from "express";

import { ensureAutheticated } from "../middlewares/ensureAuthenticated";
import { CreateSpecificationController } from "../modules/cars/useCases/createSpecification/CreateSpecificationController";

const specificationsRoutes = Router();
const createSpecificationController = new CreateSpecificationController();

specificationsRoutes.use(ensureAutheticated);

specificationsRoutes.post("/", createSpecificationController.handle);

export { specificationsRoutes };
