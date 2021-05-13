import React, { Component } from 'react'
import { View, Image, TouchableOpacity, FlatList, ScrollView } from 'react-native'
import BaseColor from '../Core/BaseTheme'
import { Card, Text, Input, Toast } from 'native-base'
import TopLogo from '../assets/TopLogo'
import { widthToDp, heightToDp } from '../Responsive'
import { FlatGrid, SectionGrid } from 'react-native-super-grid'
import Icon from 'react-native-vector-icons/FontAwesome'
import axios from 'axios'
import DataAccess from '../Core/DataAccess'
import AsyncStorage from '@react-native-async-storage/async-storage'
import base64 from 'react-native-base64'
import CustomIndicator from '../Core/CustomIndicator'
import Languages from '../Core/Languages'
import LanguageChange from '../Core/LanguageChange'
import VideoComponent from '../components/VideoComponent'
import RNFetchBlob from 'rn-fetch-blob'
import LabelComponent from '../components/LabelComponent'
import HTML from "react-native-render-html";
import HeaderComponent from '../components/HeaderComponent'


export default class StepFou3Screen extends Component {

    constructor(props) {
        super(props)
        this.state = {
            _id: '',
            cropName: '',
            stepData: [],
            materialName: '',
            decimalPrice: '',
            isLoading: false,
            imageFile: '',
            materialPrice: [],
            numberOfSteps: '',
            pageNumber: '04',
            patchName: '',
            landType: '',
            farmingAreaInDecimal: '',
            costOfCultivatinPerTenDecimal: '',
            costPerKg: '',
            productionInKg: '',
            cost: '',
            netProfit: '',
            materialQuantity: '',
            languages: [],
            textLanguageChange: '',
            cropNameLanguageChangeArray: [],
            descriptionLabel: '',
            backButtonText: '',
            saveButtonText: '',
            nextButtonText: '',
            selectedItemLabel: '',
            material: '',
            quantityLabel: '',
            amountLabel: '',
            englishDescription: '',
            hindiDescription: '',
            hoDescription: '',
            santhaliDescription: '',
            odiaDescription: '',
            englishTitleDescription: '',
            hindiTitleDescription: '',
            hoTitleDescription: '',
            santhaliTitleDescription: '',
            odiaTitleDescription: '',
            stepImage: '',
            multipleMaterials: [],
            sumOfMaterials: '',
            saveButtonClicked: false,
            stepLabel: '',
            ploughingTypeLabel: '',
            isPlaying: true
        }
        this.state.languages = Languages
        this.state._id = this.props.route.params._id
        this.state.cropName = this.props.route.params.cropName
        this.state.imageFile = this.props.route.params.imageFile
        this.state.patchName = this.props.route.params.patchName
        this.state.landType = this.props.route.params.landType
        this.state.farmingAreaInDecimal = this.props.route.params.farmingAreaInDecimal
        this.state.costOfCultivatinPerTenDecimal = this.props.route.params.costOfCultivatinPerTenDecimal
        this.state.costPerKg = this.props.route.params.costPerKg
        this.state.productionInKg = this.props.route.params.productionInKg
        this.state.cost = this.props.route.params.cost
        this.state.netProfit = this.props.route.params.netProfit

    }

    componentDidMount() {
        this.setLanguageOnMount()
        this.loadlabelsFromStorage()
        this.getOfflineData()
    }

