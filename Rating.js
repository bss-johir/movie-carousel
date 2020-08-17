import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { AntDesign } from '@expo/vector-icons'

const Rating = ({ rating }) => {
const filledStars = Math.floor(rating / 2),
maxStars = Array( 5 - filledStars).fill('staro'),
rat = [ ...Array(filledStars).fill('star'), ...maxStars]
 return (
  <View style={styles.rating}>
   <Text style={styles.ratingNumber}>{rating}</Text>
    {
     rat.map((type, index) => (
      <AntDesign 
       key={index}
       name={type}
       size={12}
       color='tomato'
      />
     ))
    }
  </View>
 );
};

const styles = StyleSheet.create({
 rating: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  marginVertical: 4
 },
 ratingNumber: {
  marginRight: 4,
  // fontFamily: 'Menlo',
  fontSize: 14
 }
})
export default Rating;