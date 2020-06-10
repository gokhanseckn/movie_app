/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect } from 'react';
import {
  ActionSheetIOS,
  ActivityIndicator,
  Image,
  Modal,
  ScrollView,
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
import styles from '../assets/styles/index';
import { colors } from '../theme/color';

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
    <View>
      {isLoading ? (
        <ActivityIndicator style={styles.flex} size="large" />
      ) : (
        <React.Fragment>
          <TouchableWithoutFeedback onPress={() => setIsBlur(!isBlur)}>
            <Image
              style={styles.movieDetailBackdropImage}
              source={{ uri: `${baseBackdropImageUrl}${movie.backdrop_path}` }}
              blurRadius={isBlur ? 50 : 0}
            />
          </TouchableWithoutFeedback>
          <TouchableOpacity style={styles.customGoBackButton} onPress={() => navigation.goBack()}>
            <Ionicons style={styles.customGoBackIcon} name="ios-arrow-back" size={24} color={colors.gold} />
            <Text bold style={styles.customGoBackText}>
              Back
            </Text>
          </TouchableOpacity>
          <Text numberOfLines={1} style={styles.movieDetailMovieTitle}>
            {movieDetail.title}
          </Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.movieDetailGenreContainer}>
            {genres.map((genre, index) => (
              <TouchableOpacity
                onPress={() =>
                  navigation.push('GenreMovieList', {
                    genreId: genre.id,
                    genreName: genre.name,
                  })
                }
                key={index}
                style={styles.movieDetailGenreButton}>
                <Text style={styles.movieDetailGenreText}>{genre.name}</Text>
                <Ionicons style={styles.movieDetailGenreIcon} name="ios-arrow-forward" size={14} />
              </TouchableOpacity>
            ))}
          </ScrollView>
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={styles.movieDetailContainer}
            contentContainerStyle={{ paddingBottom: 280 }}>
            <View style={styles.flexRow}>
              <View style={styles.imageContainerShadow}>
                <Image
                  style={styles.movieDetailImage}
                  resizeMode="cover"
                  source={{ uri: `${baseImageUrl}${movieDetail.poster_path}` }}
                />
              </View>
              <View style={styles.movieDetailListButtonContainer}>
                <View style={styles.flexRow}>
                  <TouchableOpacity
                    onPress={() => handleWishlist()}
                    style={[
                      styles.movieDetailListButton,
                      styles.borderRed,
                      { backgroundColor: isWishlistClicked ? colors.red : colors.transparent },
                    ]}>
                    <Ionicons
                      style={styles.movieDetailListButtonIcon}
                      name="ios-heart-empty"
                      color={!isWishlistClicked ? colors.red : colors.white}
                      size={20}
                    />
                    <Text style={[styles.fontSize16, { color: isWishlistClicked ? colors.white : colors.red }]}>
                      {isWishlistClicked ? 'In wishlist' : 'Wishlist'}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => handleSeenlist()}
                    style={[
                      styles.movieDetailListButton,
                      styles.borderGreen,
                      { backgroundColor: isSeenlistClicked ? colors.green : colors.transparent },
                    ]}>
                    <Ionicons
                      style={styles.movieDetailListButtonIcon}
                      name="ios-eye"
                      color={!isSeenlistClicked ? colors.green : colors.white}
                      size={20}
                    />
                    <Text style={[styles.fontSize16, { color: isSeenlistClicked ? colors.white : colors.green }]}>
                      {isSeenlistClicked ? 'Seen' : 'Seenlist'}
                    </Text>
                  </TouchableOpacity>
                </View>
                <TouchableOpacity
                  onPress={() => handleCustomlist()}
                  style={[styles.movieDetailListButton, styles.borderGold, { width: '60%' }]}>
                  <Ionicons style={styles.movieDetailListButtonIcon} name="ios-list" color={colors.gold} size={20} />
                  <Text style={(styles.fontSize16, { color: colors.gold })}>Add to custom list</Text>
                </TouchableOpacity>
                <View style={[styles.flexRow, styles.alignItemsCenter]}>
                  <AnimatedCircularProgress
                    size={36}
                    width={3}
                    dashedTint={{ width: 2, gap: 2 }}
                    dashedBackground={{ width: 2, gap: 2 }}
                    fill={movieDetail.vote_average * 10}
                    tintColor={movieDetail.vote_average > 7 ? colors.green : colors.gold}
                    backgroundColor={movieDetail.vote_average > 7 ? colors.lightGreen : colors.lightGold}>
                    {fill => <Text style={styles.voteAverageText}>{`${movieDetail.vote_average * 10}%`}</Text>}
                  </AnimatedCircularProgress>
                  <Text style={styles.movieDetailRatingsText}>{`${movieDetail.vote_count} Ratings`}</Text>
                </View>
              </View>
            </View>
            <View style={styles.itemSeperator} />
            <View>
              <Text bold style={styles.subTitle}>
                Overview:
              </Text>
              <Text numberOfLines={!isReadMoreClicked && 3} style={styles.movieDetailOverViewText}>
                {movieDetail.overview}
              </Text>
              <TouchableOpacity style={styles.readMoreButton} onPress={() => setIsReadMoreClicked(!isReadMoreClicked)}>
                <Text style={styles.readMoreButtonText}>{isReadMoreClicked ? 'Less' : 'Read More'}</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.itemSeperator} />
            <View style={styles.flexRow}>
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
                <Text style={[styles.readMoreButtonText, { marginLeft: 10 }]}>See all</Text>
              </TouchableOpacity>
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {movieCast.slice(0, 6).map((cast, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => navigation.push('PersonDetail', { person: cast })}
                  style={styles.movieDetailImageButton}>
                  {cast.profile_path ? (
                    <Image source={{ uri: `${baseImageUrl}${cast.profile_path}` }} style={styles.smallImage} />
                  ) : (
                    <Image style={styles.smallNoImage} />
                  )}
                  <Text numberOfLines={1} style={styles.movieDetailNameText}>
                    {cast.name}
                  </Text>
                  <Text numberOfLines={1} style={styles.movieDetailCharacterText}>
                    {cast.character}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
            <View style={styles.itemSeperator} />
            <TouchableOpacity style={styles.movieDetailDirectorButton}>
              <View style={styles.flexRow}>
                <Text>Director</Text>
                <Text style={styles.movieDetailDirectorNameText}>{movieDirector}</Text>
              </View>
              <Ionicons style={styles.customGoBackIcon} name="ios-arrow-forward" size={14} color={colors.gray} />
            </TouchableOpacity>
            <View style={styles.itemSeperator} />
            <View style={[styles.flexRow, { marginTop: 4 }]}>
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
                <Text style={[styles.readMoreButtonText, { marginLeft: 10 }]}>See all</Text>
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
                  style={styles.movieDetailImageButton}>
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
                  <Text numberOfLines={1} style={styles.movieDetailNameText}>
                    {recommennedMovie.title}
                  </Text>
                  <AnimatedCircularProgress
                    style={{ marginTop: 4 }}
                    size={28}
                    width={1}
                    dashedTint={{ width: 2, gap: 2 }}
                    dashedBackground={{ width: 2, gap: 2 }}
                    fill={recommennedMovie.vote_average * 10}
                    tintColor={recommennedMovie.vote_average > 7 ? colors.green : colors.gold}
                    backgroundColor={recommennedMovie.vote_average > 7 ? colors.lightGreen : colors.lightGold}>
                    {fill => <Text style={styles.voteAverageText}>{`${recommennedMovie.vote_average * 10}%`}</Text>}
                  </AnimatedCircularProgress>
                </TouchableOpacity>
              ))}
            </ScrollView>
            <View style={styles.itemSeperator} />
            <Text bold style={styles.subTitle}>
              Trailer
            </Text>
            <YouTube apiKey={youtubeApiKey} videoId={videoId} style={styles.movieDetailYoutube} fullscreen />
            <Text />
          </ScrollView>
        </React.Fragment>
      )}
      <View>
        <Modal animationType="slide" visible={isModalVisible} presentationStyle="pageSheet">
          <Text>TEST</Text>
        </Modal>
      </View>
    </View>
  );
};

export default MovieDetail;
