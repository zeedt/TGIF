import  React,{Component} from 'react';
import {View,DrawerLayoutAndroid,Text,List,WebView,Button} from 'react-native';
import {StackNavigator,TabNavigator} from 'react-navigation';

export default class Lounges extends Component{
    constructor(props){
        super(props);
        this.var = false;
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
    render(){
        if(this.var==false){   
        return(
            <WebView source={{uri:this.state.presenturl}} renderError={()=>{this.var=true}} 
            renderLoading={()=>{console.log("NN"); return <Text>Loading page now</Text>}}
            onNavigationStateChange = {this.setCurrentUrl.bind(this)}
            />
        )
    }
    else{
        return(
            <View>
            <Text>Error occured</Text>
            <Button title="reload" onPress={()=>{this.var = false}} />
            </View>
        )
    }
    }
}