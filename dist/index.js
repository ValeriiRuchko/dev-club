import http from "node:http";
import router from "./http-server/router.js";
import args from "./http-server/args.js";
import context from "./http-server/context.js";
import "./http-server/observe.js";
const server = http.createServer(args(context(router(async (req, res) => {
    res.end();
}))));
server.listen(8080, () => {
    console.log("Server started");
});
//# sourceMappingURL=index.js.map