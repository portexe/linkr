import styles from './styles.module.css';
import { useAuth } from '../../hooks/useAuth';
import { Route, Switch } from 'react-router-dom';
import { Page, Login, CreatePage, Dashboard } from '../';

export const App = () => {
  const { isAuthed, authUser } = useAuth();

  return (
    <div className={styles.main}>
      {authUser === undefined ? (
        <></>
      ) : isAuthed ? (
        <Switch>
          <Route exact path={['/', '/dashboard']} component={Dashboard} />
          <Route
            exact
            path={['/create-page', '/edit-page/:id']}
            component={CreatePage}
          />

          <Route path="/page/:id" component={Page} />
        </Switch>
      ) : (
        <Login />
      )}
    </div>
  );
};
