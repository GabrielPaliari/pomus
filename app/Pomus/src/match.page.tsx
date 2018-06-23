import * as React from 'react';
import { FlatList, ListRenderItemInfo, View } from 'react-native';
import { getLocation } from './location';
import { Divider, ProfessorCell } from './professor-cell.component';

interface MatchScreenState {
  professorList: Professor[];
  longitude: number | null;
  latitude: number | null;
}

interface Position {
  mocked?: boolean;
  timestamp?: number;
  coords?: {
    speed: number;
    heading: number;
    accuracy: number;
    longitude: number;
    altitude: number;
    latitude: number;
  };
}

export interface Professor {
  UserId: number;
  Rating: number;
  Price: number;
  UserName: string;
  Address: string;
  Distance: number;
  Score: number;
}

export class MatchScreen extends React.Component <any, MatchScreenState> {
  static navigationOptions = {
    title: 'Professores recomendados',
    headerTintColor: '#fff',
    headerStyle: {
      backgroundColor: '#008bac',
    },
  };

  state: MatchScreenState = {
    professorList: [
      {
        UserId: 2,
        Rating: 4.8,
        Price: 75,
        UserName: 'Diego',
        Address: 'Poli biênio',
        Distance: 13.560,
        Score: 10,
      },
      {
        UserId: 3,
        Rating: 3.8,
        Price: 45,
        UserName: 'Mauro',
        Address: 'Rua augusta',
        Distance: 8.28,
        Score: 7,
      },
    ],
    longitude: null,
    latitude: null,
  };

  componentDidMount() {
    if (this.props.navigation.getParam('useCurrentLocation', false)) {
      getLocation()
        .then((position: Position) => this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          },
          () => this.searchTeachers(),
      ));
    } else {
      this.searchTeachers();
    }
  }

  render() {
    return(
      <FlatList
        data={this.state.professorList}
        renderItem={this.renderItem}
        keyExtractor={this.keyExtractor}
        ItemSeparatorComponent={Divider}
      />
    );
  }

  keyExtractor = (listItem: Professor, index: number) => listItem.UserId + `${index}`;

  renderItem = (listItem: ListRenderItemInfo<Professor>) => {
    return (
      <ProfessorCell
        key={'ProfessorCell_' + listItem.index}
        {...listItem.item}
        onTap={this.handleTap}
      />
    );
  }

  handleTap = (UserName: string, UserId: number) => {
    this.props.navigation.navigate('ConfirmMatch', {UserName, UserId, isStudent: true});
  }

  searchTeachers = () => {
    fetch('http://192.168.1.95:8080/match', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        studentId: '3',
        latitude: this.state.latitude,
        longitude: this.state.longitude,
        subjectId: this.props.navigation.getParam('subjectId', 2),
        MaxDistance: '100',
        MaxPrice: '100',
      }),
    }).then(response => response.json())
    .then(responseJson => {
      console.log(responseJson);
      this.setState({professorList: responseJson});
    });

  }
}
