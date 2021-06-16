import { createReducer } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';

import { authActions } from '../';

const inicialUserState = { email: null, sid: null };

const user = createReducer(inicialUserState, {
  [authActions.loginSuccess]: (_, { payload }) => ({email: payload.userData.email, sid: payload.sid}),
  [authActions.logoutSuccess]: () => inicialUserState,
})

const isAuthenticated = createReducer(false, {
  [authActions.loginSuccess]: () => true,
  [authActions.validUserSuccess]: () => true,
  [authActions.loginError]: () => false,
  [authActions.logoutError]: () => false,
  [authActions.logoutSuccess]: () => false,
  [authActions.validUserError]: () => false,
})


const accessToken = createReducer(null, {
  [authActions.loginSuccess]: (_, { payload }) => payload.accessToken,
  [authActions.logoutSuccess]: () => null,
  [authActions.validUserError]: () => null,
})

const refreshToken = createReducer(null, {
  [authActions.loginSuccess]: (_, { payload }) => payload.refreshToken,
  [authActions.logoutSuccess]: () => null,
  [authActions.validUserError]: () => null,
})

const error = createReducer(null, {
  [authActions.loginError]: (_, error) => error,
  [authActions.logoutError]: (_, error) => error,
})

const authReducer = combineReducers({
  user,
  isAuthenticated,
  accessToken,
  refreshToken,
  error,
})


export default authReducer;