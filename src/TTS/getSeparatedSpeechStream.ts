import OpenAI from "openai";
import { getSeparatedChatStream } from "../chat/getSeparatedChatStream";
import { textToSpeech } from "./textToSpeech";
import { preprocess } from "../chat/preprocess";

export async function* getSeparatedSpeechStream(
  messages: OpenAI.Chat.ChatCompletionMessageParam[]
) {
  try {
    const stream = getSeparatedChatStream(messages);

    for await (const chunk of stream) {
      // 音声用に文章を前処理する
      const textForReading = preprocess(chunk);

      const { audioBinary } = await textToSpeech(textForReading);
      yield {
        message: chunk,
        audioBinary,
      };
    }
  } catch (error) {
    console.error(error);
  }
}
