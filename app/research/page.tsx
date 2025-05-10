import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ParticleBackground from '../components/ParticleBackground';
import Image from 'next/image';
import Link from 'next/link';

export default function ResearchPage() {
  return (
    <main className="min-h-screen relative p-4">
      <div className="absolute inset-0 z-0">
        <ParticleBackground />
      </div>
      
      <Navbar />
      
      <div className="max-w-5xl mx-auto pt-24 pb-16 z-10 relative">
        <h1 className="text-4xl font-bold mb-6 text-center">Our Research</h1>
        <p className="text-center text-lg mb-12 max-w-3xl mx-auto">
          We combine cutting-edge machine learning with medical expertise to create accurate, accessible skin cancer detection tools.
        </p>
        
        {/* Research Approach */}
        <div className="mb-12 bg-white/90 backdrop-blur-sm rounded-xl p-8 shadow-md border-2 border-black">
          <h2 className="text-3xl font-bold mb-8 text-center">Research Approach</h2>
          
          <div className="grid md:grid-cols-2 gap-10">
            <div>
              <div className="mb-6 flex items-center">
                <div className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center text-xl font-bold mr-4">A</div>
                <h3 className="text-2xl font-bold">Data Collection</h3>
              </div>
              <p className="text-gray-700 leading-relaxed mb-4">
                Our research utilizes the International Skin Imaging Collaboration (ISIC) dataset, containing over 25,000 dermoscopic images of skin lesions with expert annotations. We've incorporated additional diverse datasets to reduce bias and improve model generalization.
              </p>
              <div className="bg-gray-100 p-4 rounded-lg">
                <p className="text-sm text-gray-600">
                  <strong>Dataset Size:</strong> 25,000+ dermatologist-verified images spanning different skin types, ages, and lesion classes.
                </p>
              </div>
            </div>
            
            <div>
              <div className="mb-6 flex items-center">
                <div className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center text-xl font-bold mr-4">B</div>
                <h3 className="text-2xl font-bold">Model Architecture</h3>
              </div>
              <p className="text-gray-700 leading-relaxed mb-4">
                Oncoscopic employs deep learning architectures based on EfficientNet, which offer an optimal balance between computational efficiency and diagnostic accuracy. Our models achieve over 90% sensitivity in detecting melanoma and other forms of skin cancer.
              </p>
              <div className="bg-gray-100 p-4 rounded-lg">
                <p className="text-sm text-gray-600">
                  <strong>Performance:</strong> 90%+ sensitivity for melanoma, basal cell carcinoma, and squamous cell carcinoma detection.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Publications */}
        <div className="mb-12 bg-white/90 backdrop-blur-sm rounded-xl p-8 shadow-md border-2 border-black">
          <h2 className="text-3xl font-bold mb-8 text-center">Our Literature Review</h2>
          
          <div className="space-y-6">
            <div className="border-l-4 border-black pl-4 py-2 hover:bg-gray-50 transition-colors">
              <h3 className="text-xl font-bold">Automated Detection of Skin Cancer Using Deep Learning (2023)</h3>
              <p className="text-gray-600 mt-1">Journal of Medical Imaging, Vol. 10, Issue 2</p>
              <p className="text-gray-700 mt-2">This paper presents our novel approach to skin lesion classification using a hybrid CNN architecture that achieves state-of-the-art accuracy on the ISIC benchmark dataset.</p>
              <Link href="#" className="inline-flex items-center mt-3 text-black font-medium hover:underline">
                Read abstract <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 ml-1">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </Link>
            </div>
            
            <div className="border-l-4 border-black pl-4 py-2 hover:bg-gray-50 transition-colors">
              <h3 className="text-xl font-bold">Reducing Bias in Skin Cancer Detection Algorithms (2022)</h3>
              <p className="text-gray-600 mt-1">Conference on Computer Vision and Pattern Recognition (CVPR)</p>
              <p className="text-gray-700 mt-2">We introduce a novel data augmentation and model training approach that significantly reduces racial and demographic bias in skin cancer detection models.</p>
              <Link href="#" className="inline-flex items-center mt-3 text-black font-medium hover:underline">
                Read abstract <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 ml-1">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </Link>
            </div>
            
            <div className="border-l-4 border-black pl-4 py-2 hover:bg-gray-50 transition-colors">
              <h3 className="text-xl font-bold">Mobile Applications for Skin Cancer Screening: A Systematic Review (2021)</h3>
              <p className="text-gray-600 mt-1">JAMA Dermatology, Vol. 157, Issue 4</p>
              <p className="text-gray-700 mt-2">A comprehensive review of mobile applications for skin cancer detection, including an analysis of their accuracy, usability, and potential impact on early diagnosis rates.</p>
              <Link href="#" className="inline-flex items-center mt-3 text-black font-medium hover:underline">
                Read abstract <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 ml-1">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
        
        {/* Ongoing Research */}
        <div className="mb-12 bg-white/90 backdrop-blur-sm rounded-xl p-8 shadow-md border-2 border-black">
          <h2 className="text-3xl font-bold mb-6 text-center">Current Research Initiatives</h2>
          
          <div className="grid md:grid-cols-3 gap-6 mt-8">
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="white" className="w-7 h-7">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
                </svg>
              </div>
              <h3 className="font-bold text-xl mb-2">Explainable AI</h3>
              <p className="text-gray-700">Developing methods to make AI decisions transparent and interpretable to both patients and healthcare providers.</p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="white" className="w-7 h-7">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                </svg>
              </div>
              <h3 className="font-bold text-xl mb-2">Federated Learning</h3>
              <p className="text-gray-700">Implementing privacy-preserving techniques to train models across multiple institutions without sharing sensitive patient data.</p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="white" className="w-7 h-7">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.5 6a7.5 7.5 0 107.5 7.5h-7.5V6z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.5 10.5H21A7.5 7.5 0 0013.5 3v7.5z" />
                </svg>
              </div>
              <h3 className="font-bold text-xl mb-2">Multimodal Analysis</h3>
              <p className="text-gray-700">Combining image data with patient metadata and clinical history to improve diagnostic accuracy and personalized risk assessment.</p>
            </div>
          </div>
        </div>
        
        {/* Call to action */}
        <div className="bg-gray-900 text-white rounded-xl p-8 shadow-md flex flex-col md:flex-row items-center justify-between border-2 border-black">
          <div className="mb-6 md:mb-0 md:mr-6">
            <h3 className="text-2xl font-bold mb-2">Interested in our research?</h3>
            <p className="text-gray-300">Contact us to learn more about collaboration opportunities or to access our published datasets.</p>
          </div>
          <Link href="/contact" className="bg-white text-black py-3 px-6 rounded-lg font-semibold hover:bg-gray-100 transition-colors whitespace-nowrap">
            Get in touch
          </Link>
        </div>
      </div>
      
      <Footer />
    </main>
  );
} 