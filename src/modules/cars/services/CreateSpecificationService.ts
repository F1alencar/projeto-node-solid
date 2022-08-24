import { ISpecificationsRepository } from "../repositories/ISpecificationsRepository";

interface IRequest {
  name: string;
  description: string;
}

class CreateSpecificationService {
  constructor(private specificationsRepsitory: ISpecificationsRepository) {}

  execute({ name, description }: IRequest): void {
    const specificationAlreadyExists =
      this.specificationsRepsitory.findByName(name);

    if (specificationAlreadyExists) {
      throw new Error("Specification already existis!");
    }

    this.specificationsRepsitory.create({ name, description });
  }
}

export { CreateSpecificationService };
