import React from 'react';
import { Text, View } from 'react-native';
import TopLogo from '../assets/TopLogo';
import Sync from 'react-native-vector-icons/AntDesign'
import Icon from 'react-native-vector-icons/FontAwesome';
import { heightToDp, widthToDp } from '../Responsive';
import NetInfo from '@react-native-community/netinfo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import base64 from 'react-native-base64';
import { Toast } from 'native-base';

export default class HeaderComponent extends React.Component {
    state = {
        notificationCount: 0
    }

    componentDidMount = async() => {
        let isOnline = await NetInfo.fetch().then(state => state.isConnected);
        if(isOnline) {
            let username = base64.encode(await AsyncStorage.getItem('username'));
            let token = await AsyncStorage.getItem('token')
            let response = await axios.get("https://tupop.in/api/v1//notifications?info=604240ff4b9a872502ab64d0", {
                headers: {
                    'Content-type': "application/json",
                    'X-Information': username,
                    'Authorization': "POP " + token
                }
            })
            await AsyncStorage.setItem("notificationCount", String(response.data.notifications.length));
            this.setState({notificationCount: response.data.notifications.length})
        } else {
            this.setState({
                notificationCount: await AsyncStorage.getItem("notificationCount") ? Number(await AsyncStorage.getItem("notificationCount")) : 0
            })
        }
    }

    getNotifications = async () => {
        let isOnline = await NetInfo.fetch().then(state => state.isConnected); 
        if (isOnline) {
            this.props.navigation.navigate('NotificationsScreen')
        } else {
            Toast.show({
                type: "warning",
                text: "Please be online to see the notifications",
                duration: 3000
            })
        }            
    }  

    render = () => (
        <View style={{ backgroundColor: 'white', width: widthToDp("100%"), height: heightToDp("13%"), flexDirection: 'row' }}>
            <View style={{ marginTop: heightToDp("3%"), marginLeft: widthToDp("3%") }}>
                <TopLogo />
            </View>

            {
                this.props.isDashboard &&
                <Sync
                    name="sync"
                    size={30}
                    style={{ marginTop: heightToDp("4.6%"), marginLeft: widthToDp(`${this.props.hideHome ? 41.5 : 30}%`) }}
                    onPress={this.props.syncData}
                />
            }

            {
                !this.props.hideHome &&
                <Icon
                    name="home"
                    size={30}
                    style={{ marginTop: heightToDp("4.6%"), marginLeft: widthToDp(`${this.props.isDashboard ? 5 : this.props.hideBell ? 55 : 42}%`) }}
                    onPress={() => this.props.navigation.navigate('DashBoardScreen')}
                />
            }
            {
                !this.props.hideBell && 
                    <>
                        <Icon
                            name="bell"
                            size={30}
                            style={{ marginTop: heightToDp("4.6%"), marginLeft: widthToDp("5%") }}
                            onPress={this.getNotifications}
                        />
                        <View style={{
                            position: 'absolute',
                            top: heightToDp("3.2%"),
                            right: widthToDp("3%"),
                            width: 20,
                            height: 20, 
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: 20 / 2,
                            backgroundColor: '#1b1b1b'
                        }}>
                            <Text style={{
                                fontSize: widthToDp("3.3%"),
                                color: '#fff'
                            }}>{this.state.notificationCount}</Text>
                        </View>
                    </>
            }            
        </View>
    )
}