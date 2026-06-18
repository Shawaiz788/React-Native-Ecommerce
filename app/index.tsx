import { useRouter } from 'expo-router';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const modal = () => {
  const router=useRouter();
  return (
    <View style={styles.container}>
        <View style={styles.imageWrapper}>
          <Image
            source={require('../assets/images/bags.jpg')}
            style={styles.img}
          />
          <View style={styles.overlay} />
          <View style={{flexDirection:"row",  top: "20%", left: "0%",position:"absolute",gap:20,justifyContent:'center',width:"100%",height:"100%"}}>
            <View style={styles.icons}>
              <Image source={require('../assets/images/truck.png')}/>
              <Text style={{color:'white',fontSize:12,fontWeight:'bold'}}>Fast Delivery</Text>
            </View>
            <View style={styles.icons}>
              <Image source={require('../assets/images/shield.png')}/>
              <Text style={{color:'white',fontSize:12,fontWeight:'bold'}}>Secure Pay</Text>
            </View>
            <View style={styles.icons}>
              <Image source={require('../assets/images/star.png')}/>
              <Text style={{color:'white',fontSize:12,fontWeight:'bold'}}>Top Brands</Text>
            </View>
          </View>
          
        </View>
      <View style={{ flex:1 ,padding:20}} >
          <Text style={styles.heading}>Welcome to {" "}
            <Text style={{ color: '#224ff6' }}>FastMart</Text>
          </Text>
          <Text style={styles.txt1}>Everything you need, delivered faster. Shop millions of products with same-day delivery.</Text>
          <TouchableOpacity style={styles.btn}
                onPress={()=>router.push('/auth')}>
                  <Text style={{ color: 'white', fontSize: 16 }}>Get Started</Text>
          </TouchableOpacity>
      </View>
     
    </View>
  )
}

const styles=StyleSheet.create({
container:{
  flex:1,
  alignItems:'center',
  justifyContent:'center',
  flexDirection:'column',
},
img: {
  width: "100%",
  height: "100%",
  marginBottom: 20,
 

},heading:{
  fontSize: 28,
  fontWeight: 'bold',
  marginBottom: 20,
},txt1:{
  fontSize: 16,
  color: 'gray',
  marginBottom: 20,
},btn:{
  padding: 10,
  borderRadius: 25,
  width: 300,
  alignItems: 'center',
  justifyContent: 'center',
  height: 60,
  backgroundColor: '#224ff6',
  alignSelf:'center',
  marginTop: 200,
},imageWrapper: {
  width: '100%',
  height: '100%',
  flex:1
},overlay: {
  ...StyleSheet.absoluteFillObject,
  backgroundColor: 'rgba(34, 79, 246, 0.8)', 
},icons:{
  width: "25%",
  height: "15%",
  borderRadius: 25,
  backgroundColor: "#4775F3",
  borderColor:'white',
  borderWidth: 1,
  flexDirection:'column',
  justifyContent:'center',
  alignItems:'center',
}
})
export default modal