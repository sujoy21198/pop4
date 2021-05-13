import React, { Component } from 'react'
import { View, StyleSheet, ScrollView, TouchableOpacity, PermissionsAndroid } from 'react-native'
import { Text, Item, ListItem, Right, Left, Picker, Toast, Input } from 'native-base'
import { heightToDp, widthToDp } from '../Responsive';
import BaseColor from '../Core/BaseTheme';
import Logo from '../assets/Logo';
import Icon from 'react-native-vector-icons/EvilIcons'
import Calendar from 'react-native-vector-icons/AntDesign'
import FloatingLabel from 'react-native-floating-labels'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import DatePicker from 'react-native-datepicker'
import DeviceInfo from 'react-native-device-info'
import axios from 'axios';
import RBSheet from "react-native-raw-bottom-sheet"
import RBSheet2 from "react-native-raw-bottom-sheet"
import RBSheet3 from "react-native-raw-bottom-sheet"
import RBSheet4 from "react-native-raw-bottom-sheet"
import RBSheet5 from "react-native-raw-bottom-sheet"
import RBSheet6 from "react-native-raw-bottom-sheet"
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button'
import DataAccess from '../Core/DataAccess'
import CustomIndicator from '../Core/CustomIndicator'
import LanguageChange from '../Core/LanguageChange'
import Language from '../Core/Languages'
import DialogInput from 'react-native-dialog-input';
import { TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


const radio_props = [
  { label: LanguageChange.otp, value: 0 },
  { label: LanguageChange.blockPassword, value: 1 }
]

const validationStyle = ({ marginLeft: widthToDp("8%"), color: '#8B0000' });

export default class RegistrationScreen extends Component {

  constructor(props) {
    super(props)
    this.state = {
      date: '',
      age: 'AGE',
      deviceId: '',
      genderPicker: LanguageChange.gender,
      fullname: '',
      phoneNumber: '',
      username: '',
      password: '',
      confirmPassword: '',
      state: LanguageChange.state,
      district: LanguageChange.district,
      gram: LanguageChange.gramPanchayat,
      village: LanguageChange.village,
      participantNumber: '',
      fieldOfficerPass: '',
      value: '',
      status: '',
      passwordVisibility: true,
      isLoading: false,
      selectedLanguage: '',
      statesApi: [],
      distApi: [],
      gramApi: [],
      villageApi: [],
      block: LanguageChange.block,
      blockId: '',
      isDialogVisible: false,
      blockApi: [],
      sentOtp: ''
    }

    this.state.selectedLanguage = this.props.route.params.selectedLanguage
  }

  componentDidMount() {
    this.getDeviceId()
    this.getStateAndDist()
  }

  getStateAndDist = async () => {
    var statesApi = []
    var distApi = []
    var gramApi = []
    var villageApi = []
    await axios.get("https://tupop.in/api/v1//zones", {
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(function (response) {
      console.log(response.data.states)
      statesApi = response.data.states
      distApi = response.data.districtsAndBlocks
      gramApi = response.data.gramPanchayatVillage
      villageApi = response.data.gramPanchayatVillage[0].villageData
    }).catch(function (error) {
      console.log(error.message)
    })
    this.setState({ statesApi: statesApi })

  }

  checkStatus = (value) => {
    this.setState({ value: value })
    if (value === 1) {
      this.setState({ status: true })
    } else {
      this.setState({ status: false })
    }

    if (value === 0) {
      this.setState({ isDialogVisible: true })
      this.otpSignup()
    }
  }

  otpSignup = async () => {
    var sentOtp;
    await axios.post(DataAccess.BaseUrl + DataAccess.AccessUrl + DataAccess.SignUp, {
      name: this.state.fullname,
      gender: this.state.genderPicker,
      age: this.state.age,
      phone: this.state.phoneNumber,
      username: this.state.username,
      password: this.state.password,
      state: this.state.state,
      district: this.state.district,
      panchayat: this.state.gram,
      village: this.state.village,
      participantNumber: this.state.participantNumber,
      blockPassword: this.state.fieldOfficerPass,
      deviceId: this.state.deviceId,
      blockInfo: this.state.blockId
    }, {
      headers: {
        'Content-type': 'application/json'
      }
    }).then(function (response) {
      console.log(response.data, "kokokok")
      sentOtp = response.data.data

    }).catch(function (error) {
      console.log(error)
    })
    this.setState({ sentOtp: sentOtp })
  }

  verifyOtp = async (otp) => {
    var status
    await axios.post(DataAccess.BaseUrl + DataAccess.AccessUrl + DataAccess.SignUp, {
      name: this.state.fullname,
      gender: this.state.genderPicker,
      age: this.state.age,
      phone: this.state.phoneNumber,
      username: this.state.username,
      password: this.state.password,
      state: this.state.state,
      district: this.state.district,
      panchayat: this.state.gram,
      village: this.state.village,
      participantNumber: this.state.participantNumber,
      blockPassword: this.state.fieldOfficerPass,
      deviceId: this.state.deviceId,
      blockInfo: this.state.blockId,
      sentOtp: this.state.sentOtp,
      verifyOtp: otp
    }, {
      headers: {
        'Content-type': 'application/json'
      }
    }).then(function (response) {
      console.log(response.data, "kokokok")
      sentOtp = response.data.data
      status = response.data.status

    }).catch(function (error) {
      console.log(error)
    })
    this.setState({ isDialogVisible: false })

    if (status === 1) {
      alert("Registration successful")
    }else{
      alert("Registration failed.Please try again.")
    }

    this.props.navigation.reset({
      index: 0,
      routes: [{
        name: "SigninScreen",
        params: { selectedLanguage: this.state.selectedLanguage }
      }]
    });
  }

  getDeviceId = async () => {
    var deviceId = await DeviceInfo.getAndroidId()
    this.setState({ deviceId: deviceId })
  }

  signup = async () => {

    var name = this.state.fullname
    var status
    var load = true
    this.setState({ isLoading: true })

    if (this.state.age < 12 || this.state.age >= 100) {
      this.setState({ isLoading: false })
      return Toast.show({
        text: "Age must be grater than 12 and less than 100",
        duration: 3000,
        type: 'danger'
      })
    }

    if (this.state.password != this.state.confirmPassword) {
      this.setState({ isLoading: false })
      return Toast.show({
        text: "Passwords Doesnt match",
        duration: 3000,
        type: 'danger'
      })
    }

    if (this.state.phoneNumber.length != 10) {
      this.setState({ isLoading: false })
      return Toast.show({
        text: "Phone Number must be of 10 digits",
        duration: 3000,
        type: 'danger'
      })
    }
    //otp
    // alert(this.state.age)
    // if (this.state.age < 12 && this.state.age >= 100) {
    //   this.setState({ isLoading: false })
    //   return Toast.show({
    //     text: "Age must be grater than 12 and less than 100",
    //     duration: 3000,
    //     type: 'danger'
    //   })
    // } else if (this.state.password != this.state.confirmPassword) {
    //   this.setState({ isLoading: false })
    //   return Toast.show({
    //     text: "Password doesn't match",
    //     duration: 3000,
    //     type: 'danger'
    //   })
    // } else if (this.state.phoneNumber.length != 10) {
    //   this.setState({ isLoading: false })
    //   return Toast.show({
    //     text: "Phone number shoud consist of 10 digits",
    //     duration: 3000,
    //     type: 'danger'
    //   })
    // }
    // await axios.get('http://127.0.0.1:3000/api/v1/token').then(function (response) {
    //   console.log(response)
    // }).catch(function (error){
    //   console.log(error)
    // })
    await axios.post(DataAccess.BaseUrl + DataAccess.AccessUrl + DataAccess.SignUp, {
      name: this.state.fullname,
      gender: this.state.genderPicker,
      age: this.state.age,
      phone: this.state.phoneNumber,
      username: this.state.username,
      password: this.state.password,
      state: this.state.state,
      district: this.state.district,
      panchayat: this.state.gram,
      village: this.state.village,
      participantNumber: this.state.participantNumber,
      blockPassword: this.state.fieldOfficerPass,
      deviceId: this.state.deviceId,
      blockInfo: this.state.blockId
    }, {
      headers: {
        'Content-type': 'application/json'
      }
    }).then(function (response) {
      console.log(response.data, "kokokok")
      status = response.data.status
      // alert(response.data.msg)
      if (response.data.status === 1) {
        console.log("yes")

        // redirect = true
        Toast.show({
          text: name + ' ' + response.data.msg,
          type: 'success',
          duration: 3000
        })
        this.setState({ isLoading: false, value: 1 })
      } else {
        load = false
        Toast.show({
          text: response.data.msg,
          type: 'danger',
          duration: 3000
        })
      }

    }).catch(function (error) {
      console.log(error)
    })

    if (load === false) {
      this.setState({ isLoading: false })
    }

    if (status === 1) {
      this.props.navigation.reset({
        index: 0,
        routes: [{
          name: "SigninScreen",
          params: { selectedLanguage: this.state.selectedLanguage }
        }]
      });
    }

    // if (this.state.value === 1) {
    //   // this.props.navigation.navigate({
    //   //     name: 'DashBoardScreen'
    //   // })

    //   this.props.navigation.reset({
    //     index: 0,
    //     routes: [{
    //       name: "SigninScreen",
    //       params: { selectedLanguage: this.state.selectedLanguage }
    //     }]
    //   });
    // }else if(this.state.value === 0 && this.state.phoneNumber != ''){
    //   this.setState({ isDialogVisible: true })
    // }
  }

  ageValidator = (data) => {

  }

  genderPicker = (value) => {
    this.setState({
      genderPicker: value
    })
    this.RBSheet.close()
    // this.setState({
    //   genderPicker: value
    // })
  }

  statePicker = async (value) => {
    this.setState({
      state: value
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
    this.setState({ distApi: district })
    this.RBSheet3.close()
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
    this.setState({ blockApi: block })

    this.RBSheet4.close()
  }

  gramPicker = async (value) => {
    this.setState({
      gram: value
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

    this.setState({ villageApi: village })
    this.RBSheet2.close()
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

    this.setState({ gramApi: gram })
    //alert(id)


    //alert(this.state.blockId)

    this.RBSheet6.close()
  }



  FullName = (value) => {
    this.setState({
      fullname: value
    })
  }

  render() {
    var statesApi = []
    statesApi = this.state.statesApi
    var distApi = []
    distApi = this.state.distApi
    var gramApi = []
    gramApi = this.state.gramApi
    var villageApi = []
    villageApi = this.state.villageApi
    var blockApi = []
    blockApi = this.state.blockApi
    return (
      <KeyboardAwareScrollView style={{ backgroundColor: BaseColor.BackgroundColor, flex: 1 }}
        keyboardShouldPersistTaps='handled'>

        <View style={{ marginTop: heightToDp("3%"), alignSelf: "center" }}>
          <Logo />
        </View>
        <View style={{ marginTop: heightToDp("5%") }}>
          <Text style={{ fontSize: widthToDp("7%"), alignSelf: 'center', fontFamily: 'Oswald-Medium' }}>{LanguageChange.registration}</Text>
        </View>

        <View style={{ marginTop: heightToDp("5%"), marginLeft: widthToDp("8%") }}>
          <Text style={[styles.labelInput, { marginLeft: widthToDp("2%") }]}>{LanguageChange.fullname}</Text>
          <Input
            style={[styles.input, styles.formInput]}
            onChangeText={(value) => this.FullName(value)}
          />
          {/* <FloatingLabel
            labelStyle={styles.labelInput}
            inputStyle={styles.input}
            style={styles.formInput}
            onChangeText={(value) => this.FullName(value)}
          >{LanguageChange.fullname}</FloatingLabel> */}
        </View>
        <View style={{ marginTop: heightToDp("5%"), marginLeft: widthToDp("8%"), flexDirection: 'row' }}>
          <TouchableOpacity style={{ flexDirection: 'row' }} onPress={() => this.RBSheet.open()}>
            <View style={{ width: widthToDp("30%") }}>
              <Text style={{ fontSize: widthToDp("4.6%"), marginLeft: widthToDp("2%"), fontFamily: 'Oswald-Medium' }}>{this.state.genderPicker}</Text>
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
            <TouchableOpacity onPress={() => this.genderPicker("MALE")}>
              <Text style={{ fontSize: widthToDp("4.6%"), marginLeft: widthToDp("2%"), fontFamily: 'Oswald-Medium' }}>MALE</Text>
            </TouchableOpacity>
            <View style={{ borderBottomColor: 'black', borderBottomWidth: 1, marginTop: heightToDp('0.1%'), width: widthToDp("80%"), marginLeft: widthToDp("8.2%") }}></View>
            <TouchableOpacity onPress={() => this.genderPicker("FEMALE")}>
              <Text style={{ fontSize: widthToDp("4.6%"), marginLeft: widthToDp("2%"), fontFamily: 'Oswald-Medium', marginTop: heightToDp('3%') }}>FEMALE</Text>
            </TouchableOpacity>
            <View style={{ borderBottomColor: 'black', borderBottomWidth: 1, marginTop: heightToDp('0.1%'), width: widthToDp("80%"), marginLeft: widthToDp("8.2%") }}></View>
            <TouchableOpacity onPress={() => this.genderPicker("NON-BINARY")}>
              <Text style={{ fontSize: widthToDp("4.6%"), marginLeft: widthToDp("2%"), fontFamily: 'Oswald-Medium', marginTop: heightToDp('3%') }}>NON-BINARY</Text>
            </TouchableOpacity>
            <View style={{ borderBottomColor: 'black', borderBottomWidth: 1, marginTop: heightToDp('0.1%'), width: widthToDp("80%"), marginLeft: widthToDp("8.2%") }}></View>
          </RBSheet>
          {/* <Picker
              mode="dropdown"
              
              selectedValue={this.state.genderPicker}
              onValueChange={(value) => this.pickerValue(value)}
              style={{ width: widthToDp("83%") }}
            >
              <Picker.Item label="Gender" value="gender" />
              <Picker.Item label="Male" value="male" />
              <Picker.Item label="Female" value="female" />
              <Picker.Item label="Others" value="others" />
            </Picker> */}
        </View>
        <View style={{ borderBottomColor: 'black', borderBottomWidth: 1, marginTop: heightToDp('0.1%'), width: widthToDp("80%"), marginLeft: widthToDp("8.2%") }}></View>

        <View style={{ marginTop: heightToDp("2.5%"), marginLeft: widthToDp("8%") }}>
          <Text style={[styles.labelInput, { marginLeft: widthToDp("2%") }]}>{LanguageChange.age}</Text>
          <Input
            style={[styles.input, styles.formInput]}
            onChangeText={(text) => this.setState({ age: text })}
            keyboardType='numeric'
          />
        </View>
        {
          this.state.age !== "" && (this.state.age < 12 || this.state.age > 100) &&
          <Text style={validationStyle}>Age must be within 12 and 100 years</Text>
        }
        <View style={{ marginTop: heightToDp("2.5%"), marginLeft: widthToDp("8%") }}>
          <Text style={[styles.labelInput, { marginLeft: widthToDp("2%") }]}>{LanguageChange.contactNumber}</Text>
          <Input
            style={[styles.input, styles.formInput]}
            onChangeText={(text) => { this.setState({ phoneNumber: text }) }}
            keyboardType='numeric'
          />
        </View>
        {
          (this.state.phoneNumber !== "" && this.state.phoneNumber.length !== 10) &&
          <Text style={validationStyle}>Contact Number must be of 10 digit</Text>
        }
        <View style={{ marginTop: heightToDp("2.5%"), marginLeft: widthToDp("8%") }}>
          <Text style={[styles.labelInput, { marginLeft: widthToDp("2%") }]}>{LanguageChange.username}</Text>
          <Input
            style={[styles.input, styles.formInput]}
            onChangeText={(text) => { this.setState({ username: text }) }}
          />
        </View>
        <View style={{ marginTop: heightToDp("2.5%"), marginLeft: widthToDp("8%") }}>
          <Text style={[styles.labelInput, { marginLeft: widthToDp("2%") }]}>{LanguageChange.password}</Text>
          <Input
            style={[styles.input, styles.formInput]}
            onChangeText={(text) => { this.setState({ password: text }) }}
            secureTextEntry={this.state.passwordVisibility}
          />
        </View>
        {
          (this.state.password !== "" && this.state.password.length < 8) &&
          <Text style={validationStyle}>Password should contain at least 8 characters</Text>
        }
        <View style={{ marginTop: heightToDp("2.5%"), marginLeft: widthToDp("8%") }}>
          <Text style={[styles.labelInput, { marginLeft: widthToDp("2%") }]}>{LanguageChange.confirmPassword}</Text>
          <Input
            style={[styles.input, styles.formInput]}
            onChangeText={(text) => { this.setState({ confirmPassword: text }) }}
            secureTextEntry={this.state.passwordVisibility}
          />
        </View>
        {
          this.state.password !== "" && this.state.confirmPassword !== "" &&
          this.state.password !== this.state.confirmPassword &&
          <Text style={validationStyle}>Password & Confirm Password should match</Text>
        }
        <View style={{ marginTop: heightToDp("5%"), marginLeft: widthToDp("8%") }}>
          <TouchableOpacity style={{ flexDirection: 'row' }} onPress={() => this.RBSheet3.open()}>
            <View style={{ width: widthToDp("30%") }}>
              <Text style={{ fontSize: widthToDp("4.6%"), marginLeft: widthToDp("2%"), fontFamily: 'Oswald-Medium' }}>{this.state.state}</Text>
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
                statesApi.map((i) => {
                  return (
                    <TouchableOpacity onPress={() => this.statePicker(i.state)}>
                      <Text style={{ fontSize: widthToDp("4.6%"), alignSelf: 'center', fontFamily: 'Oswald-Medium' }}>{i.state}</Text>
                      <View style={{ borderBottomColor: 'black', borderBottomWidth: 1, marginTop: heightToDp('0.1%'), width: widthToDp("80%"), marginLeft: widthToDp("8.2%") }}></View>
                    </TouchableOpacity>
                  );
                })
              }
            </ScrollView>
            {/* <TouchableOpacity onPress={() => this.statePicker("JHARKHAND")}>
              <Text style={{ fontSize: widthToDp("4.6%"), marginLeft: widthToDp("2%"), fontFamily: 'Oswald-Medium' }}>JHARKHAND</Text>
            </TouchableOpacity> */}

          </RBSheet3>
        </View>
        <View style={{ borderBottomColor: 'black', borderBottomWidth: 1, marginTop: heightToDp('0.1%'), width: widthToDp("80%"), marginLeft: widthToDp("8.2%") }}></View>
        {/* <View style={{ marginTop: heightToDp("2.5%"), marginLeft: widthToDp("8%") }}>
            <FloatingLabel
              labelStyle={styles.labelInput}
              inputStyle={styles.input}
              style={styles.formInput}
            // onBlur={this.onBlur}
            >DISTRICT</FloatingLabel>
          </View> */}
        <View style={{ marginTop: heightToDp("5%"), marginLeft: widthToDp("8%") }}>
          <TouchableOpacity style={{ flexDirection: 'row' }} onPress={() => this.RBSheet4.open()}>
            <View style={{ width: widthToDp("30%") }}>
              <Text style={{ fontSize: widthToDp("4.6%"), marginLeft: widthToDp("2%"), fontFamily: 'Oswald-Medium' }}>{this.state.district}</Text>
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
                distApi.map((i) => {
                  return (
                    <TouchableOpacity onPress={() => this.districtPicker(i.district)}>
                      <Text style={{ fontSize: widthToDp("4.6%"), alignSelf: 'center', fontFamily: 'Oswald-Medium' }}>{i.district}</Text>
                      <View style={{ borderBottomColor: 'black', borderBottomWidth: 1, marginTop: heightToDp('0.1%'), width: widthToDp("80%"), marginLeft: widthToDp("8.2%") }}></View>
                    </TouchableOpacity>
                  )
                })
              }
            </ScrollView>

            {/* <TouchableOpacity onPress={() => this.districtPicker("BOKARO")}>
              <Text style={{ fontSize: widthToDp("4.6%"), marginLeft: widthToDp("2%"), fontFamily: 'Oswald-Medium' }}>BOKARO</Text>
            </TouchableOpacity> */}
            <View style={{ borderBottomColor: 'black', borderBottomWidth: 1, marginTop: heightToDp('0.1%'), width: widthToDp("80%"), marginLeft: widthToDp("8.2%") }}></View>
          </RBSheet4>
        </View>
        <View style={{ borderBottomColor: 'black', borderBottomWidth: 1, marginTop: heightToDp('0.1%'), width: widthToDp("80%"), marginLeft: widthToDp("8.2%") }}></View>

        <View style={{ marginTop: heightToDp("5%"), marginLeft: widthToDp("8%") }}>
          <TouchableOpacity style={{ flexDirection: 'row' }} onPress={() => this.RBSheet6.open()}>
            <View style={{ width: widthToDp("30%") }}>
              <Text style={{ fontSize: widthToDp("4.6%"), marginLeft: widthToDp("2%"), fontFamily: 'Oswald-Medium' }}>{this.state.block}</Text>
            </View>

            <Icon
              name="chevron-down"
              size={40}
              style={{ marginLeft: widthToDp("43%") }}
            />
          </TouchableOpacity>
          <RBSheet6
            ref={ref => {
              this.RBSheet6 = ref;
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
                blockApi.map((i) => {
                  return (
                    <TouchableOpacity onPress={() => this.blockPicker(i.block, i._id)}>
                      <Text style={{ fontSize: widthToDp("4.6%"), alignSelf: 'center', fontFamily: 'Oswald-Medium' }}>{i.block}</Text>
                      <View style={{ borderBottomColor: 'black', borderBottomWidth: 1, marginTop: heightToDp('0.1%'), width: widthToDp("80%"), marginLeft: widthToDp("8.2%") }}></View>
                    </TouchableOpacity>
                  )
                })
              }
            </ScrollView>
            {/* <TouchableOpacity onPress={() => this.districtPicker("BOKARO")}>
              <Text style={{ fontSize: widthToDp("4.6%"), marginLeft: widthToDp("2%"), fontFamily: 'Oswald-Medium' }}>BOKAROoooooooooo</Text>
            </TouchableOpacity>
            <View style={{ borderBottomColor: 'black', borderBottomWidth: 1, marginTop: heightToDp('0.1%'), width: widthToDp("80%"), marginLeft: widthToDp("8.2%") }}></View> */}
          </RBSheet6>
        </View>
        <View style={{ borderBottomColor: 'black', borderBottomWidth: 1, marginTop: heightToDp('0.1%'), width: widthToDp("80%"), marginLeft: widthToDp("8.2%") }}></View>

        <View style={{ marginTop: heightToDp("5%"), marginLeft: widthToDp("8%") }}>
          <TouchableOpacity style={{ flexDirection: 'row' }} onPress={() => this.RBSheet2.open()}>
            <View style={{ width: widthToDp("31%") }}>
              <Text style={{ fontSize: widthToDp("4%"), marginLeft: widthToDp("2%"), fontFamily: 'Oswald-Medium' }}>{this.state.gram}</Text>
            </View>

            <Icon
              name="chevron-down"
              size={40}
              style={{ marginLeft: widthToDp("42%") }}
            />
          </TouchableOpacity>
          <RBSheet2
            ref={ref => {
              this.RBSheet2 = ref;
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
                gramApi.map((i) => {
                  return (
                    <TouchableOpacity onPress={() => this.gramPicker(i.gramPanchayat)}>
                      <Text style={{ fontSize: widthToDp("4.6%"), alignSelf: 'center', fontFamily: 'Oswald-Medium' }}>{i.gramPanchayat}</Text>
                      <View style={{ borderBottomColor: 'black', borderBottomWidth: 1, marginTop: heightToDp('0.1%'), width: widthToDp("80%"), marginLeft: widthToDp("8.2%") }}></View>
                    </TouchableOpacity>
                  )
                })
              }
            </ScrollView>
            {/* <View style={{ borderBottomColor: 'black', borderBottomWidth: 1, marginTop: heightToDp('0.1%'), width: widthToDp("80%"), marginLeft: widthToDp("8.2%") }}></View> */}
          </RBSheet2>
        </View>
        <View style={{ borderBottomColor: 'black', borderBottomWidth: 1, marginTop: heightToDp('0.1%'), width: widthToDp("80%"), marginLeft: widthToDp("8.2%") }}></View>

        <View style={{ marginTop: heightToDp("5%"), marginLeft: widthToDp("8%") }}>
          <TouchableOpacity style={{ flexDirection: 'row' }} onPress={() => this.RBSheet5.open()}>
            <View style={{ width: widthToDp("31%") }}>
              <Text style={{ fontSize: widthToDp("4.6%"), marginLeft: widthToDp("2%"), fontFamily: 'Oswald-Medium' }}>{this.state.village}</Text>
            </View>

            <Icon
              name="chevron-down"
              size={40}
              style={{ marginLeft: widthToDp("42%") }}
            />
          </TouchableOpacity>
          <RBSheet5
            ref={ref => {
              this.RBSheet5 = ref;
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
                villageApi.map((i) => {
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
        <View style={{ borderBottomColor: 'black', borderBottomWidth: 1, marginTop: heightToDp('0.1%'), width: widthToDp("80%"), marginLeft: widthToDp("8.2%") }}></View>
        <View style={{ marginTop: heightToDp("2.5%"), marginLeft: widthToDp("8%") }}>
          <Text style={[styles.labelInput, { marginLeft: widthToDp("2%") }]}>{LanguageChange.participantNumber}</Text>
          <Input
            style={[styles.input, styles.formInput]}
            onChangeText={(text) => { this.setState({ participantNumber: text }) }}

          />
        </View>
        <Input
          style={{
            height: 0,
            width: 0
          }}
          disabled
          value={this.state.deviceId}
        />
        <View style={{ flexDirection: 'row', marginTop: heightToDp("5%"), marginLeft: widthToDp("4%") }}>
          {/* <RadioForm
          formHorizontal={true}
          radio_props={radio_props}
          initial={1}
          animation={true}
          onPress={(value) => {this.setState({value:value})}}
          buttonColor="#000" 
        /> */}
          <RadioForm
            formHorizontal={true}
            animation={true}

          >
            {
              radio_props.map((obj, i) => (
                <RadioButton
                  labelHorizontal={true} key={i}

                >
                  <RadioButtonInput
                    obj={obj}
                    index={i}
                    isSelected={this.state.value === i}
                    onPress={(value) => this.checkStatus(value)}
                    buttonOuterColor={"#000"}
                    buttonStyle={{ marginLeft: widthToDp("1%") }}
                    buttonWrapStyle={{ marginLeft: widthToDp("5%") }}
                  />
                  <RadioButtonLabel
                    obj={obj}
                    index={i}
                    onPress={() => { }}
                    labelStyle={{ fontFamily: 'Oswald-Medium', marginLeft: widthToDp("2%") }}
                  />
                </RadioButton>
              ))
            }
          </RadioForm>
          {/* <Radio
              selected={false}
              style={{ marginLeft: widthToDp("3%"), marginTop: heightToDp("1%") }}
            />
            <Text style={{ color: "#fff", marginTop: heightToDp("1%"), marginLeft: widthToDp("2%"), fontFamily: 'Oswald-Medium' }}>OTP</Text>

            <Radio
              selected={true}
              style={{ marginLeft: widthToDp("20%"), marginTop: heightToDp("1%") }}
            />
            <Text style={{ color: "#fff", marginTop: heightToDp("1%"), marginLeft: widthToDp("1%"), fontFamily: 'Oswald-Medium' }}>FIELD OFFICER PASSWORD</Text> */}
        </View>
        {
          this.state.status ? <View style={{ backgroundColor: '#55b550', width: widthToDp("30%"), alignSelf: 'center', marginTop: heightToDp("3%"), borderRadius: 20 }}>
            <Input
              style={{ marginLeft: widthToDp("2%") }}
              autoFocus={false}
              onChangeText={(text) => this.setState({ fieldOfficerPass: text })}
            />
          </View> : null
        }

        <DialogInput isDialogVisible={this.state.isDialogVisible}
          title={"Verify OTP"}
          // message={"Message for DialogInput #1"}
          hintInput={"Please enter the otp"}
          submitInput={(inputText) => { this.verifyOtp(inputText) }}
          closeDialog={() => { this.setState({ isDialogVisible: false }) }}
          submitText={"Verify"}
          keyboardType='numeric'
        >
        </DialogInput>

        <TouchableOpacity onPress={() => this.signup()} disabled={this.state.isLoading}>
          <View style={{ backgroundColor: BaseColor.SecondaryColor, marginTop: heightToDp("5%"), width: widthToDp("37%"), alignSelf: 'center', height: heightToDp("5%"), borderRadius: 100 }}>
            <Text style={{ alignSelf: 'center', marginTop: heightToDp("0.5%"), fontWeight: '500', fontSize: widthToDp("5%"), fontFamily: 'Oswald-Medium' }}>{LanguageChange.signUp}</Text>
          </View>
        </TouchableOpacity>
        {
          this.state.isLoading ? <CustomIndicator IsLoading={this.state.isLoading} /> : null
        }
        <View style={{ flexDirection: 'row', marginTop: heightToDp("4%"), alignSelf: 'center' }}>
          <Text style={{ color: "#fff", fontFamily: 'Oswald-Medium' }}>{LanguageChange.noAccount}</Text>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('SigninScreen')}>
            <Text style={{ color: BaseColor.SecondaryColor, fontFamily: 'Oswald-Medium' }}>{LanguageChange.signIn}</Text>
          </TouchableOpacity>
        </View>
        <View style={{ marginTop: heightToDp("10%") }}></View>

      </KeyboardAwareScrollView>
    );
  }
}


var styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 65,
    backgroundColor: 'white',
  },
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
  }
});