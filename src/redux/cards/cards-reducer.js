import { createReducer } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';

import cardsActions from './cards-actions';

const cardsListReducer = createReducer([], {
  [cardsActions.getAllCardsSuccess]: (_, { payload }) => payload.map(card => ({...card, id: card._id})),
  [cardsActions.addCardSuccess]: (state, { payload }) => [...state, { ...payload, id: payload._id }],
  [cardsActions.editCardSuccess]: (state, { payload }) => [...state.filter(({ id }) => id !== payload._id), { ...payload, id: payload._id }],
  [cardsActions.completeCardSuccess]: (state, { payload }) => [...state.filter(({ id }) => id !== payload._id), { ...payload, id: payload._id }],
  [cardsActions.deleteCardSuccess]: (state, { payload }) => [...state.filter(({ id }) => id !== payload)],
  [cardsActions.moveToCompletedSuccess]: (state, { payload }) => [{...state.find(({_id}) => _id === payload), notMoved: false}, ...state.filter(({ _id }) => _id !== payload)],
})

const loading = createReducer(false, {
  [cardsActions.getAllCardRequest]: () => true,
  [cardsActions.getAllCardSuccess]: () => false,
  [cardsActions.getAllCardError]: () => false,

  [cardsActions.addCardRequest]: () => true,
  [cardsActions.addCardSuccess]: () => false,
  [cardsActions.addCardError]: () => false,

  [cardsActions.editCardRequest]: () => true,
  [cardsActions.editCardSuccess]: () => false,
  [cardsActions.editCardError]: () => false,

  [cardsActions.deleteCardRequest]: () => true,
  [cardsActions.deleteCardSuccess]: () => false,
  [cardsActions.deleteCardError]: () => false,

  [cardsActions.completeCardRequest]: () => true,
  [cardsActions.completeCardSuccess]: () => false,
  [cardsActions.completeCardError]: () => false,
})

const errorReducer = createReducer(null, {
  [cardsActions.getAllCardError]: (_, error) => error,
  [cardsActions.addCardError]: (_, error) => error,
  [cardsActions.editCardError]: (_, error) => error,
  [cardsActions.deleteCardError]: (_, error) => error,
  [cardsActions.completeCardError]: (_, error) => error,
})

const currentCardIdReducer = createReducer(null, {
  [cardsActions.setCurrentCardId]: (_, { payload }) => payload,
})

const cardsReducer = combineReducers({
  items: cardsListReducer,
  currentCardId: currentCardIdReducer,
  loading,
  error: errorReducer
})

export default cardsReducer;