import React, {Component} from 'react';


// var Web_View = require('./Helpers/WebView');

import {
  ScrollView,
  Text,
  View,
  TouchableHighlight,
  StyleSheet
} from 'react-native';

var styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  rowContainer: {
    flexDirection: 'column',
    flex: 1,
    padding: 10
  },
  name: {
    color: '#48BBEC',
    fontSize: 18,
    paddingBottom: 5
  },
  stars: {
    color: '#48BBEC',
    fontSize: 14,
    paddingBottom: 5
  },
  description: {
    fontSize: 14,
    paddingBottom: 5
  }
});

export default class StationList extends Component{
  openPage(item){
    // this.props.navigator.push({
    //   title: 'Details View',
    //   component: Details_View,
    //   passProps: {item}
    // });
    console.log(item);
  }
  render(){
    var stations = this.props.data;
    var list = stations.map((item, index) => {
      var desc =  <Text style={styles.description}> {stations[index].ligne} </Text>;
      return (
        <View key={index}>
          <View style={styles.rowContainer}>
            <TouchableHighlight
              onPress={this.openPage.bind(this, stations[index])}
              underlayColor='transparent'>
              <Text style={styles.name}>{stations[index].station}</Text>
            </TouchableHighlight>
            {desc}
          </View>

        </View>
      )
    });
    return (
      <View>
        <ScrollView style={styles.container}>

            {list}
          </ScrollView>
      </View>

    )
  }
};
module.exports = StationList;
// Repositories.propTypes = {
//   userInfo: React.PropTypes.object.isRequired,
//   repos: React.PropTypes.array.isRequired
// }

// Stations.propTypes = {
//   station: React.PropTypes.object.isRequired,
//   ligne: React.PropTypes.object.isRequired
// }
