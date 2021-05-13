import React, { Component } from 'react'
import { View, Image, TouchableOpacity, FlatList, Linking, ScrollView } from 'react-native'
import BaseColor from '../Core/BaseTheme'
import { Card, Text } from 'native-base'
import TopLogo from '../assets/TopLogo'
import { widthToDp, heightToDp } from '../Responsive'
import { FlatGrid, SectionGrid } from 'react-native-super-grid'
import Icon from 'react-native-vector-icons/FontAwesome'
import tts from 'react-native-tts'
import base64 from 'react-native-base64'
import axios from 'axios'
import DataAccess from '../Core/DataAccess'
import CustomIndicator from '../Core/CustomIndicator'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Languages from '../Core/Languages'
import LanguageChange from '../Core/LanguageChange'
import HeaderComponent from '../components/HeaderComponent'

export default class MoneyManagerScreen extends Component {

    constructor(props) {
        super(props)
        this.state = {
            languages: [],
            moneyManagerLabel: '',
            expenseLabel: '',
            incomeLabel: '',
            allTransactionLabel: ''
        }
        this.state.languages = Languages
        //alert(this.state.value)
    }

    componentDidMount() {
        this.loadlabelsFromStorage()
        this.setLanguageOnMount()
    }

    expense = () => {
        this.props.navigation.navigate({
            name: 'MoneyManagerCategoriesScreen',
            params: { type: this.props.expenseLabel, profitType: 'expense' }
        })
    }

    income = () => {
        this.props.navigation.navigate({
            name: 'MoneyManagerCategoriesScreen',
            params: { type: this.props.incomeLabel, profitType: 'income' }
        })
    }

    setLanguageOnMount = async () => {
        let defaultLanguage = await AsyncStorage.getItem('language')
        if (defaultLanguage === 'en') {
            this.setState({ textLanguageChange: '0' })
            this.loadlabelsFromStorage()
        } else if (defaultLanguage === 'hi') {
            this.setState({ textLanguageChange: '1' })
            this.loadlabelsFromStorage()
        } else if (defaultLanguage === 'ho') {
            this.setState({ textLanguageChange: '2' })
            this.loadlabelsFromStorage()
        } else if (defaultLanguage === 'od') {
            this.setState({ textLanguageChange: '3' })
            this.loadlabelsFromStorage()
        } else if (defaultLanguage === 'san') {
            this.setState({ textLanguageChange: '4' })
            this.loadlabelsFromStorage()
        }
    }

    languageChangeFunction = async (data) => {

        if (data === 'en') {
            AsyncStorage.setItem('language', 'en')
            this.setState({ textLanguageChange: '0' })
            this.loadlabelsFromStorage()
            this.props.navigation.reset({
                index: 0,
                routes: [{ name: "DashBoardScreen" }]
            });
        } else if (data === 'hi') {
            this.setState({ textLanguageChange: '1' })
            AsyncStorage.setItem('language', 'hi')
            this.loadlabelsFromStorage()
            this.props.navigation.reset({
                index: 0,
                routes: [{ name: "DashBoardScreen" }]
            });
        } else if (data === 'ho') {
            this.setState({ textLanguageChange: '2' })
            AsyncStorage.setItem('language', 'ho')
            this.loadlabelsFromStorage()
            this.props.navigation.reset({
                index: 0,
                routes: [{ name: "DashBoardScreen" }]
            });
        } else if (data === 'od') {
            this.setState({ textLanguageChange: '3' })
            AsyncStorage.setItem('language', 'od')
            this.loadlabelsFromStorage()
            this.props.navigation.reset({
                index: 0,
                routes: [{ name: "DashBoardScreen" }]
            });
        } else if (data === 'san') {
            AsyncStorage.setItem('language', 'san')
            this.setState({ textLanguageChange: '4' })
            this.loadlabelsFromStorage()
            this.props.navigation.reset({
                index: 0,
                routes: [{ name: "DashBoardScreen" }]
            });
        }
    }

    loadlabelsFromStorage = async () => {
        try {
            let username = await AsyncStorage.getItem('username')
            let user = await AsyncStorage.getItem('labelsData');
            let parsed = JSON.parse(user);
            var specificObject = parsed[0]
            var moneyManagerLabel = specificObject.labels.find((i) => i.type === 24)
            var expenseLabel = specificObject.labels.find((i) => i.type === 40)
            var incomeLabel = specificObject.labels.find((i) => i.type === 37)
            var allTransactionLabel = specificObject.labels.find((i) => i.type === 44)
            if (this.state.textLanguageChange === '0') {
                this.setState({ moneyManagerLabel: moneyManagerLabel.nameEnglish })
                this.setState({ expenseLabel: expenseLabel.nameEnglish })
                this.setState({ incomeLabel: incomeLabel.nameEnglish })
                this.setState({ allTransactionLabel: allTransactionLabel.nameEnglish })
            } else if (this.state.textLanguageChange === '1') {
                this.setState({ moneyManagerLabel: moneyManagerLabel.nameHindi })
                this.setState({ expenseLabel: expenseLabel.nameHindi })
                this.setState({ incomeLabel: incomeLabel.nameHindi })
                this.setState({ allTransactionLabel: allTransactionLabel.nameHindi })
            } else if (this.state.textLanguageChange === '2') {
                this.setState({ moneyManagerLabel: moneyManagerLabel.nameHo })
                this.setState({ expenseLabel: expenseLabel.nameHo })
                this.setState({ incomeLabel: incomeLabel.nameHo })
                this.setState({ allTransactionLabel: allTransactionLabel.nameHo })
            } else if (this.state.textLanguageChange === '3') {
                this.setState({ moneyManagerLabel: moneyManagerLabel.nameOdia })
                this.setState({ expenseLabel: expenseLabel.nameOdia })
                this.setState({ incomeLabel: incomeLabel.nameOdia })
                this.setState({ allTransactionLabel: allTransactionLabel.nameOdia })
            } else if (this.state.textLanguageChange === '4') {
                this.setState({ moneyManagerLabel: moneyManagerLabel.nameSanthali})
                this.setState({ expenseLabel: expenseLabel.nameSanthali })
                this.setState({ incomeLabel: incomeLabel.nameSanthali })
                this.setState({ allTransactionLabel: allTransactionLabel.nameSanthali })
            }
            console.log(moneyManagerLabel.nameEnglish)
        } catch (error) {
            alert(error)
        }
        //this.setState({ crops: specificObject.crops })
    }

