import axios from 'axios';

import { cardsActions, authActions } from '../';

const addCard = (newCard) => async dispatch => {
  
  dispatch(cardsActions.addCardRequest());

  try {
    const { data: { card } } = await axios.post('/card', { ...newCard });

    dispatch(cardsActions.addCardSuccess(card))
  } catch (error) {
    dispatch(cardsActions.addCardError(error.message));
  }
};

// -------------------------------------------------------

const editCard = ({ cardId, cardsFields }) => async dispatch => {
  dispatch(cardsActions.editCardRequest());

  try {
    const { data: { card } } = await axios.patch(`/card/${cardId}`, { ...cardsFields });

    dispatch(cardsActions.editCardSuccess(card))
  } catch (error) {
    dispatch(cardsActions.editCardError(error.message));
  }
};

// -------------------------------------------------------

const deleteCard = ({ cardId }) => async dispatch => {
  dispatch(cardsActions.deleteCardRequest());

  try {
    await axios.delete(`/card/${cardId}`);

    dispatch(cardsActions.deleteCardSuccess(cardId))
  } catch (error) {
    dispatch(cardsActions.deleteCardError(error.message));
  }
};

// -------------------------------------------------------

const completeCard = ({ cardId }) => async dispatch => {
  dispatch(cardsActions.completeCardRequest());

  try {
    const { data: { card } } = await axios.patch(`/card/${cardId}/complete`);

    dispatch(cardsActions.editCardSuccess(card))
  } catch (error) {
    dispatch(cardsActions.completeCardError(error.message));
  }
};

// -------------------------------------------------------

const getAllCards = () => async dispatch => {
  dispatch(cardsActions.getAllCardsRequest());

  try {
    const { data: { card } } = await axios.get(`/card`);

    dispatch(authActions.validUserSuccess());
    dispatch(cardsActions.getAllCardsSuccess(card))
  } catch (error) {
    dispatch(authActions.validUserError());
    dispatch(cardsActions.getAllCardsError(error.message));
  }
};

const cardsOperations = {
  addCard,
  editCard,
  deleteCard,
  completeCard,
  getAllCards,
}

export default cardsOperations;

