import { IncomingMessage, ServerResponse } from "node:http";

const testHTML = (req: IncomingMessage, res: ServerResponse) => `
<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Dev club</title>
</head>

<body>
  It's test page!
</body>

</html>
`;

export default testHTML;
