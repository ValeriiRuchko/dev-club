class BadRequest404 extends Error {
  status: number;

  constructor(message?: string) {
    super(message || "Bad request");
    this.status = 404;
  }
}

export default BadRequest404;
