import React, { useState } from "react";
import AddNoteForm from "./components/AddNoteForm/AddNoteForm";
import NotesList from "./components/NotesList/NotesList";
import TagSelector from "./components/TagSelector/TagSelector";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { useSelector } from "react-redux";
import { Notes } from "./interfaces";
import { Modal, Grid, IconButton } from "@mui/material";

function App() {
  const [open, setOpen] = useState(false);
  const notes = useSelector((state: { notes: Notes[] }) => state.notes);

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

  return (
    <Grid container height="100vh" justifyContent="center" alignItems="center">
      <Grid
        container
        padding={"20px"}
        width={500}
        height={600}
        boxShadow="0px 5px 10px 2px rgba(34, 60, 80, 0.2)"
        display={"flex"}
        direction={"column"}
        alignItems={"center"}
      >
        <Grid item>
          {notes.length > 0 ? <TagSelector /> : <h1>add some notes...</h1>}
        </Grid>
        <Grid item flexGrow={1}>
          <NotesList />
        </Grid>
        <Grid item>
          <IconButton onClick={() => setOpen(true)}>
            <AddCircleOutlineIcon sx={{ fontSize: 100 }} color="primary" />
          </IconButton>
        </Grid>

        <Modal open={open} onClose={() => setOpen(false)}>
          <Grid sx={style}>
            <AddNoteForm setOpen={setOpen} />
          </Grid>
        </Modal>
      </Grid>
    </Grid>
  );
}

export default App;
