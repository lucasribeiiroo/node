import { CheckIn, Gym, Prisma, User } from "@prisma/client";

export interface IUserRepository {
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  create(data: Prisma.UserCreateInput): Promise<User>;
}

export interface ICheckInRepository {
  findById(id: string): Promise<CheckIn | null>;
  findManyByUserId(id: string, page: number): Promise<CheckIn[]>;
  findByUserIdOnDate(id: string, date: Date): Promise<CheckIn | null>;
  create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn>;
  countByUserId(userId: string): Promise<number>;
  save(data: CheckIn): Promise<CheckIn>;
}

export interface IGymRepository {
  findNearbyGyms(latitude: number, longitude: number): Promise<Gym[]>;
  findById(id: string): Promise<Gym | null>;
  create(data: Prisma.GymCreateInput): Promise<Gym>;
  findMany(query: string, page: number): Promise<Gym[]>;
}
