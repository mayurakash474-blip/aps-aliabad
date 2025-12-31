import React from 'react';

const Contact: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-16 animate-fade-in">
       <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <div>
             <h2 className="text-4xl font-serif font-bold text-aps-green mb-6">Get in Touch</h2>
             <p className="text-gray-600 mb-8">
                Have questions? We are here to help. Reach out to the school administration for queries related to admissions, fees, or general information.
             </p>

             <div className="space-y-6">
                <div className="flex items-start space-x-4">
                   <div className="w-12 h-12 bg-aps-light rounded-full flex items-center justify-center text-aps-green flex-shrink-0">
                      <i className="fas fa-map-marker-alt text-xl"></i>
                   </div>
                   <div>
                      <h4 className="font-bold text-gray-800">Address</h4>
                      <p className="text-gray-600">Army Public School, Aliabad Cantt,<br/>District X, State Y - 123456</p>
                   </div>
                </div>
                <div className="flex items-start space-x-4">
                   <div className="w-12 h-12 bg-aps-light rounded-full flex items-center justify-center text-aps-green flex-shrink-0">
                      <i className="fas fa-phone-alt text-xl"></i>
                   </div>
                   <div>
                      <h4 className="font-bold text-gray-800">Phone</h4>
                      <p className="text-gray-600">+91 123-456-7890, +91 987-654-3210</p>
                   </div>
                </div>
                <div className="flex items-start space-x-4">
                   <div className="w-12 h-12 bg-aps-light rounded-full flex items-center justify-center text-aps-green flex-shrink-0">
                      <i className="fas fa-envelope text-xl"></i>
                   </div>
                   <div>
                      <h4 className="font-bold text-gray-800">Email</h4>
                      <p className="text-gray-600">contact@apsaliabad.edu.in</p>
                   </div>
                </div>
             </div>
          </div>
          
          <div className="bg-white p-8 rounded-xl shadow-lg border-t-4 border-aps-gold">
             <h3 className="text-2xl font-bold text-gray-800 mb-6">Send a Message</h3>
             <form className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                   <input type="text" placeholder="First Name" className="w-full border border-gray-300 p-3 rounded focus:border-aps-green outline-none" />
                   <input type="text" placeholder="Last Name" className="w-full border border-gray-300 p-3 rounded focus:border-aps-green outline-none" />
                </div>
                <input type="email" placeholder="Email Address" className="w-full border border-gray-300 p-3 rounded focus:border-aps-green outline-none" />
                <input type="text" placeholder="Subject" className="w-full border border-gray-300 p-3 rounded focus:border-aps-green outline-none" />
                <textarea placeholder="Your Message" className="w-full border border-gray-300 p-3 rounded focus:border-aps-green outline-none h-32"></textarea>
                <button className="w-full bg-aps-green text-white font-bold py-3 rounded hover:bg-green-800 transition-colors uppercase tracking-wider">Send Message</button>
             </form>
          </div>
       </div>
    </div>
  );
};

export default Contact;