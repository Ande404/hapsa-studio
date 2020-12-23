import { usState } from 'react';
import firebase from '../lib/firebase';
import Link from 'next/link';

const login = (props) => {
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
        Log in
      </button>
    </div>
  );
};

export default login;
