import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Toast } from 'native-base';
import BaseColor from '../Core/BaseTheme';
import Logo from '../assets/Logo';
import { heightToDp, widthToDp } from '../Responsive';
import { TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import axios from 'axios';
import DataAccess from '../Core/DataAccess';
import CustomIndicator from '../Core/CustomIndicator';
import NetInfo from '@react-native-community/netinfo';
import RBSheet from 'react-native-raw-bottom-sheet';
import RBSheet2 from 'react-native-raw-bottom-sheet';
import RBSheet3 from 'react-native-raw-bottom-sheet';
import RBSheet4 from 'react-native-raw-bottom-sheet';
import RBSheet5 from 'react-native-raw-bottom-sheet';
import Icon from 'react-native-vector-icons/EvilIcons';

export default class EditProfile extends React.Component {
    state = {
        fullName: "",
        age: "",
        contactNumber: "",
        fullNameLabel: "",
        ageLabel: "",
        contactLabel: "",
        headerLabel: ""
    }

    componentDidMount = async () => {
        this.fetchProfileDetails()
        this.setLanguageOnMount();
        this.loadlabelsFromStorage();
    }    

    getStateAndDist = async () => {
      var statesApi = []
      var distApi = []
      var gramApi = []
      var villageApi = []
      let resState = await axios.get("https://tupop.in/api/v1//zones", {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if(resState.data.status == 1) {
        this.setState({statesApi: resState.data.states});        
      }
    
        let resDist = await axios.get("https://tupop.in/api/v1//districts?state="+this.state.stateName, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if(resDist.data.status == 1) {
            this.setState({distApi: resDist.data.districts});            
        }

        let resBlock = await axios.get("https://tupop.in/api/v1//blocks?district="+this.state.district, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if(resBlock.data.status == 1) {
            this.setState({blockApi: resBlock.data.blocks});                
        }

        let resPanchayat = await axios.get("https://tupop.in/api/v1//gram-panchayats?block="+this.state.block, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if(resPanchayat.data.status == 1) {
            this.setState({villageApi: resPanchayat.data.gramPanchayats});                    
        }

        let resVillages = await axios.get("https://tupop.in/api/v1//villages?panchayat="+this.state.panchayat, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if(resVillages.data.status == 1) {
            this.setState({gramApi: resVillages.data.villages});
        }
  
    }

    statePicker = async (value) => {
      this.setState({
        stateName: value
      })
      var district = []
      await axios.get("https://tupop.in/api/v1//districts?state=" + value, {
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(function (response) {
        console.log(response.data.districts)
        district = response.data.districts
      }).catch(function (error) {
        console.log(error.message)
      })
      this.setState({ distApi: district, block: "", panchayat: "", village: "", district: "" })
      this.RBSheet.close()
    }

    districtPicker = async (value) => {
      this.setState({
        district: value
      })
      var block = []
      await axios.get("https://tupop.in/api/v1//blocks?district=" + value, {
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(function (response) {
        console.log(response.data.blocks, "jijijijji")
        block = response.data.blocks
        console.log(block, "block")
      }).catch(function (error) {
        console.log(error.message)
      })
      this.setState({ blockApi: block, block: "", panchayat: "", village: "" })
  
      this.RBSheet2.close()
    }
  
    gramPicker = async (value) => {
      this.setState({
        panchayat: value
      })
  
      var village = []
      await axios.get("https://tupop.in/api/v1//villages?panchayat=" + value, {
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(function (response) {
        console.log(response.data.villages, "jijijijji")
        village = response.data.villages
        //console.log(block,"block")
      }).catch(function (error) {
        console.log(error.message)
      })
  
      this.setState({ gramApi: village, village: ""  })
      this.RBSheet4.close()
    }
  
    villagePicker = (value) => {
      this.setState({
        village: value
      })
      this.RBSheet5.close()
    }
  
    blockPicker = async (value, id) => {
  
      this.setState({
        block: value
      })
      this.state.blockId = id
  
      var gram = []
      await axios.get("https://tupop.in/api/v1//gram-panchayats?block=" + value, {
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(function (response) {
        console.log(response.data.gramPanchayats)
        gram = response.data.gramPanchayats
      }).catch(function (error) {
        console.log(error.message)
      })
  
      this.setState({ villageApi: gram })
      //alert(id)
  
  
      //alert(this.state.blockId)
  
      this.RBSheet3.close()
    }

    fetchProfileDetails = async () => {
        let name = await AsyncStorage.getItem("name")
        let id = await AsyncStorage.getItem("_id")
        let age = Number(await AsyncStorage.getItem("age"))
        let phone = Number(await AsyncStorage.getItem("phone"))
        let stateName = await AsyncStorage.getItem("state")
        let district = await AsyncStorage.getItem("district")
        let village = await AsyncStorage.getItem("village")
        let panchayat = await AsyncStorage.getItem("panchayat")
        let block = await AsyncStorage.getItem("block")
        this.setState({
            fullName: name,
            age,
            contactNumber: phone,
            id,
            stateName,
            district,
            village,
            panchayat, 
            block
        }, this.getStateAndDist);
    }

    setLanguageOnMount = async () => {
        let defaultLanguage = await AsyncStorage.getItem('language')
        if (defaultLanguage === 'en') {
            this.setState({ textLanguageChange: '0' })
        } else if (defaultLanguage === 'hi') {
            this.setState({ textLanguageChange: '1' })
        } else if (defaultLanguage === 'ho') {
            this.setState({ textLanguageChange: '2' })
        } else if (defaultLanguage === 'od') {
            this.setState({ textLanguageChange: '3' })
        } else if (defaultLanguage === 'san') {
            this.setState({ textLanguageChange: '4' })
        }
    }

    loadlabelsFromStorage = async () => {
        try {
            let user = await AsyncStorage.getItem('labelsData');
            let parsed = JSON.parse(user);
            var specificObject = parsed[0]
            var headerLabel = specificObject.labels.find((i) => i.type === 230)
            var fullNameLabel = specificObject.labels.find((i) => i.type === 227)
            var ageLabel = specificObject.labels.find((i) => i.type === 228)
            var contactLabel = specificObject.labels.find((i) => i.type === 229)
            var stateLabel = specificObject.labels.find((i) => i.type === 16)
            var districtLabel = specificObject.labels.find((i) => i.type === 17)
            var blockLabel = specificObject.labels.find((i) => i.type === 212)
            var panchayatLabel = specificObject.labels.find((i) => i.type === 18)
            var villageLabel = specificObject.labels.find((i) => i.type === 19)
            if (this.state.textLanguageChange === '0') {

                this.setState({ headerLabel: headerLabel.nameEnglish })
                this.setState({ fullNameLabel: fullNameLabel.nameEnglish })
                this.setState({ ageLabel: ageLabel.nameEnglish })
                this.setState({ contactLabel: contactLabel.nameEnglish })
                this.setState({ stateLabel: stateLabel.nameEnglish })
                this.setState({ districtLabel: districtLabel.nameEnglish })
                this.setState({ blockLabel: blockLabel.nameEnglish })
                this.setState({ panchayatLabel: panchayatLabel.nameEnglish })
                this.setState({ villageLabel: villageLabel.nameEnglish })
            } else if (this.state.textLanguageChange === '1') {

                this.setState({ headerLabel: headerLabel.nameHindi })
                this.setState({ fullNameLabel: fullNameLabel.nameHindi })
                this.setState({ ageLabel: ageLabel.nameHindi })
                this.setState({ contactLabel: contactLabel.nameHindi })
                this.setState({ stateLabel: stateLabel.nameHindi })
                this.setState({ districtLabel: districtLabel.nameHindi })
                this.setState({ blockLabel: blockLabel.nameHindi })
                this.setState({ panchayatLabel: panchayatLabel.nameHindi })
                this.setState({ villageLabel: villageLabel.nameHindi })
            } else if (this.state.textLanguageChange === '2') {

                this.setState({ headerLabel: headerLabel.nameHo })
                this.setState({ fullNameLabel: fullNameLabel.nameHo })
                this.setState({ ageLabel: ageLabel.nameHo })
                this.setState({ contactLabel: contactLabel.nameHo })
                this.setState({ stateLabel: stateLabel.nameHo })
                this.setState({ districtLabel: districtLabel.nameHo })
                this.setState({ blockLabel: blockLabel.nameHo })
                this.setState({ panchayatLabel: panchayatLabel.nameHo })
                this.setState({ villageLabel: villageLabel.nameHo })
            } else if (this.state.textLanguageChange === '3') {

                this.setState({ headerLabel: headerLabel.nameOdia })
                this.setState({ fullNameLabel: fullNameLabel.nameOdia })
                this.setState({ ageLabel: ageLabel.nameOdia })
                this.setState({ contactLabel: contactLabel.nameOdia })
                this.setState({ stateLabel: stateLabel.nameOdia })
                this.setState({ districtLabel: districtLabel.nameOdia })
                this.setState({ blockLabel: blockLabel.nameOdia })
                this.setState({ panchayatLabel: panchayatLabel.nameOdia })
                this.setState({ villageLabel: villageLabel.nameOdia })
            } else if (this.state.textLanguageChange === '4') {
                
                this.setState({ headerLabel: headerLabel.nameSanthali })
                this.setState({ fullNameLabel: fullNameLabel.nameSanthali })
                this.setState({ ageLabel: ageLabel.nameSanthali })
                this.setState({ contactLabel: contactLabel.nameSanthali })
                this.setState({ stateLabel: stateLabel.nameSanthali })
                this.setState({ districtLabel: districtLabel.nameSanthali })
                this.setState({ blockLabel: blockLabel.nameSanthali })
                this.setState({ panchayatLabel: panchayatLabel.nameSanthali })
                this.setState({ villageLabel: villageLabel.nameSanthali })
            }
        } catch (error) {
            alert(error)
        }
        this.setState({ crops: specificObject.crops })
        //this.showData()
    }

    updateProfile = async () => {
        if(this.state.fullName === "") {
            return Toast.show({
                type: "warning",
                text: "Please enter your name",
                duration: 3000
            })
        } else if(Number(this.state.age) === 0) {
            return Toast.show({
                type: "warning",
                text: "Please enter your age",
                duration: 3000
            })
        } else if(Number(this.state.age) < 12 || Number(this.state.age) > 100) {
            return;
        } else if(Number(this.state.contactNumber) === 0) {
            return Toast.show({
                type: "warning",
                text: "Please enter your contact number",
                duration: 3000
            })
        } else if(String(this.state.contactNumber).length !== 10) {
            return;
        } else if(this.state.stateName=== "") {
            return Toast.show({
                type: "warning",
                text: "Please select state",
                duration: 3000
            })
        } else if(this.state.district === "") {
            return Toast.show({
                type: "warning",
                text: "Please select district",
                duration: 3000
            })
        } else if(this.state.block=== "") {
            return Toast.show({
                type: "warning",
                text: "Please select block",
                duration: 3000
            })
        } else if(this.state.panchayat=== "") {
            return Toast.show({
                type: "warning",
                text: "Please select gram panchayat",
                duration: 3000
            })
        } else if(this.state.village=== "") {
            return Toast.show({
                type: "warning",
                text: "Please select village",
                duration: 3000
            })
        }

        let isOnline = await NetInfo.fetch().then(state => state.isConnected);

        if(isOnline) {
            this.setState({isLoading: true});
            let blockInfo;
            let resBlock = await axios.get("https://tupop.in/api/v1//blocks?district="+this.state.district, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if(resBlock.data.status == 1) {
                resBlock.data.blocks.length > 0 &&
                resBlock.data.blocks.map(i => {
                    if(i.block === this.state.block) {
                        blockInfo = i._id;
                    }
                })             
            }
            await axios.patch(DataAccess.BaseUrl + DataAccess.AccessUrl + DataAccess.SignUp, {
                "name": this.state.fullName,
                "age": this.state.age,
                "phone": this.state.contactNumber,
                "info": this.state.id,
                "state": this.state.stateName,
                "district": this.state.district,
                "panchayat": this.state.panchayat,
                "village": this.state.village,
                "blockInfo": blockInfo
            }, {
                headers: {
                'Content-type': 'application/json'
                }
            }).then(async response => {
                if(response.data.status === 1) {
                    await AsyncStorage.setItem("name", this.state.fullName);
                    await AsyncStorage.setItem("age", String(this.state.age));
                    await AsyncStorage.setItem("phone", String(this.state.contactNumber));
                    await AsyncStorage.setItem("state", String(this.state.stateName));
                    await AsyncStorage.setItem("district", String(this.state.district));
                    await AsyncStorage.setItem("block", String(this.state.block));
                    await AsyncStorage.setItem("panchayat", String(this.state.panchayat));
                    await AsyncStorage.setItem("village", String(this.state.village));
                    this.setState({isLoading: false});
                    return Toast.show({
                        type: 'success',
                        text: "Profile has been updated successfully.",
                        duration: 3000
                    })
                } else {
                    this.setState({isLoading: false});
                    return Toast.show({
                        type: 'danger',
                        text: "Some error occurred",
                        duration: 3000
                    })
                }
            }).catch(err => {                
                this.setState({isLoading: false});
                return Toast.show({
                    type: 'danger',
                    text: "Network Error - Please try later",
                    duration: 3000
                })
            })     
            
        } else {
            return Toast.show({
                type: 'warning',
                text: 'Please be online to update own profile',
                duration: 3000
            })
        }
    }

    render = () => (
        <KeyboardAwareScrollView
            style={{
                backgroundColor: BaseColor.BackgroundColor, 
                flex: 1,
            }}
            keyboardShouldPersistTaps='handled'
        >
            <View style={{ marginTop: heightToDp("3%"), alignSelf: "center" }}>
                <Logo />
            </View>
            <View style={{ marginTop: heightToDp("5%") }}>
                <Text style={{ fontSize: widthToDp("7%"), alignSelf: 'center', fontFamily: 'Oswald-Medium' }}>{this.state.headerLabel}</Text>
            </View>

            <View style={{ marginTop: heightToDp("5%"), marginLeft: widthToDp("8%") }}>
                <Text style={[styles.labelInput, { marginLeft: widthToDp("2%") }]}>{this.state.fullNameLabel}</Text>
                <TextInput
                    style={[styles.input, styles.formInput]}
                    onChangeText={text => this.setState({fullName: text})}
                    defaultValue={this.state.fullName}
                    // onChangeText={(value) => console.warn(value)}
                />
            </View>
            <View style={{ marginTop: heightToDp("3%"), marginLeft: widthToDp("8%") }}>
                <Text style={[styles.labelInput, { marginLeft: widthToDp("2%") }]}>{this.state.ageLabel}</Text>
                <TextInput
                    style={[styles.input, styles.formInput]}
                    onChangeText={text => this.setState({age: Number(text)})}
                    keyboardType="numeric"
                    defaultValue={String(this.state.age)}
                    // onChangeText={(value) => console.warn(value)}
                />
            </View>
            {
                (Number(this.state.age) < 12 || Number(this.state.age) > 100) &&
                <Text style={styles.validationStyle}>Age must be within 12 and 100 years</Text>
            }
            <View style={{ marginTop: heightToDp("3%"), marginLeft: widthToDp("8%") }}>
                <Text style={[styles.labelInput, { marginLeft: widthToDp("2%") }]}>{this.state.contactLabel}</Text>
                <TextInput
                    style={[styles.input, styles.formInput]}
                    onChangeText={text => this.setState({contactNumber: Number(text)})}
                    keyboardType="numeric"
                    defaultValue={String(this.state.contactNumber)}
                    // onChangeText={(value) => console.warn(value)}
                />
            </View>
            {
                (String(this.state.contactNumber).length !== 10) &&
                <Text style={styles.validationStyle}>Contact Number must be of 10 digit</Text>
            }
            <View style={{ marginTop: heightToDp("3%"), marginLeft: widthToDp("8%") }}>
                <Text style={[styles.labelInput, { marginLeft: widthToDp("2%") }]}>{this.state.stateLabel}</Text>
                <TouchableOpacity style={{ flexDirection: 'row', borderBottomWidth: 1, width: widthToDp("80%") }} onPress={() => this.RBSheet.open()}>
                    <View style={{ width: widthToDp("30%") }}>
                        <Text 
                            style={{ 
                                fontSize: widthToDp("4.6%"), 
                                marginLeft: widthToDp("2%"), 
                                fontFamily: 'Oswald-Medium' 
                            }}
                        >{this.state.stateName}</Text>
                    </View>
        
                    <Icon
                        name="chevron-down"
                        size={40}
                        style={{ marginLeft: widthToDp("43%") }}
                    />
                </TouchableOpacity>
                <RBSheet
                ref={ref => {
                    this.RBSheet = ref;
                }}
                height={heightToDp("40%")}
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
                            this.state.statesApi && this.state.statesApi.length > 0 &&
                            this.state.statesApi.map((i) => {
                                return (
                                <TouchableOpacity onPress={() => this.statePicker(i.state)}>
                                    <Text style={{ fontSize: widthToDp("4.6%"), alignSelf: 'center', fontFamily: 'Oswald-Medium' }}>{i.state}</Text>
                                    <View style={{ borderBottomColor: 'black', borderBottomWidth: 1, marginTop: heightToDp('0.1%'), width: widthToDp("80%"), marginLeft: widthToDp("8.2%") }}></View>
                                </TouchableOpacity>
                                );
                            })
                        }
                    </ScrollView>
                </RBSheet>
            </View>
            <View style={{ marginTop: heightToDp("3%"), marginLeft: widthToDp("8%") }}>
                <Text style={[styles.labelInput, { marginLeft: widthToDp("2%") }]}>{this.state.districtLabel}</Text>
                <TouchableOpacity style={{ flexDirection: 'row', borderBottomWidth: 1, width: widthToDp("80%") }} onPress={() => this.RBSheet2.open()}>
                    <View style={{ width: widthToDp("30%") }}>
                        <Text 
                            style={{ 
                                fontSize: widthToDp("4.6%"), 
                                marginLeft: widthToDp("2%"), 
                                fontFamily: 'Oswald-Medium' 
                            }}
                        >{this.state.district}</Text>
                    </View>
        
                    <Icon
                        name="chevron-down"
                        size={40}
                        style={{ marginLeft: widthToDp("43%") }}
                    />
                </TouchableOpacity>
                <RBSheet2
                ref={ref => {
                    this.RBSheet2 = ref;
                }}
                height={heightToDp("40%")}
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
                            this.state.distApi && this.state.distApi.length > 0 &&
                            this.state.distApi.map((i) => {
                                return (
                                <TouchableOpacity onPress={() => this.districtPicker(i.district)}>
                                    <Text style={{ fontSize: widthToDp("4.6%"), alignSelf: 'center', fontFamily: 'Oswald-Medium' }}>{i.district}</Text>
                                    <View style={{ borderBottomColor: 'black', borderBottomWidth: 1, marginTop: heightToDp('0.1%'), width: widthToDp("80%"), marginLeft: widthToDp("8.2%") }}></View>
                                </TouchableOpacity>
                                );
                            })
                        }
                    </ScrollView>
                </RBSheet2>
            </View>
            <View style={{ marginTop: heightToDp("3%"), marginLeft: widthToDp("8%") }}>
                <Text style={[styles.labelInput, { marginLeft: widthToDp("2%") }]}>{this.state.blockLabel}</Text>
                <TouchableOpacity style={{ flexDirection: 'row', borderBottomWidth: 1, width: widthToDp("80%") }} onPress={() => this.RBSheet3.open()}>
                    <View style={{ width: widthToDp("30%") }}>
                        <Text 
                            style={{ 
                                fontSize: widthToDp("4.6%"), 
                                marginLeft: widthToDp("2%"), 
                                fontFamily: 'Oswald-Medium' 
                            }}
                        >{this.state.block}</Text>
                    </View>
        
                    <Icon
                        name="chevron-down"
                        size={40}
                        style={{ marginLeft: widthToDp("43%") }}
                    />
                </TouchableOpacity>
                <RBSheet3
                ref={ref => {
                    this.RBSheet3 = ref;
                }}
                height={heightToDp("40%")}
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
                            this.state.blockApi && this.state.blockApi.length > 0 &&
                            this.state.blockApi.map((i) => {
                                return (
                                <TouchableOpacity onPress={() => this.blockPicker(i.block, i._id)}>
                                    <Text style={{ fontSize: widthToDp("4.6%"), alignSelf: 'center', fontFamily: 'Oswald-Medium' }}>{i.block}</Text>
                                    <View style={{ borderBottomColor: 'black', borderBottomWidth: 1, marginTop: heightToDp('0.1%'), width: widthToDp("80%"), marginLeft: widthToDp("8.2%") }}></View>
                                </TouchableOpacity>
                                );
                            })
                        }
                    </ScrollView>
                </RBSheet3>
            </View>
            <View style={{ marginTop: heightToDp("3%"), marginLeft: widthToDp("8%") }}>
                <Text style={[styles.labelInput, { marginLeft: widthToDp("2%") }]}>{this.state.panchayatLabel}</Text>
                <TouchableOpacity style={{ flexDirection: 'row', borderBottomWidth: 1, width: widthToDp("80%") }} onPress={() => this.RBSheet4.open()}>
                    <View style={{ width: widthToDp("30%") }}>
                        <Text 
                            style={{ 
                                fontSize: widthToDp("4.6%"), 
                                marginLeft: widthToDp("2%"), 
                                fontFamily: 'Oswald-Medium' 
                            }}
                        >{this.state.panchayat}</Text>
                    </View>
        
                    <Icon
                        name="chevron-down"
                        size={40}
                        style={{ marginLeft: widthToDp("43%") }}
                    />
                </TouchableOpacity>
                <RBSheet4
                ref={ref => {
                    this.RBSheet4 = ref;
                }}
                height={heightToDp("40%")}
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
                            this.state.villageApi && this.state.villageApi.length > 0 &&
                            this.state.villageApi.map((i) => {
                                return (
                                <TouchableOpacity onPress={() => this.gramPicker(i.gramPanchayat)}>
                                    <Text style={{ fontSize: widthToDp("4.6%"), alignSelf: 'center', fontFamily: 'Oswald-Medium' }}>{i.gramPanchayat}</Text>
                                    <View style={{ borderBottomColor: 'black', borderBottomWidth: 1, marginTop: heightToDp('0.1%'), width: widthToDp("80%"), marginLeft: widthToDp("8.2%") }}></View>
                                </TouchableOpacity>
                                );
                            })
                        }
                    </ScrollView>
                </RBSheet4>
            </View>
            <View style={{ marginTop: heightToDp("3%"), marginLeft: widthToDp("8%") }}>
                <Text style={[styles.labelInput, { marginLeft: widthToDp("2%") }]}>{this.state.villageLabel}</Text>
                <TouchableOpacity style={{ flexDirection: 'row', borderBottomWidth: 1, width: widthToDp("80%") }} onPress={() => this.RBSheet5.open()}>
                    <View style={{ width: widthToDp("30%") }}>
                        <Text 
                            style={{ 
                                fontSize: widthToDp("4.6%"), 
                                marginLeft: widthToDp("2%"), 
                                fontFamily: 'Oswald-Medium' 
                            }}
                        >{this.state.village}</Text>
                    </View>
        
                    <Icon
                        name="chevron-down"
                        size={40}
                        style={{ marginLeft: widthToDp("43%") }}
                    />
                </TouchableOpacity>
                <RBSheet5
                ref={ref => {
                    this.RBSheet5 = ref;
                }}
                height={heightToDp("40%")}
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
                            this.state.gramApi && this.state.gramApi.length > 0 &&
                            this.state.gramApi.map((i) => {
                                return (
                                <TouchableOpacity onPress={() => this.villagePicker(i.village)}>
                                    <Text style={{ fontSize: widthToDp("4.6%"), alignSelf: 'center', fontFamily: 'Oswald-Medium' }}>{i.village}</Text>
                                    <View style={{ borderBottomColor: 'black', borderBottomWidth: 1, marginTop: heightToDp('0.1%'), width: widthToDp("80%"), marginLeft: widthToDp("8.2%") }}></View>
                                </TouchableOpacity>
                                );
                            })
                        }
                    </ScrollView>
                </RBSheet5>
            </View>

            {
                this.state.isLoading ?
                <View style={{marginTop: heightToDp("2%")}}>
                    <CustomIndicator IsLoading={this.state.isLoading} />
                </View>:
                <TouchableOpacity onPress={this.updateProfile} disabled={this.state.isLoading}>
                    <View style={{ backgroundColor: BaseColor.SecondaryColor, marginTop: heightToDp("5%"), width: widthToDp("40%"), alignSelf: 'center', height: heightToDp("5%"), borderRadius: 100 }}>
                        <Text style={{ alignSelf: 'center', marginTop: heightToDp("0.5%"), fontWeight: '500', fontSize: widthToDp("5%"), fontFamily: 'Oswald-Medium' }}>{this.state.headerLabel}</Text>
                    </View>
                </TouchableOpacity>
            }
            <View style={{height: heightToDp("2%")}}/>
        </KeyboardAwareScrollView>
    )
}

const styles = StyleSheet.create({    
  labelInput: {
    color: '#000',
    fontSize: widthToDp("4.6%"),
    fontFamily: 'Oswald-Medium'
  },
  formInput: {
    borderBottomWidth: 1.5,
    borderColor: '#333',
    width: widthToDp("80%")
  },
  input: {
    borderWidth: 0,
    height: heightToDp("6%"),
    fontSize: widthToDp("5%"),
    fontFamily: 'Oswald-Light'
  },
  validationStyle: { marginLeft: widthToDp("8%"), color: '#8B0000' }
})