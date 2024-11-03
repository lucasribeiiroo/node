import { ICheckInRepository, IGymRepository } from "../repositories/interfaces";
import { ResourceNotFoundError } from "./errors/resource-not-found";
import { SameDateCheckInError } from "./errors/same-date";
import { getDistanceBetweenCoordinates } from "@/utils/distance-beetween-coordiantes";
import { DistantGymError } from "./errors/distant-gym";
import { ICheckInRequest, ICheckInResponse } from "./interfaces";

export class CheckInService {
  constructor(
    private checkInRepository: ICheckInRepository,
    private gymRepository: IGymRepository
  ) {}
  async create({
    userId,
    gymId,
    userLatitude,
    userLongitude,
  }: ICheckInRequest): Promise<ICheckInResponse> {
    const gym = await this.gymRepository.findById(gymId);

    if (!gym) throw new ResourceNotFoundError();

    const distance = await getDistanceBetweenCoordinates(
      { latitude: userLatitude, longitude: userLongitude },
      {
        latitude: gym?.latitude.toNumber(),
        longitude: gym?.longitude.toNumber(),
      }
    );

    const MAX_DISTANCE_KM = 0.1;
    if (distance > MAX_DISTANCE_KM) throw new DistantGymError();

    const checkInOnSameDate = await this.checkInRepository.findByUserIdOnDate(
      userId,
      new Date()
    );

    if (checkInOnSameDate) throw new SameDateCheckInError();

    const checkIn = await this.checkInRepository.create({
      user_id: userId,
      gym_id: gymId,
    });

    return {
      checkIn,
    };
  }
}
