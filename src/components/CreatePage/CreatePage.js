import { useEffect, useState } from "react";
import styles from "./styles.module.css";
import { MdClose } from "react-icons/md";
import { uuid } from "../../shared";
import { useHistory, useParams, useLocation } from "react-router-dom";
import { fb } from "../../shared/service";
import { useAuth } from "../../hooks";

//#region -----> All Applied Styles & Imports

import styled from "styled-components";

const Create_page_main_container = styled.div`
  background: linear-gradient(
    to top right,
    rgba(0, 102, 255, 0.5) 0%,
    rgba(102, 0, 204, 0.5) 100%
  );

  height: 60%;
  min-height: 500px;
  width: 30%;
  border-radius: 15px;
  display: flex;
  flex-wrap: wrap;
  align-content: space-around;
  justify-content: center;
  box-shadow: 2px 2px 10px 10px rgba(0, 0, 0, 0.2);
  padding: 0 3rem;

  input {
    padding: 0.5rem;
    width: 100%;

    background: rgba(0, 0, 0, 0.075);
    border-radius: 15px;
    border: 2px solid white;
    color: white;
    outline: none;
  }

  .input_link_name_container {
    width: 100%;

    input {
      width: 100%;
    }

    .current_link_name_input {
      margin-bottom: 2.25rem;
    }

    .position_wrapper {
      position: relative;

      button {
        height: 100%;
        position: absolute;
        top: 0;
        right: 3%;
        background: transparent;
        border: none;
        color: white;
        cursor: pointer;
        z-index: 100;
      }
    }
  }

  .button_container {
    width: 100%;
    display: flex;
    justify-content: space-between;

    button {
      border-radius: 15px;
      padding: 0.5rem 1.25rem;
      background: transparent;
      color: white;
      font-size: 0.95rem;
      letter-spacing: 0.075rem;
      transition: background 0.3s ease;
      cursor: pointer;
    }

    .create_update_button {
      border: 2px solid #01b601;

      &:hover {
        background: #01b601;
      }
    }
  }
  .button_cancel {
    border: 2px solid #ff3e3e;

    &:hover {
      background: #ff3e3e;
    }
  }

  @media (max-width: 1200px) {
    min-width: 400px;
  }
`;

//#endregion

export const CreatePage = () => {
  //#region ---> Logic

  const history = useHistory();

  const { authUser } = useAuth();

  const { id } = useParams();
  const location = useLocation();

  const [isEdit, setIsEdit] = useState();
  const [pageName, setPageName] = useState("");
  const [pageLinks, setPageLinks] = useState([]);
  const [currentLink, setCurrentLink] = useState({
    value: "",
    name: "",
    id: "",
  });

  useEffect(() => {
    if (id && location.pathname.includes("/edit-page")) {
      setIsEdit(true);
      fb.firestore
        .collection("linkPages")
        .doc(id)
        .get()
        .then((res) => {
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
        .collection("linkPages")
        .add({
          userId: authUser.uid,
          links: pageLinks,
          name: pageName,
        })
        .then(() => {
          history.push("/");
        });
    }
  };

  const updatePage = () => {
    if (id && authUser && pageName && pageLinks.length) {
      fb.firestore
        .collection("linkPages")
        .doc(id)
        .update({
          links: pageLinks,
          name: pageName,
        })
        .then(() => {
          history.push("/");
        });
    }
  };

  //#endregion

  return typeof isEdit === "boolean" ? (
    <Create_page_main_container>
      <h2>Create Page</h2>
      <input
        placeholder="Page Name"
        value={pageName}
        onChange={(e) => setPageName(e.target.value)}
        className="name_input"
      />

      {pageLinks.map((l, index) => {
        return (
          <div key={index} className={styles.link}>
            <div className={styles.linkName}>{l.name}</div>
            <div className={styles.linkValue}>{l.value}</div>

            <div
              className="delete_div"
              onClick={() =>
                setPageLinks(pageLinks.filter((pl) => pl.id !== l.id))
              }
            >
              <MdClose />
            </div>
          </div>
        );
      })}

      <div className="input_link_name_container">
        <input
          placeholder="Link Name"
          value={currentLink.name}
          onChange={(e) =>
            setCurrentLink({ ...currentLink, name: e.target.value })
          }
          className="current_link_name_input"
        />

        <div className="position_wrapper">
          <input
            placeholder="Link URL"
            value={currentLink.value}
            onChange={(e) =>
              setCurrentLink({ ...currentLink, value: e.target.value })
            }
            className="current_link_input"
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
              setCurrentLink({ value: "", name: "", id: "" });
            }}
            disabled={!currentLink.name || !currentLink.value}
            className="add_button"
          >
            Add
          </button>
        </div>
      </div>

      <div className="button_container">
        <button
          onClick={isEdit ? updatePage : createPage}
          disabled={!pageLinks.length || !pageName}
          className="create_update_button"
        >
          {!isEdit ? "Create" : "Update"}
        </button>

        <button className="button_cancel" onClick={() => history.push("/")}>
          Cancel
        </button>
      </div>
    </Create_page_main_container>
  ) : (
    <></>
  );
};
