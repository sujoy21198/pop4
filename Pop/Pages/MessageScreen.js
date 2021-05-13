import React, { Component } from 'react'
import { View, Button, Text, FlatList, TouchableOpacity, ScrollView } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import BaseColor from '../Core/BaseTheme'
import Icon from 'react-native-vector-icons/AntDesign'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { widthToDp, heightToDp } from '../Responsive'
import Sync from 'react-native-vector-icons/AntDesign'
import Database from 'react-native-vector-icons/FontAwesome'
import NetInfo from '@react-native-community/netinfo'
import axios from 'axios'
import base64 from 'react-native-base64'
import DataAccess from '../Core/DataAccess'
import { objectOf } from 'prop-types'



export default class MessageScreen extends Component {

    constructor(props) {
        super(props)
        this.state = {
            languageSelected: '',
            messages: [],
            stepVideoLabel: '',
            textLanguageChange: ''
        }
    }

    componentDidMount() {
        this.languagePresent()
    }

    languagePresent = async () => {
        let value = await AsyncStorage.getItem('language')
        if (value === 'en') {
            this.state.textLanguageChange = '0'
        } else if (value === 'hi') {
            this.state.textLanguageChange = '1'
        } else if (value === 'ho') {
            this.state.textLanguageChange = '2'
        } else if (value === 'od') {
            this.state.textLanguageChange = '3'
        } else if (value === 'san') {
            this.state.textLanguageChange = '4'
        }

        this.loadlabelsFromStorage()
    }


    loadlabelsFromStorage = async () => {
        try {
            let username = await AsyncStorage.getItem('username')
            let user = await AsyncStorage.getItem('labelsData');
            let parsed = JSON.parse(user);
            var specificObject = parsed[0]
            var stepVideoLabel = specificObject.labels.find((i) => i.type === 259)
            if (this.state.textLanguageChange === '0') {
                this.setState({ stepVideoLabel: stepVideoLabel.nameEnglish })
            } else if (this.state.textLanguageChange === '1') {
                this.setState({ stepVideoLabel: stepVideoLabel.nameHindi })
            } else if (this.state.textLanguageChange === '2') {
                this.setState({ stepVideoLabel: stepVideoLabel.nameHo })
            } else if (this.state.textLanguageChange === '3') {
                this.setState({ stepVideoLabel: stepVideoLabel.nameOdia })
            } else if (this.state.textLanguageChange === '4') {
                this.setState({ stepVideoLabel: stepVideoLabel.nameSanthali })
            }
        } catch (error) {
            console.log(error)
        }
        //this.setState({ crops: specificObject.crops })
        //this.showData()
    }

    getMessageTemplate = async () => {
        var messages = []
        let value = await AsyncStorage.getItem('language')
        if (value === 'en') {
            this.state.languageSelected = 'English'
        } else if (value === 'hi') {
            this.state.languageSelected = 'Hindi'
        } else if (value === 'ho') {
            this.state.languageSelected = 'Ho'
        } else if (value === 'od') {
            this.state.languageSelected = 'Odisa'
        } else if (value === 'san') {
            this.state.languageSelected = 'Santhali'
        }

        await axios.get(DataAccess.BaseUrl + DataAccess.AccessUrl + DataAccess.GetMessageTemplate + this.state.languageSelected, {
            headers: {
                'Content-type': "accept"
            }
        }).then(function (response) {
            messages = response.data.data
            //console.log(response.data.data)
        }).catch(function (error) {
            console.log(error)
        })
        // this.state.messages = messages
        this.setState({ messages: messages })
        console.log(this.state.messages)

    }

    sendMessage = async (msg) => {
        let userId = await AsyncStorage.getItem('_id')
        //console.log(userId)
        var status
        await axios.post('https://tupop.in/api/v1/send/message', {
            "userId": userId,
            "message": msg
        }).then(function (response) {
            //messages = response.data.data
            console.log(response.data)
            status = response.data.status
        }).catch(function (error) {
            console.log(error)
        })
        if (status === '1') {
            alert("Message sent successfully to the field officer. ")
        } else {
            alert("Message sent")
        }
    }
    render() {
        return (
            <View style={{ backgroundColor: BaseColor.BackgroundColor, flex: 1 }}>
                <TouchableOpacity onPress={() => this.getMessageTemplate()}>
                    <View style={{ marginTop: heightToDp("20%"), alignSelf: 'center', backgroundColor: '#fff', width: widthToDp("50%"), height: heightToDp("4%"), borderRadius: 20 }}>
                        <Text style={{ alignSelf: 'center', marginTop: heightToDp("0.6%") }}>{this.state.stepVideoLabel}</Text>
                    </View>
                </TouchableOpacity>
                <View>
                    <ScrollView>
                        {
                            this.state.messages.map((i) => (
                                <View>
                                    <TouchableOpacity onPress={() => this.sendMessage(i.contentEnglish)}>
                                        <View style={{ backgroundColor: '#fff', height: heightToDp("8%"), marginTop: heightToDp("2%") }}>
                                            {
                                                this.state.languageSelected === 'English' ? <Text style={{ alignSelf: 'center', marginTop: heightToDp("2%") }}>{i.contentEnglish}</Text> : ((this.state.languageSelected === 'Hindi') ? <Text style={{ alignSelf: 'center', marginTop: heightToDp("2%") }}>{i.contentEnglish}</Text> : ((this.state.languageSelected === 'Ho') ? <Text style={{ alignSelf: 'center', marginTop: heightToDp("2%") }}>{i.contentHo}</Text> : ((this.state.languageSelected === 'Odia') ? <Text style={{ alignSelf: 'center', marginTop: heightToDp("2%") }}>{i.contentOdia}</Text> : ((this.state.languageSelected === 'Santhali') ? <Text style={{ alignSelf: 'center', marginTop: heightToDp("2%") }}>{i.contentSanthali}</Text> : null))))
                                            }
                                        </View>

                                    </TouchableOpacity>
                                </View>
                            ))
                        }
                    </ScrollView>
                </View>
            </View>
        )
    }
}