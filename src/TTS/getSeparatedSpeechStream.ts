import OpenAI from "openai";
import { getSeparatedChatStream } from "../chat/getSeparatedChatStream";
import { textToSpeech } from "./textToSpeech";

export async function* getSeparatedSpeechStream(
  messages: OpenAI.Chat.ChatCompletionMessageParam[]
) {
  try {
    const stream = getSeparatedChatStream(messages);

    for await (const chunk of stream) {
      const { audioBinary } = await textToSpeech(chunk);
      yield {
        message: chunk,
        audioBinary,
      };
    }
  } catch (error) {
    console.error(error);
  }
}
