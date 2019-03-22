import React from 'react';
import { createStore } from 'redux';
import {Provider} from 'react-redux';
import Reducer from './reducer';
import { createAppContainer, createStackNavigator} from 'react-navigation';
import DetailsScreen from "./Details";
import HomeScreen from "./Home";
import * as Animatable from 'react-native-animatable';

const AppNavigator = createStackNavigator({
    Home: {
        screen: HomeScreen,
    },
    Details: {
        screen: DetailsScreen,
    },
}, {
    initialRouteName: 'Home',
});

let Navigation = createAppContainer(AppNavigator);

Navigation =  Animatable.createAnimatableComponent(Navigation);
// const store = createStore(Reducer);

// Render the app container component with the provider around it
export default class App extends React.Component {
    render() {
        return (
            <Navigation/>
        );
    }
}