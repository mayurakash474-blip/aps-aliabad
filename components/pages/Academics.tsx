import React from 'react';

const Academics: React.FC = () => {
  return (
    <div className="animate-fade-in">
       {/* Header */}
       <div className="bg-aps-green text-white py-16 text-center">
          <h1 className="text-4xl font-serif font-bold mb-4">Academic Excellence</h1>
          <p className="max-w-2xl mx-auto text-gray-200">Fostering intellectual curiosity and critical thinking through a robust CBSE curriculum.</p>
       </div>

       <div className="container mx-auto px-4 py-16">
          {/* Curriculum Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-20">
             <div>
                <h2 className="text-3xl font-bold text-gray-800 mb-6">The Curriculum</h2>
                <p className="text-gray-600 mb-4 leading-relaxed">
                   APS Aliabad follows the Central Board of Secondary Education (CBSE) curriculum. Our pedagogical approach is student-centric, integrating technology and experiential learning.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                   {[
                      "Science Stream (PCM/B)", "Commerce Stream", "Humanities", "Information Technology"
                   ].map((sub, i) => (
                      <div key={i} className="flex items-center space-x-2 text-gray-700">
                         <i className="fas fa-check-circle text-aps-gold"></i>
                         <span>{sub}</span>
                      </div>
                   ))}
                </div>
             </div>
             <div>
                <img src="https://picsum.photos/id/450/600/400" alt="Classroom" className="rounded-xl shadow-lg w-full" />
             </div>
          </div>

          {/* Facilities Grid */}
          <h2 className="text-3xl font-bold text-gray-800 mb-10 text-center">Campus Facilities</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
             {[
                { title: "Science Labs", img: "https://picsum.photos/id/20/400/300", desc: "Fully equipped Physics, Chemistry, and Biology labs." },
                { title: "Library", img: "https://picsum.photos/id/24/400/300", desc: "Over 10,000 books, journals, and digital resources." },
                { title: "Sports Complex", img: "https://picsum.photos/id/96/400/300", desc: "Basketball, Volleyball, and vast playgrounds." },
                { title: "Computer Lab", img: "https://picsum.photos/id/0/400/300", desc: "Modern IT lab with high-speed internet." },
                { title: "Art & Culture", img: "https://picsum.photos/id/103/400/300", desc: "Dedicated rooms for Music, Dance, and Fine Arts." },
                { title: "Auditorium", img: "https://picsum.photos/id/180/400/300", desc: "800-seater hall for events and assemblies." },
             ].map((fac, i) => (
                <div key={i} className="group rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-gray-100">
                   <div className="h-48 overflow-hidden">
                      <img src={fac.img} alt={fac.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                   </div>
                   <div className="p-6">
                      <h3 className="text-xl font-bold text-aps-green mb-2">{fac.title}</h3>
                      <p className="text-gray-500 text-sm">{fac.desc}</p>
                   </div>
                </div>
             ))}
          </div>
       </div>
    </div>
  );
};

export default Academics;