import React, { useState, useEffect } from 'react';
import {
  ActivityIndicator,
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

const Movies = ({ navigation }) => {
  const [movies, setMovies] = useState([]);
  const [people, setPeople] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedSearchIndex, setSelectedSearchIndex] = useState(0);
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
        <Element style={styles.listHeader} bold>
          App Name
        </Element>
        <SearchBar onChangeText={searchText => search(searchText)} />
        {!isSearching ? (
          <React.Fragment>
            <SegmentedControl
              tintColor={'#c9ae4b'}
              textColor="black"
              activeTextColor="white"
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
              ItemSeparatorComponent={() => (
                <View style={styles.itemSeperator} />
              )}
              keyExtractor={item => item.id.toString()}
            />
          </React.Fragment>
        ) : (
          <React.Fragment>
            <SegmentedControl
              tintColor={'#c9ae4b'}
              textColor="black"
              activeTextColor="white"
              style={styles.segmentedControl}
              values={['Movies', 'People']}
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
    height: 32,
  },
  itemSeperator: {
    height: 1,
    backgroundColor: '#CED0CE',
    marginVertical: 10,
  },
  listHeader: {
    fontSize: 40,
    marginBottom: 10,
    fontFamily: 'Fjalla One',
    color: '#c9ae4b',
  },
});
export default Movies;
