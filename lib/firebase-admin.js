import admin from 'firebase-admin';

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      client_email: process.env.FIREBASE_CLIENT_EMAIL,
      private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/gm, '\n'),
      project_id: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    }),
  });
}

const auth = admin.auth();
const firestore = admin.firestore();

export { auth, firestore };
