import { getSeparatedSpeechStream } from "./TTS/getSeparatedSpeechStream";

const main = async (text: string) => {
  const stream = getSeparatedSpeechStream([{ role: "user", content: text }]);
  for await (const chunk of stream) {
    console.log(chunk);
  }
};

(async () => {
  console.log("=== init ===");
  await main(
    " 今日はポップコーンが弾けるようにメカニズムについて完結に教えてもらえますか？ "
  );
  console.log("======");

  await main("こんばんは");
})();
