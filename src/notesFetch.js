
export function notesFetchForHome(){

    const data = localStorage.getItem('data');
    const notes = data ? JSON.parse(data) : null;
    if(notes == null) return null;
    const last10 = notes.slice(-10).reverse();
    return last10;
    
}