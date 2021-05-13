import React, { Component } from 'react'
import { View, Image, TouchableOpacity } from 'react-native'
import BaseColor from '../Core/BaseTheme'
import { Text } from 'native-base'
import TopLogo from '../assets/TopLogo'
import { widthToDp, heightToDp } from '../Responsive'
import { FlatGrid, SectionGrid } from 'react-native-super-grid'
import Icon from 'react-native-vector-icons/FontAwesome'
import AsyncStorage from '@react-native-async-storage/async-storage'
import base64 from 'react-native-base64'
import axios from 'axios'
import DataAccess from '../Core/DataAccess'
import CustomIndicator from '../Core/CustomIndicator'
import Languages from '../Core/Languages'
import LanguageChange from '../Core/LanguageChange'
import LabelComponent from '../components/LabelComponent'
import HeaderComponent from '../components/HeaderComponent'



export default class CropsScreen extends Component {



    constructor(props) {
        super(props)
        this.state = {
            crops: [],
            isLoading: false,
            isFetching: false,
            textLanguageChange: '',
            languages: [],
            cropLabel: ''
        }
        this.state.languages = Languages
    }
    componentDidMount() {
        //this.loadCrops()
        this.loadCropsFromStorage()
        this.setLanguageOnMount()
        //this.getOfflineData()
    }


    


    loadlabelsFromStorage = async () => {
        try {
            let username = await AsyncStorage.getItem('username')
            let user = await AsyncStorage.getItem('labelsData');
            let parsed = JSON.parse(user);
            var specificObject = parsed[0]
            var cropLabel = specificObject.labels.find((i) => i.type === 28)
            if (this.state.textLanguageChange === '0') {
                //this.state.allTransactionsLabel = allTransactions.nameEnglish
                this.setState({ cropLabel: cropLabel.nameEnglish })
                // this.state.data[1].name = livestock.nameEnglish
                // this.state.data[2].name = smallBusiness.nameEnglish
                // this.state.data[3].name = health.nameEnglish
                // this.state.data[4].name = education.nameEnglish
                // this.state.data[5].name = loanSavings.nameEnglish
                // this.state.data[6].name = pension.nameEnglish
                // this.state.data[7].name = others.nameEnglish
                // this.setState({ moneyManagerLabel: moneyManagerLabel.nameEnglish })
                // this.setState({ expenseLabel: expenseLabel.nameEnglish })
                // this.setState({ incomeLabel: incomeLabel.nameEnglish })
                // this.setState({ allTransactionLabel: allTransactionLabel.nameEnglish })
            } else if (this.state.textLanguageChange === '1') {
                //this.state.allTransactionsLabel = allTransactions.nameHindi
                this.setState({ cropLabel: cropLabel.nameHindi })
                // this.state.data[1].name = livestock.nameHindi
                // this.state.data[2].name = smallBusiness.nameHindi
                // this.state.data[3].name = health.nameHindi
                // this.state.data[4].name = education.nameHindi
                // this.state.data[5].name = loanSavings.nameHindi
                // this.state.data[6].name = pension.nameHindi
                // this.state.data[7].name = others.nameHindi
            } else if (this.state.textLanguageChange === '2') {
                //this.state.data[0].name = allTransactions.nameHo
                this.setState({ cropLabel: cropLabel.nameHo })
                // this.state.data[1].name = livestock.nameHo
                // this.state.data[2].name = smallBusiness.nameHo
                // this.state.data[3].name = health.nameHo
                // this.state.data[4].name = education.nameHo
                // this.state.data[5].name = loanSavings.nameHo
                // this.state.data[6].name = pension.nameHo
                // this.state.data[7].name = others.nameHo
            } else if (this.state.textLanguageChange === '3') {
                //this.state.data[0].name = allTransactions.nameOdia
                this.setState({ cropLabel: cropLabel.nameOdia })
                // this.state.data[1].name = livestock.nameOdia
                // this.state.data[2].name = smallBusiness.nameOdia
                // this.state.data[3].name = health.nameOdia
                // this.state.data[4].name = education.nameOdia
                // this.state.data[5].name = loanSavings.nameOdia
                // this.state.data[6].name = pension.nameOdia
                // this.state.data[7].name = others.nameOdia
            } else if (this.state.textLanguageChange === '4') {
                //this.state.data[0].name = allTransactions.nameSanthali
                this.setState({ cropLabel: cropLabel.nameSanthali })
                // this.state.data[1].name = livestock.nameSanthali
                // this.state.data[2].name = smallBusiness.nameSanthali
                // this.state.data[3].name = health.nameSanthali
                // this.state.data[4].name = education.nameSanthali
                // this.state.data[5].name = loanSavings.nameSanthali
                // this.state.data[6].name = pension.nameSanthali
                // this.state.data[7].name = others.nameSanthali
            }

        } catch (error) {
            alert(error)
        }
        //this.setState({ crops: specificObject.crops })
    }

