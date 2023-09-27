import { useEffect,useState } from "react"

export function useLocalStorage(key,initialValue){
   console.log("inside uselocal",initialValue)
    let notes;
    try
    {
        const data= localStorage.getItem(key);
        notes = data ? JSON.parse(data):[];
    }
    catch(err){
        console.log(err);
        return initialValue;
    }
        notes.push(initialValue);
        console.log(notes);
    

    localStorage.setItem(key,JSON.stringify(notes))
    return notes;


}