import React, { type PropsWithChildren } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

type ScreenContainerProps = PropsWithChildren<{
  scrollable?: boolean;
  contentContainerStyle?: object;
}>;

export function ScreenContainer({
  children,
  scrollable = false,
  contentContainerStyle,
}: ScreenContainerProps) {
  if (scrollable) {
    return (
      <ScrollView
        style={styles.container}
        contentContainerStyle={[styles.content, contentContainerStyle]}
        contentInsetAdjustmentBehavior="automatic"
      >
        {children}
      </ScrollView>
    );
  }

  return <View style={styles.container}>{children}</View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    padding: 16,
    paddingBottom: 32,
  },
});
