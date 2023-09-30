import styles from "./createNote.module.css"
import { useState,useRef, useEffect } from "react"
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom'
import CreatableReactSelect from "react-select/creatable"
import { useLocalStorage } from "./useLocalStorage";

import { NotesStorage } from "./NotesStorage";

export function CreateNote(){

    
    const formRef = useRef(null)
    const navigate = useNavigate();
    const createOption= (label)=>({
        label,
        value:label,
    })
    const Defaultoptions=[
        { label:'css',value:'css'},
    ]
    
    // const [selectedOptions, setSelectedOptions] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [Options, setOptions] = useState(Defaultoptions);
    const [value, setValue] = useState([]);
    //const [initialVal, setInitialVal] = useState({})
    // useEffect(() => {
    //     if(JSON.stringify(initialVal) != '{}')
    //     {useLocalStorage('data',initialVal)
    //     formRef.current.reset();
    //     setValue([]);}
    //   }, [initialVal]);
    
    const handleSubmit =(e)=>{
        e.preventDefault();
        console.log("inisde submit", formRef.current.keys.value)
        const initialValue = {title:formRef.current.title.value,
                    body:formRef.current.body.value,
                    keys:formRef.current.keys.value,
                    tags:value}
    //    setInitialVal({title:formRef.current.title.value,
    //         body:formRef.current.body.value,
    //         keys:formRef.current.keys.value,
    //         tags:value})
        useLocalStorage('data',initialValue)
        //setInitialVal(initialValue)
        formRef.current.reset();
        //setValue([]);
        alert("Saved")

        
    }
    const handlechange=(e)=>{
        setValue(e);
        
    }

    const handleCreate = (inputValue)=>{
        setIsLoading(true);
        setTimeout(()=>{
            const newOpt = createOption(inputValue);
            setIsLoading(false);
            setOptions((prev)=>[...prev,newOpt]);
            setValue((prev)=>[...prev,newOpt]);
        },1000);
    }
    

    return(
       <>
       <form className={styles['form-data']} onSubmit= {handleSubmit  } ref={formRef}>

        <label htmlFor="title" className={styles["name-label"]}>Start with a Title</label>
        <input  type="text" id="title" name="title" className={styles["name-input"] }  required/>

        <label  className={styles["tags"]}>Add tags</label>
        <CreatableReactSelect className={styles["creatable"]}  
        isClearable
        isDisabled={isLoading}
        isLoading={isLoading}
        isMulti 
        options={Options} 
        value={value} 
        onChange={handlechange}  
        onCreateOption={handleCreate} name="tags" />

        <label htmlFor="body" className={styles["body-label"]}>Jot it down</label>
        <textarea  className={styles["textarea"]} id="body" name="body" required></textarea>

        <label htmlFor="keys"  className={styles["keypts-label"]}>Keys</label>
        <textarea  className={styles["textarea-keys"]} id="keys" name="keys" ></textarea>
        
           
        <input className={styles["save-btn"]} type="submit" disabled = {isLoading} value="Save" />
        
       
        <Link to ="..">
        <input className={styles["cancel-btn"]} type="submit" disabled = {isLoading} value="Cancel" />
        </Link>
       </form>
       {/* //<NotesStorage data={initialVal} />  */}
       </>
    )
}