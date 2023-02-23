import Head from 'next/head';
import { Button, Icon, Flex, Link, Text, Stack, Box } from '@chakra-ui/react';
import { useAuth } from '@/lib/auth';
import GithubIcon from '@/styles/GithubIcon';
import GoogleIcon from '@/styles/GoogleIcon';

export default function Home() {
  const { user, signinWithGitHub, signinWithGoogle } = useAuth();

  return (
    <Box bg="gray.100">
      <Flex
        as="main"
        direction="column"
        align="center"
        justify="center"
        h="100vh"
        maxW="400px"
        margin="0 auto"
      >
        <Head>
          <title>Fast Feedback</title>
          <script
            dangerouslySetInnerHTML={{
              __html: `
              if (document.cookie && document.cookie.includes('fast-feedback-auth')) {
                window.location.href = "/dashboard"
              }
            `,
            }}
          />
        </Head>

        <Icon viewBox="0 0 46 32" fontSize={48} mb={2}>
          <path
            d="M19.557.113C11.34.32 9.117 8.757 9.03 12.95c1.643-2.67 4.62-3.08 6.931-3.08 2.825.085 10.27.205 17.458 0C40.61 9.663 44.802 3.28 46 .112c-5.391-.085-18.228-.205-26.443 0zM14.422 14.234C3.332 14.234-.468 24.76.045 31.948c3.594-6.418 7.617-7.53 9.243-7.445h6.675c5.956 0 11.039-6.846 12.836-10.27H14.422z"
            fill="currentColor"
          />
        </Icon>
        <Text px={6} fontSize="md">
          <Text as="span" fontWeight="bold" display="inline">
            Fast Feedback
          </Text>
          {' is being built as part of '}
          <Link
            href="https://react2025.com"
            isExternal
            textDecoration="underline"
          >
            React 2025
          </Link>
          {`. It's the easiest way to add comments or reviews to your static site. It's still a work-in-progress, but you can try it out by logging in.`}
        </Text>

        {user ? (
          <Button
            as="a"
            backgroundColor="white"
            color="gray.900"
            variant="outline"
            fontWeight="medium"
            mt={4}
            size="md"
            _hover={{ bg: 'gray.100' }}
            _active={{
              bg: 'gray.100',
              transform: 'scale(0.95)',
            }}
            href="/dashboard"
          >
            View Dashboard
          </Button>
        ) : (
          <Stack>
            <Button
              leftIcon={<GithubIcon />}
              backgroundColor="gray.900"
              color="white"
              fontWeight="medium"
              mt={4}
              size="md"
              _hover={{ bg: 'gray.700' }}
              _active={{
                bg: 'gray.800',
                transform: 'scale(0.95)',
              }}
              onClick={(e) => signinWithGitHub()}
            >
              Sign In with GitHub
            </Button>
            <Button
              leftIcon={<GoogleIcon />}
              backgroundColor="white"
              color="gray.900"
              fontWeight="medium"
              variant="outline"
              mt={4}
              size="md"
              _hover={{ bg: 'gray.100' }}
              _active={{
                bg: 'gray.100',
                transform: 'scale(0.95)',
              }}
              onClick={(e) => signinWithGoogle()}
            >
              Sign In with Google
            </Button>
          </Stack>
        )}
      </Flex>
    </Box>
  );
}
