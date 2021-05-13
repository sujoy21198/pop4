import React, { Component } from 'react'
import { View, Image, TouchableOpacity, FlatList, StyleSheet } from 'react-native'
import BaseColor from '../Core/BaseTheme'
import { Card, Text, Input, InputGroup, Icon, Toast } from 'native-base'
import TopLogo from '../assets/TopLogo'
import { widthToDp, heightToDp } from '../Responsive'
import { FlatGrid, SectionGrid } from 'react-native-super-grid'
import tts from 'react-native-tts'
import Languages from '../Core/Languages'
import LanguageChange from '../Core/LanguageChange'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Logo from '../assets/Logo'
import { ScrollView } from 'react-native'
import FloatingLabel from 'react-native-floating-labels'
import CustomIndicator from '../Core/CustomIndicator'
import axios from 'axios'
import DataAccess from '../Core/DataAccess'
import NetInfo from '@react-native-community/netinfo';


export default class ForgetPasswordScreen extends Component {

    constructor(props) {
        super(props)
        this.state = {
            data: [],
            languages: [],
            smallBusinessLabel: '', 
            username: '',
            isLoading: false
        }

        this.state.languages = Languages
    }

    sendOtp = async () => {
        if(this.state.username.trim() === "") {
            return Toast.show({
                type: "danger",
                text: "Please enter username",
                duration: 3000
            })
        }
        let isOnline = await NetInfo.fetch().then(state => state.isConnected);
        if(!isOnline) {
            return Toast.show({
                type: "warning",
                text: "Please be online",
                duration: 3000
            })
        }
        this.setState({isLoading: true})
        let response = await axios.post(DataAccess.BaseUrl + DataAccess.AccessUrl + DataAccess.sendOtp, {
            "username" : this.state.username.trim()
        });
        this.setState({isLoading: false})
        if(response.data.status == 2) {
            return Toast.show({
                type: 'warning',
                text: response.data.msg,
                duration: 3000
            })
        } else if(response.data.status == 1) {
            this.props.navigation.navigate(
                "VerifyOtpScreen", {
                    sentOtp: response.data.hashData,
                    userId: response.data.data._id,
                    username: this.state.username.trim()
                }
            )
            return Toast.show({
                type: 'warning',
                text: response.data.msg,
                duration: 3000
            })
        }
    }


    render() {
        return (
            <KeyboardAwareScrollView style={{ backgroundColor: BaseColor.BackgroundColor, flex: 1 }}
                keyboardShouldPersistTaps='handled'
            >
                <View >
                    <View style={{ marginTop: heightToDp("3%"), alignSelf: "center" }}>
                        <Logo />
                    </View>
                    <View style={{ marginTop: heightToDp("5%") }}>
                        <Text style={{ fontSize: widthToDp("7%"), alignSelf: 'center', fontFamily: 'Oswald-SemiBold' }}>{LanguageChange.forgotPassword}</Text>
                    </View>
                </View>

                <ScrollView style={{ marginTop: heightToDp("2%"), marginLeft: widthToDp("10%") }}>
                    <FloatingLabel
                        labelStyle={styles.labelInput}
                        inputStyle={styles.input}
                        style={styles.formInput}
                        // onBlur={this.onBlur}
                        onChangeText={(text) => { this.setState({ username: text }) }}
                    >{LanguageChange.username}</FloatingLabel>
                    {
                        this.state.isLoading ? <CustomIndicator IsLoading={this.state.isLoading} /> : null
                    }
                    <TouchableOpacity 
                    onPress={this.sendOtp}
                    disabled={this.state.isLoading}>
                        <View style={{ backgroundColor: BaseColor.SecondaryColor, marginTop: heightToDp("5%"), width: widthToDp("60%"), alignSelf: 'center', height: heightToDp("5%"), borderRadius: 100 }}>
                            <Text style={{ alignSelf: 'center', marginTop: heightToDp("0.5%"), fontWeight: '500', fontSize: widthToDp("5%"), fontFamily: 'Oswald-Medium' }}>{LanguageChange.sendOtp}</Text>
                        </View>
                    </TouchableOpacity>
                </ScrollView>
            </KeyboardAwareScrollView>
        );
    }
}

var styles = StyleSheet.create({
    labelInput: {
        color: '#000',
        fontSize: widthToDp("4.6%"),
        fontFamily: 'Oswald-Medium'
    },
    formInput: {
        borderBottomWidth: 1.5,
        borderColor: '#333',
        width: widthToDp("80%")
    },
    input: {
        borderWidth: 0,
        height: heightToDp("6%"),
        fontSize: widthToDp("5%"),
        fontFamily: 'Oswald-Light'
    }
})