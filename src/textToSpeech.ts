const textToSpeech = require("@google-cloud/text-to-speech");
const fs = require("fs");
const util = require("util");
const player = require("play-sound")();

console.log(process.env.SPEECH_TO_TEXT_CREDENTIALS_PATH);

// Google Cloud認証情報の設定
process.env.GOOGLE_APPLICATION_CREDENTIALS =
  process.env.SPEECH_TO_TEXT_CREDENTIALS_PATH;

// クライアントの初期化
const client = new textToSpeech.TextToSpeechClient();

async function textToAudio(text: string) {
  const request = {
    input: { text: text },
    voice: { languageCode: "ja-JP", ssmlGender: "NEUTRAL" },
    audioConfig: { audioEncoding: "MP3" },
  };

  const [response] = await client.synthesizeSpeech(request);
  const outputFile = "output.mp3";
  const writeFile = util.promisify(fs.writeFile);
  await writeFile(outputFile, response.audioContent, "binary");
  console.log(`音声ファイルが${outputFile}に保存されました。`);

  // 音声ファイルの再生
  player.play(outputFile, function (err: any) {
    if (err) throw err;
  });
}

// 使用例
textToAudio("こんにちは、Google Cloud Text-to-Speechです。");
