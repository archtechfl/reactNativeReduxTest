import React, { Component } from 'react';
import { AppRegistry, Text, StyleSheet, View } from 'react-native';

class HelloWorldApp extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Finding next departure for nearest stop</Text>
        <GeoLocation/>
      </View>
    );
  }
}

class GeoLocation extends React.Component {
  state = {
    initialPosition: 'unknown',
    lastPosition: 'unknown',
  };

  watchID: ?number = null;

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        var initialPosition = position;
        this.setState({initialPosition});
      },
      (error) => alert(JSON.stringify(error)),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );
    this.watchID = navigator.geolocation.watchPosition((position) => {
      var lastPosition = position;
      this.setState({lastPosition});
    });
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }

  displayPosition() {
    let position = this.state.initialPosition.coords;
    if (this.state.lastPosition !== "unknown") {
        position = this.state.lastPosition.coords;
    } else if (this.state.initialPosition !== "unknown") {
        position = this.state.initialPosition.coords;
    } else {
        position = {
            "latitude": 0,
            "longitude": 0,
        };
    }
    return `${position.latitude}, ${position.longitude}`;
  }

  render() {
    return (
      <View>
        <Text>
          <Text style={styles.title}>Initial position: </Text>
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
