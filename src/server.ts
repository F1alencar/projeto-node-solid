import express, { NextFunction, Request, Response } from "express";
import "express-async-errors";
import swaggerUi from "swagger-ui-express";

import { AppDataSource } from "./database";

import "./shared/container";

import { AppError } from "./errors/AppErros";
import { router } from "./routes";
import swaggerFile from "./swagger.json";

const app = express();
const db = AppDataSource;

db.initialize();

app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(router);

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({ messge: err.message });
    }

    return response.status(500).json({
      status: "error",
      message: `Internal server erro - ${err.message}`,
    });
    next();
  }
);

app.listen(3333, () => console.log("Server is running!"));
