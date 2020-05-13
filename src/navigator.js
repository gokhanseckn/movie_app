import React from 'react';
import 'react-native-gesture-handler';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Movies from '../src/views/movies';
import MovieDetail from '../src/views/movieDetail';
import Discover from '../src/views/discover';
import MyList from '../src/views/myList';
import Ionicons from 'react-native-vector-icons/Ionicons';

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
        headerTitle: route.params.headerTitle,
        headerStyle: { backgroundColor: '#EDEDEF' },
      })}
    />
  </Stack.Navigator>
);

const Navigator = () => (
  <>
    <StatusBar barStyle="dark-content" />
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
        <Tab.Screen name="Movies" component={MovieStack} />
        <Tab.Screen name="Discover" component={Discover} />
        <Tab.Screen name="My List" component={MyList} />
      </Tab.Navigator>
    </NavigationContainer>
  </>
);
export default Navigator;
