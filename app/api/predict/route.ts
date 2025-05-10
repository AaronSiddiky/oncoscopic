import { NextResponse } from 'next/server';
import { spawn } from 'child_process';
import path from 'path';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

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
    
    // Save the file temporarily
    const tempPath = path.join(process.cwd(), 'temp', `${Date.now()}.jpg`);
    require('fs').writeFileSync(tempPath, buffer);

    // Convert image to base64 for OpenAI
    console.log('=== [API] LLM validation running for image:', tempPath);
    try {
      const base64Image = buffer.toString('base64');
      const validationPrompt = `You are a dermatology image validation expert. Analyze this image and determine if it's suitable for skin cancer analysis. Consider:
1. Is this clearly a photo of human skin or a body part?
2. Is the image quality sufficient (not too blurry, well-lit, focused)?
3. Does it show a close-up view of the area of concern?

Reply with EXACTLY one word: either 'VALID' or 'INVALID'.`;

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

      const validationText = validationResponse.choices[0]?.message?.content?.toUpperCase().trim() || '';
      console.log('=== [API] LLM validation response:', validationText);

      if (validationText !== 'VALID') {
        require('fs').unlinkSync(tempPath);
        return NextResponse.json(
          {
            error: 'The uploaded image is not suitable for skin cancer analysis.',
            details: 'Your image appears to show either healthy, non-cancerous skin or content not relevant for skin cancer analysis.',
            disclaimer: DISCLAIMER
          },
          { status: 422 }
        );
      }
      console.log('=== [API] LLM validation passed, proceeding to model.');
    } catch (llmError) {
      console.error('=== [API] Validation check failed:', llmError);
      require('fs').unlinkSync(tempPath);
      
      return NextResponse.json(
        {
          error: 'The image validation service is temporarily unavailable.',
          details: 'Please try uploading your image again in a few moments.',
          disclaimer: DISCLAIMER
        },
        { status: 422 }
      );
    }

    // Run the Python prediction script using the virtual environment
    const pythonProcess = spawn('./venv/bin/python', [
      'predict.py',
      tempPath
    ]);

    let predictionData = '';
    let errorData = '';

    pythonProcess.stdout.on('data', (data) => {
      predictionData += data.toString();
    });

    pythonProcess.stderr.on('data', (data) => {
      errorData += data.toString();
      // Log debug information
      console.log('Python debug:', data.toString());
    });

    return await new Promise<Response>((resolve) => {
      pythonProcess.on('close', (code) => {
        // Clean up the temporary file
        require('fs').unlinkSync(tempPath);

        if (code !== 0) {
          console.error('Python script error:', errorData);
          resolve(
            NextResponse.json(
              {
                error: 'An error occurred while processing the image.',
                details: 'Our analysis system encountered an unexpected error. Please try again.',
                disclaimer: DISCLAIMER
              },
              { status: 500 }
            )
          );
          return;
        }

        try {
          const result = JSON.parse(predictionData);
          resolve(
            NextResponse.json({
              ...result,
              disclaimer: DISCLAIMER
            })
          );
        } catch (e) {
          console.error('Error parsing prediction data:', e);
          resolve(
            NextResponse.json(
              {
                error: 'Error processing model output',
                details: 'The system produced invalid output. Please try again.',
                disclaimer: DISCLAIMER
              },
              { status: 500 }
            )
          );
        }
      });
    });
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