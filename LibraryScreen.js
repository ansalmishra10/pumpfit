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
import RazorpayCheckout from 'react-native-razorpay';
import React, {Component} from 'react';
import Button from 'react-native-button';
const GLOBAL = require('./Global');
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { PulseIndicator } from 'react-native-indicators';

class LibraryScreen extends React.Component {
  constructor(props) {
    super(props)
     this.state={
       search:'',
       
}
  }



  access = (item) =>{
  //  alert(JSON.stringify(item))

  var amount = parseInt(item.amount) * 100

  var d = `Order_Package_${GLOBAL.user_id}_${item.id}`

    var options = {
        description: d,
  image: item.image,
        currency: 'INR',
        key: 'rzp_test_9FNVaaXL2WKZMI',
        amount:amount,


        name: 'varun',
        prefill: {
            email: 'varun.singhal78@gmail.com',
            contact: '9896904632',
            name: 'varun'
        },
        theme: {color: 'black'}
    }

    RazorpayCheckout.open(options).then((data) => {
        var a = data.razorpay_payment_id
        this.props.navigation.navigate('Thankyou')
      //  this.capture(a,b,id);



    }).catch((error) => {
        // handle failure
       // this.myPayments(s,error.description,'')

    });
    RazorpayCheckout.onExternalWalletSelection(data => {



    });


  }

  navigates=(no_of_week, id,item)=> {
    GLOBAL.weeks = no_of_week
    GLOBAL.package_id = id
    GLOBAL.getPack = item
    this.props.navigation.navigate('NewSubscription')


  }
  renderItem2=({item}) => {
  return(

  <>

  <TouchableOpacity
  onPress={()=>this.navigates(item.no_of_week,item.id,item)}>
   <ImageBackground source={{uri:item.image}}
    style={{width:'100%',height:220,resizeMode:'stretch',marginTop:15}}
    imageStyle={{borderRadius:12}}>

    <View style={{flexDirection:'row',width:'90%',marginLeft:'6%',marginTop:25,alignItems:'center',justifyContent:'space-between'}}>
    
    <View style={{width:90,height:28,borderRadius:4,backgroundColor:'white',justifyContent:'center'}}>
      <Text style={{fontSize: 11, color: '#242B37',fontFamily:'Gilroy-Bold',alignSelf:'center'}}>{item.package_type}</Text>
  
    </View>
    



    </View>

    <Text style={{fontSize:22,fontFamily:'Gilroy-Bold',color:'white',marginTop:80,marginLeft:'6.5%',width:'75%'}}>{item.package_name}</Text>
   </ImageBackground>

  </TouchableOpacity>


   </>

  )
  }

  componentDidMount(){

      // alert(JSON.stringify(GLOBAL.packageall))
  }



_keyExtractor=(item, index)=>item.key;

  render() {

   
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


                        <Text style = {{color:'white',fontFamily:'Exo2-Bold',fontSize: 20,marginLeft:20,width:'80%'}}>
                            {GLOBAL.maintitle}
                        </Text>


                        

                    </View>

        
         {GLOBAL.packageall !='' && (
         <View style = {{flex:1,backgroundColor:'white'}} >
             

            





           

           <FlatList style={{width:'94%',marginLeft:'3%'}}
            data={GLOBAL.packageall}

            keyExtractor={this._keyExtractor}
            renderItem={this.renderItem2}
             />
             

             

             
            </View>

            )}

            

            {GLOBAL.packageall == '' && (
                 
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

export default LibraryScreen;
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