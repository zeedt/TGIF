import  React,{Component} from 'react';
import {View,DrawerLayoutAndroid,Text,List} from 'react-native';
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
            <Text>This is Lounges page </Text>
        )
    }
}