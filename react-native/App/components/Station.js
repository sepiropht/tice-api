var React = require('react-native');

var {
  Text,
  View,
  Image,
  StyleSheet
} = React;

var styles = StyleSheet.create({
  container: {
    backgroundColor: '#48BBEC',
    paddingBottom: 10
  },
  name: {
    alignSelf: 'center',
    fontSize: 21,
    marginTop: 10,
    marginBottom: 5,
    color: 'white'
  },
  handle: {
    alignSelf: 'center',
    fontSize: 16,
    color: 'white'
  },
  image: {
    height: 125,
    width: 125,
    marginTop: 10,
    alignSelf: 'center'
  }
});

class Station extends React.Component{
  render(){
    return (
      <View style={styles.container}>
        <Image style={styles.image} source={{uri: this.props.ligne+'jpg'}}/>
        <Text style={styles.name}> {this.props.station} </Text>
      </View>
    )
  }
};

Stattion.propTypes = {
  station: React.PropTypes.object.isRequired
}

module.exports = Station;