    getOfflineData = async () => {
        try {

            let username = await AsyncStorage.getItem('username')
            let user = await AsyncStorage.getItem('cropData');
            let parsed = JSON.parse(user);
            var specificObject = parsed[0]
            var cropSpecificSteps = specificObject.cropSteps.filter((i) => i.cropId === this.state._id)
            this.setState({ cropNameLanguageChangeArray: cropSpecificSteps[3].cropData, cropSpecificSteps })
            this.setState({ numberOfSteps: cropSpecificSteps.length })
            var stepId = cropSpecificSteps[3]._id
            var cropSpecificMaterial = specificObject.cropsMaterials.filter((i) => i.stepId === stepId)
            this.setState({ multipleMaterials: cropSpecificMaterial })
            //console.log(cropSpecificMaterial)
            this.setState({ englishDescription: cropSpecificSteps[3].english })
            this.setState({ hindiDescription: cropSpecificSteps[3].hindi })
            this.setState({ odiaDescription: cropSpecificSteps[3].odia })
            this.setState({ hoDescription: cropSpecificSteps[3].ho })
            this.setState({ santhaliDescription: cropSpecificSteps[3].santhali })
            this.setState({ englishTitleDescription: cropSpecificSteps[3].nameEnglish })
            this.setState({ hindiTitleDescription: cropSpecificSteps[3].nameHindi })
            this.setState({ odiaTitleDescription: cropSpecificSteps[3].nameOdia })
            this.setState({ hoTitleDescription: cropSpecificSteps[3].nameHo })
            this.setState({ santhaliTitleDescription: cropSpecificSteps[3].nameSanthali })
            this.setState({ stepImage: cropSpecificSteps[3].imageFile })
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
            var descriptionLabel = specificObject.labels.find((i) => i.type === 68)
            var backButtonText = specificObject.labels.find((i) => i.type === 64)
            var saveButtonText = specificObject.labels.find((i) => i.type === 63)
            var nextButtonText = specificObject.labels.find((i) => i.type === 62)
            var selectedItemLabel = specificObject.labels.find((i) => i.type === 76)
            var material = specificObject.labels.find((i) => i.type === 77)
            var quantityLabel = specificObject.labels.find((i) => i.type === 79)
            var amountLabel = specificObject.labels.find((i) => i.type === 69)
            var stepLabel = specificObject.labels.find((i) => i.type === 75)
            var ploughingTypeLabel = specificObject.labels.find((i) => i.type === 189)
            // var message = specificObject.labels.find((i) => i.type === 26)
            // var generalSettings = specificObject.labels.find((i) => i.type === 27)
            // var pension = specificObject.labels.find((i) => i.type === 51)
            // var others = specificObject.labels.find((i) => i.type === 52)
            if (this.state.textLanguageChange === '0') {
                this.setState({ descriptionLabel: descriptionLabel.nameEnglish })
                this.setState({ backButtonText: backButtonText.nameEnglish })
                this.setState({ saveButtonText: saveButtonText.nameEnglish })
                this.setState({ nextButtonText: nextButtonText.nameEnglish })
                this.setState({ selectedItemLabel: selectedItemLabel.nameEnglish })
                this.setState({ material: material.nameEnglish })
                this.setState({ quantityLabel: quantityLabel.nameEnglish })
                this.setState({ amountLabel: amountLabel.nameEnglish })
                this.setState({ stepLabel: stepLabel.nameEnglish })
                this.setState({ ploughingTypeLabel: ploughingTypeLabel.nameEnglish })
                // this.state.data[4].name = message.nameEnglish
                // this.state.data[5].name = generalSettings.nameEnglish
                // this.state.data[6].name = pension.nameEnglish
                // this.state.data[7].name = others.nameEnglish
                // this.setState({ moneyManagerLabel: moneyManagerLabel.nameEnglish })
                // this.setState({ expenseLabel: expenseLabel.nameEnglish })
                // this.setState({ incomeLabel: incomeLabel.nameEnglish })
                // this.setState({ allTransactionLabel: allTransactionLabel.nameEnglish })
            } else if (this.state.textLanguageChange === '1') {
                this.setState({ descriptionLabel: descriptionLabel.nameHindi })
                this.setState({ backButtonText: backButtonText.nameHindi })
                this.setState({ saveButtonText: saveButtonText.nameHindi })
                this.setState({ nextButtonText: nextButtonText.nameHindi })
                this.setState({ selectedItemLabel: selectedItemLabel.nameHindi })
                this.setState({ material: material.nameHindi })
                this.setState({ quantityLabel: quantityLabel.nameHindi })
                this.setState({ amountLabel: amountLabel.nameHindi })
                this.setState({ stepLabel: stepLabel.nameHindi })
                this.setState({ ploughingTypeLabel: ploughingTypeLabel.nameHindi })
                // this.state.data[4].name = message.nameHindi
                // this.state.data[5].name = generalSettings.nameHindi
                // this.state.data[6].name = pension.nameHindi
                // this.state.data[7].name = others.nameHindi
            } else if (this.state.textLanguageChange === '2') {
                this.setState({ descriptionLabel: descriptionLabel.nameHo })
                this.setState({ backButtonText: backButtonText.nameHo })
                this.setState({ saveButtonText: saveButtonText.nameHo })
                this.setState({ nextButtonText: nextButtonText.nameHo })
                this.setState({ selectedItemLabel: selectedItemLabel.nameHo })
                this.setState({ material: material.nameHo })
                this.setState({ quantityLabel: quantityLabel.nameHo })
                this.setState({ amountLabel: amountLabel.nameHo })
                this.setState({ stepLabel: stepLabel.nameHo })
                this.setState({ ploughingTypeLabel: ploughingTypeLabel.nameHo })
                // this.state.data[4].name = message.nameHindi
                // this.state.data[4].name = message.nameHo
                // this.state.data[5].name = generalSettings.nameHo
                // this.state.data[6].name = pension.nameHo
                // this.state.data[7].name = others.nameHo
            } else if (this.state.textLanguageChange === '3') {
                this.setState({ descriptionLabel: descriptionLabel.nameOdia })
                this.setState({ backButtonText: backButtonText.nameOdia })
                this.setState({ saveButtonText: saveButtonText.nameOdia })
                this.setState({ nextButtonText: nextButtonText.nameOdia })
                this.setState({ selectedItemLabel: selectedItemLabel.nameOdia })
                this.setState({ material: material.nameOdia })
                this.setState({ quantityLabel: quantityLabel.nameOdia })
                this.setState({ amountLabel: amountLabel.nameOdia })
                this.setState({ stepLabel: stepLabel.nameOdia })
                this.setState({ ploughingTypeLabel: ploughingTypeLabel.nameOdia })
                // this.state.data[4].name = message.nameOdia
                // this.state.data[5].name = generalSettings.nameOdia
                // this.state.data[6].name = pension.nameOdia
                // this.state.data[7].name = others.nameOdia
            } else if (this.state.textLanguageChange === '4') {
                this.setState({ descriptionLabel: descriptionLabel.nameSanthali })
                this.setState({ backButtonText: backButtonText.nameSanthali })
                this.setState({ saveButtonText: saveButtonText.nameSanthali })
                this.setState({ nextButtonText: nextButtonText.nameSanthali })
                this.setState({ selectedItemLabel: selectedItemLabel.nameSanthali })
                this.setState({ material: material.nameSanthali })
                this.setState({ quantityLabel: quantityLabel.nameSanthali })
                this.setState({ amountLabel: amountLabel.nameSanthali })
                this.setState({ stepLabel: stepLabel.nameSanthali })
                this.setState({ ploughingTypeLabel: ploughingTypeLabel.nameSanthali })
                // this.state.data[4].name = message.nameSanthali
                // this.state.data[5].name = generalSettings.nameSanthali
                // this.state.data[6].name = pension.nameSanthali
                // this.state.data[7].name = others.nameSanthali
            }
        } catch (error) {
            alert(error)
        }
        //this.setState({ crops: specificObject.crops })
        //this.showData()
    }

