import {useSelector} from 'react-redux';
import {RootState} from '../../store/store';
import {useEffect} from 'react';
import {setupPlayer} from '../../service/musicPlayerService';
import TrackPlayer, {RepeatMode} from 'react-native-track-player';

export const useAudioFiles = (hardRefresh: boolean = false) => {
  const {audioFiles, favorites} = useSelector(
    (state: RootState) => state.audio,
  );

  useEffect(() => {
    async function setup() {
      await setupPlayer();
      const queue = await TrackPlayer.getQueue();
      if (queue.length > 0 && !hardRefresh) {
        return;
      }

      if (typeof audioFiles !== 'string') {
        await TrackPlayer.add(audioFiles);
        await TrackPlayer.setRepeatMode(RepeatMode.Queue);
      }
    }

    setup();
  }, [audioFiles, hardRefresh]);

  return {audioFiles, favorites};
};
