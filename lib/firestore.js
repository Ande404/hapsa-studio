import { firebaseClient } from './firebase-client';

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

export async function createJob(jobId, data) {
  const newJob = await firestore
    .collection('jobs')
    .doc(jobId)
    .set({ ...data, jobId });

  return newJob;
}

export async function getAllJobId() {
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

export async function getJobById(id) {
  const jobRef = await firestore.collection('jobs').doc(id);
  const doc = await jobRef.get();

  if (!doc) {
    console.log("dawg the slug ain't it");
  }

  return doc.data();
}
