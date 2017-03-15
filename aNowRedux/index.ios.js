import React, { Component } from 'react';
import { AppRegistry, Text, StyleSheet, View } from 'react-native';

// Redux
import C from './constants';
import allReducers from './store/reducers'
import { initialState } from './initialState.json'
import { createStore } from 'redux'
import { Provider } from 'react-redux'

let store = createStore(allReducers, initialState);

console.log("initial state: " + JSON.stringify(store.getState()));

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

class GeoLocation extends React.Component {

  watchID: ?number = null;

  componentDidMount() {

    store.subscribe(() => console.log(store.getState()))

    navigator.geolocation.getCurrentPosition(
      (position) => {
        var initialPosition = position;
        var action = {
            type: C.SET_LOCATION,
            payload: {
                "latitude": initialPosition.coords.latitude,
                "longitude": initialPosition.coords.longitude
            }
        }
        store.dispatch(action);
      },
      (error) => alert(JSON.stringify(error)),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );
    this.watchID = navigator.geolocation.watchPosition((position) => {
        var lastPosition = position;
        var action = {
            type: C.SET_LOCATION,
            payload: {
                "latitude": lastPosition.coords.latitude,
                "longitude": lastPosition.coords.longitude
            }
        }
        store.dispatch(action);
    });
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }

  displayPosition() {
    return "hello";
    // let position = state.initialPosition.coords;
    // if (state.lastPosition !== "unknown") {
    //     position = state.lastPosition.coords;
    // } else if (state.initialPosition !== "unknown") {
    //     position = state.initialPosition.coords;
    // } else {
    //     position = {
    //         "latitude": 0,
    //         "longitude": 0,
    //     };
    // }
    // return `${position.latitude}, ${position.longitude}`;
  }

  render() {
    return (
      <View>
        <Text>
          <Text style={styles.title}>Latest position: </Text>
          {this.displayPosition()}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    backgroundColor: 'blue',
    flex: 1,
    justifyContent: 'center', 
    alignItems: 'center', 
  },
  title: {
    fontSize: 14
  }
});

AppRegistry.registerComponent('aNowRedux', () => HelloWorldApp);
