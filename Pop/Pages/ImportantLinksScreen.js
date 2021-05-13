import React, { Component } from 'react'
import { View, Image, TouchableOpacity, FlatList } from 'react-native'
import BaseColor from '../Core/BaseTheme'
import { Card, Text } from 'native-base'
import TopLogo from '../assets/TopLogo'
import { widthToDp, heightToDp } from '../Responsive'
import { FlatGrid, SectionGrid } from 'react-native-super-grid'
import Icon from 'react-native-vector-icons/FontAwesome'
import tts from 'react-native-tts'
import Languages from '../Core/Languages'
import LanguageChange from '../Core/LanguageChange'
import AsyncStorage from '@react-native-async-storage/async-storage'
import LabelComponent from '../components/LabelComponent'
import HeaderComponent from '../components/HeaderComponent'


const data = [
    { name: 'WASH', code: 'GettyImages-514363103-medium.jpg' },
    { name: 'HEALTH', code: 'Cardiology-1.jpg' },
    { name: 'COVID', code: 'covid---19-afbeelding.jpg' },
    { name: 'GOVT SCHEMES', code: 'indian-health-care.jpg' }
]

export default class ImportantLinksScreen extends Component {


    constructor(props) {
        super(props)
        this.state = {
            data: [],
            languages: []
        }

        this.state.languages = Languages
        this.state.data = data
        // this.state.data[0].name = LanguageChange.wash
        // this.state.data[1].name = LanguageChange.health
        // this.state.data[2].name = LanguageChange.covid
        // this.state.data[3].name = LanguageChange.govtSchemes
    }

    componentDidMount(){
        this.setLanguageOnMount()
    }

    // changeLanguage = (id) => {
    //     //alert(id)
    //     AsyncStorage.setItem('language',id)
    //     LanguageChange.setLanguage(id)
    //     this.setState({data : data})
    //     this.state.data[0].name = LanguageChange.wash
    //     this.state.data[1].name = LanguageChange.health
    //     this.state.data[2].name = LanguageChange.covid
    //     this.state.data[3].name = LanguageChange.govtSchemes
    // }


    selectLandType = (data) => {
        if (data === this.state.data[0].name) {
            this.props.navigation.navigate({
                name: 'ImportantLinksSubCategoryScreen',
                params: { value: 0 }
            })
        } else if (data === this.state.data[1].name) {
            this.props.navigation.navigate({
                name: 'ImportantLinksSubCategoryScreen',
                params: { value: 1 }
            })
        } else if (data === this.state.data[2].name) {
            this.props.navigation.navigate({
                name: 'ImportantLinksSubCategoryScreen',
                params: { value: 2 }
            })
        } else if (data === this.state.data[3].name) {
            this.props.navigation.navigate({
                name: 'ImportantLinksSubCategoryScreen',
                params: { value: 3 }
            })
        }
    }

