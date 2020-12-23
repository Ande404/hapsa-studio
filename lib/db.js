import { firebaseClient } from './firebase';
const firestore = firebaseClient.firestore();

export function createUser(uid, data) {
  return firestore
    .collection('users')
    .doc(uid)
    .set({ uid, ...data }, { merge: true });
}

export function updateUser(uid, data) {
  return firestore.collection('users').doc(uid).update(data);
}

export function createJob(data) {
  return firestore.collection('jobs').add(data);
}
