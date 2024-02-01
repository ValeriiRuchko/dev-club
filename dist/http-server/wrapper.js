export const textHtml = (fn) => async (req, res) => {
    res.setHeader("Content-Type", "text/html");
    const data = fn(req, res);
    res.write(data);
    return data;
};
export const svg = (fn) => async (req, res) => {
    res.setHeader("Content-Type", "image/svg+xml");
    const data = fn(req, res);
    res.write(data);
    return data;
};
export const csv = (fn) => async (req, res) => {
    res.setHeader("Content-Type", "text/csv");
    const data = fn(req, res);
    res.write(data);
    return data;
};
export const json = (fn) => async (req, res) => {
    const data = fn(req, res);
    const json = JSON.stringify({ data });
    res.setHeader("Content-Type", "application/json");
    res.write(json);
    return data;
};
//# sourceMappingURL=wrapper.js.map