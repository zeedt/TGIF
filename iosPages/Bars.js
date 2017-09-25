import  React,{Component} from 'react';
import {View,DrawerLayoutAndroid,Text,List,WebView,Button,TouchableHighlight} from 'react-native';
import {StackNavigator,TabNavigator} from 'react-navigation';
import {Icon} from 'react-native-elements'

export default class Bars extends Component{
    constructor(props){
        super(props);
        this.var = false;
        this.state = {presenturl:"http://tgifnaija.com/Bars"};

    }
    
  static navigationOptions = {
    title:"BARS",
    header:null,
  };
  setError
  (){this.props.setClubError();}
     //   this.setState({error:!this.state.error});
    setCurrentUrl(webViewState){
        // alert("URL is "+webViewState.url)
        this.setState({uri:webViewState.url})
    }
   
    componentWillMount(){
        
    }
    render(){
        if(this.var==false){   
        return(
            <WebView source={{uri:this.state.presenturl}} renderError={()=>{this.var=true}} 
            renderLoading={()=>{console.log("NN"); return <Text>Loading page now</Text>}}
            onNavigationStateChange = {this.setCurrentUrl.bind(this)}
            
            />
        )
    }
    else{
        return(
            <View style={{flex:1,alignItems:"center",justifyContent:"center",backgroundColor:"#ffffff"}}>
            <TouchableHighlight onPress={()=>{this.var=false}} underlayColor="#ffffff">
                        <View style={{marginBottom:5,paddingBottom:5,flex:1,alignItems:"center",justifyContent:"center"}}>
                         <Icon  name="refresh" type="MaterialCommunityIcons" color="blue" style={{paddingLeft:10}} />
                        </View>
            </TouchableHighlight>
            </View>
        )
    }
    }
}