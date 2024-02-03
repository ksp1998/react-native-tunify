import React, {useCallback} from 'react';
import {View, StyleSheet, Pressable, ToastAndroid} from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import TrackPlayer from 'react-native-track-player';
import {LoopControl, PlaybackControl, SliderControl} from '.';

const Controls = (): JSX.Element => {
  const restart = useCallback(async () => {
    await TrackPlayer.seekTo(0);
    ToastAndroid.show('Restarting...', ToastAndroid.SHORT);
  }, []);

  const playPreviousAudio = useCallback(async () => {
    await TrackPlayer.skipToPrevious();
    TrackPlayer.play();
    TrackPlayer.getActiveTrack()
      .then(track => ToastAndroid.show(`${track?.title}`, ToastAndroid.SHORT))
      .catch((error: any) =>
        ToastAndroid.show(`${error?.message}`, ToastAndroid.SHORT),
      );
  }, []);

  const playNextAudio = useCallback(async () => {
    await TrackPlayer.skipToNext();
    TrackPlayer.play();
    TrackPlayer.getActiveTrack()
      .then(track => ToastAndroid.show(`${track?.title}`, ToastAndroid.SHORT))
      .catch((error: any) =>
        ToastAndroid.show(`${error?.message}`, ToastAndroid.SHORT),
      );
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Pressable onPress={restart} style={styles.iconContainer}>
          <MaterialIcon name="refresh" size={32} color="#FFF" />
        </Pressable>

        <View style={styles.row}>
          <Pressable onPress={playPreviousAudio} style={styles.iconContainer}>
            <MaterialIcon name="skip-previous" size={32} color="#FFF" />
          </Pressable>

          <PlaybackControl />

          <Pressable onPress={playNextAudio} style={styles.iconContainer}>
            <MaterialIcon name="skip-next" size={32} color="#FFF" />
          </Pressable>
        </View>

        <LoopControl />
      </View>

      <SliderControl />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignContent: 'center',
    gap: 24,
    paddingHorizontal: 16,
    paddingVertical: 24,
    backgroundColor: '#020617',
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  duration: {
    color: '#FFF',
  },
  slider: {
    flex: 1,
  },
});

export default Controls;
