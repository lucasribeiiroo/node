export class CheckInLimitTimeError extends Error {
  constructor() {
    super("Its not possible to make check-in after 20 minutes!");
  }
}
