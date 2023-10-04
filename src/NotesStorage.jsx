import { useEffect, useState } from "react";
import styles from "./notesStorage.module.css"
import { EditNotes } from "./EditNotes";
import { useNavigate } from 'react-router-dom'
import { notesFetchForHome } from "./notesFetch";
export function NotesStorage(props){
    const notes = props.data;
    if(notes == null) return<><h1>No notes yet</h1></>
    const navigate = useNavigate();
    const [edit,setEdit] = useState({});
    const handleClick = (id)=>{
        setEdit(notes[id])
        
    }
    useEffect(()=>{
      if(JSON.stringify(edit) != '{}'){
        console.log("use ",edit)
        navigate('/edit', {state:{editData: edit}})
      }
    },[edit])
    
    return(
    <div className={styles["container"]}>
  
        {
           notes.map((note,index)=>(
            
             <div key = {note.id} className={styles["flex-card"]}>
                <h2 className={styles["card-title"]}>{note.title}</h2>
                <p className={styles["card-body"]}>{note.body}</p>
                <button className={styles["card-btn"]} onClick={()=>handleClick(note.id)}>view more..</button>
             </div>
             
             
           ))
        }
   
      
    </div>
    
    )
    
}