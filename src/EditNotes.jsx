import styles from "./createNote.module.css"
import { useState,useRef, useEffect } from "react"
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from 'react-router-dom'
import CreatableReactSelect from "react-select/creatable"
import { updateStorage } from "./useLocalStorage";

export function EditNotes(){

    const loc = useLocation();
    const props = loc.state && loc.state.editData;
    console.log("edit",loc.state.editData)
    
    const formRef = useRef(null)
    const navigate = useNavigate();
    const createOption= (label)=>({
        label,
        value:label,
    })
    let Defaultoptions=[
        { label:'css',value:'css'},
    ]
    if(props.tags.length !=0)
    Defaultoptions = [...Defaultoptions, props.tags]
    console.log(props.tags)
    const [isLoading, setIsLoading] = useState(false);
    const [Options, setOptions] = useState(Defaultoptions);
    const [value, setValue] = useState([]);
    const [form, setForm] = useState({
        title:props.title,
        body:props.body,
        keys:props.keys,
    }
    )
   
    
    const handleSubmit =(e)=>{
        e.preventDefault();
        console.log("inisde submit", formRef.current.keys.value)
        const initialValue = { title:formRef.current.title.value,
                    body:formRef.current.body.value,
                    keys:formRef.current.keys.value,
                    tags:value}
   
            updateStorage('data',initialValue,props.id)
        formRef.current.reset();
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
    
    const handleOnChange = (event) =>{
        const {name,value} = event.target;
        setForm((prev)=>({
            ...prev,
            [name]:value,
    }))
    }

    return(
       <>
       <form className={styles['form-data']} onSubmit= {handleSubmit  } ref={formRef}>

        <label htmlFor="title" className={styles["name-label"]}>Title</label>
        <input  type="text" id="title" name="title" className={styles["name-input"] } value={form.title} onChange={handleOnChange} required/>

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
        <textarea  className={styles["textarea"]} id="body" name="body"  value = {form.body} onChange={handleOnChange} required></textarea>

        <label htmlFor="keys"  className={styles["keypts-label"]}>Keys</label>
        <textarea  className={styles["textarea-keys"]} id="keys" name="keys" value = {form.keys} onChange={handleOnChange} ></textarea>
        
           
        <input className={styles["save-btn"]} type="submit" disabled = {isLoading} value="Save" />
        
       
        <Link to ="..">
        <input className={styles["cancel-btn"]} type="submit" disabled = {isLoading} value="Cancel" />
        </Link>
       </form>
       {/* //<NotesStorage data={initialVal} />  */}
       </>
    )
}