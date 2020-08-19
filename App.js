import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, Dimensions, Image, Animated } from 'react-native';
//
import { getMovies } from './api';
import Rating from './Rating';
import Genres from './Genres';
import Backdrop from './Backdrop';
//
const { width } = Dimensions.get('window')
export const ITEM_SIZE = width * 0.72, SPACING = 10
const SPACE_SIZE = (width - ITEM_SIZE) / 2
//

export default function App() {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(false)
  const scrollX = useRef(new Animated.Value(0)).current

  const fetchData = async () => {
    setLoading(true)
    const movies = await getMovies();
    setMovies([{ key: 'space_left' }, ...movies, { key: 'space_right' }])
    setLoading(false)
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <Backdrop {...{movies, scrollX}} />
      {
        loading ?
          <Text>Loading....</Text>
          :
          <Animated.FlatList
            keyExtractor={item => item.key}
            data={movies}
            horizontal
            showsHorizontalScrollIndicator={false}
            snapToInterval={ITEM_SIZE}
            decelerationRate={0}
            bounces={false}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { x: scrollX } } }],
              { useNativeDriver: true }
            )}
            scrollEventThrottle={16}
            contentContainerStyle={styles.contentContainerStyle}
            renderItem={({ item, index }) => {
              if (!item.poster) {
                return (
                  <View
                    style={{
                      width: SPACE_SIZE,
                    }}
                  />
                )
              }
              const inputRange = [
                (index - 2) * ITEM_SIZE,
                (index - 1) * ITEM_SIZE,
                index * ITEM_SIZE,
              ];
              const translateY = scrollX.interpolate({
                inputRange,
                outputRange: [100, 50, 100]
              });
              return (
                <View style={{ width: ITEM_SIZE }}>
                  <Animated.View
                    style={{
                      padding: SPACING * 2,
                      marginHorizontal: SPACING,
                      alignItems: 'center',
                      backgroundColor: 'white',
                      borderRadius: 34,
                      transform: [{ translateY }]
                    }}>
                    <Image
                      source={{ uri: item.poster }}
                      style={styles.posterImage}
                    />
                    <Text style={{ fontSize: 24 }} numberOfLines={1}>
                      {item.title}
                    </Text>
                    {/* Rating */}
                    <Rating rating={item.rating} />
                    {/* Genres */}
                    <Genres genres={item.genres} />
                    <Text style={{ fontSize: 12 }} numberOfLines={3}>
                      {item.description}
                    </Text>
                  </Animated.View>
                </View>
              )
            }}
          />
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentContainerStyle: {
    alignItems: 'center'
  },
  movieItem: {
    padding: SPACING * 2,
    marginHorizontal: SPACING,
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 34,
  },
  posterImage: {
    width: '100%',
    height: ITEM_SIZE * 1.2,
    resizeMode: 'cover',
    borderRadius: 24,
    marginBottom: 10
  }
});
