import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../shared/errors/AppErros";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: {
    name: string;
    email: string;
  };
  token: string;
}
@injectable()
class AuthenticateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError("Email or password incorret!");
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new AppError("Email or password incorret!");
    }

    const token = sign({}, "c38202d6e8c02b4948883be74a562e62", {
      subject: user.id,
      expiresIn: "1d",
    });

    const tokenReturn: IResponse = {
      user: {
        name: user.name,
        email: user.email,
      },
      token,
    };

    return tokenReturn;
  }
}

export { AuthenticateUserUseCase };
