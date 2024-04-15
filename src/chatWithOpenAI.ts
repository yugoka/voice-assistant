import OpenAI from "openai";
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const chatWithOpenAI = async (
  messages: OpenAI.Chat.ChatCompletionMessageParam[]
) => {
  const stream = await openai.chat.completions.create({
    model: process.env.CHATGPT_MODEL_NAME || "gpt-3.5-turbo",
    messages,
    stream: true,
  });
  for await (const chunk of stream) {
    process.stdout.write(chunk.choices[0]?.delta?.content || "");
  }
};
