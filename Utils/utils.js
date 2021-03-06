export function loginUser(username,password){
        // fetch("http://vast-bastion-66037.herokuapp.com/validateUser",{
        fetch("http://192.168.43.224:8007/validateUser",{
            method:'POST',
             headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        }).then((response)=>response.json()).then((responseJson)=>{
            return JSON.stringify(responseJson);
        })
        .catch((err)=>{return ({data:"Error in communication"})});
    }

    export async function likeImage(username,id){
        // fetch("http://vast-bastion-66037.herokuapp.com/like?id="+id+"&user="+username)
        fetch("http://192.168.43.224:8007/like?id="+id+"&user="+username)
        .then((response)=>response.toString()).then((resp)=>{})
        .catch((err)=>{console.log("Netwrok communication error")});        
    }
    
    export async function dislikeImage(username,imageId){
        // fetch("http://vast-bastion-66037.herokuapp.com/dislike?imageId="+imageId+"&user="+username)
        fetch("http://192.168.43.224:8007/dislike?imageId="+imageId+"&user="+username)
        .then((response)=>response.toString()).then((resp)=>{})
        .catch((err)=>{console.log("Netwrok communication error")});        
    }

