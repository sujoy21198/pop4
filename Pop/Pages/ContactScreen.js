import React, { Component } from 'react'
import { View, Image, TouchableOpacity, ScrollView, FlatList } from 'react-native'
import BaseColor from '../Core/BaseTheme'
import { Text } from 'native-base'
import TopLogo from '../assets/TopLogo'
import { widthToDp, heightToDp } from '../Responsive'
import { FlatGrid, SectionGrid } from 'react-native-super-grid'
import Icon from 'react-native-vector-icons/FontAwesome'
import Icon2 from 'react-native-vector-icons/EvilIcons'
import AsyncStorage from '@react-native-async-storage/async-storage'
import base64 from 'react-native-base64'
import axios from 'axios'
import DataAccess from '../Core/DataAccess'
import CustomIndicator from '../Core/CustomIndicator'
import Languages from '../Core/Languages'
import LanguageChange from '../Core/LanguageChange'
import RBSheet from "react-native-raw-bottom-sheet"
import HeaderComponent from '../components/HeaderComponent'

const data = [{ 'name': 'name' }, { 'name': 'name' }]

export default class ContactScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            languages: [],
            blockList: [],
            blockName: 'Select Block',
            fieldOfficerData: [],
            textLanguageChange: '',
            contactLabel: ''
        }
        this.state.languages = Languages
        //this.state.value = this.props.route.params.value
    }
    componentDidMount() {
        this.getContacts()
        this.setLanguageOnMount()
    }
    blockPicker = (value) => {
        this.setState({
            blockName: value
        })
        this.RBSheet.close()
        this.getContactDetails(value)
        // this.setState({
        //   genderPicker: value
        // })
    }

    getContactDetails = async (value) => {
        try {
            var blockList = []
            var fieldOfficerData = []
            let username = await AsyncStorage.getItem('username')
            let user = await AsyncStorage.getItem('offlineData');
            let parsed = JSON.parse(user);
            var specificObject = parsed[0]
            blockList = specificObject.contactList
            var specificOfiicer = blockList.find((i) => i.block === value)
            //this.setState({ blockList: blockList })
            fieldOfficerData = specificOfiicer.fieldOfficerData

            this.setState({ fieldOfficerData: fieldOfficerData })
            console.log(this.state.fieldOfficerData)
        } catch (error) {
            alert(error)
        }
    }

    getContacts = async () => {
        try {
            var blockList = []
            let username = await AsyncStorage.getItem('username')
            let user = await AsyncStorage.getItem('offlineData');
            let parsed = JSON.parse(user);
            var specificObject = parsed[0]
            blockList = specificObject.contactList
            this.setState({ blockList: blockList })
            console.log(specificObject.contactList)
        } catch (error) {
            alert(error)
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

    loadlabelsFromStorage = async () => {
        try {
            let username = await AsyncStorage.getItem('username')
            let user = await AsyncStorage.getItem('labelsData');
            let parsed = JSON.parse(user);
            var specificObject = parsed[0]
            var contactLabel = specificObject.labels.find((i) => i.type === 46)
            if (this.state.textLanguageChange === '0') {
                this.setState({ contactLabel: contactLabel.nameEnglish })
            } else if (this.state.textLanguageChange === '1') {
                this.setState({ contactLabel: contactLabel.nameHindi })
            } else if (this.state.textLanguageChange === '2') {
                this.setState({ contactLabel: contactLabel.nameHo })
            } else if (this.state.textLanguageChange === '3') {
                this.setState({ contactLabel: contactLabel.nameOdia })

            } else if (this.state.textLanguageChange === '4') {
                this.setState({ contactLabel: contactLabel.nameSanthali })

            }

        } catch (error) {
            alert(error)
        }
        this.setState({ crops: specificObject.crops })
    }

    render() {
        var blockList = []
        blockList = this.state.blockList
        var fieldOfficerData = []
        fieldOfficerData = this.state.fieldOfficerData
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
                <View style={{ marginTop: heightToDp("5%"), flexDirection: 'row' }}>
                    <Text style={{ fontSize: widthToDp("7%"), marginLeft: widthToDp("3%"), fontFamily: 'Oswald-Medium' }}>{this.state.contactLabel}</Text>
                    <View style={{ backgroundColor: 'white', height: heightToDp("8%"), width: widthToDp("50%"), marginLeft: widthToDp("5%"), borderRadius: 20 }}>
                        <TouchableOpacity onPress={() => this.RBSheet.open()}>
                            <View style={{ flexDirection: 'row' }}>
                                <View style={{ marginTop: heightToDp("2%"), marginLeft: widthToDp("4%"), width: widthToDp("25%") }}>
                                    <Text style={{ fontSize: widthToDp("4.6%"), marginLeft: widthToDp("2%"), fontFamily: 'Oswald-Medium' }}>{this.state.blockName}</Text>
                                </View>
                                <Icon2
                                    name="chevron-down"
                                    size={40}
                                    style={{ marginLeft: widthToDp("7%"), marginTop: heightToDp("2%") }}
                                />
                            </View>
                        </TouchableOpacity>

                        <RBSheet
                            ref={ref => {
                                this.RBSheet = ref;
                            }}
                            height={heightToDp("20%")}
                            // openDuration={250}
                            customStyles={{
                                container: {
                                    justifyContent: "center",
                                    alignItems: "center",
                                    backgroundColor: 'rgba(51,204,51,0.9)',
                                    borderRadius: 30
                                }
                            }}
                        >
                            <ScrollView>
                                {
                                    blockList.map((i) => {
                                        return (
                                            <TouchableOpacity onPress={() => this.blockPicker(i.block)}>
                                                <Text style={{ fontSize: widthToDp("4.6%"), alignSelf: 'center', fontFamily: 'Oswald-Medium' }}>{i.block}</Text>
                                                <View style={{ borderBottomColor: 'black', borderBottomWidth: 1, marginTop: heightToDp('0.1%'), width: widthToDp("80%"), marginLeft: widthToDp("8.2%") }}></View>
                                            </TouchableOpacity>
                                        )
                                    })
                                }
                            </ScrollView>
                        </RBSheet>
                    </View>
                </View>
                <View>
                    <FlatList
                        data={fieldOfficerData}
                        style={{ marginBottom: heightToDp("45%") }}
                        renderItem={({ item }) =>
                            <View style={{ backgroundColor: 'white', width: widthToDp("90%"), height: heightToDp("30%"), alignSelf: 'center', marginTop: heightToDp("2%"), borderRadius: 20 }}>
                                <View style={{ flexDirection: 'row' }}>
                                    <View style={{ width: widthToDp("50%") }}>
                                        <Text style={{ fontSize: widthToDp("4%"), marginLeft: widthToDp("5%"), fontFamily: 'Oswald-Medium', marginTop: heightToDp("2%") }}>FULL NAME</Text>
                                        <Text style={{ fontSize: widthToDp("7%"), marginLeft: widthToDp("5%"), fontFamily: 'Oswald-Medium', marginTop: heightToDp("2%") }}>{item.officerName}</Text>
                                    </View>
                                    <View style={{marginTop: heightToDp("2%")}}>
                                        <Image
                                            style={{ height: heightToDp("10%"), width: widthToDp("30%"), borderRadius: 10 }}
                                            source={{ uri: DataAccess.BaseUrl + 'app-property/uploads/field-officers/' + item.image }}
                                        // source={{uri:'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg'}}
                                        />
                                    </View>

                                </View>


                                <View style={{ borderBottomColor: "black", borderBottomWidth: 1, marginTop: heightToDp('1.5%'), width: widthToDp("80%") }}></View>
                                {/* <Text style={{ fontSize: widthToDp("4%"), marginLeft: widthToDp("5%"), fontFamily: 'Oswald-Medium', marginTop: heightToDp("2%") }}>DESIGNATION</Text>
                                <Text style={{ fontSize: widthToDp("7%"), marginLeft: widthToDp("5%"), fontFamily: 'Oswald-Medium', marginTop: heightToDp("2%") }}>{item.officerName}</Text>
                                <View style={{ borderBottomColor: "black", borderBottomWidth: 1, marginTop: heightToDp('1.5%'), width: widthToDp("80%") }}></View> */}
                                <Text style={{ fontSize: widthToDp("4%"), marginLeft: widthToDp("5%"), fontFamily: 'Oswald-Medium', marginTop: heightToDp("2%") }}>CONTACT NUMBER</Text>
                                <Text style={{ fontSize: widthToDp("7%"), marginLeft: widthToDp("5%"), fontFamily: 'Oswald-Medium', marginTop: heightToDp("2%") }}>{item.phone}</Text>
                                <View style={{ borderBottomColor: "black", borderBottomWidth: 1, marginTop: heightToDp('1.5%'), width: widthToDp("80%") }}></View>
                            </View>
                        }
                    />
                </View>
            </View>
        );
    }
}