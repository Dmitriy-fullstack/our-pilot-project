// import { createSelector } from '@reduxjs/toolkit';

// const getCurrentCardId = state => state.cards.currentCardId;

const getLoading = state => state.cards.loading;

const getAllCards = state => state.cards.items;
  
const cardsSelectors = {
  getAllCards,
  // getCurrentCardId,
  getLoading,
};

export default cardsSelectors;