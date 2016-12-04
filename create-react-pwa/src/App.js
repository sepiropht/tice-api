import React, {Component} from 'react';
import './App.css';
import {StationCode} from './data'
const array = StationCode;
class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '',
            station: [],
            html: ''
        }

    }
    onPress(item) {
        let str = [];
        var form = {
            'a': 'refresh',
            'refs': item.refs,
            'ran': item.ran
        }
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
        }).done();
    }

    onChange(event) {
        console.log(event.target.value)
        this.setState({text: event.target.value});
        let newStationState = array.filter(item => {
            return item.station.toLowerCase().indexOf(event.target.value.trim()) > -1 || event.target.value === item.ligne;
        })
        this.setState({
            station: this.state.text.length > 0
                ? newStationState
                : []
        });
    }
    render() {
        //const liStation = this.state.station.map(item => <li> {item.station}  </li>)
        //   var divStyle = {
        //     backgroundImage: 'url(' + imgUrl + ')'
        // }
        const style = {
            backgroundColor: ":red"
        }
        return (
            <div className="App">
                <div className="App-header">
                    <img src="http://www.bus-tice.com/fileadmin/tice/templates/images/logo.jpg" className="App-logo" alt="logo"/>
                    <h2>Essonnes les horaires de vos bus en temps reel</h2>
                </div>
                <form className="search">
                    <input className="searchTerm" type="text" placeholder="Entrer le nom de l'arrêt ou le numéro de la ligne" value={this.state.text} onChange={this.onChange.bind(this)}/>

                </form>
                <ul>
                    {this.state.station.map((item, index) => <li key={index} onClick={this.onPress.bind(this, item)} style={style}>

                        {item.station}
                    </li>)}
                </ul>

            </div>
        );
    }
}

export default App;
