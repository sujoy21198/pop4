import React from 'react'
import { Image } from 'react-native'
import {heightToDp,widthToDp} from '../Responsive'


const Logo = () =>(
    <Image
    source={require('../assets/TopLogo.png')}
    style={{height:heightToDp("7%"),width:widthToDp("30%")}}
    />
)

export default Logo