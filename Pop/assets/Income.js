import React from 'react'
import { Image } from 'react-native'
import {heightToDp,widthToDp} from '../Responsive'


const Income = () =>(
    <Image
    source={require('../assets/Income.png')}
    style={{height:heightToDp("5%"),width:widthToDp("10%")}}
    />
)

export default Income