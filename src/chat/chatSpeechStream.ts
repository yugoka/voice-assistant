import { chatWithOpenAIWithStream } from "./chatWithOpenAI";
const SEPRARATOR_WORDS = ["。", "、", "！", "？"];

export async function* getSeparatedChatStream() {
  try {
    const stream = await chatWithOpenAIWithStream([
      { role: "user", content: "鵜を捕まえるお祭りについて説明して" },
    ]);

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
