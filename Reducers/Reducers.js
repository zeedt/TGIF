import {AsyncStorage} from 'react-native'
var initialState = {
    data:[],
    user:"",
    storedImage:[],
    fetching:false,
    fetchingStored:false,
    lastFetchedId:0,
    loadTime:0,
    clubErrorLoading:false   
}
var i=0;
var lastId = 0;
var fetching = false;
export default function Reducers(state=initialState,action){    
    if (action.type=="SET_FETCHING"){
        var Newdata = state
        Newdata.fetching= action.data;
        state.fetching = Newdata.fetching;
        return {...state}
    }
    if(action.type=="ADD_ITEM"){
        var Newdata = state.data
        Newdata.push(action.data)
        state.data = Newdata
        return {...state,Newdata}
    }
    if(action.type=="FETCH_ITEM"){
        var Newdata = state.data
        Newdata.push(action.data)
        state.data = Newdata
        return {...state,Newdata}
    }
    
    if(action.type=="FETCH_USER"){
        var Newdata = state
        Newdata.user=action.data;
        Newdata.lastFetchedId = action.lastfetchedID
        state.user = Newdata.user;
        state.lastFetchedId = Newdata.lastFetchedId;
        return {...state}
    }
    if(action.type=="SET_LOADTIME"){
        var Newdata = state
        Newdata.loadTime=Newdata.loadTime+1;
        state.loadTime = Newdata.loadTime
        return {...state}
    }
    if(action.type=="SET_CLUB_ERROR"){
        var Newdata = state
        Newdata.clubErrorLoading = !Newdata.clubErrorLoading;
        state.clubErrorLoading = Newdata.clubErrorLoading
        return {...state}
    }
    if(action.type=="FETCH_STORED"){
        state.fetchingStored = true;        
        var Newdata = state;
        Newdata.storedImage = JSON.parse(action.storedImage);
        state.storedImage = Newdata.storedImage;
        state.fetchingStored = false;
        return {...state}
    }
    if(action.type=="FETCH_IMAGES"){
        if (fetching==false){
            // alert("false "+state.lastFetchedId);
        fetching = true;
        fetch("http://vast-bastion-66037.herokuapp.com/fetchPostImage?id="+lastId+"&username="+state.user).then((response)=>response.json()).
        // fetch("http://192.168.43.224:8007/fetchPostImage?id="+lastId+"&username="+state.user).then((response)=>response.json()).
        // fetch("http://localhost:8007/fetchPostImage").then((response)=>response.json()).
        then((responseJson)=>{
        var Newdata = state;
        for(var g=0;g<responseJson.length;g++){
            responseJson[g]["key"] = responseJson[g].ID;
            Newdata.data.push(responseJson[g]);
            Newdata.lastFetchedId=responseJson[g].ID;
            lastId =  responseJson[g].ID;                   
        }
        state.data = Newdata.data;
        state.lastFetchedId = Newdata.lastFetchedId;
            // alert("false "+state.lastFetchedId);
        
        // if(responseJson.length>0 && responseJson!=null && responseJson!=undefined){
            // saveToDB(responseJson,lastId);
        // }else{
        fetching = false;
        // }
        return state
})
        .catch((err)=>{
        console.log("Error is "+err)
        fetching = false;
        return state;
});
    }
    }
    return state;
}

async function saveToDB (records,lastfetchedID){
    try{
        fetching = true;
        await AsyncStorage.setItem("lastfetchedID",lastfetchedID.toString());
        fetching = false;        
        var savedObject = await AsyncStorage.getItem("SavedRecords");
        if (savedObject==null){
            await AsyncStorage.setItem('SavedRecords', JSON.stringify(records));
        }else{
            var savenewData = JSON.parse(savedObject);
            for(var f=0;f<records.length;f++){
                savenewData.push(records[f]);
            }
            await AsyncStorage.setItem("SavedRecords",JSON.stringify(savenewData));
        }
    }catch(err2){
            if(i==0){        
        console.log("Error while saving "+err2);
            i++;    
        }
    }
}

async function fetchStoredImage(){
    try{
        var StoredImage = await AsyncStorage.getItem("SavedRecords");        
        if (StoredImage==null || StoredImage==undefined){
            return [];
        }else{
            return JSON.parse(StoredImage);
        }
    }catch(err2){
        console.log("Error while saving "+err2);
        return [];
    }
}