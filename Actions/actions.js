export function addUser(){
    return {type:"ADD_ITEM",data:{name:"Olamide"}}
}
export function fetchUser(dataa,lastfetchedID){
    return {type:"FETCH_USER",data:dataa,lastfetchedID:lastfetchedID}
}
export function setLoadTime(dataa){
    return {type:"SET_LOADTIME"}
}
export function fetchImage(){
    return {type:"FETCH_IMAGES"}
}
export function fetchStoredImage(storedImage){
    return {type:"FETCH_STORED",storedImage:storedImage}
}
export function setFetching(value){
    return {type:"SET_FETCHING",data:value}
}