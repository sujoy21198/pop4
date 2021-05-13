import React, { Component } from 'react'
import { View, Image, TouchableOpacity } from 'react-native'
import BaseColor from '../Core/BaseTheme'
import { Text } from 'native-base'
import TopLogo from '../assets/TopLogo'
import { widthToDp, heightToDp } from '../Responsive'
import { FlatGrid, SectionGrid } from 'react-native-super-grid'
import Icon from 'react-native-vector-icons/FontAwesome'
import Languages from '../Core/Languages'
import LanguageChange from '../Core/LanguageChange'
import AsyncStorage from '@react-native-async-storage/async-storage'
import LabelComponent from '../components/LabelComponent'
import RNFetchBlob from 'rn-fetch-blob'
import HeaderComponent from '../components/HeaderComponent'

const data = [
    { name: 'CROPS', code: 'Evsaf-4UcAMrsvC.jpg' },
    { name: 'LIVESTOCK', code: 'Dairy-Entrepreneurship-Development-Scheme.jpg' },
    { name: 'SMALL BUSINESS', code: 'handicrafts_small_business.jpg' },
    { name: 'NUTRITION GARDEN', code: 'bien-toi-thanh-dau-9-loi-ich-vo-cung-bat-ngo-ban-nen-biet_5.jpg' }
]

export default class KnowledgeCenterScreen extends Component {
    
    constructor(props){
        super(props)
        this.state={
            languages:[],
            data:[],
            textLanguageChange : '',
            knowledgeCenterLabel:''
        }
        this.state.languages = Languages
        this.state.data = data
        // this.state.data[0].name = LanguageChange.crops
        // this.state.data[1].name = LanguageChange.livestock
        // this.state.data[2].name = LanguageChange.smallBusiness
        // this.state.data[3].name = LanguageChange.nutrition
    }

    componentDidMount(){
        this.setLanguageOnMount()
    }
    // changeLanguage = (id) => {
    //     //alert(id)
    //     AsyncStorage.setItem('language',id)
    //     LanguageChange.setLanguage(id)
    //     this.setState({data : data})
    //     this.state.data[0].name = LanguageChange.crops
    //     this.state.data[1].name = LanguageChange.livestock
    //     this.state.data[2].name = LanguageChange.smallBusiness
    //     this.state.data[3].name = LanguageChange.nutrition
        // this.props.navigation.reset({
        //     index: 0,
        //     routes: [{ name: "DashBoardScreen" }]
        // });
        
    // }


    checkNavigation = (data) => {
        //alert(data)
        if(data === this.state.data[0].name){
            this.props.navigation.navigate({
                name: 'CropsScreen'
            })
        }else if(data === this.state.data[1].name){
            this.props.navigation.navigate({
                name:"LiveStockScreen"
            })
        }else if(data === this.state.data[3].name){
            this.props.navigation.navigate({
                name:"NutritionGardenScreen"
            })
        }else if(data === this.state.data[2].name){
            this.props.navigation.navigate({
                name:"SmallBusinessScreen"
            })
        }
    }

