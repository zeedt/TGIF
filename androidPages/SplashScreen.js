import React,{Component} from 'react'
import {View,StyleSheet,Text,ActivityIndicator,ScrollView} from 'react-native'

export default class SplashScreen extends Component{
    render(){
        return(
            <ScrollView  contentContainerStyle={{flexGrow: 1,justifyContent: 'center'}}>
            <View style={styles.container}>
                <Text style={styles.textStyle}>Initialising app...</Text>
                <ActivityIndicator size="large" />
            </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:"#ffe166"
  },
  textStyle:{
      color:"green",
      fontSize:20
  }
});