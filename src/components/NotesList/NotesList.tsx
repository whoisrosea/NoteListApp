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
import { Modal, TextField, IconButton } from "@mui/material";
import { useInput } from "../../hooks/useInput";

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
  const notes: State["notes"] = useSelector((state: State) => state.notes);
  const [visibility, setVisibility] = useState(false);
  const input = useInput("");
  const deleteHandler = (deletenote: Notes) => {
    deletenote.tags?.forEach((tagToDelete) => {
      const isTagUsedInOtherNotes = notes.some(
        (note) => note.id !== deletenote.id && note.tags.includes(tagToDelete)
      );
      if (!isTagUsedInOtherNotes) {
        dispatch(deletetagAction({ tag: tagToDelete }));
      }
    });
    dispatch(deleteNoteAction(deletenote));
  };

  return (
    <Grid justifyContent={"center"} container>
      {notes.map((note) => (
        <Grid
          justifyContent={"space-around"}
          alignItems={"center"}
          container
          key={note.id}
          boxShadow="0px 5px 10px 2px rgba(34, 60, 80, 0.1)"
          display={note.visibility ? "flex" : "none"}
          direction={"row"}
          width={600}
          padding={2}
          margin={2}
        >
          <Grid item>note: {note.title}</Grid>
          {note.tags.length > 0 && (
            <Grid display={"flex"} direction={"row"} item>
              tags:{" "}
              {note.tags.map((tag, index) => (
                <Grid item key={index}>
                  {tag}
                </Grid>
              ))}
            </Grid>
          )}

          <Grid item>
            <IconButton
              onClick={() => {
                input.setValue(note.title);
                setVisibility(true);
              }}
            >
              <EditIcon color="primary" />
            </IconButton>
            <IconButton onClick={() => deleteHandler(note)}>
              <DeleteIcon color="primary" />
            </IconButton>
          </Grid>

          <Modal
            open={visibility}
            onClose={() => {
              input.setValue("");
              setVisibility(false);
            }}
          >
            <Grid container sx={style}>
              <TextField
                id="standard-basic"
                variant="standard"
                value={input.value}
                placeholder="Enter edit note"
                onChange={(e) => input.onChange(e)}
              />
              <Button
                disabled={input.error}
                onClick={() => {
                  setVisibility(false);
                  dispatch(
                    editNoteAction({
                      id: note.id,
                      editInput: input.value,
                      inputTags: input.tags,
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
