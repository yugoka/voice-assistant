import { getSeparatedChatStream } from "./chat/chatSpeechStream";

const main = async () => {
  console.log("=== init ===");

  const stream = getSeparatedChatStream();
  for await (const chunk of stream) {
    console.log(chunk);
  }
};

main();
