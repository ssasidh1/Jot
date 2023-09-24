import styles from "./createNote.module.css"
import { useState,useRef } from "react"
import { Link } from "react-router-dom";
import CreatableReactSelect from "react-select/creatable"


export function CreateNote(){

    const [formData, setFormData] = useState({
        title:'',
        body:'',
        keys:'',
        tags:[]
    })

    const titleRef = useRef(null);
    const textAreaRef = useRef(null);

    function updateInputValues(){
        console.log("Pressed")
        setInputs(updateIp=>updateIp='');
    }

    const handleSubmit = async (e)=>{
        e.preventDefault();
        const data ={title,body}
        console.log("from states",data)

        try{
            const response= await fetch('http://localhost:5173/create',{
                method: 'POST',
                body: JSON.stringify(formData),
                headers:{
                    'Content-Type': 'application/json',
                }
            })
            console.log("res= ",response)
        }
        catch(err){
            console.log(err)
        }
        
        
    }

    const handlechange =(e)=>{
        const {name,value} = e.target
        setFormData({
            ...formData,[name]:value
        })
    }





    return(
       <>
       <form className={styles['form-data']} onSubmit= {handleSubmit}>
        <label htmlFor="title" className={styles["name-label"]}>Start with a Title</label>
        <input ref={titleRef} type="text" id="title" name="title" className={styles["name-input"]} onChange={handlechange} />
        <label  className={styles["tags"]}>Add tags</label>
        <CreatableReactSelect className={styles["creatable"]}  isMulti />
        <label htmlFor="body" className={styles["body-label"]}>Jot it down</label>
        <textarea ref = {textAreaRef} className={styles["textarea"]} id="body" name="body" onChange={handlechange}></textarea>
        <label htmlFor="keys" className={styles["keypts-label"]}>Keys</label>
        <textarea className={styles["textarea-keys"]} id="keys" name="keys"></textarea>
        <input className={styles["save-btn"]} type="submit" value="Save"/>
        <Link to ="..">
        <input className={styles["cancel-btn"]} type="submit" value="Cancel"/>
        </Link>
       </form> 
       </>
    )
}