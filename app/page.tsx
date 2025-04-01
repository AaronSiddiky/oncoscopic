import Image from 'next/image';
import ParticleBackground from './components/ParticleBackground';
import TypewriterTitle from './components/TypewriterTitle';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <ParticleBackground />
      </div>
      
      <Navbar />
      
      <div className="z-10 space-y-8 text-center w-full max-w-6xl">
        <TypewriterTitle 
          text="Machine Learning Application for Cancerous Skin Lesion Detection" 
          className="text-4xl font-bold tracking-tighter mb-8"
          speed={40}
        />
        
        <div className="bg-gray-200/10 rounded-full px-6 py-3 flex items-center justify-center shadow-sm mb-10 w-fit mx-auto">
          <Image 
            src="/images/columbialogo.avif" 
            alt="Columbia University" 
            width={30} 
            height={30}
            className="mr-3"
          />
          <span className="text-sm font-medium">Made by Aaron Siddiky and Hilal Tokat</span>
        </div>
        
        <div className="w-full h-16 relative">
          <div className="relative flex items-center w-full">
            <input
              type="text"
              placeholder="Is this bump cancerous?"
              className="w-full h-16 pl-6 pr-36 py-4 rounded-2xl border-2 border-black shadow-lg text-lg focus:outline-none focus:ring-2 focus:ring-black"
            />
            
            <div className="absolute right-0 flex items-center space-x-2 pr-4">
              <button className="bg-transparent hover:bg-gray-100 rounded-full p-2 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </button>
              
              <button className="bg-black text-white w-12 h-12 rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </main>
  );
}
