
import { NotesStorage } from "./NotesStorage";

export function useLocalStorage(key,initialValue){
//    console.log("inside uselocal",initialValue)
    let notes;
    try
    {
        const data= localStorage.getItem(key);
        notes = data ? JSON.parse(data):[];
        
    }
    catch(err){
        console.log(err);

    }
    
        if(notes.length == 0){
           initialValue["id"] = "0"
        }
        else{
            initialValue["id"] = notes.length.toString()
        }
        notes.push(initialValue);
        // console.log(notes);
    

    localStorage.setItem(key,JSON.stringify(notes))

    
}

export function updateStorage(key,initialValue,id){
    //    console.log("inside uselocal",initialValue)
        let notes;
        try
        {
            const data= localStorage.getItem(key);
            notes = data ? JSON.parse(data):[];
            
        }
        catch(err){
            console.log(err);
    
        }
        
            let updateItem =  notes.find(item=>item.id == id)
            if(updateItem){
                updateItem.title = initialValue.title;
                updateItem.body = initialValue.body;
                updateItem.tags = initialValue.tags;
                updateItem.keys = initialValue.keys;
            }
            // console.log(notes);
        
    
        localStorage.setItem(key,JSON.stringify(notes))
    
        
}

export function getStorage(key,title){
    //    console.log("inside uselocal",initialValue)
        let notes;
        try
        {
            const data= localStorage.getItem(key);
            notes = data ? JSON.parse(data):[];
            
        }
        catch(err){
            console.log(err);
    
        }
        let findItem =  notes.find(item=>item.title == title)
        if(findItem){
            return findItem;
        }
          
        else return null;
    
        
    }

    export function getTags(){
        let notes;
        try
        {
            const data= localStorage.getItem('data');
            notes = data ? JSON.parse(data):[];
            
        }
        catch(err){
            console.log(err);
    
        }
        if(notes != null){
            const tags = notes.map((item)=>
                 item.tags
            )
            const filteredTags = tags.filter((item)=> item.length>0)
            const final = [];
            const seenValues = new Set();

            filteredTags.forEach((inner)=>{
                inner.forEach((obj)=>{
                    if(!seenValues.has(obj.value)){
                        final.push(obj);
                        seenValues.add(obj.value);
                    }
                })
            })
            
            return final;
        }
        return null;
        
    }


    export function getDataForTag(tag){
        let notes;
        try
        {
            const data= localStorage.getItem('data');
            notes = data ? JSON.parse(data):[];
            
        }
        catch(err){
            console.log(err);
    
        }
        if(notes != null){
            
            const filteredTags = notes.filter((item)=> item.tags.length>0)
            console.log("tag ",filteredTags)
            const final = [];
            const seenValues = new Set();

            filteredTags.forEach((inner)=>{
                console.log("inner ",inner.tags)
                inner.tags.forEach((obj)=>{
                    console.log("obbby", obj.value)
                  tag.forEach((t)=>{
                    if(obj.value == t.value && !seenValues.has(inner.id)){
                         final.push(inner);
                         seenValues.add(inner.id);
                      }
                  })
                })
            })
            console.log("end", final)
            if(final.length !=0)
            return final;
        }
        return null;
        
    }







