import React, { useState, useEffect } from 'react';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  StatusBar,
} from 'react-native';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

const baseUrl = 'https://api.themoviedb.org/3';
const apiKey = '9f856681c9163f666d3789c63c4b482e';
const language = 'en-US';

const MovieRow = ({ movie }) => (
  <View>
    <Text>{movie.title}</Text>
  </View>
);

const MoviesScreen = () => {
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    const get = async endpoint => {
      const result = await fetch(
        `${baseUrl}/movie/now_playing?api_key=${apiKey}&language=${language}&page=1`,
      );
      const res = await result.json();
      setMovies(res.results);
    };
    get();
  }, []);

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <FlatList
          data={movies}
          renderItem={({ item }) => <MovieRow movie={item} />}
          keyExtractor={item => item.id.toString()}
        />
      </SafeAreaView>
    </>
  );
};

const DiscoverScreen = () => (
  <>
    <StatusBar barStyle="dark-content" />
    <SafeAreaView>
      <Text>Discover</Text>
    </SafeAreaView>
  </>
);
const MyListScreen = () => (
  <>
    <StatusBar barStyle="dark-content" />
    <SafeAreaView>
      <Text>MyList</Text>
    </SafeAreaView>
  </>
);

const Tab = createBottomTabNavigator();
const App = () => (
  <NavigationContainer>
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Movies') {
            iconName = 'ios-film';
          } else if (route.name === 'Discover') {
            iconName = 'ios-albums';
          } else if (route.name === 'My List') {
            iconName = 'ios-heart';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}>
      <Tab.Screen name="Movies" component={MoviesScreen} />
      <Tab.Screen name="Discover" component={DiscoverScreen} />
      <Tab.Screen name="My List" component={MyListScreen} />
    </Tab.Navigator>
  </NavigationContainer>
);

const styles = StyleSheet.create({});

export default App;
