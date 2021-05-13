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
import HTML from "react-native-render-html";
import LabelComponent from '../components/LabelComponent'
import RNFetchBlob from 'rn-fetch-blob'
import HeaderComponent from '../components/HeaderComponent'

export default class NutritionGardenScreen extends Component {

    constructor(props) {
        super(props)
        this.state = {
            value: '',
            title: '',
            data: [],
            isLoading: false,
            screensData: '',
            pageCounter: 0,
            lengthOfData: '',
            textLanguageChange: '',
            languages: [],
            nextButtonText:''
        }
        this.state.languages = Languages
        //alert(this.state.value)
    }

    componentDidMount() {
        //this.getDetails()
        this.getDetailsFromOffline()
        this.setLanguageOnMount()
        this.loadlabelsFromStorage()
    }

    loadlabelsFromStorage = async () => {
        try {
            let username = await AsyncStorage.getItem('username')
            let user = await AsyncStorage.getItem('labelsData');
            let parsed = JSON.parse(user);
            var specificObject = parsed[0]
            // var descriptionLabel = specificObject.labels.find((i) => i.type === 68)
            // var cancelButtonText = specificObject.labels.find((i) => i.type === 65)
            var nextButtonText = specificObject.labels.find((i) => i.type === 62)

            // var message = specificObject.labels.find((i) => i.type === 26)
            // var generalSettings = specificObject.labels.find((i) => i.type === 27)
            // var pension = specificObject.labels.find((i) => i.type === 51)
            // var others = specificObject.labels.find((i) => i.type === 52)
            if (this.state.textLanguageChange === '0') {
                // this.setState({ descriptionLabel: descriptionLabel.nameEnglish })
                // this.setState({ cancelButtonText: cancelButtonText.nameEnglish })
                this.setState({ nextButtonText: nextButtonText.nameEnglish })
                // this.state.data[4].name = message.nameEnglish
                // this.state.data[5].name = generalSettings.nameEnglish
                // this.state.data[6].name = pension.nameEnglish
                // this.state.data[7].name = others.nameEnglish
                // this.setState({ moneyManagerLabel: moneyManagerLabel.nameEnglish })
                // this.setState({ expenseLabel: expenseLabel.nameEnglish })
                // this.setState({ incomeLabel: incomeLabel.nameEnglish })
                // this.setState({ allTransactionLabel: allTransactionLabel.nameEnglish })
            } else if (this.state.textLanguageChange === '1') {
                // this.setState({ descriptionLabel: descriptionLabel.nameHindi })
                // this.setState({ cancelButtonText: cancelButtonText.nameHindi })
                this.setState({ nextButtonText: nextButtonText.nameHindi })
                // this.state.data[4].name = message.nameHindi
                // this.state.data[5].name = generalSettings.nameHindi
                // this.state.data[6].name = pension.nameHindi
                // this.state.data[7].name = others.nameHindi
            } else if (this.state.textLanguageChange === '2') {
                // this.setState({ descriptionLabel: descriptionLabel.nameHo })
                // this.setState({ cancelButtonText: cancelButtonText.nameHo })
                this.setState({ nextButtonText: nextButtonText.nameHo })
                // this.state.data[4].name = message.nameHindi
                // this.state.data[4].name = message.nameHo
                // this.state.data[5].name = generalSettings.nameHo
                // this.state.data[6].name = pension.nameHo
                // this.state.data[7].name = others.nameHo
            } else if (this.state.textLanguageChange === '3') {
                // this.setState({ descriptionLabel: descriptionLabel.nameOdia })
                // this.setState({ cancelButtonText: cancelButtonText.nameOdia })
                this.setState({ nextButtonText: nextButtonText.nameOdia })
                // this.state.data[4].name = message.nameOdia
                // this.state.data[5].name = generalSettings.nameOdia
                // this.state.data[6].name = pension.nameOdia
                // this.state.data[7].name = others.nameOdia
            } else if (this.state.textLanguageChange === '4') {
                // this.setState({ descriptionLabel: descriptionLabel.nameSanthali })
                // this.setState({ cancelButtonText: cancelButtonText.nameSanthali })
                this.setState({ nextButtonText: nextButtonText.nameSanthali })
                // this.state.data[4].name = message.nameSanthali
                // this.state.data[5].name = generalSettings.nameSanthali
                // this.state.data[6].name = pension.nameSanthali
                // this.state.data[7].name = others.nameSanthali
            }
        } catch (error) {
            console.log(error)
        }
    }


    changeLanguage = (id) => {
        //alert(id)
        AsyncStorage.setItem('language', id)
        LanguageChange.setLanguage(id)
        if (this.state.value === 0) {
            this.setState({ title: LanguageChange.wash })
        } else if (this.state.value === 1) {
            this.setState({ title: LanguageChange.health })
        } else if (this.state.value === 2) {
            this.setState({ title: LanguageChange.covid })
        } else if (this.state.value === 3) {
            this.setState({ title: LanguageChange.govtSchemes })
        }
        // this.setState({data : data})
        // this.state.data[0].name = LanguageChange.wash
        // this.state.data[1].name = LanguageChange.health
        // this.state.data[2].name = LanguageChange.covid
        // this.state.data[3].name = LanguageChange.govtSchemes
    }


