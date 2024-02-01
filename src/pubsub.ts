import EventEmitter from "node:events";

const pubSub = new EventEmitter();
pubSub.setMaxListeners(1e3);

const pub = (eventName: string, ...rest: any[]) => {
  pubSub.emit(eventName, ...rest);
};

const safecall =
  (eventName: string, fn: () => void) =>
    async (...args: any[]) => {
      try {
        //@ts-expect-error
        await fn(...args);
      } catch (err) {
        console.error("\x1b[31m", "Rule Error", eventName, "\x1b[0m", err);
      }
    };

const sub = (eventName: string, callback: () => void) => {
  pubSub.addListener(eventName, safecall(eventName, callback));
};

export { pub, sub };
