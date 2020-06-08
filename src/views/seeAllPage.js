import React from 'react';
import { FlatList, Image, SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { baseImageUrl } from '../networkManager';
import MovieRow from '../views/movieRow';
import { colors } from '../theme/color';
import styles from '../assets/styles/index';

const seeAllPage = ({ navigation, route }) => {
  const { type, cast, header, movie } = route.params;
  return (
    <SafeAreaView style={styles.seeAllContainer}>
      <TouchableOpacity style={[styles.flexRow, styles.alignItemsCenter]} onPress={() => navigation.goBack()}>
        <Ionicons name="ios-arrow-back" size={30} color={colors.gold} />
        <Text style={styles.seeAllHeaderText}>{header}</Text>
      </TouchableOpacity>
      {type === 'cast' && (
        <FlatList
          showsVerticalScrollIndicator={false}
          style={styles.seeAllList}
          data={cast}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => navigation.push('PersonDetail', { person: item })}
              style={styles.seeAllButtonContainer}>
              <View style={[styles.flexRow, styles.alignItemsCenter]}>
                {item.profile_path ? (
                  <Image style={styles.smallImage} source={{ uri: `${baseImageUrl}${item.profile_path}` }} />
                ) : (
                  <Image style={styles.smallNoImage} />
                )}
                <View style={styles.seeAllTextContainer}>
                  <Text style={styles.seeAllNameText}>{item.name}</Text>
                  <Text style={styles.seeAllCharacterText}>{item.character}</Text>
                </View>
              </View>
              <Ionicons name="ios-arrow-forward" size={18} color={colors.gray} />
            </TouchableOpacity>
          )}
          ItemSeparatorComponent={() => <View style={styles.itemSeperator} />}
          keyExtractor={item => item.id.toString()}
        />
      )}
      {type === 'movie' && (
        <FlatList
          data={movie}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={() => (
            <React.Fragment>
              <Text style={styles.customHeaderText}>Recommenned Movies</Text>
              <View style={styles.itemSeperator} />
            </React.Fragment>
          )}
          renderItem={({ item }) => <MovieRow navigation={navigation} movie={item} />}
          ItemSeparatorComponent={() => <View style={styles.itemSeperator} />}
          keyExtractor={item => item.id.toString()}
        />
      )}
    </SafeAreaView>
  );
};

export default seeAllPage;
