class BadRequest404 extends Error {
    status;
    constructor(message) {
        super(message || "Bad request");
        this.status = 404;
    }
}
export default BadRequest404;
//# sourceMappingURL=http404BadRequest.js.map