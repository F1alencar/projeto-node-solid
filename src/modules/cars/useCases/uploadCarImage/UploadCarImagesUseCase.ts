import { inject, injectable } from "tsyringe";

import { ICarsImagesRepository } from "../../repositories/ICarsImagesRepository";
import { ICarsRepository } from "../../repositories/ICarsRepository";

interface IResquest {
  car_id: string;
  images_name: string[];
}

@injectable()
class UploadCarImagesUseCase {
  constructor(
    @inject("CarsImagesRepository")
    private carsImagesRepository: ICarsImagesRepository
  ) {}
  async execute({ car_id, images_name }: IResquest): Promise<void> {
    images_name.map(async (image_name) => {
      await this.carsImagesRepository.create(car_id, image_name);
    });
  }
}

export { UploadCarImagesUseCase };
