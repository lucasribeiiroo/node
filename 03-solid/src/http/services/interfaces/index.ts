import { CheckIn, Gym, User } from "@prisma/client";

export interface ICreateUser {
  name: string;
  password: string;
  email: string;
}

export interface IRegisterUser {
  user: User;
}
export interface ICreateGymRequest {
  title: string;
  description?: string | null;
  phone?: string | null;
  latitude: number;
  longitude: number;
}

export interface ICreateGymResponse {
  gym: Gym;
}

export interface ISearchGymRequest {
  query: string;
  page: number;
}
export interface ISearchNearbyGymRequest {
  userLatitude: number;
  userLongitude: number;
}

export interface ISearchNearbyGymResponse {
  gyms: Gym[];
}

export interface ISearchGymResponse {
  gyms: Gym[];
}

export interface ICheckInRequest {
  userId: string;
  gymId: string;
  userLatitude: number;
  userLongitude: number;
}

export interface IValidateCheckInRequest {
  id: string;
}

export interface IValidateCheckInResponse {
  checkIn: CheckIn;
}

export interface ICheckInResponse {
  checkIn: CheckIn;
}

export interface ICheckInHistoryRequest {
  userId: string;
  page: number;
}

export interface ICheckInHistoryResponse {
  checkIns: CheckIn[];
}

export interface ICheckInMetricsRequest {
  userId: string;
}

export interface ICheckInMetricsResponse {
  checkInsCount: number;
}

export interface IAuthServiceRequest {
  email: string;
  password: string;
}

export interface IAuthServiceResponse {
  user: User;
}

export interface IUserProfileRequest {
  id: string;
}

export interface IUserProfileResponse {
  user: User;
}
