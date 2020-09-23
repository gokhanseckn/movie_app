import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { baseImageUrl } from '../networkManager';
import { Fonts } from '../constants';

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
      {person.profile_path ? (
        <Image style={styles.personImage} source={{ uri: `${baseImageUrl}${person.profile_path}` }} />
      ) : (
        <View style={styles.noImage} />
      )}
      <Text bold style={styles.name}>
        {person.name}
      </Text>
      <Text bold style={styles.name}>
        {person.known_for_department}
      </Text>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  personImage: {
    width: 80,
    height: 120,
    borderRadius: 8,
  },
  name: {
    fontFamily: Fonts.FjallaOne,
    color: '#c7a543',
    marginLeft: 10,
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'column',
  },
  container: {
    flexDirection: 'row',
  },
  noImage: {
    width: 80,
    height: 120,
    backgroundColor: '#CED0CE',
    borderRadius: 8,
  },
});

export default PersonRow;
