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
    { categoryEnglish: '', imageFile: '77495442.jpg', categoryHindi: '', categoryOdia: '', categoryHo: '', categorySanthali: '' },
    { categoryEnglish: '', categoryHindi: '', categoryOdia: '', categoryHo: '', categorySanthali: '', imageFile: 'bec5b458e58186bc132ec3e9851e2e14--india-travel-incredible-india.jpg' },
    { categoryEnglish: '', categoryHindi: '', categoryOdia: '', categoryHo: '', categorySanthali: '', imageFile: 'dry_fish_selling-1.jpg' }
]

export default class SmallBusinessScreen extends Component {


    constructor(props) {
        super(props)
        this.state = {
            data: [],
            languages: [],
            smallBusinessLabel: '',
            _id:''
        }

        this.state.languages = Languages
        this.state.data = data

    }

    componentDidMount() {
        this.setLanguageOnMount()
        this.loadlabelsFromStorage()
        this.getOfflineData()
    }

    getOfflineData = async () => {
        try {
            let username = await AsyncStorage.getItem('username')
            let user = await AsyncStorage.getItem('smallBusiness');
            let parsed = JSON.parse(user);
            var specificObject = parsed[0].smallBusinessCategory
            
            var check = specificObject.find((i) => i)
            //console.log(check._id,"small busineieieie")
            if (check != undefined) {
                var totalArray = this.state.data.concat(specificObject.find((i) => i))
                //console.log(totalArray, "jojo adventure")
                this.setState({ data: totalArray })
            }else{
                this.setState({data:data})
            }
            //console.log(check, "lololo")

        } catch (error) {
            console.log(error)
        }
    }




    selectCategory = (data,id , expectedAnalysis) => {
        //alert(expectedAnalysis)
        if (data === this.state.data[0].categoryEnglish) {
            this.props.navigation.navigate({
                name: 'VegetableVendingScreen',
                params: { value: 0 }
            })
        } else if (data === this.state.data[1].categoryEnglish) {
            this.props.navigation.navigate({
                name: 'SmallGroceryShopScreen',
                params: { value: 0 }
            })
        } else if (data === this.state.data[2].categoryEnglish) {
            this.props.navigation.navigate({
                name: 'DryFishScreen',
                params: { value: 0 }
            })
        }else if(expectedAnalysis === true || expectedAnalysis === false){
            this.props.navigation.navigate({
                name: 'SmallBusinessDetailsScreen',
                params: { value: id }
            })
        }

    }


