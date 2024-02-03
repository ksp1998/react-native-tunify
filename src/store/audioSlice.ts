import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Song} from 'react-native-get-music-files/lib/typescript/src/NativeTurboSongs';

interface AudioState {
  audioFiles: string | Song[];
  favorites: Song[];
}

const initialState: AudioState = {
  audioFiles: [],
  favorites: [],
};

const audioSlice = createSlice({
  name: 'audio',
  initialState,
  reducers: {
    setAudioFiles: (state, action: PayloadAction<string | Song[]>) => {
      state.audioFiles = action.payload;
    },
    addFavorites: (state, action: PayloadAction<Song[]>) => {
      if (typeof action.payload !== 'string') {
        state.favorites = action.payload;
      }
    },
    addToFavorites: (state, action: PayloadAction<Song>) => {
      if (typeof action.payload !== 'string') {
        state.favorites = [...state.favorites, action.payload];
      }
    },
    removeFromFavorites: (state, action: PayloadAction<Song>) => {
      state.favorites = state.favorites.filter(
        item =>
          typeof action.payload !== 'string' && item.url !== action.payload.url,
      );
    },
  },
});

export const {
  setAudioFiles,
  addFavorites,
  addToFavorites,
  removeFromFavorites,
} = audioSlice.actions;

export default audioSlice.reducer;
