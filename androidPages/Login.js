import React,{Component} from 'react'
import {View,TextInput,StyleSheet,Text,Image,ScrollView,Button,TouchableHighlight,Alert,AsyncStorage} from 'react-native'
import {Column as Col, Row} from 'react-native-flexbox-grid';
import HomePage from './HomePage'
import {setLoadTime} from './../Actions/actions'
import SplashScreen from './SplashScreen'
import General2 from './General2'
export default class Login extends Component{
    constructor(props){
        super(props);
        this.update = true;
        this._mounted = true;
        this.base64Icon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAwBQTFRF7c5J78kt+/Xm78lQ6stH5LI36bQh6rcf7sQp671G89ZZ8c9V8c5U9+u27MhJ/Pjv9txf8uCx57c937Ay5L1n58Nb67si8tVZ5sA68tJX/Pfr7dF58tBG9d5e8+Gc6chN6LM+7spN1pos6rYs6L8+47hE7cNG6bQc9uFj7sMn4rc17cMx3atG8duj+O7B686H7cAl7cEm7sRM26cq/vz5/v767NFY7tJM78Yq8s8y3agt9dte6sVD/vz15bY59Nlb8txY9+y86LpA5LxL67pE7L5H05Ai2Z4m58Vz89RI7dKr+/XY8Ms68dx/6sZE7sRCzIEN0YwZ67wi6rk27L4k9NZB4rAz7L0j5rM66bMb682a5sJG6LEm3asy3q0w3q026sqC8cxJ6bYd685U5a457cIn7MBJ8tZW7c1I7c5K7cQ18Msu/v3678tQ3aMq7tNe6chu6rgg79VN8tNH8c0w57Q83akq7dBb9Nld9d5g6cdC8dyb675F/v327NB6////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/LvB3QAAAMFJREFUeNpiqIcAbz0ogwFKm7GgCjgyZMihCLCkc0nkIAnIMVRw2UhDBGp5fcurGOyLfbhVtJwLdJkY8oscZCsFPBk5spiNaoTC4hnqk801Qi2zLQyD2NlcWWP5GepN5TOtSxg1QwrV01itpECG2kaLy3AYiCWxcRozQWyp9pNMDWePDI4QgVpbx5eo7a+mHFOqAxUQVeRhdrLjdFFQggqo5tqVeSS456UEQgWE4/RBboxyC4AKCEI9Wu9lUl8PEGAAV7NY4hyx8voAAAAASUVORK5CYII='
        this.state = {username:"",password:""};
       
    }
    static navigationOptions = {
        header:null,    
    }
    async saveUser(username){
            try {
                await AsyncStorage.setItem('Username', username);
            } catch (error) {Alert.alert("Error is "+error);
                 }
    }
    componentWillUnmount() {
  this._mounted = false;
}
    componentWillMount(){
         setInterval(()=>{
                this.props.setLoadTime();
        },1000)
    }
    shouldComponentUpdate() {
    if (this.props.user.Reducers.user!=null && this.props.user.Reducers.user!="" && this.update==false) {
        return false;
    }
    return true;
}
validateUser(){
    console.log("CCC")
    // fetch("http://vast-bastion-66037.herokuapp.com/validateUser",{
    fetch("http://192.168.43.224:8007/validateUser",{
    // fetch("http://localhost:8007/validateUser",{
            method:'POST',
             headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: this.state.username,
                password: this.state.password
            })
        }).then((response)=>response.json()).then((responseJson)=>{
            if (responseJson.data=="Error" || responseJson.data=="Error in communication" || responseJson.data=="Invalid username or password"){
        Alert.alert(responseJson.data);
            }else{
                this.saveUser(this.state.username);
                const {navigate} = this.props.navigation;
                navigate('HomePage');
            }
        })
        .catch((err)=>{return ({data:"Error in communication"})});
}
    render(){
        if((this.props.user.Reducers.user=="" || this.props.user.Reducers.user==null)  && this.props.user.Reducers.loadTime<=4){
            return (<SplashScreen />)
        }
        else if (this.props.user.Reducers.user!=null && this.props.user.Reducers.user!="" && this.props.user.Reducers.loadTime>4){
            this.update = false;            
            return (<HomePage />);
    
        }else if((this.props.user.Reducers.user=="" || this.props.user.Reducers.user==null) && this.props.user.Reducers.loadTime>4){
       
        return(
                <ScrollView style={{backgroundColor:"#ffe166"}}  contentContainerStyle={{flexGrow: 1,justifyContent: 'center',alignItems: 'center',}} >            
            <View style={styles.container}>
                <Row size={12}>
                <Image source={require('./../img/zeed.jpg')} style={styles.logo} />
                </Row>
                <Row size={12}>
                    <Col sm={10} md={8} lg={8}>
               <TextInput  placeholder="Username" style={styles.textInput} onChangeText={(username)=>this.setState({username})} />
                <TextInput  placeholder="Password" secureTextEntry={true} style={styles.textInput} onChangeText={(password)=>this.setState({password})} />
                </Col>
                </Row>
                <Button style={[styles.Button]} title="Login" onPress={()=>this.validateUser()} />
                    
            </View>
            </ScrollView>            
        )
    }else{
       return (<SplashScreen />);
    }
}
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    alignItems: 'center',
    justifyContent: 'center',
    
  },
  logo:{
      marginBottom:20,
      height:150,
      width:150,
      borderRadius:75,
  },
  textInput:{
    fontSize:15,
  },
  Button:{
      marginBottom:20,
      backgroundColor:"green"
  }
});