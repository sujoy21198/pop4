import React, { Component, useEffect, useState } from 'react'
import { View, TouchableOpacity, StyleSheet, PermissionsAndroid } from 'react-native'
import { Button, Text } from 'native-base'
import Logo from '../assets/Logo'
import { heightToDp, widthToDp } from '../Responsive'
import FloatingLabel from 'react-native-floating-labels'
import BaseColor from '../Core/BaseTheme'
import Icon from 'react-native-vector-icons/FontAwesome'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Languages from '../Core/Languages'
import LanguageChange from '../Core/LanguageChange'
import NetInfo from '@react-native-community/netinfo'
import axios from 'axios'
import DataAccess from '../Core/DataAccess'
import RNFetchBlob from 'rn-fetch-blob'
import RNFS, { exists } from 'react-native-fs'
import { check, PERMISSIONS, RESULTS, request, checkMultiple, requestMultiple } from 'react-native-permissions'

const Sound = require('react-native-sound')


export default class LanguageScreen extends Component {

    constructor(props) {
        super(props)
        this.state = {
            languages: [],
            cropImages: []
        }

        this.state.languages = Languages
        //console.log(this.state.languages)
    }





    english = new Sound(require('../assets/English.mp3'))
    hindi = new Sound(require('../assets/Hindi.mp3'))
    ho = new Sound(require('../assets/Ho.mp3'))
    odia = new Sound(require('../assets/Odia.mp3'))
    santhali = new Sound(require('../assets/Santhali.mp3'))
    // play = () => {
    //     SoundPlayer.playUrl('http://commondatastorage.googleapis.com/codeskulptor-assets/Evillaugh.ogg')

    // }


    test = (value) => {
        //alert(value)

        AsyncStorage.setItem('language', value)
        LanguageChange.setLanguage(value)
        this.props.navigation.navigate('SigninScreen', { selectedLanguage: value })

        //alert(value)

    }
    playAudio = (value) => {
        if (value === 'en') {
            this.english.play()
        } else if (value === 'hi') {
            this.hindi.play()
        } else if (value === 'od') {
            this.odia.play()
        } else if (value === 'ho') {
            this.ho.play()
        } else if (value === 'san') {
            this.santhali.play()
        }
    }

    componentDidMount() {
        //this.checkSession()
        //this.requestStoragePermission()
        this.acceptPermissionDialogBox()
        this.makeDirTest()
        this.seeIfWorks()
    }

    seeIfWorks = async () => {
        const { config, fs } = RNFetchBlob;
        let DirTest = fs.dirs.PictureDir + "/" + 'Pop'
        console.log(DirTest, "lolpop")
    }

    makeDirTest = () => {
        const folderName = RNFS.PicturesDirectoryPath + '/' + 'Pop'
        RNFS.mkdir(folderName)
            .then((result) => {
                console.log(result)

            })
            .catch((err) => {
                console.log(err, "asasalolopopsdjasbkjbakfb")
            })
        // let test = RNFS.ExternalStorageDirectoryPath
        // console.log(test,"lplpplplp")
        // RNFS.readDir(RNFS.ExternalStorageDirectoryPath+'/'+'Pop')
        // .then((result) => {
        //     console.log(result)
        // })
        // .catch((err) => {
        //     console.log(err)
        // })
    }



    testPermision = () => {
        check(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE).then((result) => {
            switch (result) {
                case RESULTS.UNAVAILABLE:
                    console.log('unavailable')
                    break;
                case RESULTS.DENIED:
                    this.acceptPermissionDialogBox()
                    console.log("deniiiiid")
                    break;
                case RESULTS.GRANTED:
                    console.log("granted")
                    break;
            }
        })

        // request(PERMISSIONS.ANDROID.READ_PHONE_STATE).then((result) => {
        //     console.log(result)
        // })



    }

    acceptPermissionDialogBox = () => {
        requestMultiple([PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE, PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE, PERMISSIONS.ANDROID.READ_PHONE_STATE]).then((result) => {
            console.log(result)
        }).catch((error) => {
            console.log(error)
        })
    }






    // checkSession = async () => {
    //     let value = await AsyncStorage.getItem('_id')
    //     let username = await AsyncStorage.getItem('username')
    //     let name = await AsyncStorage.getItem('name')
    //     let token = await AsyncStorage.getItem('token')
    //     let type = await AsyncStorage.getItem('type')
    //     let language = await AsyncStorage.getItem('language')
    //     LanguageChange.setLanguage(language)
    //     console.log(token + " this is token ")
    //     if (value) {
    //         this.props.navigation.reset({
    //             index: 0,
    //             routes: [{ name: "DashBoardScreen" }]
    //         });
    //     }
    // }




