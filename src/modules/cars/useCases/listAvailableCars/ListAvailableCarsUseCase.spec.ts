import { CarsRepositoryInMemory } from "../../repositories/in-memory/CarsRepositoryInMemory";
import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase";

let listCarUseCase: ListAvailableCarsUseCase;
let carsRespositoryInMemory: CarsRepositoryInMemory;
describe("List Cart", () => {
  beforeEach(() => {
    carsRespositoryInMemory = new CarsRepositoryInMemory();
    listCarUseCase = new ListAvailableCarsUseCase(carsRespositoryInMemory);
  });

  it("should be able to list all available cars", async () => {
    const car = await carsRespositoryInMemory.create({
      name: "Test Car 1",
      description: "Test Description Car 1",
      daily_rate: 100,
      license_plate: "TST-1234",
      fine_amount: 60,
      brand: "TestBrand1",
      category_id: "testcategory1",
    });

    const cars = await listCarUseCase.execute({});

    expect(cars).toEqual([car]);
  });

  it("should be able to list all available cars by name", async () => {
    const car = await carsRespositoryInMemory.create({
      name: "TestCar1",
      description: "Test Description Car 1",
      daily_rate: 100,
      license_plate: "TST-1234",
      fine_amount: 60,
      brand: "TestBrand1",
      category_id: "testcategory1",
    });

    const cars = await listCarUseCase.execute({ name: "TestCar1" });

    expect(cars).toEqual([car]);
  });

  it("should be able to list all available cars by brand", async () => {
    const car = await carsRespositoryInMemory.create({
      name: "TestCar1",
      description: "Test Description Car 1",
      daily_rate: 100,
      license_plate: "TST-1234",
      fine_amount: 60,
      brand: "TestBrand1",
      category_id: "testcategory1",
    });

    const cars = await listCarUseCase.execute({ brand: "TestBrand1" });

    expect(cars).toEqual([car]);
  });

  it("should be able to list all available cars by category", async () => {
    const car = await carsRespositoryInMemory.create({
      name: "TestCar1",
      description: "Test Description Car 1",
      daily_rate: 100,
      license_plate: "TST-1234",
      fine_amount: 60,
      brand: "TestBrand1",
      category_id: "testcategory1",
    });

    const cars = await listCarUseCase.execute({ category_id: "testcategory1" });

    expect(cars).toEqual([car]);
  });
});
