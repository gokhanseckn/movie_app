import React, { useEffect, useState } from 'react';
import {
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SegmentedControl from '@react-native-community/segmented-control';
import { colors } from '../theme/color';
import MovieRow from '../views/movieRow';
import {
  baseImageUrl,
  getPersonDetail,
  getPersonImages,
  getMovieCreditForAPerson,
} from '../networkManager';

const PersonDetail = ({ navigation, route }) => {
  const { person } = route.params;
  const [personDetail, setPersonDetail] = useState({});
  const [isReadMoreClicked, setIsReadMoreClicked] = useState(false);
  const [personImages, setPersonImages] = useState([]);
  const [movieCredit, setMovieCredit] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    getPersonDetail(person.id).then(res => setPersonDetail(res));
    getPersonImages(person.id).then(res => setPersonImages(res));
    getMovieCreditForAPerson(person.id).then(res => setMovieCredit(res));
  }, [person.id]);

  return (
    <SafeAreaView>
      <TouchableOpacity
        style={styles.goBackButton}
        onPress={() => navigation.goBack()}>
        <Ionicons name="ios-arrow-back" size={30} color={colors.gold} />
        <Text style={styles.header}>Back</Text>
      </TouchableOpacity>
      <View style={styles.container}>
        <Text style={styles.name}>{personDetail.name}</Text>
        <View style={styles.itemSeperator} />
        <View style={styles.imageContainer}>
          {personDetail.profile_path ? (
            <Image
              style={styles.image}
              source={{ uri: `${baseImageUrl}${personDetail.profile_path}` }}
            />
          ) : (
            <Image style={styles.noImage} />
          )}
          <View style={styles.textContainer}>
            <Text style={styles.subTitle}>Known for</Text>
            <Text style={styles.departmentText}>
              {personDetail.known_for_department}
            </Text>
          </View>
        </View>
        <SegmentedControl
          tintColor={colors.gold}
          textColor={colors.black}
          activeTextColor={colors.white}
          style={styles.segmentedControl}
          values={['Biography', 'Movies']}
          selectedIndex={selectedIndex}
          onChange={event => {
            setSelectedIndex(event.nativeEvent.selectedSegmentIndex);
          }}
        />
        {selectedIndex === 0 && (
          <ScrollView contentContainerStyle={{ paddingBottom: 580 }}>
            <View style={styles.itemSeperator} />
            <Text style={styles.subTitle}>Biography</Text>
            <Text
              numberOfLines={!isReadMoreClicked && 4}
              style={styles.descriptionText}>
              {personDetail.biography}
            </Text>
            <TouchableOpacity
              onPress={() => setIsReadMoreClicked(!isReadMoreClicked)}>
              <Text style={styles.readMoreText}>
                {isReadMoreClicked ? 'Less' : 'Read More'}
              </Text>
            </TouchableOpacity>
            <Text style={styles.subTitle}>Place of birth</Text>
            <Text style={styles.descriptionText}>
              {personDetail.place_of_birth}
            </Text>
            <View style={styles.itemSeperator} />
            <Text style={styles.subTitle}>Images</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={{ marginTop: 10 }}>
              {personImages.map((image, index) => (
                <Image
                  key={index}
                  style={styles.images}
                  source={{ uri: `${baseImageUrl}${image.file_path}` }}
                />
              ))}
            </ScrollView>
          </ScrollView>
        )}
        {selectedIndex === 1 && (
          <React.Fragment>
            <View style={styles.itemSeperator} />
            <FlatList
              data={movieCredit}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.flatListContentContainer}
              renderItem={({ item }) => (
                <MovieRow navigation={navigation} movie={item} />
              )}
              ItemSeparatorComponent={() => (
                <View style={styles.itemSeperator} />
              )}
              keyExtractor={item => item.id.toString()}
            />
          </React.Fragment>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  goBackButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
    marginTop: 8,
  },
  header: {
    color: colors.gold,
    fontWeight: 'bold',
    fontFamily: 'Fjalla One',
    fontSize: 16,
    marginLeft: 4,
  },
  container: {
    paddingLeft: 20,
    marginTop: 10,
  },
  name: {
    fontFamily: 'Fjalla One',
    color: colors.gold,
    fontSize: 30,
  },
  itemSeperator: {
    height: 1,
    backgroundColor: colors.seperator,
    marginVertical: 6,
  },
  imageContainer: {
    flexDirection: 'row',
  },
  textContainer: {
    marginLeft: 20,
  },
  image: {
    height: 150,
    width: 100,
    borderRadius: 8,
  },
  noImage: {
    height: 150,
    width: 100,
    borderRadius: 8,
    backgroundColor: colors.lightGray,
  },
  subTitle: {
    fontFamily: 'Fjalla One',
    fontWeight: 'bold',
    fontSize: 16,
  },
  departmentText: {
    marginTop: 4,
    fontSize: 16,
  },
  descriptionText: {
    fontSize: 16,
    color: colors.gray,
    marginTop: 6,
    paddingRight: 20,
  },
  readMoreText: {
    fontSize: 16,
    color: colors.lightBlue,
    marginBottom: 10,
  },
  images: {
    width: 75,
    height: 100,
    borderRadius: 8,
    marginRight: 20,
  },
  movieCreditContainer: {
    marginBottom: 10,
    flexDirection: 'row',
  },
  segmentedControl: {
    marginRight: 20,
    marginTop: 10,
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
    fontFamily: 'Fjalla One',
  },
});

export default PersonDetail;
