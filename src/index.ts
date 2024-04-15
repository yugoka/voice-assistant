import express, { Request, Response } from "express";
import { getSeparatedSpeechStream } from "./TTS/getSeparatedSpeechStream";

const app = express();
const port = process.env.PORT;

app.use(express.json());

app.post("/speech", async (req: Request, res: Response) => {
  const { text } = req.body;
  if (typeof text !== "string") {
    res.status(400).send("Invalid request");
    return;
  }
  const stream = getSeparatedSpeechStream([{ role: "user", content: text }]);

  res.setHeader("Content-Type", "text/plain");
  res.status(200);

  for await (const chunk of stream) {
    res.write(chunk);
  }

  res.end();
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
