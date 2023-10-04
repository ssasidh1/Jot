import styles from "./Home.module.css"
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { NotesStorage } from "./NotesStorage";
import { getDataForTag, getStorage } from "./useLocalStorage";
import { notesFetchForHome } from "./notesFetch";
import { getTags } from "./useLocalStorage";
import CreatableSelect from "react-select/creatable"
export function Home() {
    const [activeButton, setActiveButton] = useState({ downArrowBtn: false });
    const [search, setSearch] = useState('')
    const [data, setData] = useState([])
    const [filter, setFilter] = useState([])
    const [value,setValue] = useState([]);
    const [options,setOptions] = useState([])
    const [notes, setNotes] = useState([])
    const navigate = useNavigate();
   
    useEffect(()=>{
        console.log("val ",value)
        if(value.length == 0){setOptions(getTags()); setNotes(notesFetchForHome())}
        else{ console.log("ussy",value);setNotes(getDataForTag(value)) }
        
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
        //console.log(activeButton.plusBtn);

        navigate('/create')

    }
    useEffect(() => {
        const storeData = JSON.parse(localStorage.getItem('data')) || [];
        setData(storeData)
    }, [])

    useEffect(() => {
        const titleData = data.map((item) => item.title)
        console.log(search)
        if (search != "") {
            const searchedData = data.filter(item =>
                (item.title).toLowerCase().includes(search.toLowerCase())

            )
            console.log("SearchedData ", searchedData)
            setFilter(searchedData);
        }
        else {
            setFilter([])
        }



    }, [search, data])
    const searchChange = (e) => {
        setSearch(e.target.value)
        console.log("search", e.target.value)
    }
   

    const handlebtnClick = (data) => {
        console.log("btn", data)
        navigate('/edit', { state: { editData: data } })

    }

    const handleTagChange = (e)=>{
        console.log("e",e)
        setValue(e)
    }
    return (
        <div className={styles["div-main"]}>
            <input type="search" className={styles.Search} placeholder="Search..." 
            onChange={searchChange} value={search} />

            {
                filter.length > 0 && (
                    <div className={styles["list"]}>
                        {filter.map((data, index) => (
                            <button className={styles["btn_list"]}
                                key={index} onClick=
                                {() => handlebtnClick(data)}>{data.title}</button>))
                        }
                    </div>
                )
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
            {
               value.length==0 && <NotesStorage data={notes} />
            }
            {
               value.length>0 && <NotesStorage data={notes} />
            }
        </div>
    );
}