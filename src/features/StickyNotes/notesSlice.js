import { createSlice } from "@reduxjs/toolkit";

// SLICE

const notesSlice = createSlice({
  name: "notes",
  initialState: [],
  reducers: {
    addNewNote(state, action) {
      state.push(action.payload);
    },
    saveNote(state, action) {
      console.log("Note saved");
      const { id: noteId } = action.payload;
      const whereIdMatches = (note) => note.id === noteId;
      const matchingNoteIndex = state.findIndex(whereIdMatches);
      const foundNote = state[matchingNoteIndex];
      state[matchingNoteIndex] = {
        ...foundNote,
        ...action.payload
      };
    },
    deleteNote(state, action) {
      console.log("Note deleted");
      const noteId = action.payload;
      return state.filter((note) => note.id !== noteId);
    },
    bringNoteToTop(state, action) {
      const noteId = action.payload;
      const whereIdMatches = (note) => note.id === noteId;
      const selectedNoteIndex = state.findIndex(whereIdMatches);
      const selectedNote = state.splice(selectedNoteIndex, 1)[0];
      state.push(selectedNote);
    },
    replaceAllNotes(state, action) {
      return action.payload;
    }
  }
});

// ACTIONS

const {
  addNewNote,
  saveNote,
  deleteNote,
  bringNoteToTop,
  replaceAllNotes
} = notesSlice.actions;

function createNote(newNoteOptions) {
  return (dispatch) => {
    const defaultStyles = {
      transform: `translate(50%, 50%)`
    };

    const newNoteStyles = newNoteOptions?.styles || defaultStyles;

    const newNote = {
      id: Math.random(),
      content: "",
      styles: newNoteStyles
    };

    dispatch(addNewNote(newNote));
  };
}

function getNotesFromLocalStorage() {
  return (dispatch) => {
    const persistedNotes = JSON.parse(
      localStorage.getItem("stickyNotesAppNotes")
    );
    if (!persistedNotes) return;
    dispatch(replaceAllNotes(persistedNotes));
  };
}

// LISTENER MIDDLEWARE EFFECT (for localStorage persistence)

function persistNotesToLocalStorageEffect(action, listenerAPI) {
  const notesState = listenerAPI.getState().notes;
  localStorage.setItem("stickyNotesAppNotes", JSON.stringify(notesState));
}

export default notesSlice.reducer;
export {
  addNewNote,
  saveNote,
  deleteNote,
  bringNoteToTop,
  createNote,
  getNotesFromLocalStorage,
  persistNotesToLocalStorageEffect
};
