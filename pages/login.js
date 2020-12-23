import { usState } from 'react';
import firebase from '../lib/firebase';
import Link from 'next/link';
import { useAuth } from '../context/auth';
import { useRouter } from 'next/router';

const login = () => {
  const { user } = useAuth();
  const router = useRouter();
  if (user) {
    router.push('/dashboard');
  }
  return (
    <div>
      <Link href='/'>
        <a>Go back to home page</a>
      </Link>
      <button
        onClick={async () => {
          await firebase
            .auth()
            .signInWithPopup(new firebase.auth.GoogleAuthProvider());
          window.location.href = '/';
        }}
      >
        Log in with Google
      </button>
      <button
        onClick={async () => {
          await firebase
            .auth()
            .signInWithPopup(new firebase.auth.GithubAuthProvider());
          window.location.href = '/';
        }}
      >
        Log in with Github
      </button>
    </div>
  );
};

export default login;
