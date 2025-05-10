# OncoScopic

## Abstract
OncoScopic is one of the world's first AI-agentic models for skin cancer detection, developed at Columbia University by Aaron Siddiky and Hilal Tokat. It pairs a two-stage pipeline—GPT-4o for image-quality validation and a custom convolutional neural network (CNN) trained on ISIC data—to classify seven lesion types. A second LLM then generates patient–specific PDF reports, delivering actionable insights (mortality risk, next-step guidance) in a frictionless web interface. OncoScopic's objective was and has been to democratize early detection, close healthcare care gaps, and empower users with diagnosis and context-based recommendations.

## Introduction
Skin cancer is the most common malignancy worldwide, but early detection dramatically improves outcomes. Although research-grade CNNs can reach 95% accuracy on benchmark datasets, these tools remain locked behind paywalls or in academic papers yet to be readily available on the internet. OncoScopic bridges this gap with a web-based, novel AI agentic structure that lets anyone upload a skin-lesion photo, receive a classification among seven lesion types (actinic keratosis, basal cell carcinoma, dermatofibroma, melanoma, melanocytic nevi, pigmented benign keratosis, squamous cell carcinoma), and download a clinician-ready PDF report. Our deliverable is 'novel' due to the agentic structure developed.

## Methods and Materials
### Dataset and Neural Network
We trained on the ISIC ("Skin Cancer MNIST") dataset of 10,015 dermoscopic images ([link](https://www.kaggle.com/kmader/skin-cancer-mnist-ham10000)). To validate generalization, we separated it: 25% testing, and 75% training. The data was trained on a Convolutional Neural Network, with the highest accuracy recorded on the data set as 83%. There are certain limitations to our CNN:
- The image classification model is able to detect the skin cancer diagnoses of 7 diagnoses types. This presented us with a unique opportunity to develop a novel agentic structure, we used a LLM to act as image validation, when the user uploads an image of healthy skin, or of something irrelevant (figure 1), the LLM does not run the model.
- Accuracy, and confidence rates oscillate. The novelty, and unique value proposition of this project is the agentic structure. The computational intensiveness, the limited budget for this project (i.e Model needed to be deployed on paid cloud platform - Heroku), and the time scale, made maximizing accuracy rate not a priority and out of scope.

## Oncoscopic Agentic Workflow
1. **Quality Gate:** GPT-4o receives the raw upload, checks focus, lighting, and framing, and only passes valid photos onward. Figure 1 below indicates an image that is blocked.
2. **CNN Classification:**
   - **Input:** 28×28 RGB, normalized.
   - **Architecture:** Four Conv(3×3)–ReLU–MaxPool blocks, then Dense(512)–ReLU, Dense(128)–ReLU, Softmax(7).
   - **Training:** Adam (lr=1e-4), batch=64, categorical cross-entropy.
3. **PDF Report:** The predicted label + confidence feed a GPT-4o prompt that outputs a structured, print-ready PDF: diagnosis summary, risk statistics, and "next-step" advice.

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
