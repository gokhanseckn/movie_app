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
import YouTube from 'react-native-youtube';
import {
  baseImageUrl,
  baseBackdropImageUrl,
  getMovieDetail,
} from '../networkManager';
import Ionicons from 'react-native-vector-icons/Ionicons';

const isIphoneX = Dimensions.get('window').height >= 812;
const MovieDetail = ({ route, navigation }) => {
  const { movie } = route.params;
  const [videoId, setVideoId] = useState('0');
  const [movieDetail, setMovieDetail] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [genres, setGenres] = useState([]);
  const [isBlur, setIsBlur] = useState(true);
  const videoUrl = `https://api.themoviedb.org/3/movie/${
    movie.id
  }/videos?api_key=9f856681c9163f666d3789c63c4b482e&language=en-US`;

  useEffect(() => {
    getMovieDetail(movie.id).then(detail => {
      setMovieDetail(detail);
      setGenres(detail.genres);
      setIsLoading(false);
    });
  }, [movie.id]);

  useEffect(() => {
    const getVideo = async () => {
      const result = await fetch(videoUrl);
      const res = await result.json();
      setVideoId(res.results[0].key);
    };
    getVideo();
  }, [videoUrl]);

  return (
    <React.Fragment>
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
              style={styles.backgropImage}
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
          <View style={styles.detailContainer}>
            <Image
              style={styles.image}
              resizeMode="cover"
              source={{ uri: `${baseImageUrl}${movieDetail.poster_path}` }}
            />
            <ScrollView>
              <View style={styles.subContainer}>
                <Element bold style={styles.overview}>
                  Overview:
                </Element>
                <Element>{movieDetail.overview}</Element>
              </View>
            </ScrollView>
          </View>
        </View>
      )}
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  container: {},
  youtube: {
    height: 240,
    width: 240,
  },
  subContainer: {
    marginTop: 20,
  },
  overview: {
    marginBottom: 10,
    fontFamily: 'Fjalla One',
  },
  backgropImage: {
    width: '100%',
    height: 250,
  },
  image: {
    height: 187.5,
    width: 125,
    borderRadius: 8,
  },
  genreContainer: {
    flexDirection: 'row',
    bottom: 120,
    marginLeft: 20,
  },
  genreButton: {
    borderRadius: 12,
    backgroundColor: 'white',
    flexDirection: 'row',
    marginRight: 8,
    padding: 4,
    height: 24,
    alignItems: 'center',
  },
  genreText: {
    fontSize: 13,
    fontWeight: 'bold',
  },
  icon: {
    marginLeft: 4,
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
    bottom: isIphoneX ? 200 : 220,
    marginLeft: 20,
  },
  detailContainer: {
    bottom: 90,
    paddingHorizontal: 20,
  },
});

export default MovieDetail;
