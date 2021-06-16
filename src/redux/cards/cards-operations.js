import axios from 'axios';

import { cardsActions, authActions } from '../';

axios.defaults.baseURL = 'https://questify-backend.goit.global/'

const token = {
  set(token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  },
  unset() {
    axios.defaults.headers.common.Authorization = '';
  }
}

const addCard = (newCard) => async dispatch => {
  
  dispatch(cardsActions.addCardRequest());

  try {
    const {data} = await axios.post('/card', { ...newCard });

    dispatch(cardsActions.setCurrentCardId(null));
    dispatch(cardsActions.addCardSuccess(data.createdCard));
  } catch (error) {
    dispatch(cardsActions.addCardError(error.message));
  }
};

// -------------------------------------------------------

const editCard = ({ cardId, cardsFields }) => async dispatch => {
  dispatch(cardsActions.editCardRequest());

  try {
    const {data} = await axios.patch(`/card/${cardId}`, { ...cardsFields });

    dispatch(cardsActions.setCurrentCardId(null));
    dispatch(cardsActions.editCardSuccess(data.editedCard))
  } catch (error) {
    dispatch(cardsActions.editCardError(error.message));
  }
};

// -------------------------------------------------------

const deleteCard = ({ cardId }) => async dispatch => {
  dispatch(cardsActions.deleteCardRequest());

  try {
    await axios.delete(`/card/${cardId}`);

    dispatch(cardsActions.setCurrentCardId(null));
    dispatch(cardsActions.deleteCardSuccess(cardId))
  } catch (error) {
    dispatch(cardsActions.deleteCardError(error.message));
  }
};

// -------------------------------------------------------

const completeCard = ({ cardId }) => async dispatch => {
  dispatch(cardsActions.completeCardRequest());

  try {
    const { data } = await axios.patch(`/card/complete/${cardId}`);

    const completedCard = {
      ...data.completedCard,
      notMoved: true,
    }

    dispatch(cardsActions.setCurrentCardId(null));
    dispatch(cardsActions.completeCardSuccess(completedCard))
  } catch (error) {
    dispatch(cardsActions.completeCardError(error.message));
  }
};

// -------------------------------------------------------

const moveToCompleted = ({ cardId }) => async dispatch => {
  dispatch(cardsActions.moveToCompletedSuccess(cardId))  
};

// -------------------------------------------------------

const getAllCards = () => async (dispatch, getState) => {
  const {
    auth: { accessToken: persistedToken },
  } = getState();

  if (!persistedToken) {
    return;
  }

  token.set(persistedToken);
  
  dispatch(cardsActions.getAllCardsRequest());

  try {
    const { data } = await axios.get(`/card`);

    dispatch(authActions.validUserSuccess());
    dispatch(cardsActions.getAllCardsSuccess(data.cards))
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
  moveToCompleted,
}

export default cardsOperations;

