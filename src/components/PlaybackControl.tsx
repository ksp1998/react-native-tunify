import React, {useCallback} from 'react';
import {Pressable, StyleSheet} from 'react-native';
import TrackPlayer, {State, usePlaybackState} from 'react-native-track-player';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const PlaybackControl = () => {
  const {state: playbackState} = usePlaybackState();

  const togglePlayback = useCallback(async (playback: State) => {
    const currentTrack = await TrackPlayer.getActiveTrackIndex();

    if (currentTrack !== null) {
      if (playback === State.Paused || playback === State.Ready) {
        await TrackPlayer.play();
      } else {
        await TrackPlayer.pause();
      }
    }
  }, []);

  return (
    <Pressable
      onPress={() => playbackState && togglePlayback(playbackState)}
      style={styles.iconContainer}>
      <FontAwesome
        name={playbackState === State.Playing ? 'pause' : 'play'}
        size={32}
        color="#FFF"
      />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default PlaybackControl;
