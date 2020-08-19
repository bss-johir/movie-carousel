import React from 'react';
import { View, StyleSheet, Dimensions, FlatList, Image, Animated } from 'react-native';
import MaskedView from '@react-native-community/masked-view';
import Svg, { Rect } from 'react-native-svg';
import { LinearGradient } from 'expo-linear-gradient';
//
const testImg = 'https://image.tmdb.org/t/p/w370_and_h556_multi_faces/ishzDCZIv9iWfI70nv5E4ZreYUD.jpg'
const { width, height } = Dimensions.get('window')
const ITEM_SIZE = width * 0.72
const BACKDROP_HEIGHT = height * 0.6
const AnimatedSvg = Animated.createAnimatedComponent(Svg)


const Backdrop = ({ movies, scrollX }) => {
  return (
    <View style={{ position: 'absolute', top:0, width, height: BACKDROP_HEIGHT }}>
      <FlatList
        data={movies}
        keyExtractor={(item) => item.key}
        renderItem={({ item, index }) => {
          
          if (!item.backdrop) {
            return null;
          }

          const inputRange = [(index - 2) * ITEM_SIZE, (index - 1) * ITEM_SIZE];

          const translateX = scrollX.interpolate({
            inputRange,
            outputRange: [-width, 0],
          });

          return (
            <MaskedView
              style={StyleSheet.absoluteFill, { flex: 1 }}
              maskElement={
                <AnimatedSvg
                  width={width}
                  height={height}
                  viewBox={`0 0 ${width} ${height}`}
                  style={{ transform: [{ translateX }] }}
                >
                  <Rect x='0' y='0' width={width} height={height} fill='red' />
                </AnimatedSvg>
              }
            >
              <Image
                source={{ uri: item.backdrop }}
                style={{
                  width,
                  height: BACKDROP_HEIGHT,
                  resizeMode: 'cover',
                }}
              />
            </MaskedView>
          );
        }}
      />
      <LinearGradient
        colors={['transparent', 'red']}
        style={{
          width,
          height: BACKDROP_HEIGHT,
          position: 'absolute',
          bottom: 0
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    position: 'absolute',
    top: 0,
    width: width,
    height: BACKDROP_HEIGHT,
  },
  maskContainerStyle: {
    // Transparent background because mask is based off alpha channel.
    backgroundColor: 'transparent',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  maskTextStyle: {
    fontSize: 60,
    color: 'black',
    fontWeight: 'bold',
  }
})
export default Backdrop;

/**
       return (
    <View style={styles.backdrop}>
      <FlatList
        data={movies}
        // horizontal
        keyExtractor={item => item.key}
        renderItem={({ item, index }) => {

          if (!item.backdrop) {
            return
          }

          const inputRange = [
            (index - 2) * ITEM_SIZE, 
            (index - 1) * ITEM_SIZE
          ]
          const translateX = scrollX.interpolate({
            inputRange,
            outputRange: [-width, 0]
          })

          return (
            <MaskedView
              style={StyleSheet.absoluteFill}
              maskElement={
                <AnimatedSvg
                  width={width}
                  height={height}
                  viewBox={`0 0 ${width} ${height}`}
                  style={{ transform: [{ translateY: translateX }]}}
                >
                  <Rect 
                    x="0"
                    y="0"
                    width={width}
                    height={height}
                    fill="red"
                  />
                </AnimatedSvg>
              }
            >
              <Image
                source={{ uri: item.backdrop }}
                style={{
                  width,
                  height: 100,
                  resizeMode: 'cover'
                }}
              />
            </MaskedView>
          )
        }}
      />
      <LinearGradient 
        colors= {[ 'transparent', 'red']}
        style={{
          width,
          height: BACKDROP_HEIGHT,
          position: 'absolute',
          bottom: 0
        }}
      />
    </View>
  ); */

 // export default function SvgComponent({ movies }) {
 //  return (
 //   <View style={{
 //    position: 'absolute',
 //    width: width,
 //    height: '100%',
 //   }}>
 //    <FlatList
 //     data={movies}
 //     keyExtractor={item => item.key}
 //     renderItem={({ item, index }) => {
 //      if (!item.backdrop) {
 //       return
 //      }
 //      return (
 //       <MaskedView style={{ height: '50%' }}
 //        maskElement={
         // <Svg height={height} width={width} viewBox={`0 0 ${width} ${height}`}>
         //  <Rect x="0" y="0" width={width} height={height} stroke="red" strokeWidth="2" fill="red" />
         // </Svg>
 //        }>
        <Image
         source={{ uri: testImg }}
         style={{
          width,
          height: BACKDROP_HEIGHT,
          resizeMode: 'cover'
         }}
        />
 //       </MaskedView>
 //      )
 //     }}
 //    />
 //   </View>
 //  );
 // }
/**<FlatList
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
   /> */