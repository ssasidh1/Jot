import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import {Home} from "./Home"
import {Check} from "./check"
import {CreateNote} from "./CreateNote"


function App() {
  return <Routes>
    <Route path="/" element={<Home />}/>
    <Route path="/create" element={<CreateNote />}/>
    <Route path="*" element={<Navigate to ="/" />}/>

    
  </Routes>
}

export default App;
