import { createReducer } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';

import authActions from './auth-actions';

const inicialUserState = { email: null, sid: null };

const user = createReducer(inicialUserState, {
  [authActions.loginSuccess]: (_, { payload }) => ({email: payload.userData.email, sid: payload.sid}),
  [authActions.logoutSuccess]: () => inicialUserState,
})

const isAuthenticated = createReducer(false, {
  [authActions.loginSuccess]: () => true,
  [authActions.loginError]: () => false,
  [authActions.logoutError]: () => false,
  [authActions.logoutSuccess]: () => false,
})


const accessToken = createReducer(null, {
  [authActions.loginSuccess]: (_, { payload }) => payload.accessToken,
  [authActions.logoutSuccess]: () => null,
})

const refreshToken = createReducer(null, {
  [authActions.loginSuccess]: (_, { payload }) => payload.refreshToken,
  [authActions.logoutSuccess]: () => null,
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