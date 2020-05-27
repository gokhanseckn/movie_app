/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  StatusBar,
} from 'react-native';
import Element from '../../src/components/element';
// import YouTube from 'react-native-youtube';
import {
  baseImageUrl,
  baseBackdropImageUrl,
  getMovieDetail,
} from '../networkManager';
import Ionicons from 'react-native-vector-icons/Ionicons';

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
  const [isCustomlistlicked, setIsCustomlistlicked] = useState(false);
  // const videoUrl = `https://api.themoviedb.org/3/movie/${
  //   movie.id
  // }/videos?api_key=9f856681c9163f666d3789c63c4b482e&language=en-US`;

  const handleWishlist = () => setIsWishlistClicked(!isWishlistClicked);
  const handleSeenlist = () => setIsSeenlistClicked(!isSeenlistClicked);
  const handleCustomlist = () => setIsCustomlistlicked(!isCustomlistlicked);

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
              color={'#c9ae4b'}
            />
            <Element bold style={styles.goBackText}>
              Movies
            </Element>
          </TouchableOpacity>
          <Element numberOfLines={1} style={styles.title}>
            {movieDetail.title}
          </Element>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.genreContainer}>
            {genres.map((genre, index) => (
              <TouchableOpacity key={index} style={styles.genreButton}>
                <Element style={styles.genreText}>{genre.name}</Element>
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
                          ? 'red'
                          : 'transparent',
                      },
                    ]}>
                    <Ionicons
                      style={styles.listIcons}
                      name="ios-heart-empty"
                      color={!isWishlistClicked ? 'red' : 'white'}
                      size={20}
                    />
                    <Element
                      style={[
                        styles.wishlistText,
                        { color: isWishlistClicked ? 'white' : 'red' },
                      ]}>
                      {isWishlistClicked ? 'In wishlist' : 'Wishlist'}
                    </Element>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => handleSeenlist()}
                    style={[
                      styles.listButtons,
                      styles.seenlist,
                      {
                        backgroundColor: isSeenlistClicked
                          ? 'green'
                          : 'transparent',
                      },
                    ]}>
                    <Ionicons
                      style={styles.listIcons}
                      name="ios-eye"
                      color={!isSeenlistClicked ? 'green' : 'white'}
                      size={20}
                    />
                    <Element
                      style={[
                        styles.seenlistText,
                        { color: isSeenlistClicked ? 'white' : 'green' },
                      ]}>
                      {isSeenlistClicked ? 'Seen' : 'Seenlist'}
                    </Element>
                  </TouchableOpacity>
                </View>
                <TouchableOpacity
                  onPress={() => handleCustomlist()}
                  style={[styles.listButtons, styles.customList]}>
                  <Ionicons
                    style={styles.listIcons}
                    name="ios-list"
                    color={!isCustomlistlicked ? '#c7a543' : 'white'}
                    size={20}
                  />
                  <Element style={styles.customlistText}>
                    Add to custom list
                  </Element>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.itemSeperator} />
            <View style={styles.subContainer}>
              <Element bold style={styles.overviewHeaderText}>
                Overview:
              </Element>
              <Element
                numberOfLines={!isReadMoreClicked && 3}
                style={styles.overviewText}>
                {movieDetail.overview}
              </Element>
              <TouchableOpacity
                style={styles.readMoreButton}
                onPress={() => setIsReadMoreClicked(!isReadMoreClicked)}>
                <Element style={styles.readMoreButtonText}>
                  {isReadMoreClicked ? 'Less' : 'Read More'}
                </Element>
              </TouchableOpacity>
            </View>
            <View style={styles.itemSeperator} />
          </View>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
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
  },
  overviewText: {
    color: 'gray',
    lineHeight: 20,
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
    backgroundColor: 'white',
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
    color: '#c9ae4b',
    fontSize: 18,
    fontFamily: 'Fjalla One',
  },
  title: {
    fontFamily: 'Fjalla One',
    color: '#c9ae4b',
    fontSize: 40,
    bottom: isIphoneX ? 190 : 210,
    marginLeft: 20,
  },
  detailContainer: {
    bottom: 96,
    paddingHorizontal: 10,
  },
  imageContainer: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
  },
  detailTopContainer: {
    flexDirection: 'row',
  },
  itemSeperator: {
    height: 1,
    backgroundColor: '#CED0CE',
    marginVertical: 6,
  },
  readMoreButton: {
    marginTop: 6,
  },
  readMoreButtonText: {
    color: '#80acb3',
  },
  listButtonContainer: {
    marginLeft: 10,
    // width: 200,
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
    borderColor: '#c7a543',
    width: '60%',
  },
  wishlist: {
    borderColor: 'red',
  },
  seenlist: {
    borderColor: 'green',
  },
  customlistText: {
    color: '#c7a543',
  },
  seenlistText: {
    color: 'green',
  },
  wishlistText: {
    color: 'red',
  },
});

export default MovieDetail;
