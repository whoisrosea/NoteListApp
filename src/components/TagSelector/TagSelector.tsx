import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Grid } from "@mui/material";
import { showAllNotesAction, tagSortAction } from "../../actions/actions";
import { State } from "../../interfaces";

const TagSelector: React.FC = () => {
  const tagsVisibility: State["tagsVisibility"] = useSelector(
    (state: State) => state.tagsVisibility
  );



  const tags: Set<string> = new Set(Object.keys(tagsVisibility));

  const dispatch = useDispatch();

  const toggleTagVisibility = (tag: string) => {
    const updatedTags: { [key: string]: boolean } = {
      ...tagsVisibility,
      [tag]: !tagsVisibility[tag],
    };
    dispatch(
      tagSortAction(Object.keys(updatedTags).filter((tag) => updatedTags[tag]))
    );
  };

  const areAllTagsVisible: boolean = Object.values(tagsVisibility).every(
    (visibility) => !visibility
  );

  return (
    <Grid
      container
      display={"flex"}
      flexDirection={"column"}
      alignItems={"center"}
    >
      <Button
        onClick={() => dispatch(showAllNotesAction())}
        variant={areAllTagsVisible ? "contained" : "outlined"}
      >
        Show All
      </Button>
      <Grid
        item
        display={"flex"}
        direction={"row"}
        style={{
          display: "flex",
          flexWrap: "wrap",
          width: 300,
          justifyContent: "center",
        }}
      >
        {Array.from(tags).map((tag) => (
          <Button
            onClick={() => toggleTagVisibility(tag)}
            variant={tagsVisibility[tag] ? "contained" : "outlined"}
            key={tag}
            value={tag}
            style={{ margin: 5 }}
          >
            {tag}
          </Button>
        ))}
      </Grid>
    </Grid>
  );
};

export default TagSelector;
