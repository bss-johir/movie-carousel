import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

const Genres = ({ genres }) => {
 return (
  <View style={styles.genres}>
   {
    genres.map((genre, index) => (
     <View key={index} style={styles.gener}>
      <Text style={styles.generText}>
       {genre}
      </Text>
     </View>
    ))
   }
  </View>
 );
};
const styles = StyleSheet.create({
 geners: {
  flexDirection: 'row',
  flexWrap: 'wrap',
  justifyContent: 'center',
  marginVertical: 4
 },
 gener: {
  paddingHorizontal: 6,
  paddingVertical: 2,
  borderWidth: 1,
  borderRadius: 14,
  borderColor: '#ccc',
  marginRight: 4,
  marginBottom: 4
 },
 generText: {
  fontSize: 9,
  opacity: 0.4
 }
})
export default Genres;