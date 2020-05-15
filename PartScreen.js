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
import NetInfo from "@react-native-community/netinfo";
  import Loader from './Loader.js';
    import Internet from './Internet.js';
import RazorpayCheckout from 'react-native-razorpay';
import React, {Component} from 'react';
import Button from 'react-native-button';
const GLOBAL = require('./Global');
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { PulseIndicator } from 'react-native-indicators';
import Stars from 'react-native-stars';

var arrayholder = [];
class PartScreen extends React.Component {
   constructor(props) {
     super(props);

     this.state={
         search:'',
         img1:require('./fav.png'),
loading:false,
connected:true,
         FlatListItems: [



 ],
     }
   }

   _handleStateChange = (state) => {
     // alert('hi')


    }
   componentDidMount(){




     this._unsubscribe = this.props.navigation.addListener('focus', () => {


       NetInfo.fetch().then(state => {
         this.setState({connected:state.isConnected})
         console.log(state.isConnected)

         if (state.isConnected == true){


         this.showLoading()
         fetch('http://pumpfit.in/admin/webservices/category', {
           method: 'POST',
          headers: {
              'x-api-key': 'c3a3cf7c211b7c07b2495d8aef9761fc',
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({
              category_id: GLOBAL.category,
              user_id:GLOBAL.user_id,
              search:'',


          }),
        }).then((response) => response.json())
          .then((responseJson) => {
      this.hideLoading()


              if (responseJson.status == true) {
                   this.setState({FlatListItems: responseJson.category })
                  arrayholder =   responseJson.category
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

       });

         });



   }



like = (type,id) =>{

  NetInfo.fetch().then(state => {
    console.log("Connection type", state.type);
    console.log("Is connected?", state.isConnected);

    if (state.isConnected == false){
      alert('No internet Connection')
      return
    }
  });
  fetch('http://pumpfit.in/admin/webservices/exerciseLike', {
    method: 'POST',
   headers: {
       'x-api-key': 'c3a3cf7c211b7c07b2495d8aef9761fc',
       'Content-Type': 'application/json'
   },
   body: JSON.stringify({
       category_id: id,
       user_id:GLOBAL.user_id,
       like:type


   }),
}).then((response) => response.json())
   .then((responseJson) => {



       if (responseJson.status == true) {



       }
       else{

       }
   })
   .catch((error) => {
       console.error(error);
   });
}

   onChange=(item,index)=> {
     //
     // alert(JSON.stringify(item))
     var a = this.state.FlatListItems[index]
     if (item.like == 0){
       a.like = 1
      this.like('1',item.id)
     }else{
            a.like = 0
            this.like('0',item.id)
     }
     this.state.FlatListItems[index] = a
     this.setState({FlatListItems:this.state.FlatListItems})
    //  this.setState({ img1: require('./redheart.png')})
   }
   

   naviga = (video,image,description,body_parts,you_need,item, title) => {
 
 // console.log(image)


GLOBAL.partname= title
GLOBAL.video = video
GLOBAL.image = image
GLOBAL.description = description
GLOBAL.parts = body_parts
GLOBAL.needs = you_need
this.props.navigation.navigate('VideoScreen')
}


   renderItem =({item,index})=> {


     return (
<View>
<View style = {{position:'absolute',top:2,right:10}}>
                      <TouchableOpacity style={{marginLeft:70,marginTop:5}}
                       onPress={()=>this.onChange(item,index)}>
                       {item.like == 0 && (
                         <Image source={this.state.img1}
                          style={{height:13,width:14,resizeMode:'contain'}} />
                       )}


                      </TouchableOpacity>


                      <TouchableOpacity style={{marginLeft:70,marginTop:0}}
                       onPress={()=>this.onChange(item,index)}>
                       {item.like == 1 && (
                         <Image source={require('./redheart.png')}
                          style={{height:13,width:14,resizeMode:'contain'}} />
                       )}


                      </TouchableOpacity>
                      </View>

        <TouchableOpacity style={{flexDirection:'row',marginTop:20}}
          onPress={()=> this.naviga(item.video,item.image,item.description,item.body_parts,item.you_need,item,item.title)}>




          <View style = {{backgroundColor:'white',flexDirection:'row',justifyContent:'space-between',marginTop:5}}>
          <Image style={{height:49,width:49,borderRadius:8,marginBottom:10}}
           source={{ uri: item.image_thumb}}>

           </Image>
           <View style={{flexDirection:'column',width:'98%'}}>
            <Text style={{fontSize:18,fontFamily:'Gilroy-Bold',color:'#161718',marginLeft:12,width:'75%'}}>{item.title}</Text>

            <View style={{flexDirection:'row',marginTop:6,marginLeft:13,justifyContent:'space-between',width:'60%'}}>

             <Text style={{fontSize:12,fontFamily:'Gilroy-Bold',color:'#00000066'}}>{item.body_parts}</Text>
             <View style = {{flexDirection:'row',width:'42%',alignItems:'center'}}>
             <Text style={{fontSize:12,fontFamily:'Gilroy-Bold',color:'#00000066'}}>Level</Text>

             <View style={{margin:5}}>
             <Stars
               default={item.lavel}
               count={5}
               starSize={8}
               spacing={2}
               fullStar={require('./blackcircle.png')}
               emptyStar={require('./greycircle.png')}
               disabled={true}
                />
             </View>

            </View>
         </View>


           </View>


</View>







        </TouchableOpacity>
        <View style={{height:1,backgroundColor:'#D3D3D3',width:'100%',marginBottom:5,marginTop:5}}>
 </View>
        </View>

     )
   }

   showLoading() {
   this.setState({loading: true})
  }

   hideLoading() {
   this.setState({loading: false})
  }

  call2=()=> {
        this.setState({search: ''});
  }
  
  call = () =>{
    this.setState({search:''})
    this.showLoading()
    fetch('http://pumpfit.in/admin/webservices/category', {
      method: 'POST',
     headers: {
         'x-api-key': 'c3a3cf7c211b7c07b2495d8aef9761fc',
         'Content-Type': 'application/json'
     },
     body: JSON.stringify({
         category_id: GLOBAL.category,
         user_id:GLOBAL.user_id


     }),
   }).then((response) => response.json())
     .then((responseJson) => {
this.hideLoading()


         if (responseJson.status == true) {
              this.setState({FlatListItems: responseJson.category })
             arrayholder =   responseJson.category


         }
         else{
            this.setState({FlatListItems: [] })
         }
     })
     .catch((error) => {
         console.error(error);
     });





  }


   SearchFilterFunction(text){

this.setState({search:text})
     fetch('http://pumpfit.in/admin/webservices/category', {
       method: 'POST',
      headers: {
          'x-api-key': 'c3a3cf7c211b7c07b2495d8aef9761fc',
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          category_id: GLOBAL.category,
          user_id:GLOBAL.user_id,
          search:text,


      }),
    }).then((response) => response.json())
      .then((responseJson) => {



          if (responseJson.status == true) {
               this.setState({FlatListItems: responseJson.category })
              arrayholder =   responseJson.category


          }
          else{
             this.setState({FlatListItems: [] })
          }
      })
      .catch((error) => {
          console.error(error);
      });
        // const newData = arrayholder.filter(function(item){
        //     const mergetwo= item.title
        //     const itemData = mergetwo.toUpperCase()
        //     const textData = text.toUpperCase()
        //     return itemData.indexOf(textData) > -1
        // })
        //
        //
        // this.setState({
        //     FlatListItems: newData,
        //     search: text
        //
        //
        // })

    }
   _keyExtractor=(item, index)=>item.key;





   render() {


     if(this.state.connected == false){
             return(
                 <Internet>

                 </Internet>

             )
         }

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
                           {GLOBAL.category}
                        </Text>


                        

                    </View>


         <View style = {{flex:1,backgroundColor:'white'}} >




           <View style={{flexDirection:'row',width:'90%',marginLeft:'5%',marginTop:15,alignItems:'center',justifyContent:'space-between'}}>

                <View style={{flexDirection:'row',width:'83%',backgroundColor:'#8E8E931F',borderRadius:10,alignItems:'center',height:36}}>

                      <Image style={{height:15,width:15,resizeMode:'contain',marginLeft:9}}
                       source={require('./search.png')} />

                       <TextInput
                         style={{fontSize:17,fontFamily:'Gilroy-Bold',color:'#23222280',width:'84%',height:36,marginLeft:2,marginTop:4,height:40}}
                         placeholder="Search"
                         placeholderTextColor="#23222280"

                         maxLength={100}
                          onChangeText={(text) => this.SearchFilterFunction(text)}
                         value={this.state.search}
                         />


                        <TouchableOpacity

     onPress={()=>this.call2()}
                        style={{marginLeft:-2}}>
                        <Image style={{height:17,width:17,resizeMode:'contain'}}
                         source={require('./cross.png')} />
                        </TouchableOpacity>

                </View>

                <Button
                       onPress={()=>this.call()}
                  style={{fontSize: 17, color: '#161718',fontFamily:'Gilroy-Bold'}}>
                  Cancel
                </Button>

           </View>

              <View style={{height:Dimensions.get('window').height,width:'90%',alignSelf:'center',marginTop:5}}>
              {this.state.FlatListItems.length != 0 && (
                <FlatList style= {{ height:'auto', flexGrow:0,borderTopColor:'#c0c0c0',width:'100%',height:'90%',backgroundColor:'white'}}
                data={this.state.FlatListItems}
                numColumns={1}
                showsVerticalScrollIndicator={false}
                keyExtractor={this._keyExtractor}
                renderItem={this.renderItem}
                />
              )}
              {this.state.FlatListItems.length == 0 && (
                <View style={{marginTop:'50%'}}>
                <Image style={{height:100,width:100,resizeMode:'contain',borderRadius:8,alignSelf:'center'}}
             source={require('./nodata.png')} />

           <Text style={{fontSize:15,fontFamily:'Exo2-Medium',color:'black',marginTop:10,alignSelf:'center'}}>No Data Found</Text>
            </View>

              )}
              </View>







         </View>
       </SafeAreaProvider>
    );
  }
}

export default PartScreen;
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