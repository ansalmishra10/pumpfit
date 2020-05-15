
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
  ActivityIndicator,




  } from 'react-native';

import React, {Component} from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Button from 'react-native-button';
import { GoogleSignin, GoogleSigninButton, statusCodes } from 'react-native-google-signin';
const GLOBAL = require('./Global');
var DeviceInfo = require('react-native-device-info');



class LoginScreen extends React.Component {
  constructor() {
    super();
     this.state={

        phone:'',
        Password:'',
        hidePassword: true,
        result:'',
        loading:'',
     }
  }

  managePasswordVisibility = () => {
     this.setState({ hidePassword: !this.state.hidePassword });
      }

      showLoading() {
    this.setState({loading: true})
   }

    hideLoading() {
    this.setState({loading: false})
   }

    



    getRemoteData = () => {


      if (this.state.phone == '') {
         alert('Please Enter Mobile No.')
       } else if (this.state.Password == '') {
         alert('Please Enter Password')
       } else {

         this.showLoading()
       fetch('http://pumpfit.in/admin/webservices/signIn', {
         method: 'POST',
        headers: {
            'x-api-key': 'c3a3cf7c211b7c07b2495d8aef9761fc',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            mobile: this.state.phone,
            password:this.state.Password, 
            device_id: 'abc',          
             device_type: Platform.OS,
            device_token: 'bcd',
            model_name: 0

        }),
    }).then((response) => response.json())
        .then((responseJson) => {

                   // alert(JSON.stringify(responseJson))
              this.hideLoading()
            if (responseJson.status == true) {
                 // this.setState({result: responseJson.user_detail })

                  GLOBAL.user_id = responseJson.user_id
                    // alert(JSON.stringify(GLOBAL.user_id))


                 AsyncStorage.setItem('userID', responseJson.user_id);

                // AsyncStorage.setItem('image', this.state.results.image);
                // AsyncStorage.setItem('name', this.state.results.name);
                // AsyncStorage.setItem('email', this.state.results.email);
                // AsyncStorage.setItem('mobile', this.state.results.mobile);
                     this.props.navigation.navigate('Tab')
            }
            else{
                alert('Invalid Credentials!')
            }
        })
        .catch((error) => {
            console.error(error);
        });

       }


}

 componentDidMount() {
    // alert(JSON.stringify(GLOBAL.user_id))

  GoogleSignin.configure({
          //It is mandatory to call this method before attempting to call signIn()
          scopes: ['https://www.googleapis.com/auth/drive.readonly'],
          // Repleace with your webClientId generated from Firebase console
          webClientId: '197048053260-k3s5vu42tq29ph770hmrs2imi5pjm5ie.apps.googleusercontent.com',
        });
 }

    _signIn = async () => {
       try {
           await GoogleSignin.hasPlayServices();
           const userInfo = await GoogleSignin.signIn();
           // this.socialLogin(userInfo.user.name,userInfo.user.email,userInfo.user.photo,userInfo.user.id,"Gmail")

        //   this.buttonClickListeners(userInfo.user.name,userInfo.user.email,"gmail")
         //  this.buttonClickListeners(userInfo.user.name,userInfo.user.email)
           this.setState({ userInfo: userInfo, loggedIn: true });
       } catch (error) {
         alert(error.message)

           if (error.code === statusCodes.SIGN_IN_CANCELLED) {
               // user cancelled the login flow
           } else if (error.code === statusCodes.IN_PROGRESS) {
               // operation (f.e. sign in) is in progress already
           } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
               // play services not available or outdated
           } else {
               // some other error happened
           }
       }
   };



 getCurrentUserInfo = async () => {
       try {
           const userInfo = await GoogleSignin.signInSilently();
           this.setState({ userInfo });
       } catch (error) {
           if (error.code === statusCodes.SIGN_IN_REQUIRED) {
               // user has not signed in yet
               this.setState({ loggedIn: false });
           } else {
               // some other error
               this.setState({ loggedIn: false });
           }
       }
   };

     google = () =>{
 this._signIn()

 // GoogleSignin.configure({
 //      //It is mandatory to call this method before attempting to call signIn()
 //      scopes: ['https://www.googleapis.com/auth/drive.readonly'],
 //      // Repleace with your webClientId generated from Firebase console
 //      webClientId: '434572582739-ue5gl6ocljuirlibv3d5cna0c9kla5vg.apps.googleusercontent.com',
 //    });

}


  render() {
    if(this.state.loading){
      return(
        <View style={{flex: 1}}>
        <ActivityIndicator style = {{position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            backgroundColor: 'white',
            justifyContent: 'center',
            alignItems: 'center'}}

       size="large" color="#e41582" />
        </View>
      )
    }
    return(
      <View style={{flex:1,backgroundColor:'white'}}>
         <ImageBackground style={{resizeMode:'contain',height:'100%',width:'100%'}} source={require('./login.png')}>

           <KeyboardAwareScrollView>



         <Button
           style={{fontSize: 16, color: 'white',fontFamily:'Exo2-SemiBold'}}
           containerStyle={{alignSelf:'flex-end',marginTop:'14%',marginRight:'5%'}}>
           
             SKIP
         </Button>




           <Text style={{fontSize:42,fontFamily:'Exo2-Medium',color:'white',width:'90%',alignSelf:'center',textAlign:'center',marginTop:'31%'}}>Login to</Text>
           <Text style={{fontSize:42,fontFamily:'Exo2-Medium',color:'white',width:'90%',alignSelf:'center',marginTop:-5,textAlign:'center'}}>Your Account</Text>

           <View style={{backgroundColor: 'rgba(0,0,0,0.4)',marginLeft:'5%',width:'90%',height:46,borderRadius:10,marginTop:25}}>
           <TextInput
             style={{fontSize:17,fontFamily:'Exo2-Medium',color:'rgba(255, 255, 255, 0.6)',width:'80%',height:46,marginLeft:'3%'}}
             placeholder="Mobile No."

             placeholderTextColor="rgba(255, 255, 255, 0.6)"
             keyboardType="numeric"
             maxLength={10}
             onChangeText={(text) => this.setState({phone: text})}
             value={this.state.phone}
             />
           </View>

           <View style={{backgroundColor: 'rgba(0,0,0,0.4)',marginLeft:'5%',width:'90%',height:46,borderRadius:10,marginTop:15,flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                 <TextInput
                   style={{fontSize:17,fontFamily:'Exo2-Medium',color:'rgba(255, 255, 255, 0.6)',width:'80%',height:46,marginLeft:'3%'}}
                   placeholder="Password"
                   secureTextEntry={this.state.hidePassword}
                   placeholderTextColor="rgba(255, 255, 255, 0.6)"
                   
                   maxLength={16}
                   onChangeText={(text) => this.setState({Password: text})}
                   value={this.state.Password}
                   />

              <TouchableOpacity style={{marginRight:18}}
                onPress = { this.managePasswordVisibility }>
              <Image
                style={{height:23,width:23,resizeMode:'contain'}}
                source={(this.state.hidePassword) ?   require('./hide1.png') : require('./show1.png') }
               />
               </TouchableOpacity>
           </View>

           <TouchableOpacity style={{marginTop:3,marginRight:'5%'}}
             onPress={()=>this.props.navigation.navigate('ForgetScreen')}>
            <Text style={{fontSize:16,color:'rgba(255, 255, 255, 0.6)',fontFamily:'Exo2-Medium',alignSelf:'flex-end'}}>Forgot Password?</Text>
           </TouchableOpacity>

           <Button
             style={{fontSize: 18, color: '#161718',fontFamily:'Exo2-SemiBold'}}
             containerStyle={{height:50,width:'90%',alignSelf:'center',marginTop:24,borderRadius:10,backgroundColor:'white',justifyContent:'center'}}
             onPress={()=>this.getRemoteData()}>
             LOG IN
           </Button>

           <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',width:'58%',alignSelf:'center',marginTop:18}}>
             <Text style={{fontSize:18,fontFamily:'Exo2-Medium',color:'rgba(255, 255, 255, 0.6)'}}>Not yet a member?</Text>

             <Button
               style={{fontSize: 18, color: 'white',fontFamily:'Exo2-Medium'}}
               onPress={()=>this.props.navigation.navigate('SignupScreen')}>

                 Sign Up
             </Button>

           </View>





          <Text style={{fontSize:15,fontFamily:'Exo2-SemiBold',color:'white',marginTop:'26%',alignSelf:'center'}}>or log in with</Text>

          <View style={{flexDirection:'row',marginTop:17,width:'90%',marginLeft:'5%',alignItems:'center',justifyContent:'space-between',marginBottom:20
        }}>

            <TouchableOpacity style={{backgroundColor:'rgba(255, 255, 255, 0.3)',height:50,width:'50%',borderTopLeftRadius:10,borderBottomLeftRadius:10,justifyContent:'center',borderRightWidth:1,borderColor:'rgba(255, 255, 255, 0.4)'}}
             onPress= {()=>this.google()}>
             <View style={{flexDirection:'row',width:'57%',alignItems:'center',justifyContent:'space-between',alignSelf:'center'}}>
              <Image source={require('./google.png')}
                style={{height:18,width:18,resizeMode:'contain'}}/>
              <Text style={{fontSize:18,fontFamily:'Exo2-SemiBold',color:'white'}}>Google</Text>
             </View>
            </TouchableOpacity>
            <TouchableOpacity style={{backgroundColor:'rgba(255, 255, 255, 0.3)',height:50,width:'50%',borderBottomRightRadius:10,borderTopRightRadius:10,justifyContent:'center',borderLeftWidth:1,borderColor:'rgba(255, 255, 255, 0.4)'}}>

            <View style={{flexDirection:'row',width:'70%',alignItems:'center',justifyContent:'space-between',alignSelf:'center'}}>
             <Image source={require('./facebook.png')}
               style={{height:18,width:18,resizeMode:'contain'}}/>
             <Text style={{fontSize:18,fontFamily:'Exo2-SemiBold',color:'white'}}>Facebook</Text>
            </View>

            </TouchableOpacity>


          </View>




           </KeyboardAwareScrollView>

          </ImageBackground>
      </View>
    );
  }
}

export default LoginScreen;
