import React from 'react';
import { StatusBar } from 'expo-status-bar';

import AppNavigator from '../src/navigation/AppNavigator';
import useTheme from '../src/hooks/useTheme';

const IndexScreen = () => {
  const { colors } = useTheme();

  return (
    <>
      <StatusBar style="light" backgroundColor={colors.background} />
      <AppNavigator />
    </>
  );
};

export default IndexScreen;

