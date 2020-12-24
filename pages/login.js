import { usState, useEffect } from 'react';
import { firebaseClient } from '../lib/firebase';
import Link from 'next/link';
import { useAuth } from '../context/auth';
import { useRouter } from 'next/router';
const login = () => {
  const { user } = useAuth();
  const router = useRouter();

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
        <button
          onClick={async () => {
            await firebaseClient
              .auth()
              .signInWithPopup(new firebaseClient.auth.GoogleAuthProvider());
            window.location.href = '/';
          }}
        >
          Log in with Google
        </button>
      </div>
    </div>
  );
};

export default login;
