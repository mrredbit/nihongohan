/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    AppRegistry
} from 'react-native';
import Main from './App/Main';

export default class nihongo extends Component {
    render() {
        return <Main/>
    }
}

AppRegistry.registerComponent('nihongo', () => nihongo);
