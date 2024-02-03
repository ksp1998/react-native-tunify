import React, {useEffect, useState} from 'react';
import {TunesList} from '../components';
import {useAudioFiles} from '../utils/hooks/useAudioFiles';
import {useDispatch} from 'react-redux';

import * as MusicFiles from 'react-native-get-music-files';
import {setAudioFiles} from '../store/audioSlice';
import {Alert} from 'react-native';
import {usePermissions} from '../utils/hooks/usePermissions';

const AllTunesList = (): JSX.Element => {
  const [refreshing, setRefreshing] = useState<boolean>(true);
  const dispatch = useDispatch();
  const {audioFiles} = useAudioFiles(refreshing);
  const permissions: boolean = usePermissions();

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

    permissions && fetchAudioFiles();
  }, [dispatch, audioFiles.length, refreshing, permissions]);

  return (
    <TunesList
      tunes={audioFiles}
      refreshing={refreshing}
      setRefreshing={setRefreshing}
    />
  );
};

export default AllTunesList;
