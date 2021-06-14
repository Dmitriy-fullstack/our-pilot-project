import axios from "axios";

import { authActions, cardsActions, globalActions } from "../";

axios.defaults.baseURL = "https://questify-backend.goit.global/";

const token = {
  set(token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  },
  unset() {
    axios.defaults.headers.common.Authorization = "";
  },
};

const register = (credentials) => async (dispatch) => {
  dispatch(authActions.registerRequest());

  try {
    const { data } = await axios.post("/auth/register", credentials);
    dispatch(login(credentials));
    dispatch(authActions.registerSuccess(data));
  } catch (error) {
    if (error.response?.status === 409) {
      dispatch(login(credentials));
      return;
    }
    dispatch(authActions.registerError(error.message));
    dispatch(globalActions.createNotificationText("Registration error"));
  }
};

const login = (user) => async (dispatch) => {
  dispatch(authActions.loginRequest());

  try {
    const { data } = await axios.post("/auth/login", user);
    token.set(data.accessToken);
    dispatch(cardsActions.getAllCardsSuccess(data.userData.cards));
    dispatch(authActions.loginSuccess(data));
  } catch (error) {
    dispatch(authActions.loginError(error.message));
    dispatch(globalActions.createNotificationText(error.response.data.message));
  }
};

const logout = () => async (dispatch) => {
  dispatch(authActions.logoutRequest());

  try {
    await axios.post("/auth/logout");
    token.unset();
    dispatch(authActions.logoutSuccess(null));
  } catch (error) {
    dispatch(authActions.logoutError(error.message));
  }
};

const authOperations = {
  register,
  login,
  logout,
};

export default authOperations;
