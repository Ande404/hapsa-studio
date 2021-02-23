import React, { useState, useEffect, useContext, createContext } from 'react';
import { firebaseClient } from '../lib/firebase-client';
import { createUser } from '../lib/db';
import nookies from 'nookies';

const AuthContext = createContext({
  user: null,
});

export function AuthProvider({ children }) {
  const [user, setUser] = useState();

  useEffect(() => {
    if (typeof window !== undefined) {
      window.nookies = nookies;
    }
    return firebaseClient.auth().onIdTokenChanged(async (user) => {
      console.log(`token changed!`);
      if (!user) {
        console.log(`no token found...`);

        setUser(null);
        nookies.destroy(null, 'token');
        nookies.set(null, 'token', '', {});

        return;
      } else {
        console.log(`updating token...`);

        const token = await user.getIdToken();
        const saveUser = formatUser(user);

        setUser(saveUser);

        // firebaseAdmin
        //   .auth()
        //   .currentUser.getIdToken(true)
        //   .then(function (idToken) {
        //     console.log(idToken);
        //   });

        createUser(user.uid, saveUser);

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
