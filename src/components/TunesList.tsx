import React, {PropsWithChildren, useState} from 'react';
import {
  FlatList,
  Modal,
  Pressable,
  RefreshControl,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

import {Song} from 'react-native-get-music-files/lib/typescript/src/NativeTurboSongs';
import TrackPlayer from 'react-native-track-player';
import {TuneCard} from '.';
import {useDispatch} from 'react-redux';
import {addToFavorites, removeFromFavorites} from '../store/audioSlice';
import {useAudioFiles} from '../utils/hooks/useAudioFiles';

import {insertFavorite, removeFavorite} from '../utils/db';

interface Props extends PropsWithChildren {
  tunes: string | Song[];
  refreshing?: boolean;
  setRefreshing?: (refreshing: boolean) => void;
}

const TunesList = ({
  tunes,
  refreshing = false,
  setRefreshing,
}: Props): JSX.Element => {
  const dispatch = useDispatch();

  const {audioFiles, favorites} = useAudioFiles();
  const [selectedTune, setSelectedTune] = useState<Song>({
    url: '',
    title: '',
    album: '',
    artist: '',
    duration: 0,
    genre: '',
    cover: '',
  });
  const [optionsModalVisible, setOptionsModalVisible] = useState(false);

  const changeAudio = async (tune: Song) => {
    const index =
      typeof audioFiles !== 'string'
        ? audioFiles?.findIndex(item => item.url === tune.url)
        : -1;

    await TrackPlayer.skip(index);
    await TrackPlayer.play();

    setOptionsModalVisible(false);
  };

  const options = (tune: Song) => {
    setSelectedTune(tune);
    setOptionsModalVisible(!optionsModalVisible);
  };

  const handleAddToFavorites = () => {
    dispatch(addToFavorites(selectedTune));

    insertFavorite(selectedTune);

    ToastAndroid.show(
      selectedTune?.title + ' added to favorites...',
      ToastAndroid.LONG,
    );

    setOptionsModalVisible(false);
  };

  const handleRemoveFromFavorites = () => {
    dispatch(removeFromFavorites(selectedTune));

    removeFavorite(selectedTune);

    ToastAndroid.show(
      selectedTune?.title + ' removed from favorites...',
      ToastAndroid.LONG,
    );

    setOptionsModalVisible(false);
  };

  return (
    <>
      <Modal
        visible={optionsModalVisible}
        transparent={optionsModalVisible}
        animationType="none">
        <TouchableWithoutFeedback
          onPress={() => setOptionsModalVisible(!optionsModalVisible)}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              <Pressable
                style={styles.option}
                android_ripple={{color: '#FFFFFF33'}}
                onPress={() => changeAudio(selectedTune)}>
                <Text>Play</Text>
              </Pressable>

              {favorites
                .map(item => item.url)
                .find((item: string) => item === selectedTune.url) ? (
                <Pressable
                  style={styles.option}
                  android_ripple={{color: '#FFFFFF33'}}
                  onPress={handleRemoveFromFavorites}>
                  <Text>Remove from favorites</Text>
                </Pressable>
              ) : (
                <Pressable
                  style={styles.option}
                  android_ripple={{color: '#FFFFFF33'}}
                  onPress={handleAddToFavorites}>
                  <Text>Add to favorites</Text>
                </Pressable>
              )}
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      <FlatList
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => setRefreshing && setRefreshing(true)}
          />
        }
        data={typeof tunes === 'string' ? [] : tunes}
        renderItem={({item}) => (
          <TuneCard
            tune={item}
            onChangeAudio={() => changeAudio(item)}
            onOptions={() => options(item)}
          />
        )}
        keyExtractor={(_, index) => index.toString()}
        style={styles.container}
      />
    </>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    height: '100%',
    backgroundColor: '#02061788',
    justifyContent: 'center',
  },
  modalContainer: {
    margin: 20,
    backgroundColor: '#020617',
    borderWidth: 2,
    borderColor: '#59a6fe',
    borderRadius: 8,
  },
  option: {
    padding: 16,
    borderBottomWidth: 1,
    borderColor: '#020617',
  },
  container: {
    flex: 1,
    backgroundColor: '#020617',
  },
});

export default TunesList;
