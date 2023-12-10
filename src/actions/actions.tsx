import { Notes } from "../interfaces";

export const addNoteAction = (payload: Notes) => ({
  type: "ADD_NOTE",
  payload,
});

export const deleteNoteAction = (payload: { id: string }) => ({
  type: "DELETE_NOTE",
  payload,
});

export const editNoteAction = (payload: {
  id: string;
  editInput: string;
  inputTags: string[];
  noteTags?: string[];
}) => ({
  type: "EDIT_NOTE",
  payload,
});

export const tagSortAction = (payload: string[]) => ({
  type: "SORT_NOTE",
  payload,
});

export const showAllNotesAction = () => ({
  type: "SHOW_ALL_NOTES",
});

export const deletetagAction = (payload: { tag: string }) => ({
  type: "DELETE_TAG",
  payload,
});