    render() {
        return (
            <View style={{ backgroundColor: BaseColor.BackgroundColor, flex: 1 }}>
                <HeaderComponent
                    navigation={this.props.navigation}
                />

                <View style={{ flexDirection: 'row', marginTop: heightToDp("1%"), marginLeft: widthToDp("1%") }}>
                    <TouchableOpacity onPress={() => this.languageChangeFunction(this.state.languages[0].id)}>
                        <View style={{ backgroundColor: BaseColor.English, width: widthToDp("30%"), height: heightToDp("6%"), marginLeft: widthToDp("2%"), borderRadius: 100, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{ color: '#fff', fontFamily: 'Oswald-Medium' }}>{this.state.languages[0].value}</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => this.languageChangeFunction(this.state.languages[1].id)}>
                        <View style={{ backgroundColor: BaseColor.Hindi, width: widthToDp("30%"), height: heightToDp("6%"), marginLeft: widthToDp("2%"), borderRadius: 100, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: widthToDp("4.3%") }}>{this.state.languages[1].value}</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => this.languageChangeFunction(this.state.languages[2].id)}>
                        <View style={{ backgroundColor: BaseColor.Ho, width: widthToDp("30%"), height: heightToDp("6%"), marginLeft: widthToDp("2%"), borderRadius: 100, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: widthToDp("4.3%") }}>{this.state.languages[2].value}</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: heightToDp("1%"), marginLeft: widthToDp("1%"), alignSelf: 'center' }}>
                    <TouchableOpacity onPress={() => this.languageChangeFunction(this.state.languages[3].id)}>
                        <View style={{ backgroundColor: BaseColor.Uridia, width: widthToDp("30%"), height: heightToDp("6%"), borderRadius: 100, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: widthToDp("4.3%") }}>{this.state.languages[3].value}</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => this.languageChangeFunction(this.state.languages[4].id)}>
                        <View style={{ backgroundColor: BaseColor.Santhali, width: widthToDp("30%"), height: heightToDp("6%"), borderRadius: 100, marginLeft: widthToDp("2%"), flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: widthToDp("4.3%") }}>{this.state.languages[4].value}</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={{ borderBottomColor: BaseColor.Stroke, borderBottomWidth: 1, marginTop: heightToDp('1.5%'), width: widthToDp("100%") }}></View>
                <Text style={{ marginLeft: widthToDp("3%"), marginTop: heightToDp("2%"), fontSize: widthToDp("7%"), fontFamily: 'Oswald-Medium' }}>{this.state.moneyManagerLabel}</Text>

                <TouchableOpacity onPress={() => this.expense()}>
                    <View style={{ alignSelf: 'center', marginTop: heightToDp("3%"), backgroundColor: BaseColor.Red, height: heightToDp("10%"), width: widthToDp("80%"), borderRadius: 20 }}>
                        <Text style={{ fontSize: widthToDp("7%"), fontFamily: 'Oswald-Medium', alignSelf: 'center', marginTop: heightToDp("2%"), color: 'white' }}>{this.state.expenseLabel}</Text>
                    </View>
                </TouchableOpacity>


                <TouchableOpacity onPress={() => this.income()}>
                    <View style={{ alignSelf: 'center', marginTop: heightToDp("3%"), backgroundColor: BaseColor.Red, height: heightToDp("10%"), width: widthToDp("80%"), borderRadius: 20 }}>
                        <Text style={{ fontSize: widthToDp("7%"), fontFamily: 'Oswald-Medium', alignSelf: 'center', marginTop: heightToDp("2%"), color: 'white' }}>{this.state.incomeLabel}</Text>
                    </View>
                </TouchableOpacity>


                <TouchableOpacity onPress={() => this.props.navigation.navigate('AllTransactionScreen')}>
                    <View style={{ alignSelf: 'center', marginTop: heightToDp("3%"), backgroundColor: BaseColor.Red, height: heightToDp("10%"), width: widthToDp("80%"), borderRadius: 20 }}>
                        <Text style={{ fontSize: widthToDp("7%"), fontFamily: 'Oswald-Medium', alignSelf: 'center', marginTop: heightToDp("2%"), color: 'white' }}>{this.state.allTransactionLabel}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}