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
    backgroundColor: 'white',
    zIndex: 1000, 
    display: 'flex',
    alignItems: 'center', 
    justifyContent: 'center', 
  };

  return (
    <div className="landing-page">
      {showFormOnly && (
        <div style={overlayStyle}>
          <MailListForm />
        </div>
      )}
      {!showFormOnly && (
        <>
          <img src="/Logo.png" alt="Pantree Logo" className="logo" />
          <div className="fruits-container">
            <img src="/Fruits.png" alt="Fruits" className="fruits" />
            <div className="text-overlay">
              <p className="tagline">Saving those blueberries you forgot about</p>
            </div>
          </div>
          <div className="buttons">
            <button className="chrome-extension" onClick={handleButtonClick}>
              INSTALL CHROME EXTENSION<br />
              <span className="button-subtext">Your automatic fridge management app</span>
            </button>
            <button className="about-us">
              ABOUT US<br />
              <span className="button-subtext">Built by students</span>
            </button>
          </div>
          <ul className="benefits">
            <li>Receive notifications when your produce is about to expire.</li>
            <li>No more losing track of ingredients.</li>
            <li>No more food waste.</li>
          </ul>
        </>
      )}
    </div>
  );
};

export default LandingPage;
