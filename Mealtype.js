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
       packid:'',
}
  }



  transfer=(image, fat, carbs, protein, method, ingredients, meal_name, calories)=> {
      
      // alert(JSON.stringify(calories))
     GLOBAL.calories = calories
     GLOBAL.mealimage = image
     GLOBAL.fat = fat
     GLOBAL.carbs = carbs
     GLOBAL.protein = protein
     GLOBAL.mealMet = method
     GLOBAL.mealIng = ingredients
     GLOBAL.mealname = meal_name

     // alert(JSON.stringify(GLOBAL.mealimage))
       this.props.navigation.navigate('MealDetail')

   }



componentDidMount(){
    


    this.showLoading()
    fetch('http://pumpfit.in/admin/webservices/get_meal', {
      method: 'POST',
     headers: {
         'x-api-key': 'c3a3cf7c211b7c07b2495d8aef9761fc',
         'Content-Type': 'application/json'
     },
     body: JSON.stringify({

         user_id:GLOBAL.user_id,
         category_name: GLOBAL.mealtitle,


     }),
   }).then((response) => response.json())
     .then((responseJson) => {

this.hideLoading()

           

         if (responseJson.status == true) {
              
            
             this.setState({FlatListItems: responseJson.meal })
              this.setState({packid : responseJson.status })
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

   <TouchableOpacity style={{marginTop:10}}
    onPress={()=>this.transfer(item.image, item.fat, item.carbs, item.protein ,item.method ,item.ingredients,item.meal_name,item.calories)}>

     <View style={{flexDirection:'column',margin:10,alignItems:'center'}}>


        <Image style={{width:170,height:150,resizeMode:'cover',borderRadius:10}}
         source={{uri:item.image}}/>

        <Text style={{textAlign:'center',fontSize: 18, color: '#161718',fontFamily:'Gilroy-Bold',width:160,marginTop:5}}>{item.meal_name}</Text>




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
                            {GLOBAL.mealtitle}
                        </Text>


                        

                    </View>


       <View style = {{flex:1,backgroundColor:'white'}} >

       {this.state.packid == true && (

            <View style={{width:Dimensions.get('window').width}}>
            <FlatList  contentContainerStyle={{width:'100%',alignItems:'center',justifyContent:'space-between'}}
             data={this.state.FlatListItems}
             numColumns={2}
             horizontal={false}
             keyExtractor={this._keyExtractor}
             renderItem={this.renderItem}
      />
      </View>

      )}

       {this.state.packid == false && (
          
         <View style={{flex:1,backgroundColor:'white',justifyContent:'center',alignItems:'center'}}> 
           <Image style={{height:100,width:100,resizeMode:'contain',borderRadius:8,alignSelf:'center'}}
             source={require('./nodata.png')} />

           <Text style={{fontSize:15,fontFamily:'Exo2-Medium',color:'black',marginTop:10}}>No Data Found</Text>  

         </View>    

        )}

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