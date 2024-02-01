import { routeFunc, PatchedRequest } from "../@types/common-types.js";

function parseAcceptLanguage(languageHeader: string) {
  // Split the header into individual language tags
  const languages = languageHeader.split(",");

  // Initialize an empty array to store language objects
  const parsedLanguages: Record<string, number> = {};

  // Iterate through each language tag
  languages.forEach((lang) => {
    // Extract language code and optional quality factor (q)
    const parts = lang.split(";");

    const languageCode = parts[0].trim();

    // Default quality factor to 1 if not present
    const qualityFactor = parts[1] ? parseFloat(parts[1].split("=")[1]) : 1;
    // Create a language object and add it to the array
    parsedLanguages[languageCode] = qualityFactor;
  });

  return parsedLanguages;
}

const context =
  (fn: routeFunc) =>
    async (req: PatchedRequest, res: Parameters<routeFunc>[1]) => {
      let languages;
      if (req.headers["accept-language"]!) {
        languages = parseAcceptLanguage(req.headers["accept-language"]);
      }
      req["context"] = {
        languages,
        userAgent: req.headers["user-agent"],
      };

      return fn(req, res);
    };

export default context;
