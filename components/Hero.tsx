import React from 'react';
import { Page } from '../types';

interface HeroProps {
  onNavigate: (page: Page) => void;
}

const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  return (
    <div className="relative h-[600px] w-full bg-gray-900 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img 
          src="https://picsum.photos/id/122/1600/900" 
          alt="School Campus" 
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-aps-green/90 via-transparent to-black/30"></div>
      </div>

      {/* Content */}
      <div className="relative container mx-auto px-4 h-full flex flex-col justify-center items-center text-center text-white">
        <span className="mb-4 px-4 py-1 bg-aps-gold text-aps-green font-bold text-xs uppercase tracking-[0.2em] rounded-full animate-fade-in">
          Estd. 1982
        </span>
        <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6 leading-tight drop-shadow-lg animate-fade-in" style={{animationDelay: '0.1s'}}>
          Nurturing Future Leaders <br/> with <span className="text-aps-gold">Values & Valor</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-200 max-w-2xl mb-10 animate-fade-in" style={{animationDelay: '0.2s'}}>
          Army Public School Aliabad stands as a beacon of academic excellence and holistic development, shaping young minds into responsible citizens.
        </p>
        
        <div className="flex flex-col md:flex-row gap-4 animate-fade-in" style={{animationDelay: '0.3s'}}>
          <button 
            onClick={() => onNavigate(Page.ADMISSIONS)}
            className="px-8 py-4 bg-aps-red hover:bg-red-700 text-white font-bold rounded shadow-lg transition-transform hover:-translate-y-1 uppercase tracking-wider"
          >
            Admissions Open 2024
          </button>
          <button 
            onClick={() => onNavigate(Page.ABOUT)}
            className="px-8 py-4 bg-transparent border-2 border-white hover:bg-white hover:text-aps-green text-white font-bold rounded shadow-lg transition-colors uppercase tracking-wider"
          >
            Discover More
          </button>
        </div>
      </div>
      
      {/* Ticker at bottom */}
      <div className="absolute bottom-0 left-0 w-full bg-aps-green/90 text-white py-3 border-t border-aps-gold/50">
         <div className="container mx-auto px-4 flex items-center">
            <span className="bg-aps-red px-2 py-1 text-xs font-bold mr-3 rounded uppercase">Latest</span>
            <div className="overflow-hidden whitespace-nowrap w-full">
               <p className="animate-marquee inline-block text-sm">
                  📢 Admissions for Class XI (Science & Commerce) are now open. Entrance test on 15th April.  |  🏆 APS Aliabad wins Inter-School Football Championship 2023. |  🗓️ Parent-Teacher Meeting scheduled for next Saturday.
               </p>
            </div>
         </div>
      </div>
      
      <style>{`
        .animate-marquee {
          display: inline-block;
          animation: marquee 20s linear infinite;
          padding-left: 100%;
        }
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-100%); }
        }
      `}</style>
    </div>
  );
};

export default Hero;