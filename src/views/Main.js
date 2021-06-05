import React from "react";
import { NavLink } from "react-router-dom";

const Main = () => {
  return (
    <ul>
      <li>
        <NavLink to="/registration">Registration</NavLink>
      </li>
      <li>
        <NavLink to="/authorization">Authorization</NavLink>
      </li>
    </ul>
  );
};

export default Main;
