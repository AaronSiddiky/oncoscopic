import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const languagePrompts = {
  en: "You are a skin cancer expert that will provide actionable advice for the user at home based on their skin cancer diagnoses. You will also provide information about the skin cancer and the best way to treat it at home. Respond in English.",
};

export async function POST(request: Request)    {
  try {
    const { query, lang = 'en' } = await request.json();
    const systemPrompt = languagePrompts[lang as keyof typeof languagePrompts] || languagePrompts.en;

    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: systemPrompt
        },
        {
          role: "user",
          content: query
        }
      ],
      model: "gpt-3.5-turbo",
    });

    // Remove all markdown bold (**) from the LLM response
    const cleanedResponse = completion.choices[0].message.content.replace(/\*\*/g, '');

    return NextResponse.json({ response: cleanedResponse });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Failed to process request' }, { status: 500 });
  }
} 