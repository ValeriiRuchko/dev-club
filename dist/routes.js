import principles from "./principles/principles.js";
import randomBlock from "./svg/randomBlock.js";
import { svg, csv, textHtml, json } from "./http-server/wrapper.js";
import testHTML from "./test/test.html.js";
import libraryOverview from "./library/libraryOverview.js";
const resolver = (fn) => (req, res) => {
    return fn(req.args, req.context);
};
const GET = {
    "/": async (req, res) => {
        res.write("Main page, hehehe");
    },
    "/api/echo": json((req, res) => {
        return { args: req.args, context: req.context };
    }),
    "/api/libraryOverview": json(resolver(libraryOverview)),
    "/test": textHtml(testHTML),
    "/principles": csv(principles),
    "/randomBlock": svg(randomBlock),
};
const POST = {
    "/api/salute": json((req, res) => {
        return req.args;
    }),
};
const PATCH = {};
const DELETE = {};
export default { GET, POST, PATCH, DELETE };
//# sourceMappingURL=routes.js.map