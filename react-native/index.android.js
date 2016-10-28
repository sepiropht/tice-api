import React, {Component} from 'react';
import Main from './App/components/Main';
import {AppRegistry, StyleSheet, Navigator} from 'react-native';
const NavigationBar = Navigator.NavigationBar
class ticemobilereactnative extends Component {
    render() {
        return (
          <Navigator
      initialRoute={{name: 'My First Scene', index: 0}}
      renderScene={(route, navigator) =>
        <Main
          name={route.name}
          onForward={() => {
            var nextIndex = route.index + 1;
            navigator.push({
              name: 'Scene ' + nextIndex,
              index: nextIndex,
            });
          }}
          onBack={() => {
            if (route.index > 0) {
              navigator.pop();
            }
          }}
        />
      }
    />);
    }
}

var styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#111111'
    }
});

AppRegistry.registerComponent('ticemobilereactnative', () => ticemobilereactnative);
