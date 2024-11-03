import { ICheckInRepository } from "../repositories/interfaces";
import { ICheckInHistoryRequest, ICheckInHistoryResponse } from "./interfaces";

export class CheckInHistoryService {
  constructor(private checkInRepository: ICheckInRepository) {}
  async execute({
    userId,
    page,
  }: ICheckInHistoryRequest): Promise<ICheckInHistoryResponse> {
    const checkIns = await this.checkInRepository.findManyByUserId(
      userId,
      page
    );

    return {
      checkIns,
    };
  }
}
