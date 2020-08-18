import React from 'react';
import { View, StyleSheet, Dimensions, FlatList, Image } from 'react-native';
import MaskedView from '@react-native-community/masked-view';
//
const { width, height } = Dimensions.get('window')
const BACKDROP_HEIGHT = height * 0.6

const Backdrop = ({ movies, scrollX }) => {
 return (
  <View style={{
   position: 'absolute',
   width: width,
   height: BACKDROP_HEIGHT,
  }}>
   <FlatList
    data={movies}
    keyExtractor={item => item.key}
    renderItem={({item, index}) => {
     if( !item.backdrop ) {
      return 
     }
     return (
       <Image
        source={{ uri: item.backdrop }}
        style={{
         width,
         height: BACKDROP_HEIGHT,
         resizeMode: 'cover'
        }}
       />
     )
    }}
   />
  </View>
 );
};

const styles = StyleSheet.create({
 backdrop: {
  position: 'absolute',
  width: width,
  height: BACKDROP_HEIGHT,
 }
})

export default Backdrop;
