export class DistantGymError extends Error {
  constructor() {
    super("Its not possible to make check-in distant from the gym!");
  }
}
