import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@mui/material";
import { showAllNotesAction, tagSortAction } from "../../store/noteReducer";

const TagSelector = () => {
  const tagsVisibility = useSelector((state) => state.note.tagsVisibility);

  const tags = new Set(Object.keys(tagsVisibility));

  const dispatch = useDispatch();

  const toggleTagVisibility = (tag) => {
    const updatedTags = { ...tagsVisibility, [tag]: !tagsVisibility[tag] };
    dispatch(
      tagSortAction(Object.keys(updatedTags).filter((tag) => updatedTags[tag]))
    );
  };

  const areAllTagsVisible = Object.values(tagsVisibility).every(
    (visibility) => !visibility
  );

  return (
    <>
      <Button
        onClick={() => dispatch(showAllNotesAction())}
        variant={areAllTagsVisible ? "contained" : "outlined"}
      >
        Show All
      </Button>
      <div style={{display: "flex", flexWrap:"wrap", width:300, justifyContent: "center"}}>
        {Array.from(tags).map((tag) => (
          <Button
            onClick={() => toggleTagVisibility(tag)}
            variant={tagsVisibility[tag] ? "contained" : "outlined"}
            tag={tag}
            key={tag}
            value={tag}
            style={{margin: 5}}
          >
            {tag}
          </Button>
        ))}
      </div>
    </>
  );
};

export default TagSelector;
