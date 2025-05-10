'use client';

import ParticleBackground from '@/app/components/ParticleBackground';

export default function HomePage() {
  return (
    <main className="min-h-screen relative">
      {/* Particle Background */}
      <div className="fixed inset-0 -z-10">
        <ParticleBackground />
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8 relative z-10">
        {/* Header */}
        <header className="flex justify-between items-center mb-12">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold">Oncoscopic</h1>
          </div>
        </header>

        {/* Main Section */}
        <section className="max-w-3xl mx-auto text-center mt-20">
          <h2 className="text-4xl font-bold mb-16">
            Advanced AI for Early Skin Cancer Detection
          </h2>
          
          {/* Search Box */}
          <div className="w-full max-w-5xl mx-auto mb-12">
            <div className="relative border border-gray-300 rounded-2xl overflow-hidden bg-white h-20">
              <input
                type="text"
                placeholder="Is this bump cancerous?"
                className="w-full h-full pl-6 pr-36 text-gray-700 focus:outline-none text-lg"
              />
              
              {/* Upload and Search Buttons */}
              <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-3">
                {/* Upload Button */}
                <button 
                  className="p-2 text-gray-400 hover:text-gray-600"
                  title="Upload Image"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                  </svg>
                </button>
                
                {/* Search Button */}
                <button 
                  className="p-2 text-black border border-gray-300 rounded-md hover:bg-gray-50 w-14 h-14 flex items-center justify-center"
                  title="Search"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
} 