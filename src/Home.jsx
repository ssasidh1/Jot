import styles from"./Home.module.css"
import { useState } from 'react';
import {useNavigate} from 'react-router-dom'

export function Home(){
    const [activeButton, setActiveButton] = useState({downArrowBtn:false});
    const navigate = useNavigate();
    const toggleCollapse = (buttonName) => {
        setActiveButton(
            (prevState)=>({
                ...prevState,
                [buttonName]:!prevState[buttonName],
            })
        );
    };

    const navigateToCreatePage = ()=>{
        //console.log(activeButton.plusBtn);
        
            navigate('/create')
        
    }
    return (
        <>
        {<input type = "search" className={styles.Search} placeholder="Search..."/> }
        <button onClick={()=> navigateToCreatePage()} className={styles.plusbutton}>
            <img src = "/plus.png" alt ="plus-button" border="0" className={styles.plusbtn}/>
        </button>
        


        <div className={styles.container}>
        <button onClick={()=>toggleCollapse('downArrowBtn')} className={styles.userbutton}>
            <img src = "/down-arrow.png" alt ="profile-button" border="0" className={styles.downarrow}/>
        </button>
        {activeButton.downArrowBtn && (
            <div  className={`${styles['userdetails']} ${styles['hidden']}`}>
            <a href="#">hello</a>
            </div>
            
        )}
        </div>
        </>
    );
}