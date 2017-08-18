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
        this.state = {data:ds.cloneWithRows([])}        
        setInterval(()=>{          
            this.props.fetchImage();                
            this.fetchImageToStore();
        if(this.ready == true){
            var gg = []
            for(var f=0;f<this.props.user.Reducers.storedImage.length;f++){
                gg.push(this.props.user.Reducers.storedImage[f])
            }
            this.setState({data:ds.cloneWithRows(gg)});
        }  
        },2000)
    }
  async fetchImageToStore(){
      const alreadyStored = await AsyncStorage.getItem("SavedRecords");
         if (alreadyStored!==null && alreadyStored!==undefined){
                this.props.fetchStoredImage(alreadyStored);
        }
  }
  static navigationOptions = {
    title:"HOME",
    header:null,
  };
    render(){
        if (this.props.user.Reducers.storedImage.length<=0){
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
                    <Text>{rowData.NUM} likes </Text>
                    <CardContent text={rowData.Description}/>
                    <CardAction seperator={true} inColumn={false} style={{flex:1}}>
                        <Icon raised name="heartbeat" type="font-awesome" color="blue" onPress={()=>{likeImage(this.props.user.Reducers.user,rowData.ID)}} />
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