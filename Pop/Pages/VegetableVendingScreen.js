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

const Sound = require('react-native-sound')

export default class VegetableVendingScreen extends Component {

    sound = new Sound('http://commondatastorage.googleapis.com/codeskulptor-assets/jump.ogg')

    constructor(props) {
        super(props)
        this.state = {
            value: '',
            title: '',
            data: [],
            isLoading: false,
            languages: [],
            screensData: '',
            pageCounter: 0,
            lengthOfData: '',
            textLanguageChange: '',
            smallBusinessLabel:''
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
    

    checkAudioFileExistence = async (audio) => {
        let files = await RNFetchBlob.fs.ls(RNFetchBlob.fs.dirs.PictureDir);
        if(files.includes("/storage/emulated/0/Pictures/image_" + audio)) {
            return true;
        } else {
            return false;
        }
    }
    
    playSound = (audio) => {
        if(this.checkAudioFileExistence(audio)) {
            var sound = new Sound("/storage/emulated/0/Pictures/image_" + audio, Sound.MAIN_BUNDLE, (error) => {
                if (error) {
                    console.log('failed to load the sound', error);
                    return;
                }
                // loaded successfully
                console.log(
                    'duration in seconds: ' + sound.getDuration() + 
                    ', number of channels: ' + sound.getNumberOfChannels()
                );
                
                // Play the sound with an onEnd callback
                sound.play((success) => {
                    if (success) {
                        console.log('successfully finished playing');
                    } else {
                        console.log('playback failed due to audio decoding errors');
                    }
                });
            });
        } else return;
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
          
            var smallBusinessLabel = specificObject.labels.find((i) => i.type === 62)
            
            //var nutrationGraden = specificObject.labels.find((i) => i.type === 31)
            // var message = specificObject.labels.find((i) => i.type === 26)
            // var generalSettings = specificObject.labels.find((i) => i.type === 27)
            // var pension = specificObject.labels.find((i) => i.type === 51)
            // var others = specificObject.labels.find((i) => i.type === 52)
            // High Land: 53
            // Medium Land: 54
            // Low Land: 55
            // Land Type : 56
            if (this.state.textLanguageChange === '0') {
                
                this.setState({smallBusinessLabel : smallBusinessLabel.nameEnglish})
                //this.setState({ landTypeLabel: landTypeLabel.nameEnglish })
                // this.state.data[4].name = message.nameEnglish
                // this.state.data[5].name = generalSettings.nameEnglish
                // this.state.data[6].name = pension.nameEnglish
                // this.state.data[7].name = others.nameEnglish
                // this.setState({ moneyManagerLabel: moneyManagerLabel.nameEnglish })
                // this.setState({ expenseLabel: expenseLabel.nameEnglish })
                // this.setState({ incomeLabel: incomeLabel.nameEnglish })
                // this.setState({ allTransactionLabel: allTransactionLabel.nameEnglish })
            } else if (this.state.textLanguageChange === '1') {
                
                this.setState({smallBusinessLabel : smallBusinessLabel.nameHindi})
                // this.state.data[4].name = message.nameHindi
                // this.state.data[5].name = generalSettings.nameHindi
                // this.state.data[6].name = pension.nameHindi
                // this.state.data[7].name = others.nameHindi
            } else if (this.state.textLanguageChange === '2') {
               
                this.setState({smallBusinessLabel : smallBusinessLabel.nameHo})
                // this.state.data[4].name = message.nameHo
                // this.state.data[5].name = generalSettings.nameHo
                // this.state.data[6].name = pension.nameHo
                // this.state.data[7].name = others.nameHo
            } else if (this.state.textLanguageChange === '3') {
               
                this.setState({smallBusinessLabel : smallBusinessLabel.nameOdia})
                //this.setState({ landTypeLabel: landTypeLabel.nameOdia })
                // this.state.data[4].name = message.nameOdia
                // this.state.data[5].name = generalSettings.nameOdia
                // this.state.data[6].name = pension.nameOdia
                // this.state.data[7].name = others.nameOdia
            } else if (this.state.textLanguageChange === '4') {
                
                this.setState({smallBusinessLabel : smallBusinessLabel.nameSanthali})
               // this.setState({ landTypeLabel: landTypeLabel.nameSanthali })
                // this.state.data[4].name = message.nameSanthali
                // this.state.data[5].name = generalSettings.nameSanthali
                // this.state.data[6].name = pension.nameSanthali
                // this.state.data[7].name = others.nameSanthali
            }

        } catch (error) {
            alert(error)
        }
        this.setState({ crops: specificObject.crops })
    }


    getDetailsFromOffline = async () => {
        try {

            let username = await AsyncStorage.getItem('username')
            let user = await AsyncStorage.getItem('offlineData');
            let parsed = JSON.parse(user);
            var specificObject = parsed[0]
            //alert(specificObject.nutrationGraden.length)
            this.setState({ lengthOfData: specificObject.vegetableVending.length })

            var descri = specificObject.vegetableVending[this.state.pageCounter]
            this.setState({ screensData: specificObject.vegetableVending[this.state.pageCounter] })
            console.log(specificObject.vegetableVending[3])
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



    speak = (data) => {
        // tts.speak(data)
        this.sound.play()
    }

    nextButton = () => {
        var length = parseInt(this.state.lengthOfData)
        //alert(length)

        this.state.pageCounter = this.state.pageCounter + 1

        console.log(this.state.pageCounter,"page counter")
        console.log(length,"length")
        if (this.state.pageCounter === length) {
            this.state.pageCounter = this.state.pageCounter-1
            // this.props.navigation.reset({
            //     index: 0,
            //     routes: [{ name: "DashBoardScreen" }]
            // })
            this.props.navigation.navigate({
                name: 'VegetableVendingFirstTableScreen'
            })
            
        } else {
            this.getDetailsFromOffline()
        }
        //alert(this.state.pageCounter)

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
                    <LabelComponent
                        directData={true}
                        marginVertical={true}
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
                            this.state.textLanguageChange==="0" ? this.state.screensData.titleEnglish :
                                this.state.textLanguageChange==="1" ? this.state.screensData.titleHindi :
                                this.state.textLanguageChange==="2" ? this.state.screensData.titleHo :
                                this.state.textLanguageChange==="3" ? this.state.screensData.titleOdia :
                                this.state.screensData.titleSanthali
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
                    {/* <Text style={{ color: "#fff", fontSize: widthToDp("5%"), marginLeft: widthToDp("5%"), marginTop: heightToDp("1%"), fontFamily: 'Oswald-Medium' }}>{this.state.screensData.titleEnglish}</Text> */}
                    <View style={{ backgroundColor: "white", height: heightToDp("45%"), alignSelf: 'center', width: widthToDp("90%"), borderBottomLeftRadius: 10, borderBottomRightRadius: 10 }}>
                        {/* <View style={{}}>
                            <Image
                                source={{ uri: DataAccess.BaseUrl + DataAccess.NutritionGardenImage + this.state.screensData.imageFile }}
                                style={{ height: heightToDp("15%"), width: widthToDp("80%"), alignSelf: 'center', marginTop: heightToDp("1%"), borderRadius: 10 }}
                            />
                        </View> */}

                        <ScrollView>
                            
                            {
                                this.state.textLanguageChange === '0' ? <HTML source={{ html: this.state.screensData.descriptionEnglish || '<p></p>' }} containerStyle={{ elevation: 10, marginTop: heightToDp("2%"), marginLeft: widthToDp("2%") }} /> : ((this.state.textLanguageChange === '1') ? <HTML source={{ html: this.state.screensData.descriptionHindi || '<p></p>' }} containerStyle={{ elevation: 10, marginTop: heightToDp("2%"), marginLeft: widthToDp("2%") }} /> : ((this.state.textLanguageChange === '2') ? <HTML source={{ html: this.state.screensData.descriptionHo || '<p></p>' }} containerStyle={{ elevation: 10, marginTop: heightToDp("2%"), marginLeft: widthToDp("2%") }} /> : ((this.state.textLanguageChange === '3') ? <HTML source={{ html: this.state.screensData.descriptionOdia || '<p></p>' }} containerStyle={{ elevation: 10, marginTop: heightToDp("2%"), marginLeft: widthToDp("2%") }} /> : ((this.state.textLanguageChange === '4') ? <HTML source={{ html: this.state.screensData.descriptionSanthali || '<p></p>' }} containerStyle={{ elevation: 10, marginTop: heightToDp("2%"), marginLeft: widthToDp("2%") }} /> : null))))
                            }
                            
                            {/* <Text style={{ fontFamily: 'Oswald-Medium', fontSize: widthToDp("4%"), marginLeft: widthToDp("2%") }}>{this.state.screensData.descEnglish}</Text> */}
                            
                            <View style={{ marginTop: heightToDp("2%") }}></View>
                        </ScrollView>
                    </View>
                </View>

                <View style={{ height: heightToDp("10%"), marginTop: heightToDp("6%") }}>
                    <TouchableOpacity onPress={() => this.nextButton()}>
                        <View style={{ backgroundColor: "#fff", height: heightToDp("6%"), width: widthToDp("30%"), borderRadius: 100, alignSelf: 'center', marginTop: heightToDp("2%") }}>
                            <Text style={{ fontSize: widthToDp("4%"), color: "#000", marginTop: heightToDp("1.3%"), alignSelf: 'center', fontFamily: 'Oswald-Medium' }}>{this.state.smallBusinessLabel}</Text>
                        </View>
                    </TouchableOpacity>
                </View>


            </View>
        );
    }
}