import OpenAI from "openai";
import { chatWithOpenAIWithStream } from "./chatWithOpenAI";
const SEPRARATOR_WORDS = ["。", "、", "！", "？"];

export async function* getSeparatedChatStream(
  messages: OpenAI.Chat.ChatCompletionMessageParam[]
) {
  try {
    const stream = await chatWithOpenAIWithStream(messages);

    let sectionCount = 0;
    let sectionText = "";
    for await (const chunk of stream) {
      const chunkText = chunk.choices[0].delta.content;
      if (chunkText) {
        sectionText += chunkText;

        // 区切り文字を含むなら小分けにして送信
        if (SEPRARATOR_WORDS.some((word) => chunkText?.includes(word))) {
          // 初期レスポンスを早めるため、最初のセクションは文字数制限を無視する
          if (sectionText.length >= 30 || sectionCount === 0) {
            yield sectionText;
            sectionText = "";
            sectionCount += 1;
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
