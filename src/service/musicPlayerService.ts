import TrackPlayer, {Event} from 'react-native-track-player';

export async function setupPlayer(): Promise<boolean> {
  try {
    await TrackPlayer.getActiveTrackIndex();
  } catch (error) {
    await TrackPlayer.setupPlayer();
  }
  return true;
}

export function playbackService(): void {
  TrackPlayer.addEventListener(Event.RemotePause, () => TrackPlayer.pause());
  TrackPlayer.addEventListener(Event.RemotePlay, () => TrackPlayer.play());
  TrackPlayer.addEventListener(Event.RemoteNext, () =>
    TrackPlayer.skipToNext(),
  );
  TrackPlayer.addEventListener(Event.RemotePrevious, () =>
    TrackPlayer.skipToPrevious(),
  );
}
