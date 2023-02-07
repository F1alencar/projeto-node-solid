import { AppError } from "../../../../shared/errors/AppErros";
import { CarsRepositoryInMemory } from "../../repositories/in-memory/CarsRepositoryInMemory";
import { CreateCarUseCase } from "./CreateCarUseCase";

let createCarUseCase: CreateCarUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("Create Car", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
  });

  it("should be able to create a new car", async () => {
    const car = await createCarUseCase.execute({
      name: "Test Car",
      description: "Test Description Car",
      daily_rate: 100,
      license_plate: "TST-1234",
      fine_amount: 60,
      brand: "TestBrand",
      category_id: "testcategory",
    });

    expect(car).toHaveProperty("id");
  });

  it("should be able to create a car with existis license plate", async () => {
    await createCarUseCase.execute({
      name: "Test Car 1",
      description: "Test Description Car 1",
      daily_rate: 100,
      license_plate: "TST-1234",
      fine_amount: 60,
      brand: "TestBrand1",
      category_id: "testcategory1",
    });

    await expect(
      createCarUseCase.execute({
        name: "Test Car 2",
        description: "Test Description Car 2",
        daily_rate: 100,
        license_plate: "TST-1234",
        fine_amount: 60,
        brand: "TestBrand2",
        category_id: "testcategory2",
      })
    ).rejects.toEqual(new AppError("Car already exists!"));
  });

  it("should not be able to create a car with available true by default", async () => {
    const car = await createCarUseCase.execute({
      name: "Test Car",
      description: "Test Description Car",
      daily_rate: 100,
      license_plate: "TST-1234",
      fine_amount: 60,
      brand: "TestBrand",
      category_id: "testcategory",
    });

    expect(car.available).toBe(true);
  });
});
