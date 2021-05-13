import React, { Component } from 'react'
import { View, Button, Text } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import BaseColor from '../Core/BaseTheme'
import Icon from 'react-native-vector-icons/AntDesign'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { widthToDp, heightToDp } from '../Responsive'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Sync from 'react-native-vector-icons/AntDesign'
import Database from 'react-native-vector-icons/FontAwesome'
import NetInfo from '@react-native-community/netinfo'
import axios from 'axios'
import base64 from 'react-native-base64'


export default class GeneralSettingsScreen extends Component {
    state = {
        refreshLabel: "",
        patch:[],
        moneyManagerData:[],
        costBenifitAnalysis:[],
        patchData : []
    };
    go = async () => {
        await AsyncStorage.removeItem('_id')
        
        this.props.navigation.reset({
            index: 0,
            routes: [{ name: "LanguageScreen" }]
        });
    }
    refreshApplication = async () => {
        await AsyncStorage.removeItem('offlineData')
        await AsyncStorage.removeItem('cropData')
        await AsyncStorage.removeItem('numberOfCrops')
        await AsyncStorage.removeItem('labelsData')
        await AsyncStorage.removeItem('smallBusiness')
        this.props.navigation.reset({
            index: 0,
            routes: [{ name: "LanguageScreen" }]
        });
    }
    componentDidMount = async() => this.setLanguageOnMount();

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


    loadlabelsFromStorage = async () => {
        try {
            let username = await AsyncStorage.getItem('username')
            let user = await AsyncStorage.getItem('labelsData');
            let parsed = JSON.parse(user);
            var specificObject = parsed[0]
            var refreshLabel = specificObject.labels.find((i) => i.type === 220)
            var updateProfileLabel = specificObject.labels.find((i) => i.type === 230)
            var versionLabel = specificObject.labels.find((i) => i.type === 231)
            if (this.state.textLanguageChange === '0') {
                this.setState({ refreshLabel: refreshLabel.nameEnglish })
                this.setState({ updateProfileLabel: updateProfileLabel.nameEnglish })
                this.setState({ versionLabel: versionLabel.nameEnglish })
            } else if (this.state.textLanguageChange === '1') {
                this.setState({ refreshLabel: refreshLabel.nameHindi })
                this.setState({ updateProfileLabel: updateProfileLabel.nameHindi })
                this.setState({ versionLabel: versionLabel.nameHindi })
            } else if (this.state.textLanguageChange === '2') {
                this.setState({ refreshLabel: refreshLabel.nameHo })
                this.setState({ updateProfileLabel: updateProfileLabel.nameHo })
                this.setState({ versionLabel: versionLabel.nameHo })
            } else if (this.state.textLanguageChange === '3') {
                this.setState({ refreshLabel: refreshLabel.nameOdia })
                this.setState({ updateProfileLabel: updateProfileLabel.nameOdia })
                this.setState({ versionLabel: versionLabel.nameOdia })
            } else if (this.state.textLanguageChange === '4') {
                this.setState({ refreshLabel: refreshLabel.nameSanthali })
                this.setState({ updateProfileLabel: updateProfileLabel.nameSanthali })
                this.setState({ versionLabel: versionLabel.nameSanthali })
            }
        } catch (error) {
            alert(error)
        }
        //this.setState({ crops: specificObject.crops })
        //this.showData()
    }


    dataSync  = async() => {
        NetInfo.fetch().then(state => {
            var isConnected = state.isConnected
            if (isConnected === true) {
                return this.getOldData()
            }else{
                return alert("Please connect to internet")
            }
        })
    }


