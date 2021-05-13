import React, { Component } from 'react'
import { Root } from 'native-base'
import AppStack from './AppStack'
import {store} from './Redux/store/store'
import {Provider} from 'react-redux'

export default class App extends Component{
  render(){
    return(
      <Provider store={store}>
      <Root>
        <AppStack/>
      </Root>
      </Provider>
    );
  }
}