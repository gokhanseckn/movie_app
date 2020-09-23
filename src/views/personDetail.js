import React, { useEffect, useState } from 'react';
import { FlatList, Image, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SegmentedControl from '@react-native-community/segmented-control';
import { colors } from '../theme/color';
import MovieRow from '../views/movieRow';
import { baseImageUrl, getPersonDetail, getPersonImages, getMovieCreditForAPerson } from '../networkManager';
import styles from '../assets/styles/index';

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
    <SafeAreaView style={styles.personDetailContainer}>
      <TouchableOpacity style={styles.goBackButton} onPress={() => navigation.goBack()}>
        <Ionicons style={styles.customGoBackIcon} name="chevron-back" size={30} color={colors.gold} />
        <Text style={styles.customGoBackText}>Back</Text>
      </TouchableOpacity>
      <React.Fragment>
        <Text style={styles.customHeaderText}>{personDetail.name}</Text>
        <View style={styles.itemSeperator} />
        <View style={styles.flexRow}>
          {personDetail.profile_path ? (
            <Image style={styles.movieRowImage} source={{ uri: `${baseImageUrl}${personDetail.profile_path}` }} />
          ) : (
            <Image style={styles.movieRowNoImage} />
          )}
          <View style={[styles.justifyCenter, { marginLeft: 20 }]}>
            <Text style={styles.subTitle}>Known for</Text>
            <Text style={styles.personDetailDepartmentText}>{personDetail.known_for_department}</Text>
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
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.itemSeperator} />
            <Text style={styles.subTitle}>Biography</Text>
            <Text numberOfLines={!isReadMoreClicked && 4} style={styles.personDetailDescText}>
              {personDetail.biography}
            </Text>
            <TouchableOpacity style={styles.readMoreButton} onPress={() => setIsReadMoreClicked(!isReadMoreClicked)}>
              <Text style={styles.readMoreButtonText}>{isReadMoreClicked ? 'Less' : 'Read More'}</Text>
            </TouchableOpacity>
            <Text style={[styles.subTitle, { marginTop: 10 }]}>Place of birth</Text>
            <Text style={styles.personDetailDescText}>{personDetail.place_of_birth}</Text>
            <View style={styles.itemSeperator} />
            <Text style={styles.subTitle}>Images</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginTop: 10 }}>
              {personImages.map((image, index) => (
                <Image
                  key={index}
                  style={[styles.smallImage, { marginRight: 12 }]}
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
              renderItem={({ item }) => <MovieRow navigation={navigation} movie={item} />}
              ItemSeparatorComponent={() => <View style={styles.itemSeperator} />}
              keyExtractor={item => item.id.toString()}
            />
          </React.Fragment>
        )}
      </React.Fragment>
    </SafeAreaView>
  );
};

export default PersonDetail;
