import React, { useState, useEffect, useContext, createContext } from 'react';
import nookies from 'nookies';
import PropTypes from 'prop-types'; // ES6
import { firebaseClient } from '../firebase/client';
import { createUser } from '../firebase/firestore';
import { formatUser } from '../firebase/helpers';

const AuthContext = createContext({
  user: null,
});

export function AuthProvider({ children }) {
  const [user, setUser] = useState();

  const signIn = (email, password) =>
    firebaseClient
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((response) => {
        setUser(response.user);
        return response.user;
      });

  const signUp = async (email, password) => {
    try {
      const newUser = await firebaseClient
        .auth()
        .createUserWithEmailAndPassword(email, password);

      const token = await newUser.user.getIdToken();

      console.log(token);

      nookies.set(null, 'token', token, {});
    } catch (error) {
      return error;
    }
  };

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
    if (typeof window !== 'undefined') {
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

        console.log(token);

        nookies.set(null, 'token', token, {});
      }
    });
  }, []);

  useEffect(() => {
    const handle = setInterval(async () => {
      console.log(`refreshing token...`);

      const currenUser = firebaseClient.auth().currentUser;

      if (currenUser) await currenUser.getIdToken(true);
    }, 10 * 60 * 1000);

    return () => clearInterval(handle);
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

AuthProvider.propTypes = {
  children: PropTypes.node,
};

export const useAuth = () => useContext(AuthContext);
