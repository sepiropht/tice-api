import {StationCode} from './StationCode';
import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    TextInput,
    View,
    ListView
} from 'react-native';

const array = StationCode;

class UselessTextInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '',
            station: [],
            key:0
        }

    }
    onChange(text) {
      this.setState ({
        text: text
      });
      let newStationState = array.filter(item => {
        return item.station.toLowerCase().indexOf(text.trim()) > -1 || text === item.ligne;
      })
      this.setState({
        station: newStationState,
        key: Math.random()
      });
      console.log(this.state);
    }


    render() {
        return (
            <View>
                <TextInput style={{
                    height: 40,
                    borderColor: 'gray',
                    borderWidth: 1
                }} onChangeText={this.onChange.bind(this)} value={this.state.text}/>
              <ListViewBasics key={this.state.key} data={this.state.station}/>
            </View>
        );
    }
}

class ListViewBasics extends Component {
    // Initialize the hardcoded data
    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });
        this.state = {
            dataSource: ds.cloneWithRows(props.data)
        };
    }
    render() {
        return (
            <View style={{
                paddingTop: 22
            }}>
                <ListView dataSource={this.state.dataSource} renderRow={(rowData) => <Text>{rowData.station}</Text>}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF'
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5
    }
});

AppRegistry.registerComponent('ticemobilereactnative', () => UselessTextInput);
