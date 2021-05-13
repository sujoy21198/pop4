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
import LabelComponent from '../components/LabelComponent'
import HeaderComponent from '../components/HeaderComponent'

const Sound = require('react-native-sound')


const data = [
    { name: 'HIGH LAND', code: 'https://shramajeewiki.com/images/English/00214136.jpg' },
    { name: 'MEDIUM LAND', code: 'https://timesofindia.indiatimes.com/thumb/msid-60012970,imgsize-2640154,width-400,resizemode-4/60012970.jpg' },
    { name: 'LOW LAND', code: 'https://www.biggovernment.news/wp-content/uploads/sites/59/2017/06/farmer-plow-field.jpg' }
]

export default class ImportantLinksSubCategoryScreen extends Component {

    sound = new Sound('http://commondatastorage.googleapis.com/codeskulptor-assets/jump.ogg')

    constructor(props) {
        super(props)
        this.state = {
            value: '',
            title: '',
            data: [],
            isLoading: false,
            languages: [],
            textLanguageChange: ''
        }
        this.state.languages = Languages
        this.state.value = this.props.route.params.value
    }

    componentDidMount() {
        //this.getDetails()
        this.getDetailsFromOffline()
        this.setLanguageOnMount()
    }




    getDetailsFromOffline = async () => {
        try {

            let username = await AsyncStorage.getItem('username')
            let user = await AsyncStorage.getItem('offlineData');
            let parsed = JSON.parse(user);
            var specificObject = parsed[0]
            var descri = specificObject.importantLinks
            var filter = descri.filter((i) => i.type === this.state.value)
            console.log(filter)
        } catch (error) {
            console.log(error)
        }

        this.setState({ data: filter })
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


    goToDetailsPage = (categoryEnglish,categoryHindi,categoryOdia,categoryHo,categorySanthali, link, descEnglish , descHindi , descHo , descOdia , descSanthali) => {
        //alert(categoryEnglish)
        this.props.navigation.navigate({
            name: 'ImportantLinksDetailsScreen',
            params: {
                categoryEnglish: categoryEnglish,
                categoryHindi: categoryHindi,
                categoryOdia: categoryOdia,
                categoryHo:categoryHo,
                categorySanthali:categorySanthali,
                descEnglish: descEnglish,
                descHindi:descHindi,
                descHo:descHo,
                descOdia:descOdia,
                descSanthali:descSanthali
            }
        })
    }



    speak = (data) => {
        // tts.speak(data)
        this.sound.play()
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
            <View style={{ backgroundColor: BaseColor.BackgroundColor }}>
                <HeaderComponent
                    navigation={this.props.navigation}
                />

                <View style={{ flexDirection: 'row', marginTop: heightToDp("1%"), marginLeft: widthToDp("1%") }}>
                    <TouchableOpacity onPress={() =>this.languageChangeFunction(this.state.languages[0].id)}>
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
                {
                    this.state.isLoading ? <View style={{ justifyContent: 'center', marginTop: heightToDp("20%") }}><CustomIndicator IsLoading={this.state.isLoading} /></View> : null
                }
                <View>

                    <FlatList
                        data={Object.values(valueArray)}
                        style={{ marginBottom: heightToDp("74%") }}
                        renderItem={({ item }) =>

                            <Card style={{ width: widthToDp("94%"), marginLeft: widthToDp("3%"), height: heightToDp("28%"), marginBottom: heightToDp("1%"), borderRadius: 20, backgroundColor: BaseColor.Red }}>
                                <LabelComponent
                                    directData={true}
                                    labelWidth={
                                        (
                                            (this.state.textLanguageChange==="0" && item.audioEnglish) ||
                                            (this.state.textLanguageChange==="1" && item.audioHindi) ||
                                            (this.state.textLanguageChange==="2" && item.audioHo) ||
                                            (this.state.textLanguageChange==="3" && item.audioOdia) ||
                                            (this.state.textLanguageChange==="4" && item.audioSanthali)
                                        ) ? 77 : 85
                                    }
                                    labelName={
                                        this.state.textLanguageChange==="0" ? item.categoryEnglish :
                                        this.state.textLanguageChange==="1" ? item.categoryHindi :
                                        this.state.textLanguageChange==="2" ? item.categoryHo :
                                        this.state.textLanguageChange==="3" ? item.categoryOdia :
                                        item.categorySanthali
                                    }
                                    isAudioHaving={
                                        (
                                            (this.state.textLanguageChange==="0" && item.audioEnglish) ||
                                            (this.state.textLanguageChange==="1" && item.audioHindi) ||
                                            (this.state.textLanguageChange==="2" && item.audioHo) ||
                                            (this.state.textLanguageChange==="3" && item.audioOdia) ||
                                            (this.state.textLanguageChange==="4" && item.audioSanthali)
                                        )
                                    }
                                    audioFile={
                                        this.state.textLanguageChange==="0" ? item.audioEnglish :
                                            this.state.textLanguageChange==="1" ? item.audioHindi :
                                            this.state.textLanguageChange==="2" ? item.audioHo :
                                            this.state.textLanguageChange==="3" ? item.audioOdia :
                                            item.audioSanthali
                                    }
                                />
                                <TouchableOpacity onPress={() => this.goToDetailsPage(item.categoryEnglish,item.categoryHindi,item.categoryOdia,item.categoryHo,item.categorySanthali, item.link, item.descEnglish , item.descHindi , item.descHo , item.descOdia , item.descSanthali)}>
                                    <Image
                                        style={{ width: widthToDp("93.7%"), height: heightToDp("24%"), marginLeft: widthToDp("0%"), borderRadius: 2, borderBottomLeftRadius: 20, borderBottomRightRadius: 20 }}
                                        source={{ uri: 'file:///storage/emulated/0/Pictures/Pop/image_'+ item.image }}
                                    />
                                </TouchableOpacity>
                            </Card>
                        }
                    />
                </View>
            </View>
        );
    }
}