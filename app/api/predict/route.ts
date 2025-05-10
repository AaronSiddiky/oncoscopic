import { NextResponse } from 'next/server';
import OpenAI from 'openai';

// Add logging to check API key
console.log('=== [API] OpenAI API Key exists:', !!process.env.OPENAI_API_KEY);
console.log('=== [API] OpenAI API Key length:', process.env.OPENAI_API_KEY?.length);

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const ML_API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://oncoscopic-ml-api-51c113766de3.herokuapp.com';
const DISCLAIMER = "Note: Our system is currently trained to diagnose only 7 common types of skin cancer. While you can upload any image, including non-cancerous skin conditions, please be aware that results may not be accurate for non-diagnostic images or other types of skin conditions. Always consult with a healthcare professional for medical advice.";

export async function POST(request: Request): Promise<Response> {
  try {
    // Check if OpenAI API key is set
    if (!process.env.OPENAI_API_KEY) {
      console.error('=== [API] OpenAI API key is not set');
      return NextResponse.json(
        {
          error: 'Configuration error',
          details: 'OpenAI API key is not configured',
          disclaimer: DISCLAIMER
        },
        { status: 500 }
      );
    }

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
    console.log('=== [API] Starting image validation');
    try {
      const validationPrompt = `You are a dermatology image validation expert. Analyze this image and determine if it's suitable for skin cancer analysis. Consider:
1. Is this clearly a photo of human skin or a body part?
2. Is the image quality sufficient (not too blurry, well-lit, focused)?
3. Does it show a close-up view of the area of concern?

Reply with EXACTLY one word: either 'VALID' or 'INVALID'.`;

      console.log('=== [API] Sending request to OpenAI');
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

      console.log('=== [API] OpenAI response received');
      const validationText = validationResponse.choices[0]?.message?.content?.toUpperCase().trim() || '';
      console.log('=== [API] Validation result:', validationText);

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
      console.log('=== [API] Calling ML API at:', ML_API_URL);
      const mlFormData = new FormData();
      mlFormData.append('file', file, file.name);

      try {
        console.log('=== [API] ML API request details:', {
          url: `${ML_API_URL}/predict`,
          fileName: file.name,
          fileType: file.type,
          fileSize: file.size
        });

        const mlResponse = await fetch(`${ML_API_URL}/predict`, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
          },
          body: mlFormData,
        });

        console.log('=== [API] ML API response status:', mlResponse.status);
        const responseText = await mlResponse.text();
        console.log('=== [API] ML API response text:', responseText);

        if (!mlResponse.ok) {
          throw new Error(`ML API request failed with status ${mlResponse.status}: ${responseText}`);
        }

        try {
          const mlResult = JSON.parse(responseText);
          return NextResponse.json({
            ...mlResult,
            disclaimer: DISCLAIMER
          });
        } catch (parseError) {
          console.error('=== [API] Failed to parse ML API response:', parseError);
          throw new Error('Invalid response from ML API');
        }
      } catch (mlError: unknown) {
        console.error('=== [API] ML API error:', mlError);
        
        // Check if it's a parsing error
        if (mlError instanceof Error && mlError.message === 'Invalid response from ML API') {
          return NextResponse.json(
            {
              error: 'Invalid response from prediction service',
              details: 'The service returned an invalid response. Please try again.',
              disclaimer: DISCLAIMER
            },
            { status: 500 }
          );
        }
        
        return NextResponse.json(
          {
            error: 'ML API request failed',
            details: 'The prediction service is temporarily unavailable. Please try again in a few moments.',
            disclaimer: DISCLAIMER
          },
          { status: 422 }
        );
      }
    } catch (error: unknown) {
      const err = error as Error;
      console.error('=== [API] Error details:', {
        name: err.name,
        message: err.message,
        stack: err.stack
      });
      
      // Check for specific OpenAI errors
      if (err.message?.includes('API key')) {
        return NextResponse.json(
          {
            error: 'OpenAI API configuration error',
            details: 'There was an issue with the API key configuration.',
            disclaimer: DISCLAIMER
          },
          { status: 500 }
        );
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