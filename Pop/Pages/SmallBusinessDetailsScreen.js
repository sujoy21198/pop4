import React, { Component } from 'react'
import { View, Image, TouchableOpacity, FlatList,ScrollView } from 'react-native'
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
import HTML from "react-native-render-html";

export default class SmallBusinessDetailsScreen extends Component {

    constructor(props) {
        super(props)
        this.state = {
            languages: [],
            _id: '',
            description:'',
            textLanguageChange:'',
            length:'',
            counter:0,
            nextButtonText: "",
            title:''
        }
        this.state.languages = Languages
        this.state._id = this.props.route.params.value
    }


    componentDidMount() {
        this.setLanguageOnMount()
        // this.loadlabelsFromStorage()
        this.getOfflineData()
    }

    getOfflineData = async () => {
        try {
            let username = await AsyncStorage.getItem('username')
            let user = await AsyncStorage.getItem('smallBusiness');
            let parsed = JSON.parse(user);
            var specificObject = parsed[0].smallBusinessSubCategory
            var businessSpecific = specificObject.filter((i) => i.categoryId === this.state._id)
            this.setState({length : businessSpecific.length})
            if(this.state.textLanguageChange === '0'){
                this.setState({description : businessSpecific[this.state.counter].descEnglish})
                this.setState({title : businessSpecific[this.state.counter].subCategoryEnglish})
                this.setState({audio : businessSpecific[this.state.counter].audioEnglish})
            }else if(this.state.textLanguageChange === '1'){
                this.setState({description : businessSpecific[this.state.counter].descHindi})
                this.setState({title : businessSpecific[this.state.counter].subCategoryHindi})
                this.setState({audio : businessSpecific[this.state.counter].audioHindi})
            }else if(this.state.textLanguageChange === '2'){
                this.setState({description : businessSpecific[this.state.counter].descHo})
                this.setState({title : businessSpecific[this.state.counter].subCategoryHo})
                this.setState({audio : businessSpecific[this.state.counter].audioHo})
            }else if(this.state.textLanguageChange === '3'){
                this.setState({description : businessSpecific[this.state.counter].descOdia})
                this.setState({title : businessSpecific[this.state.counter].subCategoryOdia})
                this.setState({audio : businessSpecific[this.state.counter].audioOdia})
            }else if(this.state.textLanguageChange === '4'){
                this.setState({description : businessSpecific[this.state.counter].descSanthali})
                this.setState({title : businessSpecific[this.state.counter].subCategorySanthali})
                this.setState({audio : businessSpecific[this.state.counter].audioSanthali})
            }
            
            console.log(businessSpecific.length, "sub category")

        } catch (error) {
            console.log(error)
        }
    }



    loadlabelsFromStorage = async () => {
        try {
            let username = await AsyncStorage.getItem('username')
            let user = await AsyncStorage.getItem('labelsData');
            let parsed = JSON.parse(user);
            var specificObject = parsed[0]
            var smallBusinessLabel = specificObject.labels.find((i) => i.type === 30)
            var nextButtonText = specificObject.labels.find((i) => i.type === 62)
            //console.log(vegetableVending)
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
                this.setState({ smallBusinessLabel: smallBusinessLabel.nameEnglish })
                this.setState({ nextButtonText: nextButtonText.nameEnglish })
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
                this.setState({ smallBusinessLabel: smallBusinessLabel.nameHindi })
                this.setState({ nextButtonText: nextButtonText.nameHindi })
                // this.state.data[4].name = message.nameHindi
                // this.state.data[5].name = generalSettings.nameHindi
                // this.state.data[6].name = pension.nameHindi
                // this.state.data[7].name = others.nameHindi
            } else if (this.state.textLanguageChange === '2') {
                this.setState({ smallBusinessLabel: smallBusinessLabel.nameHo })
                this.setState({ nextButtonText: nextButtonText.nameHo })
                // this.state.data[4].name = message.nameHo
                // this.state.data[5].name = generalSettings.nameHo
                // this.state.data[6].name = pension.nameHo
                // this.state.data[7].name = others.nameHo
            } else if (this.state.textLanguageChange === '3') {
                this.setState({ smallBusinessLabel: smallBusinessLabel.nameOdia })
                this.setState({ nextButtonText: nextButtonText.nameOdia })
                //this.setState({ landTypeLabel: landTypeLabel.nameOdia })
                // this.state.data[4].name = message.nameOdia
                // this.state.data[5].name = generalSettings.nameOdia
                // this.state.data[6].name = pension.nameOdia
                // this.state.data[7].name = others.nameOdia
            } else if (this.state.textLanguageChange === '4') {
                this.setState({ smallBusinessLabel: smallBusinessLabel.nameSanthali })
                this.setState({ nextButtonText: nextButtonText.nameSanthali })
                // this.setState({ landTypeLabel: landTypeLabel.nameSanthali })
                // this.state.data[4].name = message.nameSanthali
                // this.state.data[5].name = generalSettings.nameSanthali
                // this.state.data[6].name = pension.nameSanthali
                // this.state.data[7].name = others.nameSanthali
            }

        } catch (error) {
            console.log(error)
        }
        // this.setState({ crops: specificObject.crops })
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

    nextButton = () => {
        this.state.counter = this.state.counter + 1
        if(this.state.counter === parseInt(this.state.length)){
            this.props.navigation.reset({
                index: 0,
                routes: [{ name: "DashBoardScreen" }]
            });
        }

        this.getOfflineData()
        //alert(this.state.length)
         
    }

    render() {
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
                <View style={{ backgroundColor: BaseColor.Red, height: heightToDp("50%"), alignSelf: 'center', width: widthToDp("90%"), borderRadius: 10, marginTop: heightToDp('1.5%') }}>
                    <LabelComponent
                        directData={true}
                        labelWidth={
                            this.state.audio ? 77 : 85
                        }
                        labelName={this.state.title}
                        isAudioHaving={this.state.audio}
                        audioFile={this.state.audio}
                    /> 
                    <View style={{ backgroundColor: "white", height: heightToDp("45%"), alignSelf: 'center', width: widthToDp("90%"), marginTop: heightToDp('0%'), borderRadius: 10, padding: widthToDp("2%")}}>
                        <ScrollView>
                            {/* <Text>{this.state.description}</Text> */}
                            <HTML source={{ html: this.state.description || '<p></p>' }} containerStyle={{ elevation: 10, marginTop: heightToDp("2%"), marginLeft: widthToDp("2%") }} />
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