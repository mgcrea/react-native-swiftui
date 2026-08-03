import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withSequence,
  withTiming,
  interpolateColor,
} from 'react-native-reanimated';

interface AnimatedButtonProps {
  title: string;
  onPress?: () => void;
  variant?: 'pulse' | 'rainbow' | 'bounce' | 'glow';
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export const AnimatedButton: React.FC<AnimatedButtonProps> = ({
  title,
  onPress,
  variant = 'pulse',
}) => {
  const scale = useSharedValue(1);
  const colorProgress = useSharedValue(0);
  const glowIntensity = useSharedValue(0);

  const handlePressIn = () => {
    switch (variant) {
      case 'pulse':
        scale.value = withSpring(0.95);
        colorProgress.value = withTiming(1, { duration: 150 });
        break;
      case 'bounce':
        scale.value = withSequence(
          withTiming(0.9, { duration: 100 }),
          withSpring(1.1, { damping: 10 }),
          withSpring(1, { damping: 8 })
        );
        break;
      case 'rainbow':
        colorProgress.value = withSequence(
          withTiming(1, { duration: 200 }),
          withTiming(0, { duration: 200 })
        );
        break;
      case 'glow':
        glowIntensity.value = withSpring(1);
        scale.value = withSpring(1.05);
        break;
    }
  };

  const handlePressOut = () => {
    switch (variant) {
      case 'pulse':
        scale.value = withSpring(1);
        colorProgress.value = withTiming(0, { duration: 200 });
        break;
      case 'glow':
        glowIntensity.value = withSpring(0);
        scale.value = withSpring(1);
        break;
    }
  };

  const animatedStyle = useAnimatedStyle(() => {
    const baseStyle = {
      transform: [{ scale: scale.value }],
    };

    switch (variant) {
      case 'pulse':
        return {
          ...baseStyle,
          backgroundColor: interpolateColor(
            colorProgress.value,
            [0, 1],
            ['#3B82F6', '#1D4ED8']
          ),
        };
      case 'rainbow':
        return {
          ...baseStyle,
          backgroundColor: interpolateColor(
            colorProgress.value,
            [0, 0.2, 0.4, 0.6, 0.8, 1],
            ['#EF4444', '#F97316', '#EAB308', '#22C55E', '#3B82F6', '#8B5CF6']
          ),
        };
      case 'bounce':
        return {
          ...baseStyle,
          backgroundColor: '#10B981',
        };
      case 'glow':
        return {
          ...baseStyle,
          backgroundColor: '#8B5CF6',
          shadowColor: '#8B5CF6',
          shadowOpacity: glowIntensity.value * 0.8,
          shadowRadius: glowIntensity.value * 20,
          elevation: glowIntensity.value * 10,
        };
      default:
        return baseStyle;
    }
  });

  const textAnimatedStyle = useAnimatedStyle(() => {
    if (variant === 'rainbow') {
      return {
        color: interpolateColor(
          colorProgress.value,
          [0, 1],
          ['white', '#1F2937']
        ),
      };
    }
    return {
      color: 'white',
    };
  });

  return (
    <AnimatedPressable
      style={[styles.button, animatedStyle]}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={onPress}
    >
      <Animated.Text style={[styles.buttonText, textAnimatedStyle]}>
        {title}
      </Animated.Text>
    </AnimatedPressable>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 8,
    minHeight: 48,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});