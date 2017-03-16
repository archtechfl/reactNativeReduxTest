import React, { Component } from 'react';
import { AppRegistry, Text, StyleSheet, View } from 'react-native';

// Redux
import C from './constants';
import allReducers from './store/reducers'
import { createStore } from 'redux'
import { Provider, connect } from 'react-redux'

// Component
import GeoLocation from './components/GeoLocation'

const store = createStore(allReducers);
window.store = store

class HelloWorldApp extends Component {
  render() {
    return (
        <Provider store={store}>
          <View style={styles.container}>
            <Text style={styles.text}>Finding next departure for nearest stop</Text>
            <GeoLocation/>
          </View>
        </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    backgroundColor: 'lightblue',
    flex: 1,
    justifyContent: 'center', 
    alignItems: 'center', 
  },
  title: {
    fontSize: 14
  }
});

AppRegistry.registerComponent('aNowRedux', () => HelloWorldApp);
