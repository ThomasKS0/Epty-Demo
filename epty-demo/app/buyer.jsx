import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, Animated, PanResponder, Dimensions } from 'react-native';

const SLIDER_WIDTH = Dimensions.get('window').width - 60;
const SLIDER_MIN = 0;
const SLIDER_MAX = 100;

export default function CustomRangeSlider() {
  const [range, setRange] = useState([20, 80]);

  const leftThumb = useRef(new Animated.Value((range[0] / SLIDER_MAX) * SLIDER_WIDTH)).current;
  const rightThumb = useRef(new Animated.Value((range[1] / SLIDER_MAX) * SLIDER_WIDTH)).current;

  const leftStart = useRef(0);
  const rightStart = useRef(0);

  const updateValue = () => {
    const left = Math.round((leftThumb.__getValue() / SLIDER_WIDTH) * SLIDER_MAX);
    const right = Math.round((rightThumb.__getValue() / SLIDER_WIDTH) * SLIDER_MAX);
    setRange([Math.min(left, right), Math.max(left, right)]);
  };

  const createPanResponder = (thumb, startRef) =>
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        startRef.current = thumb.__getValue(); // Save the current thumb position
      },
      onPanResponderMove: (_, gestureState) => {
        let newPos = Math.min(
          Math.max(0, startRef.current + gestureState.dx),
          SLIDER_WIDTH
        );
        thumb.setValue(newPos);
        updateValue();
      },
    });

  const leftPanResponder = useRef(createPanResponder(leftThumb, leftStart)).current;
  const rightPanResponder = useRef(createPanResponder(rightThumb, rightStart)).current;

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Price range: {range[0]} - {range[1]}</Text>
      <View style={styles.slider}>
        <View style={styles.track} />
        <Animated.View
          {...leftPanResponder.panHandlers}
          style={[styles.thumb, { left: leftThumb }]}
        />
        <Animated.View
          {...rightPanResponder.panHandlers}
          style={[styles.thumb, { left: rightThumb }]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 30,
    marginTop: 100,
  },
  text: {
    fontSize: 18,
    marginBottom: 40,
  },
  slider: {
    height: 40,
    justifyContent: 'center',
    position: 'relative',
  },
  track: {
    height: 4,
    backgroundColor: '#ccc',
    position: 'absolute',
    width: SLIDER_WIDTH,
  },
  thumb: {
    width: 24,
    height: 24,
    backgroundColor: '#007AFF',
    borderRadius: 12,
    position: 'absolute',
    top: -10,
  },
});
