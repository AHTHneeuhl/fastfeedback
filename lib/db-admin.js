import { firestore } from './firebase-admin';

export async function getAllFeedback(siteId) {
  try {
    const snapshot = await firestore
      .collection('feedback')
      .where('siteId', '==', siteId)
      .get();

    const feedbacks = [];

    snapshot.forEach((doc) => {
      feedbacks.push({ id: doc.id, ...doc.data() });
    });

    return { feedbacks };
  } catch (error) {
    return { error };
  }
}

export async function getAllSites() {
  try {
    const snapshot = await firestore.collection('sites').get();

    const sites = [];
    snapshot.forEach((doc) => sites.push({ id: doc.id, ...doc.data() }));

    return { sites };
  } catch (error) {
    return { error };
  }
}

export async function getUserSites(uid) {
  const snapshot = await firestore
    .collection('sites')
    .where('authorId', '==', uid)
    .get();

  const sites = [];
  snapshot.forEach((doc) => sites.push({ id: doc.id, ...doc.data() }));

  return { sites };
}
