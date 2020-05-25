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
      {movie.poster_path ? (
        <Image
          style={styles.movieImage}
          source={{ uri: `${baseImageUrl}${movie.poster_path}` }}
        />
      ) : (
        <View style={styles.noImage} />
      )}
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
            {fill => (
              <Element style={styles.voteAverage}>{`${movie.vote_average *
                10}%`}</Element>
            )}
          </AnimatedCircularProgress>

          <Element style={styles.releaseDate}>{movie.release_date}</Element>
        </View>

        <Element style={styles.overview} numberOfLines={3}>
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
    paddingHorizontal: 16,
    justifyContent: 'space-around',
  },
  title: {
    color: '#c9ae4b',
    fontFamily: 'Fjalla One',
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
    color: 'gray',
    lineHeight: 20,
  },
  icon: {
    alignSelf: 'center',
  },
  noImage: {
    width: 100,
    height: 150,
    backgroundColor: '#CED0CE',
    borderRadius: 8,
  },
  voteAverage: {
    fontSize: 10,
    fontWeight: 'bold',
  },
});

export default MovieRow;
