import React, {useCallback} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Slider from '@react-native-community/slider';
import TrackPlayer, {useProgress} from 'react-native-track-player';

const SliderControl = () => {
  const {position, duration} = useProgress();

  const changeDuration = useCallback(
    async (dur: number) => await TrackPlayer.seekTo(dur),
    [],
  );

  return (
    <View style={styles.row}>
      <Text style={styles.duration}>
        {new Date(position * 1000).toISOString().substring(15, 19)}
      </Text>
      <Slider
        style={styles.slider}
        value={position}
        minimumValue={0}
        maximumValue={duration}
        onSlidingComplete={value => changeDuration(value)}
      />
      <Text style={styles.duration}>
        {new Date((duration - position) * 1000).toISOString().substring(15, 19)}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  duration: {
    color: '#FFF',
  },
  slider: {
    flex: 1,
  },
});

export default SliderControl;
