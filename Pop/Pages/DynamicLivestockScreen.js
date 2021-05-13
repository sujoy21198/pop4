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
import HTML from "react-native-render-html";
import HeaderComponent from '../components/HeaderComponent'

export default class DynamicLivestockScreen extends Component {

    constructor(props) {
        super(props)
        this.state = {
            languages: [],
            livestockName:'',
            contentAreaEnglish:'',
            contentAreaHindi:'',
            contentAreaHo:'',
            contentAreaOdia:'',
            contentAreaSanthali:''
        }
        this.state.languages = Languages
        this.state.livestockName = this.props.route.params.livestockName
        //alert(this.state.livestockName)
    }

    componentDidMount() {
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
            this.state.contentAreaEnglish = specificLivestock.contentAreaEnglish
            this.state.contentAreaHindi = specificLivestock.contentAreaHindi
            this.state.contentAreaHo = specificLivestock.contentAreaHo
            this.state.contentAreaOdia = specificLivestock.contentAreaOdia
            this.state.contentAreaSanthali = specificLivestock.contentAreaSanthali
            
            //console.log(specificLivestock.contentAreaEnglish,"kokokokokokokokokok")
        } catch (error) {
            console.log(error)
        }
    }

    loadlabelsFromStorage = async () => {
        try {
            let username = await AsyncStorage.getItem('username')
            let user = await AsyncStorage.getItem('labelsData');
            let parsed = JSON.parse(user);
            var specificObject = parsed.find((i) => i.username === username)
            var immunizationCostLabel = specificObject.labels.find((i) => i.type === (this.props.route.params.name === 'Backyard Poultry' ? 107 : this.props.route.params.name === "Goat" ? 124 : 190))
            var itemLabel = specificObject.labels.find((i) => i.type === 88)
            var costLabel = specificObject.labels.find((i) => i.type === 90)
            var intervalLabel = specificObject.labels.find((i) => i.type === 91)
            var totalLabel = specificObject.labels.find((i) => i.type === 112)
            var months = specificObject.labels.find((i) => i.type === 111)
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
                this.setState({ backButtonText: back.nameSanthali })
                this.setState({ saveButtonText: save.nameSanthali })
                this.setState({ nextButtonText: next.nameSanthali })
                this.setState({ repeatText: repeatText.nameSanthali })
            }
        } catch (error) {
            console.log(error)
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
                <View style={{ backgroundColor: BaseColor.Red, height: heightToDp("90%"), alignSelf: 'center', width: widthToDp("90%"), borderRadius: 10, marginTop: heightToDp('1.5%') }}>
                    <View style={{ backgroundColor: "white", height: heightToDp("85.5%"), alignSelf: 'center', width: widthToDp("90%"), marginTop: heightToDp('2%'), borderBottomLeftRadius: 10, borderBottomRightRadius: 10 }}>
                        {
                            this.state.textLanguageChange === '0' ? <HTML source={{ html: this.state.contentAreaEnglish }} containerStyle={{ elevation: 10, marginTop: heightToDp("2%"), marginLeft: widthToDp("2%"),width:widthToDp("80%"),marginRight:widthToDp("4%") }} /> : ((this.state.textLanguageChange === '1') ? <HTML source={{ html: this.state.contentAreaHindi }} containerStyle={{ elevation: 10, marginTop: heightToDp("2%"), marginLeft: widthToDp("2%"),width:widthToDp("80%") }} /> : ((this.state.textLanguageChange === '2') ? <HTML source={{ html: this.state.contentAreaHo }} containerStyle={{ elevation: 10, marginTop: heightToDp("2%"), marginLeft: widthToDp("2%") }} /> : ((this.state.textLanguageChange === '3') ? <HTML source={{ html: this.state.contentAreaOdia }} containerStyle={{ elevation: 10, marginTop: heightToDp("2%"), marginLeft: widthToDp("2%") }} /> : ((this.state.textLanguageChange === '4') ? <HTML source={{ html: this.state.contentAreaSanthali }} containerStyle={{ elevation: 10, marginTop: heightToDp("2%"), marginLeft: widthToDp("2%") }} /> : null))))
                        }
                    </View>
                </View>
            </View>
        );
    }
}