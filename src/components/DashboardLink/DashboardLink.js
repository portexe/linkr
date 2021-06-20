import styles from './styles.module.css';
import { MdEdit, MdDelete, MdVisibility } from 'react-icons/md';
import { useHistory } from 'react-router-dom';
import { fb } from '../../shared/service';

export const DashboardLink = ({ page }) => {
  const history = useHistory();

  const viewPage = () => window.open(`/page/${page.id}`);
  const editPage = () => history.push(`/edit-page/${page.id}`);
  const deletePage = () => {
    if (window.confirm(`Are you sure you want to delete ${page.name}?`)) {
      fb.firestore.collection('linkPages').doc(page.id).delete();
    }
  };

  return (
    <div className={styles.main}>
      <div className={styles.title}>{page.name}</div>

      <div onClick={viewPage} className={styles.view}>
        <MdVisibility />
      </div>
      <div onClick={editPage} className={styles.edit}>
        <MdEdit />
      </div>
      <div onClick={deletePage} className={styles.delete}>
        <MdDelete />
      </div>
    </div>
  );
};
