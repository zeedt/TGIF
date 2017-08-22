import  React,{Component} from 'react';
import {View,DrawerLayoutAndroid,AsyncStorage,Text,List,ScrollView,Image,FlatList,ListView,Alert,Dimensions} from 'react-native';
import {TabNavigator} from 'react-navigation';
import {likeImage} from './../Utils/utils';
import {Icon} from 'react-native-elements'
import {Column as Col, Row} from 'react-native-flexbox-grid'
import ResponsiveImage from 'react-native-responsive-image';
import { Card, CardTitle, CardContent, CardAction, CardButton, CardImage } from 'react-native-material-cards'
export default class General extends Component{
    constructor(props){
        super(props);
        this.ready = false;
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        // this.state = {data:this.ds.cloneWithRows([]),presentId:"",imgStat:""}        
        this.state = {
            ds:ds.cloneWithRows([]),
            data:ds,presentId:"",imgStat:""}        
        setInterval(()=>{          
            this.props.fetchImage();                
            // this.fetchImageToStore();
        if(this.ready == true){
            // var gg = []
            // for(var f=0;f<this.props.user.Reducers.storedImage.length;f++){
            //     gg.push(this.props.user.Reducers.storedImage[f])
            // }
            this.setState({data:this.state.ds.cloneWithRows(this.props.user.Reducers.data)});
        }  
        },2000)
    }
  async fetchImageToStore(){
      const alreadyStored = await AsyncStorage.getItem("SavedRecords");
         if (alreadyStored!==null && alreadyStored!==undefined){
                this.props.fetchStoredImage(alreadyStored);
        }
  }
  likeImage(rowID){
        // var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});      
      var newData = [];
      newData = this.state.data._dataBlob.s1.slice();
      for (var i=0;i<newData.length;i++){
        if (newData[i].ID==rowID){
            if(newData[i].LIKED=="1"){
                newData[i].LIKED="0";newData[i].NUM=newData[i].NUM-1
            }
            else if(newData[i].LIKED=="0"){
                likeImage(this.props.user.Reducers.user,rowID);
                newData[i].LIKED="1";newData[i].NUM=newData[i].NUM+1
            }
            this.setState({data:this.state.ds.cloneWithRows(newData)})
        }
      }
  }
  static navigationOptions = {
    title:"HOME",
    header:null,
  };
  getStyle(liked){
    if (liked==1){
        return "red"
    }else{
        return "blue"
    }
  }
  likeImagee(){
    //   this.setState({data:})
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
        if (this.props.user.Reducers.data.length<=0){
        return(
            <ScrollView style={{backgroundColor:"#ffffff"}}  contentContainerStyle={{flexGrow: 1,}}>
            <View>
                <Text>This is General page{JSON.stringify(this.props.user.Reducers.storedImage[0])}</Text>
                </View>
                </ScrollView>
        )
        }else{
            this.ready = true;
        return(
            <ScrollView style={{backgroundColor:"#ffffff"}}  contentContainerStyle={{flexGrow: 1,}}>
            <View>

        <ListView dataSource={this.state.data} 
                enableEmptySections={true}
                renderRow = {(rowData)=>
                 <View style={{borderBottomWidth:2,borderColor:"#e8e8e8"}}>
                     <Card>
                    <CardTitle title={rowData.Category}/>
                    <CardImage source={{uri: rowData.Blob}} style={{padding:10,backgroundColor:"white"}} title="@TGIFNAIJA"/>
                    <Row style={{paddingLeft:10}}><Icon name="thumbs-o-up" size={15} type="font-awesome" color="red" />                                             
                    <Text>  {this.ret(rowData.LIKED,rowData.NUM)} </Text></Row>
                    
                    <CardContent text={rowData.Description}/>
                    <CardAction seperator={true} inColumn={false} style={{flex:1,paddingLeft:10}}>
                        {/*<Icon  name="thumbs-o-up" type="font-awesome" color="blue" onPress={()=>{likeImage(this.props.user.Reducers.user,rowData.ID)}} />*/}
                        <Icon size={20} name="thumbs-o-up" type="font-awesome" color={this.getStyle(rowData.LIKED)} onPress={()=>{this.likeImage(rowData.ID)}} />
                        
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
                }
                 initialListSize={10}
                 pageSize={2}
                 onChangeVisibleRows={(a,b)=>{Alert.alert("Changed");}}

                 />
                </View>
                </ScrollView>
        )
        }
    }
}