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
    { 'name': 'Items', 'items': 'Weighing Machine', 'unit': '1', 'unitPrice': '500', 'totalPrice': '500' },
    { 'name': 'Unit', 'items': 'Bamboo Container', 'unit': '1', 'unitPrice': '100', 'totalPrice': '100' },
    { 'name': 'Unit Price (₹)', 'items': 'Polythene sheet', 'unit': '1', 'unitPrice': '100', 'totalPrice': '100' },
    { 'name': 'Total Price (₹)' },
]

export default class DryFishSellingFirstTable extends Component {
    constructor(props) {
        super(props)
        this.state = {
            tableHeading: [],
            value: '',
            vaccine: [],
            textLanguageChange: '',
            smallBusinessLabel: '',
            languages: [],
            backButtontext: '',
            saveButtonText: '',
            nextButtonText: '',
            oneTimeExpenditureLabel:'',
            weighingMachine: '',
            bambooContainer: '',
            polytheneSheet: '',
            quantityLabel: '',
            unitCostLabel: '',
            totalCostLabel: '',
            itemLabel: ''
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
            var saveButtonText = specificObject.labels.find((i) => i.type === 63)
            var nextButtonText = specificObject.labels.find((i) => i.type === 62)
            var oneTimeExpenditureLabel = specificObject.labels.find((i) => i.type === 101)
            var quantityLabel = specificObject.labels.find((i) => i.type === 79)
            var itemLabel = specificObject.labels.find((i) => i.type === 88)
            var unitCostLabel = specificObject.labels.find((i) => i.type === 92)
            var totalCostLabel = specificObject.labels.find((i) => i.type === 93)
            var table = specificObject.labels.find((i) => i.type === 203)
            var rack = specificObject.labels.find((i) => i.type === 202)
            var containers = specificObject.labels.find((i) => i.type === 204)
            var weighingMachine = specificObject.labels.find((i) => i.type === 195)
            var bambooContainer = specificObject.labels.find((i) => i.type === 196)
            var polytheneSheet = specificObject.labels.find((i) => i.type === 207)
            // var message = specificObject.labels.find((i) => i.type === 26)
            // var generalSettings = specificObject.labels.find((i) => i.type === 27)
            // var pension = specificObject.labels.find((i) => i.type === 51)
            // var others = specificObject.labels.find((i) => i.type === 52)
            if (this.state.textLanguageChange === '0') {
                this.setState({ backButtontext: backButtontext.nameEnglish })
                this.setState({ saveButtonText: saveButtonText.nameEnglish })
                this.setState({ nextButtonText: nextButtonText.nameEnglish })
                this.setState({oneTimeExpenditureLabel : oneTimeExpenditureLabel.nameEnglish})
                this.setState({quantityLabel : quantityLabel.nameEnglish})
                this.setState({itemLabel : itemLabel.nameEnglish})
                this.setState({unitCostLabel : unitCostLabel.nameEnglish})
                this.setState({totalCostLabel : totalCostLabel.nameEnglish})
                this.setState({containers : containers.nameEnglish})
                this.setState({table : table.nameEnglish})
                this.setState({rack : rack.nameEnglish})
                this.setState({weighingMachine : weighingMachine.nameEnglish})
                this.setState({bambooContainer : bambooContainer.nameEnglish})
                this.setState({polytheneSheet : polytheneSheet.nameEnglish})
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
                this.setState({ nextButtonText: nextButtonText.nameHindi })
                this.setState({oneTimeExpenditureLabel : oneTimeExpenditureLabel.nameHindi})
                this.setState({quantityLabel : quantityLabel.nameHindi})
                this.setState({itemLabel : itemLabel.nameHindi})
                this.setState({unitCostLabel : unitCostLabel.nameHindi})
                this.setState({totalCostLabel : totalCostLabel.nameHindi})
                this.setState({containers : containers.nameHindi})
                this.setState({table : table.nameHindi})
                this.setState({rack : rack.nameHindi})
                this.setState({weighingMachine : weighingMachine.nameHindi})
                this.setState({bambooContainer : bambooContainer.nameHindi})
                this.setState({polytheneSheet : polytheneSheet.nameHindi})
                // this.state.data[4].name = message.nameHindi
                // this.state.data[5].name = generalSettings.nameHindi
                // this.state.data[6].name = pension.nameHindi
                // this.state.data[7].name = others.nameHindi
            } else if (this.state.textLanguageChange === '2') {
                this.setState({ backButtontext: backButtontext.nameHo })
                this.setState({ saveButtonText: saveButtonText.nameHo })
                this.setState({ nextButtonText: nextButtonText.nameHo })
                this.setState({oneTimeExpenditureLabel : oneTimeExpenditureLabel.nameHo})
                this.setState({quantityLabel : quantityLabel.nameHo})
                this.setState({itemLabel : itemLabel.nameHo})
                this.setState({unitCostLabel : unitCostLabel.nameHo})
                this.setState({totalCostLabel : totalCostLabel.nameHo})
                this.setState({containers : containers.nameHo})
                this.setState({table : table.nameHo})
                this.setState({rack : rack.nameHo})
                this.setState({weighingMachine : weighingMachine.nameHo})
                this.setState({bambooContainer : bambooContainer.nameHo})
                this.setState({polytheneSheet : polytheneSheet.nameHo})
                // this.state.data[4].name = message.nameHindi
                // this.state.data[4].name = message.nameHo
                // this.state.data[5].name = generalSettings.nameHo
                // this.state.data[6].name = pension.nameHo
                // this.state.data[7].name = others.nameHo
            } else if (this.state.textLanguageChange === '3') {
                this.setState({ backButtontext: backButtontext.nameOdia })
                this.setState({ saveButtonText: saveButtonText.nameOdia })
                this.setState({ nextButtonText: nextButtonText.nameOdia })
                this.setState({oneTimeExpenditureLabel : oneTimeExpenditureLabel.nameOdia})
                this.setState({quantityLabel : quantityLabel.nameOdia})
                this.setState({itemLabel : itemLabel.nameOdia})
                this.setState({unitCostLabel : unitCostLabel.nameOdia})
                this.setState({totalCostLabel : totalCostLabel.nameOdia})
                this.setState({containers : containers.nameOdia})
                this.setState({table : table.nameOdia})
                this.setState({rack : rack.nameOdia})
                this.setState({weighingMachine : weighingMachine.nameOdia})
                this.setState({bambooContainer : bambooContainer.nameOdia})
                this.setState({polytheneSheet : polytheneSheet.nameOdia})
                // this.state.data[4].name = message.nameOdia
                // this.state.data[5].name = generalSettings.nameOdia
                // this.state.data[6].name = pension.nameOdia
                // this.state.data[7].name = others.nameOdia
            } else if (this.state.textLanguageChange === '4') {
                this.setState({ backButtontext: backButtontext.nameSanthali })
                this.setState({ saveButtonText: saveButtonText.nameSanthali })
                this.setState({ nextButtonText: nextButtonText.nameSanthali })
                this.setState({oneTimeExpenditureLabel : oneTimeExpenditureLabel.nameSanthali})
                this.setState({quantityLabel : quantityLabel.nameSanthali})
                this.setState({itemLabel : itemLabel.nameSanthali})
                this.setState({unitCostLabel : unitCostLabel.nameSanthali})
                this.setState({totalCostLabel : totalCostLabel.nameSanthali})
                this.setState({containers : containers.nameSanthali})
                this.setState({table : table.nameSanthali})
                this.setState({rack : rack.nameSanthali})
                this.setState({weighingMachine : weighingMachine.nameSanthali})
                this.setState({bambooContainer : bambooContainer.nameSanthali})
                this.setState({polytheneSheet : polytheneSheet.nameSanthali})
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

    // calculation = (data) => {
    //     this.state.numberhens = data
    //     var eggQuantity = this.state.eggQuantity * 30
    //     var birdQuantity = this.state.birdQuantity * 8
    //     var totalPriceAdultBrids = this.state.totalPriceAdultBrids * 2400
    //     var totalPriceEggs = this.state.totalPriceEggs * 150
    //     var total = totalPriceAdultBrids + totalPriceEggs

    //     this.setState({ eggQuantity: eggQuantity })
    //     this.setState({ birdQuantity: birdQuantity })
    //     this.setState({ totalPriceAdultBrids: totalPriceAdultBrids })
    //     this.setState({ totalPriceEggs: totalPriceEggs })

    //     this.setState({ total: total })

    // }

    inputValue = (data) => {
        var numberofVaccines = []
        numberofVaccines.concat(data)
        console.log(numberofVaccines)
    }

    next = () => {
        // this.props.navigation.reset({
        //     index: 0,
        //     routes: [{ name: "DashBoardScreen" }]
        // })
        this.props.navigation.navigate({
            name: 'VegetableVendingSecondTableScreen',
            params: {
                _id: this.state._id,
                breedname: this.state.breedname,
                imageFile: this.state.imageFile,
                livestockName: this.state.livestockName
            }
        })
        // if (this.state.value === 0) {
        //     this.props.navigation.navigate({
        //         name: 'LivestockTableScreen',
        //         params: {
        //             _id: this.state._id,
        //             breedname: this.state.breedname,
        //             imageFile: this.state.imageFile,
        //             livestockName: this.state.livestockName
        //         }
        //     })
        // } else if (this.state.value === 1) {
        //     this.props.navigation.navigate({
        //         name: 'PultryTableScreen',
        //         params: {
        //             _id: this.state._id,
        //             breedname: this.state.breedname,
        //             imageFile: this.state.imageFile,
        //             livestockName: this.state.livestockName
        //         }
        //     })
        // } else if (this.state.value === 2) {
        //     this.props.navigation.navigate({
        //         name: 'PigTableScreen',
        //         params: {
        //             _id: this.state._id,
        //             breedname: this.state.breedname,
        //             imageFile: this.state.imageFile,
        //             livestockName: this.state.livestockName
        //         }
        //     })
        // }
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
                    <View style={{ backgroundColor: BaseColor.Red, height: heightToDp("90%"), alignSelf: 'center', width: widthToDp("90%"), borderRadius: 10, marginTop: heightToDp('1.5%') }}>
                        <Text style={{ color: "#fff", fontSize: widthToDp("5%"), marginLeft: widthToDp("5%"), marginTop: heightToDp("1%"), fontFamily: 'Oswald-Medium' }}>{this.state.oneTimeExpenditureLabel}</Text>
                        <View style={{ backgroundColor: "white", height: heightToDp("85.5%"), alignSelf: 'center', width: widthToDp("90%"), marginTop: heightToDp('2%'), borderBottomLeftRadius: 10, borderBottomRightRadius: 10 }}>
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
                                            <View style={{ width: widthToDp(`${key === 0 ? 25 : key === 1 ? 13 : 19}%`), marginLeft: widthToDp("1.5%") }}>

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
                                    <View style={{ width: widthToDp("20%"), marginLeft: widthToDp("1.5%") }}>
                                        {/* <Text style={{ marginTop: heightToDp("2%") }}>Eggs</Text>
                                        <Text style={{ marginTop: heightToDp("5%") }}>Adult Bird</Text> */}
                                        {
                                            tableHeading.map((i, key) => {
                                                return (
                                                    <Text style={{ marginTop: heightToDp(`${this.state.textLanguageChange==='1' ? 3.3 : this.state.textLanguageChange==="3" ? 3.4 : 2}%`), fontSize: widthToDp("3.3%") }}>{i.items ? (key===0 ? this.state.weighingMachine : key===1 ? this.state.bambooContainer : key===2 ? this.state.polytheneSheet : "") : ""}</Text>
                                                )
                                            })
                                        }
                                    </View>

                                    {/* <View style={{ width: widthToDp("17%"), marginLeft: widthToDp("1.5%") }}>
                                        <Text style={{ marginTop: heightToDp("2%") }}>16 months old</Text>
                                        <Text style={{ marginTop: heightToDp("2%") }}>8 months old</Text>
                                        <Text style={{ marginTop: heightToDp("2%") }}>kids</Text>
                                    </View> */}
                                    <View style={{ width: widthToDp("15%"), marginLeft: widthToDp("6%"), height: heightToDp("30%") }}>
                                        {/* <Text style={{ marginTop: heightToDp("2%") }}>{this.state.eggQuantity}</Text>
                                        <Text style={{ marginTop: heightToDp("5%") }}>{this.state.birdQuantity}</Text> */}
                                        {
                                            tableHeading.map((i) => {
                                                return (
                                                    <Text style={{ marginTop: heightToDp("3.5%"), fontSize: widthToDp('3.3%') }}>{i.unit}</Text>
                                                )
                                            })
                                        }

                                    </View>
                                    <View style={{ width: widthToDp("14%"), marginLeft: widthToDp("0%") }}>
                                        {/* <Text style={{ marginTop: heightToDp("2%") }}>Rs 5.00 per piece</Text>
                                        <Text style={{ marginTop: heightToDp("2%") }}>Rs 300 per bird</Text> */}
                                        {
                                            tableHeading.map((i) => {
                                                if (i.unitPrice) {
                                                    return (
                                                        <View style={{ marginTop: widthToDp('7%'), marginLeft: widthToDp('0%'), width: widthToDp("15%"), flexDirection: 'row', justifyContent: 'space-between' }}>
                                                            {i.items && <Text style={{ fontSize: widthToDp('3.3%') }}>₹ </Text>}
                                                            <Text style={{ fontSize: widthToDp('3.3%') }}>{i.items ? i.unitPrice : "-"}</Text>
                                                        </View>
                                                    )
                                                }
                                            })
                                        }

                                    </View>
                                    <View style={{ width: widthToDp("13%"), marginLeft: widthToDp("10%") }}>
                                        {/* <Text style={{ marginTop: heightToDp("2%") }}>Rs {this.state.totalPriceEggs}</Text>
                                        <Text style={{ marginTop: heightToDp("5%") }}>Rs {this.state.totalPriceAdultBrids}</Text> */}
                                        {
                                            tableHeading.map((i) => {
                                                if (i.totalPrice) {
                                                    return (
                                                        <View style={{ marginTop: widthToDp('7%'), marginLeft: widthToDp('0%'), width: widthToDp("12%"), flexDirection: 'row', justifyContent: 'space-between' }}>
                                                            {i.items && <Text style={{ fontSize: widthToDp('3.3%') }}>₹ </Text>}
                                                            <Text style={{ fontSize: widthToDp('3.3%') }}>{i.items ? i.totalPrice : "-"}</Text>
                                                        </View>
                                                    )
                                                }
                                            })
                                        }

                                    </View>
                                </View>
                            </View>
                            <View style={{ borderWidth: 1, height: heightToDp("8%"), width: widthToDp("83%"), marginLeft: widthToDp("3%"), marginTop: heightToDp("0%"), flexDirection: 'row' }}>
                                <Text style={{ fontSize: widthToDp('3.3%'), marginLeft: widthToDp('1%') }}>{this.state.oneTimeExpenditureLabel}</Text>
                                <View style={{ marginLeft: widthToDp(`${this.state.textLanguageChange==="3" ? 48 : this.state.textLanguageChange==="1" ? 46 : 34}%`), width: widthToDp("12%"), flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <Text style={{ fontSize: widthToDp('3.3%') }}>₹ </Text>
                                    <Text style={{ fontSize: widthToDp('3.3%') }}>700</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={{ marginTop: heightToDp("10%") }}></View>
                </ScrollView>
                <View style={{ flexDirection: 'row', height: heightToDp("10%"), alignSelf: 'center' }}>
                    <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                        <View style={{ backgroundColor: "#fff", height: heightToDp("6%"), width: widthToDp("30%"), borderRadius: 100, alignSelf: 'center', marginTop: heightToDp("2%") }}>
                            <Text style={{ fontSize: widthToDp("4%"), color: "#000", marginTop: heightToDp("1.3%"), alignSelf: 'center', fontFamily: 'Oswald-Medium' }}>{this.state.backButtontext}</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { }}>
                        <View style={{ backgroundColor: "#fff", height: heightToDp("6%"), width: widthToDp("30%"), borderRadius: 100, marginLeft: widthToDp("1%"), marginTop: heightToDp("2%") }}>
                            <Text style={{ fontSize: widthToDp("4%"), color: "#000", marginTop: heightToDp("1.3%"), alignSelf: 'center', fontFamily: 'Oswald-Medium' }}>{this.state.saveButtonText}</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { this.next() }}>
                        <View style={{ backgroundColor: "#fff", height: heightToDp("6%"), width: widthToDp("30%"), borderRadius: 100, marginLeft: widthToDp("1%"), marginTop: heightToDp("2%") }}>
                            <Text style={{ fontSize: widthToDp("4%"), color: "#000", marginTop: heightToDp("1.3%"), alignSelf: 'center', fontFamily: 'Oswald-Medium' }}>{this.state.nextButtonText}</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}