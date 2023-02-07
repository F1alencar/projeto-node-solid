import { ICreateCarsDTO } from "../../dtos/ICreateCarsDTO";
import { Car } from "../../infra/typeorm/entities/Car";
import { ICarsRepository } from "../ICarsRepository";

class CarsRepositoryInMemory implements ICarsRepository {
  cars: Car[] = [];
  async create({
    brand,
    category_id,
    daily_rate,
    description,
    fine_amount,
    name,
    license_plate,
    specifications,
  }: ICreateCarsDTO): Promise<Car> {
    const car = new Car();

    Object.assign(car, {
      brand,
      category_id,
      daily_rate,
      description,
      fine_amount,
      name,
      license_plate,
      specifications,
    });

    this.cars.push(car);
    return car;
  }

  async findById(id: string): Promise<Car | null> {
    const car = this.cars.find((car) => car.id === id) || null;

    return car;
  }

  async findByLicensePlate(license_plate: string): Promise<Car | null> {
    const car =
      this.cars.find((car) => car.license_plate === license_plate) || null;

    return car;
  }

  async findAvailable(
    category_id?: string,
    brand?: string,
    name?: string
  ): Promise<Car[]> {
    const carsAvailable = this.cars.filter((car) => car.available === true);
    let cars = carsAvailable;

    if (category_id) {
      cars = carsAvailable.filter((car) => car.category_id === category_id);
    }

    if (brand) {
      cars = carsAvailable.filter((car) => car.brand === brand);
    }

    if (name) {
      cars = carsAvailable.filter((car) => car.name === name);
    }

    return cars;
  }

  async updateAvailable(id: string, available: boolean): Promise<void> {
    const findIndex = this.cars.findIndex((car) => car.id === id);
    this.cars[findIndex].available = available;
  }
}

export { CarsRepositoryInMemory };