    loadlabelsFromStorage = async () => {
        try {
            let username = await AsyncStorage.getItem('username')
            let user = await AsyncStorage.getItem('labelsData');
            let parsed = JSON.parse(user);
            var specificObject = parsed[0]
            var knowledgeCenter = specificObject.labels.find((i) => i.type === 22)
            var crops = specificObject.labels.find((i) => i.type === 28)
            var livestock = specificObject.labels.find((i) => i.type === 29)
            var smallBusiness = specificObject.labels.find((i) => i.type === 30)
            var nutrationGraden = specificObject.labels.find((i) => i.type === 31)
            // var message = specificObject.labels.find((i) => i.type === 26)
            // var generalSettings = specificObject.labels.find((i) => i.type === 27)
            // var pension = specificObject.labels.find((i) => i.type === 51)
            // var others = specificObject.labels.find((i) => i.type === 52)
            if (this.state.textLanguageChange === '0') {
                this.state.data[0].name = crops.nameEnglish
                this.state.data[1].name = livestock.nameEnglish
                this.state.data[2].name = smallBusiness.nameEnglish
                this.state.data[3].name = nutrationGraden.nameEnglish
                this.setState({knowledgeCenterLabel : knowledgeCenter.nameEnglish})
                this.state.data[0].audioEnglish = crops.audioEnglish
                this.state.data[1].audioEnglish = livestock.audioEnglish
                this.state.data[2].audioEnglish = smallBusiness.audioEnglish
                this.state.data[3].audioEnglish = nutrationGraden.audioEnglish
                // this.state.data[4].name = message.nameEnglish
                // this.state.data[5].name = generalSettings.nameEnglish
                // this.state.data[6].name = pension.nameEnglish
                // this.state.data[7].name = others.nameEnglish
                // this.setState({ moneyManagerLabel: moneyManagerLabel.nameEnglish })
                // this.setState({ expenseLabel: expenseLabel.nameEnglish })
                // this.setState({ incomeLabel: incomeLabel.nameEnglish })
                // this.setState({ allTransactionLabel: allTransactionLabel.nameEnglish })
            } else if (this.state.textLanguageChange === '1') {
                this.state.data[0].name = crops.nameHindi
                this.state.data[1].name = livestock.nameHindi
                this.state.data[2].name = smallBusiness.nameHindi
                this.state.data[3].name = nutrationGraden.nameHindi
                this.setState({knowledgeCenterLabel : knowledgeCenter.nameHindi})
                this.state.data[0].audioHindi = crops.audioHindi
                this.state.data[1].audioHindi = livestock.audioHindi
                this.state.data[2].audioHindi = smallBusiness.audioHindi
                this.state.data[3].audioHindi = nutrationGraden.audioHindi
                // this.state.data[4].name = message.nameHindi
                // this.state.data[5].name = generalSettings.nameHindi
                // this.state.data[6].name = pension.nameHindi
                // this.state.data[7].name = others.nameHindi
            } else if (this.state.textLanguageChange === '2') {
                this.state.data[0].name = crops.nameHo
                this.state.data[1].name = livestock.nameHo
                this.state.data[2].name = smallBusiness.nameHo
                this.state.data[3].name = nutrationGraden.nameHo
                this.setState({knowledgeCenterLabel : knowledgeCenter.nameHo})
                this.state.data[0].audioHo = crops.audioHo
                this.state.data[1].audioHo = livestock.audioHo
                this.state.data[2].audioHo = smallBusiness.audioHo
                this.state.data[3].audioHo = nutrationGraden.audioHo
                // this.state.data[4].name = message.nameHo
                // this.state.data[5].name = generalSettings.nameHo
                // this.state.data[6].name = pension.nameHo
                // this.state.data[7].name = others.nameHo
            } else if (this.state.textLanguageChange === '3') {
                this.state.data[0].name = crops.nameOdia
                this.state.data[1].name = livestock.nameOdia
                this.state.data[2].name = smallBusiness.nameOdia
                this.state.data[3].name = nutrationGraden.nameOdia
                this.setState({knowledgeCenterLabel : knowledgeCenter.nameOdia})
                this.state.data[0].audioOdia = crops.audioOdia
                this.state.data[1].audioOdia = livestock.audioOdia
                this.state.data[2].audioOdia = smallBusiness.audioOdia
                this.state.data[3].audioOdia = nutrationGraden.audioOdia
                // this.state.data[4].name = message.nameOdia
                // this.state.data[5].name = generalSettings.nameOdia
                // this.state.data[6].name = pension.nameOdia
                // this.state.data[7].name = others.nameOdia
            } else if (this.state.textLanguageChange === '4') {
                this.state.data[0].name = crops.nameSanthali
                this.state.data[1].name = livestock.nameSanthali
                this.state.data[2].name = smallBusiness.nameSanthali
                this.state.data[3].name = nutrationGraden.nameSanthali
                this.setState({knowledgeCenterLabel : knowledgeCenter.nameSanthali})
                this.state.data[0].audioSanthali = crops.audioSanthali
                this.state.data[1].audioSanthali = livestock.audioSanthali
                this.state.data[2].audioSanthali = smallBusiness.audioSanthali
                this.state.data[3].audioSanthali = nutrationGraden.audioSanthali
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
                <View style={{ flexDirection: 'row', marginTop: heightToDp("1%"), marginLeft: widthToDp("1%"), alignSelf: 'center' }}>
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
                <Text style={{marginLeft:widthToDp("3%"),marginTop:heightToDp("2%"),fontSize:widthToDp("7%"),fontFamily:'Oswald-Medium'}}>{this.state.knowledgeCenterLabel}</Text>
                <View>
                    <FlatGrid
                        style={{ marginTop: heightToDp("1%"), marginBottom: heightToDp("75%") }}
                        bounces={true}
                        itemDimension={130}
                        data={data}
                        bouncesZoom={true}
                        renderItem={({ item, index }) => {
                            return (
                            <TouchableOpacity onPress={() => this.checkNavigation(item.name)}>
                                {/* <View style={{ backgroundColor: 'white', width: widthToDp("46%"), height: heightToDp("30%"), elevation: 10, borderRadius: 10 }}>
                                    <View style={{ backgroundColor: "#000", height: heightToDp("7%"), borderRadius: 10 }}>
                                        <Text style={{ color: "#fff", fontSize: widthToDp("5%"), marginLeft: widthToDp("5%"), marginTop: heightToDp("1.8%"),fontFamily:'Oswald-Medium' }}>{item.name}</Text>
                                    </View>
                                    <Image
                                        style={{ width: widthToDp("46%"), height: heightToDp("22.5%") }}
                                        source={{ uri: item.code }}
                                    />
                                </View>
                                 */}
                                 <View style={{backgroundColor:BaseColor.Red,width:widthToDp("47%"),height:heightToDp("30%"), elevation: 10, borderRadius: 10, marginBottom: heightToDp("2%")}}>
                                    <LabelComponent
                                        directData={true}
                                        marginVertical={true}
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
                                style={{ width: widthToDp("47%"), height: heightToDp("25%") ,borderBottomLeftRadius:10,borderBottomRightRadius:10}}
                                source={{ uri: 'file:///storage/emulated/0/Pictures/Pop/image_' + item.code }}
                                />
                                </View>
                            </TouchableOpacity>
                        )}}
                    />
                </View>
            </View>
        );
    }
}