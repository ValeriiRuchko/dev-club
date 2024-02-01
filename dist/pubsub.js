import EventEmitter from "node:events";
const pubSub = new EventEmitter();
pubSub.setMaxListeners(1e3);
const pub = (eventName, ...rest) => {
    pubSub.emit(eventName, ...rest);
};
const safecall = (eventName, fn) => async (...args) => {
    try {
        await fn(...args);
    }
    catch (err) {
        console.error("\x1b[31m", "Rule Error", eventName, "\x1b[0m", err);
    }
};
const sub = (eventName, callback) => {
    pubSub.addListener(eventName, safecall(eventName, callback));
};
export { pub, sub };
//# sourceMappingURL=pubsub.js.map