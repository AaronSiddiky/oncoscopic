import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ParticleBackground from '../components/ParticleBackground';
import Image from 'next/image';

export default function AboutPage() {
  return (
    <main className="min-h-screen relative p-4">
      <div className="absolute inset-0 z-0">
        <ParticleBackground />
      </div>
      
      <Navbar />
      
      <div className="max-w-5xl mx-auto pt-24 pb-16 z-10 relative">
        <h1 className="text-4xl font-bold mb-6 text-center">About Us</h1>
        
        {/* Mission Statement */}
        <div className="bg-white/90 backdrop-blur-sm rounded-xl p-8 shadow-md border-2 border-black mb-12">
          <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
          <p className="text-lg leading-relaxed">
            Oncoscopic is a brainchild born out of Columbia University by Aaron Siddiky and Hilal Tokat. It is one of the world's very first AI Agentic models targetting skin cancer detection. Using a Convoloutional Neural Network to create a multi-image classification model that diagnoses 7 types of skin cancer, Oncoscopic uses an agentic structure that allows users to receive actionable information on their skin cancer diagnoses specific to their conditions. Oncoscopic was founded under the tenents of promoting equitability and closing the healthcare gap.
          </p>
        </div>

        {/* Team Section */}
        <div className="bg-white/90 backdrop-blur-sm rounded-xl p-8 shadow-md border-2 border-black mb-12">
          <h2 className="text-3xl font-bold mb-8">Our Team</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Aaron's Card */}
          <div className="border-2 border-black rounded-lg overflow-hidden bg-white shadow-md">
              <div className="p-8">
                <div className="flex items-start gap-6">
                  <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-100 relative flex-shrink-0">
                    <Image
                      src="/images/aaronsiddiky.jpg"
                      alt="Aaron Siddiky"
                      fill
                      sizes="(max-width: 128px) 100vw, 128px"
                      priority
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold">Aaron Siddiky</h3>
                    <p className="text-gray-600 mt-1">Co-founder</p>
                    <p className="text-gray-800 mt-2">B.A. Computational Biology and Financial Economics</p>
                  </div>
                </div>
                
                <div className="mt-6">
                <div className="flex items-center">
                  <Image 
                    src="/images/columbialogo.avif" 
                    alt="Columbia University" 
                    width={40} 
                    height={40} 
                    className="mr-3"
                  />
                  <div>
                    <p className="font-medium">Columbia University</p>
                      <p className="text-sm text-gray-600">Class of 2024</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="border-t border-gray-200">
                <a 
                  href="https://www.linkedin.com/in/aaronsiddiky" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="block py-4 text-center font-medium text-gray-800 hover:bg-gray-50 transition-colors"
                >
                View LinkedIn Profile <span className="inline-block ml-1">↗</span>
                </a>
            </div>
          </div>

            {/* Hilal's Card */}
          <div className="border-2 border-black rounded-lg overflow-hidden bg-white shadow-md">
              <div className="p-8">
                <div className="flex items-start gap-6">
                  <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-100 relative flex-shrink-0">
                    <Image
                      src="/images/hilaltokat.png"
                      alt="Hilal Tokat"
                      fill
                      sizes="(max-width: 128px) 100vw, 128px"
                      priority
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold">Hilal Tokat</h3>
                    <p className="text-gray-600 mt-1">Co-founder</p>
                    <p className="text-gray-800 mt-2">B.A. History (Pre-Med Track)</p>
                  </div>
                </div>
                
                <div className="mt-6">
                <div className="flex items-center">
                  <Image 
                    src="/images/columbialogo.avif" 
                    alt="Columbia University" 
                    width={40} 
                    height={40} 
                    className="mr-3"
                  />
                  <div>
                    <p className="font-medium">Columbia University</p>
                      <p className="text-sm text-gray-600">Class of 2024</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="border-t border-gray-200">
                <a 
                  href="https://www.linkedin.com/in/hilal-tokat-19515a212/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="block py-4 text-center font-medium text-gray-800 hover:bg-gray-50 transition-colors"
                >
                  View LinkedIn Profile <span className="inline-block ml-1">↗</span>
                </a>
              </div>
            </div>
          </div>
        </div>
            
        {/* Contact Section */}
        <div className="bg-gray-900 text-white rounded-xl p-8 shadow-md flex flex-col md:flex-row items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2">Get in Touch</h2>
            <p className="text-gray-300">Have questions or feedback? We'd love to hear from you.</p>
          </div>
          <a href="mailto:aaron.siddiky@columbia.edu" className="mt-4 md:mt-0 bg-white text-black py-3 px-6 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
            Contact Us
          </a>
        </div>
      </div>
      
      <Footer />
    </main>
  );
} 