class BadRequest400 extends Error {
    status;
    constructor(message) {
        super(message || "Bad request");
        this.status = 400;
    }
}
export default BadRequest400;
//# sourceMappingURL=http400BadRequest.js.map