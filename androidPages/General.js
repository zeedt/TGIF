import  React,{Component,PureComponent} from 'react';
import {BackAndroid,View,Modal,DrawerLayoutAndroid,AsyncStorage,Text,ScrollView,Image,FlatList,ListView,Alert,Dimensions,TouchableHighlight,ActivityIndicator,TouchableNativeFeedback,VirtualizedList} from 'react-native';
import {TabNavigator} from 'react-navigation';
import {Icon,List,ListItem} from 'react-native-elements'
import {Column as Col, Row} from 'react-native-flexbox-grid'
import ListCard from './listCard'
import AutoHeightImage from 'react-native-auto-height-image'
import ImageZoom from 'react-native-image-pan-zoom'
import {NotificationsAndroid} from 'react-native-notifications';
import { Card, CardTitle, CardContent, CardAction, CardButton, CardImage } from 'react-native-material-cards'
export default class General extends PureComponent {
    constructor(props){
        super(props);
        this.ready = false;
        this.check = false;
        this.updatingIDs = [];
        this.updatingIdStatus = [];
        this.dispatchUpdateId = [];
NotificationsAndroid.setNotificationReceivedListener((notification) => {
    console.log("Notification received on device", notification.getData());
});
NotificationsAndroid.setNotificationOpenedListener((notification) => {
    console.log("Notification opened by device user", notification.getData());
});
NotificationsAndroid.setRegistrationTokenUpdateListener((deviceToken) => {
    console.log('Push-notifications registered!', deviceToken)
});
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
        BackAndroid.addEventListener('hardwareBackPress',()=>{
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
    NotificationsAndroid.localNotification({
    title: "TGIF notification",
    body: "This notification was generated by yusuf saheed working app ",
    extra: "data"
});
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
            <View style={{flex:1,alignItems:"center",justifyContent:"center",backgroundColor:"black"}}>
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
        )
        }
    }
    
}