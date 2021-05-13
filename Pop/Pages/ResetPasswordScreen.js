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


export default class ResetPasswordScreen extends Component {

    constructor(props) {
        super(props)
        this.state = {
            data: [],
            languages: [],
            smallBusinessLabel: '',
            newPassword: '',
            confirmPassword: '',
            isLoading: false,
            newPassword: "",
            confirmPassword: "",
            password: ""
        }

        this.state.languages = Languages
    }

    componentDidMount = async () => {

        let user = JSON.parse(await AsyncStorage.getItem("user"));
        let loggedUser = user.find(item => item.username === this.props.route.params.username);
        if(typeof loggedUser === "object") {
            this.setState({password: loggedUser.password});
        }
    }

    resetPassword = async () => {
        if(this.state.newPassword.trim() === "") {
            return Toast.show({
                type: "danger",
                text: "Please enter the new password",
                duration: 3000
            })
        }
        if(this.state.confirmPassword.trim() === "") {
            return Toast.show({
                type: "danger",
                text: "Please confirm the new password",
                duration: 3000
            })
        }
        if(this.state.newPassword.trim() !== this.state.confirmPassword.trim()) {
            return Toast.show({
                type: "danger",
                text: "Passwords do not match",
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
        let response = await axios.post(DataAccess.BaseUrl + DataAccess.AccessUrl + DataAccess.resetPassword, {
            "password" : this.state.newPassword.trim(),
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
            this.props.navigation.navigate("SigninScreen")
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
                    {
                        this.state.password === "" &&
                        <View style={{ marginTop: heightToDp("5%") }}>
                            <Text style={{ fontSize: widthToDp("7%"), alignSelf: 'center', fontFamily: 'Oswald-SemiBold' }}>{LanguageChange.resetPassword}</Text>
                        </View>
                    }                    
                </View>
                
                <ScrollView style={{ marginTop: heightToDp("2%"), marginLeft: widthToDp("10%") }}>
                    {
                        this.state.password === "" ? 
                        <>
                            <FloatingLabel
                                labelStyle={styles.labelInput}
                                inputStyle={styles.input}
                                style={styles.formInput}
                                password={true}
                                // onBlur={this.onBlur}
                                onChangeText={(text) => { this.setState({ newPassword: text }) }}
                            >{LanguageChange.newPassword}</FloatingLabel>

                            <FloatingLabel
                                labelStyle={styles.labelInput}
                                inputStyle={styles.input}
                                style={styles.formInput}
                                password={true}
                                // onBlur={this.onBlur}
                                onChangeText={(text) => { this.setState({ confirmPassword: text }) }}
                            >{LanguageChange.confirmPassword}</FloatingLabel>

                            {
                                this.state.isLoading ? <CustomIndicator IsLoading={this.state.isLoading} /> : null
                            }
                            <TouchableOpacity onPress={this.resetPassword} disabled={this.state.isLoading}>
                                <View style={{ backgroundColor: BaseColor.SecondaryColor, marginTop: heightToDp("5%"), width: widthToDp("60%"), alignSelf: 'center', height: heightToDp("5%"), borderRadius: 100 }}>
                                    <Text style={{ alignSelf: 'center', marginTop: heightToDp("0.5%"), fontWeight: '500', fontSize: widthToDp("5%"), fontFamily: 'Oswald-Medium' }}>{LanguageChange.resetPassword}</Text>
                                </View>
                            </TouchableOpacity>
                        </>  :
                        <View
                            style={{
                                marginTop: heightToDp('18%'),
                            }}
                        >
                            <Text style={{fontSize: widthToDp("5%"), marginLeft: widthToDp("9%")}}>
                                <Text
                                    style={{
                                        fontWeight: 'bold',
                                        fontSize: widthToDp("5%")
                                    }}
                                >Your password is: </Text>
                                {this.state.password}
                            </Text>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate("SigninScreen")} style={{marginLeft: widthToDp("11%")}}>
                                <View style={{ backgroundColor: BaseColor.SecondaryColor, marginTop: heightToDp("5%"), width: widthToDp("60%"), height: heightToDp("5%"), borderRadius: 100 }}>
                                    <Text style={{ alignSelf: 'center', marginTop: heightToDp("0.5%"), fontWeight: '500', fontSize: widthToDp("5%"), fontFamily: 'Oswald-Medium' }}>{LanguageChange.signIn}</Text>
                                </View>
                            </TouchableOpacity>
                        </View>  
                    }                    
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