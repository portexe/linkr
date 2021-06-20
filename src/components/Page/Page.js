import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth, usePages } from '../../hooks';
import styles from './styles.module.css';

export const Page = () => {
  const { id } = useParams();
  const [page, setPage] = useState();

  const { authUser } = useAuth();
  const pages = usePages(authUser?.uid);

  useEffect(() => {
    if (id && pages) {
      setPage(pages.find(p => p.id === id));
    }
  }, [id, pages]);

  return (
    <div className={styles.main}>
      <h1>{page?.name}</h1>

      {page?.links?.map((l, index) => {
        return (
          <div
            onClick={() => window.open(l.value)}
            key={index}
            className={styles.page}
          >
            {l.name}
          </div>
        );
      })}
    </div>
  );
};
