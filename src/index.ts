import { chatWithOpenAI } from "./chatWithOpenAI";

const main = async () => {
  try {
    const response = await chatWithOpenAI([
      { role: "user", content: "こんにちは" },
    ]);
    console.log(response);
  } catch (error) {
    console.error(error);
  }
};

main();
