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
  import {withNavigationFocus} from 'react-navigation';
 import { BackHandler } from 'react-native';
import React, {Component} from 'react';
var b = 0;
import Button from 'react-native-button';
const GLOBAL = require('./Global');
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { PulseIndicator } from 'react-native-indicators';


class HomeScreen extends React.Component {
   constructor(props) {
     super(props);

      this.state= {
           is_rotated: 0
      }
   }

   handleBackButton = () => {


     if (b == 0){
      BackHandler.exitApp()
     }


}



   onChange=()=>{
     this.setState({ is_rotated: 1 })
   }
   componentDidMount(){
     // alert(JSON.stringify(GLOBAL.user_id))
       BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
  this._unsubscribe = this.props.navigation.addListener('focus', () => {
b = 0;
  })
  this._unsubscribe = this.props.navigation.addListener('blur', () => {
 b = 1;
  })
      }
      componentWillUnmount(){
   BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
   }
   setValue =(type) =>{
     GLOBAL.category = type
     this.props.navigation.navigate('PartScreen')
   }

   onChange2=()=> {
    this.setState({ is_rotated: 0 })
   }

    render() {
    return(

      <SafeAreaProvider>
                   <StatusBar backgroundColor="black" barStyle="light-content" />

            <View style = {{height:70,backgroundColor:'black',flexDirection:'row',width:'100%',alignItems:'center'}}>
                        <View>
                        <TouchableOpacity onPress= {()=>this.handleBackButton()}>
                            <Image
                                source={require('./arrowlogo2.png')}
                                style={{width: 18, height: 20,marginLeft:20,resizeMode:'contain'}}


                            />
                        </TouchableOpacity>
                        </View>


                        <Text style = {{color:'white',fontFamily:'Exo2-Bold',fontSize: 20,marginLeft:20}}>
                            Home
                        </Text>


                        

                    </View>
          

     <View style={{height:'100%',backgroundColor:'white'}}>

     { this.state.is_rotated == 0 && (

         <View style={{backgroundColor:'white'}}>




            <Image style={{width:'80%',height:'89%',marginTop:'5%',marginLeft:'10%',resizeMode:'contain'}} source={require('./front.jpeg')}>
            </Image>


            

            <PulseIndicator color='#F9C057' size={30} style={{position: 'absolute' , top:'25%', left: '36%'}}/>

            <View style={{borderWidth:1,borderColor:'#242B37',borderStyle:'dotted',width:51,borderRadius:1,position:'absolute',top:'27%',left:98}}>
            </View>

            <TouchableOpacity style={{position:'absolute',top:'24.8%',left:16,backgroundColor:'#e3e3e3',width:80,height:24,borderRadius:4,justifyContent:'center',elevation:3}}
            onPress={()=> this.setValue('Shoulder')}>
            <Text style={{fontSize:13,fontFamily:'Gilroy-Bold',color:'#161718',alignSelf:'center'}}>Shoulders</Text>
            </TouchableOpacity>

            <PulseIndicator color='#F9C057' size={30} style={{position: 'absolute' , top:'29%', left: '41.2%'}}/>

            <View style={{borderWidth:1,borderColor:'#242B37',borderStyle:'dotted',width:71,borderRadius:1,position:'absolute',top:'31%',left:98}}>
            </View>

            <TouchableOpacity style={{position:'absolute',top:'29.8%',left:16,backgroundColor:'#e3e3e3',width:80,height:24,borderRadius:4,justifyContent:'center',elevation:3}}
            onPress={()=> this.setValue('Chest')}>
            <Text style={{fontSize:13,fontFamily:'Gilroy-Bold',color:'#161718',alignSelf:'center'}}>Chest</Text>
            </TouchableOpacity>

            <PulseIndicator color='#F9C057' size={30} style={{position: 'absolute' , top:'33%', right:'33%'}}/>

            <View style={{borderWidth:1,borderColor:'#242B37',borderStyle:'dotted',width:38,borderRadius:1,position:'absolute',top:'35%',right: 98}}>
            </View>

            <TouchableOpacity style={{position:'absolute',top:'33.4%',right:16,backgroundColor:'#e3e3e3',width:80,height:24,borderRadius:4,justifyContent:'center',elevation:3}}
      onPress={()=> this.setValue('Biceps')}>
            <Text style={{fontSize:13,fontFamily:'Gilroy-Bold',color:'#161718',alignSelf:'center'}}>Biceps</Text>
            </TouchableOpacity>


            <PulseIndicator color='#F9C057' size={30} style={{position: 'absolute' , top:'39%', left: '31.2%'}}/>

            <View style={{borderWidth:1,borderColor:'#242B37',borderStyle:'dotted',width:31,borderRadius:1,position:'absolute',top:'41%',left: 98}}>
            </View>

            <TouchableOpacity style={{position:'absolute',top:'38.5%',left:16,backgroundColor:'#e3e3e3',width:80,height:24,borderRadius:4,justifyContent:'center',elevation:3}}
                onPress={()=> this.setValue('Forearm')}>
            <Text style={{fontSize:13,fontFamily:'Gilroy-Bold',color:'#161718',alignSelf:'center'}}>Forearm</Text>
            </TouchableOpacity>

            <PulseIndicator color='#F9C057' size={30} style={{position: 'absolute' , top:'39%', right: '45%'}}/>

            <View style={{borderWidth:1,borderColor:'#242B37',borderStyle:'dotted',width:86,borderRadius:1,position:'absolute',top:'41%',right: 98}}>
            </View>

            <TouchableOpacity style={{position:'absolute',top:'39.4%',right:16,backgroundColor:'#e3e3e3',width:80,height:24,borderRadius:4,justifyContent:'center',elevation:3}}
              onPress={()=> this.setValue('Abs')}>
            <Text style={{fontSize:13,fontFamily:'Gilroy-Bold',color:'#161718',alignSelf:'center'}}>Abs</Text>
            </TouchableOpacity>

            <PulseIndicator color='#F9C057' size={30} style={{position: 'absolute' , top:'41.5%', left:'40%'}}/>

            <View style={{borderWidth:1,borderColor:'#242B37',borderStyle:'dotted',width:66,borderRadius:1,position:'absolute',top:'43.5%',left: 98}}>
            </View>

            <TouchableOpacity style={{position:'absolute',top:'42.8%',left:16,backgroundColor:'#e3e3e3',width:80,height:24,borderRadius:4,justifyContent:'center',elevation:3}}
                  onPress={()=> this.setValue('Obliques')}>
            <Text style={{fontSize:13,fontFamily:'Gilroy-Bold',color:'#161718',alignSelf:'center'}}>Obliques</Text>
            </TouchableOpacity>

            <PulseIndicator color='#F9C057' size={30} style={{position: 'absolute' , top:'53%', left: '39.2%'}}/>

            <View style={{borderWidth:1,borderColor:'#242B37',borderStyle:'dotted',width:63,borderRadius:1,position:'absolute',top:'55%',left: 98}}>
            </View>


              <TouchableOpacity style={{position:'absolute',top:'53.4%',left:16,backgroundColor:'#e3e3e3',width:80,height:24,borderRadius:4,justifyContent:'center',elevation:3}}
                    onPress={()=> this.setValue('Quads')}>
              <Text style={{fontSize:13,fontFamily:'Gilroy-Bold',color:'#161718',alignSelf:'center'}}>Quads</Text>
              </TouchableOpacity>





            <PulseIndicator color='#F9C057' size={30} style={{position: 'absolute' , top:'56%', right: '41.5%'}}/>

            <View style={{borderWidth:1,borderColor:'#242B37',borderStyle:'dotted',width:72,borderRadius:1,position:'absolute',top:'58%',right: 98}}>
            </View>

            <TouchableOpacity style={{position:'absolute',top:'56.4%',right:16,backgroundColor:'#e3e3e3',width:80,height:24,borderRadius:4,justifyContent:'center',elevation:3}}
                    onPress={()=> this.setValue('Abductors')}>
            <Text style={{fontSize:13,fontFamily:'Gilroy-Bold',color:'#161718',alignSelf:'center'}}>Abductors</Text>
            </TouchableOpacity>


             <TouchableOpacity style={{position:'absolute',bottom:'6%',left:'5%',backgroundColor:'#e3e3e3',width:150,height:35,borderRadius:5,justifyContent:'center',elevation:3}}
                    onPress={()=> this.setValue('Hiit/cardio')}>

            <Text style={{fontSize:20,fontFamily:'Gilroy-Bold',color:'#161718',alignSelf:'center'}}>HIIT/CARDIO</Text>
            </TouchableOpacity>


            <TouchableOpacity style={{position:'absolute',bottom:'4%',right:'5%'}}
           onPress={()=>this.onChange()}>
            <Image source={require('./rotate.png')}
            style={{width:70,height:70,resizeMode:'contain'}}/>
           </TouchableOpacity>
            



         </View>

         )}

         { this.state.is_rotated == 1 && (

           <View style={{backgroundColor:'white'}}>

           <Image style={{width:'80%',height:'86%',marginTop:'6%',marginLeft:'10%',resizeMode:'contain'}} source={require('./back.jpeg')}>
           </Image>

           <PulseIndicator color='#F9C057' size={30} style={{position: 'absolute' , top:'19.8%', left: 145}}/>

           <View style={{borderWidth:1,borderColor:'#242B37',borderStyle:'dotted',width:54,borderRadius:1,position:'absolute',top:'21.8%',left:98}}>
           </View>

           <TouchableOpacity style={{position:'absolute',top:'20.2%',left:16,backgroundColor:'#e3e3e3',width:80,height:24,borderRadius:4,justifyContent:'center',elevation:3}}
                    onPress={()=> this.setValue('Traps')}>
           <Text style={{fontSize:13,fontFamily:'Exo2-SemiBold',color:'#161718',alignSelf:'center'}}>Traps</Text>
           </TouchableOpacity>

           <PulseIndicator color='#F9C057' size={30} style={{position: 'absolute' , top:'30.8%', left: 120}}/>

           <View style={{borderWidth:1,borderColor:'#242B37',borderStyle:'dotted',width:28,borderRadius:1,position:'absolute',top:'32.8%',left:98}}>
           </View>

           <TouchableOpacity style={{position:'absolute',top:'31.2%',left:16,backgroundColor:'#e3e3e3',width:80,height:24,borderRadius:4,justifyContent:'center',elevation:3}}
                          onPress={()=> this.setValue('Triceps')}>
           <Text style={{fontSize:13,fontFamily:'Exo2-SemiBold',color:'#161718',alignSelf:'center'}}>Triceps</Text>
           </TouchableOpacity>

           <PulseIndicator color='#F9C057' size={30} style={{position: 'absolute' , top:'27.2%', right: 133}}/>

           <View style={{borderWidth:1,borderColor:'#242B37',borderStyle:'dotted',width:42,borderRadius:1,position:'absolute',top:'29.2%',right:98}}>
           </View>

           <TouchableOpacity style={{position:'absolute',top:'27.6%',right:16,backgroundColor:'#e3e3e3',width:80,height:24,borderRadius:4,justifyContent:'center',elevation:3}}
                    onPress={()=> this.setValue('Lats')}>
           <Text style={{fontSize:13,fontFamily:'Exo2-SemiBold',color:'#161718',alignSelf:'center'}}>Lats</Text>
           </TouchableOpacity>




           <PulseIndicator color='#F9C057' size={30} style={{position: 'absolute' , top:'37.4%', right: 175}}/>

           <View style={{borderWidth:1,borderColor:'#242B37',borderStyle:'dotted',width:84,borderRadius:1,position:'absolute',top:'39.4%',right:98}}>
           </View>

           <TouchableOpacity style={{position:'absolute',top:'37.8%',right:16,backgroundColor:'#e3e3e3',width:80,height:24,borderRadius:4,justifyContent:'center',elevation:3}}
                onPress={()=> this.setValue('Lower Back')}>
           <Text style={{fontSize:13,fontFamily:'Exo2-SemiBold',color:'#161718',alignSelf:'center'}}>Lower Back</Text>
           </TouchableOpacity>

           <PulseIndicator color='#F9C057' size={30} style={{position: 'absolute' , top:'52%', left:155.5}}/>

           <View style={{borderWidth:1,borderColor:'#242B37',borderStyle:'dotted',width:64,borderRadius:1,position:'absolute',top:'54%',left:98}}>
           </View>

           <TouchableOpacity style={{position:'absolute',top:'52.4%',left:16,backgroundColor:'#e3e3e3',width:80,height:24,borderRadius:4,justifyContent:'center',elevation:3}}
                  onPress={()=> this.setValue('Hamstrings')}>
           <Text style={{fontSize:13,fontFamily:'Exo2-SemiBold',color:'#161718',alignSelf:'center'}}>Hamstrings</Text>
           </TouchableOpacity>

           <PulseIndicator color='#F9C057' size={30} style={{position: 'absolute' , top:'67.8%', left: 148}}/>

           <View style={{borderWidth:1,borderColor:'#242B37',borderStyle:'dotted',width:58,borderRadius:1,position:'absolute',top:'69.8%',left:98}}>
           </View>


             <TouchableOpacity style={{position:'absolute',top:'68.2%',left:16,backgroundColor:'#e3e3e3',width:80,height:24,borderRadius:4,justifyContent:'center',elevation:3}}
                  onPress={()=> this.props.navigation.navigate('PartScreen',"Calves")}>
             <Text style={{fontSize:13,fontFamily:'Exo2-SemiBold',color:'#161718',alignSelf:'center'}}>Calves</Text>
             </TouchableOpacity>



           <PulseIndicator color='#F9C057' size={30} style={{position: 'absolute' , top:'48.6%', right:140}}/>

           <View style={{borderWidth:1,borderColor:'#242B37',borderStyle:'dotted',width:48,borderRadius:1,position:'absolute',top:'50.6%',right:98}}>
           </View>

           <TouchableOpacity style={{position:'absolute',top:'49%',right:16,backgroundColor:'#e3e3e3',width:80,height:24,borderRadius:4,justifyContent:'center',elevation:3}}
                 onPress={()=> this.setValue('Glutes')}>
                <Text style={{fontSize:13,fontFamily:'Exo2-SemiBold',color:'#161718',alignSelf:'center'}}>Glutes</Text>
           </TouchableOpacity>




           <TouchableOpacity style={{position:'absolute',bottom:'1%',right:'5%'}}
           onPress={()=>this.onChange2()}>
            <Image source={require('./rotate.png')}
            style={{width:70,height:70,resizeMode:'contain'}}/>
           </TouchableOpacity>
            




           </View>

         )}
         
          </View>
         </SafeAreaProvider>
    );
  }
}

export default HomeScreen;

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