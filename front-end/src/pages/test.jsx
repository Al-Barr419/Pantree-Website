import React, { useState, useEffect, useCallback } from 'react'
import { auth } from '../Firebase'
import {
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
} from 'firebase/auth'
import axios from 'axios'

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
  const googleProvider = new GoogleAuthProvider()

  const [user, setUser] = useState(null)

  const [tokenFetched, setTokenFetched] = useState(false)

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
    <div
      className="flex flex-col h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url("/Fruits.png")` }}
    >
      <div>
        {!user && (
          <button onClick={signInWithGoogle}>Sign in with Google</button>
        )}
        {user && <button onClick={signOut}>Sign Out</button>}
      </div>
      <Footer />
    </div>
  )
}

export default Auth
