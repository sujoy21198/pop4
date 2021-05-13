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
import AsyncStorage from '@react-native-async-storage/async-storage'
import LabelComponent from '../components/LabelComponent'
import HeaderComponent from '../components/HeaderComponent'




const data = [
    { name: 'HIGH LAND', code: require('../assets/00214136.jpg') },
    { name: 'MEDIUM LAND', code: require('../assets/60012970.jpg') },
    { name: 'LOW LAND', code: require('../assets/farmer-plow-field.jpg') }
]

export default class LandTypeScreen extends Component {


    constructor(props) {
        super(props)
        this.state = {
            _id: '',
            languages: [],
            cropName: '',
            imageFile: '',
            landTypeLabel:'',
            data:[],
            highLandEnglish:'',
            mediumLandEnglish:'',
            lowLandEnglish:''
        }
        this.state.languages = Languages
        this.state.data = data
        this.state._id = this.props.route.params._id
        this.state.cropName = this.props.route.params.cropName
        this.state.imageFile = this.props.route.params.imageFile
    }

    componentDidMount() {
        this.loadlabelsFromStorage()
        this.setLanguageOnMount()
    }

    loadlabelsFromStorage = async () => {
        try {
            let username = await AsyncStorage.getItem('username')
            let user = await AsyncStorage.getItem('labelsData');
            let parsed = JSON.parse(user);
            var specificObject = parsed[0]
            var landTypeLabel = specificObject.labels.find((i) => i.type === 56)
            var highLand = specificObject.labels.find((i) => i.type === 53)
            var lowLand = specificObject.labels.find((i) => i.type === 55)
            var mediumLand = specificObject.labels.find((i) => i.type === 54)
            this.setState({ highLandEnglish: highLand.nameEnglish })
            this.setState({ lowLandEnglish: lowLand.nameEnglish })
            this.setState({ mediumLandEnglish: mediumLand.nameEnglish })
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
                this.state.data[0].name = highLand.nameEnglish
                this.state.data[1].name = mediumLand.nameEnglish
                this.state.data[2].name = lowLand.nameEnglish
                this.state.data[0].audioEnglish = highLand.audioEnglish
                this.state.data[1].audioEnglish = mediumLand.audioEnglish
                this.state.data[2].audioEnglish = lowLand.audioEnglish
                this.setState({ landTypeLabel: landTypeLabel.audioEnglish })
                // this.state.data[4].name = message.nameEnglish
                // this.state.data[5].name = generalSettings.nameEnglish
                // this.state.data[6].name = pension.nameEnglish
                // this.state.data[7].name = others.nameEnglish
                // this.setState({ moneyManagerLabel: moneyManagerLabel.nameEnglish })
                // this.setState({ expenseLabel: expenseLabel.nameEnglish })
                // this.setState({ incomeLabel: incomeLabel.nameEnglish })
                // this.setState({ allTransactionLabel: allTransactionLabel.nameEnglish })
            } else if (this.state.textLanguageChange === '1') {
                this.state.data[0].name = highLand.nameHindi
                this.state.data[1].name = mediumLand.nameHindi
                this.state.data[2].name = lowLand.nameHindi
                this.state.data[0].audioHindi = highLand.audioHindi
                this.state.data[1].audioHindi = mediumLand.audioHindi
                this.state.data[2].audioHindi = lowLand.audioHindi
                this.setState({ landTypeLabel: landTypeLabel.nameHindi })
                // this.state.data[4].name = message.nameHindi
                // this.state.data[5].name = generalSettings.nameHindi
                // this.state.data[6].name = pension.nameHindi
                // this.state.data[7].name = others.nameHindi
            } else if (this.state.textLanguageChange === '2') {
                this.state.data[0].name = highLand.nameHo
                this.state.data[1].name = mediumLand.nameHo
                this.state.data[2].name = lowLand.nameHo
                this.state.data[0].audioHo = highLand.audioHo
                this.state.data[1].audioHo = mediumLand.audioHo
                this.state.data[2].audioHo = lowLand.audioHo
                this.setState({ landTypeLabel: landTypeLabel.nameHo })
                // this.state.data[4].name = message.nameHo
                // this.state.data[5].name = generalSettings.nameHo
                // this.state.data[6].name = pension.nameHo
                // this.state.data[7].name = others.nameHo
            } else if (this.state.textLanguageChange === '3') {
                this.state.data[0].name = highLand.nameOdia
                this.state.data[1].name = mediumLand.nameOdia
                this.state.data[2].name = lowLand.nameOdia
                this.state.data[0].audioOdia = highLand.audioOdia
                this.state.data[1].audioOdia = mediumLand.audioOdia
                this.state.data[2].audioOdia = lowLand.audioOdia
                this.setState({ landTypeLabel: landTypeLabel.nameOdia })
                // this.state.data[4].name = message.nameOdia
                // this.state.data[5].name = generalSettings.nameOdia
                // this.state.data[6].name = pension.nameOdia
                // this.state.data[7].name = others.nameOdia
            } else if (this.state.textLanguageChange === '4') {
                this.state.data[0].name = highLand.nameSanthali
                this.state.data[1].name = mediumLand.nameSanthali
                this.state.data[2].name = lowLand.nameSanthali
                this.state.data[0].audioSanthali = highLand.audioSanthali
                this.state.data[1].audioSanthali = mediumLand.audioSanthali
                this.state.data[2].audioSanthali = lowLand.audioSanthali
                this.setState({ landTypeLabel: landTypeLabel.nameSanthali })
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



    selectLandType = (data) => {
        
        if (data === this.state.data[0].name) {
            this.props.navigation.navigate({
                name: 'PatchScreen',
                params: { landType: data, _id: this.state._id, cropName: this.state.cropName, imageFile: this.state.imageFile  , highEnglish : this.state.highLandEnglish }
            })
        } else if (data === this.state.data[1].name) {
            this.props.navigation.navigate({
                name: 'PatchScreen',
                params: { landType: data, _id: this.state._id, cropName: this.state.cropName, imageFile: this.state.imageFile , highEnglish : this.state.mediumLandEnglish}
            })
        } else if (data === this.state.data[2].name) {
            this.props.navigation.navigate({
                name: 'PatchScreen',
                params: { landType: data, _id: this.state._id, cropName: this.state.cropName, imageFile: this.state.imageFile , highEnglish : this.state.lowLandEnglish }
            })
        }
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
    speak = (data) => {
        if (data === 'HIGH LAND') {
            tts.speak('HIGH LAND')
        } else if (data === 'MEDIUM LAND') {
            tts.speak('MEDIUM LAND')
        } else if (data === 'LOW LAND') {
            tts.speak('LOW LAND')
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
                <Text style={{ marginLeft: widthToDp("3%"), fontSize: widthToDp("7%"), fontFamily: 'Oswald-Medium' }}>{this.state.landTypeLabel}</Text>

                <View>

                    <FlatList
                        data={data}
                        style={{ marginBottom: heightToDp("74%") }}
                        renderItem={({ item }) =>

                            <Card style={{ width: widthToDp("94%"), marginLeft: widthToDp("3%"), height: heightToDp("30%"), marginBottom: heightToDp("1%"), borderRadius: 20, backgroundColor: BaseColor.Red, marginTop: heightToDp("1%") }}>
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
                                        ) ? 78 : 85
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
                                <TouchableOpacity onPress={() => this.selectLandType(item.name)}>
                                    <Image
                                        style={{ width: widthToDp("93%"), height: heightToDp("22.8%"), marginLeft: widthToDp("0.4%"), borderRadius: 2, borderBottomLeftRadius: 20, borderBottomRightRadius: 20 }}
                                        source={item.code}
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