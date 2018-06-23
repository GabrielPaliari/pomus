import * as React from 'react';
import { createStackNavigator } from 'react-navigation';
import { HomeScreen } from './home.page';
import { SearchScreen } from './search.page';
import { MatchScreen } from './match.page';
import { ConfirmMatchScreen } from './confirm-match.page';

const RootStack = createStackNavigator(
  {
    Home: HomeScreen,
    Search: SearchScreen,
    Match: MatchScreen,
    ConfirmMatch: ConfirmMatchScreen,
  },
  {
    initialRouteName: 'Home',
  },
);

export default class App extends React.Component {
  render() {
    return (<RootStack/>);
  }
}
