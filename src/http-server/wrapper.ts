import { routeFunc } from "../@types/common-types.js";

export const textHtml =
  (fn: routeFunc) =>
    async (req: Parameters<routeFunc>[0], res: Parameters<routeFunc>[1]) => {
      res.setHeader("Content-Type", "text/html");
      const data = fn(req, res);

      res.write(data);

      return data;
    };

export const svg =
  (fn: routeFunc) =>
    async (req: Parameters<routeFunc>[0], res: Parameters<routeFunc>[1]) => {
      res.setHeader("Content-Type", "image/svg+xml");
      const data = fn(req, res);

      res.write(data);

      return data;
    };

export const csv =
  (fn: routeFunc) =>
    async (req: Parameters<routeFunc>[0], res: Parameters<routeFunc>[1]) => {
      res.setHeader("Content-Type", "text/csv");
      const data = fn(req, res);

      res.write(data);

      return data;
    };

export const json =
  (fn: routeFunc) =>
    async (req: Parameters<routeFunc>[0], res: Parameters<routeFunc>[1]) => {
      const data = fn(req, res);
      const json = JSON.stringify({ data });

      res.setHeader("Content-Type", "application/json");
      res.write(json);

      return data;
    };
