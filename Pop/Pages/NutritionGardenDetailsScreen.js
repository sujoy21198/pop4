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


const Sound = require('react-native-sound')


export default class NutritionGardenDetailsScreen extends Component {

    //sound = new Sound('http://commondatastorage.googleapis.com/codeskulptor-assets/jump.ogg')

    constructor(props) {
        super(props)
        this.state = {
            name: '',
            contentArea: '',
            description: '',
            languages: []
        }
        this.state.languages = Languages
        this.state.name = this.props.route.params.name
        this.state.contentArea = this.props.route.params.contentArea
        this.state.description = this.props.route.params.description
        //alert(this.state.value)
    }

    // componentDidMount(){
    //     //this.getDetails()
    //     this.getDetailsFromOffline()
    // }


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
                <View style={{ backgroundColor: 'white', width: widthToDp("100%"), height: heightToDp("13%"), flexDirection: 'row' }}>
                    <View style={{ marginTop: heightToDp("3%"), marginLeft: widthToDp("3%") }}>
                        <TopLogo />
                    </View>
                    <Icon
                        name="home"
                        size={30}
                        style={{ marginTop: heightToDp("4.6%"), marginLeft: widthToDp("45%") }}
                        onPress={() => this.props.navigation.navigate('DashBoardScreen')}
                    />
                    <Icon
                        name="bell"
                        size={30}
                        style={{ marginTop: heightToDp("4.6%"), marginLeft: widthToDp("5%") }}
                        onPress={() => this.props.navigation.navigate('NotificationsScreen')}
                    />
                </View>

                <View style={{ flexDirection: 'row', marginTop: heightToDp("1%"), marginLeft: widthToDp("1%") }}>
                    <TouchableOpacity onPress={() => this.changeLanguage(this.state.languages[0].id)}>
                        <View style={{ backgroundColor: BaseColor.English, width: widthToDp("30%"), height: heightToDp("6%"), marginLeft: widthToDp("2%"), borderRadius: 100, flexDirection: 'row' }}>
                            <Text style={{ color: '#fff', marginTop: heightToDp("1.5%"), fontFamily: 'Oswald-Medium', marginLeft: widthToDp("5%") }}>{this.state.languages[0].value}</Text>
                            <Icon
                                name="microphone"
                                color="white"
                                size={20}
                                style={{ marginTop: heightToDp("1.8%"), marginLeft: widthToDp("6%") }}
                            />
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => this.changeLanguage(this.state.languages[1].id)}>
                        <View style={{ backgroundColor: BaseColor.Hindi, width: widthToDp("30%"), height: heightToDp("6%"), marginLeft: widthToDp("2%"), borderRadius: 100, flexDirection: 'row' }}>
                            <Text style={{ color: '#fff', marginTop: heightToDp("1.7%"), marginLeft: widthToDp("5%"), fontWeight: 'bold', fontSize: widthToDp("4.3%") }}>{this.state.languages[1].value}</Text>
                            <Icon
                                name="microphone"
                                color="white"
                                size={20}
                                style={{ marginTop: heightToDp("1.8%"), marginLeft: widthToDp("9%") }}
                            />
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity >
                        <View style={{ backgroundColor: BaseColor.Ho, width: widthToDp("30%"), height: heightToDp("6%"), marginLeft: widthToDp("2%"), borderRadius: 100, flexDirection: 'row' }}>
                            <Text style={{ color: '#fff', marginTop: heightToDp("1.5%"), marginLeft: widthToDp("5%"), fontWeight: 'bold', fontSize: widthToDp("4.3%") }}>{this.state.languages[2].value}</Text>
                            <Icon
                                name="microphone"
                                color="white"
                                size={20}
                                style={{ marginTop: heightToDp("1.8%"), marginLeft: widthToDp("6.3%") }}
                            />
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={{ flexDirection: 'row', marginTop: heightToDp("1%"), marginLeft: widthToDp("1%"), alignSelf: 'center' }}>
                    <TouchableOpacity onPress={() => this.changeLanguage(this.state.languages[3].id)}>
                        <View style={{ backgroundColor: BaseColor.Uridia, width: widthToDp("30%"), height: heightToDp("6%"), borderRadius: 100, flexDirection: 'row' }}>
                            <Text style={{ color: '#fff', marginTop: heightToDp("1.7%"), marginLeft: widthToDp("4.7%"), fontWeight: 'bold', fontSize: widthToDp("4.3%") }}>{this.state.languages[3].value}</Text>
                            <Icon
                                name="microphone"
                                color="white"
                                size={20}
                                style={{ marginTop: heightToDp("1.8%"), marginLeft: widthToDp("6.9%") }}
                            />
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity >
                        <View style={{ backgroundColor: BaseColor.Santhali, width: widthToDp("30%"), height: heightToDp("6%"), borderRadius: 100, marginLeft: widthToDp("2%"), flexDirection: 'row' }}>
                            <Text style={{ color: '#fff', marginTop: heightToDp("1.7%"), marginLeft: widthToDp("3.4%"), fontWeight: 'bold', fontSize: widthToDp("4.3%") }}>{this.state.languages[4].value}</Text>
                            <Icon
                                name="microphone"
                                color="white"
                                size={20}
                                style={{ marginTop: heightToDp("1.8%"), marginLeft: widthToDp("3%") }}
                            />
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={{ borderBottomColor: BaseColor.Stroke, borderBottomWidth: 1, marginTop: heightToDp('1.5%'), width: widthToDp("100%") }}></View>
                <Text style={{ marginLeft: widthToDp("3%"), marginTop: heightToDp("2%"), fontSize: widthToDp("7%"), fontFamily: 'Oswald-Medium' }}>{this.state.title}</Text>
                <View style={{ backgroundColor: BaseColor.Red, width: widthToDp("90%"), height: heightToDp("30%"), alignSelf: 'center', marginTop: heightToDp("2%"), borderRadius: 10 }}>
                    <Text style={{ color: 'white', marginLeft: widthToDp("4%"), marginTop: heightToDp('1.5%'), fontSize: widthToDp("5%"), fontFamily: 'Oswald-Medium' }}>{this.state.name}</Text>
                    <View style={{ backgroundColor: 'white', width: widthToDp("90%"), height: heightToDp("45%"), borderBottomLeftRadius: 10, borderBottomRightRadius: 10, marginTop: heightToDp("2%") }}>
                        <ScrollView>
                            <Text style={{ color: 'black', marginLeft: widthToDp("4%"), marginTop: heightToDp('1.5%'), fontSize: widthToDp("4%"), fontFamily: 'Oswald-Light' }}>{this.state.description}</Text>
                            {/* <Hyperlink linkStyle={{ color: '#2980b9' }} onPress={() => this.openLink(this.state.link)}>
                            <Text style={{ color: 'black', marginLeft: widthToDp("4%"), marginTop: heightToDp('1.5%'), fontSize: widthToDp("4%"), fontFamily: 'Oswald-Light' }}>{this.state.containArea}</Text>
                        </Hyperlink> */}
                            <HTML source={{ html: this.state.contentArea }} containerStyle={{elevation:10,marginTop:heightToDp("2%"),marginLeft:widthToDp("2%")}} />
                        </ScrollView>
                    </View>
                </View>
            </View>
        );
    }
}