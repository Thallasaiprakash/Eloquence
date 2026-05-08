import { OpenAI } from "openai";
import { NextResponse } from "next/server";

const getOpenAIClient = () => {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    console.warn("OPENAI_API_KEY is missing. AI features will be limited.");
    return null;
  }
  return new OpenAI({ apiKey });
};

export async function POST(req: Request) {
  try {
    const openai = getOpenAIClient();
    if (!openai) {
      return NextResponse.json({ 
        content: "That's a compelling point you've raised. To help us build a stronger academic argument, should we focus on the ethical implications of this approach, or should we look into the practical sustainability metrics first? I'm ready to help you structure this into a powerful introductory paragraph." 
      });
    }
    const { messages, context } = await req.json();

    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: `You are Eloquence, a sophisticated, elegant, and intelligent AI writing assistant. 
          Your personality is feminine, warm, supportive, and highly professional. 
          You help users write high-quality essays through conversation.
          
          Guidelines:
          - Be encouraging and academically rigorous.
          - Ask one clear follow-up question at a time to help the user refine their thoughts.
          - Focus on structure, logic, and depth.
          - Your tone should feel like a premium mentor.
          
          Context about the current essay:
          ${context || "No context provided yet."}`
        },
        ...messages
      ],
      stream: true,
    });

    // Handle streaming response if needed, for now returning as JSON for simplicity in this demo
    // In a real app, you'd use OpenAIStream from 'ai' package
    
    return NextResponse.json({ 
      content: "This is a simulated AI response. In production, this would be a real-time stream from GPT-4." 
    });
  } catch (error) {
    console.error("AI API Error:", error);
    return NextResponse.json({ error: "Failed to process AI request" }, { status: 500 });
  }
}