    render() {
        return (
            <View style={{ backgroundColor: BaseColor.BackgroundColor, flex: 1 }}>
                {/* <Button onPress={()=> this.platsound()}>
                    <Text>play</Text>
                </Button> */}
                <View style={{ marginTop: heightToDp("3%"), alignSelf: "center" }}>
                    <Logo />
                </View>
                <View style={{ backgroundColor: '#fff', height: heightToDp("43%"), width: widthToDp("90%"), marginLeft: widthToDp("5%"), marginTop: heightToDp("5%"), borderRadius: 20, elevation: 10 }}>
                    <Text style={{ marginTop: heightToDp("4%"), alignSelf: 'center', fontSize: widthToDp("6%"), fontFamily: 'Oswald-Medium' }}>SELECT LANGUAGE</Text>
                    {/* {
                        Languages.map((item, i) => {
                            return (
                                <View style={{flexDirection:'row'}}>
                                    <TouchableOpacity onPress={() => this.props.navigation.navigate('SigninScreen')}>
                                        <View style={{ backgroundColor: BaseColor.English, width: widthToDp("30%"), height: heightToDp("6%"), marginLeft: widthToDp("10%"), borderRadius: 100, flexDirection: 'row' }}>
                                            <Text style={{ color: '#fff', marginTop: heightToDp("1.5%"), fontFamily: 'Oswald-Medium', marginLeft: widthToDp("5%") }}>{item.value}</Text>
                                            <Icon
                                                name="microphone"
                                                color="white"
                                                size={20}
                                                style={{ marginTop: heightToDp("1.8%"), marginLeft: widthToDp("6%") }}
                                            />
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            )
                        })
                    } */}
                    <View style={{ flexDirection: 'row', marginTop: heightToDp("5%") }}>

                        <View style={{ backgroundColor: BaseColor.English, width: widthToDp("30%"), height: heightToDp("6%"), marginLeft: widthToDp("10%"), borderRadius: 100, flexDirection: 'row' }}>
                            <TouchableOpacity onPress={() => this.test(this.state.languages[0].id)}>
                                <Text style={{ color: '#fff', marginTop: heightToDp("1.2%"), fontFamily: 'Oswald-Medium', marginLeft: widthToDp("3%"), justifyContent: 'center' }}>{this.state.languages[0].value}</Text>
                            </TouchableOpacity>
                            <Icon
                                name="microphone"
                                color="white"
                                size={20}
                                onPress={() => this.playAudio(this.state.languages[0].id)}
                                style={{ marginTop: heightToDp("1.8%"), marginLeft: widthToDp("6%") }}
                            />
                        </View>


                        <View style={{ backgroundColor: BaseColor.Hindi, width: widthToDp("30%"), height: heightToDp("6%"), marginLeft: widthToDp("10%"), borderRadius: 100, flexDirection: 'row' }}>
                            <TouchableOpacity onPress={() => this.test(this.state.languages[1].id)}>
                                <Text style={{ color: '#fff', marginTop: heightToDp("1.7%"), justifyContent: 'center', fontWeight: 'bold', fontSize: widthToDp("4.3%"), marginLeft: widthToDp("3%") }}>{this.state.languages[1].value}</Text>
                            </TouchableOpacity>
                            <Icon
                                name="microphone"
                                color="white"
                                size={20}
                                onPress={() => this.playAudio(this.state.languages[1].id)}
                                style={{ marginTop: heightToDp("1.8%"), marginLeft: widthToDp("6%") }}
                            />
                        </View>

                    </View>
                    <View style={{ flexDirection: 'row', marginTop: heightToDp("4%") }}>

                        <View style={{ backgroundColor: BaseColor.Ho, width: widthToDp("30%"), height: heightToDp("6%"), marginLeft: widthToDp("10%"), borderRadius: 100, flexDirection: 'row' }}>
                            <TouchableOpacity onPress={() => this.test(this.state.languages[1].id)}>
                                <Text style={{ color: '#fff', marginTop: heightToDp("1.5%"), marginLeft: widthToDp("7%"), fontWeight: 'bold', fontSize: widthToDp("4.3%") }}>{this.state.languages[2].value}</Text>
                            </TouchableOpacity>

                            <Icon
                                name="microphone"
                                color="white"
                                size={20}
                                onPress={() => this.playAudio(this.state.languages[2].id)}
                                style={{ marginTop: heightToDp("1.8%"), marginLeft: widthToDp("13%") }}
                            />
                        </View>



                        <View style={{ backgroundColor: BaseColor.Uridia, width: widthToDp("30%"), height: heightToDp("6%"), marginLeft: widthToDp("10%"), borderRadius: 100, flexDirection: 'row' }}>
                            <TouchableOpacity onPress={() => this.test(this.state.languages[3].id)}>
                                <Text style={{ color: '#fff', marginTop: heightToDp("1.7%"), marginLeft: widthToDp("4.7%"), fontWeight: 'bold', fontSize: widthToDp("4.3%"), marginLeft: widthToDp("3%") }}>{this.state.languages[3].value}</Text>
                            </TouchableOpacity>
                            <Icon
                                name="microphone"
                                color="white"
                                size={20}
                                onPress={() => this.playAudio(this.state.languages[3].id)}
                                style={{ marginTop: heightToDp("1.8%"), marginLeft: widthToDp("6%") }}
                            />
                        </View>

                    </View>

                    <View style={{ marginTop: heightToDp("4%"), backgroundColor: BaseColor.Santhali, width: widthToDp("30%"), height: heightToDp("6%"), borderRadius: 100, alignSelf: 'center', flexDirection: 'row' }}>
                        <TouchableOpacity onPress={() => this.test(this.state.languages[1].id)}>
                            <Text style={{ color: '#fff', marginTop: heightToDp("1.7%"), marginLeft: widthToDp("3.4%"), fontWeight: 'bold', fontSize: widthToDp("4.3%"), marginLeft: widthToDp("2%") }}>{this.state.languages[4].value}</Text>
                        </TouchableOpacity>

                        <Icon
                            name="microphone"
                            color="white"
                            size={20}
                            onPress={() => this.playAudio(this.state.languages[4].id)}
                            style={{ marginTop: heightToDp("1.8%"), marginLeft: widthToDp("6%") }}
                        />
                    </View>

                </View>
            </View>
        );
    }
}
