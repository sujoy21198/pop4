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

export default class BreedScreen extends Component {

    constructor(props) {
        super(props)
        this.state = {
            breed: [],
            _id: '',
            isLoading: false,
            name: '',
            languages: [],
            textLanguageChange : '',
            breedLabel:''
        }
        this.state._id = this.props.route.params._id
        this.state.name = this.props.route.params.name
        this.state.languages = Languages
        //alert(this.state.name)
    }
    componentDidMount() {
        //this.loadLiveStocks()
        this.loadBreedFromStorage()
        this.setLanguageOnMount()
    }

    loadBreedFromStorage = async () => {
        try {
            let username = await AsyncStorage.getItem('username')
            let user = await AsyncStorage.getItem('offlineData');
            let parsed = JSON.parse(user);
            var specific = parsed.find((i) => i.username === username)
            var breedData = specific.liveStockBreeds.filter((i) => i.livestockId === this.state._id)
            console.log(breedData)
            this.setState({
                breed: breedData
            })
        } catch (error) {
            alert(error)
        }
    }

    loadLiveStocks = async () => {
        this.setState({ isLoading: true })
        var load = true
        var username = await AsyncStorage.getItem('username')
        var token = await AsyncStorage.getItem('token')
        var encodedUsername = base64.encode(username)
        var cropsArray = []
        //console.log(token)
        // await axios.get(DataAccess.BaseUrl+DataAccess.Crops,{
        //     headers:{
        //         'Content-type': 'application/json',
        //         'X-Information': this.state.encodedUsername,
        //         'Authorization': 'POP '+ this.state.token
        //     }
        // }).then(function(response){
        //     console.log(response.data)
        // }).catch(function(error){
        //     console.log(error)
        // })
        await axios.get(DataAccess.BaseUrl + DataAccess.AccessUrl + DataAccess.LiveStocks + DataAccess.Breeds + this.state._id, {
            headers: {
                'Content-type': "accept",
                'X-Information': encodedUsername,
                'Authorization': "POP " + token
            }
        }).then(function (response) {
            //console.log(response.data.data)
            cropsArray = response.data.data
            if (response.data.status === 1) {
                load = false
            }
            // console.log(cropsArray)
            // var id = cropsArray
            // console.log(id)

        }).catch(function (error) {
            console.log(error.message)
        })

        if (load === false) {
            this.setState({ isLoading: false })
        }

        this.setState({
            breed: cropsArray
        })
    }

    navigationController = (data, name, imageFile, descEnglish,descHindi,descHo,descOdia,descSanthali) => {
        //alert(this.state.name)
        this.props.navigation.navigate({
            name: 'BreedNewScreen',
            params: {
                _id: this.state._id,
                breedname: name,
                imageFile: imageFile,
                breeId: data,
                livestockName: this.state.name,
                descEnglish: descEnglish,
                descHindi :descHindi ,
                descHo : descHo,
                descOdia : descOdia,
                descSanthali : descSanthali
                
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

    loadlabelsFromStorage = async () => {
        try {
            let username = await AsyncStorage.getItem('username')
            let user = await AsyncStorage.getItem('labelsData');
            let parsed = JSON.parse(user);
            var specificObject = parsed[0]
            var breedLabel = specificObject.labels.find((i) => i.type === 41)
            if (this.state.textLanguageChange === '0') {
              
                this.setState({breedLabel : breedLabel.nameEnglish})
                // this.state.data[4].name = message.nameEnglish
                // this.state.data[5].name = generalSettings.nameEnglish
                // this.state.data[6].name = pension.nameEnglish
                // this.state.data[7].name = others.nameEnglish
                // this.setState({ moneyManagerLabel: moneyManagerLabel.nameEnglish })
                // this.setState({ expenseLabel: expenseLabel.nameEnglish })
                // this.setState({ incomeLabel: incomeLabel.nameEnglish })
                // this.setState({ allTransactionLabel: allTransactionLabel.nameEnglish })
            } else if (this.state.textLanguageChange === '1') {
             
                this.setState({breedLabel : breedLabel.nameHindi})
                // this.state.data[4].name = message.nameHindi
                // this.state.data[5].name = generalSettings.nameHindi
                // this.state.data[6].name = pension.nameHindi
                // this.state.data[7].name = others.nameHindi
            } else if (this.state.textLanguageChange === '2') {
           
                this.setState({breedLabel : breedLabel.nameHo})
                // this.state.data[4].name = message.nameHo
                // this.state.data[5].name = generalSettings.nameHo
                // this.state.data[6].name = pension.nameHo
                // this.state.data[7].name = others.nameHo
            } else if (this.state.textLanguageChange === '3') {
                
                this.setState({breedLabel : breedLabel.nameOdia})
                // this.state.data[4].name = message.nameOdia
                // this.state.data[5].name = generalSettings.nameOdia
                // this.state.data[6].name = pension.nameOdia
                // this.state.data[7].name = others.nameOdia
            } else if (this.state.textLanguageChange === '4') {
               
                this.setState({breedLabel : breedLabel.nameSanthali})
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

    render() {
        var breedArray = []
        breedArray = this.state.breed
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
                <Text style={{ marginLeft: widthToDp("3%"), marginTop: heightToDp("2%"), fontSize: widthToDp("7%"), fontFamily: 'Oswald-Medium' }}>{(this.state.breedLabel)}</Text>
                {
                    this.state.isLoading ? <View style={{ justifyContent: 'center', marginTop: heightToDp("20%") }}><CustomIndicator IsLoading={this.state.isLoading} /></View> : null
                }
                <View>
                    <FlatGrid
                        style={{ marginTop: heightToDp("1%"), marginBottom: heightToDp("74%") }}
                        bounces={true}
                        itemDimension={130}
                        data={Object.values(breedArray)}
                        bouncesZoom={true}
                        renderItem={({ item }) => (
                            <TouchableOpacity onPress={() => this.navigationController(item._id, item.nameEnglish, item.imageFile, item.descEnglish,item.descHindi,item.descHo,item.descOdia,item.descSanthali)} style={{marginBottom: heightToDp("3%")}}>
                                <View style={{ backgroundColor: BaseColor.Red, width: widthToDp("47%"), height: heightToDp("30%"), elevation: 10, borderRadius: 10, marginBottom: heightToDp("0.1%") }}>
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
                                    <Image
                                        style={{ width: widthToDp("47%"), height: heightToDp("25%"), borderBottomLeftRadius: 10, borderBottomRightRadius: 10 }}
                                        source={{ uri: 'file:///storage/emulated/0/Pictures/Pop/image_'+item.imageFile }}
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