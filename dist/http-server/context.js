function parseAcceptLanguage(languageHeader) {
    const languages = languageHeader.split(",");
    const parsedLanguages = {};
    languages.forEach((lang) => {
        const parts = lang.split(";");
        const languageCode = parts[0].trim();
        const qualityFactor = parts[1] ? parseFloat(parts[1].split("=")[1]) : 1;
        parsedLanguages[languageCode] = qualityFactor;
    });
    return parsedLanguages;
}
const context = (fn) => async (req, res) => {
    let languages;
    if (req.headers["accept-language"]) {
        languages = parseAcceptLanguage(req.headers["accept-language"]);
    }
    req["context"] = {
        languages,
        userAgent: req.headers["user-agent"],
    };
    return fn(req, res);
};
export default context;
//# sourceMappingURL=context.js.map