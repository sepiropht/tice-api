import {
    StationCode
}
from '../StationCode';
import extractFromHtml from '../webParse';
import axios from 'axios';
var StationList = require('./StationList');
import React, {
    Component
}
from 'react';
var Web_View = require('./Helpers/WebView');

// delete GLOBAL.XMLHttpRequest;
// const _XHR = GLOBAL.originalXMLHttpRequest
//     ? GLOBAL.originalXMLHttpRequest
//     : GLOBAL.XMLHttpRequest
//XMLHttpRequest = _XHR
import {Modal, WebView, View} from 'react-native';
import {
    Container,
    Header,
    InputGroup,
    Input,
    Icon,
    Button,
    List,
    ListItem,
    Text,
    Content,
    Thumbnail
}
from 'native-base';

const array = StationCode;
const onClick = (item) => {}
class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '',
            station: [],
            modalVisible: false,
            html: ''
        }

    }
    onChange(text) {
        this.setState({
            text: text
        });
        let newStationState = array.filter(item => {
            return item.station.toLowerCase().indexOf(text.trim()) > -1 || text === item.ligne;
        })
        this.setState({
            station: this.state.text.length > 0 ? newStationState : [],
            key: Math.random()
        });
    }
    openPage(url) {
        console.log(this.props);
        this.props.navigator.push({
            title: 'Web View',
            component: Web_View,
            passProps: {
                url
            }
        });
    }
    setModalVisible(visible) {
      this.setState({
          modalVisible: visible
      });
  }
    onPress(item) {
        console.log(item);
        let str = [];
        var form = {'a': 'refresh', 'refs': item.refs, 'ran': item.ran}
        Object.keys(form).forEach(key => {
            str.push(encodeURIComponent(key) + "=" + encodeURIComponent(form[key]))
        })

        const body = str.join("&");
        const req = {
            method: 'post',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body
        };

        fetch('http://www.bus-tice.com/se-deplacer/timeo-vos-horaires-en-temps-reel/', req).then((response) => response.text()).then((responseData) => {
            console.log(`POST Response, Response Body -> ` + JSON.stringify(responseData))
            this.setState({
              html: responseData,
              modalVisible: true,

            })
        }).done();
    }

    render() {
        return ( < Container >
            < Header searchBar rounded >
            < InputGroup >
            < Input onChangeText = {
                this.onChange.bind(this)
            }
            placeholder = 'Entrer votre station ou ligne'
            onChangeText = {
                this.onChange.bind(this)
            }
            value = {
                this.state.text
            }
            value = {
                this.state.text
            }
            />
                    </InputGroup >
            < Button transparent >
            Search < /Button>
                </Header >
            < Content >
            < List data = {
                this.state
            }
            dataArray = {
                this.state.station
            }
            renderRow = {
                (item) => < ListItem button onPress = {
                        this.onPress.bind(this, item)
                    } >
                    < Text > {
                        item.station
                    } < /Text>
                        <Text note>{item.ligne}</Text >
                    < /ListItem>}></List >

                    <Modal
                        animationType="slide"
                        transparent={false}
                        visible={this.state.modalVisible}
                        onRequestClose={() => {alert("Modal has been closed.")}}
                        >
                          <WebView source={{html: this.state.html}}/>
                          <View>

                                <Button danger style={{alignSelf: 'flex-end'}} onPress={() => {
                                      this.setModalVisible(!this.state.modalVisible)
                                  }}>
                                  Go Back
                              </Button>
                          </View>


                    </Modal>
                    < /Content>
            </Container >
            );
        }
    }

    module.exports = Main
