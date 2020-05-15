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

  import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';



import React, {Component} from 'react';
import Loader from './Loader.js';

import Button from 'react-native-button';

const GLOBAL = require('./Global');

import { SafeAreaProvider } from 'react-native-safe-area-context';

import { PulseIndicator } from 'react-native-indicators';



class FullbodyScreen extends React.Component {

constructor(props) {

 super(props);



      this.state={

        loading:'',

        name:'',

        images: '',

        mystatus:'',



        FlatListItems: [],

 }

   }



   showLoading() {



    this.setState({loading: true})

   }



    hideLoading() {

    this.setState({loading: false})

   }



navigate=(video, level, muscle_group, equipment_required, work_out_name, duration)=> {

    GLOBAL.workname2 = work_out_name

    GLOBAL.worktime = duration

    GLOBAL.workvideo = video

    GLOBAL.worklevel = level

    GLOBAL.workgrp = muscle_group

    GLOBAL.workequip = equipment_required

  this.props.navigation.navigate('ExerciseScreen')



}







   renderItem=({item}) => {

 return(

  <View>

   <TouchableOpacity style={{width:'90%',marginTop:20,marginLeft:'5%'}}

   onPress={()=>this.navigate(item.video, item.level, item.muscle_group, item.equipment_required, item.work_out_name, item.duration)}>



      <View style={{flexDirection:'row'}}>



         <Image source={{ uri: item.image}}

          style={{width:100,height:100,resizeMode:'cover',borderRadius:8}}/>



          <View style={{flexDirection:'column',marginLeft:15,width:'70%'}}>



          <Text style={{fontSize:20,fontFamily:'Gilroy-Bold',color:'#161718',marginTop:12,width:'100%'}}>{item.work_out_name}</Text>

          <Text style={{fontSize:12,fontFamily:'Gilroy-Bold',color:'#00000066',marginTop:5}}>{item.duration}</Text>



         </View>









      </View>









   </TouchableOpacity>
   



  </View>



  );

 }



  componentDidMount() {

      // alert(JSON.stringify(GLOBAL.workid))



    this.showLoading()

       fetch('http://pumpfit.in/admin/webservices/getExercise', {

         method: 'POST',

        headers: {

            'x-api-key': 'c3a3cf7c211b7c07b2495d8aef9761fc',

            'Content-Type': 'application/json'

        },

        body: JSON.stringify({

            user_id: GLOBAL.user_id,

            week: GLOBAL.week,

            package_id: GLOBAL.package_id,

            work_out_type: GLOBAL.workid



        }),

    }).then((response) => response.json())

        .then((responseJson) => {



            //    alert(JSON.stringify(responseJson))
            this.setState({ mystatus : responseJson.status})

             

             // alert(JSON.stringify(this.state.mystatus))



              this.hideLoading()

              if (responseJson.status == true) {

                  this.setState({FlatListItems: responseJson.workout})

                     // alert(JSON.stringify(this.state.FlatListItems))



              }

              else{

                 // alert('Invalid Credentials!')

              }

        })

        .catch((error) => {

            console.error(error);

        });

}



 _keyExtractor=(item, index)=>item.key;



  render() {
    
    if(this.state.loading){
            return(
                <Loader>

                </Loader>

            )
        }


  return(

    <SafeAreaProvider>

                    <StatusBar backgroundColor="black" barStyle="light-content" />


                      <View style = {{height:70,backgroundColor:'black',flexDirection:'row',width:'100%',alignItems:'center'}}>
                        <View>
                        <TouchableOpacity onPress= {()=>this.props.navigation.goBack()}>
                            <Image
                                source={require('./arrowlogo2.png')}
                                style={{width: 18, height: 20,marginLeft:20,resizeMode:'contain'}}


                            />
                        </TouchableOpacity>
                        </View>


                        <Text style = {{color:'white',fontFamily:'Exo2-Bold',fontSize: 20,marginLeft:20}}>
                           {GLOBAL.workid}
                        </Text>


                        

                    </View>



                    
           {this.state.mystatus == true && (


                    

            <View style={{flex:1,backgroundColor:'white'}}>

            


            <FlatList style={{height:'90%'}}

             data={this.state.FlatListItems}



             keyExtractor={this._keyExtractor}

             renderItem={this.renderItem}

              />






            










            </View>


             )}


            {this.state.mystatus == false && (
             <View style={{flex:1,backgroundColor:'white',justifyContent:'center',alignItems:'center'}}> 
           <Image style={{height:100,width:100,resizeMode:'contain',borderRadius:8,alignSelf:'center'}}
             source={require('./nodata.png')} />

           <Text style={{fontSize:15,fontFamily:'Exo2-Medium',color:'black',marginTop:10}}>No Data Found</Text>  

          </View>
          

           )}

            

          </SafeAreaProvider>

  );

  }

}



export default FullbodyScreen;

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