import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, Dimensions, Image } from 'react-native';
import { getMovies } from './api';
import Rating from './Rating';
import Genres from './Genres';
//
const { width } = Dimensions.get('window')
const ITEM_SIZE = width * 0.72 , SPACING = 10
//
export default function App() {
  const [ movies, setMovies ] = useState([])
  const [ loading, setLoading ] = useState(false)

  const fetchData = async () => {
    setLoading(true)
    const movies = await getMovies();
    setMovies(movies)
    setLoading(false)
  }
  useEffect(() => {
    fetchData()
  }, [])

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      {
        loading ? 
        <Text>Loading....</Text>
        :
        <FlatList
          keyExtractor={item => item.key}
          data={movies}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.contentContainerStyle}
          renderItem={({item}) => (
            <View style={{ width: ITEM_SIZE}}>
              <View style={styles.movieItem}>
                <Image 
                  source={{ uri: item.poster}}
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
              </View>
            </View>
          )}
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
