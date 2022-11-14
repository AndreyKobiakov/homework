import { StrictMode } from "react";
import ReactDOM from "react-dom";

import UserList from "./UserList";
import API from "./API";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <UserList getUsers={API.getUsers} />
  </StrictMode>,
  rootElement
);
