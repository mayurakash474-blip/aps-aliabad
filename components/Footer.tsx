import React from 'react';
import { Page } from '../types';

interface FooterProps {
   onNavigate: (page: Page) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-aps-green text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Column 1: About */}
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center border-2 border-aps-gold">
                  <i className="fas fa-graduation-cap text-aps-green"></i>
              </div>
              <h3 className="text-xl font-serif font-bold text-aps-gold">APS Aliabad</h3>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed mb-6">
              Committed to providing quality education to the children of Army personnel and civilians, fostering an environment of discipline, integrity, and academic excellence.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-aps-gold hover:text-aps-green transition-colors"><i className="fab fa-facebook-f"></i></a>
              <a href="#" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-aps-gold hover:text-aps-green transition-colors"><i className="fab fa-twitter"></i></a>
              <a href="#" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-aps-gold hover:text-aps-green transition-colors"><i className="fab fa-instagram"></i></a>
              <a href="#" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-aps-gold hover:text-aps-green transition-colors"><i className="fab fa-youtube"></i></a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-6 border-b border-white/20 pb-2 inline-block">Quick Links</h3>
            <ul className="space-y-3 text-sm text-gray-300">
              <li><button onClick={() => onNavigate(Page.ADMISSIONS)} className="hover:text-aps-gold transition-colors"><i className="fas fa-angle-right mr-2 text-aps-gold"></i>Admissions Procedure</button></li>
              <li><button onClick={() => onNavigate(Page.ACADEMICS)} className="hover:text-aps-gold transition-colors"><i className="fas fa-angle-right mr-2 text-aps-gold"></i>Academic Calendar</button></li>
              <li><button onClick={() => onNavigate(Page.ACADEMICS)} className="hover:text-aps-gold transition-colors"><i className="fas fa-angle-right mr-2 text-aps-gold"></i>Transfer Certificate</button></li>
              <li><button onClick={() => onNavigate(Page.CONTACT)} className="hover:text-aps-gold transition-colors"><i className="fas fa-angle-right mr-2 text-aps-gold"></i>Contact Administration</button></li>
              <li><a href="#" className="hover:text-aps-gold transition-colors"><i className="fas fa-angle-right mr-2 text-aps-gold"></i>CBSE Mandala Disclosure</a></li>
            </ul>
          </div>

          {/* Column 3: Contact */}
          <div>
            <h3 className="text-lg font-bold mb-6 border-b border-white/20 pb-2 inline-block">Contact Us</h3>
            <ul className="space-y-4 text-sm text-gray-300">
              <li className="flex items-start space-x-3">
                <i className="fas fa-map-marker-alt mt-1 text-aps-gold"></i>
                <span>Army Public School, Cantonment Area,<br/>Aliabad, District - X, State - Y, 123456</span>
              </li>
              <li className="flex items-center space-x-3">
                <i className="fas fa-phone-alt text-aps-gold"></i>
                <span>+91 123-456-7890</span>
              </li>
              <li className="flex items-center space-x-3">
                <i className="fas fa-envelope text-aps-gold"></i>
                <span>principal@apsaliabad.edu.in</span>
              </li>
              <li className="flex items-center space-x-3">
                <i className="fas fa-clock text-aps-gold"></i>
                <span>Mon - Sat: 08:00 AM - 02:00 PM</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-400">
          <p>&copy; 2024 Army Public School Aliabad. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-white">Terms of Use</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;