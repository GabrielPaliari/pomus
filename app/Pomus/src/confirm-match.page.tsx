import * as React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Rating } from 'react-native-elements';
import { getLocation } from './location';

interface ConfirmMatchScreenState {
  longitude: number;
  latitude: number;
  distance: string;
}

export class ConfirmMatchScreen extends React.Component <any, ConfirmMatchScreenState> {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Match',
      headerTintColor: '#fff',
      headerStyle: {
        backgroundColor: '#008bac',
      },
    };
  }

  state = {distance: '', longitude: 10, latitude: 10};

  render() {
    return(
      <View style={{flex: 1, backgroundColor: '#fffff5', alignItems: 'center', justifyContent: 'center'}}>
       {Number(this.state.distance ? this.state.distance : 10) > 1 || !this.props.navigation.getParam('isStudent', false) ?
        <React.Fragment>
          <View style={{paddingBottom: 20}}>
            <Text style={{fontSize: 16}}>
              {'Você está a ' +
                this.state.distance +
                'km do' + ` ${this.props.navigation.getParam('isStudent', false) ? 'professor' : 'aluno'} `
                + this.props.navigation.getParam('UserName', '')
              }
            </Text>
          </View>
          <TouchableOpacity
            style={{backgroundColor: '#00cbfa', elevation: 4, borderRadius: 10, alignItems: 'center', justifyContent: 'center', padding: 8, paddingHorizontal: 20}}
            onPress={this.submitLocation}
          >
            <Text style={{color: 'white', fontWeight: 'bold', fontSize: 16}}>
              Atualizar posição
            </Text>
          </TouchableOpacity>
        </React.Fragment>
        :
        <React.Fragment>
          <Text style={{fontSize: 16, paddingBottom: 20}}>
            Como foi a aula?
          </Text>
          <Rating
            onFinishRating={() => null}
            imageSize={40}
            ratingCount={5}
            style={{paddingBottom: 20}}
          />
          <TouchableOpacity
            style={{backgroundColor: '#00cbfa', elevation: 4, borderRadius: 10, alignItems: 'center', justifyContent: 'center', padding: 8, paddingHorizontal: 20}}
            onPress={this.navigateHome}
          >
            <Text style={{color: 'white', fontWeight: 'bold', fontSize: 16}}>
              Submeter avaliação
            </Text>
          </TouchableOpacity>
        </React.Fragment>
      }
      </View>
    );
  }

  submitLocation = () => {
    getLocation()
    .then((position: Position) => this.setState({
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
      },
      () => {
        console.warn(this.state.latitude);
        fetch('http://192.168.1.95:8080/event', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            eventId: '1',
            latitude: this.state.latitude,
            longitude: this.state.longitude,
            isStudent: this.props.navigation.getParam('isStudent', false),
          }),
        }).then(response => response.json())
        .then(responseJson => {
          console.warn(responseJson);
          this.setState({distance: responseJson});
        });
    }));
  }

  navigateHome = () => {
    this.props.navigation.navigate('Home');
  }
}
