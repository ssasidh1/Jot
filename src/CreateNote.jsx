import styles from "./createNote.module.css"
import { useState,useRef, useEffect } from "react"
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom'
import CreatableReactSelect from "react-select/creatable"
import { useLocalStorage } from "./useLocalStorage";


export function CreateNote(){

    const titleref = useRef(null)
    const bodyRef = useRef(null)
    const navigate = useNavigate();



    const handleSubmit =(e)=>{
        e.preventDefault();
        console.log("inisde submit")
        useLocalStorage('data',{title:titleref.current.value,body:bodyRef.current.value})
        alert("Saved..")
    }
    const handlechange=(e)=>{

    }




    return(
       <>
       <form className={styles['form-data']} onSubmit= {handleSubmit}>

        <label htmlFor="title" className={styles["name-label"]}>Start with a Title</label>
        <input ref = {titleref} type="text" id="title" name="title" className={styles["name-input"]} onChange={handlechange} />

        <label  className={styles["tags"]}>Add tags</label>
        <CreatableReactSelect className={styles["creatable"]}  isMulti />

        <label htmlFor="body" className={styles["body-label"]}>Jot it down</label>
        <textarea ref = {bodyRef} className={styles["textarea"]} id="body" name="body" onChange={handlechange}></textarea>

        <label htmlFor="keys" className={styles["keypts-label"]}>Keys</label>
        <textarea className={styles["textarea-keys"]} id="keys" name="keys"></textarea>

        <input className={styles["save-btn"]} type="submit" value="Save"/>
        
        <Link to ="..">
        <input className={styles["cancel-btn"]} type="submit" value="Cancel" />
        </Link>
       </form> 
       </>
    )
}