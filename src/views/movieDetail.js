/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect } from 'react';
import {
  ActionSheetIOS,
  ActivityIndicator,
  Dimensions,
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  StatusBar,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
// import YouTube from 'react-native-youtube';
import {
  baseImageUrl,
  baseBackdropImageUrl,
  getMovieDetail,
} from '../networkManager';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { colors } from '../theme/color';

const isIphoneX = Dimensions.get('window').height >= 812;

const MovieDetail = ({ route, navigation }) => {
  const { movie } = route.params;
  // const [videoId, setVideoId] = useState('0');
  const [movieDetail, setMovieDetail] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [genres, setGenres] = useState([]);
  const [isBlur, setIsBlur] = useState(true);
  const [isReadMoreClicked, setIsReadMoreClicked] = useState(false);
  const [isWishlistClicked, setIsWishlistClicked] = useState(false);
  const [isSeenlistClicked, setIsSeenlistClicked] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  // const videoUrl = `https://api.themoviedb.org/3/movie/${
  //   movie.id
  // }/videos?api_key=9f856681c9163f666d3789c63c4b482e&language=en-US`;
  const storeData = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (error) {
      return error;
    }
  };

  const removeData = async (key, value) => {
    try {
      await AsyncStorage.removeItem(key, value);
    } catch (error) {
      return error;
    }
  };
  const handleWishlist = async () => {
    setIsWishlistClicked(!isWishlistClicked);
    if (!isWishlistClicked) {
      setIsSeenlistClicked(false);
      await storeData('wishlist', movie.id.toString());
      // await removeData('seenlist');
      // } else {
      // await removeData('wishlist');
    }
  };

  const handleSeenlist = async () => {
    setIsSeenlistClicked(!isSeenlistClicked);
    if (!isSeenlistClicked) {
      setIsWishlistClicked(false);
      await storeData('seenlist', movie.id.toString());
      // await removeData('wishlist');
      // } else {
      // await removeData('seenlist');
    }
  };

  const handleCustomlist = () =>
    ActionSheetIOS.showActionSheetWithOptions(
      {
        title: `Add or remove ${movie.title} from your lists`,
        tintColor: colors.gold,
        options: [
          !isWishlistClicked ? 'Add to wishlist' : 'Remove from wishlist',
          !isSeenlistClicked ? 'Add to seenlist' : 'Remove from seenlist',
          'Create list',
          'Cancel',
        ],
        cancelButtonIndex: 3,
      },
      buttonIndex => {
        if (buttonIndex === 0) {
          handleWishlist();
        } else if (buttonIndex === 1) {
          handleSeenlist();
        } else if (buttonIndex === 2) {
          setIsModalVisible(false);
          setIsModalVisible(true);
        }
      },
    );

  useEffect(() => {
    getMovieDetail(movie.id).then(detail => {
      setMovieDetail(detail);
      setGenres(detail.genres);
      setIsLoading(false);
    });
  }, [movie.id]);

  // useEffect(() => {
  //   const getVideo = async () => {
  //     const result = await fetch(videoUrl);
  //     const res = await result.json();
  //     setVideoId(res.results[0].key);
  //   };
  //   getVideo();
  // }, [videoUrl]);

  return (
    <ScrollView>
      <StatusBar barStyle="light-content" />
      {isLoading ? (
        <ActivityIndicator size="large" />
      ) : (
        <View style={styles.container}>
          {/* <YouTube
        apiKey={'AIzaSyDiMl-ZHJQ-1vnvJH00Q6kYwOuk3kcX3vk'}
        videoId={videoId}
        style={styles.youtube}
        fullscreen
      /> */}
          <TouchableWithoutFeedback onPress={() => setIsBlur(!isBlur)}>
            <Image
              style={styles.backdropImage}
              source={{
                uri: `${baseBackdropImageUrl}${movie.backdrop_path}`,
              }}
              blurRadius={isBlur ? 50 : 0}
            />
          </TouchableWithoutFeedback>
          <TouchableOpacity
            style={styles.goBackContainer}
            onPress={() => navigation.goBack()}>
            <Ionicons
              style={styles.goBackIcon}
              name="ios-arrow-back"
              size={24}
              color={colors.gold}
            />
            <Text bold style={styles.goBackText}>
              Movies
            </Text>
          </TouchableOpacity>
          <Text numberOfLines={1} style={styles.title}>
            {movieDetail.title}
          </Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.genreContainer}>
            {genres.map((genre, index) => (
              <TouchableOpacity key={index} style={styles.genreButton}>
                <Text style={styles.genreText}>{genre.name}</Text>
                <Ionicons
                  style={styles.icon}
                  name="ios-arrow-forward"
                  size={14}
                />
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Bottom */}
          <View style={styles.detailContainer}>
            <View style={styles.detailTopContainer}>
              <View style={styles.imageContainer}>
                <Image
                  style={styles.image}
                  resizeMode="cover"
                  source={{ uri: `${baseImageUrl}${movieDetail.poster_path}` }}
                />
              </View>
              <View style={styles.listButtonContainer}>
                <View style={{ flexDirection: 'row' }}>
                  <TouchableOpacity
                    onPress={() => handleWishlist()}
                    style={[
                      styles.listButtons,
                      styles.wishlist,
                      {
                        backgroundColor: isWishlistClicked
                          ? colors.red
                          : colors.transparent,
                      },
                    ]}>
                    <Ionicons
                      style={styles.listIcons}
                      name="ios-heart-empty"
                      color={!isWishlistClicked ? colors.red : colors.white}
                      size={20}
                    />
                    <Text
                      style={[
                        styles.wishlistText,
                        {
                          color: isWishlistClicked ? colors.white : colors.red,
                        },
                      ]}>
                      {isWishlistClicked ? 'In wishlist' : 'Wishlist'}
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => handleSeenlist()}
                    style={[
                      styles.listButtons,
                      styles.seenlist,
                      {
                        backgroundColor: isSeenlistClicked
                          ? colors.green
                          : colors.transparent,
                      },
                    ]}>
                    <Ionicons
                      style={styles.listIcons}
                      name="ios-eye"
                      color={!isSeenlistClicked ? colors.green : colors.white}
                      size={20}
                    />
                    <Text
                      style={[
                        styles.seenlistText,
                        {
                          color: isSeenlistClicked
                            ? colors.white
                            : colors.green,
                        },
                      ]}>
                      {isSeenlistClicked ? 'Seen' : 'Seenlist'}
                    </Text>
                  </TouchableOpacity>
                </View>
                <TouchableOpacity
                  onPress={() => handleCustomlist()}
                  style={[styles.listButtons, styles.customList]}>
                  <Ionicons
                    style={styles.listIcons}
                    name="ios-list"
                    color={colors.gold}
                    size={20}
                  />
                  <Text style={styles.customlistText}>Add to custom list</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.itemSeperator} />
            <View style={styles.subContainer}>
              <Text bold style={styles.overviewHeaderText}>
                Overview:
              </Text>
              <Text
                numberOfLines={!isReadMoreClicked && 3}
                style={styles.overviewText}>
                {movieDetail.overview}
              </Text>
              <TouchableOpacity
                style={styles.readMoreButton}
                onPress={() => setIsReadMoreClicked(!isReadMoreClicked)}>
                <Text style={styles.readMoreButtonText}>
                  {isReadMoreClicked ? 'Less' : 'Read More'}
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.itemSeperator} />
          </View>
        </View>
      )}
      <View>
        <Modal
          animationType="slide"
          visible={isModalVisible}
          presentationStyle="pageSheet">
          <View>
            <Text>TEST</Text>
          </View>
        </Modal>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.transparent,
  },
  youtube: {
    height: 240,
    width: 240,
  },
  subContainer: {
    marginTop: 0,
    paddingRight: 10,
  },
  overviewHeaderText: {
    marginBottom: 10,
    fontFamily: 'Fjalla One',
    fontSize: 16,
  },
  overviewText: {
    color: colors.gray,
    lineHeight: 20,
    fontSize: 16,
  },
  backdropImage: {
    width: '100%',
    height: 250,
  },
  image: {
    height: 150,
    width: 100,
    borderRadius: 8,
  },
  genreContainer: {
    flexDirection: 'row',
    bottom: 120,
    marginLeft: 20,
  },
  genreButton: {
    borderRadius: 14,
    backgroundColor: colors.white,
    flexDirection: 'row',
    marginRight: 8,
    paddingHorizontal: 8,
    height: 28,
    alignItems: 'center',
  },
  genreText: {
    fontSize: 13,
    fontWeight: 'bold',
  },
  icon: {
    marginLeft: 8,
  },
  goBackContainer: {
    top: isIphoneX ? -200 : -220,
    marginLeft: 20,
    width: 80,
    flexDirection: 'row',
  },
  goBackIcon: {
    fontWeight: 'bold',
    marginRight: 6,
    alignSelf: 'center',
  },
  goBackText: {
    color: colors.gold,
    fontSize: 18,
    fontFamily: 'Fjalla One',
  },
  title: {
    fontFamily: 'Fjalla One',
    color: colors.gold,
    fontSize: 40,
    bottom: isIphoneX ? 190 : 210,
    marginLeft: 20,
  },
  detailContainer: {
    bottom: 96,
    paddingHorizontal: 10,
  },
  imageContainer: {
    shadowColor: colors.black,
    shadowOffset: { width: 2, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  detailTopContainer: {
    flexDirection: 'row',
  },
  itemSeperator: {
    height: 1,
    backgroundColor: colors.seperator,
    marginVertical: 6,
  },
  readMoreButton: {
    marginTop: 6,
  },
  readMoreButtonText: {
    color: colors.lightBlue,
    fontSize: 16,
  },
  listButtonContainer: {
    marginLeft: 10,
    justifyContent: 'space-around',
    height: 100,
  },
  listIcons: {
    marginRight: 6,
  },
  listButtons: {
    width: '40%',
    flexDirection: 'row',
    height: 34,
    alignItems: 'center',
    paddingHorizontal: 6,
    marginHorizontal: 4,
    borderWidth: 1,
    borderRadius: 6,
  },
  customList: {
    borderColor: colors.gold,
    width: '60%',
  },
  wishlist: {
    borderColor: colors.red,
  },
  seenlist: {
    borderColor: colors.green,
  },
  customlistText: {
    color: colors.gold,
    fontSize: 16,
  },
  wishlistText: {
    fontSize: 16,
  },
  seenlistText: {
    fontSize: 16,
  },
});

export default MovieDetail;
