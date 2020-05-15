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
  import HTML from 'react-native-render-html';
  const htmlContent = `
    <h1>This HTML snippet is now rendered with native components !</h1>
    <h2>Enjoy a webview-free and blazing fast application</h2>
    <img src="https://i.imgur.com/dHLmxfO.jpg?2" />
    <em style="textAlign: center;">Look at how happy this native cat is</em>
`;
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import React, {Component} from 'react';
import Button from 'react-native-button';
import SegmentedControlTab from "react-native-segmented-control-tab";
const GLOBAL = require('./Global');
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { PulseIndicator } from 'react-native-indicators';
import Header from 'react-native-custom-headers';

class MealDetail extends React.Component {
  constructor(props) {
    super(props);

     this.state={
       FlatListItems: [],
       
       selectedIndex: 0,
       mystaus:false,
}
  }



  



componentDidMount(){
  
  //const {state} = props.navigation;
  //console.log(this.props.navigation.route.params?.user ?? 'defaultValue')
//console.log("PROPS " + state.params.user);
  // const {state} = this.props.navigation;
  //  var name = state.params ? state.params.name : "<undefined>";
  // alert(name)

   
  }

  

handleIndexChange = index => {

        this.setState({
            ...this.state,
            selectedIndex: index
        });
        if (index == 1){

        }else{

        }
    };


  

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
                            {GLOBAL.mealname}
                        </Text>


                        

                    </View>


       <View style = {{flex:1,backgroundColor:'white'}} >



       <KeyboardAwareScrollView>


       <Image style={{width:'90%',height:200,resizeMode:'cover',borderRadius:6,margin:'5%'}}
        source={{uri: GLOBAL.mealimage}}/>


        <View style={{position:'absolute',width:110,height:30,borderRadius:4,backgroundColor:'white',top:35,right:36,elevation:3,justifyContent:'center'}}>
         <Text style={{fontSize:14,fontFamily:'Gilroy-Bold',color:'black',alignSelf:'center'}}>{GLOBAL.calories} calories</Text>

        </View>


        <View style ={{flexDirection:'row',margin:10,justifyContent:'space-between',width:'90%',marginLeft:'5%'}}>

               <View style = {{backgroundColor:'white',width:80,height:80,borderRadius:40,borderWidth:1,borderColor:'grey'}}>
               <Text style = {{color:'black',fontFamily:'Gilroy-Bold',fontSize: 18,alignSelf:'center',marginTop:16}}>
Fat
      </Text>
               <Text style = {{color:'grey',fontFamily:'Gilroy-Bold',fontSize: 17,alignSelf:'center',marginTop:1}}>
{GLOBAL.fat}
      </Text>
               </View>



               <View style = {{backgroundColor:'white',width:80,height:80,borderRadius:40,borderWidth:1,borderColor:'grey'}}>
               <Text style = {{color:'black',fontFamily:'Gilroy-Bold',fontSize: 18,alignSelf:'center',marginTop:16}}>
             Carb
               </Text>
               <Text style = {{color:'grey',fontFamily:'Gilroy-Bold',fontSize: 17,alignSelf:'center',marginTop:1}}>
             {GLOBAL.carbs}
               </Text>
            </View>


               <View style = {{backgroundColor:'white',width:80,height:80,borderRadius:40,borderWidth:1,borderColor:'grey'}}>
               <Text style = {{color:'black',fontFamily:'Gilroy-Bold',fontSize: 18,alignSelf:'center',marginTop:16}}>
                      Protein
                        </Text>
               <Text style = {{color:'grey',fontFamily:'Gilroy-Bold',fontSize: 17,alignSelf:'center',marginTop:1}}>
                      {GLOBAL.protein}
                        </Text>
                                 </View>


        </View>

        <View style = {{width:360,alignSelf:'center',backgroundColor:'#f7f7f7',borderRadius:33,marginTop:20}}>
                  <SegmentedControlTab

                      activeTabStyle= {{borderWidth:0,borderTopLeftRadius:33,borderBottomLeftRadius:33,backgroundColor:'#cdf6fc',borderTopRightRadius:22,borderBottomRightRadius:22,borderRadius:22,borderColor:'#f7f7f7'}}
                      tabStyle = {{height:33,borderRadius:33,borderWidth:0,backgroundColor:'#f7f7f7',borderColor:'#f7f7f7'}}
                      tabTextStyle = {{color:'#acb1c0',fontFamily:'Gilroy-Bold',fontSize:15,paddingTop:4}}
                      activeTabTextStyle = {{color:'#43454a',fontFamily:'Gilroy-Bold',fontSize:15}}
                      firstTabStyle = {{borderBottomLeftRadius:33,borderTopLeftRadius:33}}
                      lastTabStyle={{borderTopRightRadius:33,borderBottomRightRadius:33}}
                      values={["Method", "Ingredients",]}
                      selectedIndex={this.state.selectedIndex}
                      onTabPress={this.handleIndexChange}
                  />
                  </View>
<View style = {{marginTop:10,width:'90%',marginLeft:'5%'}}>
{this.state.selectedIndex == 0 && (

<HTML  html={GLOBAL.mealMet} imagesMaxWidth={Dimensions.get('window').width} />

)}
</View>
<View style = {{width:'90%',marginLeft:'5%'}}>
{this.state.selectedIndex == 1 && (


<HTML html={GLOBAL.mealIng} imagesMaxWidth={Dimensions.get('window').width} />



)}

</View>
<Text style = {{height:100}}>
</Text>
       </KeyboardAwareScrollView>



            </View>
          </SafeAreaProvider>
      );
    }
  }

  export default MealDetail;
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