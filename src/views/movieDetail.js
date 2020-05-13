import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';

const MovieDetail = ({ route, navigation }) => {
  const { movie } = route.params;
  return (
    <SafeAreaView style={styles.container}>
      <Text>{movie.overview}</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#EDEDEF',
  },
});

export default MovieDetail;