    getOldData = async() => {
        let userId = await AsyncStorage.getItem('_id')
        var username = await AsyncStorage.getItem('username')
        var token = await AsyncStorage.getItem('token')
        var encodedUsername = base64.encode(username)
        var patch = []
        var moneyManagerData= []
        var costBenifitAnalysis = []
        var patchData = []
        await axios.get('https://tupop.in/api/v1//synced-data?info='+userId , {
            headers:{
                'Content-type': "accept",
                'X-Information': encodedUsername,
                'Authorization': "POP " + token
            }
        }).then(function (response){
            var parsed = response.data.syncedData.userData
            var specificObject = parsed.find((i) => i.username === username)
            patch = specificObject.patch
            moneyManagerData = specificObject.moneyManagerData
            costBenifitAnalysis = specificObject.costBenifitAnalysis
            patchData = specificObject.patchData
            console.log(specificObject.patchData)
        }).catch(function (error){
            console.log(error)
        })

        this.state.patch = patch
        this.state.moneyManagerData = moneyManagerData
        this.state.costBenifitAnalysis = costBenifitAnalysis
        this.state.patchData = patchData
        this.setOldData()
    }


    setOldData = async() => {
        try{
            let username = await AsyncStorage.getItem('username')
            let user = await AsyncStorage.getItem('user');
            let parsed = JSON.parse(user);
            var specificObject = parsed.find((i) => i.username === username)
            specificObject.patch = this.state.patch
            specificObject.moneyManagerData = this.state.moneyManagerData
            specificObject.costBenifitAnalysis = this.state.costBenifitAnalysis
            specificObject.patchData = this.state.patchData
            await AsyncStorage.setItem('user', JSON.stringify(parsed))
            console.log(specificObject.patch)
            alert("data synced")
        }catch(error){
            console.log(error)
        }
    }



    render() {
        return (
            <View style={{ 
                backgroundColor: BaseColor.BackgroundColor, 
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center' 
            }}>     
                <TouchableOpacity 
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: heightToDp("5%"),
                        padding: heightToDp("2%"),
                        borderWidth: 1,
                        borderRadius: 10,
                        borderColor: '#fff',
                        backgroundColor: '#fff'
                    }}
                    onPress={() => this.props.navigation.navigate("EditProfile")}
                >
                    <Ionicons
                        name={Platform.OS==="android" ? 'md-create-outline' : 'ios-create-outline'}
                        size={40}
                        color={"#1b1b1b"}
                    />
                    <Text style={{
                        fontSize: 30,
                        marginLeft: widthToDp("4%")
                    }}>{this.state.updateProfileLabel}</Text>
                </TouchableOpacity>           
                <TouchableOpacity 
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: heightToDp("5%"),
                        padding: heightToDp("2%"),
                        borderWidth: 1,
                        borderRadius: 10,
                        borderColor: '#fff',
                        backgroundColor: '#fff'
                    }}
                    onPress={() => this.refreshApplication()}
                >
                    <Sync
                        name="sync"
                        size={30}
                        onPress={() => {}}
                    />
                    <Text style={{
                        fontSize: 30,
                        marginLeft: widthToDp("4%")
                    }}>{this.state.refreshLabel}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        borderWidth: 1,
                        borderRadius: 10,
                        borderColor: '#fff',
                        backgroundColor: '#fff',
                        padding: heightToDp("2%"),
                    }}
                    onPress={() => this.go()}
                >
                    <Icon
                        name="logout"
                        size={40}
                    />
                </TouchableOpacity>
                
                <TouchableOpacity 
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: heightToDp("5%"),
                        padding: heightToDp("2%"),
                        borderWidth: 1,
                        borderRadius: 10,
                        borderColor: '#fff',
                        backgroundColor: '#fff',
                        marginTop:heightToDp("5%")
                    }}
                    onPress={() => this.dataSync()}
                >
                    <Database
                        name="database"
                        size={30}
                        onPress={() => {}}
                    />
                    <Text style={{
                        fontSize: 30,
                        marginLeft: widthToDp("4%")
                    }}>DATA SYNC</Text>
                </TouchableOpacity>

                <Text style={{
                    position: 'absolute',
                    backgroundColor: '#fff',
                    bottom: 0,
                    width: '100%',
                    textAlign: 'center',
                    fontSize: widthToDp("4%"),
                    paddingVertical: heightToDp("0.8%"),
                    fontWeight: 'bold'
                }}>{this.state.versionLabel} - 1.0</Text>
            </View>
        );
    }
}