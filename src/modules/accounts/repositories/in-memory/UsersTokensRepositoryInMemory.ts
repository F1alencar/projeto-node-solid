import { ICreateUserTokenDTO } from "../../dtos/ICreateUserTokenDTO";
import { UserTokens } from "../../infra/typeorm/entities/UserTokens";
import { IUsersTokensRepository } from "../IUsersTokensRepository";

class UsersTokensRepositoryInMemory implements IUsersTokensRepository {
  usersTokensRepository: UserTokens[] = [];
  async create({
    user_id,
    expires_date,
    refresh_token,
  }: ICreateUserTokenDTO): Promise<UserTokens> {
    const userToken = new UserTokens();

    Object.assign(userToken, {
      user_id,
      expires_date,
      refresh_token,
    });

    this.usersTokensRepository.push(userToken);

    return userToken;
  }

  async findByUserIdAndRefreshToken(
    user_id: string,
    refresh_token: string
  ): Promise<UserTokens | null> {
    const userToken =
      this.usersTokensRepository.find(
        (userToken) =>
          userToken.user_id === user_id &&
          userToken.refresh_token === refresh_token
      ) || null;

    return userToken;
  }

  async findByRefreshToken(refresh_token: string): Promise<UserTokens | null> {
    const userToken =
      this.usersTokensRepository.find(
        (userToken) => userToken.refresh_token === refresh_token
      ) || null;

    return userToken;
  }

  async deleteById(id: string): Promise<void> {
    const index = this.usersTokensRepository.findIndex(
      (userToken) => userToken.id === id
    );

    this.usersTokensRepository.splice(index, 1);
  }
}

export { UsersTokensRepositoryInMemory };
