export function loginUser(username,password){
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
            // alert(JSON.stringify(responseJson));
            return JSON.stringify(responseJson);
        })
        .catch((err)=>{return ({data:"Error in communication"})});
    }