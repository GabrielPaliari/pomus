import * as React from 'react';
import { Picker, Text, TouchableNativeFeedback, View } from 'react-native';
import { CheckBox } from 'react-native-elements';

interface SearchState {
  subjectId: string;
  useCurrentLocation: boolean;
}

export class SearchScreen extends React.Component<any, SearchState> {
  static navigationOptions = {
    title: 'Procurar por professores',
    header: null,
  };
  constructor(props) {
    super(props);
    this.state = {
      subjectId: '1',
      useCurrentLocation: false,
      };
  }

  render() {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#00ebfa', borderWidth: 30, borderColor: '#00ebfa'}}>
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'flex-start', backgroundColor: '#fffff5', borderRadius: 30, borderStyle: 'solid', borderColor: '#fffff5', elevation: 3}}>
        <View style={{paddingTop: 30, paddingBottom: 70}}>
          <Text style={{fontSize: 30, fontWeight: 'bold', textAlign: 'center', color: '#008bac'}}>Procurar por professor</Text>
        </View>
        <View style={{paddingBottom: 30}}>
          <Text style={{paddingBottom: 8}}>Selecione a matéria</Text>
          <View style={{backgroundColor: 'white', borderColor: 'lightgray', borderWidth: 2, borderStyle: 'solid', borderRadius: 5, elevation: 1}}>
            <Picker
              selectedValue={this.state.subjectId}
              style={{ height: 40, width: 230}}
              onValueChange={(itemValue, itemIndex) => this.setState({subjectId: itemValue})}
            >
              <Picker.Item label='Matematica' value={'1'} />
              <Picker.Item label='Física' value={'2'} />
              <Picker.Item label='Português' value={'3'} />
              <Picker.Item label='Química' value={'4'} />
            </Picker>
          </View>
        </View>
        <CheckBox
          title={'Usar localização atual'}
          onPress={() => this.setState({useCurrentLocation: !this.state.useCurrentLocation})}
          checked={this.state.useCurrentLocation}
          checkedIcon={'check'}
          uncheckedIcon={'check'}
          checkedColor={'#008bac'}
          uncheckedColor={'lightgray'}
          textStyle={{fontFamily: 'Arial', fontWeight: 'normal', fontSize: 16, color: '#2b2b2b'}}
          containerStyle={{width: 230, backgroundColor: 'white', borderColor: 'lightgray', borderWidth: 2, borderStyle: 'solid', borderRadius: 5, elevation: 1}}
        />
        <TouchableNativeFeedback
          delayPressIn={0}
          onPress={() => this.props.navigation.navigate('Match', {
            subjectId: this.state.subjectId,
            useCurrentLocation: this.state.useCurrentLocation,
          })}
        >
          <View pointerEvents='box-only' style={{height: 40, width: 230, alignItems: 'center', justifyContent: 'center', backgroundColor: '#006A82', borderRadius: 10, elevation: 4, marginTop: 50}}>
            <Text style={{fontSize: 14, fontWeight: 'bold', color: 'white'}}>Procurar!</Text>
          </View>
        </TouchableNativeFeedback>
        {/* {this.state.textFromServer ? <Text>Text from server: {JSON.stringify(this.state.textFromServer.req[0])}</Text> : null}
        <Text>Local position: {this.state.localPosition}</Text> */}
        </View>
      </View>
    );
  }

}
