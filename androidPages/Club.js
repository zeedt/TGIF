import  React,{Component} from 'react';
import {View,DrawerLayoutAndroid,Text,List} from 'react-native';
import {StackNavigator,TabNavigator} from 'react-navigation';

export default class Clubs extends Component{
    constructor(props){
        super(props);

    }
    
  static navigationOptions = {
    title:"CLUBS",
    header:null,
  };
    render(){
        return(
            <Text>This is Club page </Text>
        )
    }
}