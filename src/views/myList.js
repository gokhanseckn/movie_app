import React, { useState } from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { colors } from '../theme/color';
import SegmentedControl from '@react-native-community/segmented-control';

const MyList = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <React.Fragment>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.container}>
        <Text style={styles.header}>My Lists</Text>
        <View style={styles.section}>
          <Text style={styles.sectionText}>Custom Lists</Text>
        </View>
        <TouchableOpacity style={styles.createListButton}>
          <Text style={styles.createListButtonText}>Create custom list</Text>
        </TouchableOpacity>
        <View style={styles.itemSeperator} />
        <SegmentedControl
          style={styles.segmentedControl}
          values={['Wishlist', 'Seenlist']}
          selectedIndex={selectedIndex}
          onChange={event => {
            setSelectedIndex(event.nativeEvent.selectedSegmentIndex);
          }}
        />
        {selectedIndex === 0 && (
          <View>
            <View style={styles.section}>
              <Text style={styles.sectionText}>0 movies in wishlist</Text>
            </View>
            <Text>wishlist</Text>
          </View>
        )}
        {selectedIndex === 1 && (
          <View>
            <View style={styles.section}>
              <Text style={styles.sectionText}>0 movies in seenlist</Text>
            </View>
            <Text>seenlist</Text>
          </View>
        )}
      </SafeAreaView>
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 60,
  },
  header: {
    color: colors.gold,
    fontSize: 40,
    fontFamily: 'Fjalla One',
    marginLeft: 20,
    marginBottom: 10,
  },
  segmentedControl: {
    marginBottom: 10,
    marginHorizontal: 20,
    height: 30,
  },
  section: {
    backgroundColor: colors.lightGray,
    height: 30,
    justifyContent: 'center',
    paddingLeft: 20,
  },
  sectionText: {
    fontWeight: '600',
    fontSize: 16,
  },
  createListButton: {
    paddingLeft: 20,
    height: 34,
    justifyContent: 'center',
  },
  createListButtonText: {
    color: colors.lightBlue,
    fontSize: 18,
  },
  itemSeperator: {
    height: 1,
    backgroundColor: colors.seperator,
    marginVertical: 6,
  },
});
export default MyList;
