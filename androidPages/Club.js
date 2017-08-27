import  React,{Component} from 'react';
import {View,DrawerLayoutAndroid,Text,List,WebView,Button} from 'react-native';
import {StackNavigator,TabNavigator} from 'react-navigation';

export default class Clubs extends Component{
    constructor(props){
        super(props);
        this.var = false;
        // this.state = {error:false};

    }
    
  static navigationOptions = {
    title:"CLUBS",
    header:null,
  };
  setError
  (){this.props.setClubError();}
     //   this.setState({error:!this.state.error});
    
   
    componentWillMount(){
        
    }
    render(){
        if(this.var==false){   
        return(
            <WebView source={{uri:"http://tgifnaija.com/clubs"}} renderError={()=>{this.var=true}} />
        )
    }
    else{
        return(
            <View>
            <Text>Error occured</Text>
            <Button title="reload" onPress={()=>{this.var = false}} />
            </View>
        )
    }
    }
}