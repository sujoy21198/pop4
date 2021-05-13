import React, { Component } from 'react'
import { View, Image, TouchableOpacity, ScrollView } from 'react-native'
import BaseColor from '../Core/BaseTheme'
import { Text, Input } from 'native-base'
import TopLogo from '../assets/TopLogo'
import { widthToDp, heightToDp } from '../Responsive'
import { FlatGrid, SectionGrid } from 'react-native-super-grid'
import Icon from 'react-native-vector-icons/FontAwesome'
import AsyncStorage from '@react-native-async-storage/async-storage'
import base64 from 'react-native-base64'
import axios from 'axios'
import DataAccess from '../Core/DataAccess'
import CustomIndicator from '../Core/CustomIndicator'



export default class LiveStockEnterQuantityScreen extends Component {

    constructor(props) {
        super(props)
        this.state = {
            breed: [],
            _id: '',
            isLoading: false,
            breedname: '',
            imageFile: ''
        }
        this.state._id = this.props.route.params._id
        this.state.breedname = this.props.route.params.breedname
        this.state.imageFile = this.props.route.params.imageFile
        //alert(this.state._id)
        this.getBreedCategories()
    }

    getBreedCategories = async () => {
        try {
            let username = await AsyncStorage.getItem('username')
            let user = await AsyncStorage.getItem('offlineData');
            let parsed = JSON.parse(user);
            var specific = parsed.find((i) => i.username === username)
            var breedData = specific.breedCategories.filter((i) => i.breedId === this.state._id)
            console.log(breedData)
            this.setState({
                breed: breedData
            })
        } catch (error) {
            alert(error)
        }
    }

    nextScreen=()=>{
        this.props.navigation.navigate({
            name: 'LiveStockExpectedProfitAnalysisScreen',
            params:{
                _id:this.state._id,
                breedname:this.state.breedname,
                imageFile : this.state.imageFile
            }
        })
    }

