import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const SearchBar = props => (
  <View style={styles.container}>
    <Ionicons
      style={styles.icon}
      name="ios-search"
      size={18}
      color={'#CED0CE'}
    />
    <TextInput
      {...props}
      placeholder="Search any movie or person"
      style={styles.input}
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#CED0CE',
    height: 30,
    borderRadius: 4,
    marginRight: 20,
    marginBottom: 10,
    paddingRight: 10,
  },
  icon: {
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
  },
});
export default SearchBar;
