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
import HeaderComponent from '../components/HeaderComponent'
import LabelComponent from '../components/LabelComponent'


const data = [
    { name: 'AGRICULTURE', nameEnglish: 'Agriculture', code: 'Swatantra.jpg' },
    { name: 'LIVESTOCK', nameEnglish: 'Live Stock', code: 'Dairy-Entrepreneurship-Development-Scheme.jpg' },
    { name: 'SMALL BUSINESS', nameEnglish: 'Small Business', code: '71bd57d80e04f91d53641835ce6d7acc.png' },
    { name: 'HEALTH', nameEnglish: 'Health', code: 'homepageicons-03.png' },
    { name: 'EDUCATION', nameEnglish: 'Education', code: 'ee4f4f12-e6ec-45ac-94df-b90b4b022903-aaf6257f767b.jpeg' },
    { name: 'LOAN SAVINGS', nameEnglish: 'Loan Savings', code: 'Loans-1.webp' },
    { name: 'PENSION', nameEnglish: 'Pension', code: 'pension-plan.jpg' },
    { name: 'OTHERS', nameEnglish: 'Others', code: 'others-design-sketch-name.png' },
]

export default class MoneyManagerCategoriesScreen extends Component {


    constructor(props) {
        super(props)
        this.state = {
            data: [],
            languages: [],
            type:'',
            textLanguageChange:''
        }

        this.state.languages = Languages
        this.state.data = data
        this.state.type = this.props.route.params.type
        //alert(this.state.type)
    }
    componentDidMount(){
        this.loadlabelsFromStorage()
        this.setLanguageOnMount()
    }

