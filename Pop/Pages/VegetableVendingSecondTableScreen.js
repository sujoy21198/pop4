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


const tableHeading = [
    { 'name': 'Items', 'items': '2 to 3 Sessional vegetable', 'unit': '40Kg', 'unitPrice': '30', 'totalPrice': '1200' },
    { 'name': 'Unit', 'items': 'Spices', 'unit': '2Kg', 'unitPrice': '80', 'totalPrice': '160' },
    { 'name': 'Unit Price (₹)', 'items': 'Miscellaneous', 'unit': 'LS', 'totalPrice': '100' },
    { 'name': 'Total Price (₹)' },
]

const tableHeading2 = [
    { 'name': 'Items', 'items': 'Sessional vegetable', 'unit': '2', 'unitPrice': '₹ 500 perKG', 'totalPrice': '1000' },
    { 'name': 'Unit (Kgs)', 'items': 'Spices', 'unit': '2', 'unitPrice': '₹ 500 perKG', 'totalPrice': '1000' },
    { 'name': 'Selling Price (₹)' },
    { 'name': 'Total Selling price (₹, keeping 20% margin)' },
]

export default class DryFishSellingSecondTableScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            tableHeading: [],
            value: '',
            sessionalVegInput: '40',
            spicesInput: '2',
            sessionalVegTotal: '1200',
            spicesTotal: '160',
            expenditurePerDayA: '1460',
            sessionalVegProfitUnit: '40',
            sessionalVegProfitUnitPrice: '36',
            spicesProfitUnit: '2',
            spicesProfitUnitPrice: '86',
            perDaySellingValue: '1612',
            sessionalVegSellingPrice: '1440',
            spicesVegSellingPrice: '172',
            profit: '152',
            profit15: '2280',
            textLanguageChange: '',
            smallBusinessLabel: '',
            languages: [],
            backButtontext: '',
            saveButtonText: '',
            exitButtonText: '',
            quantityLabel: '',
            unitCostLabel: '',
            totalCostLabel: '',
            itemLabel: '',
            oneTimeExpenditureLabel: '',
            expVegUnitPrice: '30',
            expSpiceUnitPrice: '80',
            sessionalVeg: '',
            spices: '',
            misc: '',
            expenditurePerDayALabel: '',
            sellingPrice: '',
            totalSellingPrice: '',
            perDaySellingValueB: '',
            profitPerDay: '',
            sellingPerMonth: '',
            headerLabel: '',
            lossLabel: '',
            netProfitPerMonthLabel: '',
            lossPercentage: 103,
            netProfitPerMonth: '2177'
        }
        this.state.tableHeading = tableHeading
        this.state.languages = Languages
        //this.state.value = this.props.route.params.value
        //alert(this.state.value)
    }
    componentDidMount() {
        this.getVaccinesFromOffline()
        this.setLanguageOnMount()
        this.loadlabelsFromStorage()

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
            this.loadlabelsFromStorage()
            AsyncStorage.setItem('language', 'hi')
            this.props.navigation.reset({
                index: 0,
                routes: [{ name: "DashBoardScreen" }]
            });
        } else if (data === 'ho') {
            this.setState({ textLanguageChange: '2' })
            this.loadlabelsFromStorage()
            AsyncStorage.setItem('language', 'ho')
            this.props.navigation.reset({
                index: 0,
                routes: [{ name: "DashBoardScreen" }]
            });
        } else if (data === 'od') {
            this.setState({ textLanguageChange: '3' })
            this.loadlabelsFromStorage()
            AsyncStorage.setItem('language', 'od')
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
            var backButtontext = specificObject.labels.find((i) => i.type === 64)
            var saveButtonText = specificObject.labels.find((i) => i.type === 192)
            var exitButtonText = specificObject.labels.find((i) => i.type === 63)
            var oneTimeExpenditureLabel = specificObject.labels.find((i) => i.type === 101)
            var quantityLabel = specificObject.labels.find((i) => i.type === 79)
            var itemLabel = specificObject.labels.find((i) => i.type === 88)
            var unitCostLabel = specificObject.labels.find((i) => i.type === 92)
            var totalCostLabel = specificObject.labels.find((i) => i.type === 93)
            var sessionalVeg = specificObject.labels.find((i) => i.type === 167)
            var spices = specificObject.labels.find((i) => i.type === 168)
            var misc = specificObject.labels.find((i) => i.type === 169)
            var expenditurePerDayALabel = specificObject.labels.find((i) => i.type === 104)
            var sellingPrice = specificObject.labels.find((i) => i.type === 102)
            var totalSellingPrice = specificObject.labels.find((i) => i.type === 103)
            var profitPerDay = specificObject.labels.find((i) => i.type === 169)
            var perDaySellingValueB = specificObject.labels.find((i) => i.type === 105)
            var sellingPerMonth = specificObject.labels.find((i) => i.type === 106)
            var headerLabel = specificObject.labels.find((i) => i.type === 163)
            var lossLabel = specificObject.labels.find((i) => i.type === 211)
            var netProfitPerMonthLabel = specificObject.labels.find((i) => i.type === 185)
            // var message = specificObject.labels.find((i) => i.type === 26)
            // var generalSettings = specificObject.labels.find((i) => i.type === 27)
            // var pension = specificObject.labels.find((i) => i.type === 51)
            // var others = specificObject.labels.find((i) => i.type === 52)
            if (this.state.textLanguageChange === '0') {
                this.setState({ backButtontext: backButtontext.nameEnglish })
                this.setState({ saveButtonText: saveButtonText.nameEnglish })
                this.setState({ exitButtonText: exitButtonText.nameEnglish })
                this.setState({ oneTimeExpenditureLabel: oneTimeExpenditureLabel.nameEnglish })
                this.setState({quantityLabel : quantityLabel.nameEnglish})
                this.setState({itemLabel : itemLabel.nameEnglish})
                this.setState({unitCostLabel : unitCostLabel.nameEnglish})
                this.setState({totalCostLabel : totalCostLabel.nameEnglish})
                this.setState({sessionalVeg : sessionalVeg.nameEnglish})
                this.setState({spices : spices.nameEnglish})
                this.setState({misc : misc.nameEnglish})
                this.setState({expenditurePerDayALabel : expenditurePerDayALabel.nameEnglish})
                this.setState({sellingPrice : sellingPrice.nameEnglish})
                this.setState({totalSellingPrice : totalSellingPrice.nameEnglish})
                this.setState({profitPerDay : profitPerDay.nameEnglish})
                this.setState({perDaySellingValueB : perDaySellingValueB.nameEnglish})
                this.setState({sellingPerMonth : sellingPerMonth.nameEnglish})
                this.setState({headerLabel : headerLabel.nameEnglish})
                this.setState({lossLabel : lossLabel.nameEnglish})
                this.setState({netProfitPerMonthLabel : netProfitPerMonthLabel.nameEnglish})
                // this.state.data[4].name = message.nameEnglish
                // this.state.data[5].name = generalSettings.nameEnglish
                // this.state.data[6].name = pension.nameEnglish
                // this.state.data[7].name = others.nameEnglish
                // this.setState({ moneyManagerLabel: moneyManagerLabel.nameEnglish })
                // this.setState({ expenseLabel: expenseLabel.nameEnglish })
                // this.setState({ incomeLabel: incomeLabel.nameEnglish })
                // this.setState({ allTransactionLabel: allTransactionLabel.nameEnglish })
            } else if (this.state.textLanguageChange === '1') {
                this.setState({ backButtontext: backButtontext.nameHindi })
                this.setState({ saveButtonText: saveButtonText.nameHindi })
                this.setState({ exitButtonText: exitButtonText.nameHindi })
                this.setState({ oneTimeExpenditureLabel: oneTimeExpenditureLabel.nameHindi })
                this.setState({quantityLabel : quantityLabel.nameHindi})
                this.setState({itemLabel : itemLabel.nameHindi})
                this.setState({unitCostLabel : unitCostLabel.nameHindi})
                this.setState({totalCostLabel : totalCostLabel.nameHindi})
                this.setState({sessionalVeg : sessionalVeg.nameHindi})
                this.setState({spices : spices.nameHindi})
                this.setState({misc : misc.nameHindi})
                this.setState({expenditurePerDayALabel : expenditurePerDayALabel.nameHindi})
                this.setState({sellingPrice : sellingPrice.nameHindi})
                this.setState({totalSellingPrice : totalSellingPrice.nameHindi})
                this.setState({profitPerDay : profitPerDay.nameHindi})
                this.setState({perDaySellingValueB : perDaySellingValueB.nameHindi})
                this.setState({sellingPerMonth : sellingPerMonth.nameHindi})
                this.setState({headerLabel : headerLabel.nameHindi})
                this.setState({lossLabel : lossLabel.nameHindi})
                this.setState({netProfitPerMonthLabel : netProfitPerMonthLabel.nameHindi})
                // this.state.data[4].name = message.nameHindi
                // this.state.data[5].name = generalSettings.nameHindi
                // this.state.data[6].name = pension.nameHindi
                // this.state.data[7].name = others.nameHindi
            } else if (this.state.textLanguageChange === '2') {
                this.setState({ backButtontext: backButtontext.nameHo })
                this.setState({ saveButtonText: saveButtonText.nameHo })
                this.setState({ exitButtonText: exitButtonText.nameHo })
                this.setState({ oneTimeExpenditureLabel: oneTimeExpenditureLabel.nameHo })
                this.setState({quantityLabel : quantityLabel.nameHo})
                this.setState({itemLabel : itemLabel.nameHo})
                this.setState({unitCostLabel : unitCostLabel.nameHo})
                this.setState({totalCostLabel : totalCostLabel.nameHo})
                this.setState({sessionalVeg : sessionalVeg.nameHo})
                this.setState({spices : spices.nameHo})
                this.setState({misc : misc.nameHo})
                this.setState({expenditurePerDayALabel : expenditurePerDayALabel.nameHo})
                this.setState({sellingPrice : sellingPrice.nameHo})
                this.setState({totalSellingPrice : totalSellingPrice.nameHo})
                this.setState({profitPerDay : profitPerDay.nameHo})
                this.setState({perDaySellingValueB : perDaySellingValueB.nameHo})
                this.setState({sellingPerMonth : sellingPerMonth.nameHo})
                this.setState({headerLabel : headerLabel.nameHo})
                this.setState({lossLabel : lossLabel.nameHo})
                this.setState({netProfitPerMonthLabel : netProfitPerMonthLabel.nameHo})
                // this.state.data[4].name = message.nameHindi
                // this.state.data[4].name = message.nameHo
                // this.state.data[5].name = generalSettings.nameHo
                // this.state.data[6].name = pension.nameHo
                // this.state.data[7].name = others.nameHo
            } else if (this.state.textLanguageChange === '3') {
                this.setState({ backButtontext: backButtontext.nameOdia })
                this.setState({ saveButtonText: saveButtonText.nameOdia })
                this.setState({ exitButtonText: exitButtonText.nameOdia })
                this.setState({ oneTimeExpenditureLabel: oneTimeExpenditureLabel.nameOdia })
                this.setState({quantityLabel : quantityLabel.nameOdia})
                this.setState({itemLabel : itemLabel.nameOdia})
                this.setState({unitCostLabel : unitCostLabel.nameOdia})
                this.setState({totalCostLabel : totalCostLabel.nameOdia})
                this.setState({sessionalVeg : sessionalVeg.nameOdia})
                this.setState({spices : spices.nameOdia})
                this.setState({misc : misc.nameOdia})
                this.setState({expenditurePerDayALabel : expenditurePerDayALabel.nameOdia})
                this.setState({sellingPrice : sellingPrice.nameOdia})
                this.setState({totalSellingPrice : totalSellingPrice.nameOdia})
                this.setState({profitPerDay : profitPerDay.nameOdia})
                this.setState({perDaySellingValueB : perDaySellingValueB.nameOdia})
                this.setState({sellingPerMonth : sellingPerMonth.nameOdia})
                this.setState({headerLabel : headerLabel.nameOdia})
                this.setState({netProfitPerMonthLabel : netProfitPerMonthLabel.nameOdia})
                this.setState({lossLabel : lossLabel.nameOdia})
                // this.state.data[4].name = message.nameOdia
                // this.state.data[5].name = generalSettings.nameOdia
                // this.state.data[6].name = pension.nameOdia
                // this.state.data[7].name = others.nameOdia
            } else if (this.state.textLanguageChange === '4') {
                this.setState({ backButtontext: backButtontext.nameSanthali })
                this.setState({ saveButtonText: saveButtonText.nameSanthali })
                this.setState({ exitButtonText: exitButtonText.nameSanthali })
                this.setState({ oneTimeExpenditureLabel: oneTimeExpenditureLabel.nameSanthali })
                this.setState({quantityLabel : quantityLabel.nameSanthali})
                this.setState({itemLabel : itemLabel.nameSanthali})
                this.setState({unitCostLabel : unitCostLabel.nameSanthali})
                this.setState({totalCostLabel : totalCostLabel.nameSanthali})
                this.setState({sessionalVeg : sessionalVeg.nameSanthali})
                this.setState({spices : spices.nameSanthali})
                this.setState({misc : misc.nameSanthali})
                this.setState({expenditurePerDayALabel : expenditurePerDayALabel.nameSanthali})
                this.setState({sellingPrice : sellingPrice.nameSanthali})
                this.setState({totalSellingPrice : totalSellingPrice.nameSanthali})
                this.setState({profitPerDay : profitPerDay.nameSanthali})
                this.setState({perDaySellingValueB : perDaySellingValueB.nameSanthali})
                this.setState({sellingPerMonth : sellingPerMonth.nameSanthali})
                this.setState({headerLabel : headerLabel.nameSanthali})
                this.setState({netProfitPerMonthLabel : netProfitPerMonthLabel.nameSanthali})
                this.setState({lossLabel : lossLabel.nameSanthali})
                // this.state.data[4].name = message.nameSanthali
                // this.state.data[5].name = generalSettings.nameSanthali
                // this.state.data[6].name = pension.nameSanthali
                // this.state.data[7].name = others.nameSanthali
            }

        } catch (error) {
            alert(error)
        }
        //this.setState({ crops: specificObject.crops })
        //this.showData()
    }

    getVaccinesFromOffline = async () => {
        try {
            var vaccine = []
            let username = await AsyncStorage.getItem('username')
            let user = await AsyncStorage.getItem('offlineData');
            let parsed = JSON.parse(user);
            var specificObject = parsed[0]
            var livestockwisevaccine = specificObject.vaccination.filter((i) => i.type === this.state.value)
            vaccine = livestockwisevaccine
            this.setState({ vaccine: vaccine })
            //console.log(livestockwisevaccine)
        } catch (error) {
            alert(error)
        }
    }

    calculation = () => {
        //alert(this.state.sessionalVegInput)
        var sessionalVegTotal = this.state.sessionalVegInput * this.state.expVegUnitPrice
        var spicesTotal = this.state.spicesInput * this.state.expSpiceUnitPrice
        var expenditurePerDayA = sessionalVegTotal + spicesTotal + 100
        var sessionalVegSellingPrice = this.state.sessionalVegProfitUnit * this.state.sessionalVegProfitUnitPrice
        var spicesVegSellingPrice = this.state.spicesProfitUnit * this.state.spicesProfitUnitPrice

        var perdaysellingvaluetotal = sessionalVegSellingPrice + spicesVegSellingPrice
        var profit = perdaysellingvaluetotal - expenditurePerDayA
        var profit15 = profit * 15
        var netProfit = profit15 - this.state.lossPercentage;

        this.setState({ sessionalVegTotal: sessionalVegTotal })
        this.setState({ spicesTotal: spicesTotal })
        this.setState({ expenditurePerDayA: expenditurePerDayA })
        this.setState({ sessionalVegSellingPrice: sessionalVegSellingPrice })
        this.setState({ spicesVegSellingPrice: spicesVegSellingPrice })
        this.setState({ perDaySellingValue: perdaysellingvaluetotal })
        this.setState({ profit: profit })
        this.setState({ profit15: profit15 })
        this.setState({ netProfitPerMonth: netProfit })
        Toast.show({ text: "Calculated", duration: 3000, type: 'success' });

    }

    inputValue = (data) => {
        var numberofVaccines = []
        numberofVaccines.concat(data)
        console.log(numberofVaccines)
    }

    next = async () => {
        try {
            var date = new Date().getDate()
            var month = new Date().getMonth() + 1
            var year = new Date().getFullYear()
            const expenseObject = { 'type': 'expense', 'category': 'Vegetable vending', 'amount': this.state.expenditurePerDayA, 'date': date + "/" + month + "/" + year }
            const incomeObject = { 'type': 'income', 'category': 'Vegetable Vending', 'amount': this.state.perDaySellingValue, 'date': date + "/" + month + "/" + year }
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

    }
    render() {
        var tableHeading = []
        tableHeading = this.state.tableHeading
        var vaccine = []
        vaccine = this.state.vaccine
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
                <ScrollView>
                    <View style={{ backgroundColor: BaseColor.Red, height: heightToDp("120%"), alignSelf: 'center', width: widthToDp("90%"), borderRadius: 10, marginTop: heightToDp('1.5%') }}>
                        <Text style={{ color: "#fff", fontSize: widthToDp("5%"), marginLeft: widthToDp("5%"), marginTop: heightToDp("1%"), fontFamily: 'Oswald-Medium' }}>{this.state.headerLabel} </Text>
                        <View style={{ backgroundColor: "white", height: heightToDp("120%"), alignSelf: 'center', width: widthToDp("90%"), marginTop: heightToDp('2%'), borderBottomLeftRadius: 10, borderBottomRightRadius: 10 }}>
                            {/* <View style={{ flexDirection: 'row' }}>
                                <Text style={{ fontSize: widthToDp("5%"), marginLeft: widthToDp("5%"), marginTop: heightToDp("1.5%"), fontFamily: 'Oswald-Medium' }}>Income from </Text>
                                <Input
                                    keyboardType='number-pad'
                                    defaultValue={this.state.numberhens}
                                    onChangeText={(data) => this.calculation(data)}
                                    style={{ marginLeft: widthToDp("1%"), fontFamily: 'Oswald-Medium', width: widthToDp("10%"), marginTop: heightToDp("1%"), borderWidth: 1 }}
                                />
                                <Text style={{ fontSize: widthToDp("5%"), marginLeft: widthToDp("1%"), marginTop: heightToDp("1.5%"), fontFamily: 'Oswald-Medium', marginRight: widthToDp("20%") }}>hens</Text>
                            </View>
                            <View>
                                <Text>One desi hen gives 50 eggs in a year If a farmer keeps 4 hens, then he will get 200 eggs in a year.</Text>
                            </View> */}
                            <View style={{ borderWidth: 1, height: heightToDp("8%"), width: widthToDp("83%"), marginLeft: widthToDp("3%"), marginTop: heightToDp("1.5%"), flexDirection: 'row' }}>
                                {
                                    tableHeading.map((i, key) => {
                                        return (
                                            <View style={{ width: widthToDp(`${key === 0 ? 24 : key === 1 ? 14 : 19}%`), marginLeft: widthToDp("1.5%") }}>

                                                <Text style={{ marginTop: heightToDp("2%"), fontSize: widthToDp('3.3%') }}>{key===0 ? this.state.itemLabel : key===1 ? this.state.quantityLabel : key===2 ? this.state.unitCostLabel : this.state.totalCostLabel}</Text>

                                            </View>

                                        )
                                    })
                                }
                            </View>

                            <View style={{ borderWidth: 1, height: heightToDp("35%"), width: widthToDp("83%"), marginLeft: widthToDp("3%"), marginTop: heightToDp("0%") }}>
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
                                    <View style={{ width: widthToDp("23%"), marginLeft: widthToDp("1.5%") }}>
                                        {/* <Text style={{ marginTop: heightToDp("2%") }}>Eggs</Text>
                                        <Text style={{ marginTop: heightToDp("5%") }}>Adult Bird</Text> */}
                                        {
                                            tableHeading.map((i, key) => {
                                                return (
                                                    <Text style={{ marginTop: heightToDp(`${this.state.textLanguageChange==="1" ? 4.5 : this.state.textLanguageChange==="3" ? 4.75 : this.state.textLanguageChange==="0" ? 3.75 : 5}%`), fontSize: widthToDp('3.3%') }}>{i.items? (key===0 ? this.state.sessionalVeg : key===1 ? this.state.spices : key===2 ? this.state.misc : "") : ""}</Text>
                                                )
                                            })
                                        }
                                    </View>

                                    {/* <View style={{ width: widthToDp("17%"), marginLeft: widthToDp("1.5%") }}>
                                        <Text style={{ marginTop: heightToDp("2%") }}>16 months old</Text>
                                        <Text style={{ marginTop: heightToDp("2%") }}>8 months old</Text>
                                        <Text style={{ marginTop: heightToDp("2%") }}>kids</Text>
                                    </View> */}
                                    <View style={{ width: widthToDp("14%"), marginLeft: widthToDp("6%"), height: heightToDp("30%") }}>
                                        <View style={{ width: widthToDp("10%"), height: heightToDp("5%"), marginTop: heightToDp("3.5%"), flexDirection: 'row' }}>
                                            <Input
                                                style={{ borderBottomWidth: 1, borderColor: 'blue', fontSize: widthToDp('3.3%') }}
                                                placeholder="40"
                                                onChangeText={(data) => this.setState({ sessionalVegInput: data })}
                                                keyboardType="number-pad"
                                            />
                                        </View>

                                        <View style={{ width: widthToDp("10%"), height: heightToDp("5%"), marginTop: heightToDp("3.5%"), flexDirection: 'row' }}>
                                            <Input
                                                style={{ borderBottomWidth: 1, borderColor: 'blue', fontSize: widthToDp('3.3%') }}
                                                placeholder="2"
                                                onChangeText={(data) => this.setState({ spicesInput: data })}
                                                keyboardType="number-pad"
                                            />
                                        </View>

                                        <View style={{ width: widthToDp("10%"), height: heightToDp("5%"), marginTop: heightToDp("3.5%"), flexDirection: 'row' }}>
                                            <Text style={{ fontSize: widthToDp('3.3%') }}>LS</Text>
                                        </View>
                                    </View>
                                    <View style={{ width: widthToDp("14%"), marginLeft: widthToDp("0%") }}>
                                        {/* <Text style={{ marginTop: heightToDp("2%") }}>₹ 5.00 per piece</Text>
                                        <Text style={{ marginTop: heightToDp("2%") }}>₹ 300 per bird</Text> */}
                                        {/* {
                                            tableHeading.map((i, key) => {
                                                if(i.unitPrice) {
                                                    return (
                                                        <View style={{marginTop: heightToDp(`${key===0 ? 5.2 : 6.3}%`), width: widthToDp("12%"), flexDirection: 'row', justifyContent: 'space-between'}}>
                                                            {i.unitPrice && <Text style={{ fontSize: widthToDp('3.3%') }}>₹ </Text>}
                                                            <Text style={{ fontSize: widthToDp('3.3%') }}>{i.items ? i.unitPrice : "-"}ko</Text>
                                                        </View>
                                                    )
                                                }                                                
                                            })
                                        } */}
                                        <View style={{ width: widthToDp("10%"), height: heightToDp("5%"), marginTop: heightToDp("3.5%"), flexDirection: 'row' }}>
                                            <Input
                                                style={{ borderBottomWidth: 1, borderColor: 'blue', fontSize: widthToDp('3.3%') }}
                                                placeholder="30"
                                                onChangeText={(data) => this.setState({ expVegUnitPrice: data })}
                                                keyboardType="number-pad"
                                            />
                                        </View>

                                        <View style={{ width: widthToDp("10%"), height: heightToDp("5%"), marginTop: heightToDp("3.5%"), flexDirection: 'row' }}>
                                            <Input
                                                style={{ borderBottomWidth: 1, borderColor: 'blue', fontSize: widthToDp('3.3%') }}
                                                placeholder="80"
                                                onChangeText={(data) => this.setState({ expSpiceUnitPrice: data })}
                                                keyboardType="number-pad"
                                            />
                                        </View>

                                    </View>
                                    <View style={{ width: widthToDp("14%"), marginLeft: widthToDp("5%") }}>
                                        <View style={{ marginTop: heightToDp('5.2%'), width: widthToDp("12%"), flexDirection: 'row', justifyContent: 'space-between' }}>
                                            <Text style={{ fontSize: widthToDp('3.3%') }}>₹ </Text>
                                            <Text style={{ fontSize: widthToDp('3.3%') }}>{this.state.sessionalVegTotal}</Text>
                                        </View>
                                        <View style={{ marginTop: heightToDp('6.2%'), width: widthToDp("12%"), flexDirection: 'row', justifyContent: 'space-between' }}>
                                            <Text style={{ fontSize: widthToDp('3.3%') }}>₹ </Text>
                                            <Text style={{ fontSize: widthToDp('3.3%') }}>{this.state.spicesTotal}</Text>
                                        </View>
                                        <View style={{ marginTop: heightToDp('4%'), width: widthToDp("12%"), flexDirection: 'row', justifyContent: 'space-between' }}>
                                            <Text style={{ fontSize: widthToDp('3.3%') }}>₹ </Text>
                                            <Text style={{ fontSize: widthToDp('3.3%') }}>100</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                            <View style={{ borderWidth: 1, height: heightToDp("8%"), width: widthToDp("83%"), marginLeft: widthToDp("3%"), marginTop: heightToDp("0%"), flexDirection: 'row' }}>
                                <View style={{ marginLeft: widthToDp('1%') }}>
                                    <Text style={{ fontSize: widthToDp('3.3%') }}>{this.state.expenditurePerDayALabel}</Text>
                                </View>
                                <View style={{ width: widthToDp("13%"), marginLeft: widthToDp(`${(this.state.textLanguageChange==="3" || this.state.textLanguageChange==="1") ? 30 : 22}%`), flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <Text style={{ fontSize: widthToDp('3.3%') }}>₹ </Text>
                                    <Text style={{ fontSize: widthToDp('3.3%') }}>{this.state.expenditurePerDayA}</Text>
                                </View>

                            </View>

                            <View style={{
                                borderTopWidth: 1,
                                borderLeftWidth: 1,
                                borderRightWidth: 1,
                                borderBottomWidth: 1.3,
                                paddingVertical: heightToDp("2%"),
                                width: widthToDp("83%"),
                                marginLeft: widthToDp("3%"),
                                marginTop: heightToDp("1.5%"),
                                flexDirection: 'row'
                            }}>
                                {
                                    tableHeading2.map((i, key) => {
                                        return (
                                            <View style={{ width: widthToDp("19%"), marginLeft: widthToDp("1%") }}>

                                                <Text style={{ marginTop: heightToDp("2%"), fontSize: widthToDp('3.3%') }}>{key===0 ? this.state.itemLabel : key===1 ? this.state.quantityLabel : key===2 ? this.state.sellingPrice : this.state.totalSellingPrice}</Text>

                                            </View>

                                        )
                                    })
                                }
                            </View>

                            <View style={{ borderWidth: 1, height: heightToDp("20%"), width: widthToDp("83%"), marginLeft: widthToDp("3%"), marginTop: heightToDp("0%") }}>
                                <View style={{ flexDirection: 'row' }}>
                                    <View style={{ width: widthToDp("20%"), marginLeft: widthToDp("1.5%") }}>
                                        {/* <Text style={{ marginTop: heightToDp("2%") }}>Eggs</Text>
                                        <Text style={{ marginTop: heightToDp("5%") }}>Adult Bird</Text> */}
                                        {
                                            tableHeading2.map((i, key) => {
                                                return (
                                                    <Text style={{ marginTop: heightToDp(`${key === 0 ? (this.state.textLanguageChange==="1" ? 2 : 1) : (this.state.textLanguageChange==="1" ? 6 : 5)}%`), fontSize: widthToDp('3.3%') }}>{i.items ? (key===0 ? this.state.sessionalVeg : this.state.spices) : ""}</Text>
                                                )
                                            })
                                        }
                                    </View>

                                    {/* <View style={{ width: widthToDp("17%"), marginLeft: widthToDp("1.5%") }}>
                                        <Text style={{ marginTop: heightToDp("2%") }}>16 months old</Text>
                                        <Text style={{ marginTop: heightToDp("2%") }}>8 months old</Text>
                                        <Text style={{ marginTop: heightToDp("2%") }}>kids</Text>
                                    </View> */}
                                    <View style={{ width: widthToDp("18%"), marginLeft: widthToDp("4%"), height: heightToDp("30%") }}>
                                        {/* <Text style={{ marginTop: heightToDp("2%") }}>{this.state.eggQuantity}</Text>
                                        <Text style={{ marginTop: heightToDp("5%") }}>{this.state.birdQuantity}</Text> */}
                                        <View style={{ height: heightToDp("6%"), marginTop: heightToDp("1%") }}>
                                            {/* <Text style={{ marginBottom: heightToDp("1.5%") }}>{i.noOfTime}</Text> */}
                                            <Input
                                                style={{ borderBottomWidth: 1, borderColor: 'blue', fontSize: widthToDp('3.3%') }}
                                                placeholder={"40"}
                                                onChangeText={(data) => this.setState({ sessionalVegProfitUnit: data })}
                                                keyboardType="number-pad"
                                            />
                                        </View>

                                        <View style={{ height: heightToDp("6%"), marginTop: heightToDp("3%") }}>
                                            {/* <Text style={{ marginBottom: heightToDp("1.5%") }}>{i.noOfTime}</Text> */}
                                            <Input
                                                style={{ borderBottomWidth: 1, borderColor: 'blue' }}
                                                placeholder={"2"}
                                                onChangeText={(data) => this.setState({ spicesProfitUnit: data })}
                                                keyboardType="number-pad"
                                            />
                                        </View>

                                    </View>
                                    <View style={{ width: widthToDp("14%"), marginLeft: widthToDp("1.5%") }}>
                                        {/* <Text style={{ marginTop: heightToDp("2%") }}>₹ 5.00 per piece</Text>
                                        <Text style={{ marginTop: heightToDp("2%") }}>₹ 300 per bird</Text> */}
                                        <View style={{ height: heightToDp("6%"), marginTop: heightToDp("1%") }}>
                                            {/* <Text style={{ marginBottom: heightToDp("1.5%") }}>{i.noOfTime}</Text> */}
                                            <Input
                                                style={{ borderBottomWidth: 1, borderColor: 'blue' }}
                                                placeholder={"36"}
                                                onChangeText={(data) => this.setState({ sessionalVegProfitUnitPrice: data })}
                                                keyboardType="number-pad"
                                            />
                                        </View>

                                        <View style={{ height: heightToDp("6%"), marginTop: heightToDp("3%") }}>
                                            {/* <Text style={{ marginBottom: heightToDp("1.5%") }}>{i.noOfTime}</Text> */}
                                            <Input
                                                style={{ borderBottomWidth: 1, borderColor: 'blue' }}
                                                placeholder={"86"}
                                                onChangeText={(data) => this.setState({ spicesProfitUnitPrice: data })}
                                                keyboardType="number-pad"
                                            />
                                        </View>

                                    </View>
                                    <View style={{ width: widthToDp("14%"), marginLeft: widthToDp("5%") }}>
                                        <View style={{ marginTop: heightToDp("3%"), width: widthToDp("12%"), flexDirection: 'row', justifyContent: 'space-between' }}>
                                            <Text style={{ fontSize: widthToDp('3.3%') }}>₹ </Text>
                                            <Text style={{ fontSize: widthToDp('3.3%') }}>{this.state.sessionalVegSellingPrice}</Text>
                                        </View>
                                        <View style={{ marginTop: heightToDp("6.5%"), width: widthToDp("12%"), flexDirection: 'row', justifyContent: 'space-between' }}>
                                            <Text style={{ fontSize: widthToDp('3.3%') }}>₹ </Text>
                                            <Text style={{ fontSize: widthToDp('3.3%') }}>{this.state.spicesVegSellingPrice}</Text>
                                        </View>
                                        {/* {
                                            tableHeading.map((i) => {
                                                return (
                                                    <Text style={{ marginTop: heightToDp("4%") }}>{i.totalPrice}</Text>
                                                )
                                            })
                                        } */}

                                    </View>

                                </View>
                            </View>
                            <View style={{ borderWidth: 1, height: heightToDp("4%"), width: widthToDp("83%"), marginLeft: widthToDp("3%"), marginTop: heightToDp("0%"), flexDirection: 'row' }}>
                                <Text style={{
                                    marginLeft: widthToDp('1%'),
                                    fontSize: widthToDp('3.3%')
                                }}>{this.state.perDaySellingValueB}</Text>
                                <View style={{ marginLeft: heightToDp(`${(this.state.textLanguageChange==="3" || this.state.textLanguageChange==="1") ? 16 : 13}%`), width: widthToDp("12%"), flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <Text style={{ fontSize: widthToDp('3.3%') }}>₹ </Text>
                                    <Text style={{ fontSize: widthToDp('3.3%') }}>{this.state.perDaySellingValue}</Text>
                                </View>
                            </View>
                            <View style={{ borderWidth: 1, height: heightToDp("4%"), width: widthToDp("83%"), marginLeft: widthToDp("3%"), marginTop: heightToDp("0%"), flexDirection: 'row' }}>
                                <Text style={{
                                    marginLeft: widthToDp('1%'),
                                    fontSize: widthToDp('3.3%')
                                }}>{this.state.profitPerDay}</Text>
                                <View style={{ marginLeft: heightToDp(`${this.state.textLanguageChange==="3" ? 26.4 : this.state.textLanguageChange==="1" ? 23 : 18}%`), width: widthToDp("12%"), flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <Text style={{ fontSize: widthToDp('3.3%') }}>₹ </Text>
                                    <Text style={{ fontSize: widthToDp('3.3%') }}>{this.state.profit}</Text>
                                </View>
                            </View>
                            <View style={{ borderWidth: 1, height: heightToDp("6%"), width: widthToDp("83%"), marginLeft: widthToDp("3%"), marginTop: heightToDp("0%"), flexDirection: 'row' }}>
                                <Text style={{
                                    marginLeft: widthToDp('1%'),
                                    fontSize: widthToDp('3.3%')
                                }}>{this.state.sellingPerMonth} = ₹ {this.state.profit}*15=  ₹ {this.state.profit15}</Text>
                            </View>
                            
                            
                            <View style={{ borderWidth: 1, height: heightToDp("8%"), width: widthToDp("83%"), marginLeft: widthToDp("3%"), marginTop: heightToDp("0%"), flexDirection: 'row' }}>
                                <View style={{ width: widthToDp("60%"), marginLeft: widthToDp('1%') }}>
                                    <Text style={{fontSize: widthToDp('3%')}}>{this.state.lossLabel}</Text>
                                </View>
                                <View style={{ width: widthToDp("17%"),height:heightToDp("5%"),marginTop:heightToDp("0%") }}>
                                    <Input
                                        style={{ borderBottomWidth: 1, borderColor: 'blue', fontSize: widthToDp('3.3%') }}
                                        onChangeText={(data) => this.setState({ lossPercentage: data })}
                                        defaultValue={"103"}
                                        keyboardType="number-pad"
                                    />
                                </View>
                            </View>

                            <View style={{ borderWidth: 1, height: heightToDp("5%"), width: widthToDp("83%"), marginLeft: widthToDp("3%"), marginTop: heightToDp("0%"), flexDirection: 'row' }}>
                                <View style={{ width: widthToDp("60%"), marginLeft: widthToDp('1%') }}>
                                    <Text style={{fontSize: widthToDp('3%')}}>{this.state.netProfitPerMonthLabel}</Text>
                                </View>
                                
                                <View style={{width: widthToDp("14%"), height:heightToDp("5%"), flexDirection: 'row', justifyContent: 'space-between'}}>
                                    <Text style={{ fontSize: widthToDp('3%') }}>₹ </Text>
                                    <Text style={{ fontSize: widthToDp('3%') }}>{this.state.netProfitPerMonth}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={{ marginTop: heightToDp("15%") }}></View>
                </ScrollView>
                <View style={{ flexDirection: 'row', height: heightToDp("10%"), alignSelf: 'center' }}>
                    <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                        <View style={{ backgroundColor: "#fff", height: heightToDp("6%"), width: widthToDp("30%"), borderRadius: 100, alignSelf: 'center', marginTop: heightToDp("2%") }}>
                            <Text style={{ fontSize: widthToDp("4%"), color: "#000", marginTop: heightToDp("1.3%"), alignSelf: 'center', fontFamily: 'Oswald-Medium' }}>{this.state.backButtontext}</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { this.calculation() }}>
                        <View style={{ backgroundColor: "#fff", height: heightToDp("6%"), width: widthToDp("30%"), borderRadius: 100, marginLeft: widthToDp("1%"), marginTop: heightToDp("2%") }}>
                            <Text style={{ fontSize: widthToDp("4%"), color: "#000", marginTop: heightToDp("1.3%"), alignSelf: 'center', fontFamily: 'Oswald-Medium' }}>{this.state.saveButtonText}</Text>
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