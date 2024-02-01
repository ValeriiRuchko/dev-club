import { IncomingMessage } from "http";
import { routeFunc } from "../@types/common-types.js";
import { PatchedRequest } from "../@types/common-types.js";

const parseBody = (req: IncomingMessage) =>
  new Promise((resolve) => {
    const bodyParts: Buffer[] = [];
    let res = "";

    req.on("data", (chunk: Buffer) => {
      bodyParts.push(chunk);
    });

    req.on("end", () => {
      res = Buffer.concat(bodyParts).toString();
      resolve(res);
    });
  });

const args =
  (fn: routeFunc) =>
    async (req: PatchedRequest, res: Parameters<routeFunc>[1]) => {
      let parsedURL: URL;
      let searchParams;
      if (req && req.url) {
        parsedURL = new URL(req.url, "http://localhost");
        searchParams = Object.fromEntries(parsedURL.searchParams.entries());
      }

      let jsonBody = {};

      // console.log(req.headers);
      // here we parse our body
      if (req.headers["content-type"] === "application/json") {
        const parsedBody = (await parseBody(req)) as string;
        try {
          const json = JSON.parse(parsedBody);
          if (typeof json === "object") {
            jsonBody = json;
          }
          // console.log("JSONBODY", jsonBody);
        } catch (err) {
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
