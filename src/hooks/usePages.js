import { fb } from '../shared/service';
import { useEffect, useState } from 'react';

export const usePages = userId => {
  const [pages, setPages] = useState();

  useEffect(() => {
    const unsubscribe = userId
      ? fb.firestore
          .collection('linkPages')
          .where('userId', '==', userId)
          .onSnapshot(snap => {
            const _pages = [];
            snap.forEach(s => {
              _pages.push({
                ...s.data(),
                id: s.id,
              });
            });
            setPages(_pages);
          })
      : undefined;

    return unsubscribe;
  }, [userId]);

  return pages;
};
