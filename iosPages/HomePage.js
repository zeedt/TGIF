import  React,{Component} from 'react';
import {View,DrawerLayoutAndroid,Text,List} from 'react-native';
import {StackNavigator,TabNavigator} from 'react-navigation';
import Clubs from './Club';
import Lounges from './Lounges';
import Bars from './Bars';
import General from './General';
import { connect } from 'react-redux'
import { addUser } from './../Actions/actions'
import { fetchUser } from './../Actions/actions'
import {fetchImage } from './../Actions/actions'
import {fetchStoredImage } from './../Actions/actions'
import {setFetching } from './../Actions/actions'
import {setClubError } from './../Actions/actions'
import {likeImage } from './../Actions/actions'

const dispatchToProps = (dispatch) => {
  return {
    adduser: (params) => dispatch(addUser()),
    fetchUser: (params) => dispatch(fetchUser(params)),
    fetchImage: () => dispatch(fetchImage()),
    fetchStoredImage:(params)=>dispatch(fetchStoredImage(params)),
    setFetching:(params)=> dispatch(setFetching(params)),
    setClubError:()=>dispatch(setClubError()),
    likeImage:(id)=>dispatch(likeImage(id))
    
  }
}
const mapStateToProps = (state) => ({
  user: state
})
 class HomePage extends Component{
    constructor(props){
        super(props);
    }
  static navigationOptions = {
    title:"Welcome",
    header:null,
    headerColor:"Red"
  };
    render(){
        return(
            <Text>This is homepage </Text>
        )
    }
}
const GeneralScreen = connect(mapStateToProps,dispatchToProps)(General);
const ClubScreen = connect(mapStateToProps,dispatchToProps)(Clubs);
const LoungesScreen = connect(mapStateToProps,dispatchToProps)(Lounges);
const BarsScreen = connect(mapStateToProps,dispatchToProps)(Bars);

const TabPage = TabNavigator({
    General:{screen:GeneralScreen},
    Club:{screen:ClubScreen},
    Lounges:{screen:LoungesScreen},
    Bars:{screen:BarsScreen},
},{
    tabBarOptions : {
    activeTintColor:"green", 
    style: {
      backgroundColor: '#ffe166',
    },
    labelStyle:{color:"green"}
  },
    tabBarPosition:'top'
  
})
export default TabPage;