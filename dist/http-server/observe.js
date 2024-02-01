import rules from "../rules.js";
import { sub } from "../pubsub.js";
console.group("Observing", rules.length, "rules");
rules.forEach(([event, handler]) => {
    sub(event, handler);
});
console.groupEnd();
//# sourceMappingURL=observe.js.map