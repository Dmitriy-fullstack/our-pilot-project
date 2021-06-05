import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./Main.module.scss";

const Main = () => {
  return (
    <ul>
      <li className={styles.link}>
        <NavLink to="/registration">Registration</NavLink>
      </li>
      <li>
        <NavLink to="/authorization">Authorization</NavLink>
      </li>
    </ul>
  );
};

export default Main;
