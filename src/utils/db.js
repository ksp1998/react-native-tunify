import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase(
  {name: 'tunify.db', location: 'default'},
  () => console.log('Connected to SQLite DB.'),
  error => console.log('Failed to connect to SQLite DB1 => ', error),
);

const createFavoritesTable = () => {
  try {
    db.transaction(tx => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS FAVORITES (ID INTEGER PRIMARY KEY AUTOINCREMENT, tune TEXT);',
        [],
        () => console.log('Table created...'),
        e => console.log('Error in creating the table! => ', e),
      );
    });
  } catch (error) {
    console.log('SQL Error => ', error);
  }
};

const insertFavorite = tune => {
  try {
    db.transaction(tx => {
      tx.executeSql(
        'INSERT INTO FAVORITES (tune) VALUES(?);',
        [JSON.stringify(tune)],
        () => console.log('Tune inserted successfully...'),
        e => console.log('Error in inserting tune! => ', e),
      );
    });
  } catch (error) {
    console.log(error);
  }
};

const removeFavorite = tune => {
  try {
    db.transaction(tx => {
      tx.executeSql(
        'DELETE FROM FAVORITES WHERE tune LIKE ?;',
        [`%${tune.url}%`],
        () => console.log('Tune removed successfully...'),
        e => console.log('Error in removing tune! => ', e),
      );
    });
  } catch (error) {
    console.log(error);
  }
};

export default db;
export {createFavoritesTable, insertFavorite, removeFavorite};
