import  React,{Component} from 'react';
import {View,DrawerLayoutAndroid,Text,List,WebView} from 'react-native';
import {StackNavigator,TabNavigator} from 'react-navigation';

export default class Lounges extends Component{
    constructor(props){
        super(props);

    }
    
  static navigationOptions = {
    title:"LOUNGES",
    header:null,
  };
    render(){
        return(
            <WebView source={{uri:"http://tgifnaija.com/lounges"}} />
        )
    }
}