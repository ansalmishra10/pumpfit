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

class TcScreen extends React.Component {
  render() {
    return(

      <SafeAreaProvider>

       <Header navigation={this.props.navigation}
          showHeaderImage={false}
          headerColor ={'#161718'}
          backImagePath={require('./arrowlogo2.png')}
          headerName={'Terms & Conditions'}
          headerTextStyle={{fontFamily:'Gilroy-Bold', color:'white',marginLeft:10}} />

       <View style={{flex:1}}>

          <WebView source={{ uri: 'http://pumpfit.in/term.html' }} />

       </View>
      </SafeAreaProvider>
    );
  }
}

export default TcScreen;