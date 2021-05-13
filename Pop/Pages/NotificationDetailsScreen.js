import React, { Component } from 'react'
import { View } from 'react-native'
import { Text } from 'native-base'
import BaseColor from '../Core/BaseTheme'
import TopLogo from '../assets/TopLogo'
import { heightToDp, widthToDp } from '../Responsive'
import Icon from 'react-native-vector-icons/AntDesign'
import Icon2 from 'react-native-vector-icons/FontAwesome'
import tts from 'react-native-tts'
import LanguageChange from '../Core/LanguageChange'
import { ScrollView } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import HeaderComponent from '../components/HeaderComponent'

export default class NotificationDetailsScreen extends Component {
    state = {
        notificationHeaderLabel: ""
    }

    componentDidMount() {
        this.setLanguageOnMount();
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

    loadlabelsFromStorage = async () => {
        try {
            let username = await AsyncStorage.getItem('username')
            let user = await AsyncStorage.getItem('labelsData');
            let parsed = JSON.parse(user);
            var specificObject = parsed[0]
            var notificationHeaderLabel = specificObject.labels.find((i) => i.type === 45)
            if (this.state.textLanguageChange === '0') {
                this.setState({notificationHeaderLabel: notificationHeaderLabel.nameEnglish})
            } else if (this.state.textLanguageChange === '1') {
                this.setState({notificationHeaderLabel: notificationHeaderLabel.nameHindi})
            } else if (this.state.textLanguageChange === '2') {
                this.setState({notificationHeaderLabel: notificationHeaderLabel.nameHo})
            } else if (this.state.textLanguageChange === '3') {
                this.setState({notificationHeaderLabel: notificationHeaderLabel.nameOdia})
            } else if (this.state.textLanguageChange === '4') {
                this.setState({notificationHeaderLabel: notificationHeaderLabel.nameSanthali})
            }

        } catch (error) {
            alert(error)
        }
    }

    speak = () => {
        
        tts.speak("this is the body of notification and it will contain the details of the notification")
    }
    
    getDateTime = (timeStamp, type) => {
        switch(type) {
            case "date" :
                return timeStamp.split("T")[0].split("-")[2] + "-" + timeStamp.split("T")[0].split("-")[1] + "-" + timeStamp.split("T")[0].split("-")[0];
            case "time" :
                return timeStamp.split("T")[1].split(".")[0];
            default: 
                break;
        }
    }
    render = () => {
        return (
            <View style={{ backgroundColor: BaseColor.BackgroundColor, flex: 1 }}>
                <HeaderComponent 
                    navigation={this.props.navigation}
                    hideBell={true}
                />
                <View style={{ marginTop: heightToDp("5%") }}>
                    <Text style={{ fontSize: widthToDp("7%"), alignSelf: 'center', fontFamily: 'Oswald-SemiBold' }}>{this.state.notificationHeaderLabel}</Text>
                </View>
                <View 
                    style={{
                        height: heightToDp("35%"),
                        backgroundColor: '#fff',
                        padding: widthToDp("3%"),
                        borderRadius: 10,
                        margin: widthToDp("5%")
                    }}
                >
                    <ScrollView>
                        <Text style={{fontFamily:'Oswald-Light',fontSize:widthToDp("4%")}}>
                            {this.props.route.params.notificationText ? this.props.route.params.notificationText : ""}
                        </Text>
                    </ScrollView>
                    <View style={{ flexDirection: 'row', marginTop: widthToDp("2%"), alignItems: 'center' }}>
                        <Icon
                            name="calendar"
                            size={15}
                        />
                        <Text style={{ marginLeft: widthToDp("2%"),fontFamily:'Oswald-Light' }}>{this.props.route.params.dateTime ? this.getDateTime(this.props.route.params.dateTime, "date") : ""}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: widthToDp("2%"), alignItems: 'center' }}>
                        <Icon
                            name="clockcircleo"
                            size={15}
                        />
                        <Text style={{ marginLeft: widthToDp("2%"),fontFamily:'Oswald-Light' }}>{this.props.route.params.dateTime ? this.getDateTime(this.props.route.params.dateTime, "time") : ""}</Text>
                    </View>
                    {/* <View style={{ backgroundColor: 'white', width: widthToDp("45%"), height: heightToDp("30%"), elevation: 10 }}>
                        <Text style={{ marginLeft: widthToDp("1%") ,fontFamily:'Oswald-Light'}}>From: Admin</Text>
                        <Text style={{ marginLeft: widthToDp("1%"), fontSize: widthToDp("5%"),fontFamily:'Oswald-Medium' }}>{item.name}</Text>
                        <View style={{ marginLeft: widthToDp("1%"), height: heightToDp("25%") }}>
                            
                        </View>
                        
                    </View> */}
                </View>
                {/* <View style={{ backgroundColor: '#fff', height: heightToDp("43%"), width: widthToDp("90%"), marginLeft: widthToDp("5%"), marginTop: heightToDp("5%"), borderRadius: 20, elevation: 10 }}>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ marginLeft: widthToDp("3%"), marginTop: heightToDp("3%"), fontSize: widthToDp("5%"), fontFamily: 'Oswald-Light' }}>From : {LanguageChange.second}</Text>
                        <Icon2
                            name="microphone"
                            color="black"
                            size={30}
                            onPress={() => this.speak()}
                            style={{ marginTop: heightToDp("4%"), marginLeft: widthToDp("55%") }}
                        />
                    </View>
                    <Text style={{ marginLeft: widthToDp("3%"), marginTop: heightToDp("1%"), fontSize: widthToDp("6%"), fontFamily: 'Oswald-SemiBold' }}>Title of the notification</Text>
                    <View style={{ height: heightToDp("25%"), marginTop: heightToDp("1%"), width: widthToDp("90%") }}>
                        <Text style={{ marginLeft: widthToDp("3%"), fontFamily: 'Oswald-Light', fontSize: widthToDp("6%") }}>this is the body of notification and it will contain the details of the notification</Text>
                    </View>
                    <View style={{ flexDirection: 'row', marginLeft: widthToDp("39%"), marginTop: heightToDp("1%") }}>
                        <Icon
                            name="calendar"
                            size={15}
                            style={{ marginTop: heightToDp("0.6%") }}
                        />
                        <Text style={{ marginLeft: widthToDp("2%"), marginRight: widthToDp("3%"), fontFamily: 'Oswald-Light' }}>12-01-2021</Text>
                        <Icon
                            name="clockcircleo"
                            size={15}
                            style={{ marginTop: heightToDp("0.6%") }}
                        />
                        <Text style={{ marginLeft: widthToDp("2%"), fontFamily: 'Oswald-Light' }}>10:12 AM</Text>
                    </View>
                </View> */}
            </View>
        );
    }    
}