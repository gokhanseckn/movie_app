import React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Movies from '../src/views/movies';
import MovieDetail from '../src/views/movieDetail';
import SeeAllPage from '../src/views/seeAllPage';
import PersonDetail from '../src/views/personDetail';
import Discover from '../src/views/discover';
import MyList from '../src/views/myList';
import GenreMovieList from '../src/views/genreMovieList';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { colors } from './theme/color';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const MovieStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Movies"
      component={Movies}
      options={() => ({
        headerShown: false,
      })}
    />
    <Stack.Screen
      name="MovieDetail"
      component={MovieDetail}
      options={({ route }) => ({
        headerShown: false,
      })}
    />
    <Stack.Screen
      name="SeeAllPage"
      component={SeeAllPage}
      options={({ route }) => ({
        headerShown: false,
      })}
    />
    <Stack.Screen
      name="PersonDetail"
      component={PersonDetail}
      options={({ route }) => ({
        headerShown: false,
      })}
    />
    <Stack.Screen
      name="GenreMovieList"
      component={GenreMovieList}
      options={({ route }) => ({
        headerShown: false,
      })}
    />
  </Stack.Navigator>
);

const DiscoverStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Discover"
      component={Discover}
      options={() => ({
        headerShown: false,
      })}
    />
    <Stack.Screen
      name="MovieDetail"
      component={MovieDetail}
      options={({ route }) => ({
        headerShown: false,
      })}
    />
    <Stack.Screen
      name="SeeAllPage"
      component={SeeAllPage}
      options={({ route }) => ({
        headerShown: false,
      })}
    />
    <Stack.Screen
      name="PersonDetail"
      component={PersonDetail}
      options={({ route }) => ({
        headerShown: false,
      })}
    />
    <Stack.Screen
      name="GenreMovieList"
      component={GenreMovieList}
      options={({ route }) => ({
        headerShown: false,
      })}
    />
  </Stack.Navigator>
);

const Navigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        tabBarOptions={{ activeTintColor: colors.gold }}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === 'Movies') {
              iconName = 'ios-film';
            } else if (route.name === 'Discover') {
              iconName = 'ios-albums';
            } else if (route.name === 'My List') {
              iconName = focused ? 'heart' : 'heart-outline';
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}>
        <Tab.Screen name="Movies" component={MovieStack} />
        <Tab.Screen name="Discover" component={DiscoverStack} />
        <Tab.Screen name="My List" component={MyList} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};
export default Navigator;
