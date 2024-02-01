import { pub } from "./pubsub.js";
// first item of the tuple - name of the event
// second item: handler

setInterval(() => {
  pub("everyFiveSeconds");
}, 5000);

export default [
  [
    "everyFiveSeconds",
    () => {
      console.log("Do something");
    },
  ],
  [
    "/",
    () => {
      console.count("/");
    },
  ],

  [
    "/randomBlock",
    (args: any, { languages }: any) => {
      for (const lang in languages) {
        console.count(lang);
      }
    },
  ],

  [
    "/",
    (args: any, { languages }: any) => {
      if (languages["en"]) {
        console.warn("Hold up scandinavian cowboy");
      }
    },
  ],
];