    loadlabelsFromStorage = async () => {
        try {
            let username = await AsyncStorage.getItem('username')
            let user = await AsyncStorage.getItem('labelsData');
            let parsed = JSON.parse(user);
            var specificObject = parsed[0]
            var wash = specificObject.labels.find((i) => i.type === 32)
            var health = specificObject.labels.find((i) => i.type === 33)
            var covid = specificObject.labels.find((i) => i.type === 34)
            var governmentSchemes = specificObject.labels.find((i) => i.type === 35)
        
            if (this.state.textLanguageChange === '0') {
                this.state.data[0].name = wash.nameEnglish
                this.state.data[1].name = health.nameEnglish
                this.state.data[2].name = covid.nameEnglish
                this.state.data[3].name = governmentSchemes.nameEnglish
                this.state.data[0].audioEnglish = wash.audioEnglish
                this.state.data[1].audioEnglish = health.audioEnglish
                this.state.data[2].audioEnglish = covid.audioEnglish
                this.state.data[3].audioEnglish = governmentSchemes.audioEnglish
                
                // this.setState({ moneyManagerLabel: moneyManagerLabel.nameEnglish })
                // this.setState({ expenseLabel: expenseLabel.nameEnglish })
                // this.setState({ incomeLabel: incomeLabel.nameEnglish })
                // this.setState({ allTransactionLabel: allTransactionLabel.nameEnglish })
            } else if (this.state.textLanguageChange === '1') {
                this.state.data[0].name = wash.nameHindi
                this.state.data[1].name = health.nameHindi
                this.state.data[2].name = covid.nameHindi
                this.state.data[3].name = governmentSchemes.nameHindi
                this.state.data[0].audioHindi = wash.audioHindi
                this.state.data[1].audioHindi = health.audioHindi
                this.state.data[2].audioHindi = covid.audioHindi
                this.state.data[3].audioHindi = governmentSchemes.audioHindi
                
            } else if (this.state.textLanguageChange === '2') {
                this.state.data[0].name = wash.nameHo
                this.state.data[1].name = health.nameHo
                this.state.data[2].name = covid.nameHo
                this.state.data[3].name = governmentSchemes.nameHo
                this.state.data[0].audioHo = wash.audioHo
                this.state.data[1].audioHo = health.audioHo
                this.state.data[2].audioHo = covid.audioHo
                this.state.data[3].audioHo = governmentSchemes.audioHo
                
            } else if (this.state.textLanguageChange === '3') {
                this.state.data[0].name = wash.nameOdia
                this.state.data[1].name = health.nameOdia
                this.state.data[2].name = covid.nameOdia
                this.state.data[3].name = governmentSchemes.nameOdia
                this.state.data[0].audioOdia = wash.audioOdia
                this.state.data[1].audioOdia = health.audioOdia
                this.state.data[2].audioOdia = covid.audioOdia
                this.state.data[3].audioOdia = governmentSchemes.audioOdia
                
            } else if (this.state.textLanguageChange === '4') {
                this.state.data[0].name = wash.nameSanthali
                this.state.data[1].name = health.nameSanthali
                this.state.data[2].name = covid.nameSanthali
                this.state.data[3].name = governmentSchemes.nameSanthali
                this.state.data[0].audioSanthali = wash.audioSanthali
                this.state.data[1].audioSanthali = health.audioSanthali
                this.state.data[2].audioSanthali = covid.audioSanthali
                this.state.data[3].audioSanthali = governmentSchemes.audioSanthali
               
            }
            
        } catch (error) {
            alert(error)
        }
        this.setState({ crops: specificObject.crops })
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
            AsyncStorage.setItem('language', 'hi')
            this.loadlabelsFromStorage()
            this.props.navigation.reset({
                index: 0,
                routes: [{ name: "DashBoardScreen" }]
            });
        } else if (data === 'ho') {
            this.setState({ textLanguageChange: '2' })
            AsyncStorage.setItem('language', 'ho')
            this.loadlabelsFromStorage()
            this.props.navigation.reset({
                index: 0,
                routes: [{ name: "DashBoardScreen" }]
            });
        } else if (data === 'od') {
            this.setState({ textLanguageChange: '3' })
            AsyncStorage.setItem('language', 'od')
            this.loadlabelsFromStorage()
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
    
    render() {
        return (
            <View style={{ backgroundColor: BaseColor.BackgroundColor }}>
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
                <Text style={{ marginLeft: widthToDp("3%"), marginTop: heightToDp("2%"), fontSize: widthToDp("7%"), fontFamily: 'Oswald-Medium' }}>{LanguageChange.importantLinks}</Text>

                <View>

                    <FlatGrid
                        style={{ marginTop: heightToDp("2%"), marginBottom: heightToDp("75%") }}
                        bounces={true}
                        itemDimension={130}
                        data={data}
                        bouncesZoom={true}
                        renderItem={({ item }) => (
                            <TouchableOpacity onPress={() => this.selectLandType(item.name)}>
                                <View style={{ backgroundColor: BaseColor.Red, width: widthToDp("47%"), height: heightToDp("30%"), elevation: 10, borderRadius: 10 }}>
                                    <LabelComponent
                                        directData={true}
                                        labelWidth={
                                            (
                                                (this.state.textLanguageChange==="0" && item.audioEnglish) ||
                                                (this.state.textLanguageChange==="1" && item.audioHindi) ||
                                                (this.state.textLanguageChange==="2" && item.audioHo) ||
                                                (this.state.textLanguageChange==="3" && item.audioOdia) ||
                                                (this.state.textLanguageChange==="4" && item.audioSanthali)
                                            ) ? 35 : 50
                                        }
                                        labelName={item.name}
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
                                    <Image
                                        style={{ width: widthToDp("47%"), height: heightToDp("25%"), borderBottomLeftRadius: 10, borderBottomRightRadius: 10, marginTop: heightToDp("0%") }}
                                        source={{ uri: 'file:///storage/emulated/0/Pictures/Pop/image_' + item.code }}
                                    />
                                </View>

                            </TouchableOpacity>
                        )}
                    />
                </View>
            </View>
        );
    }
}