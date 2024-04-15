import path from "path";
import { generateUniqueFileName } from "../util/generateUniqueFileName";

const gcpTextToSpeech = require("@google-cloud/text-to-speech");
const fs = require("fs").promises;
const util = require("util");

// Google Cloud認証情報の設定
process.env.GOOGLE_APPLICATION_CREDENTIALS =
  process.env.GOOGLE_APPLICATION_CREDENTIALS;

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
    audioConfig: { audioEncoding: "MP3", speakingRate: 1.1 },
  };

  const [response] = await client.synthesizeSpeech(request);

  return { audioBinary: response.audioContent };
}