    saveButton = () => {
        alert("saved")
    }
    render() {
        var breedData = []
        breedData = this.state.breed
        return (
            <View style={{ backgroundColor: BaseColor.BackgroundColor, flex: 1 }}>
                <View style={{ backgroundColor: 'white', width: widthToDp("100%"), height: heightToDp("13%"), flexDirection: 'row' }}>
                    <View style={{ marginTop: heightToDp("3%"), marginLeft: widthToDp("3%") }}>
                        <TopLogo />
                    </View>
                    <Icon
                        name="home"
                        size={30}
                        style={{ marginTop: heightToDp("4.6%"), marginLeft: widthToDp("45%") }}
                        onPress={() => this.props.navigation.navigate('DashBoardScreen')}
                    />
                    <Icon
                        name="bell"
                        size={30}
                        style={{ marginTop: heightToDp("4.6%"), marginLeft: widthToDp("5%") }}
                        onPress={() => this.props.navigation.navigate('NotificationsScreen')}
                    />
                </View>

                <View style={{ flexDirection: 'row', marginTop: heightToDp("1%"), marginLeft: widthToDp("1%") }}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('SigninScreen')}>
                        <View style={{ backgroundColor: BaseColor.English, width: widthToDp("30%"), height: heightToDp("6%"), marginLeft: widthToDp("2%"), borderRadius: 100, flexDirection: 'row' }}>
                            <Text style={{ color: '#fff', marginTop: heightToDp("1.5%"), fontFamily: 'Oswald-Medium', marginLeft: widthToDp("5%") }}>ENGLISH</Text>
                            <Icon
                                name="microphone"
                                color="white"
                                size={20}
                                style={{ marginTop: heightToDp("1.8%"), marginLeft: widthToDp("6%") }}
                            />
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity >
                        <View style={{ backgroundColor: BaseColor.Hindi, width: widthToDp("30%"), height: heightToDp("6%"), marginLeft: widthToDp("2%"), borderRadius: 100, flexDirection: 'row' }}>
                            <Text style={{ color: '#fff', marginTop: heightToDp("1.7%"), marginLeft: widthToDp("5%"), fontWeight: 'bold', fontSize: widthToDp("4.3%") }}>हिन्दी</Text>
                            <Icon
                                name="microphone"
                                color="white"
                                size={20}
                                style={{ marginTop: heightToDp("1.8%"), marginLeft: widthToDp("9%") }}
                            />
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity>
                        <View style={{ backgroundColor: BaseColor.Ho, width: widthToDp("30%"), height: heightToDp("6%"), marginLeft: widthToDp("2%"), borderRadius: 100, flexDirection: 'row' }}>
                            <Text style={{ color: '#fff', marginTop: heightToDp("1.5%"), marginLeft: widthToDp("5%"), fontWeight: 'bold', fontSize: widthToDp("4.3%") }}>ʤʌgʌr</Text>
                            <Icon
                                name="microphone"
                                color="white"
                                size={20}
                                style={{ marginTop: heightToDp("1.8%"), marginLeft: widthToDp("6.3%") }}
                            />
                        </View>
                    </TouchableOpacity>
                </View>


                <View style={{ flexDirection: 'row', marginTop: heightToDp("1%"), marginLeft: widthToDp("1%"), alignSelf: 'center' }}>
                    <TouchableOpacity>
                        <View style={{ backgroundColor: BaseColor.Uridia, width: widthToDp("30%"), height: heightToDp("6%"), borderRadius: 100, flexDirection: 'row' }}>
                            <Text style={{ color: '#fff', marginTop: heightToDp("1.7%"), marginLeft: widthToDp("4.7%"), fontWeight: 'bold', fontSize: widthToDp("4.3%") }}>ଓଡ଼ିଆ</Text>
                            <Icon
                                name="microphone"
                                color="white"
                                size={20}
                                style={{ marginTop: heightToDp("1.8%"), marginLeft: widthToDp("6.9%") }}
                            />
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity>
                        <View style={{ backgroundColor: BaseColor.Santhali, width: widthToDp("30%"), height: heightToDp("6%"), borderRadius: 100, marginLeft: widthToDp("2%"), flexDirection: 'row' }}>
                            <Text style={{ color: '#fff', marginTop: heightToDp("1.7%"), marginLeft: widthToDp("3.4%"), fontWeight: 'bold', fontSize: widthToDp("4.3%") }}>ᱥᱟᱱᱛᱟᱲᱤ</Text>
                            <Icon
                                name="microphone"
                                color="white"
                                size={20}
                                style={{ marginTop: heightToDp("1.8%"), marginLeft: widthToDp("3%") }}
                            />
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={{ borderBottomColor: BaseColor.Stroke, borderBottomWidth: 1, marginTop: heightToDp('1.5%'), width: widthToDp("100%") }}></View>
                <Text style={{ marginLeft: widthToDp("3%"), marginTop: heightToDp("2%"), fontSize: widthToDp("7%"), fontFamily: 'Oswald-Medium' }}>BREED</Text>
                <ScrollView>
                    <View style={{ backgroundColor: BaseColor.Red, height: heightToDp("26%"), alignSelf: 'center', width: widthToDp("90%"), borderRadius: 10, marginTop: heightToDp('1.5%') }}>
                        <Text style={{ color: "#fff", fontSize: widthToDp("5%"), marginLeft: widthToDp("5%"), marginTop: heightToDp("1%"), fontFamily: 'Oswald-Medium' }}>{this.state.breedname}</Text>
                        <View style={{ backgroundColor: "white", height: heightToDp("20%"), alignSelf: 'center', width: widthToDp("90%"), marginTop: heightToDp('2%'), borderBottomLeftRadius: 10, borderBottomRightRadius: 10 }}>
                            <Image
                                source={{ uri: DataAccess.BaseUrl + "app-property/uploads/livestocks/" + this.state.imageFile }}
                                style={{ height: heightToDp("15%"), width: widthToDp("80%"), alignSelf: 'center', marginTop: heightToDp("1%"), borderRadius: 10 }}
                            />
                        </View>
                    </View>


                    <View style={{ backgroundColor: BaseColor.Red, height: heightToDp("34%"), alignSelf: 'center', width: widthToDp("90%"), borderRadius: 10, marginTop: heightToDp('1.5%') }}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ color: "#fff", fontSize: widthToDp("5%"), marginLeft: widthToDp("8%"), marginTop: heightToDp("1%"), fontFamily: 'Oswald-Medium' }}>TYPE</Text>
                            <Text style={{ color: "#fff", fontSize: widthToDp("5%"), marginLeft: widthToDp("20%"), marginTop: heightToDp("1%"), fontFamily: 'Oswald-Medium' }}>PRICE</Text>
                            <Text style={{ color: "#fff", fontSize: widthToDp("5%"), marginLeft: widthToDp("20%"), marginTop: heightToDp("1%"), fontFamily: 'Oswald-Medium' }}>QUANTITY</Text>
                        </View>
                        <View style={{ backgroundColor: "white", height: heightToDp("30%"), alignSelf: 'center', width: widthToDp("90%"), marginTop: heightToDp('2%'), borderBottomLeftRadius: 10, borderBottomRightRadius: 10 }}>
                            {
                                breedData.map((i) => {
                                    return(
                                        <View style={{ flexDirection: 'row', marginLeft: widthToDp("3%"), marginTop: heightToDp("2%") }}>
                                <Text style={{ fontFamily: 'Oswald-Medium', width: widthToDp("30%"), marginLeft: widthToDp("3%") }}>{i.categoryEnglish}</Text>
                                <Text style={{ fontFamily: 'Oswald-Medium', width: widthToDp("30%") }}>₹ {i.rate}</Text>
                                {/* <Text style={{ marginLeft: widthToDp("35%"), fontFamily: 'Oswald-Medium' }}>₹ {this.state.decimalPrice}</Text> */}
                                <Input
                                    placeholder={this.state.decimalPrice}
                                    keyboardType='number-pad'
                                    onChangeText={(data) => { this.setState({ materialPrice: data }) }}
                                    style={{ marginLeft: widthToDp("0%"), fontFamily: 'Oswald-Medium', width: widthToDp("0%"), marginTop: heightToDp("0%"), borderWidth: 1, borderRadius: 10, height: heightToDp("5%"), marginRight: widthToDp("5%") }}
                                />


                            </View>
                                    )
                                })
                            }
                            
                        </View>
                    </View>

                    <View style={{ marginTop: heightToDp("10%") }}></View>
                </ScrollView>

                <View style={{ flexDirection: 'row', height: heightToDp("10%"), alignSelf: 'center' }}>
                    <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                        <View style={{ backgroundColor: "#fff", height: heightToDp("6%"), width: widthToDp("30%"), borderRadius: 100, alignSelf: 'center', marginTop: heightToDp("2%") }}>
                            <Text style={{ fontSize: widthToDp("4%"), color: "#000", marginTop: heightToDp("1.3%"), alignSelf: 'center', fontFamily: 'Oswald-Medium' }}>BACK</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { this.saveButton() }}>
                        <View style={{ backgroundColor: "#fff", height: heightToDp("6%"), width: widthToDp("30%"), borderRadius: 100, marginLeft: widthToDp("1%"), marginTop: heightToDp("2%") }}>
                            <Text style={{ fontSize: widthToDp("4%"), color: "#000", marginTop: heightToDp("1.3%"), alignSelf: 'center', fontFamily: 'Oswald-Medium' }}>SAVE</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { this.nextScreen() }}>
                        <View style={{ backgroundColor: "#fff", height: heightToDp("6%"), width: widthToDp("30%"), borderRadius: 100, marginLeft: widthToDp("1%"), marginTop: heightToDp("2%") }}>
                            <Text style={{ fontSize: widthToDp("4%"), color: "#000", marginTop: heightToDp("1.3%"), alignSelf: 'center', fontFamily: 'Oswald-Medium' }}>NEXT</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}