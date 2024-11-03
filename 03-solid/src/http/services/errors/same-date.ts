export class SameDateCheckInError extends Error {
  constructor() {
    super("Its not possible to make check-in twice in the same date!");
  }
}
