import React from 'react';
import { View, FlatList, Text, StyleSheet, Image } from 'react-native';
import { useProgress } from '../context/ProgressContext';
import Ionicons from '@expo/vector-icons/Ionicons';

const tasks = [
  {
    id: '1',
    icon: require('../../assets/images/fingerprint.png'),
    title: 'Tap 10 times',
    subtitle: 'Tap on the clicker object 10 times',
    check: (p: any) => p.clicks >= 10,
    progress: (p: any) => `${Math.min(p.clicks, 10)}/10`,
  },
  {
    id: '2',
    icon: require('../../assets/images/double-tap.png'),
    title: 'Double-tap 5 times',
    subtitle: 'Double-tap on the clicker 5 times',
    check: (p: any) => p.doubleClicks >= 5,
    progress: (p: any) => `${Math.min(p.doubleClicks, 5)}/5`,
  },
  {
    id: '3',
    icon: require('../../assets/images/press.png'),
    title: 'Long press 3 seconds',
    subtitle: 'Hold the clicker for 3 seconds',
    check: (p: any) => p.longPress,
  },
  {
    id: '4',
    icon: require('../../assets/images/drag.png'),
    title: 'Drag the object',
    subtitle: 'Drag the clicker around the screen',
    check: (p: any) => p.pan,
  },
  {
    id: '5',
    icon: require('../../assets/images/swipe-right.png'),
    title: 'Swipe right',
    subtitle: 'Perform a quick swipe right gesture',
    check: (p: any) => p.flingRight,
  },
  {
    id: '6',
    icon: require('../../assets/images/swipe-left.png'),
    title: 'Swipe left',
    subtitle: 'Perform a quick swipe left gesture',
    check: (p: any) => p.flingLeft,
  },
  {
    id: '7',
    icon: require('../../assets/images/pinch.png'),
    title: 'Pinch to resize',
    subtitle: 'Use pinch gesture to resize the clicker',
    check: (p: any) => p.pinch,
  },
  {
    id: '8',
    icon: require('../../assets/images/trophy.png'),
    title: 'Reach 100 points',
    subtitle: 'Reach 100 points in the counter',
    check: (p: any) => p.score >= 100,
    progress: (p: any) => `${Math.min(p.score, 100)}/100`,
  },
];

export default function AboutScreen() {
  const { progress } = useProgress();

  return (
    <View style={styles.container}>
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 20 }}
        renderItem={({ item }) => {
          const done = item.check(progress);
          return (
            <View style={[styles.taskItem, done && styles.taskDone]}>
              <View style={styles.leftSection}>
                <Image source={item.icon} style={styles.icon} />
              </View>
              <View style={styles.middleSection}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.subtitle}>{item.subtitle}</Text>
                {item.progress && !done && (
                  <Text style={styles.progress}>{item.progress(progress)}</Text>
                )}
              </View>
              <View style={styles.rightSection}>
                {done ? (
                  <Ionicons name="checkmark-circle" size={28} color="#4CAF50" />
                ) : (
                  <Ionicons name="ellipse-outline" size={24} color="#bbb" />
                )}
              </View>
            </View>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  taskItem: {
    flexDirection: 'row',
    backgroundColor: '#F2F4F7',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    alignItems: 'center',
  },
  taskDone: {
    backgroundColor: '#E4F7E7',
  },
  leftSection: {
    marginRight: 12,
  },
  icon: {
    width: 36,
    height: 36,
  },
  middleSection: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  subtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 4,
  },
  progress: {
    fontSize: 13,
    color: '#FB923C',
    marginTop: 4,
  },
  rightSection: {
    marginLeft: 10,
  },
});
