import React, { Component } from 'react';
import { AppRegistry, Text, StyleSheet, View } from 'react-native';

class HelloWorldApp extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Hello world!</Text>
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
});

AppRegistry.registerComponent('aNowRedux', () => HelloWorldApp);
