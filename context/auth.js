import React, { useState, useEffect, useContext, createContext } from 'react';
import nookies from 'nookies';
import { firebaseClient } from '../lib/firebase-client';
import { createUser } from '../lib/firestore';
import { formatUser } from "../lib/firebase-helpers"


const AuthContext = createContext({
  user: null,
});

export function AuthProvider({ children }) {
  const [user, setUser] = useState();

  const signIn = (email, password) =>
    firebaseClient
      .signInWithEmailAndPassword(email, password)
      .then((response) => {
        setUser(response.user);
        return response.user;
      });

  const signUp = (email, password) =>
    firebaseClient
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((response) => {
        setUser(response.user);
        return response.user;
      }).catch(err => {
        if (err.code === "auth/email-already-in-use") {
          return err
        }
      });

  const signOut = () =>
    firebaseClient
      .auth()
      .signOut()
      .then(() => {
        setUser(false);
      });

  const sendPasswordResetEmail = (email) =>
    firebaseClient
      .auth()
      .sendPasswordResetEmail(email)
      .then(() => true);

  const confirmPasswordReset = (code, password) =>
    firebaseClient
      .auth()
      .confirmPasswordReset(code, password)
      .then(() => true);

  const googleLogin = async () => {
    await firebaseClient
      .auth()
      .signInWithPopup(new firebaseClient.auth.GoogleAuthProvider());
  };

  const twitterLogin = async () => {
    await firebaseClient
      .auth()
      .signInWithRedirect(new firebaseClient.auth.TwitterAuthProvider());
  };

  const facebookLogin = async () => {
    await firebaseClient
      .auth()
      .signInWithRedirect(new firebaseClient.auth.FacebookAuthProvider());
  };

  useEffect(() => {
    if (typeof window !== undefined) {
      window.nookies = nookies;
    }
    return firebaseClient.auth().onIdTokenChanged(async (idToken) => {
      console.log(`token updated!`);
      if (!idToken) {
        console.log(`no token found...`);

        setUser(null);

        nookies.destroy(null, 'token');
        nookies.set(null, 'token', '', {});
      } else {
        console.log(`updating token...`);

        const saveUser = formatUser(idToken);

        setUser(saveUser);

        createUser(idToken.uid, saveUser);

        const token = await idToken.getIdToken();
        nookies.set(null, 'token', token, {});
      }
    });
  }, []);

  useEffect(() => {
    const handle = setInterval(async () => {
      console.log(`refreshing token...`);

      const user = firebaseClient.auth().currentUser;

      if (user) await user.getIdToken(true);
    }, 10 * 60 * 1000);

    return () => clearInterval(handle);
  }, []);
  return (
    <AuthContext.Provider
      value={{
        user,
        signIn,
        signUp,
        signOut,
        sendPasswordResetEmail,
        confirmPasswordReset,
        googleLogin,
        facebookLogin,
        twitterLogin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);

