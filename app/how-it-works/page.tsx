import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ParticleBackground from '../components/ParticleBackground';
import Image from 'next/image';

export default function HowItWorksPage() {
  return (
    <main className="min-h-screen relative p-4">
      <div className="absolute inset-0 z-0">
        <ParticleBackground />
      </div>
      
      <Navbar />
      
      <div className="max-w-5xl mx-auto pt-24 pb-16 z-10 relative">
        <h1 className="text-4xl font-bold mb-6 text-center">How It Works</h1>
        <p className="text-center text-lg mb-12 max-w-3xl mx-auto">
          Oncoscopic leverages advanced AI technology to provide preliminary skin cancer detection, making early screening accessible to everyone.
        </p>
        
        {/* Step-by-step process */}
        <div className="mb-16">
          <div className="flex flex-col lg:flex-row gap-8 mb-12">
            <div className="flex-1 bg-white/90 backdrop-blur-sm rounded-xl p-8 shadow-md border-2 border-black transform transition-transform hover:-translate-y-1">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center text-xl font-bold mr-4">1</div>
                <h2 className="text-2xl font-bold">Upload Your Image</h2>
              </div>
              <p className="text-gray-700 leading-relaxed mb-4">
                Take a clear photo of the skin lesion or area of concern and upload it through our secure platform. Our system supports various image formats and will guide you on optimal image quality.
              </p>
              <div className="bg-gray-100 p-4 rounded-lg">
                <p className="text-sm text-gray-600">
                  <strong>Tip:</strong> Ensure good lighting and focus when taking your photo. Include a ruler or coin for size reference if possible.
                </p>
              </div>
            </div>
            
            <div className="flex-1 bg-white/90 backdrop-blur-sm rounded-xl p-8 shadow-md border-2 border-black transform transition-transform hover:-translate-y-1">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center text-xl font-bold mr-4">2</div>
                <h2 className="text-2xl font-bold">AI Analysis</h2>
              </div>
              <p className="text-gray-700 leading-relaxed mb-4">
                Our advanced machine learning models analyze your image by examining visual patterns, texture, color variations, and morphological features associated with different types of skin lesions.
              </p>
              <div className="bg-gray-100 p-4 rounded-lg">
                <p className="text-sm text-gray-600">
                  <strong>Technology:</strong> Oncoscopic uses convolutional neural networks trained on thousands of dermatologist-verified images.
                </p>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="flex-1 bg-white/90 backdrop-blur-sm rounded-xl p-8 shadow-md border-2 border-black transform transition-transform hover:-translate-y-1">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center text-xl font-bold mr-4">3</div>
                <h2 className="text-2xl font-bold">Receive Results</h2>
              </div>
              <p className="text-gray-700 leading-relaxed mb-4">
                Within seconds, you'll receive a detailed risk assessment including the likelihood of malignancy based on the ABCDE criteria (Asymmetry, Border, Color, Diameter, Evolution) used by dermatologists.
              </p>
              <div className="bg-gray-100 p-4 rounded-lg">
                <p className="text-sm text-gray-600">
                  <strong>Accuracy:</strong> Our model highlights areas of concern within the image.
                </p>
              </div>
            </div>
            
            <div className="flex-1 bg-white/90 backdrop-blur-sm rounded-xl p-8 shadow-md border-2 border-black transform transition-transform hover:-translate-y-1">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center text-xl font-bold mr-4">4</div>
                <h2 className="text-2xl font-bold">Medical Follow-Up</h2>
              </div>
              <p className="text-gray-700 leading-relaxed mb-4">
                Based on your results, we provide recommendations for next steps. For moderate to high-risk assessments, we'll help connect you with local dermatologists for a definitive diagnosis and treatment plan.
              </p>
              <div className="bg-gray-100 p-4 rounded-lg">
                <p className="text-sm text-gray-600">
                  <strong>Important:</strong> Oncoscopic is designed as a screening tool and should not replace professional medical consultation.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Technology section */}
        <div className="bg-white/90 backdrop-blur-sm rounded-xl p-8 shadow-md border-2 border-black mb-16">
          <h2 className="text-3xl font-bold mb-6 text-center">Our Technology</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-full h-full">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714a2.25 2.25 0 001.5 2.25m0-7.964a24.301 24.301 0 014.5 0m-9 0a24.301 24.301 0 00-4.5 0m4.5 0v-3.28a2.25 2.25 0 01.659-1.591l3.182-3.182M7.5 14.25L5 16.5l2.5 2.25m9-9L19 7.5l-2.5-2.25m-4.5 5.25v9M3.75 18h15A2.25 2.25 0 0121 15.75v-6a2.25 2.25 0 00-2.25-2.25h-15A2.25 2.25 0 001.5 9.75v6A2.25 2.25 0 003.75 18z" />
                </svg>
              </div>
              <h3 className="font-bold text-xl mb-2">Deep Learning</h3>
              <p className="text-gray-700">Advanced neural networks trained on diverse dermatological datasets for precise lesion classification.</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-full h-full">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z" />
                </svg>
              </div>
              <h3 className="font-bold text-xl mb-2">Pattern Recognition</h3>
              <p className="text-gray-700">Identifies subtle patterns and features that might be missed in traditional visual examinations.</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-full h-full">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
                </svg>
              </div>
              <h3 className="font-bold text-xl mb-2">Image Processing</h3>
              <p className="text-gray-700">Advanced algorithms normalize and enhance images to account for variations in lighting and camera quality.</p>
            </div>
          </div>
        </div>
        
        {/* Disclaimer */}
        <div className="bg-gray-100 rounded-xl p-6 border-l-4 border-black">
          <h3 className="font-bold text-lg mb-2">Medical Disclaimer</h3>
          <p className="text-gray-700 text-sm">
            Oncoscopic is designed as a preliminary screening tool and should not be used as the sole basis for medical decisions. 
            Always consult with qualified healthcare professionals for proper diagnosis and treatment. Early detection is key to successful 
            skin cancer treatment, but professional medical evaluation is essential.
          </p>
        </div>
      </div>
      
      <Footer />
    </main>
  );
} 