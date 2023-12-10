import React, { useState } from "react";
import "./App.css";
import AddNoteForm from "./components/AddNoteForm/AddNoteForm";
import NotesList from "./components/NotesList/NotesList";
import TagSelector from "./components/TagSelector/TagSelector";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { useSelector } from "react-redux";
import { Notes } from "./interfaces";
import { Modal, Grid, Box } from "@mui/material";

function App() {
  const [open, setOpen] = useState(false);
  const notes = useSelector((state: any) => state.notes);
  console.log("NOTES", notes);

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
    <Grid container display={"flex"} direction={"column"} alignItems={"center"}>
      <Grid item>
        {notes.length ? <TagSelector /> : <h1>add some notes...</h1>}
      </Grid>
      <Grid item>
        <NotesList />
      </Grid>
      <Grid item>
        <AddCircleOutlineIcon
          className="PlusIcon"
          sx={{ fontSize: 100 }}
          color="primary"
          onClick={() => setOpen(true)}
        />
      </Grid>
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box sx={style}>
          <AddNoteForm setOpen={setOpen} />
        </Box>
      </Modal>
    </Grid>
  );
}

export default App;
