import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  ScrollView,
  FlatList,
  SectionList,
  Alert,
  ActivityIndicator,
  Button,
  RefreshControl,
  Text,
  StatusBar,
  Switch,
  View,AsyncStorage,
  DrawerLayoutAndroid
} from 'react-native';
import { connect } from 'react-redux';
import { addUser } from './../Actions/actions'
import { fetchUser } from './../Actions/actions'
import { setLoadTime } from './../Actions/actions'
import {StackNavigator} from 'react-navigation'
import Login from './Login'
import HomePage from './HomePage'
import ListCard from './listCard'
import General2 from './General2'
import {likeImage } from './../Actions/actions'

const dispatchToProps = (dispatch) => {
  return {
    adduser: (params) => dispatch(addUser()),
    fetchUser: (params) => dispatch(fetchUser(params)),
    setLoadTime: () => dispatch(setLoadTime()),
    likeImage:(id)=>dispatch(likeImage(id))
  }
}
const mapStateToProps = (state) => ({
  user: state
})

const GeneralScreen = connect(mapStateToProps,dispatchToProps)(General2);
const LoginScreen = connect(mapStateToProps,dispatchToProps)(Login);
const ListScreen = connect(mapStateToProps,dispatchToProps)(ListCard);

const NavigatorApp = StackNavigator({
  Login: {screen: LoginScreen},
  HomePage: {screen: HomePage},
  General2: {screen: GeneralScreen},
  ListCard: {screen: ListScreen},
});
export default NavigatorApp
