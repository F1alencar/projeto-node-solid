import { ICreateRentalDTO } from "../../dtos/ICreateRentalDTO";
import { Rental } from "../../infra/typeorm/entities/Rental";
import { IRentalsRepository } from "../IRentalsRepository";

class RentalsRepositoryInMemory implements IRentalsRepository {
  rentalsRepository: Rental[] = [];

  async create({
    user_id,
    car_id,
    expected_return_date,
  }: ICreateRentalDTO): Promise<Rental> {
    const rental = new Rental();

    Object.assign(rental, {
      user_id,
      car_id,
      expected_return_date,
      start_date: new Date(),
    });

    this.rentalsRepository.push(rental);

    return rental;
  }

  async findOpenRentalByCar(car_id: string): Promise<Rental | null> {
    const rental =
      this.rentalsRepository.find(
        (rental) => rental.car_id === car_id && !rental.end_date
      ) || null;

    return rental;
  }

  async findOpenRentalByUser(user_id: string): Promise<Rental | null> {
    const rental =
      this.rentalsRepository.find(
        (rental) => rental.user_id === user_id && !rental.end_date
      ) || null;

    return rental;
  }

  async findById(id: string): Promise<Rental | null> {
    const rental =
      this.rentalsRepository.find((rental) => rental.id === id) || null;

    return rental;
  }

  async findByUser(user_id: string): Promise<Rental[]> {
    const rentals: Rental[] = [];
    this.rentalsRepository.forEach((rental) => {
      if (rental.user_id === user_id) {
        rentals.push(rental);
      }
    });

    return rentals;
  }
}

export { RentalsRepositoryInMemory };
