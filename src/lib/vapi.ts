import Vapi from '@vapi-ai/web';

const apiKey = process.env.NEXT_PUBLIC_VAPI_API_KEY;
console.log("VAPI API Key present:", !!apiKey);

if (!apiKey) {
  console.error("VAPI API Key is missing!");
}

export const vapi = new Vapi(apiKey as string);

console.log("VAPI client initialized:", vapi);
