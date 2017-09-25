import React,{PureComponent} from 'react';
import {ImageEditor,Modal,TouchableWithoutFeedback,ImageStore,View,DrawerLayoutAndroid,AsyncStorage,Text,ScrollView,Image,FlatList,ListView,Alert,Dimensions,TouchableHighlight,ActivityIndicator,TouchableNativeFeedback,VirtualizedList} from 'react-native';
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
 class ListCard extends PureComponent{
constructor(props){
    super(props);
    this.dispatchUpdateId = [];   
    this.updatingIDs = [];        
    this.updatingIdStatus = []; 
}
async executeUpdate(id,no){
        setInterval(()=>{          
        if (this.updatingIDs.indexOf(id)<0){
            this.updatingIDs.push(id);
            this.updatingIdStatus.push(false);
        }
         var index = this.updatingIDs.indexOf(id);                      
         if (this.updatingIdStatus[index]==false){
         fetch("http://vast-bastion-66037.herokuapp.com/updateItem?id="+id).then((response)=>response.json())
        //  fetch("http://127.0.0.1:8007/updateItem?id="+id).then((response)=>response.json())
         .then((resp)=>{this.updatingIdStatus[index]=false;
             if(resp.nLikes!="Error" && resp.nLikes!=this.props.user.Reducers.data[this.props.user.Reducers.fetchedIdsArray.indexOf(id)].NUM){this.updatingIdStatus[index]=false;this.props.updateListLikes(id,resp.nLikes);}
            })
         .catch((err)=>{console.log("Error occured while fetching ",err);this.updatingIdStatus[index]=false;});
         }
        },5000)
    }
 likeImage(rowID){
    this.props.likeImage(rowID)
  }
getStyle(liked,id,num){
      if (this.dispatchUpdateId.indexOf(id)>=0){
      }else{
          this.executeUpdate(id,num)
          this.dispatchUpdateId.push(id);    
      }
    if (liked==1){
        return {color:"red",marginTop:5}
    }else{
         return {color:"blue",marginTop:5}
    }
  }
 ret(like,no){
      if(no==0){
          return <Text>0 like</Text>
      }
      if(no>0){
          if (like==1 && no==1){
              return <Text>You like</Text>
          }else if (like==1 && no>1){
              return <Text>You and {no-1} likes</Text>
          }else if(like==0 && no>0){
              return <Text>{no} likes</Text>            
          }
      }
      return <Text>Olamide</Text>
  }
render(){
    return (
        <View>
    <Card >
                    <CardTitle title={this.props.item.Category} />
                    <AutoHeightImage imageURL ={this.props.item.Blob} width={Dimensions.get('window').width-10} 
                     style={{alignItem:"center",alignContent:"center",marginBottom:10}} 
                     />
                    <CardContent text={this.props.item.Description} />
                    <Row style={{paddingLeft:10,marginBottom:5}}><Icon name="thumbs-o-up" size={15} type="font-awesome" color="red" />                                             
                    <Text>  {this.ret(this.props.item.LIKED,this.props.item.NUM)}</Text>
                    </Row>
                    <CardAction seperator={true} inColumn={false} style={{flex:1,paddingLeft:10}}>
                        <TouchableWithoutFeedback   onPress={()=>{this.likeImage(this.props.item.ID)}} style={{marginTop:10}} >
                        <View style={{flex:1,flexDirection:"row"}}>
                        <Icon  name="thumbs-o-up" type="font-awesome" style={{paddingLeft:10}} color={this.getStyle(this.props.item.LIKED,this.props.item.ID,this.props.item.NUM).color} />
                            <Text style={this.getStyle(this.props.item.LIKED,this.props.item.ID,this.props.item.NUM)}>  Like</Text>
                        </View>
                        </TouchableWithoutFeedback>
                        <CardButton style={{flex:1}}
                        onPress={() => {}}
                        title="Website"
                        color='blue'
                        />
                        <CardButton style={{flex:1}}
                        onPress={() => {}}
                        title="Later"
                        color='blue'
                        />
                    </CardAction>
                    </Card>
                    </View>
    )
}

}
export default connect(mapStateToProps,dispatchToProps)(ListCard);
