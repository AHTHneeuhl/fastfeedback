import Head from 'next/head';
import Image from 'next/image';
import styles from '@/styles/Home.module.css';
import { useAuth } from '@/lib/auth';

export default function Home() {
  const { user, signinWithGitHub, signout } = useAuth();

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.description}>
          <p>
            Get started by editing&nbsp;
            <code className={styles.code}>pages/index.js</code>
          </p>
          <div>
            <a
              href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
              target="_blank"
              rel="noopener noreferrer"
            >
              By{' '}
              <Image
                src="/vercel.svg"
                alt="Vercel Logo"
                className={styles.vercelLogo}
                width={100}
                height={24}
                priority
              />
            </a>
          </div>
        </div>

        <div className={styles.center}>
          <h1>Fast Feedback</h1>
        </div>

        {!user && <button onClick={() => signinWithGitHub()}>Sign In</button>}
        {user?.displayName}
        {user && <button onClick={() => signout()}>Sign Out</button>}
      </main>
    </>
  );
}