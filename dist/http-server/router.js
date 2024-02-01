import routes from "../routes.js";
import { pub } from "../pubsub.js";
const router = (fn) => async (req, res) => {
    let foundRoute;
    const url = new URL(req.url, "http://localhost");
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
        }
        catch (err) {
            console.error("REACHED", err);
            res.statusCode = err?.statusCode || 500;
            res.write(JSON.stringify({
                error: err?.message || "Couldn't execute route function",
            }));
        }
    }
    else {
        res.statusCode = 404;
        res.setHeader("Content-Type", "application/json");
        res.write(JSON.stringify({ error: "Not found" }));
    }
    return fn(req, res);
};
export default router;
//# sourceMappingURL=router.js.map