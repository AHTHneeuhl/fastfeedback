import { addDoc, collection, doc, setDoc } from 'firebase/firestore';
import { db } from './firebase';

export function createUser(uid, user) {
  const userRef = doc(db, 'users', uid);
  setDoc(userRef, user, { merge: true });
}

export function createSite(values) {
  const siteRef = collection(db, 'sites');
  addDoc(siteRef, values);
}

export function createFeedback(values) {
  const feedbackRef = collection(db, 'feedback');
  addDoc(feedbackRef, values);
}
