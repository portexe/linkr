import { useAuth } from "../../hooks/useAuth";
import { Route, Switch } from "react-router-dom";
import { Page, Login, CreatePage, Dashboard } from "../";

//#region -----> All Applied Styles & Imports

import styled from "styled-components";
import { GlobalStyling } from "../../styles_and_animations/globablStyling";

const App_css = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;
//#endregion

export const App = () => {
  const { isAuthed, authUser } = useAuth();

  return (
    <App_css>
      <GlobalStyling />
      {authUser === undefined ? (
        <></>
      ) : !isAuthed ? (
        <Switch>
          <Route exact path={["/", "/dashboard"]} component={Dashboard} />
          <Route
            exact
            path={["/create-page", "/edit-page/:id"]}
            component={CreatePage}
          />

          <Route path="/page/:id" component={Page} />
        </Switch>
      ) : (
        <Login />
      )}
    </App_css>
  );
};
