import { useEffect, useState } from 'react';
import styles from './styles.module.css';
import { MdAdd, MdClose } from 'react-icons/md';
import { uuid } from '../../shared';
import { useHistory, useParams, useLocation } from 'react-router-dom';
import { fb } from '../../shared/service';
import { useAuth } from '../../hooks';

export const CreatePage = () => {
  const history = useHistory();

  const { authUser } = useAuth();

  const { id } = useParams();
  const location = useLocation();

  const [isEdit, setIsEdit] = useState();
  const [pageName, setPageName] = useState('');
  const [pageLinks, setPageLinks] = useState([]);
  const [currentLink, setCurrentLink] = useState({
    value: '',
    name: '',
    id: '',
  });

  useEffect(() => {
    if (id && location.pathname.includes('/edit-page')) {
      setIsEdit(true);
      fb.firestore
        .collection('linkPages')
        .doc(id)
        .get()
        .then(res => {
          const data = res.data();

          if (data) {
            setPageName(data.name);
            setPageLinks(data.links);
          } else {
            console.error(404);
          }
        });
    } else {
      setIsEdit(false);
    }
  }, [id, location]);

  const createPage = () => {
    if (authUser && pageName && pageLinks.length) {
      fb.firestore
        .collection('linkPages')
        .add({
          userId: authUser.uid,
          links: pageLinks,
          name: pageName,
        })
        .then(() => {
          history.push('/');
        });
    }
  };

  const updatePage = () => {
    if (id && authUser && pageName && pageLinks.length) {
      fb.firestore
        .collection('linkPages')
        .doc(id)
        .update({
          links: pageLinks,
          name: pageName,
        })
        .then(() => {
          history.push('/');
        });
    }
  };

  return typeof isEdit === 'boolean' ? (
    <div className={styles.main}>
      <input
        placeholder="Page Name"
        value={pageName}
        onChange={e => setPageName(e.target.value)}
        className={styles.name}
      />

      <div className={styles.links}>
        {pageLinks.map((l, index) => {
          return (
            <div key={index} className={styles.link}>
              <div className={styles.linkName}>{l.name}</div>
              <div className={styles.linkValue}>{l.value}</div>

              <div
                className={styles.deleteLink}
                onClick={() =>
                  setPageLinks(pageLinks.filter(pl => pl.id !== l.id))
                }
              >
                <MdClose />
              </div>
            </div>
          );
        })}

        <div className={styles.linkInputs}>
          <input
            placeholder="Link Name"
            value={currentLink.name}
            onChange={e =>
              setCurrentLink({ ...currentLink, name: e.target.value })
            }
            className={styles.currentLinkName}
          />
          <input
            placeholder="Link URL"
            value={currentLink.value}
            onChange={e =>
              setCurrentLink({ ...currentLink, value: e.target.value })
            }
            className={styles.currentLinkValue}
          />
          <button
            onClick={() => {
              setPageLinks([
                ...pageLinks,
                {
                  name: currentLink.name,
                  value: currentLink.value,
                  id: uuid(),
                },
              ]);
              setCurrentLink({ value: '', name: '', id: '' });
            }}
            disabled={!currentLink.name || !currentLink.value}
            className={styles.add}
          >
            <MdAdd />
          </button>
        </div>
      </div>

      <button
        onClick={isEdit ? updatePage : createPage}
        disabled={!pageLinks.length || !pageName}
        className={styles.submit}
      >
        {!isEdit ? 'Create' : 'Update'}
      </button>

      <button className={styles.cancel} onClick={() => history.push('/')}>
        Cancel
      </button>
    </div>
  ) : (
    <></>
  );
};
