import * as React from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
    android: 'Double tap R on your keyboard to reload,\n' +
        'Shake or press menu button for dev menu',
});
export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = { textFromServer: 'calma', localPosition: '' };
    }
    componentDidMount() {
        // tslint:disable-next-line:max-line-length
        // addressToPosition('Escola+Politecnica+de+Sao+Paulo,+Sao+Paulo,+BR').then(position => this.setState({textFromServer: JSON.stringify(position)}));
        // tslint:disable-next-line:max-line-length
        // getLocation().then(position => this.setState({localPosition: JSON.stringify(position)}));
        // fetch('http://18.231.181.253:8080/notes/1')
        // .then(response => response.json())
        // .then(responseJson => {
        //   console.log(responseJson);
        //   this.setState({textFromServer: responseJson[0].firstname});
        // })
        // .catch(error => console.log(error));
        fetch('http://localhost:8080/match', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                studentId: '7',
                latitude: null,
                longitute: null,
                subjectId: '1',
                MaxDistance: '50',
                MaxPrice: '75',
            }),
        }).then(response => response.json())
            .then(responseJson => {
            console.log(responseJson);
            this.setState({ textFromServer: JSON.stringify(responseJson) });
        });
    }
    render() {
        return (<View style={styles.container}>
        <Text></Text>
        <Text>Text from server: {this.state.textFromServer}</Text>
        <Text>Local position: {this.state.localPosition}</Text>
      </View>);
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});
