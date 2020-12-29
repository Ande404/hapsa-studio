import { firebaseClient } from './firebase-client';
const firestore = firebaseClient.firestore();

export function createUser(uid, data) {
  return firestore
    .collection('users')
    .doc(uid)
    .set({ uid, ...data }, { merge: true });
}

export function updateUser(uid, data) {
  console.log(data);
  return firestore.collection('users').doc(uid).update(data);
}

export function createJob(data) {
  return firestore.collection('jobs').add(data);
}

export async function getPublicJobs() {
  const jobs = [];
  const snapshot = await firestore.collection('jobs').get();
  snapshot.forEach((doc) => {
    jobs.push({
      id: doc.id,
      data: doc.data(),
    });
  });
  return jobs;
}
