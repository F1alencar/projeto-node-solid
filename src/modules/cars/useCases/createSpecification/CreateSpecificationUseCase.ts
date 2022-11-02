import { inject } from "tsyringe";

import { ISpecificationsRepository } from "../../repositories/ISpecificationsRepository";

interface IRequest {
  name: string;
  description: string;
}

class CreateSpecificationUseCase {
  constructor(
    @inject("SpecificationsRepository")
    private specificationsRepsitory: ISpecificationsRepository
  ) {}

  async execute({ name, description }: IRequest): Promise<void> {
    const specificationAlreadyExists =
      await this.specificationsRepsitory.findByName(name);

    if (specificationAlreadyExists) {
      throw new Error("Specification already existis!");
    }

    this.specificationsRepsitory.create({ name, description });
  }
}

export { CreateSpecificationUseCase };
