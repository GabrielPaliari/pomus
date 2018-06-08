import * as React from 'react';
import { Button, Picker, Platform, StyleSheet, Text, TextInput, View } from 'react-native';
import { CheckBox } from 'react-native-elements';
import { getLocation } from './location';
const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
    android: 'Double tap R on your keyboard to reload,\n' +
        'Shake or press menu button for dev menu',
});
export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.searchTeachers = () => {
            fetch('http://192.168.1.95:8080/match', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    studentId: '7',
                    // latitude: -23.5461,
                    latitude: null,
                    // longitude: -46.7576,
                    longitude: null,
                    subjectId: this.state.subjectId,
                    MaxDistance: this.state.maxDistance,
                    MaxPrice: this.state.maxPrice,
                }),
            }).then(response => response.json())
                .then(responseJson => {
                console.log(responseJson);
                this.setState({ textFromServer: JSON.stringify(responseJson) });
            });
        };
        this.state = {
            textFromServer: 'calma',
            localPosition: '',
            subjectId: '1',
            maxDistance: '',
            maxPrice: '',
            useCurrentDistance: false,
        };
    }
    componentDidMount() {
        // tslint:disable-next-line:max-line-length
        // addressToPosition('Escola+Politecnica+de+Sao+Paulo,+Sao+Paulo,+BR').then(position => this.setState({textFromServer: JSON.stringify(position)}));
        // tslint:disable-next-line:max-line-length
        getLocation().then(position => this.setState({ localPosition: JSON.stringify(position) }));
        // fetch('http://18.231.181.253:8080/notes/1')
        // .then(response => response.json())
        // .then(responseJson => {
        //   console.log(responseJson);
        //   this.setState({textFromServer: responseJson[0].firstname});
        // })
        // .catch(error => console.log(error));
    }
    render() {
        return (<View style={styles.container}>
        <Picker selectedValue={this.state.subjectId} style={{ height: 50, width: 200 }} onValueChange={(itemValue, itemIndex) => this.setState({ subjectId: itemValue })}>
          <Picker.Item label='Matematica' value={'1'}/>
          <Picker.Item label='Física' value={'2'}/>
          <Picker.Item label='Português' value={'3'}/>
          <Picker.Item label='Química' value={'4'}/>
        </Picker>
        <Text>Distancia máxima</Text>
        <TextInput style={{ height: 50, width: 200 }} placeholder={'Distacia maxima'} value={this.state.maxDistance} onChangeText={text => this.setState({ maxDistance: text })}/>
        <Text>Preço máximo</Text>
        <TextInput style={{ height: 50, width: 200 }} placeholder={'Preço maximo'} value={this.state.maxPrice} onChangeText={text => this.setState({ maxPrice: text })}/>
        <CheckBox title={'Usar distância atual'} onPress={() => this.setState({ useCurrentDistance: !this.state.useCurrentDistance })} checked={this.state.useCurrentDistance}/>
        <Button onPress={this.searchTeachers} title={'Procurar professores'}/>
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
