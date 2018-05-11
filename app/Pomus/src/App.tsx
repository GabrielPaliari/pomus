import * as React from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

interface AppState {
  textFromServer: any;
}

export default class App extends React.Component<{}, AppState> {
  constructor(props) {
    super(props);
    this.state = {textFromServer: ''};
  }
  componentDidMount() {
    // tslint:disable-next-line:max-line-length
    fetch('https://maps.googleapis.com/maps/api/geocode/json?address=Escola+Politecnica+de+Sao+Paulo,+Sao+Paulo,+BR&key=MyAppKey')
      .then(response => response.json())
      .then(responseJson => {
        this.setState({textFromServer: JSON.stringify(responseJson.results[0].geometry.location)});
        console.warn(responseJson);
      });
    // fetch('http://18.231.181.253:8080/notes/1')
    // .then(response => response.json())
    // .then(responseJson => {
    //   console.log(responseJson);
    //   this.setState({textFromServer: responseJson[0].firstname});
    // })
    // .catch(error => console.log(error));
  }
  render() {
    return (
      <View style={styles.container}>
        <Text>{this.state.textFromServer}</Text>
        <Text style={styles.welcome}>Welcome to React Native!</Text>
        <Text style={styles.instructions}>To get started, edit wait a second</Text>
        <Text style={styles.instructions}>{instructions}</Text>
      </View>
    );
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