    loadlabelsFromStorage = async () => {
        try {
            let username = await AsyncStorage.getItem('username')
            let user = await AsyncStorage.getItem('labelsData');
            let parsed = JSON.parse(user);
            var specificObject = parsed[0]
            var agriculture = specificObject.labels.find((i) => i.type === 47)
            var livestock = specificObject.labels.find((i) => i.type === 29)
            var smallBusiness = specificObject.labels.find((i) => i.type === 30)
            var health = specificObject.labels.find((i) => i.type === 33)
            var education = specificObject.labels.find((i) => i.type === 49)
            var loanSavings = specificObject.labels.find((i) => i.type === 50)
            var pension = specificObject.labels.find((i) => i.type === 51)
            var others = specificObject.labels.find((i) => i.type === 52)
            if (this.state.textLanguageChange === '0') {
                this.state.data[0].name = agriculture.nameEnglish
                this.state.data[1].name = livestock.nameEnglish
                this.state.data[2].name = smallBusiness.nameEnglish
                this.state.data[3].name = health.nameEnglish
                this.state.data[4].name = education.nameEnglish
                this.state.data[5].name = loanSavings.nameEnglish
                this.state.data[6].name = pension.nameEnglish
                this.state.data[7].name = others.nameEnglish
                this.state.data[0].audioEnglish = agriculture.audioEnglish
                this.state.data[1].audioEnglish = livestock.audioEnglish
                this.state.data[2].audioEnglish = smallBusiness.audioEnglish
                this.state.data[3].audioEnglish = health.audioEnglish
                this.state.data[4].audioEnglish = education.audioEnglish
                this.state.data[5].audioEnglish = loanSavings.audioEnglish
                this.state.data[6].audioEnglish = pension.audioEnglish
                this.state.data[7].audioEnglish = others.audioEnglish
                // this.setState({ moneyManagerLabel: moneyManagerLabel.nameEnglish })
                // this.setState({ expenseLabel: expenseLabel.nameEnglish })
                // this.setState({ incomeLabel: incomeLabel.nameEnglish })
                // this.setState({ allTransactionLabel: allTransactionLabel.nameEnglish })
            } else if (this.state.textLanguageChange === '1') {
                this.state.data[0].name = agriculture.nameHindi
                this.state.data[1].name = livestock.nameHindi
                this.state.data[2].name = smallBusiness.nameHindi
                this.state.data[3].name = health.nameHindi
                this.state.data[4].name = education.nameHindi
                this.state.data[5].name = loanSavings.nameHindi
                this.state.data[6].name = pension.nameHindi
                this.state.data[7].name = others.nameHindi
                this.state.data[0].audioHindi = agriculture.audioHindi
                this.state.data[1].audioHindi = livestock.audioHindi
                this.state.data[2].audioHindi = smallBusiness.audioHindi
                this.state.data[3].audioHindi = health.audioHindi
                this.state.data[4].audioHindi = education.audioHindi
                this.state.data[5].audioHindi = loanSavings.audioHindi
                this.state.data[6].audioHindi = pension.audioHindi
                this.state.data[7].audioHindi = others.audioHindi
            } else if (this.state.textLanguageChange === '2') {
                this.state.data[0].name = agriculture.nameHo
                this.state.data[1].name = livestock.nameHo
                this.state.data[2].name = smallBusiness.nameHo
                this.state.data[3].name = health.nameHo
                this.state.data[4].name = education.nameHo
                this.state.data[5].name = loanSavings.nameHo
                this.state.data[6].name = pension.nameHo
                this.state.data[7].name = others.nameHo
                this.state.data[0].audioHo = agriculture.audioHo
                this.state.data[1].audioHo = livestock.audioHo
                this.state.data[2].audioHo = smallBusiness.audioHo
                this.state.data[3].audioHo = health.audioHo
                this.state.data[4].audioHo = education.audioHo
                this.state.data[5].audioHo = loanSavings.audioHo
                this.state.data[6].audioHo = pension.audioHo
                this.state.data[7].audioHo = others.audioHo
            } else if (this.state.textLanguageChange === '3') {
                this.state.data[0].name = agriculture.nameOdia
                this.state.data[1].name = livestock.nameOdia
                this.state.data[2].name = smallBusiness.nameOdia
                this.state.data[3].name = health.nameOdia
                this.state.data[4].name = education.nameOdia
                this.state.data[5].name = loanSavings.nameOdia
                this.state.data[6].name = pension.nameOdia
                this.state.data[7].name = others.nameOdia
                this.state.data[0].audioOdia = agriculture.audioOdia
                this.state.data[1].audioOdia = livestock.audioOdia
                this.state.data[2].audioOdia = smallBusiness.audioOdia
                this.state.data[3].audioOdia = health.audioOdia
                this.state.data[4].audioOdia = education.audioOdia
                this.state.data[5].audioOdia = loanSavings.audioOdia
                this.state.data[6].audioOdia = pension.audioOdia
                this.state.data[7].audioOdia = others.audioOdia
            } else if (this.state.textLanguageChange === '4') {
                this.state.data[0].name = agriculture.nameSanthali
                this.state.data[1].name = livestock.nameSanthali
                this.state.data[2].name = smallBusiness.nameSanthali
                this.state.data[3].name = health.nameSanthali
                this.state.data[4].name = education.nameSanthali
                this.state.data[5].name = loanSavings.nameSanthali
                this.state.data[6].name = pension.nameSanthali
                this.state.data[7].name = others.nameSanthali
                this.state.data[0].audioSanthali = agriculture.audioSanthali
                this.state.data[1].audioSanthali = livestock.audioSanthali
                this.state.data[2].audioSanthali = smallBusiness.audioSanthali
                this.state.data[3].audioSanthali = health.audioSanthali
                this.state.data[4].audioSanthali = education.audioSanthali
                this.state.data[5].audioSanthali = loanSavings.audioSanthali
                this.state.data[6].audioSanthali = pension.audioSanthali
                this.state.data[7].audioSanthali = others.audioSanthali
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

    


    selectLandType = (data, nameEnglish) => {
        if (data === this.state.data[0].name) {
            this.props.navigation.navigate({
                name: 'IncomeScreen',
                params: { category: this.state.data[0].name , type : this.state.type, nameEnglish, profitType: this.props.route.params.profitType }
            })
        } else if (data === this.state.data[1].name) {
            this.props.navigation.navigate({
                name: 'IncomeScreen',
                params: { category: this.state.data[1].name , type : this.state.type, nameEnglish, profitType: this.props.route.params.profitType}
            })
        } else if (data === this.state.data[2].name) {
            this.props.navigation.navigate({
                name: 'IncomeScreen',
                params: { category: this.state.data[2].name, type : this.state.type, nameEnglish, profitType: this.props.route.params.profitType }
            })
        } else if (data === this.state.data[3].name) {
            this.props.navigation.navigate({
                name: 'IncomeScreen',
                params: { category: this.state.data[3].name , type : this.state.type, nameEnglish, profitType: this.props.route.params.profitType}
            })
        }else if (data === this.state.data[4].name) {
            this.props.navigation.navigate({
                name: 'IncomeScreen',
                params: { category: this.state.data[4].name , type : this.state.type, nameEnglish, profitType: this.props.route.params.profitType}
            })
        }else if (data === this.state.data[5].name) {
            this.props.navigation.navigate({
                name: 'IncomeScreen',
                params: { category: this.state.data[5].name , type : this.state.type, nameEnglish, profitType: this.props.route.params.profitType}
            })
        }else if (data === this.state.data[6].name) {
            this.props.navigation.navigate({
                name: 'IncomeScreen',
                params: { category:this.state.data[6].name, type : this.state.type, nameEnglish, profitType: this.props.route.params.profitType }
            })
        }else if (data === this.state.data[7].name) {
            this.props.navigation.navigate({
                name: 'IncomeScreen',
                params: { category: this.state.data[7].name, type : this.state.type, nameEnglish, profitType: this.props.route.params.profitType }
            })
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
                <View>

                    <FlatGrid
                        style={{ marginTop: heightToDp("2%"), marginBottom: heightToDp("60%") }}
                        bounces={true}
                        itemDimension={130}
                        data={this.state.data}
                        bouncesZoom={true}
                        renderItem={({ item }) => (
                            <TouchableOpacity onPress={() => this.selectLandType(item.name, item.nameEnglish)}>
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
                                        source={{ uri: 'file:///storage/emulated/0/Pictures/Pop/image_' +item.code }}
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