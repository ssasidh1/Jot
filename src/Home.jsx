import styles from "./Home.module.css"
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { NotesStorage } from "./NotesStorage";
import { getDataForTag, getStorage } from "./useLocalStorage";
import { notesFetchForHome } from "./useLocalStorage";
import { getTags } from "./useLocalStorage";
import CreatableSelect from "react-select/creatable"
export function Home() {
    const [activeButton, setActiveButton] = useState({ downArrowBtn: false });
    const [search, setSearch] = useState('')
    const [data, setData] = useState(new Map())
    const [filter, setFilter] = useState(new Map())
    const [value,setValue] = useState([]);
    const [options,setOptions] = useState([])
    const [notes, setNotes] = useState(new Map())
    const navigate = useNavigate();
   
    useEffect(()=>{
        if(value.length == 0){
            setOptions(getTags()); 
            console.log("Fetched notes",notesFetchForHome())
            setNotes(notesFetchForHome())
        }
        else{ 
            for(const v of value){
                const dataTag = getDataForTag(v.value);
                console.log("tag data",dataTag)
                setNotes(dataTag)
            }
             
        }
        
    },[value])
    const toggleCollapse = (buttonName) => {
        setActiveButton(
            (prevState) => ({
                ...prevState,
                [buttonName]: !prevState[buttonName],
            })
        );
    };

    const navigateToCreatePage = () => {

        navigate('/create')

    }
    useEffect(() => {
        const storeData = new Map(JSON.parse(localStorage.getItem('data'))) || new Map();
        setData(storeData)
    }, [])

    useEffect(()=>{
        console.log("useEffect",filter)
    },[filter])

    useEffect(() => {
        
        if (search != "") {
            // const searchedData = data.filter(item =>
            //     (item.title).toLowerCase().includes(search.toLowerCase())

            // )
            let foundKey = null;
            const searchedData=new Map();
            data.forEach((value, key)=>{
                console.log("####",value.title, search)
                
                if(value.title.includes(search)){
                    foundKey = key;
                    searchedData.set(key,value);
                    
                }
                
                
            })
            setFilter(searchedData);
            
            
        }
        else {
            setFilter(new Map());
        }



    }, [search, data])
    const searchChange = (e) => {
        setSearch(e.target.value)
    }
   

    const handlebtnClick = (data) => {
        console.log("edit handle",data)
        navigate('/edit', { state: { editData: data } })

    }

    const handleTagChange = (e)=>{
        setValue(e)
    }
    return (
        <div className={styles["div-main"]}>
            <input type="search" className={styles.Search} placeholder="Search..." 
            onChange={searchChange} value={search} />
           

            {
                filter.size > 0 && (
                    <div className={styles["list"]}>
                        {Array.from(filter.entries()).map((data, k) => (
                            <button className={styles["btn_list"]}
                                key={data[0]} onClick=
                                {() => handlebtnClick(data)}>{data[1].title}</button>))
                        }
                    </div>
                )
            }
             {
                
                console.log("html fill", filter.size)
                
            }
            <CreatableSelect isMulti options={options} value = {value} className={styles['tag-search']} onChange = {handleTagChange} />
            {/* <input type="search" className={styles['tag-search']} placeholder="Search with Tags" onChange={tagChange} value={search} /> */}
            <button onClick={() => navigateToCreatePage()} className={styles.plusbutton}>
                <img src="/plus.png" alt="plus-button" border="0" className={styles.plusbtn} />
            </button>



            <div className={styles.container}>
                <button onClick={() => toggleCollapse('downArrowBtn')} className={styles.userbutton}>
                    <img src="/down-arrow.png" alt="profile-button" border="0" className={styles.downarrow} />
                </button>
                {activeButton.downArrowBtn && (
                    <div className={`${styles['userdetails']} ${styles['hidden']}`}>
                        <a href="#">hello</a>
                    </div>

                )}
            </div>
           <NotesStorage data={notes} />
            
        </div>
    );
}