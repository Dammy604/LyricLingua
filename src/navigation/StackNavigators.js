import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from '../screens/HomeScreen';
import SearchScreen from '../screens/SearchScreen';
import NowPlayingScreen from '../screens/NowPlayingScreen';
import CommunityScreen from '../screens/CommunityScreen';
import LearnScreen from '../screens/LearnScreen';
import LibraryScreen from '../screens/LibraryScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SettingsScreen from '../screens/SettingsScreen';
import TranslationEditScreen from '../screens/TranslationEditScreen';
import VersionHistoryScreen from '../screens/VersionHistoryScreen';
import useTheme from '../hooks/useTheme';

const HomeStack = createStackNavigator();
const SearchStack = createStackNavigator();
const PlayerStack = createStackNavigator();
const CommunityStack = createStackNavigator();
const LearnStack = createStackNavigator();

const useStackScreenOptions = () => {
  const { colors } = useTheme();
  return React.useMemo(
    () => ({
      headerStyle: { backgroundColor: colors.surface },
      headerTintColor: colors.text,
      headerTitleStyle: { color: colors.text },
      contentStyle: { backgroundColor: colors.background },
    }),
    [colors],
  );
};

export const HomeStackNavigator = () => {
  const screenOptions = useStackScreenOptions();

  return (
    <HomeStack.Navigator screenOptions={screenOptions}>
      <HomeStack.Screen name="HomeMain" component={HomeScreen} options={{ title: 'Home' }} />
      <HomeStack.Screen name="Library" component={LibraryScreen} options={{ title: 'Library' }} />
      <HomeStack.Screen name="Profile" component={ProfileScreen} options={{ title: 'Profile' }} />
    </HomeStack.Navigator>
  );
};

export const SearchStackNavigator = () => {
  const screenOptions = useStackScreenOptions();

  return (
    <SearchStack.Navigator screenOptions={screenOptions}>
      <SearchStack.Screen name="SearchMain" component={SearchScreen} options={{ title: 'Search' }} />
    </SearchStack.Navigator>
  );
};

export const PlayerStackNavigator = () => {
  const screenOptions = useStackScreenOptions();

  return (
    <PlayerStack.Navigator screenOptions={screenOptions}>
      <PlayerStack.Screen
        name="NowPlayingMain"
        component={NowPlayingScreen}
        options={{ title: 'Now Playing' }}
      />
      <PlayerStack.Screen name="Settings" component={SettingsScreen} options={{ title: 'Settings' }} />
    </PlayerStack.Navigator>
  );
};

export const CommunityStackNavigator = () => {
  const screenOptions = useStackScreenOptions();

  return (
    <CommunityStack.Navigator screenOptions={screenOptions}>
      <CommunityStack.Screen
        name="CommunityMain"
        component={CommunityScreen}
        options={{ title: 'Community' }}
      />
      <CommunityStack.Screen
        name="VersionHistory"
        component={VersionHistoryScreen}
        options={{ title: 'Version History' }}
      />
    </CommunityStack.Navigator>
  );
};

export const LearnStackNavigator = () => {
  const screenOptions = useStackScreenOptions();

  return (
    <LearnStack.Navigator screenOptions={screenOptions}>
      <LearnStack.Screen name="LearnMain" component={LearnScreen} options={{ title: 'Learn' }} />
      <LearnStack.Screen
        name="TranslationEdit"
        component={TranslationEditScreen}
        options={{ title: 'Translation Editor' }}
      />
    </LearnStack.Navigator>
  );
};

export default {
  HomeStackNavigator,
  SearchStackNavigator,
  PlayerStackNavigator,
  CommunityStackNavigator,
  LearnStackNavigator,
};




