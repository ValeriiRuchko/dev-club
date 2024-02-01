// import endpoints

import { IncomingMessage, ServerResponse } from "node:http";
import principles from "./principles/principles.js";
import randomBlock from "./svg/randomBlock.js";
import { svg, csv, textHtml, json } from "./http-server/wrapper.js";
import testHTML from "./test/test.html.js";
import libraryOverview from "./library/libraryOverview.js";

// parameter - name of the thing that function takes, and the actual value is argument

import { PatchedRequest, routeFunc } from "./@types/common-types.js";

type RouteHandlers = {
  [key: string]: routeFunc;
};

const resolver =
  (fn: (filter: Record<string, any>, context: any) => { [key: string]: any }) =>
    (req: PatchedRequest | any, res: ServerResponse<IncomingMessage>) => {
      return fn(req.args, req.context);
    };

const GET: RouteHandlers = {
  "/": async (req: IncomingMessage, res: ServerResponse<IncomingMessage>) => {
    res.write("Main page, hehehe");
  },
  "/api/echo": json(
    (req: PatchedRequest, res: ServerResponse<IncomingMessage>) => {
      return { args: req.args, context: req.context };
    },
  ),
  "/api/libraryOverview": json(resolver(libraryOverview)),
  "/test": textHtml(testHTML),
  "/principles": csv(principles),
  "/randomBlock": svg(randomBlock),
};

const POST: RouteHandlers = {
  "/api/salute": json(
    (req: PatchedRequest, res: ServerResponse<IncomingMessage>) => {
      return req.args;
    },
  ),
};

const PATCH: RouteHandlers = {};

const DELETE: RouteHandlers = {};

export default { GET, POST, PATCH, DELETE };
