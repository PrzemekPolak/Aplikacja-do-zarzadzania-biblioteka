export class NotFoundException extends Error {
  constructor() {
    super(`Requested record doesn't exist`);

    Object.setPrototypeOf(this, NotFoundException.prototype);
  }
}
