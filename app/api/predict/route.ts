import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const ML_API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://oncoscopic-ml-api-51c113766de3.herokuapp.com';
const DISCLAIMER = "Note: Our system is currently trained to diagnose only 7 common types of skin cancer. While you can upload any image, including non-cancerous skin conditions, please be aware that results may not be accurate for non-diagnostic images or other types of skin conditions. Always consult with a healthcare professional for medical advice.";

export async function POST(request: Request): Promise<Response> {
  try {
    const formData = await request.formData();
    const file = formData.get('image') as File;
    
    if (!file) {
      return NextResponse.json(
        { error: 'No image file provided' },
        { status: 400 }
      );
    }

    // Convert the file to a buffer
    const buffer = Buffer.from(await file.arrayBuffer());
    const base64Image = buffer.toString('base64');

    // Validate image using OpenAI
    console.log('=== [API] LLM validation running for image');
    try {
      const validationPrompt = `You are a dermatology image validation expert. Analyze this image and determine if it's suitable for skin cancer analysis. Consider:
1. Is this clearly a photo of human skin or a body part?
2. Is the image quality sufficient (not too blurry, well-lit, focused)?
3. Does it show a close-up view of the area of concern?

Reply with EXACTLY one word: either 'VALID' or 'INVALID'.`;

      console.log('=== [API] Attempting OpenAI validation with image size:', buffer.length);
      
      const validationResponse = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content: validationPrompt
          },
          {
            role: "user",
            content: [
              {
                type: "image_url",
                image_url: {
                  url: `data:image/jpeg;base64,${base64Image}`,
                },
              },
            ],
          },
        ],
        max_tokens: 10,
      });

      console.log('=== [API] Raw OpenAI response:', JSON.stringify(validationResponse));
      const validationText = validationResponse.choices[0]?.message?.content?.toUpperCase().trim() || '';
      console.log('=== [API] LLM validation response:', validationText);

      if (validationText !== 'VALID') {
        return NextResponse.json(
          {
            error: 'The uploaded image is not suitable for skin cancer analysis.',
            details: 'Your image appears to show either healthy, non-cancerous skin or content not relevant for skin cancer analysis.',
            disclaimer: DISCLAIMER
          },
          { status: 422 }
        );
      }
      
      // Call the ML API for prediction
      const mlFormData = new FormData();
      mlFormData.append('image', file);

      const mlResponse = await fetch(`${ML_API_URL}/predict`, {
        method: 'POST',
        body: mlFormData,
      });

      if (!mlResponse.ok) {
        throw new Error('ML API request failed');
      }

      const mlResult = await mlResponse.json();
      
      return NextResponse.json({
        ...mlResult,
        disclaimer: DISCLAIMER
      });

    } catch (error: unknown) {
      const llmError = error as Error & { response?: { data: any } };
      console.error('=== [API] Validation check failed - Full error:', llmError);
      console.error('=== [API] Error name:', llmError.name);
      console.error('=== [API] Error message:', llmError.message);
      if (llmError.response) {
        console.error('=== [API] OpenAI response:', llmError.response.data);
      }
      
      return NextResponse.json(
        {
          error: 'The image validation service is temporarily unavailable.',
          details: 'Please try uploading your image again in a few moments.',
          disclaimer: DISCLAIMER
        },
        { status: 422 }
      );
    }
  } catch (error) {
    console.error('Request processing error:', error);
    return NextResponse.json(
      {
        error: 'Failed to process the request',
        details: 'An unexpected error occurred. Please try again.',
        disclaimer: DISCLAIMER
      },
      { status: 500 }
    );
  }
} 