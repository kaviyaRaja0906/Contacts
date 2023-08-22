// reducers/contactsReducer.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  contacts: [],
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    addContact: (state, action) => {
      state.contacts.push(action.payload);
    },
    editContact: (state, action) => {
      const { id, updatedContact } = action.payload;
      const index = state.contacts.findIndex(contact => contact.id === id);
      if (index !== -1) {
        state.contacts[index] = updatedContact;
      }
    },
    deleteContact: (state, action) => {
      const id = action.payload;
      state.contacts = state.contacts.filter(contact => contact.id !== id);
    },
  },
});

export const { addContact, editContact, deleteContact } = contactsSlice.actions;
export default contactsSlice.reducer;
