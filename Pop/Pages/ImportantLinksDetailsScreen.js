import React, { Component } from 'react'
import { View, Image, TouchableOpacity, FlatList, Linking } from 'react-native'
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
import Hyperlink from 'react-native-hyperlink'
import { ScrollView } from 'react-native-gesture-handler'
import HTML from "react-native-render-html";
import HeaderComponent from '../components/HeaderComponent'

const Sound = require('react-native-sound')


export default class ImportantLinksDetailsScreen extends Component {

    //sound = new Sound('http://commondatastorage.googleapis.com/codeskulptor-assets/jump.ogg')

    constructor(props) {
        super(props)
        this.state = {
            categoryEnglish: '',
            categoryHindi: '',
            categoryOdia: '',
            categoryHo: '',
            categorySanthali: '',
            descEnglish: '',
            descHindi: '',
            descHo: '',
            descOdia: '',
            descSanthali: '',
            languages: [],
            textLanguageChange:''
        }
        this.state.languages = Languages
        this.state.categoryEnglish = this.props.route.params.categoryEnglish
        this.state.categoryHindi = this.props.route.params.categoryHindi
        this.state.categoryOdia = this.props.route.params.categoryOdia
        this.state.categoryHo = this.props.route.params.categoryHo
        this.state.categorySanthali = this.props.route.params.categorySanthali

        this.state.descEnglish = this.props.route.params.descEnglish
        this.state.descHindi = this.props.route.params.descHindi
        this.state.descHo = this.props.route.params.descHo
        this.state.descOdia = this.props.route.params.descOdia
        this.state.descSanthali = this.props.route.params.descSanthali
        
    }

    componentDidMount(){
        this.setLanguageOnMount()
    }


    // changeLanguage = (id) => {
    //     //alert(id)
    //     AsyncStorage.setItem('language',id)
    //     LanguageChange.setLanguage(id)
    //     if(this.state.value === 0){
    //         this.setState({title : LanguageChange.wash})
    //     }else if(this.state.value === 1){
    //         this.setState({title : LanguageChange.health}) 
    //     }else if(this.state.value === 2){
    //         this.setState({title : LanguageChange.covid})
    //     }else if(this.state.value === 3){
    //         this.setState({title : LanguageChange.govtSchemes})
    //     }
    //     // this.setState({data : data})
    //     // this.state.data[0].name = LanguageChange.wash
    //     // this.state.data[1].name = LanguageChange.health
    //     // this.state.data[2].name = LanguageChange.covid
    //     // this.state.data[3].name = LanguageChange.govtSchemes
    // }


    // getDetailsFromOffline = async() => {
    //     try{

    //         let username = await AsyncStorage.getItem('username')
    //         let user = await AsyncStorage.getItem('offlineData');
    //         let parsed = JSON.parse(user);
    //         var specificObject = parsed[0]
    //         var descri = specificObject.importantLinks
    //         console.log(specificObject.importantLinks)
    //     }catch(error){
    //         console.log(error)
    //     }

    //     this.setState({data : descri})
    // }


    // getDetails = async() =>{
    //     this.setState({isLoading:true})
    //     var load = true
    //     var username = await AsyncStorage.getItem('username')
    //     var token = await AsyncStorage.getItem('token')
    //     var encodedUsername = base64.encode(username)
    //     var valueArray = []

    //     await axios.get(DataAccess.BaseUrl + DataAccess.AccessUrl + DataAccess.ImportantLinks+this.state.value, {
    //         headers: {
    //             'Content-type': "accept",
    //             'X-Information': encodedUsername,
    //             'Authorization': "POP " + token
    //         }
    //     }).then(function (response) {
    //         if(response.data.status === 1){
    //             load = false
    //         }
    //         //console.log(response.data.status)
    //         valueArray = response.data.data
    //     }).catch(function (error) {
    //         console.log(error.message)
    //     })


    //     if(load === false){
    //         this.setState({isLoading:false})
    //     }
    //     this.setState({data : valueArray})
    //     //console.log(this.state.data)

    // }

