
import { GoogleGenAI, Chat } from "@google/genai";

const API_KEY = process.env.API_KEY;

let chat: Chat | null = null;
let initAttempted = false;

const systemInstruction = `You are a helpful and friendly customer support assistant for Digikala, a large Iranian e-commerce website. 
Your name is 'Digi-bot'.
Answer questions concisely and professionally in Persian.
You can talk about products, orders, and shipping.
If you don't know the answer, politely say that you are unable to help with that request.
Keep your answers brief, ideally 2-3 sentences.`;

function initializeChat() {
  initAttempted = true;
  if (!API_KEY) {
    console.error("Gemini API key not found. Please set the API_KEY environment variable.");
    return;
  }
  const ai = new GoogleGenAI({ apiKey: API_KEY });
  chat = ai.chats.create({
    model: 'gemini-2.5-flash',
    config: {
      systemInstruction: systemInstruction,
    },
  });
}

export const getChatbotResponse = async (prompt: string): Promise<string> => {
  // Initialize chat on the first call and reuse the session
  if (!chat && !initAttempted) {
    initializeChat();
  }
  
  if (!API_KEY) {
    return "متاسفانه کلید API برای ارتباط با هوش مصنوعی تنظیم نشده است.";
  }

  // If initialization failed (e.g., no API key), return an error.
  if (!chat) {
     return "خطا در برقراری ارتباط با سرویس هوش مصنوعی. لطفا از معتبر بودن کلید API اطمینان حاصل کنید.";
  }

  try {
    const response = await chat.sendMessage({ message: prompt });
    return response.text;

  } catch (error) {
    console.error("Error getting response from Gemini API:", error);
    return "متاسفانه در حال حاضر امکان پاسخگویی وجود ندارد. لطفا بعدا تلاش کنید.";
  }
};
