import * as React from 'react';
import { Text, TouchableNativeFeedback, View } from 'react-native';

export class HomeScreen extends React.Component<any, any> {
  static navigationOptions = {
    header: null,
  };

  render() {
    return(
      <React.Fragment>
        <TouchableNativeFeedback
          background={TouchableNativeFeedback.Ripple('white', true)}
          delayPressIn={0}
          onPress={() => this.props.navigation.navigate('ConfirmMatch')}
        >
          <View pointerEvents='box-only' style={{flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#00fa0c'}}>
            <Text style={{color: 'white', fontFamily: 'Helvetica', fontSize: 50, fontWeight: 'bold'}}>PROFESSOR</Text>
          </View>
        </TouchableNativeFeedback>
        <TouchableNativeFeedback
          background={TouchableNativeFeedback.Ripple('white')}
          delayPressIn={0}
          onPress={() => this.props.navigation.navigate('Search')}
        >
          <View pointerEvents='box-only' style={{flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#00cbfa'}}>
            <Text style={{color: 'white', fontFamily: 'Helvetica', fontSize: 50, fontWeight: 'bold'}}>ALUNO</Text>
          </View>
        </TouchableNativeFeedback>
      </React.Fragment>
    );
  }
}
