import React, { useState, useEffect } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native';
import Element from '../components/element';
import SegmentedControl from '@react-native-community/segmented-control';
import MovieRow from '../views/movieRow';
import PersonRow from '../views/personRow';
import SearchBar from '../components/searchBar';
import { getMovies, multiSearch } from '../networkManager';
const screenHeight = Dimensions.get('window').height;

const Movies = ({ navigation }) => {
  const [movies, setMovies] = useState([]);
  const [people, setPeople] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
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
        {/* <Element style={styles.listHeader} bold>
          MOVIES
        </Element> */}
        <SearchBar onChangeText={searchText => search(searchText)} />
        <SegmentedControl
          style={styles.segmentedControl}
          values={['Popular', 'Top Rated', 'Upcoming', 'Now Playing']}
          selectedIndex={selectedIndex}
          onChange={event => {
            setSelectedIndex(event.nativeEvent.selectedSegmentIndex);
          }}
        />
        {!isSearching ? (
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
        ) : (
          <React.Fragment>
            {movies.length > 0 && (
              <React.Fragment>
                <Element style={{ marginBottom: 4 }} bold>
                  {`screenHeight:${screenHeight}`}
                </Element>
                <FlatList
                  style={{ height: screenHeight <= 700 ? '36%' : '46%' }}
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
            {people.length > 0 && (
              <React.Fragment>
                <View style={styles.seperator} />
                <Element style={{ marginBottom: 4 }} bold>
                  PERSON
                </Element>
                <FlatList
                  style={{ height: '50%' }}
                  horizontal
                  data={people}
                  renderItem={({ item }) => (
                    <PersonRow navigation={navigation} person={item} />
                  )}
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
    paddingBottom: 80,
  },
  segmentedControl: {
    marginBottom: 10,
    marginRight: 20,
  },
  itemSeperator: {
    marginVertical: 10,
  },
  seperator: {
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
