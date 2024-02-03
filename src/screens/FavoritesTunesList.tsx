import React, {useEffect} from 'react';
import {TunesList} from '../components';
import {useAudioFiles} from '../utils/hooks/useAudioFiles';
import db from '../utils/db';
import {useDispatch} from 'react-redux';
import {addFavorites} from '../store/audioSlice';

const FavoritesTunesList = (): JSX.Element => {
  const {favorites} = useAudioFiles();
  const dispatch = useDispatch();

  useEffect(() => {
    try {
      db.transaction((tx: any) => {
        tx.executeSql(
          'SELECT tune FROM FAVORITES;',
          [],
          (_: any, results: any) => {
            if (results.rows.length) {
              const dbFavorites = results.rows
                .raw()
                .map((item: any) => JSON.parse(item.tune));
              dispatch(addFavorites(dbFavorites));
            }
          },
          (e: Error) => console.log('Error while fetching favorites! => ', e),
        );
      });
    } catch (error: any) {
      console.log('SQL Error getFavorites() => ', error);
    }
  }, [dispatch]);

  return <TunesList tunes={favorites} />;
};

export default FavoritesTunesList;
