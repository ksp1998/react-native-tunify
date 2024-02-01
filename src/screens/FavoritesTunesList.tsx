import React from 'react';
import {AudiosList} from '../components';
import {StyleSheet, Text} from 'react-native';

const FavoritesTunesList = (): JSX.Element => {
  return (
    <>
      <Text style={styles.text}>In development</Text>
      <AudiosList tunes={[]} />
    </>
  );
};

const styles = StyleSheet.create({
  text: {
    textAlign: 'center',
    color: '#FFF',
    fontSize: 24,
    padding: 16,
  },
});

export default FavoritesTunesList;
