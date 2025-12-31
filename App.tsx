import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Hero from './components/Hero';
import Features from './components/Features';
import ChatWidget from './components/ChatWidget';
import Admissions from './components/pages/Admissions';
import Academics from './components/pages/Academics';
import Contact from './components/pages/Contact';
import Login from './components/pages/Login';
import { Page } from './types';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>(Page.LOGIN);

  const renderContent = () => {
    switch (currentPage) {
      case Page.HOME:
        return (
          <>
            <Hero onNavigate={setCurrentPage} />
            <Features />
            <div className="py-16 bg-gray-100 text-center">
               <div className="container mx-auto px-4">
                  <h2 className="text-3xl font-serif font-bold text-gray-800 mb-8">Latest Happenings</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                     {[1, 2, 3].map((i) => (
                        <div key={i} className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow text-left">
                           <img src={`https://picsum.photos/seed/${i + 10}/400/250`} alt="Event" className="w-full h-48 object-cover" />
                           <div className="p-6">
                              <span className="text-xs font-bold text-aps-red uppercase mb-2 block">May {i + 10}, 2024</span>
                              <h3 className="text-lg font-bold text-gray-800 mb-2">Annual Sports Day Celebration</h3>
                              <p className="text-gray-600 text-sm mb-4">Students displayed immense zeal and sportsmanship during the inter-house athletics meet.</p>
                              <button className="text-aps-green font-bold text-sm hover:underline">Read More</button>
                           </div>
                        </div>
                     ))}
                  </div>
               </div>
            </div>
          </>
        );
      case Page.ABOUT:
         // Re-using Features section as About for simplicity in this demo, usually would have more text
         return (
            <div className="animate-fade-in">
               <div className="bg-aps-green text-white py-16 text-center">
                  <h1 className="text-4xl font-serif font-bold mb-4">About Us</h1>
                  <p className="max-w-2xl mx-auto text-gray-200">A legacy of discipline, integrity, and excellence.</p>
               </div>
               <Features />
            </div>
         );
      case Page.ADMISSIONS:
        return <Admissions />;
      case Page.ACADEMICS:
        return <Academics />;
      case Page.CONTACT:
        return <Contact />;
      case Page.LOGIN:
        return <Login onLogin={() => setCurrentPage(Page.HOME)} />;
      default:
        return <Hero onNavigate={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 font-sans">
      <Navbar currentPage={currentPage} onNavigate={setCurrentPage} />
      
      <main className="flex-grow">
        {renderContent()}
      </main>

      <Footer onNavigate={setCurrentPage} />
      <ChatWidget />
    </div>
  );
}

export default App;