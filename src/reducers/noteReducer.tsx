import { Notes, State, TagsVisibility } from "../interfaces";

type Action =
  | { type: "ADD_NOTE"; payload: Notes }
  | { type: "DELETE_NOTE"; payload: { id: string } }
  | {
      type: "EDIT_NOTE";
      payload: {
        id: string;
        editInput: string;
        inputTags: string[];
        noteTags?: string[];
      };
    }
  | { type: "SORT_NOTE"; payload: string[] }
  | { type: "SHOW_ALL_NOTES" }
  | { type: "DELETE_TAG"; payload: { tag: string } };

const defaultState: State = {
  notes: [],
  tagsVisibility: {},
};

const saveStateToLocalStorage = (state: State): void => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("appState", serializedState);
  } catch (err) {
    console.error("Error saving state to localStorage:", err);
  }
};

const loadStateFromLocalStorage = (): State | undefined => {
  try {
    const serializedState = localStorage.getItem("appState");
    return serializedState
      ? JSON.parse(serializedState)
      : { notes: [], tagsVisibility: {} };
  } catch (err) {
    console.error("Error loading state from localStorage:", err);
    return undefined;
  }
};

// Инициализация состояния из localStorage, если оно там есть
const initialState: State = loadStateFromLocalStorage() || defaultState;

export const noteReducer = (
  state: State = initialState,
  action: Action
): State => {
  switch (action.type) {
    case "ADD_NOTE":
      const newTagsVisibility = action.payload.tags?.reduce((acc, tag) => {
        acc[tag] = true;
        return acc;
      }, {} as TagsVisibility);

      const newStateAddnote: State = {
        ...state,
        notes: [...state.notes, action.payload],
        tagsVisibility: {
          ...state.tagsVisibility,
          ...newTagsVisibility,
        },
      };
      saveStateToLocalStorage(newStateAddnote);
      return newStateAddnote;

    case "DELETE_TAG":
      const deleteTags = { ...state.tagsVisibility };
      delete deleteTags[action.payload.tag];

      const newStateDeleteTag: State = {
        ...state,
        tagsVisibility: deleteTags,
      };

      saveStateToLocalStorage(newStateDeleteTag);
      return newStateDeleteTag;

    case "DELETE_NOTE":
      const newStateDeleteNote: State = {
        ...state,
        notes: state.notes.filter((note) => note.id !== action.payload.id),
      };
      saveStateToLocalStorage(newStateDeleteNote);
      return newStateDeleteNote;

    case "EDIT_NOTE":
      const editTags: TagsVisibility = { ...state.tagsVisibility };

      action.payload.noteTags?.forEach((tag) => delete editTags[tag]);

      action.payload.inputTags.forEach((tag) => (editTags[tag] = true));

      const newStateEditNote: State = {
        ...state,
        notes: state.notes.map((note) => {
          if (note.id === action.payload.id) {
            return {
              ...note,
              title: action.payload.editInput,
              tags: action.payload.inputTags,
            };
          } else {
            return note;
          }
        }),
        tagsVisibility: editTags,
      };
      saveStateToLocalStorage(newStateEditNote);
      return newStateEditNote;

    case "SORT_NOTE":
      const updatedTagVisibility: TagsVisibility = { ...state.tagsVisibility };

      Object.keys(updatedTagVisibility).forEach((tag) => {
        updatedTagVisibility[tag] = action.payload.includes(tag);
      });

      const newStateSortNote: State = {
        ...state,
        tagsVisibility: updatedTagVisibility,
        notes: state.notes.map((note) => {
          const isVisible = note.tags.some((tag) => updatedTagVisibility[tag]);
          return { ...note, visibility: isVisible };
        }),
      };
      saveStateToLocalStorage(newStateSortNote);
      return newStateSortNote;

    case "SHOW_ALL_NOTES":
      const updatedNote: Notes[] = state.notes.map((note) => ({
        ...note,
        visibility: true,
      }));

      const allTagsTrue: TagsVisibility = { ...state.tagsVisibility };

      Object.keys(allTagsTrue).forEach((tag) => {
        allTagsTrue[tag] = true;
      });

      const newStateShowAllNotes: State = {
        ...state,
        notes: updatedNote,
        tagsVisibility: { ...allTagsTrue }, // Сброс состояния видимости тегов
      };
      saveStateToLocalStorage(newStateShowAllNotes);
      return newStateShowAllNotes;

    default:
      return state;
  }
};