    getDetailsFromOffline = async () => {
        try {

            let username = await AsyncStorage.getItem('username')
            let user = await AsyncStorage.getItem('offlineData');
            let parsed = JSON.parse(user);
            var specificObject = parsed[0]
            //alert(specificObject.nutrationGraden.length)
            this.setState({ lengthOfData: specificObject.nutrationGraden.length })

            var descri = specificObject.nutrationGraden[this.state.pageCounter]
            this.setState({ screensData: specificObject.nutrationGraden[this.state.pageCounter] })
            console.log(this.state.screensData)
        } catch (error) {
            console.log(error)
        }

        this.setState({ data: descri })

        this.setState({})
    }


    getDetails = async () => {
        this.setState({ isLoading: true })
        var load = true
        var username = await AsyncStorage.getItem('username')
        var token = await AsyncStorage.getItem('token')
        var encodedUsername = base64.encode(username)
        var valueArray = []

        await axios.get(DataAccess.BaseUrl + DataAccess.AccessUrl + DataAccess.ImportantLinks + this.state.value, {
            headers: {
                'Content-type': "accept",
                'X-Information': encodedUsername,
                'Authorization': "POP " + token
            }
        }).then(function (response) {
            if (response.data.status === 1) {
                load = false
            }
            //console.log(response.data.status)
            valueArray = response.data.data
        }).catch(function (error) {
            console.log(error.message)
        })


        if (load === false) {
            this.setState({ isLoading: false })
        }
        this.setState({ data: valueArray })
        //console.log(this.state.data)

    }

    openLink = (link) => {
        Linking.openURL(link)
    }


    goToDetailsPage = (name, description, contentArea) => {
        //alert(category)
        this.props.navigation.navigate({
            name: 'NutritionGardenDetailsScreen',
            params: {
                name: name,
                contentArea: contentArea,
                description: description
            }
        })
    }

    nextButton = () => {
        var length = parseInt(this.state.lengthOfData)
        //alert(length)

        this.state.pageCounter = this.state.pageCounter + 1

        if (this.state.pageCounter === length) {
            this.props.navigation.reset({
                index: 0,
                routes: [{ name: "DashBoardScreen" }]
            })
        } else {
            this.getDetailsFromOffline()
        }
        //alert(this.state.pageCounter)

    }

