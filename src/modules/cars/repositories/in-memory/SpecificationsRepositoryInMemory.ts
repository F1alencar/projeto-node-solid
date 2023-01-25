import { Specification } from "../../infra/typeorm/entities/Specification";
import {
  ICreateSpecificationDTO,
  ISpecificationsRepository,
} from "../ISpecificationsRepository";

class SpecificationsRepositoryInMemory implements ISpecificationsRepository {
  specifications: Specification[] = [];
  async create({
    name,
    description,
  }: ICreateSpecificationDTO): Promise<Specification> {
    const specification = new Specification();

    Object.assign(specification, {
      name,
      description,
    });

    this.specifications.push(specification);

    return specification;
  }
  async findByIds(ids: string[]): Promise<Specification[]> {
    const allSpecification = this.specifications.filter((specification) =>
      ids.includes(specification.id)
    );
    return allSpecification;
  }
  async findByName(name: string): Promise<Specification | null> {
    const specification =
      this.specifications.find(
        (specification) => specification.name === name
      ) || null;
    return specification;
  }
}

export { SpecificationsRepositoryInMemory };
