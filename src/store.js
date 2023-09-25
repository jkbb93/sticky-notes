import { configureStore } from "@reduxjs/toolkit";
import notesListenerMiddleware from "./features/StickyNotes/notesListenerMiddleware";
import notesSlice, {
  getNotesFromLocalStorage
} from "./features/StickyNotes/notesSlice";

const store = configureStore({
  reducer: {
    notes: notesSlice
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(notesListenerMiddleware)
});

// Retrieve notes from localStorage on start-up
store.dispatch(getNotesFromLocalStorage());

export default store;
