import { pub } from "./pubsub.js";
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
        (args, { languages }) => {
            for (const lang in languages) {
                console.count(lang);
            }
        },
    ],
    [
        "/",
        (args, { languages }) => {
            if (languages["en"]) {
                console.warn("Hold up scandinavian cowboy");
            }
        },
    ],
];
//# sourceMappingURL=rules.js.map