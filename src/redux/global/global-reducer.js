import { combineReducers, createReducer } from '@reduxjs/toolkit';
import globalActions from './global-actions';

const notificationText = createReducer(null, {
  [globalActions.createNotificationText]: (_, { payload }) => payload,
  [globalActions.deleteNotificationText]: () => null,
})

const globalReducer = combineReducers({
  notificationText
})

export default globalReducer;