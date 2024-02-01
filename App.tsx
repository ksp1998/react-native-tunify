import React from 'react';
import {ScrollView, StatusBar, StyleSheet} from 'react-native';

import {Controls, Header} from './src/components';
import {NavigationContainer} from '@react-navigation/native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {AllTunesList, FavoritesTunesList} from './src/screens';

import {Provider} from 'react-redux';
import {store as musicStore} from './src/store/store';

const Tab = createMaterialTopTabNavigator();

function App(): JSX.Element {
  return (
    <Provider store={musicStore}>
      <StatusBar barStyle="light-content" backgroundColor={'#020617'} />

      <ScrollView style={styles.container}>
        <Header />
        <Controls />
      </ScrollView>

      <NavigationContainer>
        <Tab.Navigator
          style={styles.screenContainer}
          screenOptions={{
            lazy: false,
            tabBarStyle: styles.tabBarStyle,
            tabBarLabelStyle: styles.tabBarLabelStyle,
          }}>
          <Tab.Screen name="All" component={AllTunesList} />
          <Tab.Screen name="Favorites" component={FavoritesTunesList} />
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 0,
  },
  screenContainer: {
    flexGrow: 1,
  },
  tabBarStyle: {
    backgroundColor: '#020617',
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    padding: 8,
    borderColor: '#FFF',
  },
  tabBarLabelStyle: {
    color: '#FFF',
  },
});

export default App;
