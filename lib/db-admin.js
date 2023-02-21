import firebase from './firebase-admin';

export async function getAllFeedback(siteId) {
  try {
    const snapshot = await firebase
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
    const snapshot = await firebase.collection('sites').get();

    const sites = [];
    snapshot.forEach((doc) => sites.push({ id: doc.id, ...doc.data() }));

    return { sites };
  } catch (error) {
    return { error };
  }
}
