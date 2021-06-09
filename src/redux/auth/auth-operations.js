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
    // console.log('error.response.status', error.response.status);
    // if (error.response.status === 409) {
    //   dispatch(login(credentials));
    //   return;
    // }
    dispatch(authActions.registerError(error.message));
    dispatch(globalActions.createNotificationText("Registration error"));
  }
};

const login = (user) => async (dispatch) => {
  dispatch(authActions.loginRequest());

  try {
    const { data } = await axios.post("/auth/login", user);
    console.log("data", data);
    token.set(data.accessToken);
    dispatch(cardsActions.getAllCardsSuccess(data.userData));
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

// const getCurrentUser = () => async (dispatch, getState) => {
//   const {
//     auth: { token: persistedToken },
//   } = getState();

//   if (!persistedToken) {
//     return;
//   }

//   token.set(persistedToken);

//   dispatch(authActions.getCurrentUserRequest());

//   try {
//     const { data } = await axios.get('/auth/current');
//     dispatch(authActions.getCurrentauthuccess(data));
//   } catch (error) {
//     dispatch(authActions.getCurrentUserError(error.message))
//   }
// }

const authOperations = {
  register,
  login,
  logout,
  // getCurrentUser
};

export default authOperations;
