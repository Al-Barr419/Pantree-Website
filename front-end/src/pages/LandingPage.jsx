import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="bg-[#f1fcff] text-[#00566E] text-center min-h-[300px] flex flex-col justify-center">
      <p className="text-lg leading-relaxed mb-6 font-anekTelugu">
        Receive notifications when your produce is about to expire.
      </p>
      <p className="text-lg leading-relaxed mb-1 font-anekTelugu">
        No more losing track of ingredients.
      </p>
      <p className="text-lg leading-relaxed mb-1 font-anekTelugu">
        No more food waste.
      </p>
      <a
        href="/privacy-policy"
        className="text-lg leading-relaxed mb-1 font-anekTelugu"
      >
        Our Privacy Policy
      </a>
    </footer>
  )
}

const LandingPage = () => {
  const navigate = useNavigate() // Initialize useNavigate hook

  const handleAboutUsClick = () => {
    navigate('/about-us')
  }

  const overlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    backgroundColor: '#F1FCFF',
    zIndex: 1000,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }

  return (
    <div className="flex flex-col min-h-screen">
      <div
        className="flex flex-col h-screen bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url("/Fruits.png")` }}
      >
        <div className="flex flex-col justify-center items-center flex-grow">
          <button
            className="absolute top-0 right-0 text-xl text-[#00536D] font-koulen bg-[#E1F1F699] rounded-lg p-3 shadow-xl"
            onClick={() => {
              navigate('/fridge')
            }}
          >
            View your Fridge
          </button>
          <img src="/Logo.png" alt="Pantree Logo" width={500} height={500} />
          <p className="text-xl text-[#00566E] text-center pt-3.5 font-anekTelugu">
            Saving those blueberries you forgot about
          </p>
          <div className="flex justify-center gap-10 py-20">
            <button
              className="text-5xl text-[#00536D] font-koulen bg-[#DFF4FA4D] rounded-3xl p-11 shadow-xl"
              onClick={() => {
                window.open(
                  'https://chromewebstore.google.com/detail/pantree/fpoeoakglgbcnlggndmbjmaekpjahgdn',
                  '_blank'
                )
              }}
            >
              ADD PANTREE
              <br />
              <span className="text-2xl text-[#00536D] font-anekTelugu font-semibold">
                Your automatic fridge management app
              </span>
            </button>
            <button
              className="text-5xl text-[#00536D] font-koulen bg-[#DFF4FA4D] rounded-3xl p-11 shadow-xl"
              onClick={handleAboutUsClick}
            >
              ABOUT US
              <br />
              <span className="text-2xl text-[#00536D] font-anekTelugu font-semibold">
                Built by students
              </span>
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default LandingPage
