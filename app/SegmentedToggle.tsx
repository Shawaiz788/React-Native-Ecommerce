import React, { useRef, useState } from 'react';
import {
  Animated,
  LayoutChangeEvent,
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';

interface SegmentedToggleProps {
  options?: string[];
  onChange?: (option: string) => void;
  style?: StyleProp<ViewStyle>;
}

export default function SegmentedToggle({
  options = ['Log In', 'Sign Up'],
  onChange,
  style,
}: SegmentedToggleProps) {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [containerWidth, setContainerWidth] = useState<number>(0);
  const translateX = useRef(new Animated.Value(0)).current;

  const segmentWidth = containerWidth / options.length;

  const handlePress = (index: number) => {
    setActiveIndex(index);
    onChange?.(options[index]);
    Animated.spring(translateX, {
      toValue: index * segmentWidth,
      useNativeDriver: true,
      friction: 8,
      tension: 80,
    }).start();
  };

  const onLayout = (e: LayoutChangeEvent) =>
    setContainerWidth(e.nativeEvent.layout.width);

  return (
    <View style={[styles.container, style]} onLayout={onLayout}>
      {containerWidth > 0 && (
        <Animated.View
          style={[
            styles.slider,
            {
              width: segmentWidth - 8,
              transform: [{ translateX: Animated.add(translateX, 4) }],
            },
          ]}
        />
      )}
      {options.map((option, index) => (
        <TouchableOpacity
          key={option}
          style={styles.segment}
          activeOpacity={0.8}
          onPress={() => handlePress(index)}
        >
          <Text style={[styles.label, activeIndex === index && styles.activeLabel]}>
            {option}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#EDEEF2',
    borderRadius: 30,
    height: 56,
    width: '100%',
    padding: 4,
    position: 'relative',
  },
  slider: {
    position: 'absolute',
    top: 4,
    left: 0,
    height: 48,
    backgroundColor: '#FFFFFF',
    borderRadius: 26,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  segment: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#9099A8',
  },
  activeLabel: {
    color: '#0A0A0A',
  },
});