import { useState, useEffect, useContext, createContext } from 'react';
import Cookies from 'js-cookie';

import {
  signInWithPopup,
  GithubAuthProvider,
  signOut,
  onIdTokenChanged,
} from 'firebase/auth';
import { auth } from './firebase';
import { createUser } from './db';

const authContext = createContext();

const githubAuthProvider = new GithubAuthProvider();

export function AuthProvider({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => {
  return useContext(authContext);
};

function useProvideAuth() {
  const [user, setUser] = useState(null);

  const handleUser = async (rawUser) => {
    if (rawUser) {
      const user = await formatUser(rawUser);
      const { token, ...userWithoutToken } = user;
      createUser(user.uid, userWithoutToken);
      setUser(user);

      Cookies.set('fast-feedback-auth', true, {
        expires: 1,
      });

      return user;
    } else {
      setUser(false);
      Cookies.remove('fast-feedback-auth');

      return false;
    }
  };

  const signinWithGitHub = () =>
    signInWithPopup(auth, githubAuthProvider).then((response) =>
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
