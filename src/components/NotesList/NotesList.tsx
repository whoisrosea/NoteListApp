import { Button, Grid } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteNoteAction,
  deletetagAction,
  editNoteAction,
} from "../../actions/actions";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Notes, State } from "../../interfaces";
import { Modal, TextField } from "@mui/material";


const NotesList = () => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "white",
    boxShadow: 24,
    p: 4,
    borderRadius: 3,
  };

  const dispatch = useDispatch();
  //TODO: use plural form
  //TODO: change variable naming
  const notes: State["notes"] = useSelector((state: State) => state.notes);
  const [visibility, setVisibility] = useState(false);
  const [editInput, setEditInput] = useState("");
  const [inputTags, setInputTags] = useState<string[]>([]);
  //TODO: make constants in separate file
  //retrieve tags from store
  const tagRegex = /#(\w+)/g;

  const editInputHandler = (e) => {
    setEditInput(e.target.value);
    setInputTags(e.target.value.match(tagRegex) || []);
  };

  const deleteHandler = (deletenote: Notes) => {
    deletenote.tags?.forEach((tagToDelete) => {
      const isTagUsedInOtherNotes = notes.some(
        (note) => note.id !== deletenote.id && note.tags.includes(tagToDelete)
      );

      // If the tag is not used in other notes, delete it
      if (!isTagUsedInOtherNotes) {
        //TODO: fix naming
        dispatch(deletetagAction({ tag: tagToDelete }));
      }
    });

    // Delete the note
    dispatch(deleteNoteAction(deletenote));
  };

  return (
    <Grid direction={"column"} justifyContent={"center"} container>
      {notes.map((note) => (
        //TODO: get rid of divs. use mui instead

        <Grid
          container
          key={note.id}
          border={"inset"}
          display={note.visibility ? "flex" : "none"}
          direction={"row"}
        >
          <Grid item>note: {note.title}</Grid>
          <Grid display={"flex"} direction={"row"} item>
            tags:{" "}
            {note.tags?.map((tag, index) => (
              <Grid item key={index}>
                {" "}
                {tag}
              </Grid>
            ))}
          </Grid>

          <Grid container>
            <EditIcon color="primary" onClick={() => setVisibility(true)} />

            <DeleteIcon color="primary" onClick={() => deleteHandler(note)} />
          </Grid>

          <Modal open={visibility} onClose={() => setVisibility(false)}>
            <Grid sx={style}>
              <TextField
                id="standard-basic"
                variant="standard"
                value={editInput}
                onChange={editInputHandler}
              ></TextField>
              <Button
                onClick={() => {
                  setVisibility(false);
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
            </Grid>
          </Modal>
        </Grid>
      ))}
    </Grid>
  );
};

export default NotesList;
