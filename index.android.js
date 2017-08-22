/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,ScrollView,FlatList,SectionList,Alert,ActivityIndicator,Button,RefreshControl,
  Text,StatusBar,Switch,AsyncStorage,
  View,DrawerLayoutAndroid
} from 'react-native';
import NavigatorApp from './androidPages/Home'
import configureStore from './configureStore'
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import rootReducer from './Reducers';
import {fetchUser} from './Actions/actions'
import {fetchStoredImage} from './Actions/actions'
const store = configureStore();
async function getUser(){
  try {
    //  await AsyncStorage.removeItem('SavedRecords');
    //  await AsyncStorage.removeItem('lastfetchedID');
  // const alreadyStored = await AsyncStorage.getItem("SavedRecords");
  
  // if (alreadyStored!=null){
  //   store.dispatch(fetchStoredImage(alreadyStored));
  // }
  // const lastfetchedId = await AsyncStorage.getItem('lastfetchedID');  
  const value = await AsyncStorage.getItem('Username');
  
  if (value !== null){
    // if(lastfetchedId!=null && lastfetchedId!=undefined){
    //   store.dispatch(fetchUser(value,0));
    // }else{
      store.dispatch(fetchUser(value,0));      
    // }
     }else{
  store.dispatch(fetchUser(""));       
     }
    } catch (error) {
        alert("Error occured "+error)
    }
    }
    getUser();
const ReduxApp = () => (
  <Provider store={store}>
    <NavigatorApp />
  </Provider>
)
AppRegistry.registerComponent('TGIF', () => ReduxApp);