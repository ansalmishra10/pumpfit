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
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { PulseIndicator } from 'react-native-indicators';
import Header from 'react-native-custom-headers';

class Meal extends React.Component {
  constructor(props) {
    super(props);

     this.state={
       FlatListItems: [],
       loading:false,
       
}
  }



  transfer=(title)=> {

   GLOBAL.mealtitle = title
   this.props.navigation.navigate('Mealtype')
   }



componentDidMount(){
  this._unsubscribe = this.props.navigation.addListener('focus', () => {
       this.handleStateChange()

       });
 }


  handleStateChange=()=> {
        
    this.showLoading()
    fetch('http://pumpfit.in/admin/webservices/get_meal_category', {
      method: 'POST',
     headers: {
         'x-api-key': 'c3a3cf7c211b7c07b2495d8aef9761fc',
         'Content-Type': 'application/json'
     },
     body: JSON.stringify({

         user_id:GLOBAL.user_id


     }),
   }).then((response) => response.json())
     .then((responseJson) => {

this.hideLoading()

         if (responseJson.status == true) {
              this.setState({FlatListItems: responseJson.meal_category })
              // alert(JSON.stringify(this.state.FlatListItems))
              

         }
         else{
            this.setState({FlatListItems: [] })
         }
     })
     .catch((error) => {
         console.error(error);
     });
      
  }


  renderItem=({item,index}) => {
//alert(index);

  // alert(JSON.stringify(item))


return(

<View>

   <TouchableOpacity
    onPress={()=>this.transfer(item.title)}>

     <View style={{width:'100%'}}>


        <Image style={{width:'90%',height:200,resizeMode:'cover',borderRadius:6,margin:'5%'}}
         source={{uri:item.image}}/>


<View style = {{position:'absolute', top :40,right:30,height:30,width:100,backgroundColor:'black',borderRadius:4}}>
        <Text style={{textAlign:'center',fontSize: 12, color: '#161718',fontFamily:'Gilroy-Bold',color:'white',marginTop:6}}>{item.title}</Text>
</View>



     </View>




  </TouchableOpacity>


  </View>



 );
}


showLoading() {
this.setState({loading: true})
}

hideLoading() {
this.setState({loading: false})
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
                            Daily Meal
                        </Text>


                        

                    </View>


       <View style = {{flex:1,backgroundColor:'white'}} >


            <FlatList style = {{height:'90%'}}
             data={this.state.FlatListItems}

             keyExtractor={this._keyExtractor}
             renderItem={this.renderItem}
      />



            </View>
          </SafeAreaProvider>
      );
    }
  }

  export default Meal;
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