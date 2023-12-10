import { Button, Grid, TextField } from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addNoteAction } from "../../actions/actions";

const AddNoteForm = ({ setOpen }) => {
  const [inputValue, setInputValue] = useState("");
  const [inputTags, setInputTags] = useState<string[]>([]);
  const tagRegex = /#(\w+)/g;

  const inputHandler = (e) => {
    setInputValue(e.target.value);
    setInputTags(e.target.value.match(tagRegex) || []);
  };

  const dispatch = useDispatch();

  const addHandler = () => {
    const id = Date.now().toString();
    dispatch(
      addNoteAction({
        title: inputValue,
        id,
        tags: inputTags,
        visibility: true,
      })
    );
    setInputValue("");
    setOpen(false);
  };

  return (
    <>
      <Grid container direction={"column"} alignItems={"center"} gap={"25px"}>
        <Grid item>
          <TextField
            placeholder="Enter your note"
            value={inputValue}
            onChange={inputHandler}
            id="standard-basic"
            variant="standard"
          />
        </Grid>
        <Grid item>
          <Button variant="contained" onClick={addHandler}>
            Create
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default AddNoteForm;
