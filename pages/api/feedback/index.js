import { getUserFeedback } from '@/lib/db-admin';
import { auth } from '@/lib/firebase-admin';
import logger, { formatObjectKeys } from '@/utils/logger';

export default async function handler(req, res) {
  try {
    const { uid } = await auth.verifyIdToken(req.headers.token);
    const { feedbacks } = await getUserFeedback(uid);

    res.status(200).json(feedbacks);
  } catch (error) {
    logger.error(
      {
        request: {
          headers: formatObjectKeys(req.headers),
          url: req.url,
          method: req.method,
        },
        response: {
          statusCode: res.statusCode,
        },
      },
      error.message
    );

    res.status(500).json({ error });
  }
}
