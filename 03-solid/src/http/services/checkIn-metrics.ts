import { ICheckInRepository } from "../repositories/interfaces";
import { ICheckInMetricsRequest, ICheckInMetricsResponse } from "./interfaces";

export class CheckInMetricsService {
  constructor(private checkInRepository: ICheckInRepository) {}
  async execute({
    userId,
  }: ICheckInMetricsRequest): Promise<ICheckInMetricsResponse> {
    const checkInsCount = await this.checkInRepository.countByUserId(userId);

    return {
      checkInsCount,
    };
  }
}
