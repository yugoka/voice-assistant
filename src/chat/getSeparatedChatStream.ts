import OpenAI from "openai";
import { chatWithOpenAIWithStream } from "./chatWithOpenAI";
const SEPRARATOR_WORDS = ["。", "、", "！", "？"];

export async function* getSeparatedChatStream(
  messages: OpenAI.Chat.ChatCompletionMessageParam[]
) {
  try {
    const stream = await chatWithOpenAIWithStream(messages);

    let sectionText = "";
    for await (const chunk of stream) {
      const chunkText = chunk.choices[0].delta.content;
      if (chunkText) {
        sectionText += chunkText;

        // 区切り文字を含むなら小分けにして送信
        if (SEPRARATOR_WORDS.some((word) => chunkText?.includes(word))) {
          if (sectionText.length >= 30) {
            yield sectionText;
            sectionText = "";
          }
        }
      }
    }

    // 最後のデータを送信
    if (sectionText) {
      yield sectionText;
    }
  } catch (error) {
    console.error(error);
  }
}
