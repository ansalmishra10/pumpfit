/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
 import 'react-native-gesture-handler';
 import React, {Component} from 'react';
 import {Platform, StyleSheet, Text, View, StatusBar, AsyncStorage} from 'react-native';
 import AppNavigator from './Navigator.js';
 import PushNotification from 'react-native-push-notification';
 import appConfig from './app.json';
 import NotifService from './NotifService';

 





 const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
      'Double tap R on your keyboard to reload,\n' +
      'Shake or press menu button for dev menu',
 });

 type Props = {};
 export default class App extends Component<Props> {
  constructor(props) {
      super(props);
      this.state = {
        senderId: appConfig.senderID,
        gotNotif:0
      };

      this.notif = new NotifService(this.onRegister.bind(this), this.onNotif.bind(this));
    //  this.notif.localNotif()
    }

  render() {
   //StatusBar.setBarStyle('light-content', true);
    return (
<>
      <StatusBar backgroundColor="black" barStyle="light-content" />
        <AppNavigator/>
        </>
    );
    }

    onRegister(token) {
      AsyncStorage.setItem('token', token.token);
      GLOBAL.firebaseToken= token.token
      console.log( 'TOKEN:', token );
      this.setState({ registerToken: token.token, fcmRegistered: true });
    }

    onNotif(notif) {
      console.log(notif);
//      Alert.alert(notif.title, notif.message);
      this.setState({gotNotif: 1})
    }

    handlePerm(perms) {
      Alert.alert("Permissions", JSON.stringify(perms));
    }
  
 }