    openLink = (link) => {
        Linking.openURL(link)
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

    // speak = (data) => {
    //     // tts.speak(data)
    //     this.sound.play()
    // }


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
                <Text style={{ marginLeft: widthToDp("3%"), marginTop: heightToDp("2%"), fontSize: widthToDp("7%"), fontFamily: 'Oswald-Medium' }}>{this.state.title}</Text>
                <View style={{ backgroundColor: BaseColor.Red, width: widthToDp("90%"), height: heightToDp("30%"), alignSelf: 'center', marginTop: heightToDp("2%"), borderRadius: 10 }}>
                    {
                        this.state.textLanguageChange === '0' ? <Text style={{ color: 'white', marginLeft: widthToDp("4%"), marginTop: heightToDp('1.5%'), fontSize: widthToDp("5%"), fontFamily: 'Oswald-Medium' }}>{this.state.categoryEnglish}</Text> : ((this.state.textLanguageChange === '1') ? <Text style={{ color: 'white', marginLeft: widthToDp("4%"), marginTop: heightToDp('1.5%'), fontSize: widthToDp("5%"), fontFamily: 'Oswald-Medium' }}>{this.state.categoryHindi}</Text> : ((this.state.textLanguageChange === '2') ? <Text style={{ color: 'white', marginLeft: widthToDp("4%"), marginTop: heightToDp('1.5%'), fontSize: widthToDp("5%"), fontFamily: 'Oswald-Medium' }}>{this.state.categoryHo}</Text> : ((this.state.textLanguageChange === '3') ? <Text style={{ color: 'white', marginLeft: widthToDp("4%"), marginTop: heightToDp('1.5%'), fontSize: widthToDp("5%"), fontFamily: 'Oswald-Medium' }}>{this.state.categoryOdia}</Text> : ((this.state.textLanguageChange === '4') ? <Text style={{ color: 'white', marginLeft: widthToDp("4%"), marginTop: heightToDp('1.5%'), fontSize: widthToDp("5%"), fontFamily: 'Oswald-Medium' }}>{this.state.categorySanthali}</Text> : null))))
                    }
                    
                    <View style={{ backgroundColor: 'white', width: widthToDp("90%"), height: heightToDp("45%"), borderBottomLeftRadius: 10, borderBottomRightRadius: 10, marginTop: heightToDp("2%") }}>
                        <ScrollView>
                            {
                                this.state.textLanguageChange === '0' ? <HTML source={{ html: this.state.descEnglish }} containerStyle={{ elevation: 10, marginTop: heightToDp("2%"), marginLeft: widthToDp("2%") }} /> : ((this.state.textLanguageChange === '1') ? <HTML source={{ html: this.state.descHindi }} containerStyle={{ elevation: 10, marginTop: heightToDp("2%"), marginLeft: widthToDp("2%") }} /> : ((this.state.textLanguageChange === '2') ? <HTML source={{ html: this.state.descHo }} containerStyle={{ elevation: 10, marginTop: heightToDp("2%"), marginLeft: widthToDp("2%") }} /> : ((this.state.textLanguageChange === '3') ? <HTML source={{ html: this.state.descOdia }} containerStyle={{ elevation: 10, marginTop: heightToDp("2%"), marginLeft: widthToDp("2%") }} /> : ((this.state.textLanguageChange === '4') ? <HTML source={{ html: this.state.descSanthali }} containerStyle={{ elevation: 10, marginTop: heightToDp("2%"), marginLeft: widthToDp("2%") }} /> : null))))
                            }
                            {/* <HTML source={{ html: this.state.description }} containerStyle={{ elevation: 10, marginTop: heightToDp("2%"), marginLeft: widthToDp("2%") }} /> */}
                            {/* <Text style={{ color: 'black', marginLeft: widthToDp("4%"), marginTop: heightToDp('1.5%'), fontSize: widthToDp("4%"), fontFamily: 'Oswald-Light' }}>{this.state.description}</Text> */}
                            {/* <Hyperlink linkStyle={{ color: '#2980b9' }} onPress={() => this.openLink(this.state.link)}>
                                <Text style={{ color: 'black', marginLeft: widthToDp("4%"), marginTop: heightToDp('1.5%'), fontSize: widthToDp("4%"), fontFamily: 'Oswald-Light' }}>{this.state.link}</Text>
                            </Hyperlink> */}
                        </ScrollView>
                    </View>
                </View>
            </View>
        );
    }
}