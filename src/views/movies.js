import React, { useState, useEffect } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import SegmentedControl from '@react-native-community/segmented-control';
import MovieRow from '../views/movieRow';
import PersonRow from '../views/personRow';
import SearchBar from '../components/searchBar';
import { baseImageUrl, getMovies, multiSearch } from '../networkManager';
import { colors } from '../theme/color';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { AnimatedCircularProgress } from 'react-native-circular-progress';

const Movies = ({ navigation }) => {
  const [movies, setMovies] = useState([]);
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
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.listHeader} bold>
            Movies
          </Text>
          {!isSearching && (
            <Ionicons
              onPress={() => setIsMenuTypeList(!isMenuTypeList)}
              style={{ paddingRight: 20 }}
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
              values={['Popular', 'Top Rated', 'Upcoming', 'Now Playing']}
              selectedIndex={selectedIndex}
              onChange={event => {
                setSelectedIndex(event.nativeEvent.selectedSegmentIndex);
              }}
            />
            {isMenuTypeList ? (
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
                ItemSeparatorComponent={() => (
                  <View style={styles.itemSeperator} />
                )}
                keyExtractor={item => item.id.toString()}
              />
            ) : loading ? (
              <ActivityIndicator style={{ marginTop: 200 }} size="large" />
            ) : (
              <ScrollView contentContainerStyle={styles.gridScrollView}>
                {movies.map((movie, index) => (
                  <TouchableOpacity
                    onPress={() =>
                      navigation.push('MovieDetail', {
                        headerTitle: movie.title,
                        movie: movie,
                      })
                    }
                    key={index}
                    style={styles.gridViewMovieButton}>
                    <Image
                      resizeMode="stretch"
                      source={{ uri: `${baseImageUrl}${movie.poster_path}` }}
                      style={styles.gridViewMovieImage}
                    />
                    <View style={styles.gridViewVoteContainer}>
                      <AnimatedCircularProgress
                        size={30}
                        width={2}
                        dashedTint={{ width: 2, gap: 2 }}
                        dashedBackground={{ width: 2, gap: 2 }}
                        fill={movie.vote_average * 10}
                        tintColor={
                          movie.vote_average > 7 ? colors.green : colors.gold
                        }
                        backgroundColor={
                          movie.vote_average > 7
                            ? colors.lightGreen
                            : colors.lightGold
                        }>
                        {fill => (
                          <Text style={styles.voteText}>{`${movie.vote_average *
                            10}%`}</Text>
                        )}
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
                  showsVerticalScrollIndicator={false}
                  contentContainerStyle={styles.flatListContentContainer}
                  renderItem={({ item }) =>
                    loading ? (
                      <ActivityIndicator size="large" />
                    ) : (
                      <MovieRow navigation={navigation} movie={item} />
                    )
                  }
                  ItemSeparatorComponent={() => (
                    <View style={styles.itemSeperator} />
                  )}
                  keyExtractor={item => item.id.toString()}
                />
              </React.Fragment>
            )}
            {people.length > 0 && selectedSearchIndex === 1 && (
              <React.Fragment>
                <FlatList
                  contentContainerStyle={styles.flatListContentContainer}
                  data={people}
                  showsVerticalScrollIndicator={false}
                  renderItem={({ item }) => (
                    <PersonRow navigation={navigation} person={item} />
                  )}
                  ItemSeparatorComponent={() => (
                    <View style={styles.itemSeperator} />
                  )}
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
const styles = StyleSheet.create({
  container: {
    paddingLeft: 20,
    paddingTop: 20,
  },
  flatListContentContainer: {
    paddingBottom: 250,
  },
  segmentedControl: {
    marginBottom: 10,
    marginRight: 20,
  },
  itemSeperator: {
    height: 1,
    backgroundColor: colors.seperator,
    marginVertical: 10,
  },
  listHeader: {
    fontSize: 40,
    marginBottom: 10,
    fontFamily: 'Fjalla One',
    color: colors.gold,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  gridScrollView: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingBottom: 300,
  },
  gridViewMovieButton: {
    marginTop: 10,
    width: '28%',
    height: 150,
    borderRadius: 8,
    marginHorizontal: 8,
    marginBottom: 20,
    shadowColor: colors.black,
    shadowOffset: { width: 2, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    alignItems: 'center',
  },
  gridViewMovieImage: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  gridViewVoteContainer: {
    backgroundColor: '#081c23',
    width: 30,
    height: 30,
    right: 0,
    position: 'absolute',
    top: -10,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  voteText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 10,
  },
});
export default Movies;
