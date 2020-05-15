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
  Dimensions,
  AsyncStorage,




  } from 'react-native';
import Loader from './Loader.js';
import React, {Component} from 'react';
import Button from 'react-native-button';
const GLOBAL = require('./Global');
import { WebView } from 'react-native-webview';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { PulseIndicator } from 'react-native-indicators';
import VideoPlayer from 'react-native-video-controls';


class ExerciseScreen extends React.Component {
  constructor(props) {
 super(props);

      this.state={
        loading:'',
        
 }
   }

    componentDidMount () {
      // alert(JSON.stringify(GLOBAL.worklevel))
    }


  render() {
    if(this.state.loading){
            return(
                <Loader>

                </Loader>

            )
        }

     var str = GLOBAL.worklevel
      var res = str.split(",");

      const renderedButtons =  res.map((b, index) => {
         return <View style={{width:92,height:28,borderRadius:3,backgroundColor:'#161718',justifyContent:'center',marginLeft:12}}>
            <Text style={{fontSize: 12, color: 'white',fontFamily:'Gilroy-Bold',alignSelf:'center'}}>{b}</Text>
          </View>

         

       })


      var str2 = GLOBAL.workgrp
      var news = str2.split(",");

      const renderedButton1 =  news.map((a, index) => {
         return <View style={{width:92,height:28,borderRadius:3,backgroundColor:'#161718',justifyContent:'center',marginLeft:12}}>
                      <Text style={{fontSize: 12, color: 'white',fontFamily:'Gilroy-Bold',alignSelf:'center'}}>{a}</Text>
                </View>

       })


       var str3 = GLOBAL.workequip
      var weigh = str3.split(",");

      const renderedButton2 =  weigh.map((c, index) => {
         return <View style={{width:128,height:28,borderRadius:3,backgroundColor:'#161718',justifyContent:'center',marginLeft:12}}>
                      <Text style={{fontSize: 12, color: 'white',fontFamily:'Gilroy-Bold',alignSelf:'center'}}>{c}</Text>
                </View>

       })


       

    return(

      <SafeAreaProvider>
                      <StatusBar backgroundColor="black" barStyle="light-content" />
            <ScrollView style={{flex:1,backgroundColor:'white'}}>


             <View  style={{width:'100%',height:Dimensions.get('window').height/2-20,resizeMode:'contain'}}>
               

               
               
               <VideoPlayer
             source={{ uri: GLOBAL.workvideo }}
             navigator={ this.props.navigator }
             repeat
             onBack={()=>this.props.navigation.goBack()}
             />
               
                
        
      
             </View>










              <Text style={{fontSize:22,fontFamily:'Gilroy-Bold',color:'#000000',marginTop:12,marginLeft:'5%',width:'90%'}}>{GLOBAL.workname2}</Text>

              <Text style={{fontSize:14,fontFamily:'Gilroy-Bold',color:'#00000066',marginTop:5,marginLeft:'5%',width:'90%'}}>{GLOBAL.worktime}</Text>

              <Text style={{fontSize:20,fontFamily:'Exo2-Medium',color:'#0000004D',marginTop:15,marginLeft:'5%'}}>Level</Text>

              <View style={{flexDirection:'row',alignItems:'center',width:'80%',marginTop:12,marginLeft:7}}>
               {renderedButtons}


              </View>

              <Text style={{fontSize:20,fontFamily:'Exo2-Medium',color:'#0000004D',marginTop:15,marginLeft:'5%'}}>Muscle groups</Text>

              <View style={{flexDirection:'row',alignItems:'center',width:'90%',marginTop:12,marginLeft:7}}>

                {renderedButton1}

              </View>

              <Text style={{fontSize:20,fontFamily:'Exo2-Medium',color:'#0000004D',marginTop:15,marginLeft:'5%'}}>Equipment Required</Text>

              <View style={{flexDirection:'row',alignItems:'center',width:'90%',marginTop:12,marginLeft:7}}>

                {renderedButton2}

              </View>

              


            </ScrollView>
         </SafeAreaProvider>
    );
  }
}

export default ExerciseScreen;
const styles = StyleSheet.create({

    container: {
        flex:1,
        backgroundColor :'white',

    },
    containers: {

        backgroundColor :'white'
    },
    AndroidSafeArea: {
       flex: 0,
       backgroundColor:'black',
       paddingTop: Platform.OS === "android" ? 0 : 0
   },
    loading: {
        position: 'absolute',
        left: window.width/2 - 30,

        top: window.height/2,

        opacity: 0.5,

        justifyContent: 'center',
        alignItems: 'center'
    },

})