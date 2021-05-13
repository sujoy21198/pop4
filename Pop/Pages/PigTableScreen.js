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
    { 'name': 'Mother Pig', 'unitCost': '2500', 'heading': 'Items' },
    { 'name': 'Male Pig', 'unitCost': '2500', 'heading': 'Qnty' },
    { 'name': 'Young Pig', 'unitCost': '1500', 'heading': 'Unit Cost (₹)' },
    { 'name': 'Piglet', 'unitCost': '500', 'heading': 'Total Value after 1 year (₹)' },
]


export default class PigTableScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            numberPigs: '1',
            tableHeading: [],
            unitCostmotherPig: '2500',
            unitCostmalePig: '2500',
            total: '8500',
            unitCostshedConstruction: '1000',
            totalCostmotherpig: '2500',
            totalcostMalePig: '2500',
            totalCostShedConstruction: '1000',
            totalCostfeeding: '2000',
            totalcostVaccine: '500',
            numberOfMalePig: '1',
            numberOfYoungPig: '6',
            numberOfPiglets: '6',
            totalValueAfteroneYearForMotherPig: '2500',
            totalValueAfteroneYearForMalePig: '2500',
            totalValueAfteroneYearForYoungPig: '9000',
            totalValueAfteroneYearForPigletPig: '3000',
            totalValueAfteroneYearTotal: '17000',
            netProfit:'8500',
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
            incomeFrom: '',
            motherPigGilt: '',
            malePigGilt: '',
            shedConstruction: '',
            vaccination: '',
            feeding: '',
            totalA: '',
            totalValueAfter1Year: '',
            motherPig: '',
            malePig: '',
            youngPig: '',
            piglet: '',
            totalB: '',
            netProfitLabel: '',
            noteLabel: '',
            count: '',
            adultLabel: '',
            pigletLabel: '',
            andLabel: ''
        }
        this.state.tableHeading = tableHeading
        this.state.languages = Languages
    }
    componentDidMount() {
        this.getVaccinesFromOffline()
        this.setLanguageOnMount()
    }


    loadlabelsFromStorage = async () => {
        try {
            let username = await AsyncStorage.getItem('username')
            let user = await AsyncStorage.getItem('labelsData');
            let parsed = JSON.parse(user);
            var specificObject = parsed.find((i) => i.username === username)
            var incomeHeaderLabel = specificObject.labels.find((i) => i.type === 148)
            var incomeFrom = specificObject.labels.find((i) => i.type === 95)
            var incomeHenDesc = specificObject.labels.find((i) => i.type === 150)
            var quantityLabel = specificObject.labels.find((i) => i.type === 79)
            var itemLabel = specificObject.labels.find((i) => i.type === 88)
            var unitCostLabel = specificObject.labels.find((i) => i.type === 92)
            var totalCostLabel = specificObject.labels.find((i) => i.type === 93)
            var backButtonText = specificObject.labels.find((i) => i.type === 64)
            var calculateButtonText = specificObject.labels.find((i) => i.type === 192)
            var exitButtonText = specificObject.labels.find((i) => i.type === 63)
            var motherPigGilt = specificObject.labels.find((i) => i.type === 151)
            var malePigGilt = specificObject.labels.find((i) => i.type === 152)
            var shedConstruction = specificObject.labels.find((i) => i.type === 153)
            var vaccination = specificObject.labels.find((i) => i.type === 154)
            var adultLabel = specificObject.labels.find((i) => i.type === 199)
            var pigletLabel = specificObject.labels.find((i) => i.type === 161)
            var feeding = specificObject.labels.find((i) => i.type === 156)
            var totalA = specificObject.labels.find((i) => i.type === 118)
            var totalValueAfter1Year = specificObject.labels.find((i) => i.type === 157)
            var motherPig = specificObject.labels.find((i) => i.type === 149)
            var malePig = specificObject.labels.find((i) => i.type === 159)
            var youngPig = specificObject.labels.find((i) => i.type === 160)
            var piglet = specificObject.labels.find((i) => i.type === 161)
            var totalB = specificObject.labels.find((i) => i.type === 119)
            var netProfitLabel = specificObject.labels.find((i) => i.type === 194)
            var noteLabel = specificObject.labels.find((i) => i.type === 162)
            var count = specificObject.labels.find((i) => i.type === 155)
            var andLabel = specificObject.labels.find((i) => i.type === 213)
            if (this.state.textLanguageChange === '0') {
                this.setState({ incomeHeaderLabel: incomeHeaderLabel.nameEnglish })
                this.setState({ quantityLabel: quantityLabel.nameEnglish })
                this.setState({ itemLabel: itemLabel.nameEnglish })
                this.setState({ incomeHenDesc: incomeHenDesc.nameEnglish })
                this.setState({ unitCostLabel: unitCostLabel.nameEnglish })
                this.setState({ totalCostLabel: totalCostLabel.nameEnglish })
                this.setState({ backButtonText: backButtonText.nameEnglish })
                this.setState({ calculateButtonText: calculateButtonText.nameEnglish })
                this.setState({ exitButtonText: exitButtonText.nameEnglish })
                this.setState({ motherPigGilt: motherPigGilt.nameEnglish })
                this.setState({ malePigGilt: malePigGilt.nameEnglish })
                this.setState({ shedConstruction: shedConstruction.nameEnglish })
                this.setState({ vaccination: vaccination.nameEnglish })
                this.setState({ shedConstruction: shedConstruction.nameEnglish })
                this.setState({ adultLabel: adultLabel.nameEnglish })
                this.setState({ pigletLabel: pigletLabel.nameEnglish })
                this.setState({ feeding: feeding.nameEnglish })
                this.setState({ totalA: totalA.nameEnglish })
                this.setState({ totalValueAfter1Year: totalValueAfter1Year.nameEnglish })
                this.setState({ motherPig: motherPig.nameEnglish })
                this.setState({ malePig: malePig.nameEnglish })
                this.setState({ youngPig: youngPig.nameEnglish })
                this.setState({ piglet: piglet.nameEnglish })
                this.setState({ totalB: totalB.nameEnglish })
                this.setState({ netProfitLabel: netProfitLabel.nameEnglish })
                this.setState({ noteLabel: noteLabel.nameEnglish })
                this.setState({ incomeFrom: incomeFrom.nameEnglish })
                this.setState({ count: count.nameEnglish })
                this.setState({ andLabel: andLabel.nameEnglish })
            } else if (this.state.textLanguageChange === '1') {
                this.setState({ incomeHeaderLabel: incomeHeaderLabel.nameHindi })
                this.setState({ quantityLabel: quantityLabel.nameHindi })
                this.setState({ itemLabel: itemLabel.nameHindi })
                this.setState({ incomeHenDesc: incomeHenDesc.nameHindi })
                this.setState({ unitCostLabel: unitCostLabel.nameHindi })
                this.setState({ totalCostLabel: totalCostLabel.nameHindi })
                this.setState({ backButtonText: backButtonText.nameHindi })
                this.setState({ calculateButtonText: calculateButtonText.nameHindi })
                this.setState({ exitButtonText: exitButtonText.nameHindi })
                this.setState({ motherPigGilt: motherPigGilt.nameHindi })
                this.setState({ malePigGilt: malePigGilt.nameHindi })
                this.setState({ shedConstruction: shedConstruction.nameHindi })
                this.setState({ vaccination: vaccination.nameHindi })
                this.setState({ shedConstruction: shedConstruction.nameHindi })
                this.setState({ adultLabel: adultLabel.nameHindi })
                this.setState({ pigletLabel: pigletLabel.nameHindi })
                this.setState({ feeding: feeding.nameHindi })
                this.setState({ totalA: totalA.nameHindi })
                this.setState({ totalValueAfter1Year: totalValueAfter1Year.nameHindi })
                this.setState({ motherPig: motherPig.nameHindi })
                this.setState({ malePig: malePig.nameHindi })
                this.setState({ youngPig: youngPig.nameHindi })
                this.setState({ piglet: piglet.nameHindi })
                this.setState({ totalB: totalB.nameHindi })
                this.setState({ netProfitLabel: netProfitLabel.nameHindi })
                this.setState({ noteLabel: noteLabel.nameHindi })
                this.setState({ incomeFrom: incomeFrom.nameHindi })
                this.setState({ count: count.nameHindi })
                this.setState({ andLabel: andLabel.nameHindi })
            } else if (this.state.textLanguageChange === '2') {
                this.setState({ incomeHeaderLabel: incomeHeaderLabel.nameHo })
                this.setState({ quantityLabel: quantityLabel.nameHo })
                this.setState({ itemLabel: itemLabel.nameHo })
                this.setState({ incomeHenDesc: incomeHenDesc.nameHo })
                this.setState({ unitCostLabel: unitCostLabel.nameHo })
                this.setState({ totalCostLabel: totalCostLabel.nameHo })
                this.setState({ backButtonText: backButtonText.nameHo })
                this.setState({ calculateButtonText: calculateButtonText.nameHo })
                this.setState({ exitButtonText: exitButtonText.nameHo })
                this.setState({ motherPigGilt: motherPigGilt.nameHo })
                this.setState({ malePigGilt: malePigGilt.nameHo })
                this.setState({ shedConstruction: shedConstruction.nameHo })
                this.setState({ vaccination: vaccination.nameHo })
                this.setState({ shedConstruction: shedConstruction.nameHo })
                this.setState({ adultLabel: adultLabel.nameHo })
                this.setState({ pigletLabel: pigletLabel.nameHo })
                this.setState({ feeding: feeding.nameHo })
                this.setState({ totalA: totalA.nameHo })
                this.setState({ totalValueAfter1Year: totalValueAfter1Year.nameHo })
                this.setState({ motherPig: motherPig.nameHo })
                this.setState({ malePig: malePig.nameHo })
                this.setState({ youngPig: youngPig.nameHo })
                this.setState({ piglet: piglet.nameHo })
                this.setState({ totalB: totalB.nameHo })
                this.setState({ netProfitLabel: netProfitLabel.nameHo })
                this.setState({ noteLabel: noteLabel.nameHo })
                this.setState({ incomeFrom: incomeFrom.nameHo })
                this.setState({ count: count.nameHo })
                this.setState({ andLabel: andLabel.nameHo })
            } else if (this.state.textLanguageChange === '3') {
                this.setState({ incomeHeaderLabel: incomeHeaderLabel.nameOdia })
                this.setState({ quantityLabel: quantityLabel.nameOdia })
                this.setState({ itemLabel: itemLabel.nameOdia })
                this.setState({ incomeHenDesc: incomeHenDesc.nameOdia })
                this.setState({ unitCostLabel: unitCostLabel.nameOdia })
                this.setState({ totalCostLabel: totalCostLabel.nameOdia })
                this.setState({ backButtonText: backButtonText.nameOdia })
                this.setState({ calculateButtonText: calculateButtonText.nameOdia })
                this.setState({ exitButtonText: exitButtonText.nameOdia })
                this.setState({ motherPigGilt: motherPigGilt.nameOdia })
                this.setState({ malePigGilt: malePigGilt.nameOdia })
                this.setState({ shedConstruction: shedConstruction.nameOdia })
                this.setState({ vaccination: vaccination.nameOdia })
                this.setState({ shedConstruction: shedConstruction.nameOdia })
                this.setState({ adultLabel: adultLabel.nameOdia })
                this.setState({ pigletLabel: pigletLabel.nameOdia })
                this.setState({ feeding: feeding.nameOdia })
                this.setState({ totalA: totalA.nameOdia })
                this.setState({ totalValueAfter1Year: totalValueAfter1Year.nameOdia })
                this.setState({ motherPig: motherPig.nameOdia })
                this.setState({ malePig: malePig.nameOdia })
                this.setState({ youngPig: youngPig.nameOdia })
                this.setState({ piglet: piglet.nameOdia })
                this.setState({ totalB: totalB.nameOdia })
                this.setState({ netProfitLabel: netProfitLabel.nameOdia })
                this.setState({ noteLabel: noteLabel.nameOdia })
                this.setState({ incomeFrom: incomeFrom.nameOdia })
                this.setState({ count: count.nameHindi })
                this.setState({ andLabel: andLabel.nameOdia })
            } else if (this.state.textLanguageChange === '4') {
                this.setState({ incomeHeaderLabel: incomeHeaderLabel.nameSanthali })
                this.setState({ quantityLabel: quantityLabel.nameSanthali })
                this.setState({ itemLabel: itemLabel.nameSanthali })
                this.setState({ incomeHenDesc: incomeHenDesc.nameSanthali })
                this.setState({ unitCostLabel: unitCostLabel.nameSanthali })
                this.setState({ totalCostLabel: totalCostLabel.nameSanthali })
                this.setState({ backButtonText: backButtonText.nameSanthali })
                this.setState({ calculateButtonText: calculateButtonText.nameSanthali })
                this.setState({ exitButtonText: exitButtonText.nameSanthali })
                this.setState({ motherPigGilt: motherPigGilt.nameSanthali })
                this.setState({ malePigGilt: malePigGilt.nameSanthali })
                this.setState({ shedConstruction: shedConstruction.nameSanthali })
                this.setState({ vaccination: vaccination.nameSanthali })
                this.setState({ shedConstruction: shedConstruction.nameSanthali })
                this.setState({ adultLabel: adultLabel.nameSanthali })
                this.setState({ pigletLabel: pigletLabel.nameSanthali })
                this.setState({ feeding: feeding.nameSanthali })
                this.setState({ totalA: totalA.nameSanthali })
                this.setState({ totalValueAfter1Year: totalValueAfter1Year.nameSanthali })
                this.setState({ motherPig: motherPig.nameSanthali })
                this.setState({ malePig: malePig.nameSanthali })
                this.setState({ youngPig: youngPig.nameSanthali })
                this.setState({ piglet: piglet.nameSanthali })
                this.setState({ totalB: totalB.nameSanthali })
                this.setState({ netProfitLabel: netProfitLabel.nameSanthali })
                this.setState({ noteLabel: noteLabel.nameSanthali })  
                this.setState({ incomeFrom: incomeFrom.nameSanthali })
                this.setState({ count: count.nameHindi })
                this.setState({ andLabel: andLabel.nameSanthali })
            }
        } catch (error) {
            alert(error)
        }
        //this.setState({ crops: specificObject.crops })
        //this.showData()
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
        this.state.numberPigs = data
        // var unitCostmotherPig = this.state.numberPigs * 2500
        // var unitCostmalePig = this.state.numberPigs * 2500
        // var unitCostshedConstruction = this.state.numberPigs * 1000
        var totalCostmotherpig = this.state.numberPigs * 2500
        var totalcostMalePig = this.state.numberPigs * 2500
        var totalCostShedConstruction = this.state.numberPigs * 1000
        var numberOfMalePig = data
        var youngPig = 6 * data
        var piglet = 6 * this.state.numberPigs
        var totalValueAfteroneYearForMotherPig = 2500 * this.state.numberPigs
        var totalValueAfteroneYearForYoungPig = 1500 * youngPig
        var totalValueAfteroneYearForPigletPig = 500 * piglet
        var totalValueAfteroneYearTotal = totalValueAfteroneYearForMotherPig + totalValueAfteroneYearForPigletPig + totalValueAfteroneYearForYoungPig + totalcostMalePig 
        
        


        var totalCostfeeding = 2000 * data
        var totalcostVaccine = 500 * data

        var total = totalCostmotherpig + totalcostMalePig + totalCostShedConstruction + totalCostfeeding + totalcostVaccine
        // this.setState({ unitCostmotherPig: unitCostmotherPig })
        var totalValueAfteroneYearForMalePig = 2500 * data
        var netProfit = Number.parseInt(totalValueAfteroneYearTotal) - total
        // this.setState({ unitCostmalePig: unitCostmalePig })
        // this.setState({ unitCostshedConstruction: unitCostshedConstruction })
        this.setState({totalCostfeeding : totalCostfeeding})
        this.setState({totalcostVaccine : totalcostVaccine})
        this.setState({ totalCostmotherpig: totalCostmotherpig })
        this.setState({ totalcostMalePig: totalcostMalePig })
        this.setState({ totalCostShedConstruction: totalCostShedConstruction })
        this.setState({ total: total })
        this.setState({ numberOfYoungPig: youngPig })
        this.setState({ numberOfPiglets: piglet })
        this.setState({ totalValueAfteroneYearForMotherPig: totalValueAfteroneYearForMotherPig })
        this.setState({ totalValueAfteroneYearForYoungPig: totalValueAfteroneYearForYoungPig })
        this.setState({ totalValueAfteroneYearForPigletPig: totalValueAfteroneYearForPigletPig })
        this.setState({ totalValueAfteroneYearTotal: totalValueAfteroneYearTotal })
        this.setState({netProfit : netProfit})
        this.setState({numberOfMalePig : numberOfMalePig})
        this.setState({totalValueAfteroneYearForMalePig  :totalValueAfteroneYearForMalePig})


    }
    next = async() => {
        try {
            var date = new Date().getDate()
            var month = new Date().getMonth() + 1
            var year = new Date().getFullYear()
            const expenseObject = { 'type': 'expense', 'category': 'Pig livestock', 'amount': this.state.total, 'date': date + "/" + month + "/" + year }
            const incomeObject = { 'type': 'income', 'category': 'Pig livestock', 'amount': this.state.totalValueAfteroneYearTotal, 'date': date + "/" + month + "/" + year }
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
        //     params: { value: 2 }
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
                                    defaultValue={this.state.numberPigs}
                                    onChangeText={(data) => this.calculation(data)}
                                    style={{ marginLeft: widthToDp("1%"), fontFamily: 'Oswald-Medium', width: widthToDp("10%"), marginTop: heightToDp("1%"), borderBottomWidth: 1, borderColor: 'blue' }}
                                />
                                <Text style={{ fontSize: widthToDp("5%"), marginLeft: widthToDp("1%"), marginTop: heightToDp("1.5%"), fontFamily: 'Oswald-Medium', marginRight: widthToDp("20%") }}>{`${(Number(this.state.numberPigs) === 1 && this.state.textLanguageChange==="0") ? "mother pig" : this.state.motherPig}`}</Text>
                            </View>
                            <View style={{paddingHorizontal: widthToDp('2%')}}>
                                <Text>{this.state.incomeHenDesc}</Text>
                            </View>
                            <ScrollView nestedScrollEnabled={true}>
                                <View style={{ borderWidth: 1, paddingVertical: heightToDp("2%"), width: widthToDp("83%"), marginLeft: widthToDp("3%"), marginTop: heightToDp("1.5%"), flexDirection: 'row' }}>
                                    {
                                        tableHeading.map((i, key) => {
                                            return (
                                                <View style={{ width: widthToDp(`${key===0 ? 19 : key === 1 ? 18 : 19}%`), marginLeft: widthToDp("1.5%") }}>

                                                    <Text style={{fontSize: widthToDp('3.3%')}}>{key === 0 ? this.state.itemLabel : key===1 ? this.state.quantityLabel : key===2 ? this.state.unitCostLabel : this.state.totalCostLabel}</Text>

                                                </View>

                                            )
                                        })
                                    }
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
                                    <View style={{marginTop: widthToDp("2%"), flexDirection: 'row', width: widthToDp("100%")}}>
                                        <View style={{width: widthToDp("21%"), marginLeft: widthToDp("1.3%")}}>
                                            <Text style={{fontSize: widthToDp('3%')}}>{this.state.motherPigGilt}</Text>
                                        </View>                
                                        <View style={{width: widthToDp("21%")}}>
                                            <Text style={{fontSize: widthToDp('3.3%')}}>{this.state.numberPigs}</Text>
                                        </View>
                                        <View style={{width: widthToDp("17%"), flexDirection: 'row', justifyContent: 'space-between'}}>
                                            <Text style={{ fontSize: widthToDp('3.3%') }}>₹ </Text> 
                                            <Text style={{ fontSize: widthToDp('3.3%') }}>{this.state.unitCostmotherPig}</Text>
                                        </View>
                                        <View style={{width: widthToDp("15%"), marginLeft: widthToDp('3%'), flexDirection: 'row', justifyContent: 'space-between'}}>
                                            <Text style={{ fontSize: widthToDp('3.3%') }}>₹ </Text> 
                                            <Text style={{ fontSize: widthToDp('3.3%') }}>{this.state.totalCostmotherpig}</Text>
                                        </View>
                                    </View>
                                    <View style={{marginTop: widthToDp("2%"), flexDirection: 'row', width: widthToDp("100%")}}>
                                        <View style={{width: widthToDp("21%"), marginLeft: widthToDp("1.3%")}}>
                                            <Text style={{fontSize: widthToDp('3.%')}}>{this.state.malePigGilt}</Text>
                                        </View>             
                                        <View style={{width: widthToDp("21%")}}>
                                            <Text style={{fontSize: widthToDp('3.3%')}}>{this.state.numberPigs}</Text>
                                        </View>   
                                        <View style={{width: widthToDp("17%"), flexDirection: 'row', justifyContent: 'space-between'}}>
                                            <Text style={{ fontSize: widthToDp('3.3%') }}>₹ </Text> 
                                            <Text style={{ fontSize: widthToDp('3.3%') }}>{this.state.unitCostmalePig}</Text>
                                        </View>
                                        <View style={{width: widthToDp("15%"), marginLeft: widthToDp('3%'), flexDirection: 'row', justifyContent: 'space-between'}}>
                                            <Text style={{ fontSize: widthToDp('3.3%') }}>₹ </Text> 
                                            <Text style={{ fontSize: widthToDp('3.3%') }}>{this.state.totalcostMalePig}</Text>
                                        </View>
                                    </View>
                                    <View style={{marginTop: widthToDp("2%"), flexDirection: 'row', width: widthToDp("100%")}}>
                                        <View style={{width: widthToDp("21%"), marginLeft: widthToDp("1.3%")}}>
                                            <Text style={{fontSize: widthToDp('3.%')}}>{this.state.shedConstruction}</Text>
                                        </View>             
                                        <View style={{width: widthToDp("21%")}}>
                                            <Text style={{fontSize: widthToDp('3.3%')}}>{this.state.numberPigs}</Text>
                                        </View>  
                                        <View style={{width: widthToDp("17%"), flexDirection: 'row', justifyContent: 'space-between'}}>
                                            <Text style={{ fontSize: widthToDp('3.3%') }}>₹ </Text> 
                                            <Text style={{ fontSize: widthToDp('3.3%') }}>{this.state.unitCostshedConstruction}</Text>
                                        </View>  
                                        <View style={{width: widthToDp("15%"), marginLeft: widthToDp('3%'), flexDirection: 'row', justifyContent: 'space-between'}}>
                                            <Text style={{ fontSize: widthToDp('3.3%') }}>₹ </Text> 
                                            <Text style={{ fontSize: widthToDp('3.3%') }}>{this.state.totalCostShedConstruction}</Text>
                                        </View>
                                    </View>
                                    <View style={{marginTop: widthToDp("2%"), flexDirection: 'row', width: widthToDp("100%")}}>
                                        <View style={{width: widthToDp("21%"), marginLeft: widthToDp("1.3%")}}>
                                            <Text style={{fontSize: widthToDp('3%')}}>{this.state.vaccination}</Text>
                                        </View>             
                                        <View style={{width: widthToDp("21%")}}>
                                            <Text style={{fontSize: widthToDp('3%')}}>{(Number(this.state.numberPigs) * 2) + " (" + this.state.adultLabel + ") " + this.state.andLabel + " " + (Number(this.state.numberPigs) * 12) + " (" + this.state.pigletLabel + ")"}</Text>
                                        </View>   
                                        <View style={{width: widthToDp("17%"), flexDirection: 'row', justifyContent: 'flex-end'}}>
                                            <Text style={{fontSize: widthToDp('3.3%')}}>LS</Text>
                                        </View>  
                                        <View style={{width: widthToDp("15%"), marginLeft: widthToDp('3%'), flexDirection: 'row', justifyContent: 'space-between'}}>
                                            <Text style={{ fontSize: widthToDp('3.3%') }}>₹ </Text> 
                                            <Text style={{ fontSize: widthToDp('3.3%') }}>{this.state.totalcostVaccine}</Text>
                                        </View>
                                    </View>
                                    <View style={{marginTop: widthToDp("2%"), flexDirection: 'row', width: widthToDp("100%")}}>
                                        <View style={{width: widthToDp("21%"), marginLeft: widthToDp("1.3%")}}>
                                            <Text style={{fontSize: widthToDp('3%')}}>{this.state.feeding}</Text>
                                        </View>           
                                        <View style={{width: widthToDp("21%")}}>
                                            <Text style={{fontSize: widthToDp('3%')}}>{(Number(this.state.numberPigs) * 2) + " (" + this.state.adultLabel + ") " + this.state.andLabel + " " + (Number(this.state.numberPigs) * 12) + " (" + this.state.pigletLabel + ")"}</Text>
                                        </View>  
                                        <View style={{width: widthToDp("17%"), flexDirection: 'row', justifyContent: 'flex-end'}}>
                                            <Text style={{fontSize: widthToDp('3.3%')}}>LS</Text>
                                        </View>  
                                        <View style={{width: widthToDp("15%"), marginLeft: widthToDp('3%'), flexDirection: 'row', justifyContent: 'space-between'}}>
                                            <Text style={{ fontSize: widthToDp('3.3%') }}>₹ </Text> 
                                            <Text style={{ fontSize: widthToDp('3.3%') }}>{this.state.totalCostfeeding}</Text>
                                        </View>
                                    </View>
                                </View>
                                <View style={{ borderWidth: 1, height: heightToDp("6%"), width: widthToDp("83%"), marginLeft: widthToDp("3%"), marginTop: heightToDp("0%"), flexDirection: 'row' }}>
                                    <View style={{width: widthToDp('22%')}}>
                                        <Text style={{marginLeft: widthToDp('1.3%'), fontSize: widthToDp('3.3%')}}>{this.state.totalA}</Text>
                                    </View>
                                    <View style={{width: widthToDp("15%"), marginLeft: widthToDp('41%'), flexDirection: 'row', justifyContent: 'space-between'}}>
                                        <Text style={{ fontSize: widthToDp('3.3%') }}>₹ </Text> 
                                        <Text style={{ fontSize: widthToDp('3.3%') }}>{this.state.total}</Text>
                                    </View>
                                </View>




                                {/* table2 */}

                                <View style={{ borderWidth: 1, paddingVertical: heightToDp("1%"), width: widthToDp("83%"), marginLeft: widthToDp("3%"), marginTop: heightToDp("1.5%"), flexDirection: 'row' }}>
                                    {
                                        tableHeading2.map((i,key) => {
                                            return (
                                                <View style={{ width: widthToDp(`${key===0 ? 21 : key === 1 ? 11 : 19}%`), marginLeft: widthToDp("1.5%") }}>

                                                    <Text style={{fontSize: widthToDp('3.3%')}}>{key === 0 ? this.state.itemLabel : key===1 ? this.state.quantityLabel : key===3 ? this.state.totalCostLabel : this.state.unitCostLabel}</Text>

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
                                        <View style={{ width: widthToDp("18%"), marginLeft: widthToDp("1.5%") }}>
                                            {
                                                tableHeading2.map((i, index) => {
                                                    return (
                                                        <View style={{ marginTop: widthToDp("3.8%") }}>
                                                            <Text style={{fontSize: widthToDp('3.3%')}}>{index===0 ? this.state.motherPig : index===1 ? this.state.malePig : index===2 ? this.state.youngPig : this.state.piglet}</Text>
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
                                        <View style={{ width: widthToDp("10%"), marginLeft: widthToDp("6%") }}>
                                            <Text style={{ marginTop: heightToDp("2%"), fontSize: widthToDp('3.3%') }}>{this.state.numberPigs}</Text>
                                            <Text style={{ marginTop: heightToDp("2%"), fontSize: widthToDp('3.3%') }}>{this.state.numberOfMalePig}</Text>
                                            <Text style={{ marginTop: heightToDp("2%"), fontSize: widthToDp('3.3%') }}>{this.state.numberOfYoungPig}</Text>
                                            <Text style={{ marginTop: heightToDp("2%"), fontSize: widthToDp('3.3%') }}>{this.state.numberOfPiglets}</Text>

                                        </View>
                                        <View style={{ width: widthToDp("17%"), marginLeft: widthToDp("1.5%") }}>
                                            {
                                                tableHeading2.map((i, key) => {
                                                    return (                                                        
                                                        <View style={{marginTop: heightToDp(`2%`), flexDirection: 'row', justifyContent: 'space-between'}}>
                                                            <Text style={{ fontSize: widthToDp('3.3%') }}>₹ </Text> 
                                                            <Text style={{ fontSize: widthToDp('3.3%') }}>{i.unitCost}</Text>
                                                        </View>
                                                    )
                                                })
                                            }

                                        </View>
                                        <View style={{ width: widthToDp("14%"), marginLeft: widthToDp("4.5%") }}>                                                    
                                            <View style={{marginTop: heightToDp('2%'), flexDirection: 'row', justifyContent: 'space-between'}}>
                                                <Text style={{ fontSize: widthToDp('3.3%') }}>₹ </Text> 
                                                <Text style={{ fontSize: widthToDp('3.3%') }}>{this.state.totalValueAfteroneYearForMotherPig}</Text>
                                            </View>
                                            <View style={{marginTop: heightToDp('2%'), flexDirection: 'row', justifyContent: 'space-between'}}>
                                                <Text style={{ fontSize: widthToDp('3.3%') }}>₹ </Text> 
                                                <Text style={{ fontSize: widthToDp('3.3%') }}>{this.state.totalValueAfteroneYearForMalePig}</Text>
                                            </View>
                                            <View style={{marginTop: heightToDp('2%'), flexDirection: 'row', justifyContent: 'space-between'}}>
                                                <Text style={{ fontSize: widthToDp('3.3%') }}>₹ </Text> 
                                                <Text style={{ fontSize: widthToDp('3.3%') }}>{this.state.totalValueAfteroneYearForYoungPig}</Text>
                                            </View>
                                            <View style={{marginTop: heightToDp('2%'), flexDirection: 'row', justifyContent: 'space-between'}}>
                                                <Text style={{ fontSize: widthToDp('3.3%') }}>₹ </Text> 
                                                <Text style={{ fontSize: widthToDp('3.3%') }}>{this.state.totalValueAfteroneYearForPigletPig}</Text>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                                <View style={{ borderWidth: 1, height: heightToDp("8%"), width: widthToDp("83%"), marginLeft: widthToDp("3%"), marginTop: heightToDp("0%"), flexDirection: 'row' }}>
                                    <View style={{width: widthToDp('22%'), marginLeft: widthToDp('1%')}}>
                                        <Text style={{fontSize: widthToDp('3.3%')}}>{this.state.totalB}</Text>
                                    </View>
                                    <View style={{marginLeft: widthToDp('36%'), width: widthToDp('14%'), flexDirection: 'row', justifyContent: 'space-between'}}>
                                        <Text style={{ fontSize: widthToDp('3.3%') }}>₹ </Text> 
                                        <Text style={{ fontSize: widthToDp('3.3%') }}>{this.state.totalValueAfteroneYearTotal}</Text>
                                    </View>
                                </View>

                                <View style={{ marginLeft: widthToDp("3%"), marginTop: ("4%") }}>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Text>{this.state.netProfitLabel} = </Text>
                                        <Text>{"₹ " + this.state.netProfit}</Text>
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
                    <TouchableOpacity onPress={() => Toast.show({text: "Calculated", duration: 3000, type: "success"})}>
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