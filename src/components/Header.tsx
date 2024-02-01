import React, {useRef, useState} from 'react';
import {View, Text, StyleSheet, TextInput, Pressable} from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const Header = (): JSX.Element => {
  const searchInputRef = useRef<TextInput>(null);
  const [search, setSearch] = useState('');
  const [searching, setSearching] = useState<boolean>(false);

  const handleClickSearch = () => {
    setSearching(true);
    setTimeout(() => searchInputRef.current?.focus(), 0);
  };

  const hanldeCloseSearch = () => {
    setSearching(false);
    setSearch('');
  };

  return (
    <View style={styles.container}>
      {!searching && (
        <>
          <Text style={styles.headerText}>Tunify</Text>
          <Pressable
            onPress={handleClickSearch}
            style={[styles.iconContainer, styles.flexGrow]}>
            <MaterialIcon name="search" size={24} color="#FFF" />
          </Pressable>
          <FontAwesome name="bookmark-o" size={24} color="#FFF" />
        </>
      )}

      {searching && (
        <>
          <MaterialIcon name="search" size={24} color="#FFF" />
          <TextInput
            value={search}
            onChangeText={setSearch}
            placeholder="Search..."
            style={styles.searchInput}
            ref={searchInputRef}
          />
          <Pressable onPress={hanldeCloseSearch} style={styles.iconContainer}>
            <MaterialIcon name="close" size={24} color="#FFF" />
          </Pressable>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 12,
    backgroundColor: '#020617',
    borderBottomWidth: 0.5,
    borderColor: 'lightgray',
    padding: 16,
  },
  headerText: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  flexGrow: {flex: 1},
  iconContainer: {
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  searchInput: {
    flexGrow: 1,
    padding: 0,
    borderBottomWidth: 1,
    borderColor: 'gray',
  },
});

export default Header;
