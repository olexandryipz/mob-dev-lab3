import React, { useRef } from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';
import {
  TapGestureHandler,
  LongPressGestureHandler,
  PanGestureHandler,
  FlingGestureHandler,
  GestureHandlerRootView,
  Directions,
  PinchGestureHandler,
  State,
} from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  runOnJS,
  withSequence,
  withSpring,
} from 'react-native-reanimated';
import { useProgress } from '../context/ProgressContext';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const { increment, addProgress, progress } = useProgress();

  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const offsetX = useSharedValue(0);
  const offsetY = useSharedValue(0);
  const scale = useSharedValue(1);
  const visible = useSharedValue(true);

  const doubleTapRef = useRef(null);
  const flingLeftRef = useRef(null);
  const flingRightRef = useRef(null);
  const panRef = useRef(null);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
      { scale: scale.value },
    ],
    opacity: visible.value ? 1 : 0,
  }));

  const pulse = () => {
    scale.value = withSequence(
      withSpring(1.12),
      withTiming(1, { duration: 1 })
    );
  };

  const resetPosition = () => {
    translateX.value = withTiming(0);
    translateY.value = withTiming(0);
    offsetX.value = 0;
    offsetY.value = 0;
    visible.value = true;
  };

  const onSwipe = (dir: 'flingLeft' | 'flingRight') => {
    visible.value = false;
    runOnJS(addProgress)(dir);
    runOnJS(increment)(randomPoints());
    setTimeout(() => {
      runOnJS(resetPosition)();
    }, 3000);
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text style={styles.score}>Scores: {progress.score}</Text>

        <FlingGestureHandler
          ref={flingRightRef}
          direction={Directions.RIGHT}
          numberOfPointers={1}
          simultaneousHandlers={[flingLeftRef, panRef]}
          onHandlerStateChange={({ nativeEvent }) => {
            if (nativeEvent.state === State.END) {
              runOnJS(onSwipe)('flingRight');
            }
          }}
        >
          <FlingGestureHandler
            ref={flingLeftRef}
            direction={Directions.LEFT}
            numberOfPointers={1}
            simultaneousHandlers={[flingRightRef, panRef]}
            onHandlerStateChange={({ nativeEvent }) => {
              if (nativeEvent.state === State.END) {
                runOnJS(onSwipe)('flingLeft');
              }
            }}
          >
            <PanGestureHandler
              ref={panRef}
              simultaneousHandlers={[flingLeftRef, flingRightRef]}
              onGestureEvent={(e) => {
                translateX.value = offsetX.value + e.nativeEvent.translationX;
                translateY.value = offsetY.value + e.nativeEvent.translationY;
              }}
              onEnded={() => {
                offsetX.value = translateX.value;
                offsetY.value = translateY.value;
                runOnJS(addProgress)('pan');
              }}
            >
              <LongPressGestureHandler
                onHandlerStateChange={({ nativeEvent }) => {
                  if (nativeEvent.state === State.ACTIVE) {
                    runOnJS(addProgress)('longPress');
                    runOnJS(increment)(5);
                    pulse();
                  }
                }}
                minDurationMs={1000}
              >
                <TapGestureHandler
                  ref={doubleTapRef}
                  numberOfTaps={2}
                  maxDelayMs={300}
                  onActivated={() => {
                    runOnJS(addProgress)('doubleClicks');
                    runOnJS(increment)(2);
                    pulse();
                  }}
                >
                  <TapGestureHandler
                    waitFor={doubleTapRef}
                    onActivated={() => {
                      runOnJS(addProgress)('clicks');
                      runOnJS(increment)(1);
                      pulse();
                    }}
                  >
                    <Animated.View style={[styles.circle, animatedStyle]}>
                      <PinchGestureHandler
                        onGestureEvent={(e) => {
                          scale.value = e.nativeEvent.scale;
                        }}
                        onEnded={() => {
                          if (scale.value > 1.2 || scale.value < 0.8) {
                            runOnJS(addProgress)('pinch');
                            runOnJS(increment)(5);
                          }
                          scale.value = withTiming(1);
                        }}
                      >
                        <Animated.Image
                          source={require('../../assets/images/click.png')}
                          style={[styles.image, { transform: [{ scale: scale.value }] }]}
                        />
                      </PinchGestureHandler>
                    </Animated.View>
                  </TapGestureHandler>
                </TapGestureHandler>
              </LongPressGestureHandler>
            </PanGestureHandler>
          </FlingGestureHandler>
        </FlingGestureHandler>
      </View>
    </GestureHandlerRootView>
  );
}

const randomPoints = () => Math.floor(Math.random() * 6) + 1;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  score: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  circle: {
    width: 130,
    height: 130,
    borderRadius: 65,
    backgroundColor: '#eee',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 80,
    height: 80,
  },
});
