import { useParams } from "react-router-dom";
import { NoteLists } from "./noteLists";
import { useState } from "react";

export function NotesStorage(){
    const data = localStorage.getItem('data');
    const notes = data ? JSON.parse(data) : null;
    if(notes == null) return<><h1>No notes yet</h1></>
    const last10 = notes.slice(-10);
    return(
    <>
  
        {
           last10.map((note,index)=>(
             <div key = {index} className="flex-card">
                <h2 className="card-title">{note.title}</h2>
                <p className="card-body">{note.body}</p>
                <button className="card-btn" >view more..</button>
             </div>
           ))
        }

   
       
    </>)
}