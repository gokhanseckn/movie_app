import React, { useEffect, useState } from 'react';
import { FlatList, SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import { getMoviesByGenre } from '../networkManager';
import MovieRow from '../views/movieRow';
import { colors } from '../theme/color';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from '../assets/styles/index';

const GenreMovieList = ({ navigation, route }) => {
  const [movieList, setMovieList] = useState([]);
  const { genreId, genreName } = route.params;

  useEffect(() => {
    getMoviesByGenre(genreId).then(cast => setMovieList(cast));
  }, [genreId]);

  return (
    <SafeAreaView style={styles.genreListContainer}>
      <TouchableOpacity style={styles.goBackButton} onPress={() => navigation.goBack()}>
        <Ionicons style={styles.customGoBackIcon} name="chevron-back" size={24} color={colors.gold} />
        <Text bold style={styles.customGoBackText}>
          Back
        </Text>
      </TouchableOpacity>
      <FlatList
        style={{ marginTop: 10 }}
        ListHeaderComponent={() => (
          <React.Fragment>
            <Text style={styles.customHeaderText}>{genreName}</Text>
            <View style={styles.itemSeperator} />
          </React.Fragment>
        )}
        data={movieList}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => <MovieRow navigation={navigation} movie={item} />}
        ItemSeparatorComponent={() => <View style={styles.itemSeperator} />}
        keyExtractor={item => item.id.toString()}
      />
    </SafeAreaView>
  );
};

export default GenreMovieList;
