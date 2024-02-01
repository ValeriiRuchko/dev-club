class BadRequest400 extends Error {
  status: number;

  constructor(message?: string) {
    super(message || "Bad request");
    this.status = 400;
  }
}

export default BadRequest400;
