import { createListenerMiddleware, isAnyOf } from "@reduxjs/toolkit";
import {
  addNewNote,
  saveNote,
  deleteNote,
  bringNoteToTop,
  persistNotesToLocalStorageEffect
} from "./notesSlice";

const notesListenerMiddleware = createListenerMiddleware();

notesListenerMiddleware.startListening({
  matcher: isAnyOf(addNewNote, saveNote, deleteNote, bringNoteToTop),
  effect: persistNotesToLocalStorageEffect
});

export default notesListenerMiddleware.middleware;
