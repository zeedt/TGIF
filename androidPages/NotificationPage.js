import React,{PureComponent} from 'react';
import {ImageEditor,Modal,ImageStore,View,DrawerLayoutAndroid,AsyncStorage,Text,ScrollView,Image,FlatList,ListView,Alert,Dimensions,TouchableHighlight,ActivityIndicator,TouchableNativeFeedback,VirtualizedList} from 'react-native';
import { Card, CardTitle, CardContent, CardAction, CardButton, CardImage } from 'react-native-material-cards'
import {Column as Col, Row} from 'react-native-flexbox-grid'
import {Icon,List,ListItem} from 'react-native-elements'
import configureStore from '.././configureStore'
import AutoHeightImage from 'react-native-auto-height-image'
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import rootReducer from './../Reducers';
import {likeImage } from './../Actions/actions'
import {updateListLikes } from './../Actions/actions'
import { connect } from 'react-redux'
const dispatchToProps = (dispatch) => {
  return {
    adduser: (params) => dispatch(addUser()),
    fetchUser: (params) => dispatch(fetchUser(params)),
    fetchStoredImage:(params)=>dispatch(fetchStoredImage(params)),
    setFetching:(params)=> dispatch(setFetching(params)),
    setClubError:()=>dispatch(setClubError()),
    likeImage:(id)=>dispatch(likeImage(id)),
    updateListLikes:(id,likesNo)=>dispatch(updateListLikes(id,likesNo))
  }
}
const mapStateToProps = (state) => ({
  user: state
})
 export default class NotificationPage extends PureComponent{
constructor(props){
    super(props);
    this.dispatchUpdateId = [];   
    this.updatingIDs = [];        
    this.updatingIdStatus = []; 
}
render(){
    return (
        <View>
            <Text>This is notification</Text>
                    </View>
    )
}

}
// export default connect(mapStateToProps,dispatchToProps)(NotificationPage);
