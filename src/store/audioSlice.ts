import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Song} from 'react-native-get-music-files/lib/typescript/src/NativeTurboSongs';

interface AudioState {
  audioFiles: string | Song[];
}

const initialState: AudioState = {
  audioFiles: [],
};

const audioSlice = createSlice({
  name: 'audio',
  initialState,
  reducers: {
    setAudioFiles: (state, action: PayloadAction<string | Song[]>) => {
      state.audioFiles = action.payload;
    },
  },
});

export const {setAudioFiles} = audioSlice.actions;

export default audioSlice.reducer;
