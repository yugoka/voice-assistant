import OpenAI from "openai";
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

console.log(process.env.CHATGPT_MODEL_NAME || "gpt-3.5-turbo");

export const chatWithOpenAIWithStream = async (
  messages: OpenAI.Chat.ChatCompletionMessageParam[]
) => {
  const stream = await openai.chat.completions.create({
    model: process.env.CHATGPT_MODEL_NAME || "gpt-3.5-turbo",
    messages,
    stream: true,
  });
  return stream;
};
