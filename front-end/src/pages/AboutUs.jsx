import React from 'react'
import { useNavigate } from 'react-router-dom'
// Team members data
const teamMembers = [
  {
    name: 'Manush Patel',
    title: 'Product Manager',
    pronouns: 'he/him',
    photoUrl: '/Manush_Patel.webp',
  },
  {
    name: 'Yves Alikalfic',
    title: 'Senior Developer',
    pronouns: 'he/him',
    photoUrl: 'Yves_Alikalfic.webp',
  },
  {
    name: 'Keely McSpurren',
    title: 'Developer',
    pronouns: 'she/they',
    photoUrl: '/Keely_McSpurren.webp',
  },
  {
    name: 'Al-Barr Ajiboye',
    title: 'Developer',
    pronouns: 'he/him',
    photoUrl: '/Al-Barr_Ajiboye.webp',
  },
  {
    name: 'Matt Dobaj',
    title: 'Developer',
    pronouns: 'he/him',
    photoUrl: '/Matt_Dobaj.webp',
  },
  {
    name: 'Jasmine Gao',
    title: 'Senior Designer',
    pronouns: 'she/her',
    photoUrl: '/JasmineGao_Headshot.jpg',
  },
  {
    name: 'Nick Archambault',
    title: 'Senior Business Analyst',
    pronouns: 'he/him',
    photoUrl: '/Nick_Archambault.webp',
  },
  {
    name: 'Claire Hu',
    title: 'Business Analyst',
    pronouns: 'she/her',
    photoUrl: '/Claire_Hu.webp',
  },
  {
    name: 'Emanuel Piccininni',
    title: 'Business Analyst',
    pronouns: 'he/him',
    photoUrl: '/Emanuel_Piccinini.webp',
  },
  {
    name: 'Janevra Pier',
    title: 'Designer',
    pronouns: 'she/her',
    photoUrl: '/Janevra_Pier.webp',
  },
]

function AboutUs() {
  const navigate = useNavigate()
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="logo text-center mt-4">
        <button onClick={() => navigate('/')}>
          <img
            src="/Logo.png"
            alt="Company Logo"
            className="mx-auto"
            style={{ maxWidth: '300px', marginBottom: '2rem' }}
          />
        </button>
      </div>

      <h2 className="text-3xl text-[#00566E] font-semibold mt-5 mb-3">
        Our Mission
      </h2>
      <p className="text-lg text-[#00566E] leading-relaxed mb-4">
        Join us at Pantree, a revolutionary platform dedicated to combating food
        waste and enlightening young adults about smart grocery management. Our
        mission is to empower you with the knowledge and tools needed to reduce
        food waste, optimize your grocery shopping, and embrace sustainable
        living practices.
      </p>

      <h2 className="text-3xl text-[#00566E] font-semibold mt-5 mb-3">
        The Challenge
      </h2>
      <p className="text-lg text-[#00566E] leading-relaxed mb-8">
        With the United States discarding nearly 60 million tons of food
        annually, almost 40% of its entire food supply, the urgency to act has
        never been greater. This wastage not only represents a colossal loss of
        resources but also contributes significantly to environmental
        degradation.
      </p>

      <div className="flex flex-wrap justify-center gap-6 mt-8">
        {teamMembers.map((member, index) => (
          <div
            key={index}
            className="team-member text-center p-4 shadow-lg rounded-lg hover:shadow-xl transition-shadow duration-300 ease-in-out"
            style={{ minWidth: '240px' }}
          >
            <img
              src={member.photoUrl}
              alt={`${member.name}'s profile`}
              className="w-32 h-32 rounded-full mx-auto mb-3"
            />
            <h2 className="text-xl font-semibold">{member.name}</h2>
            <p className="text-md text-[#00566E] font-thin">
              {member.pronouns}
            </p>
            <p className="text-md text-[#00566E] font-light">{member.title}</p>
          </div>
        ))}
      </div>

      <h2 className="text-3xl text-[#00566E] font-semibold mt-5 mb-3">
        Join the Movement
      </h2>
      <p className="text-lg text-[#00566E] leading-relaxed mb-8">
        By joining Pantree, you're not just choosing to save money and minimize
        waste; you're also contributing to a larger movement towards a more
        sustainable and equitable world. Let's work together to make food waste
        a thing of the past, ensuring that our groceries nourish us without
        harming the planet. Sign up today and become part of the solution.
      </p>
    </div>
  )
}

export default AboutUs
