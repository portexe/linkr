import { usePages, useAuth } from '../../hooks';
import { DashboardLink } from '../DashboardLink';
import styles from './styles.module.css';
import { useHistory } from 'react-router-dom';

export const Dashboard = () => {
  const { authUser } = useAuth();
  const pages = usePages(authUser?.uid);

  const history = useHistory();

  return (
    <div className={styles.main}>
      <h1>Pages:</h1>

      <div
        onClick={() => history.push('/create-page')}
        className={styles.createPageButton}
      >
        Create New Page
      </div>

      {pages?.map((p, index) => {
        return <DashboardLink key={index} page={p} />;
      })}
    </div>
  );
};
