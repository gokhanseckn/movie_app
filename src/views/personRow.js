import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import Element from '../components/element';
import { baseImageUrl } from '../networkManager';

const PersonRow = ({ person, navigation }) => (
  <TouchableOpacity
    style={styles.buttonContainer}
    // onPress={() =>
    //   navigation.navigate('MovieDetail', {
    //     headerTitle: movie.title,
    //     movie: movie,
    //   })
  >
    <View style={styles.container}>
      <Image
        style={styles.personImage}
        source={
          person.profile_path
            ? { uri: `${baseImageUrl}${person.profile_path}` }
            : require('../assets/no-image.gif')
        }
      />

      <Element bold>{person.name}</Element>
      <Element>{person.known_for_department}</Element>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  personImage: {
    width: 100,
    height: 150,
    borderRadius: 8,
  },
  buttonContainer: {
    flexDirection: 'column',
  },
  container: {
    justifyContent: 'center',
    width: 100,
    marginRight: 10,
  },
});

export default PersonRow;
