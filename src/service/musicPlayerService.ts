import TrackPlayer, {Event} from 'react-native-track-player';

export async function setupPlayer(): Promise<boolean> {
  try {
    await TrackPlayer.getActiveTrackIndex().catch(e =>
      console.log('IErr => ', e),
    );
  } catch (error) {
    await TrackPlayer.setupPlayer().catch(e => console.log('Err => ', e));
  }
  return true;
}

export function playbackService(): void {
  try {
    TrackPlayer.addEventListener(Event.RemotePause, () => TrackPlayer.pause());
    TrackPlayer.addEventListener(Event.RemotePlay, () => TrackPlayer.play());
    TrackPlayer.addEventListener(Event.RemoteNext, () =>
      TrackPlayer.skipToNext(),
    );
    TrackPlayer.addEventListener(Event.RemotePrevious, () =>
      TrackPlayer.skipToPrevious(),
    );
  } catch (error) {
    console.log('platbackService Error => ', error);
  }
}