    setLanguageOnMount = async () => {
        let defaultLanguage = await AsyncStorage.getItem('language')
        if (defaultLanguage === 'en') {
            this.setState({ textLanguageChange: '0' })
        } else if (defaultLanguage === 'hi') {
            this.setState({ textLanguageChange: '1' })
        } else if (defaultLanguage === 'ho') {
            this.setState({ textLanguageChange: '2' })
        } else if (defaultLanguage === 'od') {
            this.setState({ textLanguageChange: '3' })
        } else if (defaultLanguage === 'san') {
            this.setState({ textLanguageChange: '4' })
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
        var valueArray = []
        valueArray = this.state.data
        //console.log(valueArray)
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
                {
                    this.state.isLoading ? <View style={{ justifyContent: 'center', marginTop: heightToDp("20%") }}><CustomIndicator IsLoading={this.state.isLoading} /></View> : null
                }

                <View style={{ backgroundColor: BaseColor.Red, height: heightToDp("50%"), alignSelf: 'center', width: widthToDp("90%"), borderRadius: 10, marginTop: heightToDp('1.5%') }}>
                    <Text style={{ color: "#fff", fontSize: widthToDp("5%"), marginLeft: widthToDp("5%"), marginTop: heightToDp("1%"), fontFamily: 'Oswald-Medium' }}>
                    <LabelComponent
                        directData={true}
                        labelWidth={
                            (
                                (this.state.textLanguageChange==="0" && this.state.screensData.audioEnglish) ||
                                (this.state.textLanguageChange==="1" && this.state.screensData.audioHindi) ||
                                (this.state.textLanguageChange==="2" && this.state.screensData.audioHo) ||
                                (this.state.textLanguageChange==="3" && this.state.screensData.audioOdia) ||
                                (this.state.textLanguageChange==="4" && this.state.screensData.audioSanthali)
                            ) ? 77 : 85
                        }
                        labelName={
                            this.state.textLanguageChange==="0" ? this.state.screensData.nameEnglish :
                            this.state.textLanguageChange==="1" ? this.state.screensData.nameHindi :
                            this.state.textLanguageChange==="2" ? this.state.screensData.nameHo :
                            this.state.textLanguageChange==="3" ? this.state.screensData.nameOdia :
                            this.state.screensData.nameSanthali
                        }
                        isAudioHaving={
                            (
                                (this.state.textLanguageChange==="0" && this.state.screensData.audioEnglish) ||
                                (this.state.textLanguageChange==="1" && this.state.screensData.audioHindi) ||
                                (this.state.textLanguageChange==="2" && this.state.screensData.audioHo) ||
                                (this.state.textLanguageChange==="3" && this.state.screensData.audioOdia) ||
                                (this.state.textLanguageChange==="4" && this.state.screensData.audioSanthali)
                            )
                        }
                        audioFile={
                            this.state.textLanguageChange==="0" ? this.state.screensData.audioEnglish :
                                this.state.textLanguageChange==="1" ? this.state.screensData.audioHindi :
                                this.state.textLanguageChange==="2" ? this.state.screensData.audioHo :
                                this.state.textLanguageChange==="3" ? this.state.screensData.audioOdia :
                                this.state.screensData.audioSanthali
                        }
                    />
                    </Text>
                    <View style={{ backgroundColor: "white", height: heightToDp("45%"), alignSelf: 'center', width: widthToDp("90%"), marginTop: heightToDp('1%'), borderBottomLeftRadius: 10, borderBottomRightRadius: 10 }}>
                        <View style={{}}>
                            <Image
                                source={{ uri: 'file:///storage/emulated/0/Pictures/Pop/image_' + this.state.screensData.imageFile }}
                                style={{ height: heightToDp("15%"), width: widthToDp("80%"), alignSelf: 'center', marginTop: heightToDp("1%"), borderRadius: 10 }}
                            />
                        </View>

                        <ScrollView nestedScrollEnabled>
                            {
                                this.state.textLanguageChange === '0' ? <Text style={{ fontFamily: 'Oswald-Medium', fontSize: widthToDp("4%"), marginLeft: widthToDp("2%") }}>{this.state.screensData.descEnglish}</Text> : ((this.state.textLanguageChange === '1') ? <Text style={{ fontFamily: 'Oswald-Medium', fontSize: widthToDp("4%"), marginLeft: widthToDp("2%") }}>{this.state.screensData.descHindi}</Text> : ((this.state.textLanguageChange === '2') ? <Text style={{ fontFamily: 'Oswald-Medium', fontSize: widthToDp("4%"), marginLeft: widthToDp("2%") }}>{this.state.screensData.descHo}</Text> : ((this.state.textLanguageChange === '3') ? <Text style={{ fontFamily: 'Oswald-Medium', fontSize: widthToDp("4%"), marginLeft: widthToDp("2%") }}>{this.state.screensData.descOdia}</Text> : ((this.state.textLanguageChange === '4') ? <Text style={{ fontFamily: 'Oswald-Medium', fontSize: widthToDp("4%"), marginLeft: widthToDp("2%") }}>{this.state.screensData.descSanthali}</Text> : null))))
                            }
                            <ScrollView 
                                style={{
                                    marginTop: heightToDp("2%"), 
                                    marginLeft: widthToDp("2%"),
                                }}
                                horizontal
                                showsHorizontalScrollIndicator={true}
                            >
                                {
                                    this.state.textLanguageChange === '0' ? <HTML source={{ html: this.state.screensData.contentAreaEnglish || '<p></p>' }} containerStyle={{ elevation: 10 }} contentWidth={widthToDp("100%")} /> : ((this.state.textLanguageChange === '1') ? <HTML source={{ html: this.state.screensData.contentAreaHindi || '<p></p>' }} containerStyle={{ elevation: 10 }} contentWidth={widthToDp("100%")} /> : ((this.state.textLanguageChange === '2') ? <HTML source={{ html: this.state.screensData.contentAreaHo || '<p></p>' }} containerStyle={{ elevation: 10 }} contentWidth={widthToDp("100%")} /> : ((this.state.textLanguageChange === '3') ? <HTML source={{ html: this.state.screensData.contentAreaOdia || '<p></p>' }} containerStyle={{ elevation: 10 }} contentWidth={widthToDp("100%")} /> : ((this.state.textLanguageChange === '4') ? <HTML source={{ html: this.state.screensData.contentAreaSanthali || '<p></p>' }} containerStyle={{ elevation: 10 }} contentWidth={widthToDp("100%")} /> : null))))
                                }
                            </ScrollView>
                            {/* <Text style={{ fontFamily: 'Oswald-Medium', fontSize: widthToDp("4%"), marginLeft: widthToDp("2%") }}>{this.state.screensData.descEnglish}</Text> */}
                            
                            <View style={{ marginTop: heightToDp("2%") }}></View>
                        </ScrollView>
                    </View>
                </View>

                <View style={{ height: heightToDp("10%"), marginTop: heightToDp("3%") }}>
                    <TouchableOpacity onPress={() => this.nextButton()}>
                        <View style={{ backgroundColor: "#fff", height: heightToDp("6%"), width: widthToDp("30%"), borderRadius: 100, alignSelf: 'center', marginTop: heightToDp("2%") }}>
                            <Text style={{ fontSize: widthToDp("4%"), color: "#000", marginTop: heightToDp("1.3%"), alignSelf: 'center', fontFamily: 'Oswald-Medium' }}>{this.state.nextButtonText}</Text>
                        </View>
                    </TouchableOpacity>
                </View>


            </View>
        );
    }
}