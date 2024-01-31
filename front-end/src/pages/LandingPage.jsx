import React, { useState } from 'react';
import MailListForm from '../components/MailListForm';

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
    <div className='flex justify-center items-center h-screen'>
      {showFormOnly && (
        <div style={overlayStyle}>
          <MailListForm />
        </div>
      )}
      {!showFormOnly && (
        <div className="flex flex-col">
          <div className='flex justify-center'>
          <img src="/Logo.png" alt="Pantree Logo" width={400} height={400} />
          </div>
          <p className="text-xl text-[#00566E] text-center pt-3.5 font-anekTelugu">Saving those blueberries you forgot about</p>
          <div className="flex justify-center gap-10 py-20">
            <div>
            <button className="text-5xl text-[#00536D] font-koulen bg-[#DFF4FA4D] rounded-3xl p-11 shadow" onClick={handleButtonClick}>
              INSTALL CHROME EXTENSION<br />
              <span className="text-2xl text-[#00536D] font-anekTelugu">Your automatic fridge management app</span>
            </button>
            </div>
            <button className="text-5xl text-[#00536D] font-koulen  bg-[#DFF4FA4D] rounded-3xl p-11 shadow">
              ABOUT US<br />
              <span className="text-2xl text-[#00536D] font-anekTelugu">Built by students</span>
            </button>
          </div>
          {/* <ul className="benefits">
            <li>Receive notifications when your produce is about to expire.</li>
            <li>No more losing track of ingredients.</li>
            <li>No more food waste.</li>
          </ul> */}
        </div>
      )}
    </div>
  );
};

export default LandingPage;
