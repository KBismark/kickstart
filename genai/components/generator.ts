import { GoogleGenerativeAI } from "@google/generative-ai";

// Set  API KEY to EXPO_PUBLIC_GEMINI_API_KEY in your environment keys
const API_KEY = process.env.EXPO_PUBLIC_GEMINI_API_KEY;
console.log(API_KEY);

const genAI = new GoogleGenerativeAI(API_KEY as string);

export async function askAI() {
  // The Gemini 1.5 models are versatile and work with both text-only and multimodal prompts
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});

  const prompt = "Write a blog about a magic backpack. Add sources to a related image to be displayed to users."
    console.log(876);
    
  const result = await model.generateContent(prompt);
  const response = await result.response;
//   console.log(response);
  
  const text = response.text();
  console.log(text);
}





const OPEN_AI_KEY = process.env.EXPO_PUBLIC_OPEN_AI_KEY;
console.log(OPEN_AI_KEY);

export async function openAI_Image() {
  const image = await fetch('https://api.openai.com/v1/images/generations',{
        body:JSON.stringify({
            prompt: "A cute baby sea otter",

        }
    ),
    headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${OPEN_AI_KEY}`,
    },
    method: 'POST'
  }).then((data)=>{
    console.log(data, 909);
    
  })
  //openai.images.generate({ model: "dall-e-3", prompt: "A cute baby sea otter", n: 1 });
//   const res = image.json()
//   console.log(res);
}

