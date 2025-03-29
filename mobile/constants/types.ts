export interface User {
  name?: string;
  password?: string;
  email?: string;
  phone?: string;
  location?: string;
}

export enum RideStatus {
  PENDING = "PENDING",
  CONFIRMED = "CONFIRMED",
  COMPLETED = "COMPLETED",
  CANCELLED = "CANCELLED",
}
