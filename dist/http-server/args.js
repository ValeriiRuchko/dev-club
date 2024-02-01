const parseBody = (req) => new Promise((resolve) => {
    const bodyParts = [];
    let res = "";
    req.on("data", (chunk) => {
        bodyParts.push(chunk);
    });
    req.on("end", () => {
        res = Buffer.concat(bodyParts).toString();
        resolve(res);
    });
});
const args = (fn) => async (req, res) => {
    let parsedURL;
    let searchParams;
    if (req && req.url) {
        parsedURL = new URL(req.url, "http://localhost");
        searchParams = Object.fromEntries(parsedURL.searchParams.entries());
    }
    let jsonBody = {};
    if (req.headers["content-type"] === "application/json") {
        const parsedBody = (await parseBody(req));
        try {
            const json = JSON.parse(parsedBody);
            if (typeof json === "object") {
                jsonBody = json;
            }
        }
        catch (err) {
            console.log("ERROR IN ARGS: ", err);
            res.statusCode = 400;
            res.write(JSON.stringify({ error: "Not JSON" }));
            return;
        }
    }
    req["args"] = { ...searchParams, ...jsonBody };
    return fn(req, res);
};
export default args;
//# sourceMappingURL=args.js.map