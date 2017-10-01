/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,ScrollView,FlatList,SectionList,Alert,ActivityIndicator,Button,RefreshControl,
  Text,StatusBar,Switch,AsyncStorage,NativeModules,
  View,DrawerLayoutAndroid,DeviceEventEmitter
} from 'react-native';
import NavigatorApp from './androidPages/Home'
import NotificationPage from './androidPages/NotificationPage'
import configureStore from './configureStore'
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import rootReducer from './Reducers';
import {fetchUser} from './Actions/actions'
import {fetchStoredImage} from './Actions/actions'
import {Platform} from 'react-native';
import FCM, {FCMEvent, RemoteNotificationResult, WillPresentNotificationResult, NotificationType} from 'react-native-fcm';
FCM.on(FCMEvent.Notification, async (notif) => {
    // there are two parts of notif. notif.notification contains the notification payload, notif.data contains data payload
    if(notif.local_notification){
      //this is a local notification
      console.log("Clicked noww");
      // NativeModules.ActivityStarter.navigateToExample();
    }
    if(notif.opened_from_tray){
      //app is open/resumed because user clicked banner
    }
    // await someAsyncCall();
 
    if(Platform.OS ==='ios'){
      //optional
      //iOS requires developers to call completionHandler to end notification process. If you do not call it your background remote notifications could be throttled, to read more about it see the above documentation link.
      //This library handles it for you automatically with default behavior (for remote notification, finish with NoData; for WillPresent, finish depend on "show_in_foreground"). However if you want to return different result, follow the following code to override
      //notif._notificationType is available for iOS platfrom
      switch(notif._notificationType){
        case NotificationType.Remote:
        console.log("Received now");
          notif.finish(RemoteNotificationResult.NewData) //other types available: RemoteNotificationResult.NewData, RemoteNotificationResult.ResultFailed
          break;
        case NotificationType.NotificationResponse:
          notif.finish();
          break;
        case NotificationType.WillPresent:
          notif.finish(WillPresentNotificationResult.All) //other types available: WillPresentNotificationResult.None
          break;
      }
    }
});
this.notificationListener = FCM.on(FCMEvent.Notification, async (notif) => {
            // do some component related stuff
            console.log("Recived from");
        });
FCM.on(FCMEvent.RefreshToken, (token) => {
    console.log(token)
    // fcm token may not be available on first load, catch it here
});

FCM.getInitialNotification().then(notif=>{
  console.log(" Notification now is  " + JSON.stringify(notif));
  // NativeModules.ActivityStarter.navigateToExample();
});
const store = configureStore();

async function getUser(){
  try {
    //  await AsyncStorage.removeItem('Username');
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
  store.dispatch(fetchUser("",0));       
     }
    } catch (error) {
        console.log("Error occured "+error)
    }
    }
    getUser();
const ReduxApp = () => (
  <Provider store={store}>
    <NavigatorApp />
  </Provider>
)

const ReduxApp2 = () => (
  <Provider store={store}>
    <NotificationPage />
  </Provider>
)
AppRegistry.registerComponent('TGIF', () => ReduxApp);