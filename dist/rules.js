export default [
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