    setMaterialPrice = (data, index) => {
        // var lastValue = ''
        // alert(index)
        // this.state.materialPrice.push({'data': data , 'materialName' : materialName})
        // var test = this.state.materialPrice.filter((i) => i.materialName === materialName)
        // lastValue = test[test.length-1]
        // console.log(lastValue)
        // console.log(this.state.materialPrice.filter((i) => i.materialName === materialName))
        //console.log(materialName)
        const test = [...this.state.materialPrice]
        test[index] = data
        this.state.materialPrice = test
        var sum = this.state.materialPrice.reduce((a, b) => parseInt(a) + parseInt(b), 0)
        this.state.sumOfMaterials = sum
        console.log(this.state.sumOfMaterials)
    }

    setValueToPatch = async () => {
        try {
            this.state.saveButtonClicked = true
            let username = await AsyncStorage.getItem('username')
            let user = await AsyncStorage.getItem('user')
            let parsed = JSON.parse(user)
            var specific = parsed.find((i) => i.username === username)
            var specificPatch = specific.patch.find((i) => i.patchName === this.state.patchName)
            specificPatch.step4 = this.state.sumOfMaterials
            await AsyncStorage.setItem('user', JSON.stringify(parsed))
            console.log(specificPatch, "step4")
        } catch (error) {
            console.log(error, "setValueToPatch")
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
            this.getStepDataFromLocal()
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

    setStepDataIntoPatch = async () => {
        const { config, fs } = RNFetchBlob;
        let files = fs.dirs.MovieDir
        if (
            (
                this.state.cropSpecificSteps && this.state.cropSpecificSteps.length > 0 &&
                this.state.cropSpecificSteps[3].videoFile &&
                files.includes("video_" + this.state.cropSpecificSteps[3].videoFile)
            ) && !this.state.isPlaying
        ) {
            Toast.show({
                type: 'warning',
                duration: 3000,
                text: 'Please pause the video before going to next screen'
            })
        } else {
            try {
                let username = await AsyncStorage.getItem('username')
                let user = await AsyncStorage.getItem('cropData');
                let parsed = JSON.parse(user);
                var specificObject = parsed[0]
                var cropSpecificSteps = specificObject.cropSteps.filter((i) => i.cropId === this.state._id)
                if (this.state.saveButtonClicked === false && this.state.multipleMaterials.length > 0) {
                    alert("please click save button before procceding")
                } else {
                    if (cropSpecificSteps[4] === undefined) {
                        this.props.navigation.navigate({
                            name: 'ActualCultivationCostScreen',
                            params: {
                                cropName: this.state.cropName,
                                _id: this.state._id,
                                imageFile: this.state.imageFile,
                                patchName: this.state.patchName,
                                landType: this.state.landType,
                                farmingAreaInDecimal: this.state.farmingAreaInDecimal,
                                costOfCultivatinPerTenDecimal: this.state.costOfCultivatinPerTenDecimal,
                                costPerKg: this.state.costPerKg,
                                productionInKg: this.state.productionInKg,
                                cost: this.state.cost,
                                netProfit: this.state.netProfit
                            }
                        })
                    } else {
                        this.props.navigation.navigate({
                            name: 'StepFiveScreen',
                            params: {
                                cropName: this.state.cropName,
                                _id: this.state._id,
                                imageFile: this.state.imageFile,
                                patchName: this.state.patchName,
                                landType: this.state.landType,
                                farmingAreaInDecimal: this.state.farmingAreaInDecimal,
                                costOfCultivatinPerTenDecimal: this.state.costOfCultivatinPerTenDecimal,
                                costPerKg: this.state.costPerKg,
                                productionInKg: this.state.productionInKg,
                                cost: this.state.cost,
                                netProfit: this.state.netProfit
                            }
                        })
                    }
                }
                AsyncStorage.setItem("jump", "StepFourScreen")
            } catch (error) {
                console.log(error)
            }
        }
    }


    goToPreviousStep = () => {
        this.props.navigation.navigate({
            name: 'StepThreeScreen',
            params: {
                cropName: this.state.cropName,
                _id: this.state._id,
                imageFile: this.state.imageFile,
                patchName: this.state.patchName,
                landType: this.state.landType,
                farmingAreaInDecimal: this.state.farmingAreaInDecimal,
                costOfCultivatinPerTenDecimal: this.state.costOfCultivatinPerTenDecimal,
                costPerKg: this.state.costPerKg,
                productionInKg: this.state.productionInKg,
                cost: this.state.cost,
                netProfit: this.state.netProfit
            }
        })
    }

    isVideoPresent = () => {
        if(
            (
                this.state.cropSpecificSteps && this.state.cropSpecificSteps.length > 0 &&
                this.state.cropSpecificSteps[3].videoFile
            )
        ) {
            return true
        } else {
            return false
        }
    }        

    render() {
        var cropNameLanguageChangeArray = []
        cropNameLanguageChangeArray = this.state.cropNameLanguageChangeArray
        var multipleMaterials = []
        multipleMaterials = this.state.multipleMaterials
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
                <Text style={{ fontSize: widthToDp("6%"), marginLeft: widthToDp("3%"), marginTop: heightToDp("1%"), fontFamily: 'Oswald-Medium' }}>{this.state.stepLabel} - {this.state.pageNumber}/0{this.state.numberOfSteps}</Text>
                {
                    this.state.isLoading ? <View style={{ justifyContent: 'center', marginTop: heightToDp("20%"), backgroundColor: BaseColor.BackgroundColor, marginBottom: heightToDp("30%") }}><CustomIndicator IsLoading={this.state.isLoading} /></View> : null
                }
                <ScrollView nestedScrollEnabled={true}>
                    <View style={{ backgroundColor: BaseColor.Red, width: widthToDp("90%"), alignSelf: 'center', borderRadius: 10 }}>
                        <LabelComponent
                            stepName={
                                this.state.textLanguageChange==="0" ? this.state.englishTitleDescription :
                                    this.state.textLanguageChange==="1" ? this.state.hindiTitleDescription :
                                    this.state.textLanguageChange==="2" ? this.state.hoTitleDescription :
                                    this.state.textLanguageChange==="3" ? this.state.odiaTitleDescription :
                                    this.state.santhaliTitleDescription
                            }
                            asyncKey={"cropSteps"}
                            index={3}
                        />

                        <View style={{ backgroundColor: 'white', width: widthToDp("90%"), height: heightToDp("20%"), borderBottomLeftRadius: 10, borderBottomRightRadius: 10, marginTop: heightToDp("0%") }}>
                            <View>
                                <Image
                                    style={{ height: heightToDp("20%"), width: widthToDp("90%"), borderBottomLeftRadius: 10, borderBottomRightRadius: 10 }}
                                    source={{ uri: 'file:///storage/emulated/0/Pictures/Pop/image_' + this.state.stepImage }}
                                />
                            </View>
                        </View>
                    </View>

                    {
                        this.isVideoPresent() &&
                        [
                            <View style={{height: heightToDp("0.5%")}}/>,
                            <VideoComponent
                                asyncVideoFileName={this.state.cropSpecificSteps[3].videoFile}
                                isPlaying={this.state.isPlaying}
                                playOrPauseVideo={() => this.setState({ isPlaying: !this.state.isPlaying })}
                                _id={this.state._id}
                                stepId={3}
                            />
                        ]
                    }

                    <View style={{height: heightToDp("2%")}}/>

                    <View style={{ backgroundColor: BaseColor.Red, width: widthToDp("90%"), height: widthToDp("60%"), alignSelf: 'center', borderRadius: 10 }}>
                        <LabelComponent
                            stepName={this.state.descriptionLabel}
                            asyncKey={"cropSteps"}
                            index={3}
                        />
                        <ScrollView nestedScrollEnabled style={{ backgroundColor: 'white', width: widthToDp("90%"), height: widthToDp("50%"), borderBottomLeftRadius: 10, borderBottomRightRadius: 10 }}>
                            {
                                this.state.textLanguageChange === '0' ? <HTML source={{ html: this.state.englishDescription || '<p></p>' }} containerStyle={{ elevation: 10, marginTop: heightToDp("2%"), marginLeft: widthToDp("2%") }} /> : ((this.state.textLanguageChange === '1') ? <HTML source={{ html: this.state.hindiDescription || '<p></p>' }} containerStyle={{ elevation: 10, marginTop: heightToDp("2%"), marginLeft: widthToDp("2%") }} /> : ((this.state.textLanguageChange === '2') ? <HTML source={{ html: this.state.hoDescription || '<p></p>' }} containerStyle={{ elevation: 10, marginTop: heightToDp("2%"), marginLeft: widthToDp("2%") }} /> : ((this.state.textLanguageChange === '3') ? <HTML source={{ html: this.state.odiaDescription || '<p></p>' }} containerStyle={{ elevation: 10, marginTop: heightToDp("2%"), marginLeft: widthToDp("2%") }} /> : ((this.state.textLanguageChange === '4') ? <HTML source={{ html: this.state.santhaliDescription || '<p></p>' }} containerStyle={{ elevation: 10, marginTop: heightToDp("2%"), marginLeft: widthToDp("2%") }} /> : null))))
                            }
                            
                        </ScrollView>



                    </View>


                    <View style={{ backgroundColor: BaseColor.Red, width: widthToDp("90%"), height: heightToDp("30%"), alignSelf: 'center', marginTop: heightToDp("2%"), borderRadius: 10 }}>
                        <Text style={{ color: 'white', marginLeft: widthToDp("4%"), marginTop: heightToDp('1.5%'), fontSize: widthToDp("5%"), fontFamily: 'Oswald-Medium' }}>{this.state.selectedItemLabel}</Text>
                        <View style={{ backgroundColor: 'white', width: widthToDp("90%"), height: heightToDp("23.5%"), borderBottomLeftRadius: 10, borderBottomRightRadius: 10, marginTop: heightToDp("2%") }}>
                            <View style={{ flexDirection: 'row' }}>
                                <View style={{ marginTop: heightToDp("1%"), marginLeft: widthToDp("2%") }}>
                                    <Text style={{ fontSize: widthToDp("4%"), fontFamily: 'Oswald-Medium' }}>{this.state.ploughingTypeLabel}</Text>
                                    {
                                        cropNameLanguageChangeArray.map((i) => {
                                            return (
                                                <View>
                                                    {
                                                        this.state.textLanguageChange === '0' ? <Text style={{ fontSize: widthToDp("5%"), fontFamily: 'Oswald-Light' }}>{i.nameEnglish}</Text> : ((this.state.textLanguageChange === '1') ? <Text style={{ fontSize: widthToDp("5%"), fontFamily: 'Oswald-Light' }}>{i.nameHindi}</Text> : ((this.state.textLanguageChange === '2') ? <Text style={{ fontSize: widthToDp("5%"), fontFamily: 'Oswald-Light' }}>{i.nameHo}</Text> : ((this.state.textLanguageChange === '3') ? <Text style={{ fontSize: widthToDp("5%"), fontFamily: 'Oswald-Light' }}>{i.nameOdia}</Text> : ((this.state.textLanguageChange === '4') ? <Text style={{ fontSize: widthToDp("5%"), fontFamily: 'Oswald-Light' }}>{i.nameSanthali}</Text> : null))))
                                                    }
                                                </View>
                                            )
                                        })
                                    }

                                </View>
                                <Image
                                    style={{ height: heightToDp("20%"), width: widthToDp("50%"), marginTop: heightToDp("2%"), marginLeft: widthToDp("7%"), borderRadius: 10 }}
                                    source={{ uri: 'file:///storage/emulated/0/Pictures/Pop/image_' + this.state.imageFile }}
                                />
                            </View>
                        </View>
                    </View>

                    {
                        multipleMaterials.length > 0 &&
                        <View style={{ backgroundColor: BaseColor.Red, width: widthToDp("90%"), height: heightToDp("40%"), alignSelf: 'center', marginTop: heightToDp("2%"), borderRadius: 10 }}>
                            <Text style={{ color: 'white', marginLeft: widthToDp("4%"), marginTop: heightToDp('1.5%'), fontSize: widthToDp("5%"), fontFamily: 'Oswald-Medium' }}>{this.state.material}</Text>
                            <View style={{ backgroundColor: 'white', width: widthToDp("90%"), height: heightToDp("40%"), borderBottomLeftRadius: 10, borderBottomRightRadius: 10, marginTop: heightToDp("2%") }}>
                                <View style={{ flexDirection: 'row', marginLeft: widthToDp("3%"), marginTop: heightToDp("2%") }}>
                                    <View style={{ width: widthToDp("20%") }}>
                                        <Text style={{ color: BaseColor.Red, fontFamily: 'Oswald-Medium', fontSize: widthToDp("3.5%") }}>{this.state.descriptionLabel}</Text>
                                    </View>
                                    <View style={{ width: widthToDp("25%") }}>
                                        <Text style={{ color: BaseColor.Red, fontFamily: 'Oswald-Medium', marginLeft: widthToDp("10%"), fontSize: widthToDp("3.5%") }}>{this.state.quantityLabel}</Text>
                                    </View>
                                    <View style={{ width: widthToDp("30%") }}>
                                        <Text style={{ color: BaseColor.Red, fontFamily: 'Oswald-Medium', marginLeft: widthToDp("15%"), fontSize: widthToDp("3.5%") }}>{this.state.amountLabel}</Text>
                                    </View>



                                </View>

                                <ScrollView nestedScrollEnabled={true}>
                                    {
                                        multipleMaterials.map((i, index) => {
                                            return (
                                                [
                                                    <>
                                                        <View style={{ height: heightToDp(`${index === 0 ? 1 : 0}%`) }} />
                                                        <View style={{ flexDirection: 'row', marginLeft: widthToDp("3%"), marginTop: heightToDp("2%") }}>
                                                            <View style={{ width: widthToDp("20%"), marginTop: heightToDp("1%") }}>
                                                                {
                                                                    this.state.textLanguageChange === '0' ? <Text style={{ fontFamily: 'Oswald-Medium', fontSize: widthToDp('3.3%') }}>{i.materialNameEnglish}</Text> : ((this.state.textLanguageChange === '1') ? <Text style={{ fontFamily: 'Oswald-Medium', fontSize: widthToDp('3.3%') }}>{i.materialNameHindi}</Text> : ((this.state.textLanguageChange === '2') ? <Text style={{ fontFamily: 'Oswald-Medium', fontSize: widthToDp('3.3%') }}>{i.materialNameHo}</Text> : ((this.state.textLanguageChange === '3') ? <Text style={{ fontFamily: 'Oswald-Medium', fontSize: widthToDp('3.3%') }}>{i.materialNameOdia}</Text> : ((this.state.textLanguageChange === '4') ? <Text style={{ fontFamily: 'Oswald-Medium', fontSize: widthToDp('3.3%') }}>{i.materialNameSanthali}</Text> : null))))
                                                                }

                                                            </View>
                                                            <View style={{ width: widthToDp("25%"), marginLeft: widthToDp("9%") }}>
                                                                <Input
                                                                    style={{
                                                                        borderBottomWidth: 1,
                                                                        borderColor: 'blue',
                                                                        fontFamily: 'Oswald-Medium',
                                                                    }}
                                                                    defaultValue={i.qty}
                                                                />
                                                            </View>
                                                            <View style={{ width: widthToDp("30%"), marginLeft: widthToDp("5%") }}>
                                                                <Input
                                                                    defaultValue={i.decimalPrice}
                                                                    keyboardType='number-pad'
                                                                    onChangeText={(data) => this.setMaterialPrice(data, index)}
                                                                    style={{ marginLeft: widthToDp("0%"), fontFamily: 'Oswald-Medium', width: widthToDp("20%"), borderBottomWidth: 1, borderColor: 'blue', marginRight: widthToDp("5%") }}
                                                                />
                                                            </View>
                                                        </View>
                                                        <View style={{ height: heightToDp(`${index === multipleMaterials.length - 1 ? 1 : 0}%`) }} />
                                                    </>,
                                                    this.setMaterialPrice(i.decimalPrice, index)
                                                ]
                                            )
                                        })
                                    }
                                </ScrollView>



                                {/* <Text style={{ marginLeft: widthToDp("35%"), fontFamily: 'Oswald-Medium' }}>₹ {this.state.decimalPrice}</Text> */}




                            </View>
                        </View>
                    }

                    <View style={{ marginBottom: heightToDp("10%") }}></View>
                </ScrollView>
                <View style={{ flexDirection: 'row', height: heightToDp("10%"), alignSelf: 'center' }}>
                    <TouchableOpacity onPress={() => this.goToPreviousStep()}>
                        <View style={{ backgroundColor: "#fff", height: heightToDp("6%"), width: widthToDp("30%"), borderRadius: 100, alignSelf: 'center', marginTop: heightToDp("2%") }}>
                            <Text style={{ fontSize: widthToDp("4%"), color: "#000", marginTop: heightToDp("1.3%"), alignSelf: 'center', fontFamily: 'Oswald-Medium' }}>{this.state.backButtonText}</Text>
                        </View>
                    </TouchableOpacity>
                    {
                        multipleMaterials.length > 0 &&
                        <TouchableOpacity onPress={() => { this.setValueToPatch() }}>
                            <View style={{ backgroundColor: "#fff", height: heightToDp("6%"), width: widthToDp("30%"), borderRadius: 100, marginLeft: widthToDp("1%"), marginTop: heightToDp("2%") }}>
                                <Text style={{ fontSize: widthToDp("4%"), color: "#000", marginTop: heightToDp("1.3%"), alignSelf: 'center', fontFamily: 'Oswald-Medium' }}>{this.state.saveButtonText}</Text>
                            </View>
                        </TouchableOpacity>
                    }
                    <TouchableOpacity onPress={() => { this.setStepDataIntoPatch() }}>
                        <View style={{ backgroundColor: "#fff", height: heightToDp("6%"), width: widthToDp("30%"), borderRadius: 100, marginLeft: widthToDp("1%"), marginTop: heightToDp("2%") }}>
                            <Text style={{ fontSize: widthToDp("4%"), color: "#000", marginTop: heightToDp("1.3%"), alignSelf: 'center', fontFamily: 'Oswald-Medium' }}>{this.state.nextButtonText}</Text>
                        </View>
                    </TouchableOpacity>
                </View>

            </View>
        );
    }
}