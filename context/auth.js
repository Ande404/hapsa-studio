import React, { useState, useEffect, useContext, createContext } from 'react';
import firebase from '../lib/firebase';
import Router from 'next/router';
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
    return firebase.auth().onIdTokenChanged(async (user) => {
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
        setUser(user);
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

// function useProvideAuth() {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   const handleUser = (rawUser) => {
//     if (rawUser) {
//       const user = formatUser(rawUser);
//       createUser(user.uid, user);
//       setLoading(false);
//       setUser(user);
//       return user;
//     } else {
//       setLoading(false);
//       setUser(false);
//       return false;
//     }
//   };

//   const signinWithGitHub = () => {
//     setLoading(true);
//     return firebase
//       .auth()
//       .signInWithPopup(new firebase.auth.GithubAuthProvider())
//       .then((response) => handleUser(response.user));
//   };

//   const signinWithGoogle = (redirect) => {
//     setLoading(true);
//     return firebase
//       .auth()
//       .signInWithPopup(new firebase.auth.GoogleAuthProvider())
//       .then((response) => {
//         handleUser(response.user);
//         if (redirect) {
//           Router.push(redirect);
//         }
//       });
//   };

//   const signout = () => {
//     return firebase
//       .auth()
//       .signOut()
//       .then(() => handleUser(false));
//   };

//   useEffect(() => {
//     const unsubscribe = firebase.auth().onAuthStateChanged(handleUser);
//     return () => unsubscribe();
//   }, []);

// return {
//   user,
//   loading,
//   signinWithGitHub,
//   signinWithGoogle,
//   signout,
// };
