import React from 'react'
import { useNavigate } from 'react-router-dom'
const Footer = () => {
  return (
    <footer className="bg-[#f1fcff] text-[#00566E] text-center inline-block flex flex-col justify-center">
      <div className="max-w-3xl mx-auto px-4 py-12">
        <span className="text-4xl text-[#00536D] font-anekTelugu font-semibold">
          Privacy Policy
        </span>
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4">Introduction</h2>
          <p className="text-base leading-relaxed">
            This Privacy Policy outlines how Pantree ("we", "us", or "our")
            collects, uses, and protects information gathered through our Chrome
            Extension ("Extension"). By installing and using the Extension, you
            agree to the collection and use of information in accordance with
            this policy.
          </p>
        </div>
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4">
            Information Collection and Use
          </h2>
          <p className="text-base leading-relaxed">
            The Extension collects the following types of information:
          </p>
          <ul className="list-disc ml-8 text-left">
            <li>
              <strong>Personal Information:</strong> We collect personal
              information such as your name and email address. This information
              is gathered when you voluntarily provide it to us through the
              Extension's interface, for instance, during sign-up or while using
              our services.
            </li>
            <li>
              <strong>Website Information:</strong> We collect information
              related to the websites you visit, including website URLs, to
              provide our services. This data helps us understand your
              preferences and tailor our services accordingly.
            </li>
            <li>
              <strong>Usage Data:</strong> We collect information on how the
              Extension is accessed and used. This Usage Data may include
              information such as your computer's Internet Protocol address
              (e.g., IP address), browser type, browser version, our Extension's
              pages that you visit, the time and date of your visit, the time
              spent on those pages, unique device identifiers, and other
              diagnostic data.
            </li>
          </ul>
        </div>
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4">Use of Data</h2>
          <p className="text-base leading-relaxed">
            Pantree uses the collected data for various purposes:
          </p>
          <ul className="list-disc ml-8 text-left">
            <li>To provide and maintain our Extension</li>
            <li>To notify you about changes to our Extension</li>
            <li>
              To allow you to participate in interactive features of our
              Extension when you choose to do so
            </li>
            <li>To provide customer care and support</li>
            <li>
              To provide analysis or valuable information so that we can improve
              the Extension
            </li>
            <li>To monitor the usage of the Extension</li>
            <li>To detect, prevent, and address technical issues</li>
          </ul>
        </div>
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4">Data Protection</h2>
          <p className="text-base leading-relaxed">
            The security of your data is important to us, but remember that no
            method of transmission over the Internet or method of electronic
            storage is 100% secure. While we strive to use commercially
            acceptable means to protect your Personal Information, we cannot
            guarantee its absolute security.
          </p>
        </div>
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4">Data Sharing</h2>
          <p className="text-base leading-relaxed">
            We do not sell, trade, or rent your personal identification
            information to others. We may share generic aggregated demographic
            information not linked to any personal identification information
            regarding visitors and users with our business partners, trusted
            affiliates, and advertisers for the purposes outlined above.
          </p>
        </div>
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4">
            Changes to This Privacy Policy
          </h2>
          <p className="text-base leading-relaxed">
            We may update our Privacy Policy from time to time. We will notify
            you of any changes by posting the new Privacy Policy on this page.
            You are advised to review this Privacy Policy periodically for any
            changes. Changes to this Privacy Policy are effective when they are
            posted on this page.
          </p>
        </div>
        <div>
          <h2 className="text-xl font-bold mb-4">Contact Us</h2>
          <p className="text-base leading-relaxed">
            If you have any questions about this Privacy Policy, please contact
            us at{' '}
            <a
              href="mailto:getpantree@gmail.com"
              className="text-blue-500 underline"
            >
              getpantree@gmail.com
            </a>
            .
          </p>
        </div>
      </div>
    </footer>
  )
}

const PrivacyPolicy = () => {
  const navigate = useNavigate()
  return (
    <div
      className="flex flex-col h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url("/Fruits.png")` }}
    >
      <div className="flex flex-col justify-center items-center flex-grow">
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
        <p className="text-xl text-[#00566E] text-center pt-3.5 font-anekTelugu">
          Saving those blueberries you forgot about
        </p>
        <div className="flex flex-col text-center justify-center gap-10 py-20">
          <span className="text-2xl text-[#00536D] font-anekTelugu font-semibold">
            Built by students
          </span>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default PrivacyPolicy
