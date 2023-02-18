import { useState, useEffect, useContext, createContext } from 'react';
import {
  signInWithPopup,
  GithubAuthProvider,
  signOut,
  onIdTokenChanged,
} from 'firebase/auth';
import auth from './firebase';

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

  const signinWithGitHub = () =>
    signInWithPopup(auth, githubAuthProvider).then((response) => {
      setUser(response.user);
      return response.user;
    });

  const signout = () =>
    signOut(auth).then(() => {
      setUser(false);
    });

  useEffect(() => {
    const unsubscribe = onIdTokenChanged(auth, () => {
      if (user) {
        setUser(user);
      } else {
        setUser(false);
      }
    });

    return () => unsubscribe();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return {
    user,
    signinWithGitHub,
    signout,
  };
}
