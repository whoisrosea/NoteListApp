import { Button } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteNoteAction,
  deletetagAction,
  editNoteAction,
} from "../../store/noteReducer";
import styles from "./NoteList.module.css";
import EditModal from "../EditModal/EditModal";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const NotesList = () => {
  const dispatch = useDispatch();
  const noteArr = useSelector((state) => state.note.note);
  const [visibility, setVisibility] = useState(false);
  const [editInput, setEditInput] = useState("");
  const [inputTags, setInputTags] = useState([]);
  const tagRegex = /#(\w+)/g;

  const editInputHandler = (e) => {
    setEditInput(e.target.value);
    setInputTags(e.target.value.match(tagRegex)); 
  };

  const deleteHandler = (deletenote) => {
    deletenote.tags?.forEach((tagToDelete) => {
      const isTagUsedInOtherNotes = noteArr.some(
        (note) => note.id !== deletenote.id && note.tags.includes(tagToDelete)
      );

      // Если тег не используется в других заметках, удаляем его
      if (!isTagUsedInOtherNotes) {
        dispatch(deletetagAction({ tag: tagToDelete }));
      }
    });

    // Удаляем заметку
    dispatch(deleteNoteAction(deletenote));
  };

  return (
    <>
      {noteArr.map((note) => {
        return (
          <>
            <div
              className={
                note.visibility
                  ? styles.NoteContainer
                  : `${styles.NoteContainer} ${styles.UnActive}`
              }
            >
              <div className={styles.NoteInfo}>
                <div>note: {note.title}</div>
                <div>
                  tags:
                  {note.tags?.map((tag) => (
                    <> {tag}</>
                  ))}
                </div>
              </div>
              <div>
                <EditIcon color="primary" onClick={() => setVisibility(true)}>edit</EditIcon>
                <DeleteIcon color="primary" onClick={() => deleteHandler(note)}>
                  Delete
                </DeleteIcon>
              </div>
            </div>
            <EditModal visible={visibility} setVisible={setVisibility}>
              <input value={editInput} onChange={editInputHandler} />
              <Button
                onClick={() => {
                  setVisibility(false);
                  // dispatch(deleteNoteAction(note.tags));
                  dispatch(
                    editNoteAction({
                      id: note.id,
                      editInput,
                      inputTags,
                      noteTags: note.tags,
                    })
                  );
                }}
              >
                Confirm
              </Button>
            </EditModal>
          </>
        );
      })}
    </>
  );
};

export default NotesList;
