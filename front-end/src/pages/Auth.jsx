import React, { useState, useEffect, useCallback } from 'react'
import { auth } from '../Firebase'
import {
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
} from 'firebase/auth'
import axios from 'axios'
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
    </footer>
  )
}

const Auth = () => {
  const navigate = useNavigate()
  const googleProvider = new GoogleAuthProvider()

  const [user, setUser] = useState(null)

  const [tokenFetched, setTokenFetched] = useState(false)
  const [phoneNumber, setPhoneNumber] = useState('')
  const [error, setError] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [numberChanged, setNumberChanged] = useState(false)

  // Simple validation for phone number
  const validatePhoneNumber = (input) => {
    const phoneNumberPattern = /^\+?[1-9]\d{1,14}$/ // Simplistic regex for international phone numbers
    return phoneNumberPattern.test(input)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (validatePhoneNumber(phoneNumber)) {
      editPhoneNumber()
      setError('')
      // You can proceed to use the phone number, e.g., send it to a backend
    } else {
      setError('Please enter a valid phone number.')
    }
  }

  const handleChange = (event) => {
    setPhoneNumber(event.target.value)
  }

  const sendLogin = useCallback((uid) => {
    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/generate-token`, null, {
        headers: {
          authorization: uid,
        },
      })
      .then((response) => {
        let tok = response.data.data.customToken
        setCustomTokenInQS(tok)
        console.log(tok)
      })
      .catch((error) => {
        console.error('Error:', error)
      })
  }, [])

  const setCustomTokenInQS = (customToken) => {
    const urlParams = new URLSearchParams(window.location.search)

    urlParams.set('custom_token', customToken)

    window.history.replaceState(
      {},
      '',
      `${window.location.pathname}?${urlParams}`
    )
  }

  const signOut = () => {
    auth.signOut().then(() => {
      console.log('Signed Out')
    })
    setUser(null)
  }

  const signInWithGoogle = () => {
    console.log('Popup')
    if (user) {
      console.log('Already signed in')
    } else {
      signInWithPopup(auth, googleProvider)
        .then(async (result) => {
          // This gives you a Google Access Token. You can use it to access the Google API.
          const credential = GoogleAuthProvider.credentialFromResult(result)
          // The signed-in user info.
          setUser(result.user)
          // IdP data available using getAdditionalUserInfo(result)
        })
        .catch((error) => {
          console.error(error)
        })
    }
  }

  const editPhoneNumber = async () => {
    if (auth.currentUser) {
      const token = await auth.currentUser.getIdToken()
      const headers = {
        Authorization: `Bearer ${token}`,
      }
      axios
        .post(
          `${process.env.REACT_APP_BACKEND_URL}/api/editPhoneNumber`,
          { newPhoneNumber: phoneNumber },
          {
            headers: headers,
          }
        )
        .then((response) => {
          console.log('Response from server:', response.data)
          if (response.status >= 200 && response.status < 300) {
            setNumberChanged(true) // Update state to show success message
            setShowForm(false) // Optionally hide the form
          }
        })
        .catch((error) => {
          console.error('There was an error sending the items:', error)
        })
    }
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        user
          .getIdToken(/* forceRefresh */ true)
          .then(function (idToken) {
            if (!tokenFetched) {
              sendLogin(idToken)
              setTokenFetched(true)
            }
          })
          .catch(function (error) {
            console.error(error)
          })
        console.log('Signed in', user)
        setUser(user)
      }
    })
    return unsubscribe
  }, [sendLogin, tokenFetched])

  // signInWithGoogle();

  return (
    <div className="flex flex-col min-h-screen">
      <div
        className="flex flex-col h-screen bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url("/Fruits2.png")` }}
      >
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
        <div className="flex flex-col justify-center items-center h-full">
          {!user && (
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
              onClick={signInWithGoogle}
            >
              Sign in with Google
            </button>
          )}
          {user && (
            <>
              <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-4"
                onClick={signOut}
              >
                Sign Out
              </button>
              {!showForm && (
                <button
                  className="bg-green-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mt-4"
                  onClick={() => {
                    setShowForm(!showForm)
                  }}
                >
                  Add/Edit Phone Number
                </button>
              )}
              {showForm && (
                <form
                  onSubmit={handleSubmit}
                  className="flex flex-col items-center space-y-4 p-4"
                >
                  <input
                    type="tel"
                    value={phoneNumber}
                    onChange={handleChange}
                    placeholder="Enter your phone number"
                    className="w-full max-w-xs px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <button
                    type="submit"
                    className="bg-green-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors duration-200"
                  >
                    Submit
                  </button>
                  {error && <p className="text-red-500">{error}</p>}
                </form>
              )}
              {!showForm && numberChanged && (
                <p>
                  You have successfully edited your number for SMS
                  notifications.
                </p>
              )}
              <button
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mt-4"
                onClick={() => navigate(-1)}
              >
                Go Back
              </button>
            </>
          )}
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Auth
