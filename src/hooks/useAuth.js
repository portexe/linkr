import { fb } from '../shared/service';
import { useEffect, useState } from 'react';

export const useAuth = () => {
  const [isAuthed, setIsAuthed] = useState();
  const [authUser, setAuthUser] = useState();

  useEffect(() => {
    const unsubscribe = fb.auth.onAuthStateChanged(user => {
      if (user) {
        setAuthUser(user);
        setIsAuthed(true);
      } else {
        setAuthUser(null);
        setIsAuthed(false);
      }
    });
    return unsubscribe;
  }, []);

  return {
    isAuthed,
    authUser,
  };
};
