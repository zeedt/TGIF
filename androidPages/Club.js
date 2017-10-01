import  React,{Component} from 'react';
import {View,DrawerLayoutAndroid,Text,List,WebView,Button,TouchableHighlight} from 'react-native';
import {StackNavigator,TabNavigator} from 'react-navigation';
import {Icon} from 'react-native-elements'

export default class Clubs extends Component{
    constructor(props){
        super(props);
        this.var = false;
        this.state = {presenturl:"http://tgifnaija.com/clubs"};

    }
    
  static navigationOptions = {
    title:"CLUBS",
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
                        <View style={{marginBottom:5,paddingBottom:5,flex:1,alignItems:"center",justifyContent:"center"}}>
                            <Text>Error loading page</Text>
                         <Icon  name="refresh" size={40} type="MaterialCommunityIcons" color="blue" style={{paddingLeft:10}} onPress={()=>{this.var=false}} />
                        </View>
            </View>
        )
    }
    }
}