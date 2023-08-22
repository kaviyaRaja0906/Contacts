// store.js
import { configureStore } from '@reduxjs/toolkit';
import contactsReducer from './reducers/contactsReducer';

const store = configureStore({
  reducer: {
    contacts: contactsReducer,
  },
});

export default store;
