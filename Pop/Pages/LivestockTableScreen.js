import React, { Component } from 'react'
import { View, Image, TouchableOpacity, ScrollView } from 'react-native'
import BaseColor from '../Core/BaseTheme'
import { Text, Input, Toast } from 'native-base'
import TopLogo from '../assets/TopLogo'
import { widthToDp, heightToDp } from '../Responsive'
import { FlatGrid, SectionGrid } from 'react-native-super-grid'
import Icon from 'react-native-vector-icons/FontAwesome'
import AsyncStorage from '@react-native-async-storage/async-storage'
import base64 from 'react-native-base64'
import axios from 'axios'
import DataAccess from '../Core/DataAccess'
import CustomIndicator from '../Core/CustomIndicator'
import Languages from '../Core/Languages'
import HeaderComponent from '../components/HeaderComponent'


const months = [
    { 'name': 'JAN', 'vaccine1': 'Deworming', 'vaccine2': 'Lasota' },
    { 'name': 'FEB', 'vaccine1': '', 'vaccine2': 'Lasota' },
    { 'name': 'MAR', 'vaccine1': '', 'vaccine2': '' },
    { 'name': 'APR', 'vaccine1': 'Deworming', 'vaccine2': 'Lasota' },
    { 'name': 'MAY', 'vaccine1': '', 'vaccine2': '' },
    { 'name': 'JUN', 'vaccine1': '', 'vaccine2': '' },
    { 'name': 'JUL', 'vaccine1': 'Deworming', 'vaccine2': 'Lasota' },
    { 'name': 'AUG', 'vaccine1': '', 'vaccine2': '' },
    { 'name': 'SEP', 'vaccine1': '', 'vaccine2': 'Lasota' },
    { 'name': 'OCT', 'vaccine1': 'Deworming', 'vaccine2': 'Pox' },
    { 'name': 'NOV', 'vaccine1': '', 'vaccine2': '' },
    { 'name': 'DEC', 'vaccine1': '', 'vaccine2': '' }
]

const tableHeading = [
    { 'name': '', 'birth': '1st Birth', 'age': '16 months old', 'numbers': '1', 'unitPrice': '4000', 'totalPriceInRupees': '5000' },
    { 'name': 'Age till 2nd year end', 'birth': '2nd Birth', 'age': '8 months old', 'numbers': '1', 'unitPrice': '4000', 'totalPriceInRupees': '5000' },
    { 'name': 'Qnty', 'birth': '3rd Birth', 'age': 'kid', 'numbers': '1', 'unitPrice': '4000', 'totalPriceInRupees': '5000' },
    { 'name': 'Unit Price (₹)' },
    { 'name': 'Total Price (₹)' }
]

