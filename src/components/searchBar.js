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
      clearButtonMode="always"
      placeholder="Search any movie or person"
      style={styles.input}
      {...props}
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#CED0CE',
    height: 32,
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
    fontSize: 16,
  },
});
export default SearchBar;
