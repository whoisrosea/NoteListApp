import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addNoteAction } from "../../store/noteReducer";

const AddNoteForm = ({setFormVisibile}) => {
  const [inputValue, setInputValue] = useState("");
  const [inputTags, setInputTags] = useState([]);
  const tagRegex = /#(\w+)/g;
  const inputHandler = (e) => {
    setInputValue(e.target.value);
    setInputTags(e.target.value.match(tagRegex));
  };

  const dispatch = useDispatch();

  const addHandler = () => {
    const id = Date.now();
    dispatch(
      addNoteAction({
        title: inputValue,
        id,
        tags: inputTags,
        visibility: true,
      })
    );
    setInputValue("");
    setFormVisibile(false)
  };

  return (
    <div className="FormContainer">
      <TextField
        placeholder="enter your note"
        value={inputValue}
        onChange={inputHandler}
        id="standard-basic"
        variant="standard"
      />
      <Button onClick={addHandler}>add new note</Button>
    </div>
  );
};

export default AddNoteForm;
