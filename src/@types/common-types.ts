import { IncomingMessage, ServerResponse } from "node:http";

export interface PatchedRequest extends Record<string, any>, IncomingMessage { }

export type routeFunc<T = any> = (
  req: IncomingMessage,
  res: ServerResponse<IncomingMessage>,
) => T | void;
