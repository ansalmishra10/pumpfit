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


import React, {Component} from 'react';
import Button from 'react-native-button';
const GLOBAL = require('./Global');
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { WebView } from 'react-native-webview';
import VideoPlayer from 'react-native-video-controls';




class VideoScreen extends React.Component {
  constructor(props) {
    super(props);
     this.state={
       imageget:0,
       button_one:0,
       button_two:0,
       value:0
       
       

     }
  }



  

  


  onChangeButton1=()=> {
  this.setState({ imageget:0})
    this.setState({ button_one:0 });
    this.setState({ button_two:1 });
    
    }


  onChangeButton2=()=> {
    this.setState({ imageget:1});
    this.setState({ button_one:1 });
    this.setState({ button_two:0 });
    

  }



  

  componentDidMount () {
      
      // alert(JSON.stringify(GLOBAL.video))
    this.onChangeButton1();
  //  this.setState({button_one:1})
  // <VideoPlayer
  //             source={{ uri:GLOBAL.video }}
  //             navigator={ this.props.navigator }
  //             repeat = {true}
  //             onBack={()=>this.props.navigation.goBack()}
  //         />
     
      
  }


  render() {

        console.log(GLOBAL.video)
  return(
   
     <SafeAreaProvider>

      <StatusBar backgroundColor="black" barStyle="light-content" />
       

      

{this.state.imageget==0  && (   


     <View style={{flex:1,backgroundColor:'white'}}>

          <View style={{width:'100%',height:Dimensions.get('window').height-200}}>
          
              
            

            <VideoPlayer
             source={{ uri: GLOBAL.video }}
             navigator={ this.props.navigator }
             repeat
             onBack={()=>this.props.navigation.goBack()}
             />
              

        </View>
           
            
 
 <View style={{flexDirection:'row',marginLeft:'5%',width:'90%',alignItems:'center',justifyContent:'space-between',marginTop:16}}>
 <View style={{flexDirection:'row',height:42,width:'48%',backgroundColor:'#161718',alignItems:'center',borderRadius:6}}>

   <Image source={require('./dolle.png')}
    style={{width:21,height:22,resizeMode:'contain',marginLeft:8}}/>

    <View style={{flexDirection:'column',marginLeft:15,textAlign:'left'}}>
    <Text style={{fontSize:15,fontFamily:'Exo2-Medium',color:'white'}}>Body Parts</Text>
    <Text style={{fontSize:13,fontFamily:'Exo2-Regular',color:'#FFFFFF66',marginTop:-2}}>{GLOBAL.parts}</Text>
    </View>
 </View>

 <View style={{flexDirection:'row',height:42,width:'48%',backgroundColor:'#161718',alignItems:'center',borderRadius:6}}>

 <Image source={require('./dumbbel.png')}
  style={{width:24,height:13,resizeMode:'contain',marginLeft:9}}/>

  <View style={{flexDirection:'column',marginLeft:15,textAlign:'left'}}>
  <Text style={{fontSize:15,fontFamily:'Exo2-Medium',color:'white'}}>You Need</Text>
  <Text style={{fontSize:13,fontFamily:'Exo2-Regular',color:'#FFFFFF66',marginTop:-3,width:'100%'}}>{GLOBAL.needs}</Text>
  </View>

 </View>
 </View>      


     <View style={{flexDirection:'row',marginLeft:'5%',width:'90%',alignItems:'center',justifyContent:'space-between',marginTop:25}}>


           
            { this.state.button_one == 0 && (
            <TouchableOpacity style={{flexDirection:'row',height:34,width:'31.5%',backgroundColor:'#16171866',alignItems:'center',borderRadius:6}}
            onPress={()=>this.onChangeButton2()}>

               <Image source={require('./gallery.png')}
                style={{height:16,width:16,resizeMode:'contain',marginLeft:8}} />

                <Text style={{fontSize:17,fontFamily:'Exo2-Regular',color:'#FFFFFF',marginLeft:18}}>IMAGE</Text>
            </TouchableOpacity>

            )}


            { this.state.button_one == 1 && (
              <TouchableOpacity style={{flexDirection:'row',height:34,width:'31.5%',backgroundColor:'#161718',alignItems:'center',borderRadius:6}}>

                 <Image source={require('./gallery.png')}
                  style={{height:16,width:16,resizeMode:'contain',marginLeft:8}} />

                  <Text style={{fontSize:17,fontFamily:'Exo2-Regular',color:'#FFFFFF',marginLeft:18}}>IMAGE</Text>
              </TouchableOpacity>
            )}


              { this.state.button_two == 0 && (
              <TouchableOpacity style={{flexDirection:'row',height:34,width:'31.5%',backgroundColor:'#16171866',alignItems:'center',borderRadius:6}}
            onPress={()=>this.onChangeButton1()}>

            <Image source={require('./youtube2.png')}
             style={{height:22,width:16,resizeMode:'contain',marginLeft:8}} />

             <Text style={{fontSize:17,fontFamily:'Exo2-Regular',color:'#FFFFFF',marginLeft:18}}>VIDEO</Text>

            </TouchableOpacity>

             )}

           
               { this.state.button_two == 1 && (
           
              <TouchableOpacity style={{flexDirection:'row',height:34,width:'31.5%',backgroundColor:'#161718',alignItems:'center',borderRadius:6}}
              >

              <Image source={require('./youtube2.png')}
               style={{height:22,width:16,resizeMode:'contain',marginLeft:8}} />

               <Text style={{fontSize:17,fontFamily:'Exo2-Regular',color:'#FFFFFF',marginLeft:18}}>VIDEO</Text>

              </TouchableOpacity>
               
               )} 


             </View>  
           
 
      </View>

 )}

  

 {this.state.imageget==1  && (
 
                      
     <>



                   <View style = {{height:70,backgroundColor:'black',flexDirection:'row',width:'100%',alignItems:'center'}}>
                        <View>
                        <TouchableOpacity onPress= {()=>this.props.navigation.goBack()}>
                            <Image
                                source={require('./arrowlogo2.png')}
                                style={{width: 18, height: 20,marginLeft:20,resizeMode:'contain'}}


                            />
                        </TouchableOpacity>
                        </View>


                        <Text style = {{color:'white',fontFamily:'Exo2-Bold',fontSize: 20,marginLeft:20,width:'80%'}}>
                            {GLOBAL.partname}
                        </Text>


                        

                    </View>

      <View style={{flex:1,backgroundColor:'white'}}>          
         


        <Image source={{uri: GLOBAL.image}}
          style={{width:'100%',height:Dimensions.get('window').height-200,resizeMode:'contain'}}  />



        <View style={{flexDirection:'row',marginLeft:'5%',width:'90%',alignItems:'center',justifyContent:'space-between'}}>


           
            { this.state.button_one == 0 && (
            <TouchableOpacity style={{flexDirection:'row',height:34,width:'31.5%',backgroundColor:'#16171866',alignItems:'center',borderRadius:6}}
            onPress={()=>this.onChangeButton2()}>

               <Image source={require('./gallery.png')}
                style={{height:16,width:16,resizeMode:'contain',marginLeft:8}} />

                <Text style={{fontSize:17,fontFamily:'Exo2-Regular',color:'#FFFFFF',marginLeft:18}}>IMAGE</Text>
            </TouchableOpacity>

            )}


            { this.state.button_one == 1 && (
              <TouchableOpacity style={{flexDirection:'row',height:34,width:'31.5%',backgroundColor:'#161718',alignItems:'center',borderRadius:6}}>

                 <Image source={require('./gallery.png')}
                  style={{height:16,width:16,resizeMode:'contain',marginLeft:8}} />

                  <Text style={{fontSize:17,fontFamily:'Exo2-Regular',color:'#FFFFFF',marginLeft:18}}>IMAGE</Text>
              </TouchableOpacity>
            )}


              { this.state.button_two == 0 && (
              <TouchableOpacity style={{flexDirection:'row',height:34,width:'31.5%',backgroundColor:'#16171866',alignItems:'center',borderRadius:6}}
            onPress={()=>this.onChangeButton1()}>

            <Image source={require('./youtube2.png')}
             style={{height:22,width:16,resizeMode:'contain',marginLeft:8}} />

             <Text style={{fontSize:17,fontFamily:'Exo2-Regular',color:'#FFFFFF',marginLeft:18}}>VIDEO</Text>

            </TouchableOpacity>

             )}

           
               { this.state.button_two == 1 && (
           
              <TouchableOpacity style={{flexDirection:'row',height:34,width:'31.5%',backgroundColor:'#161718',alignItems:'center',borderRadius:6}}>

              <Image source={require('./youtube2.png')}
               style={{height:22,width:16,resizeMode:'contain',marginLeft:8}} />

               <Text style={{fontSize:17,fontFamily:'Exo2-Regular',color:'#FFFFFF',marginLeft:18}}>VIDEO</Text>

              </TouchableOpacity>
               
               )} 


             </View>
           </View>

           </>


            )}


          



 </SafeAreaProvider>

 

  );
 }
}

export default VideoScreen;
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