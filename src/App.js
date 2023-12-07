import { useState } from "react";
import "./App.css";
import AddNoteForm from "./components/AddNoteForm/AddNoteForm";
import EditModal from "./components/EditModal/EditModal";
import NotesList from "./components/NotesList/NotesList";
import TagSelector from "./components/TagSelector/TagSelector";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { useSelector } from "react-redux";

function App() {

  const [visibility, setVisibility] = useState(false)
  const noteArr = useSelector(state => state.note.note)
  console.log(noteArr);
  return (
    <div className="window">
      <div className="MainContainer">
        {noteArr.length ? <TagSelector /> : <h1>add some notes...</h1> }
        

        <NotesList />
        <AddCircleOutlineIcon
            className="PlusIcon"
            sx={{ fontSize: 100 }}
            color="primary"
            onClick={() => setVisibility(true)}
          />
          
        <EditModal visible={visibility} setVisible={setVisibility} >
        <AddNoteForm setFormVisibile={setVisibility}/>
        </EditModal>
      </div>
    </div>
  );
}

export default App;
