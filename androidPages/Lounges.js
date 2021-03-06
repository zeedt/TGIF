import  React,{Component} from 'react';
import {View,ActivityIndicator,DrawerLayoutAndroid,Text,List,WebView,Button,TouchableHighlight} from 'react-native';
import {StackNavigator,TabNavigator} from 'react-navigation';
import {Icon} from 'react-native-elements'

export default class Lounges extends Component{
    constructor(props){
        super(props);
        this.var = false;
        this.showIndicatorBool = true;
        this.state = {presenturl:"http://tgifnaija.com/Lounges"};

    }
    
  static navigationOptions = {
    title:"LOUNGES",
    header:null,
  };
  setCurrentUrl(webViewState){
        // alert("URL is "+webViewState.url)
        this.setState({uri:webViewState.url})
    }
    showIndicator(){
        if (this.showIndicatorBool==false){
            return (<ActivityIndicator color="green"></ActivityIndicator>);

        }
        if(this.showIndicatorBool==true){
            setTimeout(()=>{
                this.showIndicatorBool= false
            },4000)
        }
    }
    render(){
        if(this.var==false){   
        return(
            <WebView source={{uri:this.state.presenturl}} renderError={()=>{this.var=true;this.showIndicatorBool=false;}} 
            renderLoading={()=>{console.log("NN"); return <Text>Loading page now</Text>}}
            onNavigationStateChange = {this.setCurrentUrl.bind(this)}
            />
        )
    }
    else{
        return(
            <View style={{flex:1,alignItems:"center",justifyContent:"center",backgroundColor:"#ffffff"}}>
                        <View style={{marginBottom:5,paddingBottom:5,flex:1,alignItems:"center",justifyContent:"center"}}>
                         <Text>Error loading page</Text>
                         <Icon  name="refresh" size={40} type="MaterialCommunityIcons" color="blue" style={{paddingLeft:10}} onPress={()=>{this.var=false}} />
                        </View>
            </View>
        )
    }
    }
}