import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Dimensions, FlatList, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const windowWidth = Dimensions.get('window').width;



const TopContainer=()=>{
  return(
<View style={styles.topContainer}>
          <Image source={require('../../assets/images/pfp.png')} style={styles.profile}/>
          <View >
            <Text style={styles.bodytext}>Hello,Shawaiz</Text>
            <View style={{flexDirection:'row',alignItems:'center',gap:5}}>
                <Ionicons name="location-outline" size={18} color="blue" />
                <Text style={styles.heading}>Lahore, Punjab</Text>
            </View>
          </View>
        <View style={{flexDirection:'row' ,marginLeft:'auto',gap:10,marginRight:10}}>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="notifications-outline" size={26} color="#111" />
            <View style={styles.badge} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="menu" size={26} color="#111" />
          </TouchableOpacity>
        </View>
      </View>
  )
};



const SearchBar=()=>{
  return(<View style={styles.inputWrapper}>
            <Ionicons name="search" size={20} color="#9099A8" />
            <TextInput
            placeholder="Search for products, brands and more"
            placeholderTextColor="#9099A8"
            />
          
      </View>
  )
}


const PromotionalBanner=()=>{
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.bannerScroll} contentContainerStyle={styles.bannerContainer}>
          <View style={[styles.banner, { backgroundColor: '#2D71FA' }]}>
            <Text style={styles.bannerTag}>TODAY ONLY</Text>
            <Text style={styles.bannerTitle}>Mega Tech Sale</Text>
            <Text style={styles.bannerSubtitle}>Up to 40% off premium audio</Text>
            <TouchableOpacity style={styles.shopNowBtn}>
              <Text style={styles.shopNowText}>Shop now</Text>
            </TouchableOpacity>
          </View>
          <View style={[styles.banner, { backgroundColor: '#00C853' }]}>
            <Text style={styles.bannerTag}>TODAY ONLY</Text>
            <Text style={styles.bannerTitle}>Free Delivery</Text>
            <Text style={styles.bannerSubtitle}>On everything</Text>
            <TouchableOpacity style={styles.shopNowBtn}>
              <Text style={styles.shopNowText}>Learn more</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
  )
}


const Categories=()=>{
  return(
    <FlatList style={{marginLeft:15}} data={['🌐 All','🎧 Audio','📱 Smart','👕 Wear','🍳 Kitchen','📚 Books','👜 Bags']} horizontal renderItem={({item})=>(
      <View style={styles.categoryItem}>
          <Text style={{color:'grey',fontWeight:'bold'}}>{item}</Text>
      </View>
    )} />
     
  )
}
const home = () => {
  return (
    <View style={styles.container}>
     <ScrollView >
        <TopContainer/>
        <SearchBar/>
        <PromotionalBanner/>
        <Categories/>
     </ScrollView>
    </View>
  )
}


const styles=StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'white',
  },topContainer:{
    flex:1,
    flexDirection:'row',
    marginTop:windowWidth*0.12,
    paddingHorizontal:20,
    gap:10,
    justifyContent:'center',
  },profile:{
    width: 46,
    height: 46,
    borderRadius: 23,
    borderWidth: 2,
    borderColor: '#2670F2',
    marginTop:'auto'
  },heading:{
    fontSize: 18,
    fontWeight: 'bold',
  },bodytext:{
    fontSize: 16,
    color: 'gray',
  },iconButton: {
    position: 'relative',
    padding: 6,
    backgroundColor: '#E5E5EA',
    borderRadius: 20,
    height: 40,
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop:'auto'

  },
  badge: {
    position: 'absolute',
    top: 4,
    right: 4,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'red',
  },inputWrapper: {
  flexDirection: 'row',
  alignItems: 'center',
  gap: 10,
  marginHorizontal: 20,
  marginBottom: 30,
  marginTop: 40,
  paddingLeft: 20,
  borderRadius: 28,
  borderWidth: 1,
  borderColor: '#E5E5EA',
  height: 56,
  backgroundColor: '#FFFFFF', 

  shadowColor: '#000000',
  shadowOffset: {
    width: 0,
    height: 4,
  },
  shadowOpacity: 0.06,
  shadowRadius: 12,
  elevation: 4, 
},bannerScroll: {
    marginBottom: 24,
  },
  bannerContainer: {
    paddingHorizontal: 20,
  },
  banner: {
    width:windowWidth * 0.75,
    height: 160,
    borderRadius: 20,
    padding: 20,
    marginRight: 16,
    justifyContent: 'center',
  },
  bannerTag: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '700',
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  bannerTitle: {
    color: '#FFF',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  bannerSubtitle: {
    color: '#FFF',
    fontSize: 14,
    marginBottom: 16,
    opacity: 0.9,
  },shopNowBtn: {
    backgroundColor: '#FFF',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  shopNowText: {
    color: '#2D71FA',
    fontSize: 13,
    fontWeight: '700',
  },categoryItem: {
    width:80,
    height:40,
    backgroundColor:'white',
    borderRadius:20,
    alignItems:'center',
    justifyContent:'center',
    borderWidth:1,
  borderColor:'#E5E5EA',
marginHorizontal:5,
}
  });

export default home