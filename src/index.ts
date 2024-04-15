import { getSeparatedSpeechStream } from "./TTS/getSeparatedSpeechStream";

const main = async () => {
  console.log("=== init ===");

  const stream = getSeparatedSpeechStream([
    { role: "user", content: "こんにちは" },
  ]);
  for await (const chunk of stream) {
    console.log(chunk);
  }
};

main();
