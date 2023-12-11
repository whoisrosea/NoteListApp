import { Button, Grid, TextField } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { addNoteAction } from "../../actions/actions";
import { useInput } from "../../hooks/useInput";

const AddNoteForm = ({ setOpen }) => {
  const input = useInput("")

  const dispatch = useDispatch();

  const addHandler = () => {
    const id = Date.now().toString();
    dispatch(
      addNoteAction({
        title: input.value,
        id,
        tags: input.tags,
        visibility: true,
      })
    );
    setOpen(false);
  };

  return (
    <>
      <Grid container direction={"column"} alignItems={"center"} gap={"25px"}>
        <Grid item>
          <TextField
            placeholder="Enter your note"
            value={input.value}
            onChange={e => input.onChange(e)}
            id="standard-basic"
            variant="standard"
          />
        </Grid>
        <Grid item>
          <Button disabled={input.error} variant="contained" onClick={addHandler}>
            Create
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default AddNoteForm;
