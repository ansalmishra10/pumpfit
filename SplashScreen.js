import {
  SafeAreaView,
  Platform,
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
  Linking,
  FlatList,
  AsyncStorage,
  Dimensions,




  } from 'react-native';
  const GLOBAL = require('./Global');

import React, {Component} from 'react';






class SplashScreen extends React.Component {



  


  getData = async () => {
    try {
      const value = await AsyncStorage.getItem('userID')
      if(value !== null) {
        // value previously stored
        GLOBAL.user_id = value
          this.props.navigation.navigate('Tab')
      }else{
          this.props.navigation.navigate('StyleScreen')

      }
    } catch(e) {
      // error reading value
    }
  }

     componentDidMount () {

     this.timeoutCheck = setTimeout(() => {
       this.getData()
    //   this.props.navigation.navigate('StyleScreen')

  },1000);
  


   }





   render() {
    
   return (


       <View style={{backgroundColor:'transparent'}}>

        <ImageBackground style={{resizeMode:'cover',height:'100%',width:'100%'}} source={require('./Splash.jpeg')}>

                                            
                            
              

        </ImageBackground>          


            
       </View>


   );
 }
}

export default SplashScreen;