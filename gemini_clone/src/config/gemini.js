// Other imports remain the same
import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";

// Replace with your actual API key if not using an environment variable
const apiKey = "AIzaSyBdYlcVmLLdgXNVQ4lclDWiERNOIBeW0co";
const genAI = new GoogleGenerativeAI(apiKey);

async function run(prompt) {
  const model = await genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
  });

  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
  };

  const chatSession = model.startChat({
    generationConfig,
    history: [],
  });

  const result = await chatSession.sendMessage(prompt);
  console.log(result.response.text());
  return result.response.text()
}

// Use `export default` to make `run` the default export
export default run;

