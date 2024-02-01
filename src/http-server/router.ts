import routes from "../routes.js";
import type { PatchedRequest, routeFunc } from "../@types/common-types.js";
import { pub } from "../pubsub.js";

// now we'll implement decorator function

// (param) => (params) <-- a function with one param that returns a function with another set of params
// --- --- --- --- --- ---
// so decorator function is a function which just takes as parameter some outer function,
// then returnes some function which satifies the signature we need somewhere
// and at the end of this returned function executes the outer function taken
// Also it can return outer function while executing it, for some things like testing, logs, etc.

const router =
  (fn: routeFunc) =>
    async (req: PatchedRequest, res: Parameters<routeFunc>[1]) => {
      let foundRoute: routeFunc | undefined;
      // constructing better utility object to parse URL in parts
      const url = new URL(req.url!, "http://localhost");
      let pathname = url.pathname;
      let method = req.method;

      switch (method) {
        case "GET":
          foundRoute = routes.GET[pathname];
          break;
        case "POST":
          foundRoute = routes.POST[pathname];
          break;
        case "PATCH":
          foundRoute = routes.PATCH[pathname];
          break;
        case "DELETE":
          foundRoute = routes.DELETE[pathname];
          break;
        default:
          console.log("No corresponding routes found");
      }

      if (foundRoute) {
        try {
          const data = foundRoute(req, res);
          pub(url.pathname, req.args, req.context, { data });
        } catch (err: any) {
          console.error("REACHED", err);
          res.statusCode = err?.statusCode || 500;
          res.write(
            JSON.stringify({
              error: err?.message || "Couldn't execute route function",
            }),
          );
        }
      } else {
        res.statusCode = 404;
        res.setHeader("Content-Type", "application/json");
        res.write(JSON.stringify({ error: "Not found" }));
      }

      return fn(req, res);
    };

export default router;
