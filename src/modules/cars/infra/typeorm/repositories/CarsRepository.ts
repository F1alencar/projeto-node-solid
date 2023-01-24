import { Repository } from "typeorm";

import { AppDataSource } from "../../../../../shared/infra/typeorm";
import { ICreateCarsDTO } from "../../../dtos/ICreateCarsDTO";
import { ICarsRepository } from "../../../repositories/ICarsRepository";
import { Car } from "../entities/Car";

class CarsRepository implements ICarsRepository {
  private repository: Repository<Car>;

  constructor() {
    this.repository = AppDataSource.getRepository(Car);
  }
  async create({
    brand,
    category_id,
    daily_rate,
    description,
    fine_amount,
    name,
    license_plate,
  }: ICreateCarsDTO): Promise<Car> {
    const car = this.repository.create({
      brand,
      category_id,
      daily_rate,
      description,
      fine_amount,
      name,
      license_plate,
    });

    await this.repository.save(car);
    return car;
  }

  async findByLicensePlate(license_plate: string): Promise<Car | null> {
    const car = await this.repository.findOne({
      where: {
        license_plate,
      },
    });

    return car;
  }
}

export { CarsRepository };
