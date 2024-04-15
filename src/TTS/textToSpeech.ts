import path from "path";
import { generateUniqueFileName } from "../util/generateUniqueFileName";

const gcpTextToSpeech = require("@google-cloud/text-to-speech");
const fs = require("fs");
const util = require("util");

// Google Cloud認証情報の設定
process.env.GOOGLE_APPLICATION_CREDENTIALS =
  process.env.SPEECH_TO_TEXT_CREDENTIALS_PATH;

// クライアントの初期化
const client = new gcpTextToSpeech.TextToSpeechClient();

export async function textToSpeech(text: string) {
  console.log(`[TTS] Start Generating: ${text}`);

  const request = {
    input: { text: text },
    voice: {
      languageCode: "ja-JP",
      ssmlGender: "NEUTRAL",
      name: "ja-JP-Wavenet-A",
    },
    audioConfig: { audioEncoding: "MP3" },
  };

  const [response] = await client.synthesizeSpeech(request);
  const outputFile = path.join(
    process.env.AUDIO_FILE_OUTPUT_PATH || "",
    `${generateUniqueFileName()}.mp3`
  );
  const writeFile = util.promisify(fs.writeFile);
  await writeFile(outputFile, response.audioContent, "binary");

  return outputFile;
}
