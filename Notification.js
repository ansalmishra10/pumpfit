

import React, {Component} from 'react';
import {Platform, StyleSheet,AsyncStorage, Text, View,FlatList,ActivityIndicator,StatusBar,Image,TouchableOpacity,ScrollView ,Alert,Container,Linking ,TextInput , Dimensions} from 'react-native';




import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const APPBAR_HEIGHT = Platform.OS === 'ios' ? 44 : 56;
const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;

const window = Dimensions.get('window');
const GLOBAL = require('./Global');
import { SafeAreaProvider } from 'react-native-safe-area-context';

type Props = {};
class Notification extends Component<Props> {


  



  constructor(props){
    super(props)
    const { navigation } = this.props;
    this.state = {
      name: '',
      email: '',
       message: '',
       status :'' ,
       loading : '',
       userid : '',
       notificationslist:[],
    }
}


  renderRowItem = (item) => {

    return (
      <View style={{flexDirection: 'row',flex : 1, backgroundColor:'white',borderRadius:5,  width : window.width-20 ,marginLeft : 10,marginRight:10,marginTop:10,marginBottom:5,elevation:2}}>
    <Image style={{width:30, height:30, resizeMode:'contain', margin:12}} source={require('./blackbell.png')}/>
    <View style={{flexDirection:'column', margin:10, width: '82%'}}>
     <Text style={{fontSize:16, color:'#21262C', fontFamily: 'Gilroy-Bold'}}>{item.item.title}</Text>
     <Text style={{fontSize:13, marginRight:10,fontFamily: 'Gilroy-Bold'}}>{item.item.message}</Text>
     <View style={{flexDirection:'row', width: '100%', alignItems:'flex-end', justifyContent: 'flex-end'}}>
      <Image style={{width: 18, height: 18, resizeMode: 'contain'}} source={require('./clocklogo.png')}/>
      <Text style={{fontSize:13,fontFamily:'Gilroy-Bold',marginTop: 10,marginLeft: 10,marginRight:10,  color:'#7E7E7E'}}>{item.item.created_at}</Text>
         </View>

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




componentDidMount(){

  this.getReviews()
}

   getReviews= () =>{
      this.showLoading();
      const url = 'http://pumpfit.in/admin/webservices/get_notification'
      this.showLoading()
      fetch(url, {
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


       this.hideLoading()
       if (responseJson.status == true) {


       this.setState({notificationslist : responseJson.notification})

       }

    })
    .catch((error) => {
      console.error(error);
       this.hideLoading()
    });
    }

  render() {


    return (

      <SafeAreaProvider>

      

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
                             Notifications
                        </Text>


                        

                    </View>


    <ScrollView style={{flex:1,backgroundColor:'white'}}>
{this.state.notificationslist.length == 0 &&(
    <Text style={{fontSize:20, margin:10,alignSelf:'center', fontFamily: 'Gilroy-Bold'}}>No new notifications!</Text>
  )}

  {this.state.notificationslist.length !=0 &&(
      <FlatList style= {{backgroundColor:'white',flexGrow:0, marginBottom:20}}
          data={this.state.notificationslist}
          numColumns={1}
          keyExtractor = { this.keyExtractor}
          renderItem={this.renderRowItem}
        />

    )}



     </ScrollView>
     </SafeAreaProvider>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor:'#e3e3e3'
  },
  statusBar: {
  height: STATUSBAR_HEIGHT,
},
 appBar: {
   backgroundColor:'black',
   height: APPBAR_HEIGHT,
 },
 loading: {
          position: 'absolute',
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
          backgroundColor: 'white',
          justifyContent: 'center',
          alignItems: 'center'
      },

});

export default Notification;
