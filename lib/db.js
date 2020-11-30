import firebase from './firebase';
const firestore = firebase.firestore();
export function updateUser(uid, data) {
  return firestore.collection('users').doc(uid).update(data);
}
export function createUser(uid, data) {
  return firestore
    .collection('users')
    .doc(uid)
    .set({ uid, ...data }, { merge: true });
}

// I failed to make this work - 404 resource does not exists error

// import { request } from '../lib/hasuraClient';
// import { gql } from 'graphql-request';
// const INSERT_USER = gql`
//   mutation inser_firebase_user($object: user_insert_input!) {
//     insert_user_one(object: $object) {
//       email
//       uid
//     }
//   }
// `;

// export const firebaseUserToHasura = async (user) => {
//   const data = await request(INSERT_USER, {
//     object: {
//       ...user,
//     },
//   });
//   return data;
// };
