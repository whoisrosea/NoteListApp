const defaultState = {
  note: [],
  tagsVisibility: {},
};

const ADD_NOTE = "ADD_NOTE";
const DELETE_NOTE = "DELETE_NOTE";
const EDIT_NOTE = "EDIT_NOTE";
const SORT_NOTE = "SORT_NOTE";
const SHOW_ALL_NOTES = "SHOW_ALL_NOTES";
const DELETE_TAG = "DELETE_TAG";

export const noteReducer = (state = defaultState, action) => {
  switch (action.type) {
    case ADD_NOTE:
      const newTagsVisibility = action.payload.tags?.reduce((acc, tag) => {
        acc[tag] = true;
        return acc;
      }, {});

      return {
        ...state,
        note: [...state.note, action.payload],
        tagsVisibility: {
          ...state.tagsVisibility,
          ...newTagsVisibility,
        },
      };

      case DELETE_TAG:
        const deleteTags = { ...state.tagsVisibility };
        delete deleteTags[action.payload.tag];
      
        return {
          ...state,
          tagsVisibility: deleteTags,
        };
      

    case DELETE_NOTE:
      return {
        ...state,
        note: state.note.filter((note) => note.id !== action.payload.id),
        
      };


    case EDIT_NOTE:
      const editTags = { ...state.tagsVisibility };
      console.log(action.payload.noteTags);

      action.payload.noteTags?.forEach(tag => delete editTags[tag])
      // console.log(editTags);
      
      action.payload.inputTags.forEach(tag => editTags[tag] = true)
      console.log(editTags);
      return {
        ...state,
        note: state.note.map((note) => {
          if (note.id === action.payload.id) {
            return { ...note, title: action.payload.editInput, tags: action.payload.inputTags };
          } else {
            return note;
          }
        }),
        tagsVisibility: editTags
      };
    case SORT_NOTE:
      // Обновление состояний видимости тегов и фильтрация массива заметок
      const updatedTagVisibility = { ...state.tagsVisibility };
      console.log(updatedTagVisibility);
      Object.keys(updatedTagVisibility).forEach((tag) => {
        updatedTagVisibility[tag] = action.payload.includes(tag);
      });
      console.log(updatedTagVisibility);
      return {
        ...state,
        tagsVisibility: updatedTagVisibility,
        note: state.note.map((note) => {
          // Проверка видимости каждой заметки в зависимости от состояний видимости тегов
          const isVisible = note.tags.some((tag) => updatedTagVisibility[tag]);
          console.log(note)
          return { ...note, visibility: isVisible };
        }),
      };
    case SHOW_ALL_NOTES:
      const updatedNote = state.note.map((note) => ({
        ...note,
        visibility: true,
      }));

      const allTagsTrue = { ...state.tagsVisibility };

      Object.keys(allTagsTrue).forEach((tag) => {
        allTagsTrue[tag] = true;
      });
      return {
        ...state,
        note: updatedNote,
        tagsVisibility: { ...allTagsTrue }, // Сброс состояния видимости тегов
      };
    default:
      return state;
  }
};

export const addNoteAction = (payload) => ({ type: ADD_NOTE, payload });
export const deleteNoteAction = (payload) => ({ type: DELETE_NOTE, payload });
export const editNoteAction = (payload) => ({ type: EDIT_NOTE, payload });
export const tagSortAction = (payload) => ({ type: SORT_NOTE, payload });
export const showAllNotesAction = (payload) => ({
  type: SHOW_ALL_NOTES,
  payload,
});
export const deletetagAction = (payload) => ({type:DELETE_TAG, payload})
