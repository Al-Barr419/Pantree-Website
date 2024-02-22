// src/components/AboutUs.jsx
import React from 'react';

// Example team members data
const teamMembers = [
  { name: 'Manush Patel', photoUrl: '/Manush_Patel.webp' },
  { name: 'Yves Alikalfic', photoUrl: 'Yves_Alikalfic.webp' },
  { name: 'Keely McSpurren', photoUrl: '/Keely_McSpurren.webp' },
  { name: 'Claire Hu', photoUrl: '/Claire_Hu.webp' },
  { name: 'Al-Barr Ajiboye', photoUrl: '/Al-Barr_Ajiboye.webp' },
  { name: 'Jasmine Gao', photoUrl: '/Jasmine_Gao.webp' },
  { name: 'Matt Dobaj', photoUrl: '/Matt_Dobaj.webp' },
  { name: 'Emanuel Piccinini', photoUrl: '/Emanuel_Piccinini.webp' },
  { name: 'Janevra Pier', photoUrl: '/Janevra_Pier.webp' },
  { name: 'Nick Archambault', photoUrl: '/Nick_Archambault.webp' },
];

function AboutUs() {
  return (
    <div className="container mx-auto px-4">
      <div className="logo text-center mt-4">
        <img src="/logo.png" alt="Company Logo" className="mx-auto" style={{ maxWidth: '120px' }}/>
      </div>
      
      <h1 className="text-3xl text-center text-[#00566E] font-bold mt-5 mb-3">About Us</h1>
      <p className="text-md text-[#00566E]">
        We are a team of students passionate about reducing food waste and making your fridge smarter. Our mission is to help you keep track of your groceries, save money, and reduce waste.
      </p>
      <div className="team-members grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
        {teamMembers.map((member, index) => (
          <div key={index} className="team-member text-center">
            <img src={member.photoUrl} alt={member.name} className="w-24 h-24 rounded-full mx-auto"/>
            <h2 className="text-xl font-semibold mt-2">{member.name}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AboutUs;