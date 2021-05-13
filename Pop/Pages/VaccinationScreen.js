import React, { Component } from 'react'
import { View, Image, TouchableOpacity, ScrollView } from 'react-native'
import BaseColor from '../Core/BaseTheme'
import { Text, Input } from 'native-base'
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
    {  'birth': '2nd Birth', 'age': '8 months old', 'numbers': '1', 'unitPrice': '4000', 'totalPriceInRupees': '5000' },
    { 'name': 'Cost (₹)', 'birth': '3rd Birth', 'age': 'kid', 'numbers': '1', 'unitPrice': '4000', 'totalPriceInRupees': '5000' },
    { 'name': 'Interval' },
]

export default class VaccinationScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            tableHeading: [],
            value: '',
            vaccine: [],
            livestockName:'',
            vaccineTotalCost: 0,
            languages:[],
            immunizationCostLabel: '',
            itemLabel: '',
            costLabel: '',
            intervalLabel: '',
            totalLabel: '',
            months: '',
            backButtonText: '',
            saveButtonText: '',
            nextButtonText: '',
            repeatText: '',
            expectedAnalysis:''
        }
        this.state.tableHeading = tableHeading
        this.state.value = this.props.route.params.value
        this.state.livestockName = this.props.route.params.name
        this.state.languages = Languages
        
       // alert(this.state.value)
    }
    componentDidMount() {
        this.getVaccinesFromOffline();
        this.setLanguageOnMount()
        this.checkNavigation()
    }


    checkNavigation = async() => {
        try {
            let username = await AsyncStorage.getItem('username')
            let user = await AsyncStorage.getItem('offlineData');
            let parsed = JSON.parse(user);
            var specificObject = parsed[0]
            var specificLivestock = specificObject.livestock.find((i) => i.nameEnglish === this.state.livestockName)
            this.state.expectedAnalysis = specificLivestock.expectedAnalysis

        
        } catch (error) {
            alert(error)
        }
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
            var immunizationCostLabel = specificObject.labels.find((i) => i.type === (this.props.route.params.name==='Backyard Poultry' ? 107 : this.props.route.params.name==="Goat" ? 124 : 190))
            var itemLabel = specificObject.labels.find((i) => i.type === 88)
            var costLabel = specificObject.labels.find((i) => i.type === 90)
            var intervalLabel = specificObject.labels.find((i) => i.type === 91)
            var totalLabel = specificObject.labels.find((i) => i.type === 112)
            var months = specificObject.labels.find((i) => i.type === 111)
            var month = specificObject.labels.find((i) => i.type === 222)
            var back = specificObject.labels.find((i) => i.type === 64)
            var save = specificObject.labels.find((i) => i.type === 63)
            var next = specificObject.labels.find((i) => i.type === 62)
            var repeatText = specificObject.labels.find((i) => i.type === 206)
            // var message = specificObject.labels.find((i) => i.type === 26)
            // var generalSettings = specificObject.labels.find((i) => i.type === 27)
            // var pension = specificObject.labels.find((i) => i.type === 51)
            // var others = specificObject.labels.find((i) => i.type === 52)
            if (this.state.textLanguageChange === '0') {
                this.setState({ immunizationCostLabel: immunizationCostLabel.nameEnglish })
                this.setState({ costLabel: costLabel.nameEnglish })
                this.setState({ itemLabel: itemLabel.nameEnglish })
                this.setState({ intervalLabel: intervalLabel.nameEnglish })
                this.setState({ totalLabel: totalLabel.nameEnglish })
                this.setState({ months: months.nameEnglish })
                this.setState({ month: month.nameEnglish })
                this.setState({ backButtonText: back.nameEnglish })
                this.setState({ saveButtonText: save.nameEnglish })
                this.setState({ nextButtonText: next.nameEnglish })
                this.setState({ repeatText: repeatText.nameEnglish })
            } else if (this.state.textLanguageChange === '1') {
                this.setState({ immunizationCostLabel: immunizationCostLabel.nameHindi })
                this.setState({ costLabel: costLabel.nameHindi })
                this.setState({ itemLabel: itemLabel.nameHindi })
                this.setState({ intervalLabel: intervalLabel.nameHindi })
                this.setState({ totalLabel: totalLabel.nameHindi })
                this.setState({ months: months.nameHindi })
                this.setState({ month: month.nameHindi })
                this.setState({ backButtonText: back.nameHindi })
                this.setState({ saveButtonText: save.nameHindi })
                this.setState({ nextButtonText: next.nameHindi })
                this.setState({ repeatText: repeatText.nameHindi })
            } else if (this.state.textLanguageChange === '2') {
                this.setState({ immunizationCostLabel: immunizationCostLabel.nameHo })
                this.setState({ costLabel: costLabel.nameHo })
                this.setState({ itemLabel: itemLabel.nameHo })
                this.setState({ intervalLabel: intervalLabel.nameHo })
                this.setState({ totalLabel: totalLabel.nameHo })
                this.setState({ months: months.nameHo })
                this.setState({ month: month.nameHo })
                this.setState({ backButtonText: back.nameHo })
                this.setState({ saveButtonText: save.nameHo })
                this.setState({ nextButtonText: next.nameHo })
                this.setState({ repeatText: repeatText.nameHo })
            } else if (this.state.textLanguageChange === '3') {
                this.setState({ immunizationCostLabel: immunizationCostLabel.nameOdia })
                this.setState({ costLabel: costLabel.nameOdia })
                this.setState({ itemLabel: itemLabel.nameOdia })
                this.setState({ intervalLabel: intervalLabel.nameOdia })
                this.setState({ totalLabel: totalLabel.nameOdia })
                this.setState({ months: months.nameOdia })
                this.setState({ month: month.nameEnglish })
                this.setState({ backButtonText: back.nameOdia })
                this.setState({ saveButtonText: save.nameOdia })
                this.setState({ nextButtonText: next.nameOdia })
                this.setState({ repeatText: repeatText.nameOdia })
            } else if (this.state.textLanguageChange === '4') {
                this.setState({ immunizationCostLabel: immunizationCostLabel.nameSanthali })
                this.setState({ costLabel: costLabel.nameSanthali })
                this.setState({ itemLabel: itemLabel.nameSanthali })
                this.setState({ intervalLabel: intervalLabel.nameSanthali })
                this.setState({ totalLabel: totalLabel.nameSanthali })
                this.setState({ months: months.nameSanthali })
                this.setState({ month: month.nameSanthali })
                this.setState({ backButtonText: back.nameSanthali })
                this.setState({ saveButtonText: save.nameSanthali })
                this.setState({ nextButtonText: next.nameSanthali })
                this.setState({ repeatText: repeatText.nameSanthali })
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
            var vaccine = []
            let username = await AsyncStorage.getItem('username')
            let user = await AsyncStorage.getItem('offlineData');
            let parsed = JSON.parse(user);
            var specificObject = parsed[0]
            var livestockwisevaccine = specificObject.vaccination.filter((i) => i.type === this.state.value)
            vaccine = livestockwisevaccine
            let vaccineTotalCost = 0;
            vaccine.map(i => {
                if(i.cost) {
                    vaccineTotalCost += Number.parseFloat(i.cost);
                }
            })
            this.setState({ vaccine: vaccine, vaccineTotalCost }, () => vaccineTotalCost = 0);
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
        if(this.state.expectedAnalysis === false){
            this.props.navigation.navigate({
                name: 'DynamicLivestockScreen',
                params : {
                    livestockName: this.state.livestockName
                }
            })
        }else if (this.state.value === 0) {
            this.props.navigation.navigate({
                name: 'LivestockTableScreen',
                params: {
                    _id: this.state._id,
                    breedname: this.state.breedname,
                    imageFile: this.state.imageFile,
                    livestockName: this.state.livestockName
                }
            })
        } else if (this.state.value === 1) {
            this.props.navigation.navigate({
                name: 'PigTableScreen',
                params: {
                    _id: this.state._id,
                    breedname: this.state.breedname,
                    imageFile: this.state.imageFile,
                    livestockName: this.state.livestockName
                }
            })
        } else if (this.state.value === 2) {
            this.props.navigation.navigate({
                name: 'PultryTableScreen',
                params: {
                    _id: this.state._id,
                    breedname: this.state.breedname,
                    imageFile: this.state.imageFile,
                    livestockName: this.state.livestockName
                }
            })
        }
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
                <ScrollView>
                    <View style={{ backgroundColor: BaseColor.Red, height: heightToDp("90%"), alignSelf: 'center', width: widthToDp("90%"), borderRadius: 10, marginTop: heightToDp('1.5%') }}>
                        <Text style={{ color: "#fff", fontSize: widthToDp("4%"), marginLeft: widthToDp("3%"), marginTop: heightToDp("1%"), fontFamily: 'Oswald-Medium' }}>
                            {this.state.immunizationCostLabel}
                        </Text>
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
                            <View style={{ 
                                borderTopWidth: 1, 
                                borderLeftWidth: 1, 
                                borderRightWidth: 1, 
                                borderBottomWidth: 1.3, 
                                paddingVertical: heightToDp("1%"), 
                                width: widthToDp("83%"), 
                                marginLeft: widthToDp("3%"), 
                                marginTop: heightToDp("1.5%"), 
                                flexDirection: 'row' 
                            }}>
                                {
                                    tableHeading.map((i, key) => {
                                        return (
                                            <View style={{ width: widthToDp(`${key===0 ? 13 : key===1 ? 15 : 21}%`), marginLeft: widthToDp("1.5%") }}>

                                                <Text style={{ marginTop: heightToDp("2%"), fontSize: widthToDp('3.3%') }}>
                                                    {
                                                        key === 0 ? this.state.itemLabel : key===2 ? this.state.costLabel : key===3 ? this.state.intervalLabel : ""
                                                    }
                                                </Text>
                                            </View>

                                        )
                                    })
                                }
                            </View>

                            <View style={{ 
                                borderTopWidth: 1, 
                                borderLeftWidth: 1, 
                                borderRightWidth: 1, 
                                borderBottomWidth: 1.3,
                                paddingVertical: heightToDp("1%"), 
                                width: widthToDp("83%"), 
                                marginLeft: widthToDp("3%"), 
                                marginTop: heightToDp("0%") 
                            }}>
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
                                <View style={{ flexDirection: 'row', width: widthToDp("100%") }}>
                                    <View style={{ width: widthToDp("24%"), marginLeft: widthToDp("1.5%") }}>
                                        {/* <Text style={{ marginTop: heightToDp("2%") }}>Eggs</Text>
                                        <Text style={{ marginTop: heightToDp("5%") }}>Adult Bird</Text> */}
                                        {
                                            vaccine.map((i) => {
                                                return (
                                                    <Text style={{ marginBottom: heightToDp("3.5%"), fontSize: widthToDp('3.3%') }}>{this.state.textLanguageChange==="0" ? i.itemEnglish : this.state.textLanguageChange==="1" ? i.itemHindi : this.state.textLanguageChange==="2" ? i.itemHo : this.state.textLanguageChange==="3" ? i.itemOdia : i.itemSanthala}</Text>
                                                )
                                            })
                                        }
                                    </View>

                                    {/* <View style={{ width: widthToDp("17%"), marginLeft: widthToDp("1.5%") }}>
                                        <Text style={{ marginTop: heightToDp("2%") }}>16 months old</Text>
                                        <Text style={{ marginTop: heightToDp("2%") }}>8 months old</Text>
                                        <Text style={{ marginTop: heightToDp("2%") }}>kids</Text>
                                    </View> */}
                                    
                                    <View style={{ width: widthToDp("15%"), marginLeft: widthToDp("7.3%") }}>
                                        {/* <Text style={{ marginTop: heightToDp("2%") }}>Rs 5.00 per piece</Text>
                                        <Text style={{ marginTop: heightToDp("2%") }}>Rs 300 per bird</Text> */}
                                        {
                                            vaccine.map((i, key) => {
                                                return (                                                    
                                                    <View style={{width: widthToDp('12%'), marginTop: heightToDp(`${key!==0 ? 3.5 : 0.5}%`), flexDirection: 'row', justifyContent: 'space-between'}}>
                                                        {i.cost > 0 && <Text style={{ fontSize: widthToDp('3.3%') }}>₹ </Text> }
                                                        <Text style={{ fontSize: widthToDp('3.3%') }}>{i.cost > 0 ? i.cost : '-'}</Text>
                                                    </View>
                                                )
                                            })
                                        }

                                    </View>
                                    <View style={{ width: widthToDp("30%"), marginLeft: widthToDp("7%") }}>
                                        {/* <Text style={{ marginTop: heightToDp("2%") }}>Rs {this.state.totalPriceEggs}</Text>
                                        <Text style={{ marginTop: heightToDp("5%") }}>Rs {this.state.totalPriceAdultBrids}</Text> */}
                                        {
                                            vaccine.map((i, key) => {
                                                if(i.interval) {
                                                    return (
                                                        <View
                                                            style={{
                                                                width: widthToDp("25%"),
                                                                marginTop: heightToDp(`${key===0 ? 0.5 : 3.5}%`), 
                                                            }}
                                                        >
                                                            <Text style={{ 
                                                                fontSize: widthToDp("3%") 
                                                            }}>
                                                                {i.interval.split("   ").length > 1 ? this.state.repeatText : i.interval} {Number(i.interval) > 1 ? this.state.months : this.state.month}
                                                            </Text>
                                                        </View>
                                                    )
                                                }                                                
                                            })
                                        }

                                    </View>
                                </View>
                            </View>

                            <View style={{ borderWidth: 1, height: heightToDp("8%"), width: widthToDp("83%"), marginLeft: widthToDp("3%"), marginTop: heightToDp("0%"), flexDirection: 'row' }}>
                                <View style={{marginTop:heightToDp("2%"),marginLeft:widthToDp("2%"),width:widthToDp("25%")}}>
                                    <Text style={{fontSize: widthToDp('3.3%')}}>{this.state.totalLabel}</Text>
                                </View>

                                <View style={{marginTop:heightToDp("2%"),width:widthToDp("12%"), marginLeft: '7%'}}>
                                    {
                                        this.state.vaccineTotalCost > 0 ? 
                                        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                            <Text style={{ fontSize: widthToDp('3.3%') }}>₹ </Text> 
                                            <Text style={{ fontSize: widthToDp('3.3%') }}>{this.state.vaccineTotalCost}</Text>
                                        </View> :
                                        <Text>-</Text>
                                    }                                    
                                    
                                </View>

                            </View>

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