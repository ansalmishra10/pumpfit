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
  RefreshControl,




  } from 'react-native';
  import Loader from './Loader.js';
import RazorpayCheckout from 'react-native-razorpay';
import React, {Component} from 'react';
import Button from 'react-native-button';
const GLOBAL = require('./Global');
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { PulseIndicator } from 'react-native-indicators';
import Header from 'react-native-custom-headers';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
class ProgramScreen extends React.Component {
  constructor(props) {
    super(props)
     this.state={

       FlatListItems: [],
       loading:'',
       image:'',
       refreshing: false,
       items: [],


}
  }

   genItems = () => [0, 1, 2, 3, 4, 5];

  refresh = () => {
    this.setState({ refreshing: true, items: [] });
    setTimeout(() => this.setState({ refreshing: false, items: this.genItems() }), 1500);
  };


    showLoading() {
    this.setState({loading: true})
   }

    hideLoading() {
    this.setState({loading: false})
   }


  renderItem=({item}) => {
return(
<>

    <View>

         <View style={{flexDirection:'row',width:'94%',marginTop:5,marginLeft:'3%',alignItems:'center',justifyContent:'space-between'}}>

            <Text style={{fontSize:20,fontFamily:'Gilroy-Bold',color:'#161718',width:'70%'}}>{item.title}</Text>
            


            <Button
             style={{fontSize: 12, color: '#161718',fontFamily:'Gilroy-Bold'}}
             containerStyle={{backgroundColor:'#e3e3e3',width:80,height:24,borderRadius:4,justifyContent:'center',elevation:3}}
             onPress={()=>this.navigate2(item.title, item.all_package)}>
             View All
           </Button>

            </View>





          
             <FlatList
              data={item.all_package}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              keyExtractor={this._keyExtractor2}
              renderItem={this.renderItem2}
              />
             
   </View>
</>

 )
}


navigate2=(title, all_package)=> {
  //alert(JSON.stringify(all_package))

   GLOBAL.maintitle = title
   GLOBAL.packageall = all_package
   this.props.navigation.navigate('LibraryScreen')

   }

_keyExtractor=(item, index)=>item.key;

navigate=(no_of_week, id,item)=> {
  GLOBAL.weeks = no_of_week
  GLOBAL.package_id = id
  GLOBAL.getPack = item
  this.props.navigation.navigate('NewSubscription')

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
renderItem2=({item}) => {
return(

<>

<TouchableOpacity
onPress={()=>this.navigate(item.no_of_week,item.id,item)}>
 <ImageBackground source={{uri:item.image}}
 imageStyle={{ borderRadius: 10 }}
  style={{width:280,height:150,margin:10,resizeMode:'cover'}}>

  <View style={{flexDirection:'row',width:'90%',marginLeft:'6.5%',marginTop:17,alignItems:'center',justifyContent:'space-between'}}>


  <View style={{width:80,height:24,borderRadius:4,backgroundColor:'white',justifyContent:'center'}}>
  <Text style={{fontSize: 10, color: '#242B37',fontFamily:'Gilroy-Bold',alignSelf:'center'}}>{item.package_type}</Text>
  
  </View>



  </View>

  <Text style={{fontSize:20,fontFamily:'Gilroy-Bold',color:'white',marginTop:38,marginLeft:'7%',width:'75%'}}>{item.package_name}</Text>
 </ImageBackground>

</TouchableOpacity>




 </>

)
}

componentDidMount() {
      // alert(JSON.stringify(GLOBAL.user_id))
       this._unsubscribe = this.props.navigation.addListener('focus', () => {
         this.handleStateChange()

          }
     )
     }


  handleStateChange=()=> {
       
    this.showLoading()
       fetch('http://pumpfit.in/admin/webservices/getpackage', {
         method: 'POST',
        headers: {
            'x-api-key': 'c3a3cf7c211b7c07b2495d8aef9761fc',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            user_id: GLOBAL.user_id
        }),
    }).then((response) => response.json())
        .then((responseJson) => {

                  // alert(JSON.stringify(responseJson))
                
              this.hideLoading()
            if (responseJson.status == true) {
                this.setState({FlatListItems: responseJson.workout })
                this.setState({image:responseJson.image})
                // alert(JSON.stringify(this.state.FlatListItems))
            }
            else{
              //  alert('Invalid Credentials!')
            }
        })
        .catch((error) => {
            console.error(error);
        });
      
  }

  _keyExtractor2=(item, index)=>item.key;



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
                            Workout
                        </Text>


                        

                    </View>




           <View style={{flex:1,backgroundColor:'white'}}>



           <Image
                 source={{uri:this.state.image}}
               style={{width: Dimensions.get('window').width-20,alignSelf:'center', height: 200,marginTop:5,marginBottom:5,resizeMode:'cover',borderRadius:6}}


           />
            <FlatList 
             data={this.state.FlatListItems}
             horizontal={false}
             showsVerticalScrollIndicator={false}
             keyExtractor={this._keyExtractor}
             renderItem={this.renderItem}
             refreshControl={
             <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this.refresh}
            />
          }
            
             
             />









           </View>
         </SafeAreaProvider>
    );
  }
}

export default ProgramScreen;
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