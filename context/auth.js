import React, { useState, useEffect, useContext, createContext } from 'react';
import { firebaseClient } from '../lib/firebase-client';
import { createUser } from '../lib/firestore';
import nookies from 'nookies';
import { timestampAuth } from '../util/time';
const fetch = require('node-fetch');

const AuthContext = createContext({
  user: null,
});

export function AuthProvider({ children }) {
  const [user, setUser] = useState();

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

        const token = await idToken.getIdToken();
        const saveUser = formatUser(idToken);

        setUser(saveUser);

        // fetch('http://127.0.0.1:8080/api/v1/auth', {
        //   method: 'get',
        //   headers: { Authorization: token },
        // })
        //   .then((res) => res.json())
        //   .then((json) => console.log(json));
        createUser(idToken.uid, saveUser);

        nookies.destroy(null, 'token');
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
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
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
