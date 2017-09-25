import  React,{Component,PureComponent} from 'react';
import {PushNotificationIOS,TouchableWithoutFeedback, BackAndroid,BackHandler,View,Modal,DrawerLayoutAndroid,AsyncStorage,Text,ScrollView,Image,FlatList,ListView,Alert,Dimensions,TouchableHighlight,ActivityIndicator,TouchableNativeFeedback,VirtualizedList} from 'react-native';
import {TabNavigator} from 'react-navigation';
import {Icon,List,ListItem} from 'react-native-elements'
import {Column as Col, Row} from 'react-native-flexbox-grid'
import ListCard from './listCard'
import AutoHeightImage from 'react-native-auto-height-image'
import ImageZoom from 'react-native-image-pan-zoom'
import NotificationsIOS from 'react-native-notifications';
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
        this.state = {
            mydata:[],refreshing:false,loading:false,loadingMore:false,imageView:"",rimg:"",gg:0,
            data:0,presentId:"",imgStat:""}        
        setInterval(()=>{          
        if(this.ready == true){
        }  
        },10000)
    }
    onPushRegistered(deviceToken) {
        console.log("Device Token Received", deviceToken);
    }
 
    onPushRegistrationFailed(error) {
        console.error(error);
    }
    componentWillUnmount() {    
}
    componentDidMount(){
        var navigator;
        BackHandler.addEventListener('hardwareBackPress',()=>{
        })
    }
    async onCheckPermissions() {
    const hasPermissions = await NotificationsIOS.isRegisteredForRemoteNotifications();
    if (hasPermissions) {
      console.log('Yay! You have permissions');
    } else {
      console.log('Boo! You don\'t have permissions');
    }
  }
  static navigationOptions = {
    title:"HOME",
    header:null,
  };
  handleRefresh = () =>{
      this.setState({refreshing:true})
    setTimeout(()=>{
        this.setState({refreshing:false})
    },200)
  }
    getModal(renderImage){
console.log("I am clicked")
PushNotificationIOS.scheduleLocalNotification({
    alertBody:"Hello dear",
    alertAction:"Mark as read",
    
});
PushNotificationIOS.getScheduledLocalNotifications((e)=>{
    console.log("Scheduled are "+JSON.stringify(e))
})
        this.setState({showModal:true,rimg:renderImage});
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
                <View style={{backgroundColor:"white"}}>
            <Modal visible={this.state.showModal} transparent={false} onRequestClose={()=>{this.setState({showModal:false})}} >
            <View style={{flex:1,backgroundColor:"Blue",marginTop:30}}>
            <TouchableWithoutFeedback style={{}} onPress={()=>{this.setState({showModal:false})}} >
            <Text style={{fontSize:20,color:"Black",marginLeft:5}}> Back </Text>
            </TouchableWithoutFeedback>
            <View style={{flex:1,alignItems:"center",justifyContent:"center",backgroundColor:"black",marginTop:30}}>
            <ImageZoom cropWidth={Dimensions.get('window').width}
                cropHeight={Dimensions.get('window').height-15}
                imageHeight={(Dimensions.get('window').height-15)*0.5}
                imageWidth = {Dimensions.get('window').width}
                >
                <AutoHeightImage width={Dimensions.get('window').width} imageURL={this.state.rimg} />
                </ImageZoom>
            </View>
            </View>
        </Modal>
          <FlatList data={this.props.user.Reducers.data} 
                renderItem = {({item})=>
                <TouchableWithoutFeedback onPress={()=>{console.log("NN");this.getModal(item.Blob)}} ><View><ListCard item={item} /></View></TouchableWithoutFeedback>
                }
                keyExtractor={(item, index) => index}
                extraData={this.props.user.Reducers.data}  
                refreshing={this.state.refreshing}
                onRefresh={this.handleRefresh}
                removeClippedSubviews={false}
                onEndReached={()=>{this.props.fetchImage()}}
                onEndReachedThreshold ={1}
                ListFooterComponent={()=>{
                    if(this.props.user.Reducers.fetching==true){
                    this.setState({loadingMore:true})                        
                    }else{this.setState({loadingMore:false});}
                    if(this.state.loadingMore==true)
                    {return(<ActivityIndicator color="blue" style={{marginBottom:5,paddingBottom:5}} />)}
                    else{
                    return (
                    <TouchableWithoutFeedback onPress={()=>{this.setState({loadingMore:true});this.props.fetchImage(); }}>
                        <View style={{marginBottom:5,paddingBottom:5,flex:1,alignItems:"center",justifyContent:"center"}}>
                         <Icon  name="refresh" type="MaterialCommunityIcons" color="blue" style={{paddingLeft:10}} />
                        </View>
                        </TouchableWithoutFeedback>)
                        }
                        }}
                 />
                 </View>
        )
        }
    }
    
}