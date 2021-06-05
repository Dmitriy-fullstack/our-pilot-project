import { combineReducers, configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER
} from "redux-persist";

import {
  authReducer,
  globalReducer,
  cardsReducer,
} from '.';

const authPersistConfig = {
  key: 'token',
  storage,
  whitelist: ['accessToken', 'refreshToken']
}


const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
  cards: cardsReducer,
  global: globalReducer
})

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV === 'development',
  middleware: getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
    }
  }),
});

const persistor = persistStore(store);

export  { store, persistor };
