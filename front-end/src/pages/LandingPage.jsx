import React, { useState } from 'react';
import MailListForm from '../components/MailListForm';

const Footer = () => {
  return (
    <footer className="bg-[#f1fcff] text-[#00566E] text-center p-4">
      <p className="text-sm">Receive notifications when your produce is about to expire.</p>
      <p className="text-sm">No more losing track of ingredients.</p>
      <p className="text-sm">No more food waste.</p>
      <p className="text-sm">&copy; {new Date().getFullYear()} Pantree. All rights reserved.</p>
    </footer>
  );
};

const LandingPage = () => {
  const [showFormOnly, setShowFormOnly] = useState(false);

  const handleButtonClick = () => {
    setShowFormOnly(true);
  };

  const overlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    backgroundColor: '#rgba(241, 252, 255, 1)',
    zIndex: 1000,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  return (
    <div className='flex flex-col h-screen'>
      {showFormOnly && (
        <div style={overlayStyle}>
          <MailListForm />
        </div>
      )}
      {!showFormOnly && (
        <div className="flex flex-col flex-grow">
          <div className='flex flex-col justify-center items-center flex-grow'>
            <img src="/Logo.png" alt="Pantree Logo" width={500} height={500} />
            <p className="text-xl text-[#00566E] text-center pt-3.5 font-anekTelugu">Saving those blueberries you forgot about</p>
            <div className="flex justify-center gap-10 py-20">
              <button className="text-5xl text-[#00536D] font-koulen bg-[#DFF4FA4D] rounded-3xl p-11 shadow" onClick={handleButtonClick}>
                INSTALL CHROME EXTENSION<br />
                <span className="text-2xl text-[#00536D] font-anekTelugu">Your automatic fridge management app</span>
              </button>
              <button className="text-5xl text-[#00536D] font-koulen bg-[#DFF4FA4D] rounded-3xl p-11 shadow">
                ABOUT US<br />
                <span className="text-2xl text-[#00536D] font-anekTelugu">Built by students</span>
              </button>
            </div>
            {/* Additional content here */}
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default LandingPage;
