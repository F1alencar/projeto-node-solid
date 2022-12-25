import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../errors/AppErros";
import { ISpecificationsRepository } from "../../repositories/ISpecificationsRepository";

interface IRequest {
  name: string;
  description: string;
}
@injectable()
class CreateSpecificationUseCase {
  constructor(
    @inject("SpecificationsRepository")
    private specificationsRepsitory: ISpecificationsRepository
  ) {}

  async execute({ name, description }: IRequest): Promise<void> {
    const specificationAlreadyExists =
      await this.specificationsRepsitory.findByName(name);

    if (specificationAlreadyExists) {
      throw new AppError("Specification already existis!");
    }

    this.specificationsRepsitory.create({ name, description });
  }
}

export { CreateSpecificationUseCase };
