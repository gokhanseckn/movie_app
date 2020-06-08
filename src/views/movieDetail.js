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
} from 'react-native';
import YouTube from 'react-native-youtube';
import {
  baseImageUrl,
  baseBackdropImageUrl,
  getCast,
  getDirector,
  getMovieDetail,
  getRecommendedMovies,
  videoUrl,
  youtubeApiKey,
} from '../networkManager';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { colors } from '../theme/color';

const isIphoneX = Dimensions.get('window').height >= 812;

const MovieDetail = ({ route, navigation }) => {
  const { movie } = route.params;
  const [videoId, setVideoId] = useState('0');
  const [movieDetail, setMovieDetail] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [genres, setGenres] = useState([]);
  const [isBlur, setIsBlur] = useState(true);
  const [isReadMoreClicked, setIsReadMoreClicked] = useState(false);
  const [isWishlistClicked, setIsWishlistClicked] = useState(false);
  const [isSeenlistClicked, setIsSeenlistClicked] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [movieCast, setMovieCast] = useState([]);
  const [movieDirector, setMovieDirector] = useState('');
  const [recommennedMovies, setRecommennedMovies] = useState([]);

  const handleWishlist = async () => {
    setIsWishlistClicked(!isWishlistClicked);
    if (!isWishlistClicked) {
      setIsSeenlistClicked(false);
    }
  };

  const handleSeenlist = async () => {
    setIsSeenlistClicked(!isSeenlistClicked);
    if (!isSeenlistClicked) {
      setIsWishlistClicked(false);
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
    getCast(movie.id).then(cast => setMovieCast(cast));
    getDirector(movie.id).then(director => setMovieDirector(director[0].name));
    getRecommendedMovies(movie.id).then(movies => setRecommennedMovies(movies));
  }, [movie.id]);

  useEffect(() => {
    getMovieDetail(movie.id).then(detail => {
      setMovieDetail(detail);
      setGenres(detail.genres);
      setIsLoading(false);
    });
  }, [movie.id]);

  useEffect(() => {
    const getVideo = async () => {
      const result = await fetch(videoUrl(movie.id));
      const res = await result.json();
      setVideoId(res.results[0].key);
    };
    getVideo();
  }, [movie.id]);

  return (
    <React.Fragment>
      {isLoading ? (
        <ActivityIndicator style={{ flex: 1 }} size="large" />
      ) : (
        <View style={styles.container}>
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
              Back
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
              <TouchableOpacity
                onPress={() =>
                  navigation.push('GenreMovieList', {
                    genreId: genre.id,
                    genreName: genre.name,
                  })
                }
                key={index}
                style={styles.genreButton}>
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
          <ScrollView
            contentContainerStyle={{ paddingBottom: 300 }}
            style={styles.detailContainer}>
            <View style={styles.detailTopContainer}>
              <View style={styles.imageContainer}>
                <Image
                  style={styles.image}
                  resizeMode="cover"
                  source={{
                    uri: `${baseImageUrl}${movieDetail.poster_path}`,
                  }}
                />
              </View>
              <View style={styles.listButtonContainer}>
                <View style={{ flexDirection: 'row' }}>
                  {/* Wishlist Button */}
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
                  {/* Seenlist button*/}
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
                {/* Custom list Button */}
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
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <AnimatedCircularProgress
                    size={36}
                    width={3}
                    dashedTint={{ width: 2, gap: 2 }}
                    dashedBackground={{ width: 2, gap: 2 }}
                    fill={movieDetail.vote_average * 10}
                    tintColor={
                      movieDetail.vote_average > 7 ? colors.green : colors.gold
                    }
                    backgroundColor={
                      movieDetail.vote_average > 7
                        ? colors.lightGreen
                        : colors.lightGold
                    }>
                    {fill => (
                      <Text
                        style={
                          styles.voteAverage
                        }>{`${movieDetail.vote_average * 10}%`}</Text>
                    )}
                  </AnimatedCircularProgress>
                  <Text
                    style={{
                      marginLeft: 6,
                    }}>{`${movieDetail.vote_count} Ratings`}</Text>
                </View>
              </View>
            </View>
            <View style={styles.itemSeperator} />
            <View style={styles.subContainer}>
              {/* Overview */}
              <Text bold style={styles.subTitle}>
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

            {/* Cast */}
            <View style={styles.itemSeperator} />
            <View style={{ flexDirection: 'row' }}>
              <Text bold style={styles.subTitle}>
                Cast
              </Text>
              <TouchableOpacity
                onPress={() =>
                  navigation.push('SeeAllPage', {
                    header: movieDetail.title,
                    cast: movieCast,
                    type: 'cast',
                  })
                }>
                <Text style={[styles.readMoreButtonText, { marginLeft: 10 }]}>
                  See all
                </Text>
              </TouchableOpacity>
            </View>
            <ScrollView
              style={{ marginBottom: 4 }}
              horizontal
              showsHorizontalScrollIndicator={false}>
              {movieCast.slice(0, 6).map((cast, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() =>
                    navigation.push('PersonDetail', { person: cast })
                  }
                  style={styles.imageButton}>
                  {cast.profile_path ? (
                    <Image
                      source={{ uri: `${baseImageUrl}${cast.profile_path}` }}
                      style={styles.smallImage}
                    />
                  ) : (
                    <Image style={styles.smallNoImage} />
                  )}
                  <Text numberOfLines={1} style={styles.nameText}>
                    {cast.name}
                  </Text>
                  <Text numberOfLines={1} style={styles.characterText}>
                    {cast.character}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
            <View style={styles.itemSeperator} />
            {/* DIRECTOR */}
            <TouchableOpacity style={styles.directorButton}>
              <View style={{ flexDirection: 'row' }}>
                <Text>Director</Text>
                <Text style={styles.directorText}>{`${movieDirector}`}</Text>
              </View>
              <Ionicons
                style={styles.goBackIcon}
                name="ios-arrow-forward"
                size={14}
                color={colors.gray}
              />
            </TouchableOpacity>
            {/* RECOMMENNED MOVIES */}
            <View style={styles.itemSeperator} />
            <View style={{ flexDirection: 'row', marginTop: 4 }}>
              <Text bold style={styles.subTitle}>
                Recommenned Movies
              </Text>
              <TouchableOpacity
                onPress={() =>
                  navigation.push('SeeAllPage', {
                    type: 'movie',
                    header: movie.title,
                    movie: recommennedMovies,
                  })
                }>
                <Text style={[styles.readMoreButtonText, { marginLeft: 10 }]}>
                  See all
                </Text>
              </TouchableOpacity>
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {recommennedMovies.slice(0, 4).map((recommennedMovie, index) => (
                <TouchableOpacity
                  onPress={() =>
                    navigation.push('MovieDetail', {
                      headerTitle: recommennedMovie.title,
                      movie: recommennedMovie,
                    })
                  }
                  key={index}
                  style={styles.imageButton}>
                  {recommennedMovie.poster_path ? (
                    <Image
                      source={{
                        uri: `${baseImageUrl}${recommennedMovie.poster_path}`,
                      }}
                      style={styles.smallImage}
                    />
                  ) : (
                    <Image style={styles.smallNoImage} />
                  )}
                  <Text numberOfLines={1} style={styles.nameText}>
                    {recommennedMovie.title}
                  </Text>
                  <AnimatedCircularProgress
                    style={{ marginTop: 4 }}
                    size={30}
                    width={2}
                    dashedTint={{ width: 2, gap: 2 }}
                    dashedBackground={{ width: 2, gap: 2 }}
                    fill={recommennedMovie.vote_average * 10}
                    tintColor={
                      recommennedMovie.vote_average > 7
                        ? colors.green
                        : colors.gold
                    }
                    backgroundColor={
                      recommennedMovie.vote_average > 7
                        ? colors.lightGreen
                        : colors.lightGold
                    }>
                    {fill => (
                      <Text
                        style={{
                          fontSize: 10,
                        }}>{`${recommennedMovie.vote_average * 10}%`}</Text>
                    )}
                  </AnimatedCircularProgress>
                </TouchableOpacity>
              ))}
            </ScrollView>
            <View style={styles.itemSeperator} />
            {/* Trailer */}
            <Text bold style={styles.subTitle}>
              Trailer
            </Text>
            <YouTube
              apiKey={youtubeApiKey}
              videoId={videoId}
              style={styles.youtube}
              fullscreen
            />
            <Text />
          </ScrollView>
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
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.transparent,
  },
  youtube: {
    height: 240,
    width: '100%',
  },
  subContainer: {
    marginTop: 0,
    paddingRight: 10,
  },
  subTitle: {
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
    height: 44,
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
    // height: 120,
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
  imageButton: {
    marginRight: 8,
    alignItems: 'center',
    width: 100,
  },
  directorButton: {
    marginVertical: 6,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  directorText: {
    color: colors.gray,
    marginLeft: 10,
  },
  nameText: {
    fontSize: 12,
    textAlign: 'center',
  },
  smallImage: {
    width: 75,
    height: 100,
    borderRadius: 8,
  },
  smallNoImage: {
    width: 75,
    height: 100,
    borderRadius: 8,
    backgroundColor: colors.lightGray,
  },
  characterText: {
    fontSize: 12,
    textAlign: 'center',
    color: colors.gray,
  },
  voteAverage: {
    fontSize: 10,
    fontWeight: 'bold',
  },
});

export default MovieDetail;
