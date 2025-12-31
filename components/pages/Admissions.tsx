import React from 'react';

const Admissions: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-16 animate-fade-in">
      <h2 className="text-4xl font-serif font-bold text-aps-green mb-8 text-center">Admission Process 2024-25</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Information Panel */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
              <i className="fas fa-info-circle text-aps-red mr-3"></i> General Guidelines
            </h3>
            <p className="text-gray-600 mb-4 leading-relaxed">
              Admissions in Army Public Schools are primarily for the children of Army Personnel. However, children of other categories are also admitted subject to availability of vacancies.
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2 ml-2">
              <li>Admissions are open for Class I to IX.</li>
              <li>Admission to Class XI is based on Class X Board Results.</li>
              <li>Age criteria must be strictly followed as per CBSE norms.</li>
            </ul>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
             <h3 className="text-2xl font-bold text-gray-800 mb-6">Admission Steps</h3>
             <div className="relative border-l-2 border-aps-gold/30 ml-3 space-y-8 pl-8">
                {[
                  { title: "Registration", desc: "Collect the registration form from the school office or download it below." },
                  { title: "Entrance Test", desc: "For Classes II to IX, an entrance test will be conducted in English, Hindi, Maths, and Science." },
                  { title: "Merit List", desc: "Selected candidates will be notified via the school notice board and website." },
                  { title: "Document Verification", desc: "Submit original TC, Birth Certificate, and Service Certificate (for Army personnel)." }
                ].map((step, idx) => (
                  <div key={idx} className="relative">
                    <span className="absolute -left-[41px] top-0 w-6 h-6 rounded-full bg-aps-green text-white flex items-center justify-center text-xs font-bold ring-4 ring-white">
                      {idx + 1}
                    </span>
                    <h4 className="text-lg font-bold text-aps-green">{step.title}</h4>
                    <p className="text-gray-600 text-sm">{step.desc}</p>
                  </div>
                ))}
             </div>
          </div>
          
           <div className="flex space-x-4">
              <button className="px-6 py-3 bg-aps-green text-white rounded hover:bg-green-800 transition-colors flex items-center">
                <i className="fas fa-file-pdf mr-2"></i> Download Form
              </button>
              <button className="px-6 py-3 border border-aps-green text-aps-green rounded hover:bg-aps-green hover:text-white transition-colors">
                 Check Fee Structure
              </button>
           </div>
        </div>

        {/* Inquiry Form */}
        <div className="lg:col-span-1">
          <div className="bg-aps-light p-8 rounded-xl sticky top-24">
            <h3 className="text-xl font-bold text-gray-800 mb-6">Admission Inquiry</h3>
            <form className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Parent Name</label>
                <input type="text" className="w-full border border-gray-300 rounded p-2 focus:border-aps-green outline-none" placeholder="Enter your name" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Email Address</label>
                <input type="email" className="w-full border border-gray-300 rounded p-2 focus:border-aps-green outline-none" placeholder="Enter email" />
              </div>
               <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Child's Grade</label>
                <select className="w-full border border-gray-300 rounded p-2 focus:border-aps-green outline-none bg-white">
                  <option>Select Grade</option>
                  <option>Class I</option>
                  <option>Class V</option>
                  <option>Class XI</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Message</label>
                <textarea className="w-full border border-gray-300 rounded p-2 focus:border-aps-green outline-none h-24" placeholder="Any specific queries?"></textarea>
              </div>
              <button type="submit" className="w-full bg-aps-red text-white font-bold py-3 rounded hover:bg-red-700 transition-colors">
                Submit Inquiry
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admissions;