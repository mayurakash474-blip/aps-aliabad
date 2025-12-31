import React from 'react';
import { Stat } from '../types';

const Features: React.FC = () => {
  const stats: Stat[] = [
    { label: 'Students', value: '2500+', icon: 'fa-user-graduate' },
    { label: 'Qualified Teachers', value: '120+', icon: 'fa-chalkboard-teacher' },
    { label: 'Years of Excellence', value: '42', icon: 'fa-award' },
    { label: 'Acres Campus', value: '25', icon: 'fa-school' },
  ];

  const highlights = [
    {
      title: "Academic Excellence",
      desc: "Consistently producing district toppers with a focus on concept-based learning and critical thinking.",
      icon: "fa-book-open",
      color: "bg-blue-100 text-blue-600"
    },
    {
      title: "Sports & Fitness",
      desc: "State-of-the-art sports complex including basketball courts, football grounds, and swimming pool.",
      icon: "fa-running",
      color: "bg-green-100 text-green-600"
    },
    {
      title: "Digital Campus",
      desc: "Smart classrooms, advanced computer labs, and AI-integrated learning modules for future readiness.",
      icon: "fa-laptop-code",
      color: "bg-purple-100 text-purple-600"
    },
    {
      title: "Co-Curriculars",
      desc: "Vibrant clubs for Debate, Drama, Music, Art, and NCC to ensure holistic personality development.",
      icon: "fa-palette",
      color: "bg-orange-100 text-orange-600"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
          {stats.map((stat, idx) => (
            <div key={idx} className="text-center p-6 border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-16 h-16 mx-auto bg-aps-light rounded-full flex items-center justify-center mb-4 text-aps-green">
                <i className={`fas ${stat.icon} text-3xl`}></i>
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</h3>
              <p className="text-gray-500 uppercase text-sm tracking-wider font-medium">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Introduction */}
        <div className="flex flex-col md:flex-row gap-16 items-center mb-20">
          <div className="md:w-1/2">
             <div className="inline-block px-3 py-1 bg-aps-light text-aps-green font-bold rounded-full text-xs uppercase tracking-wide mb-4">
                About Our School
             </div>
             <h2 className="text-4xl font-serif font-bold text-gray-900 mb-6 leading-tight">
               Empowering Minds, <br /> Enriching Souls.
             </h2>
             <p className="text-gray-600 mb-6 leading-relaxed text-lg">
               At Army Public School Aliabad, we believe that education is not just about filling a bucket, but lighting a fire. Since our inception, we have strived to provide a rigorous academic environment combined with a disciplined, value-based upbringing that characterizes the Army ethos.
             </p>
             <p className="text-gray-600 mb-8 leading-relaxed">
               Our campus provides a safe, nurturing environment where students are encouraged to ask questions, explore their interests, and develop the leadership skills necessary to thrive in a global society.
             </p>
             
             <div className="flex items-center space-x-4">
               <img src="https://picsum.photos/id/64/100/100" alt="Principal" className="w-16 h-16 rounded-full object-cover border-2 border-aps-gold" />
               <div>
                 <p className="font-bold text-gray-900">Mrs. S. Kapoor</p>
                 <p className="text-sm text-gray-500">Principal, APS Aliabad</p>
               </div>
             </div>
          </div>
          <div className="md:w-1/2 relative">
             <div className="absolute -top-4 -left-4 w-24 h-24 bg-aps-gold/20 rounded-full z-0"></div>
             <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-aps-green/10 rounded-full z-0"></div>
             <img 
              src="https://picsum.photos/id/201/800/600" 
              alt="Students in Library" 
              className="rounded-lg shadow-2xl relative z-10 w-full" 
            />
          </div>
        </div>

        {/* Highlights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {highlights.map((item, idx) => (
            <div key={idx} className="bg-white p-8 rounded-xl border border-gray-100 shadow-sm hover:shadow-xl transition-all hover:-translate-y-2 group">
              <div className={`w-14 h-14 ${item.color} rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                <i className={`fas ${item.icon} text-2xl`}></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
              <p className="text-gray-500 leading-relaxed text-sm">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;