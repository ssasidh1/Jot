import styles from "./createNote.module.css"
import { useState,useRef, useEffect } from "react"
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom'
import CreatableReactSelect from "react-select/creatable"
import { useLocalStorage } from "./useLocalStorage";
import {v4 as uuidv4} from 'uuid';

export function CreateNote(){

    const titleref = useRef(null)
    const bodyRef = useRef(null)
    const navigate = useNavigate();
    const options=[
        { label:'css',value:'css'},
    ]
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [Options, setOptions] = useState(options);
    const [NewOptions, setNewOptions] = useState(options);
    useEffect(() => {
        console.log("NewOptions changed: ", Options);
      }, [Options]);

    const handleSubmit =(e)=>{
        e.preventDefault();
        console.log("inisde submit")
        useLocalStorage('data',{title:titleref.current.value,body:bodyRef.current.value})
        //console.log(Options);
        alert("Saved..")
    }
    const handlechange=(e)=>{
        console.log("change,",e[0].value);
        setSelectedOptions(e);
        
    }

    const handleInputChange = ( inputVal,action)=>{
        // console.log("inputchange ",inputVal)
        // setSelectedOptions(inputVal);
        
        if(action.action === 'set-value'){
            
            if(!(NewOptions.some((o)=>Object.values(o).includes(inputVal)))){
                const x = [...NewOptions,Options[0]]
                console.log("in handlechange if...",x)
                //
                setNewOptions(x)
                
            }
        }
        else{
            
            console.log("in set...",inputVal)
            setOptions([{label:inputVal,value:inputVal}]) 
        }
    }


    return(
       <>
       <form className={styles['form-data']} onSubmit= {handleSubmit}>

        <label htmlFor="title" className={styles["name-label"]}>Start with a Title</label>
        <input ref = {titleref} type="text" id="title" name="title" className={styles["name-input"]}  />

        <label  className={styles["tags"]}>Add tags</label>
        <CreatableReactSelect className={styles["creatable"]}  isMulti options={NewOptions} value={selectedOptions} onChange={handlechange} onInputChange={handleInputChange} onCreateOption={} />

        <label htmlFor="body" className={styles["body-label"]}>Jot it down</label>
        <textarea ref = {bodyRef} className={styles["textarea"]} id="body" name="body" ></textarea>

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