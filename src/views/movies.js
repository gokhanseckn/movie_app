import React, { useState, useEffect } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import SegmentedControl from '@react-native-community/segmented-control';
import MovieRow from '../views/movieRow';
import PersonRow from '../views/personRow';
import SearchBar from '../components/searchBar';
import { baseImageUrl, getGenres, getMovies, multiSearch } from '../networkManager';
import { colors } from '../theme/color';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import styles from '../assets/styles/index';

const Movies = ({ navigation }) => {
  const [header, setHeader] = useState('Popular');
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [people, setPeople] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedSearchIndex, setSelectedSearchIndex] = useState(0);
  const [isMenuTypeList, setIsMenuTypeList] = useState(true);
  const [endpoint, setEndpoint] = useState('/movie/popular');

  useEffect(() => {
    switch (selectedIndex) {
      case 0:
        setEndpoint('/movie/popular');
        setHeader('Popular');
        break;
      case 1:
        setEndpoint('/movie/top_rated');
        setHeader('Top Rated');
        break;
      case 2:
        setEndpoint('/movie/upcoming');
        setHeader('Upcoming');
        break;
      case 3:
        setEndpoint('/movie/now_playing');
        setHeader('Now Playing');
        break;
      case 4:
        getGenres().then(result => setGenres(result));
        setHeader('Genres');
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
    setIsSearching(true);
    if (searchText.length === 0) {
      setIsSearching(false);
      getMovies(endpoint)
        .then(result => setMovies(result))
        .then(() => setLoading(false));
    } else {
      const res = await multiSearch(searchText);
      let movieArr = [];
      let personArr = [];
      res.map(item => {
        item.media_type === 'person' && personArr.push(item);
        item.media_type === 'movie' && movieArr.push(item);
      });
      setMovies(movieArr);
      setPeople(personArr);
    }
  };

  return (
    <SafeAreaView style={styles.flex}>
      <View style={styles.moviesContainer}>
        <View style={styles.moviesHeaderContainer}>
          <Text style={styles.moviesHeaderText} bold>
            {header}
          </Text>
          {!isSearching && (
            <Ionicons
              onPress={() => setIsMenuTypeList(!isMenuTypeList)}
              name={isMenuTypeList ? 'ios-photos' : 'ios-list'}
              size={24}
              color={colors.gold}
            />
          )}
        </View>
        <SearchBar onChangeText={searchText => search(searchText)} />
        {!isSearching ? (
          <React.Fragment>
            <SegmentedControl
              tintColor={colors.gold}
              textColor={colors.black}
              activeTextColor={colors.white}
              style={styles.segmentedControl}
              values={['Popular', 'Top Rated', 'Upcoming', 'Now Playing', 'Genres']}
              selectedIndex={selectedIndex}
              onChange={event => {
                setSelectedIndex(event.nativeEvent.selectedSegmentIndex);
              }}
            />
            {loading ? (
              <ActivityIndicator style={styles.flex} size="large" />
            ) : isMenuTypeList ? (
              selectedIndex === 4 ? (
                <FlatList
                  data={genres}
                  showsVerticalScrollIndicator={false}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      style={styles.moviesGenreButton}
                      onPress={() =>
                        navigation.push('GenreMovieList', {
                          genreId: item.id,
                          genreName: item.name,
                        })
                      }>
                      <Text>{item.name}</Text>
                      <Ionicons
                        onPress={() => setIsMenuTypeList(!isMenuTypeList)}
                        name={'ios-arrow-forward'}
                        size={18}
                        color={colors.gray}
                      />
                    </TouchableOpacity>
                  )}
                  ItemSeparatorComponent={() => <View style={styles.itemSeperator} />}
                  keyExtractor={item => item.id.toString()}
                />
              ) : (
                <FlatList
                  data={movies}
                  showsVerticalScrollIndicator={false}
                  renderItem={({ item }) => <MovieRow navigation={navigation} movie={item} />}
                  ItemSeparatorComponent={() => <View style={styles.itemSeperator} />}
                  keyExtractor={item => item.id.toString()}
                />
              )
            ) : (
              <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.moviesGridScrollView}>
                {movies.map((movie, index) => (
                  <TouchableOpacity
                    onPress={() =>
                      navigation.push('MovieDetail', {
                        headerTitle: movie.title,
                        movie: movie,
                      })
                    }
                    key={index}
                    style={[styles.moviesGridMovieButton, styles.imageContainerShadow]}>
                    <Image
                      resizeMode="stretch"
                      source={{ uri: `${baseImageUrl}${movie.poster_path}` }}
                      style={styles.moviesGridImage}
                    />
                    <View style={styles.moviesGridVoteContainer}>
                      <AnimatedCircularProgress
                        size={30}
                        width={2}
                        dashedTint={{ width: 2, gap: 2 }}
                        dashedBackground={{ width: 2, gap: 2 }}
                        fill={movie.vote_average * 10}
                        tintColor={movie.vote_average > 7 ? colors.green : colors.gold}
                        backgroundColor={movie.vote_average > 7 ? colors.lightGreen : colors.lightGold}>
                        {fill => <Text style={styles.moviesGridVoteText}>{`${movie.vote_average * 10}%`}</Text>}
                      </AnimatedCircularProgress>
                    </View>
                    <Text numberOfLines={1}>{movie.title}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            )}
          </React.Fragment>
        ) : (
          <React.Fragment>
            <SegmentedControl
              values={['Movies', 'Person']}
              tintColor={colors.gold}
              textColor={colors.black}
              activeTextColor={colors.white}
              style={styles.segmentedControl}
              selectedIndex={selectedSearchIndex}
              onChange={event => {
                setSelectedSearchIndex(event.nativeEvent.selectedSegmentIndex);
              }}
            />
            {movies.length > 0 && selectedSearchIndex === 0 && (
              <React.Fragment>
                <FlatList
                  data={movies}
                  renderItem={({ item }) =>
                    loading ? <ActivityIndicator size="large" /> : <MovieRow navigation={navigation} movie={item} />
                  }
                  ItemSeparatorComponent={() => <View style={styles.itemSeperator} />}
                  keyExtractor={item => item.id.toString()}
                />
              </React.Fragment>
            )}
            {people.length > 0 && selectedSearchIndex === 1 && (
              <React.Fragment>
                <FlatList
                  data={people}
                  renderItem={({ item }) => <PersonRow navigation={navigation} person={item} />}
                  ItemSeparatorComponent={() => <View style={styles.itemSeperator} />}
                  keyExtractor={item => item.id.toString()}
                />
              </React.Fragment>
            )}
          </React.Fragment>
        )}
      </View>
    </SafeAreaView>
  );
};
export default Movies;