export default class LivestockTableScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            numberGoats: '1',
            tableHeading: [],
            unitPrice1stBirth: '5000',
            unitPrice2ndBirth: '4000',
            unitPrice3rdBirth: '500',
            totalPrice1stBirth: '5000',
            totalPrice2ndBirth: '4000',
            totalPrice3rdBirth: '500',
            totalValueAfter2years: '9500',
            totalExpenseforNgoats: '120',
            expenseForSupplementary: '130',
            b: '250',
            totalProfitFromNgoats: '9250',
            languages:[],
            backButtonText: '',
            calculateButtonText: '',
            exitButtonText: '',
            incomeHeaderLabel: '',
            incomeGoatDesc: '',
            ageLabel: '',
            quantityLabel: '',
            unitCostLabel: '',
            totalCostLabel: '',
            totalValueAfter2Years: '',
            totalValueAfter2YearsFrom1MotherGoat: '',
            totalValueAfter2YearsFrom2MotherGoats: '',
            totalProfitFrom4MotherGoatsPer2Years: '9250',
            noteLabel: '',
            incomeFrom: '',
            goats: '',
            cost: '',
            total: '', 
            supplimentary: '',
            immunisation: '',
            birth1: '',
            birth2: '',
            birth3: '',
            monthOld: '',
            immunisation: '',
            kids: '',
            aminusb : '',
            netProfitLabel: '',
        }
        this.state.tableHeading = tableHeading
        this.state.languages = Languages
    }
    componentDidMount() {
        this.getVaccinesFromOffline()
        this.setLanguageOnMount()
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


    loadlabelsFromStorage = async () => {
        try {
            let username = await AsyncStorage.getItem('username')
            let user = await AsyncStorage.getItem('labelsData');
            let parsed = JSON.parse(user);
            var specificObject = parsed.find((i) => i.username === username)
            var incomeHeaderLabel = specificObject.labels.find((i) => i.type === 129)
            var incomeGoatDesc = specificObject.labels.find((i) => i.type === 131)
            var quantityLabel = specificObject.labels.find((i) => i.type === 79)
            var ageLabel = specificObject.labels.find((i) => i.type === 132)
            var unitCostLabel = specificObject.labels.find((i) => i.type === 165)
            var totalCostLabel = specificObject.labels.find((i) => i.type === 166)
            var totalValueAfter2Years = specificObject.labels.find((i) => i.type === 140)
            var totalValueAfter2YearsFrom1MotherGoat = specificObject.labels.find((i) => i.type === 141)
            var totalValueAfter2YearsFrom2MotherGoats = specificObject.labels.find((i) => i.type === 142)
            var backButtonText = specificObject.labels.find((i) => i.type === 64)
            var calculateButtonText = specificObject.labels.find((i) => i.type === 192)
            var exitButtonText = specificObject.labels.find((i) => i.type === 63)
            var totalProfitFrom4MotherGoatsPer2Years = specificObject.labels.find((i) => i.type === 146)
            var noteLabel = specificObject.labels.find((i) => i.type === 147)
            var incomeFrom = specificObject.labels.find((i) => i.type === 95)
            var goats = specificObject.labels.find((i) => i.type === 130)
            var motherGoats = specificObject.labels.find((i) => i.type === 143)
            var cost = specificObject.labels.find((i) => i.type === 90)
            var supplimentary = specificObject.labels.find((i) => i.type === 144)
            var immunisation = specificObject.labels.find((i) => i.type === 145)
            var birth1 = specificObject.labels.find((i) => i.type === 135)
            var birth2 = specificObject.labels.find((i) => i.type === 136)
            var birth3 = specificObject.labels.find((i) => i.type === 137)
            var monthOld = specificObject.labels.find((i) => i.type === 138)
            var kids = specificObject.labels.find((i) => i.type === 139)
            var total = specificObject.labels.find((i) => i.type === 112)
            var netProfitLabel = specificObject.labels.find((i) => i.type === 122)
            if (this.state.textLanguageChange === '0') {
                this.setState({ incomeHeaderLabel: incomeHeaderLabel.nameEnglish })
                this.setState({ quantityLabel: quantityLabel.nameEnglish })
                this.setState({ ageLabel: ageLabel.nameEnglish })
                this.setState({ incomeGoatDesc: incomeGoatDesc.nameEnglish })
                this.setState({ totalValueAfter2Years: totalValueAfter2Years.nameEnglish })
                this.setState({ unitCostLabel: unitCostLabel.nameEnglish })
                this.setState({ totalCostLabel: totalCostLabel.nameEnglish })
                this.setState({ backButtonText: backButtonText.nameEnglish })
                this.setState({ calculateButtonText: calculateButtonText.nameEnglish })
                this.setState({ exitButtonText: exitButtonText.nameEnglish })
                this.setState({ totalProfitFrom4MotherGoatsPer2Years: totalProfitFrom4MotherGoatsPer2Years.nameEnglish })
                this.setState({ noteLabel: noteLabel.nameEnglish })
                this.setState({ incomeFrom: incomeFrom.nameEnglish })
                this.setState({ totalValueAfter2YearsFrom1MotherGoat: totalValueAfter2YearsFrom1MotherGoat.nameEnglish })
                this.setState({ motherGoats: motherGoats.nameEnglish })
                this.setState({ totalProfitFrom4MotherGoatsPer2Years: totalProfitFrom4MotherGoatsPer2Years.nameEnglish })
                this.setState({ immunisation: immunisation.nameEnglish })
                this.setState({ totalValueAfter2YearsFrom2MotherGoats: totalValueAfter2YearsFrom2MotherGoats.nameEnglish })
                this.setState({ cost: cost.nameEnglish })
                this.setState({ totalProfitFrom4MotherGoatsPer2Years: totalProfitFrom4MotherGoatsPer2Years.nameEnglish })
                this.setState({ supplimentary: supplimentary.nameEnglish })
                this.setState({ birth1: birth1.nameEnglish })
                this.setState({ goats: goats.nameEnglish })
                this.setState({ birth2: birth2.nameEnglish })
                this.setState({ birth3: birth3.nameEnglish })
                this.setState({ monthOld: monthOld.nameEnglish })
                this.setState({ kids: kids.nameEnglish })
                this.setState({ total: total.nameEnglish })
                this.setState({ netProfitLabel: netProfitLabel.nameEnglish })
            } else if (this.state.textLanguageChange === '1') {                
                this.setState({ incomeHeaderLabel: incomeHeaderLabel.nameHindi })
                this.setState({ quantityLabel: quantityLabel.nameHindi })
                this.setState({ ageLabel: ageLabel.nameHindi })
                this.setState({ incomeGoatDesc: incomeGoatDesc.nameHindi })
                this.setState({ totalValueAfter2Years: totalValueAfter2Years.nameHindi })
                this.setState({ unitCostLabel: unitCostLabel.nameHindi })
                this.setState({ totalCostLabel: totalCostLabel.nameHindi })
                this.setState({ backButtonText: backButtonText.nameHindi })
                this.setState({ calculateButtonText: calculateButtonText.nameHindi })
                this.setState({ exitButtonText: exitButtonText.nameHindi })
                this.setState({ totalProfitFrom4MotherGoatsPer2Years: totalProfitFrom4MotherGoatsPer2Years.nameHindi })
                this.setState({ noteLabel: noteLabel.nameHindi })
                this.setState({ incomeFrom: incomeFrom.nameHindi })
                this.setState({ totalValueAfter2YearsFrom1MotherGoat: totalValueAfter2YearsFrom1MotherGoat.nameHindi })
                this.setState({ motherGoats: motherGoats.nameHindi })
                this.setState({ totalProfitFrom4MotherGoatsPer2Years: totalProfitFrom4MotherGoatsPer2Years.nameHindi })
                this.setState({ immunisation: immunisation.nameHindi })
                this.setState({ totalValueAfter2YearsFrom2MotherGoats: totalValueAfter2YearsFrom2MotherGoats.nameHindi })
                this.setState({ cost: cost.nameHindi })
                this.setState({ totalProfitFrom4MotherGoatsPer2Years: totalProfitFrom4MotherGoatsPer2Years.nameHindi })
                this.setState({ supplimentary: supplimentary.nameHindi })
                this.setState({ birth1: birth1.nameHindi })
                this.setState({ goats: goats.nameHindi })
                this.setState({ birth2: birth2.nameHindi })
                this.setState({ birth3: birth3.nameHindi })
                this.setState({ monthOld: monthOld.nameHindi })
                this.setState({ kids: kids.nameHindi })
                this.setState({ total: total.nameHindi })
                this.setState({ netProfitLabel: netProfitLabel.nameHindi })
            } else if (this.state.textLanguageChange === '2') {
                
                this.setState({ incomeHeaderLabel: incomeHeaderLabel.nameHo })
                this.setState({ quantityLabel: quantityLabel.nameHo })
                this.setState({ ageLabel: ageLabel.nameHo })
                this.setState({ incomeGoatDesc: incomeGoatDesc.nameHo })
                this.setState({ totalValueAfter2Years: totalValueAfter2Years.nameHo })
                this.setState({ unitCostLabel: unitCostLabel.nameHo })
                this.setState({ totalCostLabel: totalCostLabel.nameHo })
                this.setState({ backButtonText: backButtonText.nameHo })
                this.setState({ calculateButtonText: calculateButtonText.nameHo })
                this.setState({ exitButtonText: exitButtonText.nameHo })
                this.setState({ totalProfitFrom4MotherGoatsPer2Years: totalProfitFrom4MotherGoatsPer2Years.nameHo })
                this.setState({ noteLabel: noteLabel.nameHo })
                this.setState({ incomeFrom: incomeFrom.nameHo })
                this.setState({ totalValueAfter2YearsFrom1MotherGoat: totalValueAfter2YearsFrom1MotherGoat.nameHo })
                this.setState({ motherGoats: motherGoats.nameHo })
                this.setState({ totalProfitFrom4MotherGoatsPer2Years: totalProfitFrom4MotherGoatsPer2Years.nameHo })
                this.setState({ immunisation: immunisation.nameHo })
                this.setState({ totalValueAfter2YearsFrom2MotherGoats: totalValueAfter2YearsFrom2MotherGoats.nameHo })
                this.setState({ cost: cost.nameHo })
                this.setState({ totalProfitFrom4MotherGoatsPer2Years: totalProfitFrom4MotherGoatsPer2Years.nameHo })
                this.setState({ supplimentary: supplimentary.nameHo })
                this.setState({ birth1: birth1.nameHo })
                this.setState({ goats: goats.nameHo })
                this.setState({ birth2: birth2.nameHo })
                this.setState({ birth3: birth3.nameHo })
                this.setState({ monthOld: monthOld.nameHo })
                this.setState({ kids: kids.nameHo })
                this.setState({ total: total.nameHo })
                this.setState({ netProfitLabel: netProfitLabel.nameHo })
            } else if (this.state.textLanguageChange === '3') {
                
                this.setState({ incomeHeaderLabel: incomeHeaderLabel.nameOdia })
                this.setState({ quantityLabel: quantityLabel.nameOdia })
                this.setState({ ageLabel: ageLabel.nameOdia })
                this.setState({ incomeGoatDesc: incomeGoatDesc.nameOdia })
                this.setState({ totalValueAfter2Years: totalValueAfter2Years.nameOdia })
                this.setState({ unitCostLabel: unitCostLabel.nameOdia })
                this.setState({ totalCostLabel: totalCostLabel.nameOdia })
                this.setState({ backButtonText: backButtonText.nameOdia })
                this.setState({ calculateButtonText: calculateButtonText.nameOdia })
                this.setState({ exitButtonText: exitButtonText.nameOdia })
                this.setState({ totalProfitFrom4MotherGoatsPer2Years: totalProfitFrom4MotherGoatsPer2Years.nameOdia })
                this.setState({ noteLabel: noteLabel.nameOdia })
                this.setState({ incomeFrom: incomeFrom.nameOdia })
                this.setState({ totalValueAfter2YearsFrom1MotherGoat: totalValueAfter2YearsFrom1MotherGoat.nameOdia })
                this.setState({ motherGoats: motherGoats.nameOdia })
                this.setState({ totalProfitFrom4MotherGoatsPer2Years: totalProfitFrom4MotherGoatsPer2Years.nameOdia })
                this.setState({ immunisation: immunisation.nameOdia })
                this.setState({ totalValueAfter2YearsFrom2MotherGoats: totalValueAfter2YearsFrom2MotherGoats.nameOdia })
                this.setState({ cost: cost.nameOdia })
                this.setState({ totalProfitFrom4MotherGoatsPer2Years: totalProfitFrom4MotherGoatsPer2Years.nameOdia })
                this.setState({ supplimentary: supplimentary.nameOdia })
                this.setState({ birth1: birth1.nameOdia })
                this.setState({ goats: goats.nameOdia })
                this.setState({ birth2: birth2.nameOdia })
                this.setState({ birth3: birth3.nameOdia })
                this.setState({ monthOld: monthOld.nameOdia })
                this.setState({ kids: kids.nameOdia })
                this.setState({ total: total.nameOdia })
                this.setState({ netProfitLabel: netProfitLabel.nameOdia })
            } else if (this.state.textLanguageChange === '4') {
                
                this.setState({ incomeHeaderLabel: incomeHeaderLabel.nameSanthali })
                this.setState({ quantityLabel: quantityLabel.nameSanthali })
                this.setState({ ageLabel: ageLabel.nameSanthali })
                this.setState({ incomeGoatDesc: incomeGoatDesc.nameSanthali })
                this.setState({ totalValueAfter2Years: totalValueAfter2Years.nameSanthali })
                this.setState({ unitCostLabel: unitCostLabel.nameSanthali })
                this.setState({ totalCostLabel: totalCostLabel.nameSanthali })
                this.setState({ backButtonText: backButtonText.nameSanthali })
                this.setState({ calculateButtonText: calculateButtonText.nameSanthali })
                this.setState({ exitButtonText: exitButtonText.nameSanthali })
                this.setState({ totalProfitFrom4MotherGoatsPer2Years: totalProfitFrom4MotherGoatsPer2Years.nameSanthali })
                this.setState({ noteLabel: noteLabel.nameSanthali })
                this.setState({ incomeFrom: incomeFrom.nameSanthali })
                this.setState({ totalValueAfter2YearsFrom1MotherGoat: totalValueAfter2YearsFrom1MotherGoat.nameSanthali })
                this.setState({ motherGoats: motherGoats.nameSanthali })
                this.setState({ totalProfitFrom4MotherGoatsPer2Years: totalProfitFrom4MotherGoatsPer2Years.nameSanthali })
                this.setState({ immunisation: immunisation.nameSanthali })
                this.setState({ totalValueAfter2YearsFrom2MotherGoats: totalValueAfter2YearsFrom2MotherGoats.nameSanthali })
                this.setState({ cost: cost.nameSanthali })
                this.setState({ totalProfitFrom4MotherGoatsPer2Years: totalProfitFrom4MotherGoatsPer2Years.nameSanthali })
                this.setState({ supplimentary: supplimentary.nameSanthali })
                this.setState({ birth1: birth1.nameSanthali })
                this.setState({ goats: goats.nameSanthali })
                this.setState({ birth2: birth2.nameSanthali })
                this.setState({ birth3: birth3.nameSanthali })
                this.setState({ monthOld: monthOld.nameSanthali })
                this.setState({ kids: kids.nameSanthali })
                this.setState({ total: total.nameSanthali })
                this.setState({ netProfitLabel: netProfitLabel.nameSanthali })
            }
        } catch (error) {
            console.log(error)
        }
        //this.setState({ crops: specificObject.crops })
        //this.showData()
    }

    languageChangeFunction = async (data) => {

        if (data === 'en') {
            AsyncStorage.setItem('language', 'en')
            this.setState({ textLanguageChange: '0' })
            this.props.navigation.reset({
                index: 0,
                routes: [{ name: "DashBoardScreen" }]
            });
        } else if (data === 'hi') {
            this.setState({ textLanguageChange: '1' })
            AsyncStorage.setItem('language', 'hi')
            this.props.navigation.reset({
                index: 0,
                routes: [{ name: "DashBoardScreen" }]
            });
        } else if (data === 'ho') {
            this.setState({ textLanguageChange: '2' })
            AsyncStorage.setItem('language', 'ho')
            this.props.navigation.reset({
                index: 0,
                routes: [{ name: "DashBoardScreen" }]
            });
        } else if (data === 'od') {
            this.setState({ textLanguageChange: '3' })
            AsyncStorage.setItem('language', 'od')
            this.props.navigation.reset({
                index: 0,
                routes: [{ name: "DashBoardScreen" }]
            });
        } else if (data === 'san') {
            AsyncStorage.setItem('language', 'san')
            this.setState({ textLanguageChange: '4' })
            this.props.navigation.reset({
                index: 0,
                routes: [{ name: "DashBoardScreen" }]
            });
        }
    }
    getVaccinesFromOffline = async () => {
        try {
            let username = await AsyncStorage.getItem('username')
            let user = await AsyncStorage.getItem('offlineData');
            let parsed = JSON.parse(user);
            var specificObject = parsed[0]
            console.log(specificObject.vaccination)
        } catch (error) {
            alert(error)
        }
    }

    calculation = (data) => {
        this.state.numberGoats = data
        var unitPriceFor1stBirth = this.state.numberGoats * 4000
        var unitPriceFor2ndBirth = this.state.numberGoats * 3000
        var unitPriceFor3rdBirth = this.state.numberGoats * 500
        var totalPrice1stBirth = this.state.numberGoats * 5000
        var totalPrice2ndBirth = this.state.numberGoats * 4000
        var totalPrice3rdBirth = this.state.numberGoats * 500
        var totalValueAfter2years = totalPrice1stBirth + totalPrice2ndBirth + totalPrice3rdBirth
        var totalExpenseforNgoats = this.state.numberGoats * 120
        var expenseForSupplementary = this.state.numberGoats * 130
        var b = totalExpenseforNgoats + expenseForSupplementary
        var totalProfitFromNgoats = totalValueAfter2years - b

        this.setState({ unitPriceFor1stBirth: unitPriceFor1stBirth })
        this.setState({ unitPriceFor2ndBirth: unitPriceFor2ndBirth })
        this.setState({ unitPriceFor3rdBirth: unitPriceFor3rdBirth })
        this.setState({ totalPrice1stBirth: totalPrice1stBirth })
        this.setState({ totalPrice2ndBirth: totalPrice2ndBirth })
        this.setState({ totalPrice3rdBirth: totalPrice3rdBirth })
        this.setState({ totalValueAfter2years: totalValueAfter2years })
        this.setState({ totalExpenseforNgoats: totalExpenseforNgoats })
        this.setState({ expenseForSupplementary: expenseForSupplementary })
        this.setState({ b: b })
        this.setState({ totalProfitFromNgoats: totalProfitFromNgoats })

    }

    saveButton = async () => {
        try {
            const incomeObject = { 'type': 'income', 'category': 'Livestock', 'amount': this.state.totalValueAfter2years }
            let username = await AsyncStorage.getItem('username')
            let user = await AsyncStorage.getItem('user');
            let parsed = JSON.parse(user);
            var specificObject = parsed[0]
            specificObject.moneyManagerData.push(incomeObject)
            await AsyncStorage.setItem('user', JSON.stringify(parsed))
            console.log(specificObject.moneyManagerData)
            Toast.show({text: "Calculated", duration: 3000, type: 'success'});
        } catch (error) {
            console.log(error);
            Toast.show({text: "Some error happened. Please retry.", duration: 3000, type: 'danger'});
        }
    }

    next = async() => {
        try {
            var date = new Date().getDate()
            var month = new Date().getMonth() + 1
            var year = new Date().getFullYear()
            const expenseObject = { 'type': 'expense', 'category': 'Goat livestock', 'amount': this.state.b, 'date': date + "/" + month + "/" + year }
            const incomeObject = { 'type': 'income', 'category': 'Goat livestock', 'amount': this.state.totalValueAfter2years, 'date': date + "/" + month + "/" + year }
            let username = await AsyncStorage.getItem('username')
            let user = await AsyncStorage.getItem('user');
            let parsed = JSON.parse(user);
            var specificObject = parsed.find((i) => i.username === username)
            specificObject.moneyManagerData.push(expenseObject)
            specificObject.moneyManagerData.push(incomeObject)
            await AsyncStorage.setItem('user', JSON.stringify(parsed))
            console.log(specificObject.moneyManagerData)
        } catch (error) {
            console.log(error)
        }
        Toast.show({
            text: "Your data has been saved in MONEY MANAGER under ALL TRANSACTIONS",
            duration: 3000,
            type: 'success'
        });
        this.props.navigation.reset({
            index: 0,
            routes: [{ name: "DashBoardScreen" }]
        })
        // this.props.navigation.navigate({
        //     name: 'VaccinationScreen',
        //     params: { value: 0 }
        // })
    }
    render() {
        var tableHeading = []
        tableHeading = this.state.tableHeading
        //console.log(tableHeading)
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
                    <TouchableOpacity onPress= {() => this.languageChangeFunction(this.state.languages[3].id)}>
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
                <ScrollView nestedScrollEnabled={true}>
                    <View style={{ backgroundColor: BaseColor.Red, height: heightToDp("90%"), alignSelf: 'center', width: widthToDp("90%"), borderRadius: 10, marginTop: heightToDp('1.5%') }}>
                        <Text style={{ color: "#fff", fontSize: widthToDp("5%"), marginLeft: widthToDp("5%"), marginTop: heightToDp("1%"), fontFamily: 'Oswald-Medium' }}>{this.state.incomeHeaderLabel}</Text>
                        <View style={{ backgroundColor: "white", height: heightToDp("85.5%"), alignSelf: 'center', width: widthToDp("90%"), marginTop: heightToDp('2%'), borderBottomLeftRadius: 10, borderBottomRightRadius: 10 }}>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={{ fontSize: widthToDp("5%"), marginLeft: widthToDp("5%"), marginTop: heightToDp("1.5%"), fontFamily: 'Oswald-Medium' }}>{this.state.incomeFrom}</Text>
                                <Input
                                    keyboardType='number-pad'
                                    defaultValue={this.state.numberGoats}
                                    onChangeText={(data) => this.calculation(data)}
                                    style={{ marginLeft: widthToDp("1%"), fontFamily: 'Oswald-Medium', width: widthToDp("10%"), marginTop: heightToDp("1%"), borderBottomWidth: 1, borderColor: 'blue' }}
                                />
                                <Text style={{ fontSize: widthToDp("5%"), marginLeft: widthToDp("1%"), marginTop: heightToDp("1.5%"), fontFamily: 'Oswald-Medium', marginRight: widthToDp("20%") }}>{`${(Number(this.state.numberGoats) === 1 && this.state.textLanguageChange==="0") ? "mother Goat" : this.state.goats}`}</Text>
                            </View>
                            <View style={{paddingHorizontal: widthToDp('2%')}}>
                                <Text>{this.state.incomeGoatDesc}</Text>
                            </View>
                            <ScrollView nestedScrollEnabled={true}>
                                <View style={{ borderWidth: 1, paddingVertical: heightToDp("2%"), width: widthToDp("83%"), marginLeft: widthToDp("3%"), marginTop: heightToDp("1.5%"), flexDirection: 'row' }}>
                                    {
                                        tableHeading.map((i, key) => {
                                            return (
                                                <View style={{ width: widthToDp(`${key===0 ? 11 : key===1 ? 20 : key===2 ? 10 : 15}%`), marginLeft: widthToDp("1.5%") }}>

                                                    <Text style={{fontSize: widthToDp('3.5%')}}>{key===1 ? this.state.ageLabel : key===2 ? this.state.quantityLabel : key==3 ? this.state.unitCostLabel : key===4 ? this.state.totalCostLabel : ""}</Text>

                                                </View>

                                            )
                                        })
                                    }
                                </View>

                                <View style={{ borderWidth: 1, paddingVertical: heightToDp("2%"), width: widthToDp("83%"), marginLeft: widthToDp("3%"), marginTop: heightToDp("0%") }}>
                                    {/* {
                                    tableHeading.map((i) => {
                                        return (
                                            <View style={{ flexDirection: 'row' }}>
                                                <View style={{ width: widthToDp("14%"), marginLeft: widthToDp("1.5%") }}>
                                                    <Text style={{ marginTop: heightToDp("2%") }}>{i.birth}</Text>
                                                </View>
                                                <View style={{ width: widthToDp("17%"), marginLeft: widthToDp("1.5%") }}>
                                                    <Text style={{ marginTop: heightToDp("2%") }}>{i.age}</Text>
                                                </View>
                                                <View style={{ width: widthToDp("10%"), marginLeft: widthToDp("6%") }}>
                                                    <Text style={{ marginTop: heightToDp("2%") }}>{i.numbers}</Text>
                                                </View>
                                                <View style={{ width: widthToDp("14%"), marginLeft: widthToDp("1.5%") }}>
                                                    <Text style={{ marginTop: heightToDp("2%") }}>{i.unitPrice}</Text>
                                                </View>
                                                <View style={{ width: widthToDp("14%"), marginLeft: widthToDp("1.5%") }}>
                                                    <Text style={{ marginTop: heightToDp("2%") }}>{i.totalPriceInRupees}</Text>
                                                </View>
                                            </View>


                                        )
                                    })
                                } */}
                                    <View style={{ flexDirection: 'row' }}>
                                        <View style={{ width: widthToDp("10%"), marginLeft: widthToDp("1.5%") }}>
                                            <Text style={{ marginTop: heightToDp("2%"), fontSize: widthToDp('3.5%') }}>{this.state.birth1}</Text>
                                            <Text style={{ marginTop: heightToDp("3.7%"), fontSize: widthToDp('3.5%') }}>{this.state.birth2}</Text>
                                            <Text style={{ marginTop: heightToDp(`${(this.state.textLanguageChange==="3" || this.state.textLanguageChange==="2") ? 3.3 : 1.5}%`), fontSize: widthToDp('3.5%') }}>{this.state.birth3}</Text>
                                        </View>

                                        <View style={{ width: widthToDp("16%"), marginLeft: widthToDp("1.5%") }}>
                                            <Text style={{ marginTop: heightToDp("2%"), fontSize: widthToDp('3.5%') }}>16 {this.state.monthOld}</Text>
                                            <Text style={{ marginTop: heightToDp(`${(this.state.textLanguageChange === "1" || this.state.textLanguageChange==="2" || this.state.textLanguageChange === "3") ? 3.7 : 1.5}%`), fontSize: widthToDp('3.5%') }}>8 {this.state.monthOld}</Text>
                                            <Text style={{ marginTop: heightToDp("1.5%"), fontSize: widthToDp('3.5%') }}>{this.state.kids}</Text>
                                        </View>
                                        <View style={{ width: widthToDp("10%"), marginLeft: widthToDp("6%") }}>
                                            <Text style={{ marginTop: heightToDp("2%"), fontSize: widthToDp('3.5%') }}>{this.state.numberGoats}</Text>
                                            <Text style={{ marginTop: heightToDp("6%"), fontSize: widthToDp('3.5%') }}>{this.state.numberGoats}</Text>
                                            <Text style={{ marginTop: heightToDp("3.5%"), fontSize: widthToDp('3.5%') }}>{this.state.numberGoats}</Text>
                                        </View>
                                        <View style={{ width: widthToDp("13%"), marginLeft: widthToDp("1.5%") }}>
                                            <View style={{marginTop: heightToDp("2%"), flexDirection: 'row', justifyContent: 'space-between'}}>
                                                <Text style={{ fontSize: widthToDp('3.3%') }}>₹ </Text> 
                                                <Text style={{ fontSize: widthToDp('3.3%') }}>{this.state.unitPrice1stBirth}</Text>
                                            </View>
                                            <View style={{marginTop: heightToDp("6%"), flexDirection: 'row', justifyContent: 'space-between'}}>
                                                <Text style={{ fontSize: widthToDp('3.3%') }}>₹ </Text> 
                                                <Text style={{ fontSize: widthToDp('3.3%') }}>{this.state.unitPrice2ndBirth}</Text>
                                            </View>
                                            <View style={{marginTop: heightToDp("3.5%"), flexDirection: 'row', justifyContent: 'space-between'}}>
                                                <Text style={{ fontSize: widthToDp('3.3%') }}>₹ </Text> 
                                                <Text style={{ fontSize: widthToDp('3.3%') }}>{this.state.unitPrice3rdBirth}</Text>
                                            </View>
                                        </View>
                                        <View style={{ width: widthToDp("14%"), marginLeft: widthToDp("4%") }}>
                                            <View style={{marginTop: heightToDp("2%"), flexDirection: 'row', justifyContent: 'space-between'}}>
                                                <Text style={{ fontSize: widthToDp('3.3%') }}>₹ </Text> 
                                                <Text style={{ fontSize: widthToDp('3.3%') }}>{this.state.totalPrice1stBirth}</Text>
                                            </View>
                                            <View style={{marginTop: heightToDp("6%"), flexDirection: 'row', justifyContent: 'space-between'}}>
                                                <Text style={{ fontSize: widthToDp('3.3%') }}>₹ </Text> 
                                                <Text style={{ fontSize: widthToDp('3.3%') }}>{this.state.totalPrice2ndBirth}</Text>
                                            </View>
                                            <View style={{marginTop: heightToDp("3.5%"), flexDirection: 'row', justifyContent: 'space-between'}}>
                                                <Text style={{ fontSize: widthToDp('3.3%') }}>₹ </Text> 
                                                <Text style={{ fontSize: widthToDp('3.3%') }}>{this.state.totalPrice3rdBirth}</Text>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                                <View style={{ borderWidth: 1, height: heightToDp("8%"), width: widthToDp("83%"), marginLeft: widthToDp("3%"), marginTop: heightToDp("0%"), flexDirection: 'row' }}>
                                    <View style={{marginLeft: widthToDp('1%'), width: widthToDp('30%')}}>
                                        <Text style={{fontSize: widthToDp('3.3%')}}>{this.state.totalValueAfter2Years}</Text>
                                    </View>
                                    <View style={{marginLeft: heightToDp("16%"), width: widthToDp('14%'), flexDirection: 'row', justifyContent: 'space-between'}}>
                                        <Text style={{ fontSize: widthToDp('3.3%') }}>₹ </Text> 
                                        <Text style={{ fontSize: widthToDp('3.3%') }}>{this.state.totalValueAfter2years}</Text>
                                    </View>
                                </View>
                                <View style={{ marginLeft: widthToDp("3%"), marginBottom: widthToDp('1%') }}>
                                    <Text>{this.state.totalValueAfter2YearsFrom1MotherGoat}</Text>
                                    {/* <Text style={{ marginTop: heightToDp("3%") }}>{this.state.totalValueAfter2YearsFrom2MotherGoats}fff</Text> */}
                                </View>

                                {/* <View style={{ marginLeft: widthToDp("3%"),marginTop:heightToDp("2%") }}>
                                <Text>Total expenses for {this.state.numberGoats} goats in 2 years is ₹ {this.state.totalExpenseforNgoats} ({this.state.numberGoats}*130, immunization cost)</Text>
                            </View>

                            <View style={{ marginLeft: widthToDp("3%"),marginTop:heightToDp("2%") }}>
                                <Text>Supplementary feed for 120 days for 1 mother goat per two year @ ₹ 1.00 per day = ₹ 120.00</Text>
                            </View>

                            <View style={{ marginLeft: widthToDp("3%"),marginTop:heightToDp("2%") }}>
                                <Text>Expense for Supplementary feed for {this.state.numberGoats} mother goats per 2 year : {this.state.numberGoats}*120 = {this.state.expenseForSupplementary}</Text>
                            </View>


                            <View style={{ marginLeft: widthToDp("3%"),marginTop:heightToDp("2%") }}>
                                <Text>Total expenses for {this.state.numberGoats} goats per 2 year : {this.state.totalExpenseforNgoats} + {this.state.expenseForSupplementary} = ₹. {this.state.b} (B)</Text>
                            </View> */}

                                <View style={{ borderWidth: 1, paddingVertical: heightToDp("1%"), width: widthToDp("83%"), marginLeft: widthToDp("3%"), marginTop: heightToDp("0%")}}>
                                    <View style={{flexDirection:'row', marginLeft: widthToDp("3%")}}>
                                        <Text style={{width:widthToDp("20%"), fontWeight: 'bold'}}>{this.state.motherGoats}</Text>
                                        <Text style={{width:widthToDp("40%"), fontWeight: 'bold'}}>{this.state.cost}</Text>
                                        <Text style={{fontWeight: 'bold'}}>{this.state.total}</Text>
                                    </View>

                                    <View style={{flexDirection:'row', marginLeft: widthToDp("3%")}}>
                                        <Text style={{width:widthToDp("20%")}}>{this.state.numberGoats}</Text>
                                        <Text style={{width:widthToDp("40%")}}>{this.state.supplimentary}</Text>                                        
                                        <View style={{width: widthToDp('13%'), flexDirection: 'row', justifyContent: 'space-between'}}>
                                            <Text>₹ </Text> 
                                            <Text>{this.state.totalExpenseforNgoats}</Text>
                                        </View>
                                    </View>


                                    <View style={{flexDirection:'row', marginLeft: widthToDp("3%")}}>
                                        <Text style={{width:widthToDp("20%")}}>{this.state.numberGoats}</Text>
                                        <Text style={{width:widthToDp("40%")}}>{this.state.immunisation}</Text>
                                        <View style={{width: widthToDp('13%'), flexDirection: 'row', justifyContent: 'space-between'}}>
                                            <Text>₹ </Text> 
                                            <Text>{this.state.expenseForSupplementary}</Text>
                                        </View>
                                    </View>

                                    <View style={{flexDirection:'row', marginLeft: widthToDp("3%"), marginTop: heightToDp("2%")}}>
                                        <Text style={{width:widthToDp("30%")}}>{this.state.total} =</Text>
                                        <Text style={{width:widthToDp("30%")}}></Text>
                                        <View style={{width: widthToDp('13%'), flexDirection: 'row', justifyContent: 'space-between'}}>
                                            <Text>₹ </Text> 
                                            <Text>{this.state.b}</Text>
                                        </View>
                                    </View>
                                </View>


                                <View style={{ marginLeft: widthToDp("3%"), marginTop: heightToDp("2%"), marginBottom: widthToDp('5%') }}>
                                    <Text>{this.state.netProfitLabel} = ₹ {this.state.totalProfitFromNgoats}</Text>
                                </View>
                                <View style={{margin: widthToDp('3%')}}>
                                    <Text>{this.state.noteLabel}</Text>
                                </View>
                            </ScrollView>

                        </View>
                    </View>
                    <View style={{ marginTop: heightToDp("10%") }}></View>
                </ScrollView>
                <View style={{ flexDirection: 'row', height: heightToDp("10%"), alignSelf: 'center' }}>
                    <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                        <View style={{ backgroundColor: "#fff", height: heightToDp("6%"), width: widthToDp("30%"), borderRadius: 100, alignSelf: 'center', marginTop: heightToDp("2%") }}>
                            <Text style={{ fontSize: widthToDp("4%"), color: "#000", marginTop: heightToDp("1.3%"), alignSelf: 'center', fontFamily: 'Oswald-Medium' }}>{this.state.backButtonText}</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { this.saveButton() }}>
                        <View style={{ backgroundColor: "#fff", height: heightToDp("6%"), width: widthToDp("30%"), borderRadius: 100, marginLeft: widthToDp("1%"), marginTop: heightToDp("2%") }}>
                            <Text style={{ fontSize: widthToDp("4%"), color: "#000", marginTop: heightToDp("1.3%"), alignSelf: 'center', fontFamily: 'Oswald-Medium' }}>{this.state.calculateButtonText}</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { this.next() }}>
                        <View style={{ backgroundColor: "#fff", height: heightToDp("6%"), width: widthToDp("30%"), borderRadius: 100, marginLeft: widthToDp("1%"), marginTop: heightToDp("2%") }}>
                            <Text style={{ fontSize: widthToDp("4%"), color: "#000", marginTop: heightToDp("1.3%"), alignSelf: 'center', fontFamily: 'Oswald-Medium' }}>{this.state.exitButtonText}</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}