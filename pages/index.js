import Head from 'next/head';
import { useAuth } from '@/lib/auth';
import { Heading, Button, Text } from '@chakra-ui/react';

export default function Home() {
  const { user, signinWithGitHub, signout } = useAuth();

  return (
    <>
      <Head>
        <title>Fast Feedback</title>
        <meta name="description" content="Get feedback... fast." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div>
        <Heading>Fast Feedback</Heading>

        <Text>{user?.name}</Text>

        {user ? (
          <Button onClick={() => signout()}>Sign Out</Button>
        ) : (
          <Button onClick={() => signinWithGitHub()}>Sign In</Button>
        )}
      </div>
    </>
  );
}
