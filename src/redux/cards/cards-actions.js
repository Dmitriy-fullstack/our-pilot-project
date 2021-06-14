import { createAction } from '@reduxjs/toolkit';

const addCardRequest = createAction('cards/addCardRequest');
const addCardSuccess = createAction('cards/addCardSuccess');
const addCardError = createAction('cards/addCardError');

const editCardRequest = createAction('cards/editCardRequest');
const editCardSuccess = createAction('cards/editCardSuccess');
const editCardError = createAction('cards/editCardError');

const deleteCardRequest = createAction('cards/deleteCardRequest');
const deleteCardSuccess = createAction('cards/deleteCardSuccess');
const deleteCardError = createAction('cards/deleteCardError');

const completeCardRequest = createAction('cards/completeCardRequest');
const completeCardSuccess = createAction('cards/completeCardSuccess');
const completeCardError = createAction('cards/completeCardError');

const getAllCardsRequest = createAction('cards/getAllCardsRequest');
const getAllCardsSuccess = createAction('cards/getAllCardsSuccess');
const getAllCardsError = createAction('cards/getAllCardsError');

const setCurrentCardId = createAction('cards/setCurrentCardId');

const moveToCompletedSuccess = createAction('cards/moveToCompletedSuccess');

const cardsActions = {
  addCardRequest,
  addCardSuccess,
  addCardError,
  editCardRequest,
  editCardSuccess,
  editCardError,
  deleteCardRequest,
  deleteCardSuccess,
  deleteCardError,
  getAllCardsRequest,
  getAllCardsSuccess,
  getAllCardsError,
  setCurrentCardId,
  completeCardRequest,
  completeCardSuccess,
  completeCardError,
  moveToCompletedSuccess,
}

export default cardsActions;