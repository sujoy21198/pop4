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
import NetInfo from '@react-native-community/netinfo';
import axios from 'axios'
import DataAccess from '../Core/DataAccess'


export default class VerifyOtpScreen extends Component {

    constructor(props) {
        super(props)
        this.state = {
            data: [],
            languages: [],
            smallBusinessLabel: '',
            otp: ''
        }

        this.state.languages = Languages
    }

    verifyOtp = async () => {
        if(this.state.otp.trim() === "") {
            return Toast.show({
                type: "danger",
                text: "Please enter OTP sent to the registered mobile number",
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
        let response = await axios.post(DataAccess.BaseUrl + DataAccess.AccessUrl + DataAccess.verifyOtp, {
            "verifyOtp" : this.state.otp.trim(),
            "sentOtp" : this.props.route.params.sentOtp,
            "userId" : this.props.route.params.userId
        });
        this.setState({isLoading: false})
        if(response.data.status == 2) {
            return Toast.show({
                type: 'warning',
                text: response.data.msg,
                duration: 3000
            })
        } else if(response.data.status == 1) {
            this.props.navigation.navigate("ResetPasswordScreen", {userId: this.props.route.params.userId, username: this.props.route.params.username})
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
                        <Text style={{ fontSize: widthToDp("7%"), alignSelf: 'center', fontFamily: 'Oswald-SemiBold' }}>{LanguageChange.verifyOtp}</Text>
                    </View>
                </View>

                <ScrollView style={{ marginTop: heightToDp("2%"), marginLeft: widthToDp("10%") }}>
                    <FloatingLabel
                        labelStyle={styles.labelInput}
                        inputStyle={styles.input}
                        style={styles.formInput}
                        // onBlur={this.onBlur}
                        onChangeText={(text) => { this.setState({ otp: text }) }}
                    >{LanguageChange.otp}</FloatingLabel>

                    {
                        this.state.isLoading ? <CustomIndicator IsLoading={this.state.isLoading} /> : null
                    }
                    <TouchableOpacity 
                    onPress={this.verifyOtp}
                    disabled={this.state.isLoading}>
                        <View style={{ backgroundColor: BaseColor.SecondaryColor, marginTop: heightToDp("5%"), width: widthToDp("60%"), alignSelf: 'center', height: heightToDp("5%"), borderRadius: 100 }}>
                            <Text style={{ alignSelf: 'center', marginTop: heightToDp("0.5%"), fontWeight: '500', fontSize: widthToDp("5%"), fontFamily: 'Oswald-Medium' }}>{LanguageChange.verifyOtp}</Text>
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