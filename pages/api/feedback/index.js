import { getUserFeedback } from '@/lib/db-admin';
import { auth } from '@/lib/firebase-admin';

export default async function handler(req, res) {
  try {
    const { uid } = await auth.verifyIdToken(req.headers.token);
    const { feedbacks } = await getUserFeedback(uid);

    res.status(200).json(feedbacks);
  } catch (error) {
    res.status(500).json({ error });
  }
}
