/**
 * AppNavigator
 * Main app navigation structure
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

import BottomTabNavigator from './BottomTabNavigator';
import useTheme from '../hooks/useTheme';

const RootStack = createStackNavigator();
const AuthStack = createStackNavigator();
const MainStack = createStackNavigator();

const AuthPlaceholderScreen = () => {
  const { colors, spacing, radius } = useTheme();
  const styles = React.useMemo(
    () =>
      StyleSheet.create({
        container: {
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: colors.background,
          padding: spacing(2),
        },
        card: {
          backgroundColor: colors.surface,
          padding: spacing(3),
          borderRadius: radius,
          width: '90%',
          maxWidth: 360,
          alignItems: 'center',
        },
        title: {
          fontSize: 20,
          color: colors.text,
          fontWeight: '600',
          marginBottom: spacing(1),
        },
        subtitle: {
          color: colors.muted,
          textAlign: 'center',
        },
      }),
    [colors, spacing, radius],
  );

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Authentication</Text>
        <Text style={styles.subtitle}>
          Auth flow placeholder. Wire this up to Supabase or your provider of choice.
        </Text>
      </View>
    </View>
  );
};

const AuthStackNavigator = () => {
  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
      <AuthStack.Screen name="AuthPlaceholder" component={AuthPlaceholderScreen} />
    </AuthStack.Navigator>
  );
};

const MainAppNavigator = () => {
  const { colors } = useTheme();

  return (
    <MainStack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: colors.background },
      }}
    >
      <MainStack.Screen name="MainTabs" component={BottomTabNavigator} />
    </MainStack.Navigator>
  );
};

const AppNavigator = () => {
  const { colors } = useTheme();
  const [isAuthenticated] = React.useState(true);

  return (
    <RootStack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: colors.background },
      }}
    >
      {isAuthenticated ? (
        <RootStack.Screen name="MainApp" component={MainAppNavigator} />
      ) : (
        <RootStack.Screen name="AuthFlow" component={AuthStackNavigator} />
      )}
    </RootStack.Navigator>
  );
};

export default AppNavigator;




