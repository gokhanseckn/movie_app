import React from 'react';
import { Image, TouchableOpacity, Text, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { baseImageUrl } from '../networkManager';
import { colors } from '../theme/color';
import styles from '../assets/styles/index';

const formatDate = date => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  date = new Date(date);
  return date.toLocaleDateString('en-US', options);
};

const MovieRow = ({ navigation, movie }) => (
  <TouchableOpacity
    style={[styles.flexRow]}
    onPress={() =>
      navigation.push('MovieDetail', {
        headerTitle: movie.title,
        movie: movie,
      })
    }>
    <React.Fragment>
      {movie.poster_path ? (
        <View style={styles.imageContainerShadow}>
          <Image style={styles.movieRowImage} source={{ uri: `${baseImageUrl}${movie.poster_path}` }} />
        </View>
      ) : (
        <View style={styles.movieRowNoImage} />
      )}
      <View style={styles.movieRowTextContainer}>
        <Text bold style={styles.movieRowMovieTitle}>
          {movie.title || movie.name}
        </Text>
        <View style={styles.movieRowVoteContainer}>
          <AnimatedCircularProgress
            size={36}
            width={1}
            dashedTint={{ width: 2, gap: 2 }}
            dashedBackground={{ width: 2, gap: 2 }}
            fill={movie.vote_average * 10}
            tintColor={movie.vote_average > 7 ? colors.green : colors.gold}
            backgroundColor={movie.vote_average > 7 ? colors.lightGreen : colors.lightGold}>
            {fill => <Text style={styles.voteAverageText}>{`${movie.vote_average * 10}%`}</Text>}
          </AnimatedCircularProgress>
          <Text style={styles.movieRowReleaseDateText}>{formatDate(movie.release_date)}</Text>
        </View>
        <Text style={styles.movieRowOverviewText} numberOfLines={3}>
          {movie.overview}
        </Text>
      </View>
      <Ionicons style={styles.alignSelfCenter} name="chevron-forward" size={20} />
    </React.Fragment>
  </TouchableOpacity>
);

export default MovieRow;
