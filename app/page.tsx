'use client';

import Image from 'next/image';
import ParticleBackground from './components/ParticleBackground';
import TypewriterTitle from './components/TypewriterTitle';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ImageUpload from './components/ImageUpload';
import { useState, useCallback } from 'react';
import { usePathname } from 'next/navigation';

export default function Home() {
  const [response, setResponse] = useState('');
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [prediction, setPrediction] = useState<{predicted_class: string; confidence: number} | null>(null);
  const pathname = usePathname();

  const handleSearch = async (searchQuery: string) => {
    try {
      setIsSearching(true);
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          query: searchQuery
        }),
      });
      
      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }
      setResponse(data.response);
    } catch (error) {
      console.error('Error:', error);
      setResponse('Sorry, there was an error processing your request.');
    } finally {
      setIsSearching(false);
    }
  };

  const handlePrediction = useCallback(
    (newPrediction: { predicted_class: string; confidence: number } | null) => {
      setPrediction(newPrediction);

      if (newPrediction) {
        const { predicted_class } = newPrediction;

        const prompt = `
I have a dermoscopic image that the model predicts is ${predicted_class}. Based on this specific image:

1. Predicted class justification  
   - Describe exactly why this lesion matches ${predicted_class}, referencing its color, shape, border, size, texture, or other visual cues.

2. Cancer type & differentiation 
   - Explain what type of skin cancer ${predicted_class} is, and how it differs from other common types (e.g. basal cell carcinoma, squamous cell carcinoma).

3. Symptoms  
   - List the typical symptoms patients experience with this cancer.

4. Risk factors  
   - Identify the major risk factors (genetic, environmental, behavioral).

5. Mortality rate  
   - Provide the overall 5-year mortality rate, and note any variation by stage.

6. Treatment options  
   - Detail standard treatments (surgery, radiation, systemic therapies) and any new or targeted approaches.

7. Prognosis  
   - Summarize expected outcomes and factors that influence prognosis.

8. Visual lesion description  
   - Give a vivid, case-specific description of the lesion's current appearance and what changes (e.g. increased redness, growth in diameter, uneven borders) to watch for.

9. Urgency of care  
   - Advise how urgently to seek medical attention (e.g. immediately, within 48 hours, routine dermatologist referral).

10. Mortality rate  
    - State the mortality rate for patients diagnosed with this type of cancer.

11. Severity & immediacy  
    - Emphasize the severity and any time-sensitive risks, with clear guidance on "when to go to the ER" vs. "schedule a dermatologist visit."

12. Specific recommendations  
    - Offer concrete next steps: referrals, diagnostic tests, lifestyle or sun-protection changes, follow-up intervals, and support resources.`;

        handleSearch(prompt.trim());
      }
    },
    [handleSearch, setPrediction]
  );

  const handleUserSearch = useCallback((searchQuery: string) => {
    if (!searchQuery.trim()) return;
    setQuery(searchQuery);
    // If there is a prediction, always ground the query in the diagnosis context
    if (prediction && prediction.predicted_class) {
      const diagnosisContext = `The user has been diagnosed with ${prediction.predicted_class}. Only answer questions strictly in the context of this diagnosis. If the question is unrelated, politely decline.`;
      const fullPrompt = `${diagnosisContext}\n\nUser question: ${searchQuery}`;
      handleSearch(fullPrompt);
    } else {
      handleSearch(searchQuery);
    }
  }, [prediction, handleSearch]);

  return (
    <main className="flex min-h-screen flex-col items-center relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <ParticleBackground />
      </div>
      
      <Navbar />
      
      <div className="z-10 space-y-8 text-center w-full max-w-6xl px-4 pt-24 pb-8">
        <TypewriterTitle 
          text="Machine Learning Application for Cancerous Skin Lesion Detection" 
          className="text-4xl font-bold tracking-tighter"
          speed={40}
        />
        
        <div className="bg-gray-200/10 rounded-full px-6 py-3 flex items-center justify-center shadow-sm w-fit mx-auto">
          <Image 
            src="/images/columbialogo.avif" 
            alt="Columbia University" 
            width={30} 
            height={30}
            className="mr-3"
          />
          <span className="text-sm font-medium">Made by Aaron Siddiky and Hilal Tokat</span>
        </div>

        <div className="w-full max-w-3xl mx-auto">
          <ImageUpload 
            onPrediction={handlePrediction}
            llmResponse={response}
            onSearch={handleUserSearch}
            isSearching={isSearching}
            onReportReady={() => {}}
          />
        </div>
      </div>
      
      <Footer />
    </main>
  );
}
