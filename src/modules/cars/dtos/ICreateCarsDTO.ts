import { Specification } from "../infra/typeorm/entities/Specification";

interface ICreateCarsDTO {
  name: string;
  description: string;
  daily_rate: number;
  fine_amount: number;
  license_plate: string;
  brand: string;
  category_id: string;
  specifications?: Specification[];
  id?: string;
}

export { ICreateCarsDTO };
