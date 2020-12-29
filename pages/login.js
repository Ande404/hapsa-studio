import { usState, useEffect } from 'react';
import { firebaseClient } from '../lib/firebase-client';
import Link from 'next/link';
import { useAuth } from '../context/auth';
import { useRouter } from 'next/router';
const login = () => {
  const { user } = useAuth();
  const router = useRouter();

  const handeLogin = async () => {
    await firebaseClient
      .auth()
      .signInWithPopup(new firebaseClient.auth.GoogleAuthProvider());
    window.location.href = '/';
  };
  useEffect(() => {
    if (user) {
      router.push('/dashboard');
    }
    return () => {};
  }, [user]);

  return (
    <div>
      <div>
        <Link href='/'>
          <a>Go back to home page</a>
        </Link>
        {!user ? (
          <button onClick={() => handeLogin()}>Log in with Google</button>
        ) : (
          'Logged in'
        )}
      </div>
    </div>
  );
};

export default login;
