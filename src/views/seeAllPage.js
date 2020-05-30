import React from 'react';
import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { baseImageUrl } from '../networkManager';
import MovieRow from '../views/movieRow';
import { colors } from '../theme/color';

const seeAllPage = ({ navigation, route }) => {
  const { type, cast, header, movie } = route.params;
  return (
    <SafeAreaView>
      <TouchableOpacity
        style={styles.goBackButton}
        onPress={() => navigation.goBack()}>
        <Ionicons
          style={styles.goBackIcon}
          name="ios-arrow-back"
          size={30}
          color={colors.gold}
        />
        <Text style={styles.header}>{header}</Text>
      </TouchableOpacity>
      {type === 'cast' && (
        <FlatList
          style={styles.list}
          contentContainerStyle={styles.flatListContentContainer}
          data={cast}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.castContainer}>
              {item.profile_path ? (
                <Image
                  style={styles.image}
                  source={{ uri: `${baseImageUrl}${item.profile_path}` }}
                />
              ) : (
                <Image style={styles.noImage} />
              )}
              <View style={styles.textContainer}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.character}>{item.character}</Text>
              </View>
              <Ionicons
                style={styles.forwardIcon}
                name="ios-arrow-forward"
                size={18}
                color={colors.gray}
              />
            </TouchableOpacity>
          )}
          ItemSeparatorComponent={() => <View style={styles.itemSeperator} />}
          keyExtractor={item => item.id.toString()}
        />
      )}
      {type === 'movie' && (
        <FlatList
          style={styles.movieList}
          data={movie}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.flatListContentContainer}
          ListHeaderComponent={() => (
            <React.Fragment>
              <Text style={styles.recommennedMoviesText}>
                Recommenned Movies
              </Text>
              <View style={styles.itemSeperator} />
            </React.Fragment>
          )}
          renderItem={({ item }) => (
            <MovieRow navigation={navigation} movie={item} />
          )}
          ItemSeparatorComponent={() => <View style={styles.itemSeperator} />}
          keyExtractor={item => item.id.toString()}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  goBackButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
    marginTop: 8,
  },
  header: {
    color: colors.gold,
    fontWeight: 'bold',
    fontFamily: 'Fjalla One',
    fontSize: 16,
    marginLeft: 4,
  },
  list: {
    marginTop: 10,
  },
  flatListContentContainer: {
    paddingBottom: 40,
  },
  itemSeperator: {
    height: 1,
    backgroundColor: colors.seperator,
    marginVertical: 10,
  },
  castContainer: {
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    height: 100,
    width: 75,
    borderRadius: 8,
  },
  noImage: {
    height: 100,
    width: 75,
    borderRadius: 8,
    backgroundColor: colors.lightGray,
  },
  textContainer: {
    marginLeft: 20,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  character: {
    color: colors.gray,
  },
  forwardIcon: {
    marginLeft: 'auto',
  },
  recommennedMoviesText: {
    color: colors.gold,
    fontFamily: 'Fjalla One',
    fontSize: 30,
  },
  movieList: {
    paddingLeft: 20,
    marginTop: 10,
  },
});

export default seeAllPage;
