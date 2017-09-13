import {AsyncStorage} from 'react-native'
var initialState = {
    data:[],
    user:"",
    storedImage:[],
    fetching:false,
    fetchingStored:false,
    lastFetchedId:0,
    loadTime:0,
    clubErrorLoading:false,
    lastUpdatedNo:0,
    updatingStatus: false,

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
        // fetch("http://vast-bastion-66037.herokuapp.com/fetchPostImage?id="+lastId+"&username="+state.user).then((response)=>response.json()).
        fetch("http://192.168.43.224:8007/fetchPostImage?id="+lastId+"&username="+state.user).then((response)=>response.json()).
        // fetch("http://localhost:8007/fetchPostImage").then((response)=>response.json()).
        then((responseJson)=>{
          
        for(var g=0;g<responseJson.length;g++){
            state.data.push(responseJson[g]);
            // responseJson[g]["key"] = responseJson[g].ID;
            // alert("Key is "+responseJson[g].key)
            // newArr.push(responseJson[g]);
            // Newdata.data.push(responseJson[g]);
            // Newdata.lastFetchedId=responseJson[g].ID;
            // lastId =  responseJson[g].ID;                   
        }  if(responseJson.length>0){
            lastId =  responseJson[responseJson.length-1].ID; 
            // var newD = state.data.concat(responseJson);
            // console.log("New D "+newD.length)
            // state.data = state.data.concat(responseJson);                             
            }
        console.log("New Array is "+responseJson.length)
        // state.data = state.data.concat(responseJson)
        // var Newdata = state;
        // var newArr = []
        
        console.log("Data size is "+state.data.length)
        // state.data.concat(newArr)
        // state.data = Newdata.data;
        // state.lastFetchedId = Newdata.lastFetchedId;
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
if(action.type=="PERFORM_UPDATE"){
    console.log("Number updated is "+state.lastUpdatedNo);
    var h = 0;    
}
if (action.type=="LIKE_IMAGE"){
    console.log("ID liked now is "+action.id);
        var Newdata = state;
    console.log("Size is  "+Newdata.data.length);
        
        for (var i=0;i<Newdata.data.length;i++){
            console.log(Newdata.data[i].ID)
            if (Newdata.data[i].ID==action.id){
                console.log("Equak now");
                if(Newdata.data[i].LIKED=="0"){
                     console.log("Liking")
                    Newdata.data[i].LIKED="1";Newdata.data[i].NUM=Newdata.data[i].NUM+1;
                    //   fetch("http://vast-bastion-66037.herokuapp.com/like?id="+action.id+"&user="+state.user)
                fetch("http://192.168.43.224:8007/like?id="+action.id+"&user="+state.user)
                .then((response)=>response.toString()).then((resp)=>{})
                .catch((err)=>{console.log("Netwrok communication error")});
                }else if(Newdata.data[i].LIKED=="1"){
                     console.log("DisLiking")                    
                    Newdata.data[i].LIKED="0";Newdata.data[i].NUM=Newdata.data[i].NUM-1;
                                // fetch("http://vast-bastion-66037.herokuapp.com/dislike?imageId="+action.id+"&user="+state.user)
                    fetch("http://192.168.43.224:8007/dislike?imageId="+action.id+"&user="+state.user)
                    .then((response)=>response.toString()).then((resp)=>{})
                    .catch((err)=>{console.log("Netwrok communication error")}); 
                }
                break;
            }
        }  
        state.data = Newdata.data;
        return state;
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