    // selectLandType = (data) => {
    //     if (data === LanguageChange.wash) {
    //         this.props.navigation.navigate({
    //             name: 'ImportantLinksSubCategoryScreen',
    //             params: { value: 0 }
    //         })
    //     } else if (data === LanguageChange.health) {
    //         this.props.navigation.navigate({
    //             name: 'ImportantLinksSubCategoryScreen',
    //             params: { value: 1 }
    //         })
    //     } else if (data === LanguageChange.covid) {
    //         this.props.navigation.navigate({
    //             name: 'ImportantLinksSubCategoryScreen',
    //             params: { value: 2 }
    //         })
    //     } else if (data === LanguageChange.govtSchemes) {
    //         this.props.navigation.navigate({
    //             name: 'ImportantLinksSubCategoryScreen',
    //             params: { value: 3 }
    //         })
    //     }
    // }
    loadlabelsFromStorage = async () => {
        try {
            let username = await AsyncStorage.getItem('username')
            let user = await AsyncStorage.getItem('labelsData');
            let parsed = JSON.parse(user);
            var specificObject = parsed[0]
            var vegetableVending = specificObject.labels.find((i) => i.type === 98)
            var smallGroceryShop = specificObject.labels.find((i) => i.type === 99)
            var dryFishSelling = specificObject.labels.find((i) => i.type === 100)
            var smallBusinessLabel = specificObject.labels.find((i) => i.type === 30)
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
                this.state.data[0].categoryEnglish = vegetableVending.nameEnglish
                this.state.data[1].categoryEnglish = smallGroceryShop.nameEnglish
                this.state.data[2].categoryEnglish = dryFishSelling.nameEnglish
                this.setState({smallBusinessLabel: smallBusinessLabel.nameEnglish})
                // this.state.data[3].categoryEnglish = smallBusinessLabel.nameEnglish
                this.state.data[0].audioEnglish = vegetableVending.audioEnglish
                this.state.data[1].audioEnglish = smallGroceryShop.audioEnglish
                this.state.data[2].audioEnglish = dryFishSelling.audioEnglish
                // this.state.data[3].audioEnglish = smallBusinessLabel.audioEnglish
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
                this.state.data[0].categoryHindi = vegetableVending.nameHindi
                this.state.data[1].categoryHindi = smallGroceryShop.nameHindi
                this.state.data[2].categoryHindi = dryFishSelling.nameHindi
                this.setState({smallBusinessLabel: smallBusinessLabel.nameEnglish})
                // this.state.data[3].categoryHindi = smallBusinessLabel.nameHindi
                this.state.data[0].audioHindi = vegetableVending.audioHindi
                this.state.data[1].audioHindi = smallGroceryShop.audioHindi
                this.state.data[2].audioHindi = dryFishSelling.audioHindi
                // this.state.data[3].audioHindi = smallBusinessLabel.audioHindi
                // this.state.data[4].name = message.nameHindi
                // this.state.data[5].name = generalSettings.nameHindi
                // this.state.data[6].name = pension.nameHindi
                // this.state.data[7].name = others.nameHindi
            } else if (this.state.textLanguageChange === '2') {
                this.state.data[0].categoryHo = vegetableVending.nameHo
                this.state.data[1].categoryHo = smallGroceryShop.nameHo
                this.state.data[2].categoryHo = dryFishSelling.nameHo
                this.setState({smallBusinessLabel: smallBusinessLabel.nameEnglish})
                // this.state.data[3].categoryHo = smallBusinessLabel.nameHo
                this.state.data[0].audioHo = vegetableVending.audioHo
                this.state.data[1].audioHo = smallGroceryShop.audioHo
                this.state.data[2].audioHo = dryFishSelling.audioHo
                // this.state.data[3].audioHo = smallBusinessLabel.audioHo
                // this.state.data[4].name = message.nameHo
                // this.state.data[5].name = generalSettings.nameHo
                // this.state.data[6].name = pension.nameHo
                // this.state.data[7].name = others.nameHo
            } else if (this.state.textLanguageChange === '3') {
                this.state.data[0].categoryOdia = vegetableVending.nameOdia
                this.state.data[1].categoryOdia = smallGroceryShop.nameOdia
                this.state.data[2].categoryOdia = dryFishSelling.nameOdia
                this.setState({smallBusinessLabel: smallBusinessLabel.nameEnglish})
                // this.state.data[3].categoryOdia = smallBusinessLabel.nameOdia
                this.state.data[0].audioOdia = vegetableVending.audioOdia
                this.state.data[1].audioOdia = smallGroceryShop.audioOdia
                this.state.data[2].audioOdia = dryFishSelling.audioOdia
                // this.state.data[3].audioOdia = smallBusinessLabel.audioOdia
                //this.setState({ landTypeLabel: landTypeLabel.nameOdia })
                // this.state.data[4].name = message.nameOdia
                // this.state.data[5].name = generalSettings.nameOdia
                // this.state.data[6].name = pension.nameOdia
                // this.state.data[7].name = others.nameOdia
            } else if (this.state.textLanguageChange === '4') {
                this.state.data[0].categorySanthali = vegetableVending.nameSanthali
                this.state.data[1].categorySanthali = smallGroceryShop.nameSanthali
                this.state.data[2].categorySanthali = dryFishSelling.nameSanthali
                this.setState({smallBusinessLabel: smallBusinessLabel.nameEnglish})
                // this.state.data[3].categorySanthali = smallBusinessLabel.nameSanthali
                this.state.data[0].audioSanthali = vegetableVending.audioSanthali
                this.state.data[1].audioSanthali = smallGroceryShop.audioSanthali
                this.state.data[2].audioSanthali = dryFishSelling.audioSanthali
                // this.state.data[3].audioSanthali = smallBusinessLabel.audioSanthali
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

    render() {
        var data = []
        data = this.state.data
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
                <Text style={{ marginLeft: widthToDp("3%"), marginTop: heightToDp("2%"), fontSize: widthToDp("7%"), fontFamily: 'Oswald-Medium' }}>{this.state.smallBusinessLabel}</Text>

                <View>

                    <FlatGrid
                        style={{ marginTop: heightToDp("2%"), marginBottom: heightToDp("75%") }}
                        bounces={true}
                        itemDimension={130}
                        data={this.state.data}
                        bouncesZoom={true}
                        renderItem={({ item, index }) => (
                            <TouchableOpacity onPress={() => this.selectCategory(item.categoryEnglish,item._id , item.expectedAnalysis)}>
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
                                            ) ? 35 : 40
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
                                    <Image
                                        style={{ width: widthToDp("47%"), height: heightToDp("25%"), borderBottomLeftRadius: 10, borderBottomRightRadius: 10, marginTop: heightToDp("0%") }}
                                        source={{ uri: 'file:///storage/emulated/0/Pictures/Pop/image_' + item.imageFile }}
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