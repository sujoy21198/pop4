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
    { 'name': 'Items', 'birth': '1st Birth', 'age': '16 months old', 'numbers': '1', 'unitPrice': '4000', 'totalPriceInRupees': '5000' },
    { 'name': 'Qnty', 'birth': '2nd Birth', 'age': '8 months old', 'numbers': '1', 'unitPrice': '4000', 'totalPriceInRupees': '5000' },
    { 'name': 'Unit Cost (₹)', 'birth': '3rd Birth', 'age': 'kid', 'numbers': '1', 'unitPrice': '4000', 'totalPriceInRupees': '5000' },
    { 'name': 'Total Cost (₹)' },
]

const tableHeading2 = [
    { 'name': 'Items', 'unitCost': '2500' },
    { 'name': 'Feed', 'unitCost': '2500' },
    { 'name': 'Deworming and vaccination', 'unitCost': '1500' }
]

export default class PultryTableScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            numberhens: '1',
            tableHeading: [],
            totalPriceEggs: '150',
            totalPriceAdultBrids: '2400',
            eggQuantity: '30',
            birdQuantity: '8',
            total: '2550',
            netProfit: '2300',
            feed: '125',
            vaccination: '125',
            totalB: '250',
            languages:[],
            backButtonText: '',
            calculateButtonText: '',
            exitButtonText: '',
            incomeHeaderLabel: '',
            incomeHenDesc: '',
            itemLabel: '',
            quantityLabel: '',
            unitCostLabel: '',
            totalCostLabel: '',
            totalALabel: '',
            totalBLabel: '',
            totalExpenditureLabel: '',
            netProfitLabel: '',
            noteLabel: '',
            eggText: '',
            adultBirdText: '',
            feedText: '',
            dewormingVaccination: '',
            incomeFrom: '',
            hens: '',
            birdText: '',
            pieceText: '',
            isLoading: true 
        }
        this.state.tableHeading = tableHeading
        this.state.languages = Languages
    }
    componentDidMount() {
        this.getVaccinesFromOffline()
        this.setLanguageOnMount()
        this.setState({isLoading: false})
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
            var incomeHeaderLabel = specificObject.labels.find((i) => i.type === 94)
            var incomeHenDesc = specificObject.labels.find((i) => i.type === 113)
            var quantityLabel = specificObject.labels.find((i) => i.type === 79)
            var itemLabel = specificObject.labels.find((i) => i.type === 88)
            var unitCostLabel = specificObject.labels.find((i) => i.type === 92)
            var totalCostLabel = specificObject.labels.find((i) => i.type === 93)
            var totalExpenditureLabel = specificObject.labels.find((i) => i.type === 116)
            var totalALabel = specificObject.labels.find((i) => i.type === 118)
            var totalBLabel = specificObject.labels.find((i) => i.type === 119)
            var backButtonText = specificObject.labels.find((i) => i.type === 64)
            var calculateButtonText = specificObject.labels.find((i) => i.type === 192)
            var exitButtonText = specificObject.labels.find((i) => i.type === 63)
            var netProfitLabel = specificObject.labels.find((i) => i.type === 122)
            var noteLabel = specificObject.labels.find((i) => i.type === 123)
            var eggText = specificObject.labels.find((i) => i.type === 114)
            var adultBirdText = specificObject.labels.find((i) => i.type === 115)
            var feedText = specificObject.labels.find((i) => i.type === 117)
            var dewormingVaccination = specificObject.labels.find((i) => i.type === 121)
            var incomeFrom = specificObject.labels.find((i) => i.type === 95)
            var hens = specificObject.labels.find((i) => i.type === 96)
            var birdText = specificObject.labels.find((i) => i.type === 191)
            var pieceText = specificObject.labels.find((i) => i.type === 193)
            // var message = specificObject.labels.find((i) => i.type === 26)
            // var generalSettings = specificObject.labels.find((i) => i.type === 27)
            // var pension = specificObject.labels.find((i) => i.type === 51)
            // var others = specificObject.labels.find((i) => i.type === 52)
            if (this.state.textLanguageChange === '0') {
                this.setState({ incomeHeaderLabel: incomeHeaderLabel.nameEnglish })
                this.setState({ quantityLabel: quantityLabel.nameEnglish })
                this.setState({ itemLabel: itemLabel.nameEnglish })
                this.setState({ incomeHenDesc: incomeHenDesc.nameEnglish })
                this.setState({ totalALabel: totalALabel.nameEnglish })
                this.setState({ totalBLabel: totalBLabel.nameEnglish })
                this.setState({ unitCostLabel: unitCostLabel.nameEnglish })
                this.setState({ totalCostLabel: totalCostLabel.nameEnglish })
                this.setState({ backButtonText: backButtonText.nameEnglish })
                this.setState({ calculateButtonText: calculateButtonText.nameEnglish })
                this.setState({ exitButtonText: exitButtonText.nameEnglish })
                this.setState({ totalExpenditureLabel: totalExpenditureLabel.nameEnglish })
                this.setState({ netProfitLabel: netProfitLabel.nameEnglish })
                this.setState({ noteLabel: noteLabel.nameEnglish })
                this.setState({ eggText: eggText.nameEnglish })
                this.setState({ adultBirdText: adultBirdText.nameEnglish })
                this.setState({ feedText: feedText.nameEnglish })
                this.setState({ dewormingVaccination: dewormingVaccination.nameEnglish })
                this.setState({ incomeFrom: incomeFrom.nameEnglish })
                this.setState({ hens: hens.nameEnglish })
                this.setState({ birdText: birdText.nameEnglish })
                this.setState({ pieceText: pieceText.nameEnglish })
            } else if (this.state.textLanguageChange === '1') {
                this.setState({ incomeHeaderLabel: incomeHeaderLabel.nameHindi })
                this.setState({ quantityLabel: quantityLabel.nameHindi })
                this.setState({ itemLabel: itemLabel.nameHindi })
                this.setState({ incomeHenDesc: incomeHenDesc.nameHindi })
                this.setState({ totalALabel: totalALabel.nameHindi })
                this.setState({ totalBLabel: totalBLabel.nameHindi })
                this.setState({ unitCostLabel: unitCostLabel.nameHindi })
                this.setState({ totalCostLabel: totalCostLabel.nameHindi })
                this.setState({ backButtonText: backButtonText.nameHindi })
                this.setState({ calculateButtonText: calculateButtonText.nameHindi })
                this.setState({ exitButtonText: exitButtonText.nameHindi })
                this.setState({ totalExpenditureLabel: totalExpenditureLabel.nameHindi })
                this.setState({ netProfitLabel: netProfitLabel.nameHindi })
                this.setState({ noteLabel: noteLabel.nameHindi })
                this.setState({ eggText: eggText.nameHindi })
                this.setState({ adultBirdText: adultBirdText.nameHindi })
                this.setState({ feedText: feedText.nameHindi })
                this.setState({ dewormingVaccination: dewormingVaccination.nameHindi })
                this.setState({ incomeFrom: incomeFrom.nameHindi })
                this.setState({ hens: hens.nameHindi })
                this.setState({ birdText: birdText.nameHindi })
                this.setState({ pieceText: pieceText.nameHindi })
            } else if (this.state.textLanguageChange === '2') {
                this.setState({ incomeHeaderLabel: incomeHeaderLabel.nameHo })
                this.setState({ quantityLabel: quantityLabel.nameHo })
                this.setState({ itemLabel: itemLabel.nameHo })
                this.setState({ incomeHenDesc: incomeHenDesc.nameHo })
                this.setState({ totalALabel: totalALabel.nameHo })
                this.setState({ totalBLabel: totalBLabel.nameHo })
                this.setState({ unitCostLabel: unitCostLabel.nameHo })
                this.setState({ totalCostLabel: totalCostLabel.nameHo })
                this.setState({ backButtonText: backButtonText.nameHo })
                this.setState({ calculateButtonText: calculateButtonText.nameHo })
                this.setState({ exitButtonText: exitButtonText.nameHo })
                this.setState({ totalExpenditureLabel: totalExpenditureLabel.nameHo })
                this.setState({ netProfitLabel: netProfitLabel.nameHo })
                this.setState({ noteLabel: noteLabel.nameHo })
                this.setState({ eggText: eggText.nameHo })
                this.setState({ adultBirdText: adultBirdText.nameHo })
                this.setState({ feedText: feedText.nameHo })
                this.setState({ dewormingVaccination: dewormingVaccination.nameHo })
                this.setState({ incomeFrom: incomeFrom.nameHo })
                this.setState({ hens: hens.nameHo })
                this.setState({ birdText: birdText.nameHo })
                this.setState({ pieceText: pieceText.nameHo })
            } else if (this.state.textLanguageChange === '3') {
                this.setState({ incomeHeaderLabel: incomeHeaderLabel.nameOdia })
                this.setState({ quantityLabel: quantityLabel.nameOdia })
                this.setState({ itemLabel: itemLabel.nameOdia })
                this.setState({ incomeHenDesc: incomeHenDesc.nameOdia })
                this.setState({ totalALabel: totalALabel.nameOdia })
                this.setState({ totalBLabel: totalBLabel.nameOdia })
                this.setState({ totalCostLabel: totalCostLabel.nameOdia })
                this.setState({ unitCostLabel: unitCostLabel.nameOdia })
                this.setState({ backButtonText: backButtonText.nameOdia })
                this.setState({ calculateButtonText: calculateButtonText.nameOdia })
                this.setState({ exitButtonText: exitButtonText.nameOdia })
                this.setState({ totalExpenditureLabel: totalExpenditureLabel.nameOdia })
                this.setState({ netProfitLabel: netProfitLabel.nameOdia })
                this.setState({ noteLabel: noteLabel.nameOdia })
                this.setState({ eggText: eggText.nameOdia })
                this.setState({ adultBirdText: adultBirdText.nameOdia })
                this.setState({ feedText: feedText.nameOdia })
                this.setState({ dewormingVaccination: dewormingVaccination.nameOdia })
                this.setState({ incomeFrom: incomeFrom.nameOdia })
                this.setState({ hens: hens.nameOdia })
                this.setState({ birdText: birdText.nameOdia })
                this.setState({ pieceText: pieceText.nameOdia })
            } else if (this.state.textLanguageChange === '4') {
                this.setState({ incomeHeaderLabel: incomeHeaderLabel.nameSanthali })
                this.setState({ quantityLabel: quantityLabel.nameSanthali })
                this.setState({ itemLabel: itemLabel.nameSanthali })
                this.setState({ unitCostLabel: unitCostLabel.nameSanthali })
                this.setState({ incomeHenDesc: incomeHenDesc.nameSanthali })
                this.setState({ totalALabel: totalALabel.nameSanthali })
                this.setState({ totalBLabel: totalBLabel.nameSanthali })
                this.setState({ totalCostLabel: totalCostLabel.nameSanthali })
                this.setState({ backButtonText: backButtonText.nameSanthali })
                this.setState({ calculateButtonText: calculateButtonText.nameSanthali })
                this.setState({ exitButtonText: exitButtonText.nameSanthali })
                this.setState({ totalExpenditureLabel: totalExpenditureLabel.nameSanthali })
                this.setState({ netProfitLabel: netProfitLabel.nameSanthali })
                this.setState({ noteLabel: noteLabel.nameSanthali })
                this.setState({ eggText: eggText.nameSanthali })
                this.setState({ adultBirdText: adultBirdText.nameSanthali })
                this.setState({ feedText: feedText.nameSanthali })
                this.setState({ dewormingVaccination: dewormingVaccination.nameSanthali })
                this.setState({ incomeFrom: incomeFrom.nameSanthali })
                this.setState({ hens: hens.nameSanthali })
                this.setState({ birdText: birdText.nameSanthali })
                this.setState({ pieceText: pieceText.nameSanthali })
            }
        } catch (error) {
            alert(error)
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
        //alert(data)
        this.state.numberhens = data

        var eggQuantity = 30 * data
        var birdQuantity = 8 * data
        var totalPriceAdultBrids = birdQuantity * 300
        var totalPriceEggs = eggQuantity * 5
        var total = totalPriceAdultBrids + totalPriceEggs

        var feed = 125 * data
        var vaccination = 125 * data
        var totalB = feed + vaccination
        var netProfit = total - totalB


        this.setState({ totalPriceEggs: totalPriceEggs })
        this.setState({ eggQuantity: eggQuantity })
        this.setState({ birdQuantity: birdQuantity })
        this.setState({ totalPriceAdultBrids: totalPriceAdultBrids })
        this.setState({ netProfit: netProfit })
        this.setState({ feed: feed })
        this.setState({ vaccination: vaccination })
        this.setState({ totalB: totalB })


        this.setState({ total: total })

    }

    next = async() => {



        try {
            var date = new Date().getDate()
            var month = new Date().getMonth() + 1
            var year = new Date().getFullYear()
            const expenseObject = { 'type': 'expense', 'category': 'Poultry livestock', 'amount': this.state.totalB, 'date': date + "/" + month + "/" + year }
            const incomeObject = { 'type': 'income', 'category': 'Poultry livestock', 'amount': this.state.total, 'date': date + "/" + month + "/" + year }
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
        //     params: { value: 1 }
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
                                <Text style={{ fontSize: widthToDp("5%"), marginLeft: widthToDp("5%"), marginTop: heightToDp("1.5%"), fontFamily: 'Oswald-Medium' }}>{this.state.incomeFrom} </Text>
                                <Input
                                    keyboardType='number-pad'
                                    defaultValue={this.state.numberhens}
                                    onChangeText={(data) => this.calculation(data)}
                                    style={{ marginLeft: widthToDp("1%"), fontFamily: 'Oswald-Medium', width: widthToDp("10%"), marginTop: heightToDp("1%"), borderBottomWidth: 1, borderColor: 'blue' }}
                                />
                                <Text style={{ fontSize: widthToDp("5%"), marginLeft: widthToDp("1%"), marginTop: heightToDp("1.5%"), fontFamily: 'Oswald-Medium', marginRight: widthToDp("20%") }}>{(Number(this.state.numberhens) === 1 && this.state.textLanguageChange==="0") ? "hen" : this.state.hens}</Text>
                            </View>
                            <View style={{paddingHorizontal: widthToDp('2%')}}>
                                <Text>{this.state.incomeHenDesc}</Text>
                            </View>
                            <ScrollView nestedScrollEnabled={true}>
                                <View style={{ borderWidth: 1, height: heightToDp("10%"), width: widthToDp("83%"), marginLeft: widthToDp("3%"), marginTop: heightToDp("1.5%"), flexDirection: 'row' }}>
                                    {
                                        tableHeading.map((i, key) => {
                                            return (
                                                <View style={{ width: widthToDp(`${key===0 ? 23 : key === 1 ? 11 : 20}%`), marginLeft: widthToDp("1.5%") }}>

                                                    <Text style={{ marginTop: heightToDp("2%"), fontSize: widthToDp('3.3%') }}>{key===0 ? this.state.itemLabel : key===1 ? this.state.quantityLabel : key===2 ? this.state.unitCostLabel : this.state.totalCostLabel}</Text>

                                                </View>

                                            )
                                        })
                                    }
                                </View>

                                <View style={{ borderWidth: 1, paddingVertical: heightToDp("3%"), width: widthToDp("83%"), marginLeft: widthToDp("3%"), marginTop: heightToDp("0%") }}>
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
                                        <View style={{ width: widthToDp("18%"), marginLeft: widthToDp("1.5%") }}>
                                            <Text style={{ marginTop: heightToDp("2%"), fontSize: widthToDp('3.3%') }}>{this.state.eggText}</Text>
                                            <Text style={{ marginTop: heightToDp("2%"), fontSize: widthToDp('3.3%') }}>{this.state.adultBirdText}</Text>
                                        </View>

                                        {/* <View style={{ width: widthToDp("17%"), marginLeft: widthToDp("1.5%") }}>
                                        <Text style={{ marginTop: heightToDp("2%") }}>16 months old</Text>
                                        <Text style={{ marginTop: heightToDp("2%") }}>8 months old</Text>
                                        <Text style={{ marginTop: heightToDp("2%") }}>kids</Text>
                                    </View> */}
                                        <View style={{ width: widthToDp("12%"), marginLeft: widthToDp("6%") }}>
                                            <Text style={{ marginTop: heightToDp("2%"), fontSize: widthToDp('3%') }}>{this.state.eggQuantity}</Text>
                                            <Text style={{ marginTop: heightToDp("2.5%"), fontSize: widthToDp('3%') }}>{this.state.birdQuantity}</Text>

                                        </View>
                                        <View style={{ width: widthToDp("20%"), marginLeft: widthToDp("1.5%") }}>
                                            <Text style={{ marginTop: heightToDp("2%"), fontSize: widthToDp('3%') }}>₹ 5.00 / {this.state.pieceText}</Text>
                                            <Text style={{ marginTop: heightToDp("2.5%"), fontSize: widthToDp('3%') }}>₹ 300 / {this.state.birdText}</Text>

                                        </View>
                                        <View style={{ width: widthToDp("18%"), marginLeft: widthToDp("1.5%") }}>
                                            <View style={{marginTop: heightToDp("2%"), flexDirection: 'row', justifyContent: 'space-between'}}>
                                                <Text style={{ fontSize: widthToDp('3%') }}>₹ </Text> 
                                                <Text style={{ fontSize: widthToDp('3%') }}>{this.state.totalPriceEggs}</Text>
                                            </View>
                                            <View style={{marginTop: heightToDp("2.5%"), flexDirection: 'row', justifyContent: 'space-between'}}>
                                                <Text style={{ fontSize: widthToDp('3%') }}>₹ </Text> 
                                                <Text style={{ fontSize: widthToDp('3%') }}>{this.state.totalPriceAdultBrids}</Text>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                                <View style={{ borderWidth: 1, height: heightToDp("8%"), width: widthToDp("83%"), marginLeft: widthToDp("3%"), marginTop: heightToDp("0%"), flexDirection: 'row' }}>
                                    <View style={{width: widthToDp('20%'), marginLeft: widthToDp('1%')}}>
                                        <Text style={{fontSize: widthToDp('3.3%')}}>{this.state.totalALabel}</Text>
                                    </View>
                                    <View style={{marginLeft: widthToDp("40%"), flex: 0.8, flexDirection: 'row', justifyContent: 'space-between'}}>
                                        <Text style={{ fontSize: widthToDp('3%') }}>₹ </Text> 
                                        <Text style={{ fontSize: widthToDp('3%') }}>{this.state.total}</Text>
                                    </View>
                                </View>


                                {/* table2 */}

                                <View style={{ borderWidth: 1, height: heightToDp("8%"), width: widthToDp("83%"), marginLeft: widthToDp("3%"), marginTop: heightToDp("1.5%"), flexDirection: 'row' }}>
                                    <View style={{ width: widthToDp("80%"), marginLeft: widthToDp("1.5%") }}>

                                        <Text style={{ marginTop: heightToDp("2%") }}>{this.state.totalExpenditureLabel}</Text>

                                    </View>
                                </View>

                                <View style={{ borderWidth: 1, paddingVertical: heightToDp("1%"), width: widthToDp("83%"), marginLeft: widthToDp("3%"), marginTop: heightToDp("0%") }}>
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
                                        <View style={{ width: widthToDp("18%"), marginLeft: widthToDp("1.5%") }}>
                                            {
                                                tableHeading2.map((i, index) => {
                                                    return (
                                                        <View style={{ marginTop: widthToDp("4%") }}>
                                                            <Text style={{fontSize: widthToDp('3.3%')}}>{index===0 ? this.state.itemLabel : index===1 ? this.state.feedText : this.state.dewormingVaccination}</Text>
                                                        </View>
                                                    );
                                                })
                                            }
                                        </View>

                                        {/* <View style={{ width: widthToDp("17%"), marginLeft: widthToDp("1.5%") }}>
                                        <Text style={{ marginTop: heightToDp("2%") }}>16 months old</Text>
                                        <Text style={{ marginTop: heightToDp("2%") }}>8 months old</Text>
                                        <Text style={{ marginTop: heightToDp("2%") }}>kids</Text>
                                    </View> */}
                                        <View style={{ width: widthToDp("18%"), marginLeft: widthToDp("6%") }}>
                                            <Text style={{ marginTop: heightToDp("2%") }}>LS</Text>
                                            <Text style={{ marginTop: heightToDp("1.3%") }}>LS</Text>
                                            <Text style={{ marginTop: heightToDp("1.8%") }}>LS</Text>
                                        </View>
                                        <View style={{ width: widthToDp("14%"), marginLeft: widthToDp("20%") }}>
                                            <View style={{ marginTop: heightToDp("2%") }}>
                                                <View style={{marginTop: heightToDp("4%"), flexDirection: 'row', justifyContent: 'space-between'}}>
                                                    <Text style={{ fontSize: widthToDp('3.3%') }}>{this.state.feed ? "₹ " : ""}</Text>
                                                    <Text style={{ fontSize: widthToDp('3.3%') }}>{this.state.feed ? this.state.feed : "-"}</Text>
                                                </View>
                                                <View style={{marginTop: heightToDp("2.3%"), flexDirection: 'row', justifyContent: 'space-between'}}>
                                                    <Text style={{ fontSize: widthToDp('3.3%') }}>{this.state.vaccination ? "₹ " : ""}</Text>
                                                    <Text style={{ fontSize: widthToDp('3.3%') }}>{this.state.vaccination ? this.state.vaccination : "-"}</Text>
                                                </View>
                                            </View>

                                        </View>

                                    </View>
                                </View>
                                <View style={{ borderWidth: 1, height: heightToDp("8%"), width: widthToDp("83%"), marginLeft: widthToDp("3%"), marginTop: heightToDp("0%"), flexDirection: 'row' }}>
                                    <Text style={{marginLeft: widthToDp('1%')}}>{this.state.totalBLabel}</Text>
                                    <View style={{marginLeft: widthToDp("48%"), flex: 0.75, flexDirection: 'row', justifyContent: 'space-between'}}>
                                        <Text style={{ fontSize: widthToDp('3.3%') }}>₹ </Text> 
                                        <Text style={{ fontSize: widthToDp('3.3%') }}>{this.state.totalB}</Text>
                                    </View>
                                </View>

                                <View style={{ marginLeft: widthToDp("3%"), marginTop: ("4%") }}>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Text>{this.state.netProfitLabel} = </Text>
                                        <Text>{"₹ " + this.state.total + "- ₹" + this.state.totalB + " = ₹  " + this.state.netProfit}</Text>
                                    </View>

                                </View>
                                
                                <View style={{margin: widthToDp('3%')}}>
                                    <Text>{this.state.noteLabel}</Text>
                                </View>

                                <View style={{ marginTop: heightToDp("10%") }}></View>
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
                    <TouchableOpacity onPress={() => Toast.show({text: "Calculated", duration: 3000, type: 'success'})}>
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