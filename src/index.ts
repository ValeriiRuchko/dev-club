import http, { ServerResponse } from "node:http";
import router from "./http-server/router.js";
import args from "./http-server/args.js";
import { PatchedRequest } from "./@types/common-types.js";
import context from "./http-server/context.js";

import "./http-server/observe.js";

const server = http.createServer(
  args(
    context(
      router(async (req: PatchedRequest, res: ServerResponse) => {
        // console.log("REQUEST_ARGS: ", req.args);
        // console.log("REQUEST CONTEXT", req.context);
        // console.log(req.headers);
        res.end();
      }),
    ),
  ),
);

server.listen(8080, () => {
  console.log("Server started");
});
