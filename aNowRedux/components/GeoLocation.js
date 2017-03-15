import React, { Component } from 'react';
import { AppRegistry, Text, StyleSheet, View } from 'react-native';

import C from '../constants';
import { Provider, connect } from 'react-redux'

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

class GeoLocation extends React.Component {

  watchID: ?number = null;

  componentDidMount() {

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
    return `${this.props.latitude}, ${this.props.longitude}`;
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

const mapStateToProps = (state) => {

    return {
        latitude: state.position.latitude,
        longitude: state.position.longitude
    }
}

const Container = connect(mapStateToProps)(GeoLocation)

export default Container