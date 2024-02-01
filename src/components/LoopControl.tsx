import React, {useCallback, useMemo, useState} from 'react';
import {Pressable, StyleSheet, ToastAndroid} from 'react-native';
import TrackPlayer, {RepeatMode} from 'react-native-track-player';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

const LoopControl = () => {
  const [isLoop, setIsLoop] = useState(false);

  const toggleLoop = useCallback(async () => {
    const currentRepeatMode = await TrackPlayer.getRepeatMode();

    if (currentRepeatMode === RepeatMode.Track) {
      await TrackPlayer.setRepeatMode(RepeatMode.Off);
      ToastAndroid.show('Loop removed...', ToastAndroid.SHORT);
      setIsLoop(false);
    } else {
      await TrackPlayer.setRepeatMode(RepeatMode.Track);
      ToastAndroid.show('Loop added...', ToastAndroid.SHORT);
      setIsLoop(true);
    }
  }, []);

  const color = useMemo(() => (isLoop ? '#59a6fe' : '#FFF'), [isLoop]);

  return (
    <Pressable onPress={toggleLoop} style={styles.iconContainer}>
      <MaterialIcon style={{color}} name="loop" size={32} color="#FFF" />
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

export default LoopControl;
