import dayjs from "dayjs";

import { DayjsDateProvider } from "../../../../shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { AppError } from "../../../../shared/errors/AppErros";
import { CarsRepositoryInMemory } from "../../../cars/repositories/in-memory/CarsRepositoryInMemory";
import { RentalsRepositoryInMemory } from "../../repositories/in-memory/RentalsRepositoryInMemory";
import { CreateRentalUseCase } from "./CreateRentalUseCase";

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let dayjsDateProvider: DayjsDateProvider;

describe("Create a Rental", () => {
  const dayAdd24hours = dayjs().add(1, "day").toDate();
  beforeEach(() => {
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    dayjsDateProvider = new DayjsDateProvider();
    createRentalUseCase = new CreateRentalUseCase(
      carsRepositoryInMemory,
      rentalsRepositoryInMemory,
      dayjsDateProvider
    );
  });

  it("should be able to create a new rental", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Test Car",
      description: "Test Description Car",
      daily_rate: 100,
      license_plate: "TST-1234",
      fine_amount: 60,
      brand: "TestBrand",
      category_id: "testcategory",
    });

    const rental = await createRentalUseCase.execute({
      user_id: "testUser",
      car_id: car.id,
      expected_return_date: dayAdd24hours,
    });

    expect(rental).toHaveProperty("id");
    expect(rental).toHaveProperty("start_date");
  });

  it("should not be able to create a new rental if there is another open to the same user", async () => {
    const testCar1 = await carsRepositoryInMemory.create({
      name: "Test Car",
      description: "Test Description Car",
      daily_rate: 100,
      license_plate: "TST-1234",
      fine_amount: 60,
      brand: "TestBrand",
      category_id: "testcategory",
    });

    await createRentalUseCase.execute({
      user_id: "testUser",
      car_id: testCar1.id,
      expected_return_date: dayAdd24hours,
    });

    const testCar2 = await carsRepositoryInMemory.create({
      name: "Test Car 2",
      description: "Test Description Car 2",
      daily_rate: 100,
      license_plate: "TST-1235",
      fine_amount: 60,
      brand: "TestBrand",
      category_id: "testcategory",
    });

    await expect(
      createRentalUseCase.execute({
        user_id: "testUser",
        car_id: testCar2.id,
        expected_return_date: dayAdd24hours,
      })
    ).rejects.toEqual(new AppError("There's a rental in progress for user!"));
  });

  it("should not be able to create a new rental if there is another open to the same car", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Test Car",
      description: "Test Description Car",
      daily_rate: 100,
      license_plate: "TST-1234",
      fine_amount: 60,
      brand: "TestBrand",
      category_id: "testcategory",
    });

    await createRentalUseCase.execute({
      user_id: "testUser1",
      car_id: car.id,
      expected_return_date: dayAdd24hours,
    });

    await expect(
      createRentalUseCase.execute({
        user_id: "testUser2",
        car_id: car.id,
        expected_return_date: dayAdd24hours,
      })
    ).rejects.toEqual(new AppError("Car is unavailable"));
  });

  it("should not be able to create a new rental with invalid return time", async () => {
    await expect(
      createRentalUseCase.execute({
        user_id: "testUser1",
        car_id: "testCar",
        expected_return_date: dayjs().toDate(),
      })
    ).rejects.toEqual(new AppError("Invalid return time!"));
  });
});
