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

const baseUrl = 'https://api.themoviedb.org/3';
const baseImageUrl = 'https://image.tmdb.org/t/p/w500';
const apiKey = '9f856681c9163f666d3789c63c4b482e';
const language = 'tr-TR';

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
        source={{ uri: `${baseImageUrl}${movie.poster_path}` }}
      />
      <View style={styles.textContainer}>
        <Element bold style={styles.title}>
          {movie.title}
        </Element>
        <Element style={styles.releaseDate}>{movie.vote_average}</Element>
        <Element style={styles.releaseDate}>{movie.release_date}</Element>
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

  useEffect(() => {
    setLoading(true);
    const get = async endpoint => {
      switch (selectedIndex) {
        case 0:
          endpoint = '/movie/popular';
          break;
        case 1:
          endpoint = '/movie/top_rated';
          break;
        case 2:
          endpoint = '/movie/upcoming';
          break;
        case 3:
          endpoint = '/movie/now_playing';
          break;
      }
      const result = await fetch(
        `${baseUrl}${endpoint}?api_key=${apiKey}&language=${language}&page=1`,
      );
      const res = await result.json();
      setMovies(res.results);
      setLoading(false);
    };
    get();
  }, [selectedIndex]);

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={styles.container}>
        <Element style={styles.listHeader} bold>
          MOVIES
        </Element>
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
  },
  title: {
    fontSize: 18,
  },
  releaseDate: {
    fontSize: 16,
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
});
export default Movies;
