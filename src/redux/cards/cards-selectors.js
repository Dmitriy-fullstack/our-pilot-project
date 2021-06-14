import { createSelector } from "@reduxjs/toolkit";

import dateTime from '../../utils/date-time';
import { cardStatus } from '../../utils/card-constants';

const getCurrentCardId = state => state.cards.currentCardId;

const getLoading = state => state.cards.loading;

const getAllCards = state => state.cards.items;

const getTodayCards = createSelector([getAllCards], (cards) => {
  return cards
    .filter(({ date, status, notMoved }) => new Date(dateTime.currentDate) >= new Date(date) && (status === cardStatus.INCOMPLETE || (status === cardStatus.COMPLETE && notMoved)))
    .sort((a, b) => new Date(`${a?.date} ${a?.time}`) - new Date(`${b?.date} ${b?.time}`))
})
// const getTodayCards = state => 
//   state.cards.items
//     .filter(({ date, status, notMoved }) => new Date(dateTime.currentDate) >= new Date(date) && (status === cardStatus.INCOMPLETE || (status === cardStatus.COMPLETE && notMoved)))
//     .sort((a, b) => new Date(`${a?.date} ${a?.time}`) - new Date(`${b?.date} ${b?.time}`))

const getTomorrowCards = createSelector([getAllCards], (cards) => {
  return cards
    .filter(({ date, status, notMoved }) => new Date(dateTime.currentDate) < new Date(date) && new Date(dateTime.tomorrow) >= new Date(date) && (status === cardStatus.INCOMPLETE || (status === cardStatus.COMPLETE && notMoved)))
    .sort((a, b) => new Date(`${a?.date} ${a?.time}`) - new Date(`${b?.date} ${b?.time}`))
})

const getOtherCards = createSelector([getAllCards], (cards) => {
  return cards
    .filter(({ date, status, notMoved }) => new Date(dateTime.tomorrow) < new Date(date) && (status === cardStatus.INCOMPLETE || (status === cardStatus.COMPLETE && notMoved)))
    .sort((a, b) => new Date(`${a?.date} ${a?.time}`) - new Date(`${b?.date} ${b?.time}`))
})

const getCompletedCards = createSelector([getAllCards], (cards) => {
  return cards
    .filter(({ status, notMoved }) => status === cardStatus.COMPLETE && !notMoved)
    .sort((a, b) => new Date(`${a?.date} ${a?.time}`) - new Date(`${b?.date} ${b?.time}`))
})
  
const cardsSelectors = {
  getAllCards,
  getCurrentCardId,
  getLoading,
  getTodayCards,
  getTomorrowCards,
  getOtherCards,
  getCompletedCards,
};

export default cardsSelectors;