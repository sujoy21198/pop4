import React from 'react'
import { Image } from 'react-native'
import {heightToDp,widthToDp} from '../Responsive'


const Logo = () =>(
    <Image
    source={require('../assets/logo.png')}
    style={{height:heightToDp("20%"),width:widthToDp("40%")}}
    />
)

export default Logo