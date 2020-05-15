import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Alert,
  TouchableOpacity,
  TextInput,
  Image,
  ImageBackground,
  TouchableHighlight,
  Linking,
  FlatList,
  Dimensions,



  } from 'react-native';


import React, {Component} from 'react';
import Button from 'react-native-button';
import { WebView } from 'react-native-webview';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Header from 'react-native-custom-headers';

class T&cScreen extends React.Component {
  render() {
    return(

      <SafeAreaProvider>
       <View style={{flex:1}}>

          <WebView source={{ uri: 'http://pumpfit.in/term.html' }} />

       </View>
      </SafeAreaProvider>
    );
  }
}

export default T&cScreen;