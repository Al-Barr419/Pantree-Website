import React from "react";
import MailListForm from "../components/MailListForm";
// Import any other components or assets you need

const LandingPage = () => {
  return (
    <div className="landing-page">
      <img src="/Logo.png" alt="Pantree Logo" className="logo" />
      <div className="fruits-container">
        <img src="/Fruits.png" alt="Fruits" className="fruits" />
        <div className="text-overlay">
          <p className="tagline">Saving those blueberries you forgot about</p>
        </div>
      </div>
      <div className="buttons">
        <button className="chrome-extension">INSTALL CHROME EXTENSION</button>
        <button className="about-us">ABOUT US</button>
      </div>
      <ul className="benefits">
        <li>Receive notifications when your produce is about to expire.</li>
        <li>No more losing track of ingredients.</li>
        <li>No more food waste.</li>
      </ul>
      <MailListForm />
    </div>
  );
};

export default LandingPage;
