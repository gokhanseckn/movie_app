import React from 'react';
import { Image, TouchableOpacity, StyleSheet, View } from 'react-native';
import Element from '../components/element';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { baseImageUrl } from '../networkManager';

const MovieRow = ({ navigation, movie }) => (
  <TouchableOpacity
    style={styles.movieRowContainer}
    onPress={() =>
      navigation.navigate('MovieDetail', {
        headerTitle: movie.title,
        movie: movie,
      })
    }>
    <>
      <Image
        style={styles.movieImage}
        source={
          movie.poster_path
            ? { uri: `${baseImageUrl}${movie.poster_path}` }
            : require('../assets/no-image.gif')
        }
      />
      <View style={styles.textContainer}>
        <Element bold style={styles.title}>
          {movie.title || movie.name}
        </Element>
        <View style={styles.voteContainer}>
          <AnimatedCircularProgress
            size={40}
            width={4}
            fill={movie.vote_average * 10}
            tintColor={movie.vote_average > 7 ? '#75cc7d' : '#bfc234'}
            backgroundColor={movie.vote_average > 7 ? '#90e898' : '#e8eb73'}>
            {fill => <Element>{movie.vote_average}</Element>}
          </AnimatedCircularProgress>

          <Element style={styles.releaseDate}>{movie.release_date}</Element>
        </View>

        <Element style={styles.overview} numberOfLines={4}>
          {movie.overview}
        </Element>
      </View>

      <Ionicons style={styles.icon} name="ios-arrow-forward" size={20} />
    </>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  movieRowContainer: {
    flexDirection: 'row',
    paddingRight: 20,
  },
  movieImage: {
    width: 100,
    height: 150,
    borderRadius: 8,
  },
  textContainer: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'space-around',
  },
  title: {
    fontSize: 18,
  },
  voteContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  releaseDate: {
    fontSize: 14,
    marginLeft: 10,
  },
  overview: {
    fontSize: 16,
  },
  icon: {
    alignSelf: 'center',
  },
});

export default MovieRow;
