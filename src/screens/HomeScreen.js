import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import ScreenShell, { SectionCard } from '../components/ui/ScreenShell';
import useTheme from '../hooks/useTheme';

const recentItems = [
  { title: 'Spanish • Beginner', subtitle: 'Practice with “La Playa”' },
  { title: 'French • Intermediate', subtitle: 'Chanson du Soir review' },
];

const quickActions = [
  { label: 'Search Songs', icon: 'search', route: 'Search', type: 'tab' },
  { label: 'Start Practice', icon: 'school', route: 'Learn', type: 'tab' },
  { label: 'View Library', icon: 'library', route: 'Library', type: 'stack' },
  { label: 'Community', icon: 'people', route: 'Community', type: 'tab' },
];

const createStyles = (colors, spacing, radius) =>
  StyleSheet.create({
    pillRow: {
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    pill: {
      paddingHorizontal: spacing(2),
      paddingVertical: spacing(1),
      borderRadius: radius,
      backgroundColor: colors.primary + '33',
      marginRight: spacing(1),
      marginBottom: spacing(1),
    },
    pillText: {
      color: colors.text,
      fontWeight: '600',
    },
    listItem: {
      paddingVertical: spacing(1),
    },
    listTitle: {
      color: colors.text,
      fontWeight: '600',
      marginBottom: 2,
    },
    listSubtitle: {
      color: colors.muted,
    },
    actionsGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
    },
    actionButton: {
      width: '48%',
      backgroundColor: colors.surface,
      borderRadius: radius,
      padding: spacing(2),
      marginBottom: spacing(2),
      borderWidth: 1,
      borderColor: colors.muted + '40',
      flexDirection: 'row',
      alignItems: 'center',
    },
    actionLabel: {
      color: colors.text,
      fontWeight: '600',
      marginLeft: spacing(1),
    },
  });

const HomeScreen = ({ navigation }) => {
  const { colors, spacing, radius } = useTheme();
  const styles = React.useMemo(() => createStyles(colors, spacing, radius), [colors, spacing, radius]);

  return (
    <ScreenShell title="Home" subtitle="Welcome back to LyricLingua">
      <SectionCard title="Continue learning" description="Pick up where you left off.">
        <View style={styles.pillRow}>
          <View style={styles.pill}>
            <Text style={styles.pillText}>Daily streak • 0 days</Text>
          </View>
          <View style={styles.pill}>
            <Text style={styles.pillText}>Songs unlocked • 0</Text>
          </View>
        </View>
      </SectionCard>

      <SectionCard title="Recent lessons" description="Jump back into your last sessions.">
        {recentItems.map((item) => (
          <View key={item.title} style={styles.listItem}>
            <Text style={styles.listTitle}>{item.title}</Text>
            <Text style={styles.listSubtitle}>{item.subtitle}</Text>
          </View>
        ))}
      </SectionCard>

      <SectionCard title="Quick actions" description="Core areas of the app at a tap.">
        <View style={styles.actionsGrid}>
          {quickActions.map((action) => (
            <TouchableOpacity
              key={action.label}
              style={styles.actionButton}
              onPress={() => {
                if (action.type === 'stack') {
                  navigation.navigate(action.route);
                } else {
                  navigation.getParent()?.navigate(action.route);
                }
              }}
            >
              <Ionicons name={action.icon} size={20} color={colors.primary} />
              <Text style={styles.actionLabel}>{action.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </SectionCard>
    </ScreenShell>
  );
};

export default HomeScreen;




