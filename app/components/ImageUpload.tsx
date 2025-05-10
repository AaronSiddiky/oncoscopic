import { useState, useEffect } from 'react';
import Image from 'next/image';

interface PredictionResult {
  predicted_class: string;
  confidence: number;
}

interface ImageUploadProps {
  onPrediction: (prediction: PredictionResult | null) => void;
  llmResponse: string | null;
  onReportReady: () => void;
  onSearch: (query: string) => void;
  isSearching: boolean;
}

export default function ImageUpload({ 
  onPrediction, 
  llmResponse, 
  onReportReady,
  onSearch,
  isSearching 
}: ImageUploadProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [prediction, setPrediction] = useState<PredictionResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [errorDetails, setErrorDetails] = useState<string | null>(null);
  const [errorDisclaimer, setErrorDisclaimer] = useState<string | null>(null);
  const [generatingPdf, setGeneratingPdf] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResponse, setSearchResponse] = useState<string | null>(null);

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Display selected image
    const reader = new FileReader();
    reader.onload = (e) => {
      setSelectedImage(e.target?.result as string);
    };
    reader.readAsDataURL(file);

    // Reset states
    setPrediction(null);
    setError(null);
    setErrorDetails(null);
    setErrorDisclaimer(null);
    setLoading(true);
    onPrediction(null);

    try {
      const formData = new FormData();
      formData.append('image', file);

      const response = await fetch('/api/predict', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Prediction failed');
        setErrorDetails(data.details || null);
        setErrorDisclaimer(data.disclaimer || null);
        setLoading(false);
        return;
      }

      setPrediction(data);
      onPrediction(data);
      console.log('Raw model output:', data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setErrorDetails(null);
      setErrorDisclaimer(null);
      setLoading(false);
    }
  };

  const handleDownloadReport = async () => {
    if (!prediction || !llmResponse) {
      console.log('Missing data for report:', { hasPrediction: !!prediction, hasLlmResponse: !!llmResponse });
      setError('Please wait for the analysis to complete before downloading the report');
      return;
    }

    try {
      setError(null);
      setGeneratingPdf(true);
      console.log('Sending report generation request with:', {
        predictedClass: prediction.predicted_class,
        confidence: prediction.confidence,
        hasLlmResponse: !!llmResponse,
        llmResponseLength: llmResponse.length,
        hasImageUrl: !!selectedImage
      });

      const response = await fetch('/api/generate-report', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          predictedClass: prediction.predicted_class,
          confidence: prediction.confidence,
          llmResponse: llmResponse,
          imageUrl: selectedImage
        }),
      });

      if (!response.ok) {
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          const errorData = await response.json();
          throw new Error(errorData.details || 'Failed to generate report');
        } else {
          throw new Error(`Failed to generate report: ${response.status} ${response.statusText}`);
        }
      }

      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/pdf')) {
        throw new Error('Received invalid response format from server');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'skin-lesion-report.pdf';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (err) {
      console.error('Error generating report:', err);
      setError(err instanceof Error ? err.message : 'Failed to generate report');
    } finally {
      setGeneratingPdf(false);
    }
  };

  const handleSearchSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch(searchQuery.trim());
      setSearchResponse(null); // Clear previous response
    }
  };

  // Update search response when llmResponse changes
  useEffect(() => {
    if (!isSearching && llmResponse) {
      setSearchResponse(llmResponse);
    }
  }, [isSearching, llmResponse]);

  // Call onReportReady when both prediction and LLM response are available
  useEffect(() => {
    if (prediction && llmResponse) {
      setLoading(false);
      onReportReady();
    }
  }, [prediction, llmResponse, onReportReady]);

  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      <div className="mb-8">
        <div className="bg-white shadow-lg rounded-lg border-2 border-black p-6">
          <label className="block text-xl font-bold text-black mb-4">
            Upload Skin Lesion Image
          </label>
          <div className="relative">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="block w-full text-sm text-gray-500
                file:mr-4 file:py-3 file:px-6
                file:rounded-lg file:border-2
                file:border-black
                file:text-sm file:font-bold
                file:bg-black file:text-white
                hover:file:bg-gray-800
                cursor-pointer
                focus:outline-none"
            />
          </div>
        </div>
      </div>

      {selectedImage && (
        <div className="mb-8">
          <div className="bg-white shadow-lg rounded-lg border-2 border-black p-2">
            <div className="relative w-full h-64">
              <Image
                src={selectedImage}
                alt="Selected skin lesion"
                fill
                className="object-contain rounded-lg"
              />
            </div>
          </div>
        </div>
      )}

      {loading && (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black mx-auto"></div>
          <p className="mt-2 text-gray-600">Analyzing image...</p>
        </div>
      )}

      {error && (
        <div className="bg-red-50 border-2 border-red-200 text-red-700 px-4 py-3 rounded-lg mb-8">
          <p>{error}</p>
          {errorDetails && <p className="mt-2 text-sm text-red-600">{errorDetails}</p>}
          {errorDisclaimer && <p className="mt-2 text-xs text-gray-500 italic">{errorDisclaimer}</p>}
        </div>
      )}

      {prediction && (
          (() => {
          const trainedDiagnoses = [
            'bkl', // Benign keratosis-like lesions
            'bcc', // Basal cell carcinoma
            'akiec', // Actinic keratoses
            'vasc', // Vascular lesions
            'nv', // Melanocytic nevi
            'mel', // Melanoma
            'df' // Dermatofibroma
          ];
          if (!trainedDiagnoses.includes(prediction.predicted_class)) {
            return (
              <div className="bg-white shadow-lg rounded-lg border-2 border-black p-6 mb-8">
                <h3 className="text-xl font-bold text-black mb-4">Analysis Results</h3>
                <div className="space-y-3">
                  <p className="flex items-center justify-between border-b border-gray-200 pb-2">
                    <span className="font-medium text-gray-700">Predicted Condition:</span>
                    <span className="font-bold text-black">Unidentifiable</span>
                  </p>
                  <p className="text-gray-700">
                    The uploaded image is not within the scope of the 7 trained diagnoses. Either there is no cancer, or the image does not fall within the 7 primary types used by Oncoscopic.
                  </p>
                </div>
              </div>
            );
          }
          return (
            <div className="bg-white shadow-lg rounded-lg border-2 border-black p-6 mb-8">
              <h3 className="text-xl font-bold text-black mb-4">Analysis Results</h3>
              <div className="space-y-3">
                <p className="flex items-center justify-between border-b border-gray-200 pb-2">
                  <span className="font-medium text-gray-700">Predicted Condition:</span>
                  <span className="font-bold text-black">{prediction.predicted_class}</span>
                </p>
                <p className="flex items-center justify-between border-b border-gray-200 pb-2">
                  <span className="font-medium text-gray-700">Confidence:</span>
                  <span className="font-bold text-black">{prediction.confidence.toFixed(2)}%</span>
                </p>
                {llmResponse && (
                  <button
                    onClick={handleDownloadReport}
                    disabled={generatingPdf}
                    className="mt-6 bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50 w-full font-medium"
                  >
                    {generatingPdf ? 'Generating Report...' : 'Download Report'}
                  </button>
                )}
              </div>
            </div>
          );
        })()
      )}

      {prediction && llmResponse && (
        <>
          <form onSubmit={handleSearchSubmit} className="relative mb-8">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Ask further questions about your diagnosis..."
              className="w-full px-6 py-4 pr-16 rounded-lg border-2 border-black text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-black transition-all"
            />
            <button
              type="submit"
              disabled={isSearching}
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-black text-white p-2 rounded-full hover:bg-gray-800 transition-colors disabled:opacity-50"
            >
              {isSearching ? (
                <div className="animate-spin rounded-full h-6 w-6 border-2 border-white border-t-transparent" />
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              )}
            </button>
          </form>

          {searchResponse && (
            <div className="bg-white shadow-lg rounded-lg border-2 border-black p-6 mb-8">
              <div className="prose prose-sm max-w-none">
                {searchResponse.split('\n').map((paragraph, index) => (
                  <p key={index} className="mb-4 last:mb-0">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
} 