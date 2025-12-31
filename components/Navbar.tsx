import React, { useState } from 'react';
import { Page } from '../types';

interface NavbarProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { label: 'Home', value: Page.HOME },
    { label: 'About Us', value: Page.ABOUT },
    { label: 'Academics', value: Page.ACADEMICS },
    { label: 'Admissions', value: Page.ADMISSIONS },
    { label: 'Contact', value: Page.CONTACT },
  ];

  return (
    <header className="sticky top-0 z-50 bg-aps-green text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          {/* Logo Section */}
          <div 
            className="flex items-center space-x-3 cursor-pointer" 
            onClick={() => onNavigate(Page.HOME)}
          >
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center border-2 border-aps-gold">
               <i className="fas fa-graduation-cap text-aps-green text-2xl"></i>
            </div>
            <div>
              <h1 className="text-xl font-bold uppercase tracking-wider font-serif text-aps-gold">APS Aliabad</h1>
              <p className="text-xs text-gray-300 tracking-widest uppercase">Truth is God</p>
            </div>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <button
                key={item.value}
                onClick={() => onNavigate(item.value)}
                className={`px-4 py-2 rounded-md transition-all duration-300 text-sm font-medium uppercase tracking-wide
                  ${currentPage === item.value 
                    ? 'bg-aps-red text-white shadow-md transform scale-105' 
                    : 'text-gray-200 hover:text-white hover:bg-white/10'
                  }`}
              >
                {item.label}
              </button>
            ))}
            {/* Login Button */}
            <button
              onClick={() => onNavigate(Page.LOGIN)}
              className={`ml-4 px-6 py-2 rounded-full border-2 transition-all duration-300 text-sm font-bold uppercase tracking-wide flex items-center space-x-2
                  ${currentPage === Page.LOGIN
                    ? 'bg-aps-gold border-aps-gold text-aps-green' 
                    : 'border-aps-gold text-aps-gold hover:bg-aps-gold hover:text-aps-green'
                  }`}
            >
              <i className="fas fa-user-circle"></i>
              <span>Login</span>
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-white focus:outline-none"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <i className={`fas ${isMobileMenuOpen ? 'fa-times' : 'fa-bars'} text-2xl`}></i>
          </button>
        </div>
      </div>

      {/* Mobile Nav Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-aps-green border-t border-white/10">
          <div className="flex flex-col p-4 space-y-2">
            {navItems.map((item) => (
              <button
                key={item.value}
                onClick={() => {
                  onNavigate(item.value);
                  setIsMobileMenuOpen(false);
                }}
                className={`text-left px-4 py-3 rounded-md transition-colors
                   ${currentPage === item.value 
                    ? 'bg-aps-red text-white font-bold' 
                    : 'text-gray-200 hover:bg-white/10'
                  }`}
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={() => {
                onNavigate(Page.LOGIN);
                setIsMobileMenuOpen(false);
              }}
              className={`text-left px-4 py-3 rounded-md transition-colors border border-aps-gold text-aps-gold mt-2 font-bold uppercase tracking-wide
                  ${currentPage === Page.LOGIN ? 'bg-aps-gold text-aps-green' : ''}
              `}
            >
              <i className="fas fa-user-circle mr-2"></i> Student Login
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;