import React, { useState, useEffect, useContext, createContext } from 'react';
import { firebaseClient } from '../lib/firebase-client';
import { createUser } from '../lib/firestore';
import nookies from 'nookies';

const AuthContext = createContext({
  user: null,
});

export function AuthProvider({ children }) {
  const [user, setUser] = useState();

  const signIn = (email, password) => {
    return firebaseClient
      .signInWithEmailAndPassword(email, password)
      .then((response) => {
        setUser(response.user);
        return response.user;
      });
  };

  const signUp = (email, password) => {
    return firebaseClient
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((response) => {
        setUser(response.user);
        return response.user;
      });
  };

  const signOut = () => {
    return firebaseClient
      .auth()
      .signOut()
      .then(() => {
        setUser(false);
      });
  };

  const sendPasswordResetEmail = (email) => {
    return firebaseClient
      .auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        return true;
      });
  };

  const confirmPasswordReset = (code, password) => {
    return firebaseClient
      .auth()
      .confirmPasswordReset(code, password)
      .then(() => {
        return true;
      });
  };

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

        return;
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

export const useAuth = () => {
  return useContext(AuthContext);
};

const formatUser = (user) => {
  return {
    uid: user.uid,
    email: user.email,
    name: user?.displayName,
    provider: user?.providerData[0].providerId,
    photoUrl: user?.photoURL,
  };
};
