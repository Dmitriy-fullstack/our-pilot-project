import { createAction } from "@reduxjs/toolkit";

const createNotificationText = createAction('global/createNotificationText');
const deleteNotificationText = createAction('global/deleteNotificationText');

const globalActions = {
  createNotificationText,
  deleteNotificationText,
}

export default globalActions;