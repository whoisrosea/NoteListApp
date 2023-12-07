import { createStore, combineReducers } from "redux";
import { tagsReducer } from "./tagsReducer";
import {noteReducer} from "./noteReducer"
// import { composeWithDevTools } from "redux-devtools-extension";



const rootReducer = combineReducers(
  {
    tags: tagsReducer,
    note: noteReducer
  }
)

export const store = createStore(rootReducer)
