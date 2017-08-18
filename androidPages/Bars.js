import  React,{Component} from 'react';
import {View,DrawerLayoutAndroid,Text,List} from 'react-native';
import {StackNavigator,TabNavigator} from 'react-navigation';

export default class Bars extends Component{
    constructor(props){
        super(props);

    }
    
  static navigationOptions = {
    title:"BARS",
    header:null,
  };
    render(){
        return(
            <Text>This is Bar poage </Text>
        )
    }
}