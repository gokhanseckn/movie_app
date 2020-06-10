import React, { useEffect, useState } from 'react';
import { Alert, Dimensions, Image, Modal, SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import { baseImageUrl, discoverMovie } from '../networkManager';
import Carousel from 'react-native-snap-carousel';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { colors } from '../theme/color';
import styles from '../assets/styles/index';

const width = Dimensions.get('window').width;
const isIphoneX = Dimensions.get('window').height >= 812;

const Discover = ({ navigation }) => {
  const [movies, setMovies] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    discoverMovie().then(result => setMovies(result));
  }, []);

  const handleMovieClick = item => {
    navigation.navigate('MovieDetail', {
      headerTitle: item.title,
      movie: item,
    });
  };

  const handleModalClick = () => {
    setIsModalVisible(false);
    setIsModalVisible(true);
  };

  return (
    <SafeAreaView style={styles.discoverContainer}>
      <TouchableOpacity style={styles.discoverMovieRandomButton} onPress={() => handleModalClick()}>
        <Ionicons name={'ios-menu'} size={24} color={colors.lightBlue} />
        <Text style={styles.discoverMovieRandomText}>Random</Text>
      </TouchableOpacity>
      <Carousel
        data={movies}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleMovieClick(item)} style={styles.discoverMovieButtonContainer}>
            <Image source={{ uri: `${baseImageUrl}${item.poster_path}` }} style={styles.discoverMovieImage} />
            <Text style={styles.discoverMovieTitle}>{item.title}</Text>
          </TouchableOpacity>
        )}
        sliderWidth={width}
        itemWidth={isIphoneX ? 320 : 280}
      />
      <View>
        <Modal animationType="slide" visible={isModalVisible} presentationStyle="pageSheet">
          <Text>TEST</Text>
        </Modal>
      </View>
    </SafeAreaView>
  );
};

export default Discover;
