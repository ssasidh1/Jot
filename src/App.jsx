import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import {Home} from "./Home"
import {Check} from "./check"
import {CreateNote} from "./CreateNote"
import { NotesStorage } from './NotesStorage';


function App() {

  // function CreateNotes 
  return <Routes>
    <Route path="/" element={<Home />}/>
    <Route path="/create" element={<CreateNote  />}/>
    <Route path="*" element={<Navigate to ="/" />}/>
    <Route path="/all"  element={<NotesStorage />} />
    
  </Routes>
}

export default App;
