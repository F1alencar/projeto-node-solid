import { NextFunction, Request, Response } from "express";

import { UsersRepository } from "../../../../modules/accounts/infra/typeorm/repositories/UsersRepository";
import { AppError } from "../../../errors/AppErros";

export async function ensureAdmin(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const { id } = request.user;

  const userReposisitory = new UsersRepository();

  const user = await userReposisitory.findById(id);

  if (!user?.isAdmin) {
    throw new AppError("User isn't admin!");
  }

  return next();
}
