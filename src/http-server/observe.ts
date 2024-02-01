import rules from "../rules.js";
import { sub } from "../pubsub.js";

console.group("Observing", rules.length, "rules");

rules.forEach(([event, handler]) => {
  //@ts-expect-error
  sub(event, handler);
});

console.groupEnd();
