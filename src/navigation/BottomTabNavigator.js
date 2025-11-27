/**
 * BottomTabNavigator
 * Main bottom tab navigation
 */

import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { Platform, StyleSheet, View } from 'react-native';

import useTheme from '../hooks/useTheme';
import {
  CommunityStackNavigator,
  HomeStackNavigator,
  LearnStackNavigator,
  PlayerStackNavigator,
  SearchStackNavigator,
} from './StackNavigators';

const Tab = createBottomTabNavigator();

const TABS = [
  {
    name: 'Home',
    component: HomeStackNavigator,
    icon: 'home',
    iconOutline: 'home-outline',
  },
  {
    name: 'Search',
    component: SearchStackNavigator,
    icon: 'search',
    iconOutline: 'search-outline',
  },
  {
    name: 'Now Playing',
    component: PlayerStackNavigator,
    icon: 'play-circle',
    iconOutline: 'play-circle-outline',
  },
  {
    name: 'Learn',
    component: LearnStackNavigator,
    icon: 'school',
    iconOutline: 'school-outline',
  },
  {
    name: 'Community',
    component: CommunityStackNavigator,
    icon: 'people',
    iconOutline: 'people-outline',
  },
];

const BottomTabNavigator = () => {
  const { colors } = useTheme();
  const styles = React.useMemo(
    () =>
      StyleSheet.create({
        tabBar: {
          backgroundColor: colors.surface,
          borderTopWidth: 1,
          borderTopColor: colors.muted,
          height: Platform.OS === 'ios' ? 80 : 68,
          paddingBottom: Platform.OS === 'ios' ? 18 : 10,
          paddingTop: 6,
        },
        tabLabel: {
          fontSize: 12,
        },
        iconContainer: {
          alignItems: 'center',
          justifyContent: 'center',
        },
        activeIndicator: {
          position: 'absolute',
          top: -6,
          width: 6,
          height: 6,
          borderRadius: 3,
          backgroundColor: colors.primary,
        },
      }),
    [colors],
  );

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.muted,
        tabBarShowLabel: true,
        tabBarLabelStyle: styles.tabLabel,
      }}
    >
      {TABS.map((tab) => (
        <Tab.Screen
          key={tab.name}
          name={tab.name}
          component={tab.component}
          options={{
            tabBarIcon: ({ focused, color }) => (
              <View style={styles.iconContainer}>
                <Ionicons
                  name={focused ? tab.icon : tab.iconOutline}
                  size={24}
                  color={color}
                />
                {focused && <View style={styles.activeIndicator} />}
              </View>
            ),
          }}
        />
      ))}
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;




