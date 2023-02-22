import { useRouter } from 'next/router';
import { useRef, useState } from 'react';
import { Box, Button, FormControl, FormLabel, Input } from '@chakra-ui/react';

import Feedback from '@/components/Feedback';
import { getAllFeedback, getAllSites } from '@/lib/db-admin';
import { useAuth } from '@/lib/auth';
import { createFeedback } from '@/lib/db';

const SiteFeedback = ({ initialFeedback }) => {
  const { user } = useAuth();
  const router = useRouter();

  const [allFeedback, setAllFeedback] = useState(initialFeedback);

  const inputRef = useRef(null);

  const onSubmit = (e) => {
    e.preventDefault();

    const newFeedback = {
      author: user.name,
      authorId: user.uid,
      siteId: router.query.siteId,
      text: inputRef.current.value,
      createdAt: new Date().toISOString(),
      provider: user.provider,
      status: 'pending',
      rating: 5,
    };
    inputRef.current.value = '';

    setAllFeedback((prevFeedback) => [newFeedback, ...prevFeedback]);
    createFeedback(newFeedback);
  };

  return (
    <Box display="flex" flexDir="column" w="full" maxW="700px" m="0 auto">
      <Box as="form" onSubmit={onSubmit}>
        <FormControl my={8}>
          <FormLabel htmlFor="comment">Comment</FormLabel>
          <Input ref={inputRef} id="comment" name="comment" type="text" />
          <Button type="submit" fontWeight="medium" mt={2}>
            Add Comment
          </Button>
        </FormControl>
      </Box>
      {allFeedback.map((feedback) => (
        <Feedback
          key={feedback.createdAt}
          author={feedback.author}
          text={feedback.text}
          createdAt={feedback.createdAt}
        />
      ))}
    </Box>
  );
};

export async function getStaticProps(context) {
  const siteId = context.params.siteId;
  const { feedbacks } = await getAllFeedback(siteId);

  return {
    props: {
      initialFeedback: feedbacks,
    },
    revalidate: 1,
  };
}

export async function getStaticPaths() {
  const { sites } = await getAllSites();
  const paths = sites.map((site) => ({
    params: { siteId: site.id.toString() },
  }));

  return {
    paths,
    fallback: false,
  };
}

export default SiteFeedback;
