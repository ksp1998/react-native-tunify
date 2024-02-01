import React, {PropsWithChildren, useEffect, useState} from 'react';
import {FlatList, RefreshControl, StyleSheet, ToastAndroid} from 'react-native';
import {AudioCard} from '.';

import {Alert, Platform} from 'react-native';

import {
  check,
  PERMISSIONS,
  request,
  RESULTS,
  requestMultiple,
} from 'react-native-permissions';

import * as MusicFiles from 'react-native-get-music-files';
import {useDispatch, useSelector} from 'react-redux';
import {setAudioFiles} from '../store/audioSlice';
import {RootState} from '../store/store';
import {Song} from 'react-native-get-music-files/lib/typescript/src/NativeTurboSongs';
import TrackPlayer, {RepeatMode} from 'react-native-track-player';
import {setupPlayer} from '../service/musicPlayerService';

interface Props extends PropsWithChildren {
  tunes: string | Song[];
}

const TunesList = ({tunes}: Props): JSX.Element => {
  const [refreshing, setRefreshing] = useState<boolean>(true);
  const dispatch = useDispatch();
  const audioFiles = useSelector((state: RootState) => state.audio.audioFiles);

  useEffect(() => {
    if (!refreshing && audioFiles.length > 0) {
      setRefreshing(false);
      return;
    }

    const fetchAudioFiles = async () => {
      try {
        const musicFiles = await MusicFiles.getAll({
          limit: -1,
        });

        dispatch(setAudioFiles(musicFiles));
      } catch (error: any) {
        Alert.alert('Error fetching audio files:', error.message);
      } finally {
        setRefreshing(false);
      }
    };

    const hasPermissions = async () => {
      if (Platform.OS === 'android') {
        let hasPermission =
          (await check(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE)) ===
            RESULTS.GRANTED ||
          (await check(PERMISSIONS.ANDROID.READ_MEDIA_AUDIO)) ===
            RESULTS.GRANTED;

        if (!hasPermission) {
          const permissions = await requestMultiple([
            PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
            PERMISSIONS.ANDROID.READ_MEDIA_AUDIO,
          ]);

          hasPermission = permissions ? true : false;
        }

        return hasPermission;
      }

      if (Platform.OS === 'ios') {
        let hasPermission =
          (await check(PERMISSIONS.IOS.MEDIA_LIBRARY)) === RESULTS.GRANTED;
        if (!hasPermission) {
          hasPermission =
            (await request(PERMISSIONS.IOS.MEDIA_LIBRARY)) === RESULTS.GRANTED;
        }

        return hasPermission;
      }

      return false;
    };

    (async () => {
      const permissions = await hasPermissions();
      permissions && fetchAudioFiles();
    })();
  }, [dispatch, audioFiles.length, refreshing]);

  useEffect(() => {
    async function setup() {
      await setupPlayer();

      if (typeof audioFiles !== 'string') {
        await TrackPlayer.add(audioFiles);
        await TrackPlayer.setRepeatMode(RepeatMode.Queue);
      }
    }
    setup();
  }, [audioFiles]);

  const changeAudio = async (index: number) => {
    await TrackPlayer.skip(index);
    await TrackPlayer.play();
    typeof audioFiles !== 'string' &&
      ToastAndroid.show(audioFiles[index]?.title, ToastAndroid.LONG);
  };

  return (
    <FlatList
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={() => setRefreshing(true)}
        />
      }
      data={typeof tunes === 'string' ? [] : tunes}
      renderItem={({item, index}) => (
        <AudioCard tune={item} onChangeAudio={() => changeAudio(index)} />
      )}
      keyExtractor={(item, index) => `${item.album}-${item.title}-${index}`}
      style={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#020617',
  },
});

export default TunesList;
