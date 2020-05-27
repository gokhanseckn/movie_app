import React from 'react';
import { Image, TouchableOpacity, StyleSheet, Text, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { baseImageUrl } from '../networkManager';
import { colors } from '../theme/color';

const formatDate = date => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  date = new Date(date);
  return date.toLocaleDateString('en-US', options);
};

const MovieRow = ({ navigation, movie }) => (
  <TouchableOpacity
    style={styles.movieRowContainer}
    onPress={() =>
      navigation.navigate('MovieDetail', {
        headerTitle: movie.title,
        movie: movie,
      })
    }>
    <React.Fragment>
      {movie.poster_path ? (
        <View style={styles.imageContainer}>
          <Image
            style={styles.movieImage}
            source={{ uri: `${baseImageUrl}${movie.poster_path}` }}
          />
        </View>
      ) : (
        <View style={styles.noImage} />
      )}

      <View style={styles.textContainer}>
        <Text bold style={styles.title}>
          {movie.title || movie.name}
        </Text>
        <View style={styles.voteContainer}>
          <AnimatedCircularProgress
            size={40}
            width={3}
            dashedTint={{ width: 2, gap: 2 }}
            dashedBackground={{ width: 2, gap: 2 }}
            fill={movie.vote_average * 10}
            tintColor={movie.vote_average > 7 ? colors.green : colors.gold}
            backgroundColor={
              movie.vote_average > 7 ? colors.lightGreen : colors.lightGold
            }>
            {fill => (
              <Text style={styles.voteAverage}>{`${movie.vote_average *
                10}%`}</Text>
            )}
          </AnimatedCircularProgress>

          <Text style={styles.releaseDate}>
            {formatDate(movie.release_date)}
          </Text>
        </View>

        <Text style={styles.overview} numberOfLines={3}>
          {movie.overview}
        </Text>
      </View>

      <Ionicons style={styles.icon} name="ios-arrow-forward" size={20} />
    </React.Fragment>
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
    color: colors.gold,
    fontFamily: 'Fjalla One',
    fontSize: 16,
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
  imageContainer: {
    shadowColor: colors.black,
    shadowOffset: { width: 2, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
});

export default MovieRow;
