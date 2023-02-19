import { doc, setDoc } from 'firebase/firestore';
import { db } from './firebase';

export function createUser(uid, user) {
  const userRef = doc(db, 'users', uid);
  setDoc(userRef, user, { merge: true });
}
