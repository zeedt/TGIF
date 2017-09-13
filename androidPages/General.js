import  React,{Component,PureComponent} from 'react';
import {BackAndroid,View,Modal,DrawerLayoutAndroid,AsyncStorage,Text,ScrollView,Image,FlatList,ListView,Alert,Dimensions,TouchableHighlight,ActivityIndicator,TouchableNativeFeedback,VirtualizedList} from 'react-native';
import {TabNavigator} from 'react-navigation';
// import {likeImage} from './../Utils/utils';
import {likeImage } from './../Actions/actions'
import {dislikeImage} from './../Utils/utils';
import {Icon,List,ListItem} from 'react-native-elements'
import {Column as Col, Row} from 'react-native-flexbox-grid'
import ResponsiveImage from 'react-native-responsive-image';
import ListCard from './listCard'
import AutoHeightImage from 'react-native-auto-height-image'

import ImageZoom from 'react-native-image-pan-zoom'
import { Card, CardTitle, CardContent, CardAction, CardButton, CardImage } from 'react-native-material-cards'
export default class General extends PureComponent {
    constructor(props){
        super(props);
        this.ready = false;
        this.check = false;
        this.updatingIDs = [];
        this.updatingIdStatus = [];
        this.dispatchUpdateId = [];
    this.state= {imageArray:[],showModal:false};
    this.imgArrs = [{uri:"hhhhh"}];
        setInterval(()=>{
        if(this.check==false){
            this.props.fetchImage();
        }
        },5000)
        this.f = 0;                     
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        // this.onEee = 
        this.state = {
            ds:ds.cloneWithRows([]),mydata:[],refreshing:false,loading:false,loadingMore:false,imageView:"",rimg:"",gg:0,
            data:ds,presentId:"",imgStat:""}        
        setInterval(()=>{          
        if(this.ready == true){
            // this.props.fetchImage();                            
            // alert(this.state.refreshing)
            // this.setState({mydata:(this.props.user.Reducers.data)});
        }  
        },10000)
    }
    updateListLikes(id,no){
        for (var i=0;i<this.state.mydata.length;i++){
        if (this.state.mydata[i].ID==id){          
            this.state.mydata[i].NUM = no;
            break;
        }
      }
    }
    componentDidMount(){
        var navigator;
        alert("Mountrd");
        BackAndroid.addEventListener('hardwareBackPress',()=>{
            alert("Pressed");
            if (this.state.showModal==true){
                this.setState({showModal:false})
            }
        })
    }
    async executeUpdate(id,no){
        setInterval(()=>{          
         console.log("executing "+id); 
        if (this.updatingIDs.indexOf(id)<0){
            this.updatingIDs.push(id);
            this.updatingIdStatus.push(false);
        }
         var index = this.updatingIDs.indexOf(id);                      
         if (this.updatingIdStatus[index]==false){
        //  fetch("http://vast-bastion-66037.herokuapp.com/updateItem?id="+id).then((response)=>response.json())
         fetch("http://192.168.43.224:8007/updateItem?id="+id).then((response)=>response.json())
         .then((resp)=>{this.updatingIdStatus[index]=false;
                var t = "nothing";             
             for (var i=0;i<this.state.mydata.length;i++){
                if (this.state.mydata[i].ID==id){
                    t = this.state.mydata[i].NUM;
                    break;
                }
            }
             if(resp.nLikes!="Error" && resp.nLikes!=t && t!="nothing"){if(id=="23"){}this.updateListLikes(id,resp.nLikes);}
            })
         .catch((err)=>{console.log("Error occured while fetching");this.updatingIdStatus[index]=false;});
         }
        },5000)
    }
  async fetchImageToStore(){
      const alreadyStored = await AsyncStorage.getItem("SavedRecords");
         if (alreadyStored!==null && alreadyStored!==undefined){
                this.props.fetchStoredImage(alreadyStored);
        }
  }
  likeImage(rowID){
      //dispatch a like to the reducer
    //   likeImage(this.props.user.Reducers.user,rowID);
    this.props.likeImage(rowID)
      var newData = [];
      newData = this.state.mydata;
      for (var i=0;i<newData.length;i++){
        if (newData[i].ID==rowID){
            if(newData[i].LIKED=="1"){
                newData[i].LIKED="0";newData[i].NUM=newData[i].NUM-1                
                this.setState({mydata:newData})                
                // dislikeImage(this.props.user.Reducers.user,rowID)
            }
            else if(newData[i].LIKED=="0"){
                newData[i].LIKED="1";newData[i].NUM=newData[i].NUM+1  
                this.setState({mydata:newData})                
                // likeImage(this.props.user.Reducers.user,rowID);
            }
            break;
        }
      }
  }
  static navigationOptions = {
    title:"HOME",
    header:null,
  };
  getStyle(liked,id,num){
      if (this.dispatchUpdateId.indexOf(id)>=0){
      }else{
        //   this.executeUpdate(id,num)
          this.dispatchUpdateId.push(id);      
      }
    if (liked==1){
        return {color:"red"}
    }else{
         return {color:"blue"}
    }
  }
  getStyleText(liked,id){
    if (liked==1){
        return {color:"red"}
    }else{
        return {color:"blue"}
    }
  }
  likeImagee(){
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
  loadMore(){
      alert("yes")
  }
  handleRefresh = () =>{
      this.setState({refreshing:true})
    setTimeout(()=>{
        this.setState({refreshing:false})
    },200)
    //   this.setState({refreshing:false})
  }
  handleMore=()=>{
        alert("End "+this.state.loadingMore);
        this.setState({loadingMore:true});
        this.props.fetchImage();                             
        // setTimeout(()=>{
        //    this.setState({loadingMore:false}); 
        // },200)
        // this.setState({refreshing:false});
    }
    getModal(renderImage){
    // if(this.state.showModal==true){
        this.setState({showModal:true,rimg:renderImage});
        /*return (
        <Modal visible={this.state.showModal} transparent={false} onRequestClose={()=>{this.setState({showModal:false})}} >
            <View style={{flex:1,alignItems:"center",justifyContent:"center"}}>
            <Text>Hello</Text>
            <ImageZoom cropWidth={Dimensions.get('window').width}
                cropHeight={Dimensions.get('window').height-15}
                imageHeight={(Dimensions.get('window').height-15)*0.5}
                imageWidth = {Dimensions.get('window').width}
                >
                <AutoHeightImage width={Dimensions.get('window').width} imageURL={renderImage} />
                </ImageZoom>
            </View>
        </Modal>
    )*/
// }
}

     _keyExtractor = (item, index) => item.ID;
    render(){
        if (this.props.user.Reducers.data.length<=0){
        return(
            <ScrollView style={{backgroundColor:"#ffffff"}}  contentContainerStyle={{flexGrow: 1,}}>
            <View style={{alignItems:"center",justifyContent:"center",flex:1}}>
                <ActivityIndicator size="large" color="green" />
                <Text style={{color:"green"}}>Loading feeds</Text>
                </View>
                </ScrollView>
        )
        }else{
            this.ready = true;
            this.check = true;
            if(this.state.gg==0){
                this.setState({gg:this.state.gg+1,showModal:false});
            }
        return(
            // <ScrollView>
                <View style={{backgroundColor:"white"}}>
            <Modal visible={this.state.showModal} transparent={false} onRequestClose={()=>{this.setState({showModal:false})}} >
            <View style={{flex:1,alignItems:"center",justifyContent:"center"}}>
            <Text>Hello</Text>
            <ImageZoom cropWidth={Dimensions.get('window').width}
                cropHeight={Dimensions.get('window').height-15}
                imageHeight={(Dimensions.get('window').height-15)*0.5}
                imageWidth = {Dimensions.get('window').width}
                >
                <AutoHeightImage width={Dimensions.get('window').width} imageURL={this.state.rimg} />
                </ImageZoom>
            </View>
        </Modal>
          <FlatList data={this.props.user.Reducers.data} 
                renderItem = {({item})=>
                <TouchableHighlight onPress={()=>{console.log("NN");this.getModal(item.Blob)}} ><View><ListCard item={item} /></View></TouchableHighlight>
                }
                keyExtractor={(item, index) => index}
                extraData={this.props.user.Reducers.data}  
                refreshing={this.state.refreshing}
                onRefresh={this.handleRefresh}
                removeClippedSubviews={false}
                onEndReached={()=>{console.log("Bottom reached");this.props.fetchImage()}}
                onEndReachedThreshold ={1}
                ListFooterComponent={()=>{if(this.state.loadingMore==true){return(<ActivityIndicator color="blue" style={{marginBottom:5,paddingBottom:5}} />)}else{return <View style={{marginBottom:5,paddingBottom:5}}><Text></Text></View>}}}
                 />
                 </View>
                //   </ScrollView>
        )
        }
    }
    
}