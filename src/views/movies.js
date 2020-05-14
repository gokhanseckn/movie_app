import React, { useState, useEffect } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import Element from '../components/element';
import SegmentedControl from '@react-native-community/segmented-control';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import SearchBar from '../components/searchBar';
import { baseImageUrl, getMovies, multiSearch } from '../networkManager';

const Person = ({ person, navigation }) => (
  <TouchableOpacity
    style={styles.movieRowContainer}
    // onPress={() =>
    //   navigation.navigate('MovieDetail', {
    //     headerTitle: movie.title,
    //     movie: movie,
    //   })
  >
    <Image
      style={styles.image}
      source={
        person.profile_path
          ? { uri: `${baseImageUrl}${person.profile_path}` }
          : require('../assets/no-image.gif')
      }
    />
    <View style={styles.textContainer}>
      <Element bold style={styles.title}>
        {person.name}
      </Element>
      <Element style={styles.overview}>{person.known_for_department}</Element>
      <Element style={styles.overview}>{`Popularity: ${
        person.popularity
      }`}</Element>
    </View>
  </TouchableOpacity>
);

const MovieRow = ({ movie, navigation }) => (
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
        style={styles.image}
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
        <Element style={styles.overview} numberOfLines={5}>
          {movie.overview}
        </Element>
      </View>
      <Ionicons style={styles.icon} name="ios-arrow-forward" size={20} />
    </>
  </TouchableOpacity>
);

const Movies = ({ navigation }) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [endpoint, setEndpoint] = useState('popular');

  useEffect(() => {
    switch (selectedIndex) {
      case 0:
        setEndpoint('/movie/popular');
        break;
      case 1:
        setEndpoint('/movie/top_rated');
        break;
      case 2:
        setEndpoint('/movie/upcoming');
        break;
      case 3:
        setEndpoint('/movie/now_playing');
        break;
    }
  }, [selectedIndex]);

  useEffect(() => {
    setLoading(true);
    getMovies(endpoint)
      .then(result => setMovies(result))
      .then(() => setLoading(false));
  }, [endpoint]);

  const search = async searchText => {
    if (searchText.length === 0) {
      getMovies(endpoint)
        .then(result => setMovies(result))
        .then(() => setLoading(false));
    } else {
      const res = await multiSearch(searchText);
      setMovies(res);
    }
  };

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={styles.container}>
        <Element style={styles.listHeader} bold>
          MOVIES
        </Element>
        <SearchBar onChangeText={searchText => search(searchText)} />
        <SegmentedControl
          style={styles.segmentedControl}
          values={['Popular', 'Top Rated', 'Upcoming', 'Now Playing']}
          selectedIndex={selectedIndex}
          onChange={event => {
            setSelectedIndex(event.nativeEvent.selectedSegmentIndex);
          }}
        />
        <FlatList
          data={movies}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.flatListContentContainer}
          renderItem={({ item }) =>
            loading ? (
              <ActivityIndicator size="large" />
            ) : item.media_type && item.media_type === 'person' ? (
              <Person navigation={navigation} person={item} />
            ) : (
              <MovieRow navigation={navigation} movie={item} />
            )
          }
          ItemSeparatorComponent={() => <View style={styles.itemSeperator} />}
          keyExtractor={item => item.id.toString()}
        />
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  safeAreaView: {
    backgroundColor: 'white',
  },
  container: {
    paddingLeft: 20,
    paddingTop: 20,
  },
  image: {
    width: 150,
    height: 200,
    borderRadius: 8,
  },
  textContainer: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'space-around',
  },
  movieRowContainer: {
    flexDirection: 'row',
    paddingRight: 20,
  },
  flatListContentContainer: {
    paddingBottom: 80,
  },
  segmentedControl: {
    marginBottom: 10,
    marginRight: 20,
    fontFamily: 'georgia',
  },
  title: {
    fontSize: 18,
  },
  releaseDate: {
    fontSize: 16,
    marginLeft: 10,
  },
  overview: {
    fontSize: 16,
  },
  icon: {
    alignSelf: 'center',
  },
  itemSeperator: {
    height: 1,
    backgroundColor: '#CED0CE',
    marginVertical: 10,
  },
  listHeader: {
    fontSize: 24,
    marginBottom: 10,
  },
  voteContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
export default Movies;
