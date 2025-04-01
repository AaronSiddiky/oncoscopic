import Image from 'next/image';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ParticleBackground from '../components/ParticleBackground';

export default function AboutPage() {
  return (
    <main className="min-h-screen relative p-4">
      <div className="absolute inset-0 z-0">
        <ParticleBackground />
      </div>
      
      <Navbar />
      
      <div className="max-w-5xl mx-auto pt-24 pb-16 z-10 relative">
        <h1 className="text-4xl font-bold mb-16 text-center">About Us</h1>
        
        <div className="grid md:grid-cols-2 gap-8 p-4">
          {/* Aaron Siddiky Profile Card */}
          <div className="border-2 border-black rounded-lg overflow-hidden bg-white shadow-md">
            <div className="p-6">
              <div className="flex items-start mb-6">
                <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center mr-6">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-12 h-12 text-gray-300">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                  </svg>
                </div>
                
                <div>
                  <h2 className="text-2xl font-bold">Aaron Siddiky</h2>
                  <p className="text-gray-600 mt-1">New York, United States</p>
                  <p className="text-gray-800 mt-4">[Major]</p>
                </div>
              </div>
              
              <div className="space-y-4 mt-6">
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
                    <p className="text-sm text-gray-600">Student</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="border-t border-gray-200">
              <Link href="https://linkedin.com" target="_blank" className="block py-3 text-center font-medium text-gray-800 hover:bg-gray-50 transition-colors">
                View LinkedIn Profile <span className="inline-block ml-1">↗</span>
              </Link>
            </div>
          </div>

          {/* Hilal Tokat Profile Card */}
          <div className="border-2 border-black rounded-lg overflow-hidden bg-white shadow-md">
            <div className="p-6">
              <div className="flex items-start mb-6">
                <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center mr-6">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-12 h-12 text-gray-300">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                  </svg>
                </div>
                
                <div>
                  <h2 className="text-2xl font-bold">Hilal Tokat</h2>
                  <p className="text-gray-600 mt-1">New York, United States</p>
                  <p className="text-gray-800 mt-4">[Major]</p>
                </div>
              </div>
              
              <div className="space-y-4 mt-6">
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
                    <p className="text-sm text-gray-600">Student</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="border-t border-gray-200">
              <Link href="https://linkedin.com" target="_blank" className="block py-3 text-center font-medium text-gray-800 hover:bg-gray-50 transition-colors">
                View LinkedIn Profile <span className="inline-block ml-1">↗</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </main>
  );
} 