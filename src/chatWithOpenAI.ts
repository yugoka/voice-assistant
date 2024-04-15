import OpenAI from "openai";
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const chatWithOpenAI = async (
  messages: OpenAI.Chat.ChatCompletionMessageParam[]
) => {
  const stream = await openai.chat.completions.create({
    model: "gpt-4-turbo",
    messages,
    stream: true,
  });
  for await (const chunk of stream) {
    process.stdout.write(chunk.choices[0]?.delta?.content || "");
  }
};
