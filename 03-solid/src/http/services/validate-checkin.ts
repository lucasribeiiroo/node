import dayjs from "dayjs";
import { ICheckInRepository } from "../repositories/interfaces";
import { ResourceNotFoundError } from "./errors/resource-not-found";
import {
  IValidateCheckInRequest,
  IValidateCheckInResponse,
} from "./interfaces";
import { CheckInLimitTimeError } from "./errors/check-in-limit";

export class ValidateCheckinService {
  constructor(private checkInRepository: ICheckInRepository) {}
  async execute({
    id,
  }: IValidateCheckInRequest): Promise<IValidateCheckInResponse> {
    const checkIn = await this.checkInRepository.findById(id);

    if (!checkIn) throw new ResourceNotFoundError();

    const distanceInMinutesFromCheckCreation = dayjs(new Date()).diff(
      checkIn.created_at,
      "minutes"
    );

    if (distanceInMinutesFromCheckCreation > 20)
      throw new CheckInLimitTimeError();

    checkIn.validated_at = new Date();

    await this.checkInRepository.save(checkIn);

    return {
      checkIn,
    };
  }
}
