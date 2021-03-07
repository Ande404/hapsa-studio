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

export async function newApplication(application) {
  const { user, job } = application;

  const alreadyExists = await firestore
    .collection('users')
    .doc(user.uid)
    .collection('applications')
    .doc(job.jobId)
    .get();

  if (alreadyExists.exists) {
    return {};
  }

  // create new app.
  // await firestore.collection('applications').add({
  //   applicant: user.uid,
  //   jobId: job.jobId,
  // });

  // // update user app. list
  // await firestore
  //   .collection('users')
  //   .doc(user.uid)
  //   .collection('applications')
  //   .add({
  //     jobId: job.jobId,
  //   });
}

export async function ActiveJobsHero() {
  const jobs = [];
  const snapshot = await firestore.collection('jobs').limit(2).get();
  snapshot.forEach((doc) => {
    jobs.push({
      id: doc.id,
      data: doc.data(),
    });
  });
  return jobs;
}

export async function ActiveJobApplications(user) {
  const jobId = [];
  await firestore
    .collection('users')
    .doc(user.uid)
    .collection('applications')
    .get()
    .then((ref) => {
      ref.forEach((doc) => {
        jobId.push(doc.data());
      });
    })
    .catch((err) => err);

  const jobRef = firestore.collection('jobs');

  const job = jobRef
    .where(
      'jobId',
      '==',
      'hr-strategy-and-execution-specialistXwOHREPhecaSxNXWh5RaI'
    )
    .get()
    .then((snapshot) => {
      snapshot.forEach((doc) => doc.data());
    });
  return job;
}
