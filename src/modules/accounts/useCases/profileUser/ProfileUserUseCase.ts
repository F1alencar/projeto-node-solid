import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../shared/errors/AppErros";
import { IUserResponseDTO } from "../../dtos/IUserResponseDTO";
import { UserMap } from "../../mapper/UserMap";
import { IUsersRepository } from "../../repositories/IUsersRepository";

@injectable()
class ProfileUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute(id: string): Promise<IUserResponseDTO> {
    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new AppError("User does not found!");
    }

    return UserMap.toDTO(user);
  }
}
export { ProfileUserUseCase };
