import { usePages, useAuth } from "../../hooks";
import { DashboardLink } from "../DashboardLink";
import { useHistory } from "react-router-dom";

//#region -----> All Applied Styles & Imports
import styled from "styled-components";
import { CgAddR } from "react-icons/cg";

const Page_main_container = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding-top: 7rem;

  h1 {
    text-align: center;
    width: 100%;
  }

  .create_div {
    height: 175px;
    width: 175px;
    border: 3px solid white;
    border-radius: 15px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-content: center;
    transition: all 0.1s ease;
    cursor: pointer;

    .create_icon {
      font-size: 2.75rem;
      margin-bottom: 0.5rem;
      transition: all 0.1s ease;
    }

    p {
      letter-spacing: 0.05rem;
      width: 100%;
      color: #eeeeee;
      text-align: center;
      transition: all 0.1s ease;
    }

    &:hover {
      height: 178px;
      width: 178px;

      .create_icon {
        font-size: 2.8rem;
      }
      p {
        font-size: 1.1rem;
      }
    }
  }
`;

//#endregion

export const Dashboard = () => {
  const { authUser } = useAuth();
  const pages = usePages(authUser?.uid);

  const history = useHistory();

  return (
    <Page_main_container>
      <h1>Pages:</h1>

      <div className="create_div" onClick={() => history.push("/create-page")}>
        <CgAddR className="create_icon" />
        <p>Create New Page</p>
      </div>

      {pages?.map((p, index) => {
        return <DashboardLink key={index} page={p} />;
      })}
    </Page_main_container>
  );
};
