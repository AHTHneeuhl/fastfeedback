import { useState, useEffect, useContext, createContext } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';

import {
  signInWithPopup,
  GithubAuthProvider,
  signOut,
  onIdTokenChanged,
  GoogleAuthProvider,
} from 'firebase/auth';
import { auth } from './firebase';
import { createUser } from './db';

const authContext = createContext();

export function AuthProvider({ children }) {
  const auth = useAuthProvider();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => {
  return useContext(authContext);
};

function useAuthProvider() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  const handleUser = async (rawUser) => {
    if (rawUser) {
      const user = await formatUser(rawUser);
      const { token, ...userWithoutToken } = user;
      createUser(user.uid, userWithoutToken);
      setUser(user);
      router.push('/dashboard');

      Cookies.set('fast-feedback-auth', true, {
        expires: 1,
      });

      return user;
    } else {
      setUser(false);
      router.push('/');
      Cookies.remove('fast-feedback-auth');

      return false;
    }
  };

  const signinWithGitHub = () =>
    signInWithPopup(auth, new GithubAuthProvider()).then((response) =>
      handleUser(response.user)
    );

  const signinWithGoogle = () =>
    signInWithPopup(auth, new GoogleAuthProvider()).then((response) =>
      handleUser(response.user)
    );

  const signout = () => signOut(auth).then(() => handleUser(false));

  useEffect(() => {
    const unsubscribe = onIdTokenChanged(auth, handleUser);

    return () => unsubscribe();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return {
    user,
    signinWithGitHub,
    signinWithGoogle,
    signout,
  };
}

const formatUser = async (user) => {
  return {
    uid: user.uid,
    email: user.email,
    name: user.displayName,
    provider: user.providerData[0].providerId,
    photoUrl: user.photoURL,
    token: user.accessToken,
  };
};
