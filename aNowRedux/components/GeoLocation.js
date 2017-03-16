import React, { Component } from 'react';
import { AppRegistry, Text, StyleSheet, View, Dimensions } from 'react-native';

import C from '../constants';
import { Provider, connect } from 'react-redux'

const styles = StyleSheet.create({
  title: {
    fontSize: 14,
    flex: 0,
    lineHeight: 24
  },
  coordinates: {
    fontSize: 18,
    flex: 0,
    lineHeight: 24
  },
  viewContainer: {
    borderWidth: 1,
    padding: 5,
    marginTop: 5,
    width: Dimensions.get('window').width * 1,
    flexDirection: 'row',
    justifyContent: 'center'
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
      let {
          latitude,
          longitude
        } = this.props;
    return `${latitude}, ${longitude}`;
  }

  render() {
    return (
      <View style={styles.viewContainer}>
        <Text style={styles.title}>Latest position: </Text>
        <Text style={styles.coordinates}>{this.displayPosition()}</Text>
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