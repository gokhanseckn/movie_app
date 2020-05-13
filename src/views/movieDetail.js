import React, { useState, useEffect } from 'react';
import {
  Button,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import Element from '../../src/components/element';
import YouTube from 'react-native-youtube';

const MovieDetail = ({ route, navigation }) => {
  const { movie } = route.params;
  const videoUrl = `https://api.themoviedb.org/3/movie/${
    movie.id
  }/videos?api_key=9f856681c9163f666d3789c63c4b482e&language=en-US`;
  const [videoId, setVideoId] = useState('0');
  const [showVideo, setShowVideo] = useState(false);
  const baseImageUrl = 'https://image.tmdb.org/t/p/w500';

  useEffect(() => {
    const getVideo = async () => {
      const result = await fetch(videoUrl);
      const res = await result.json();
      setVideoId(res.results[0].key);
    };
    getVideo();
  }, [videoUrl]);

  return (
    <SafeAreaView style={styles.container}>
      {showVideo ? (
        <YouTube
          apiKey={'AIzaSyDiMl-ZHJQ-1vnvJH00Q6kYwOuk3kcX3vk'}
          videoId={videoId}
          style={styles.youtube}
          fullscreen
          play
        />
      ) : (
        <Image
          style={styles.image}
          resizeMode="contain"
          source={{ uri: `${baseImageUrl}${movie.poster_path}` }}
        />
      )}
      <Button title="Watch Trailer" onPress={() => setShowVideo(true)} />
      <ScrollView>
        <View style={styles.subContainer}>
          <Element bold style={styles.overview}>
            Overview
          </Element>
          <Element>{movie.overview}</Element>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#EDEDEF',
  },
  youtube: {
    height: 300,
  },
  subContainer: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  overview: {
    marginBottom: 10,
  },
  image: {
    height: 300,
  },
});

export default MovieDetail;
