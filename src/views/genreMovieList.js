import React, { useEffect, useState } from 'react';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { getMoviesByGenre } from '../networkManager';
import MovieRow from '../views/movieRow';
import { colors } from '../theme/color';
import Ionicons from 'react-native-vector-icons/Ionicons';

const GenreMovieList = ({ navigation, route }) => {
  const [movieList, setMovieList] = useState([]);
  const { genreId, genreName } = route.params;

  useEffect(() => {
    getMoviesByGenre(genreId).then(cast => setMovieList(cast));
  }, [genreId]);

  return (
    <SafeAreaView>
      <TouchableOpacity
        style={styles.goBackButton}
        onPress={() => navigation.goBack()}>
        <Ionicons name="ios-arrow-back" size={30} color={colors.gold} />
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>
      <View style={{ paddingHorizontal: 20, marginTop: 10 }}>
        <Text style={styles.headerText}>{genreName}</Text>
        <View style={styles.itemSeperator} />
        <FlatList
          style={{ marginTop: 10 }}
          data={movieList}
          showsVerticalScrollIndicator={false}
          // contentContainerStyle={{ paddingBottom: 10 }}
          renderItem={({ item }) => (
            <MovieRow navigation={navigation} movie={item} />
          )}
          ItemSeparatorComponent={() => <View style={styles.itemSeperator} />}
          keyExtractor={item => item.id.toString()}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  itemSeperator: {
    height: 1,
    backgroundColor: colors.seperator,
    marginVertical: 6,
  },
  headerText: {
    color: colors.gold,
    fontFamily: 'Fjalla One',
    fontSize: 30,
  },
  goBackButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
    marginTop: 8,
  },
  backButtonText: {
    color: colors.gold,
    fontWeight: 'bold',
    fontFamily: 'Fjalla One',
    fontSize: 16,
    marginLeft: 4,
  },
});

export default GenreMovieList;
