import { CheckInService } from "../checkIn";
import { CheckInRepository } from "@/http/repositories/checkInRepository";
import { GymRepository } from "@/http/repositories/gymRepository";
import { CheckInHistoryService } from "../checkIn-history";
import { CheckInMetricsService } from "../checkIn-metrics";
import { ValidateCheckinService } from "../validate-checkin";

export const makeCheckInService = () => {
  const checkInRepository = new CheckInRepository();
  const gymRepository = new GymRepository();
  const useCase = new CheckInService(checkInRepository, gymRepository);

  return useCase;
};

export const makeCheckInHistoryService = () => {
  const checkInRepository = new CheckInRepository();
  const useCase = new CheckInHistoryService(checkInRepository);

  return useCase;
};

export const makeCheckInMetricsService = () => {
  const checkInRepository = new CheckInRepository();
  const useCase = new CheckInMetricsService(checkInRepository);

  return useCase;
};

export const makeValidateCheckInService = () => {
  const checkInRepository = new CheckInRepository();
  const useCase = new ValidateCheckinService(checkInRepository);

  return useCase;
};
