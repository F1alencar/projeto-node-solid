import { Router } from "express";

import { authenticateRoutes } from "./authenticate.routes";
import { carsRoutes } from "./cars.routes";
import { categoriesRoutes } from "./categories.routes";
import { rentalRoutes } from "./rentals.routes";
import { specificationsRoutes } from "./specification.routes";
import { userRoutes } from "./users.routes";

const router = Router();

router.use("/categories", categoriesRoutes);
router.use("/cars", carsRoutes);
router.use("/specifications", specificationsRoutes);
router.use("/users", userRoutes);
router.use("/rentals", rentalRoutes);
router.use(authenticateRoutes);

export { router };
