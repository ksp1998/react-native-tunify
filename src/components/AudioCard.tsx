import React, {PropsWithChildren} from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import {Song} from 'react-native-get-music-files/lib/typescript/src/NativeTurboSongs';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

interface Props extends PropsWithChildren {
  tune: Song;
  onChangeAudio: () => void;
}

const TuneCard = ({tune, onChangeAudio}: Props) => {
  return (
    <Pressable
      style={styles.container}
      android_ripple={{color: '#FFFFFF22'}}
      onPress={onChangeAudio}
      onLongPress={() => {}}>
      <FontAwesome
        name="music"
        color="#FFF"
        size={28}
        style={styles.musicIcon}
      />
      <View style={styles.detailsContainer}>
        <Text style={styles.titleText} numberOfLines={1}>
          {tune?.title}
        </Text>
        <View style={styles.metaContainer}>
          <Text style={styles.artistsText}>{tune.artist}</Text>
          <Text style={styles.duration}>
            {new Date(tune.duration).toISOString().substring(15, 19)}
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    gap: 12,
    marginHorizontal: 8,
    paddingHorizontal: 8,
    paddingVertical: 12,
    borderBottomWidth: 0.5,
    borderColor: '#FFF',
  },
  detailsContainer: {
    flex: 1,
    gap: 4,
  },
  musicIcon: {},
  titleText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  metaContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  artistsText: {
    color: '#FFF',
    fontSize: 12,
  },
  duration: {
    color: '#FFF',
    fontSize: 10,
    alignSelf: 'flex-end',
  },
});

export default TuneCard;
