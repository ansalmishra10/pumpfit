

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
  TouchableHighlight,
  TextInput,
  Modal,
  Image,
  ImageBackground,
  Linking,
  FlatList,
  AsyncStorage,
  Dimensions,




  } from 'react-native';

    import Loader from './Loader.js';

import React, {Component} from 'react';
import Button from 'react-native-button';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import ImagePicker from 'react-native-image-picker';
const GLOBAL = require('./Global');
const options = {
title: 'Select Avatar',

storageOptions: {
  skipBackup: true,
  path: 'images',
},
};
class EditScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      gender:'',
      age:'',
      weight:'',
      height:'',
      avatarSource: '',
     imageget:0,
     loading:false,

    }

  }

  showLoading() {
this.setState({loading: true})
}

hideLoading() {
this.setState({loading: false})
}


   changeImage=()=> {



ImagePicker.showImagePicker(options, (response) => {
  console.log('Response = ', response);

  if (response.didCancel) {
    console.log('User cancelled image picker');
  } else if (response.error) {
    console.log('ImagePicker Error: ', response.error);
  } else if (response.customButton) {
    console.log('User tapped custom button: ', response.customButton);
  } else {
    const source = { uri: response.uri };

    // You can also display the image using data:
    // const source = { uri: 'data:image/jpeg;base64,' + response.data };

    this.setState({
      avatarSource: source.uri,
    });
    this.setState({
      imageget: 1,
    });

  }
});
}

  buttonClickListener = () =>{




  if (this.state.name=='') {
     alert('Enter Name')
  }

  else if (this.state.age=='') {
     alert('Enter Your Age')
  }
   else if (this.state.weight=='') {
     alert('Enter Your Weight')
  }
  else if (this.state.height=='') {
     alert('Enter Your Height')
  }


  else {
this.showLoading()
    const url = 'http://pumpfit.in/admin/webservices/edit_user_profile'
          const data = new FormData();
          data.append('user_id', GLOBAL.user_id);
          data.append('name', this.state.name);
          data.append('email_id', GLOBAL.email);
          data.append('height', this.state.height);
          data.append('weight', this.state.weight);
          data.append('age', this.state.age);
          data.append('flag', this.state.imageget);



          data.append('image', {
              uri: this.state.avatarSource,
              type: 'image/jpeg', // or photo.type
              name: 'image.png'
          });

          // console.log(JSON.stringify(data))
          fetch(url, {
              method: 'post',
              body: data,
              headers: {
                  'x-api-key':'c3a3cf7c211b7c07b2495d8aef9761fc',
                     'Content-Type': 'multipart/form-data',
              }

          }).then((response) => response.json())
              .then((responseJson) => {
                         this.hideLoading()


                   this.props.navigation.goBack()


                  alert('Profile successfully Edited')



              });
      }
  }



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
                           Edit Profile
                        </Text>


                        

                    </View>


                      
                      <KeyboardAwareScrollView
                       keyboardShouldPersistTaps = 'always'

                       style={{flex:1,backgroundColor: 'white'}} >

                       <TouchableOpacity onPress={()=> this.changeImage()}>
                      {this.state.avatarSource=='' && (
                      <Image  style = {{width:120, height:120,borderRadius:60 ,alignSelf:'center', marginTop:'5%',}}
                      source={require('./propic.png')}/>
                        )}
                      {this.state.avatarSource!='' && (
                      <Image  style = {{width:120, height:120,borderRadius:60, alignSelf:'center', marginTop:'5%', }}
                      source={{uri: this.state.avatarSource}}/>
                        )}
                      </TouchableOpacity>

       <Text style={{fontSize:20,fontFamily:'Gilroy-Bold',color:'#161718',alignSelf:'center',marginTop:13}}>Change Photo</Text>

       <Text style={{fontSize:17,fontFamily:'Gilroy-Bold',color:'#00000050',marginTop:48,marginLeft:'8%'}}>Name</Text>

       <TextInput
         style={{fontSize:21,fontFamily:'Gilroy-Bold',color:'#000000',width:'86%',height:46,marginLeft:'7.2%',marginTop:3}}
         placeholder="name"
         placeholderTextColor="#000000"
         maxLength={40}
         onChangeText={(text) => this.setState({name: text})}
         value={this.state.name}
         />

         

           <View style={{height:2,width:'88%',alignSelf:'center',backgroundColor:'#0000001A'}}>
           </View>


           <Text style={{fontSize:17,fontFamily:'Gilroy-Bold',color:'#00000050',marginTop:20,marginLeft:'8%'}}>Age</Text>

           <TextInput
             style={{fontSize:21,fontFamily:'Gilroy-Bold',color:'#000000',width:'86%',height:46,marginLeft:'7.2%',marginTop:3}}
             placeholder="years"
             placeholderTextColor="#000000"
             keyboardType="numeric"
             maxLength={4}
             onChangeText={(text) => this.setState({age: text})}
             value={this.state.age}
             />

             <View style={{height:2,width:'88%',alignSelf:'center',backgroundColor:'#0000001A'}}>
             </View>

             <Text style={{fontSize:17,fontFamily:'Gilroy-Bold',color:'#00000050',marginTop:20,marginLeft:'8%'}}>Weight</Text>

             <TextInput
               style={{fontSize:21,fontFamily:'Gilroy-Bold',color:'#000000',width:'86%',height:46,marginLeft:'7.2%',marginTop:3}}
               placeholder="kgs"
               placeholderTextColor="#000000"
               keyboardType="numeric"
               maxLength={5}
               onChangeText={(text) => this.setState({weight: text})}
               value={this.state.weight}
               />

               <View style={{height:2,width:'88%',alignSelf:'center',backgroundColor:'#0000001A'}}>
               </View>


               <Text style={{fontSize:17,fontFamily:'Gilroy-Bold',color:'#00000050',marginTop:20,marginLeft:'8%'}}>Height</Text>

               <TextInput
                 style={{fontSize:21,fontFamily:'Gilroy-Bold',color:'#000000',width:'86%',height:46,marginLeft:'7.2%',marginTop:3}}
                 placeholder="cm"
                 placeholderTextColor="#000000"
                 keyboardType="numeric"
                 maxLength={5}
                 onChangeText={(text) => this.setState({height: text})}
                 value={this.state.height}
                 />

                 <View style={{height:2,width:'88%',alignSelf:'center',backgroundColor:'#0000001A'}}>
                 </View>


                 <Button
                   style={{fontSize: 18, color: 'white',fontFamily:'Exo2-Medium'}}
                   containerStyle={{height:50,width:'88%',alignSelf:'center',marginTop:10,borderRadius:6,backgroundColor:'#161718',justifyContent:'center'}}
                   onPress={this.buttonClickListener}>
                   Save
                 </Button>



<Text style = {{height:100}}>

</Text>

      </KeyboardAwareScrollView>
      </SafeAreaProvider>

    );
  }
}

export default EditScreen;
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