    loadCropsFromStorage = async () => {
        try {
            let username = await AsyncStorage.getItem('username')
            let user = await AsyncStorage.getItem('numberOfCrops');
            let parsed = JSON.parse(user);
            //var specificObject = parsed[0]
            var specificObject = parsed[0]
            console.log(specificObject.crops,"cropsScreen")
        } catch (error) {
            alert(error)
        }
        this.setState({ crops: specificObject.crops })
    }

    loadCrops = async () => {

        this.setState({ isLoading: true })
        var load = true
        var username = await AsyncStorage.getItem('username')
        var token = await AsyncStorage.getItem('token')
        var encodedUsername = base64.encode(username)
        var cropsArray = []
        var imageFile;
        console.log(token + " token from crops")
        await axios.get(DataAccess.BaseUrl + DataAccess.AccessUrl + DataAccess.Crops, {
            headers: {
                'Content-type': "accept",
                'X-Information': encodedUsername,
                'Authorization': "POP " + token,
                'Accept-Language': ""
            }
        }).then(function (response) {
            console.log(response.data)
            cropsArray = response.data.data
            console.log(cropsArray.map((i) => i.name))
            if (response.data.status === 1) {
                load = false
            }
            imageFile = cropsArray.map((i) => i.imageFile)
            console.log(imageFile)
            // console.log(cropsArray)
            // var id = cropsArray
            // console.log(id)

        }).catch(function (error) {
            console.log(error.message)
        })


        if (load === false) {
            this.setState({ isLoading: false })
            this.setState({ isFetching: false })
        }

        this.setState({
            crops: cropsArray
        })
    }

    navigateToLandScreen = (data, name, imageFile) => {
        console.log(data)
        this.props.navigation.navigate({
            name: 'LandTypeScreen',
            params: {
                _id: data,
                cropName: name,
                imageFile: imageFile
            }
        })
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

    onRefresh = () => {
        this.setState({ isFetching: true }, function () { this.loadCrops() });
    }

    render() {
        var cropsArray = []
        cropsArray = this.state.crops
        //console.log(cropsArray)
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
                <Text style={{ marginLeft: widthToDp("3%"), marginTop: heightToDp("2%"), fontSize: widthToDp("7%"), fontFamily: 'Oswald-Medium' }}>{this.state.cropLabel}</Text>
                {
                    this.state.isLoading ? <View style={{ justifyContent: 'center', marginTop: heightToDp("20%"), backgroundColor: BaseColor.BackgroundColor }}><CustomIndicator IsLoading={this.state.isLoading} /></View> :
                        <View>
                            <FlatGrid
                                style={{ marginTop: heightToDp("1%"), marginBottom: heightToDp("74%"), backgroundColor: BaseColor.BackgroundColor }}
                                bounces={true}
                                itemDimension={130}
                                data={Object.values(cropsArray)}
                                bouncesZoom={true}
                                onRefresh={() => this.onRefresh()}
                                refreshing={this.state.isFetching}
                                renderItem={({ item }) => (

                                    <View style={{ backgroundColor: BaseColor.Red, width: widthToDp("47%"), height: heightToDp("30%"), elevation: 10, borderRadius: 10, marginTop: heightToDp("1%") }}>
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
                                            labelName={
                                                this.state.textLanguageChange==="0" ? item.nameEnglish :
                                                    this.state.textLanguageChange==="1" ? item.nameHindi :
                                                    this.state.textLanguageChange==="2" ? item.nameHo :
                                                    this.state.textLanguageChange==="3" ? item.nameOdia :
                                                    item.nameSanthali
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
                                        <TouchableOpacity onPress={() => this.navigateToLandScreen(item._id, item.nameEnglish, item.imageFile)}>
                                            <Image
                                                style={{ width: widthToDp("47%"), height: heightToDp("25%"), borderBottomLeftRadius: 10, borderBottomRightRadius: 10 }}
                                                source={{ uri: 'file:///storage/emulated/0/Pictures/Pop/image_' + item.imageFile }}
                                            />
                                        </TouchableOpacity>
                                    </View>

                                )}
                            />
                        </View>
                }


            </View>
        );
    }
}