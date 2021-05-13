import React, { Component } from 'react'
import { View, Image, TouchableOpacity, FlatList, ScrollView } from 'react-native'
import BaseColor from '../Core/BaseTheme'
import { Card, Text } from 'native-base'
import TopLogo from '../assets/TopLogo'
import { widthToDp, heightToDp } from '../Responsive'
import { FlatGrid, SectionGrid } from 'react-native-super-grid'
import Icon from 'react-native-vector-icons/FontAwesome'
import DataAccess from '../Core/DataAccess'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Languages from '../Core/Languages'
import HeaderComponent from '../components/HeaderComponent'



const data = [
    { name: 'HIGH LAND', code: 'https://shramajeewiki.com/images/English/00214136.jpg' },
    { name: 'MEDIUM LAND', code: 'https://timesofindia.indiatimes.com/thumb/msid-60012970,imgsize-2640154,width-400,resizemode-4/60012970.jpg' },
    { name: 'LOW LAND', code: 'https://www.biggovernment.news/wp-content/uploads/sites/59/2017/06/farmer-plow-field.jpg' }
]

export default class LandTypeScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            landType: '',
            _id: '',
            cropName: '',
            farmingAreaInDecimal: '',
            costOfCultivatinPerTenDecimal: '',
            costPerKg: '',
            productionInKg: '',
            netProfit: '',
            cost: '',
            imageFile: '',
            patchName: '',
            costBenefitAnalysisLabel: '',
            expectedAnalysisLabel: '',
            actualAnalysisLabel: '',
            landTypeLabel: '',
            areaLabel: '',
            descriptionLabel: '',
            amountLabel: '',
            totalCostOfCultivationLabel: '',
            totalIncomeFromCropLabel: '',
            productionLabel: '',
            costPerKgLabel: '',
            netProfitLabel: '',
            cancelLabel: '',
            doneLabel: '',
            highLandLabel: '',
            areaLabel: '',
            decimalLabel: '',
            languages: '',
            materialEnglish: '',
            materialHindi: '',
            materialOdia: '',
            materialSanthali: '',
            materialHo: '',
            productionLossPercentage:'',
            materialLabel:'',
            productionLossPercentageLabel:'',
            profitLossPercentage:''
        }
        this.state.landType = this.props.route.params.landType
        this.state._id = this.props.route.params._id
        this.state.cropName = this.props.route.params.cropName
        this.state.farmingAreaInDecimal = this.props.route.params.farmingAreaInDecimal
        this.state.costOfCultivatinPerTenDecimal = this.props.route.params.costOfCultivatinPerTenDecimal //expense
        this.state.costPerKg = this.props.route.params.costPerKg //income
        this.state.productionInKg = this.props.route.params.productionInKg
        this.state.cost = this.props.route.params.cost
        this.state.imageFile = this.props.route.params.imageFile
        this.state.patchName = this.props.route.params.patchName
        this.state.productionLossPercentage = this.props.route.params.productionLossPercentage
        this.state.languages = Languages
        this.netProfitCalculation()
        //alert(this.state.patchName)
        this.saveToOfflineAnalysis()

    }

    saveToOfflineAnalysis = async () => {
        try {
            const analysisObject = { 'cropName': this.state.cropName, '_id': this.state._id, 'imageFile': this.state.imageFile, 'patchName': this.state.patchName, 'landType': this.state.landType, 'farmingAreaInDecimal': this.state.farmingAreaInDecimal, 'costOfCultivatinPerTenDecimal': this.state.costOfCultivatinPerTenDecimal, 'costPerKg': this.state.costPerKg, 'productionInKg': this.state.productionInKg, 'cost': this.state.cost, 'netProfit': this.state.netProfit }
            let username = await AsyncStorage.getItem('username')
            let user = await AsyncStorage.getItem('user')
            let parsed = JSON.parse(user)
            var sepcific = parsed.find((i) => i.username === username)
            var valueArr = sepcific.costBenifitAnalysis.map(function (item) { return item.patchName })
            if (valueArr.includes(this.state.patchName)) {
                //console.log("Already created")
                //console.log(sepcific.costBenifitAnalysis)
            } else {
                sepcific.costBenifitAnalysis.push(analysisObject)
                console.log(sepcific.costBenifitAnalysis)
                await AsyncStorage.setItem('user', JSON.stringify(parsed))
            }
        } catch (error) {
            console.log(error)
        }
    }

    componentDidMount = () => {
        this.setLanguageOnMount()
        this.getPricesOfCrops()
    }

    getPricesOfCrops = async () => {
        try {
            let user = await AsyncStorage.getItem('numberOfCrops');
            let parsed = JSON.parse(user);
            var specificObject = parsed[0]
            var specificCrops = specificObject.crops.find((i) => i._id === this.state._id)
            this.state.materialEnglish = specificCrops.materialEnglish
            this.state.materialHindi = specificCrops.materialHindi
            this.state.materialHo = specificCrops.materialHo
            this.state.materialOdia = specificCrops.materialOdia
            this.state.materialSanthali = specificCrops.materialSanthali
            this.state.profitLossPercentage = specificCrops.profitLossPercentage
            console.log(specificCrops.materialEnglish, "AnalysisScreen")
        } catch (error) {
            console.log(error, 'AnalysisScreen')
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

    loadlabelsFromStorage = async () => {
        try {
            let username = await AsyncStorage.getItem('username')
            let user = await AsyncStorage.getItem('labelsData');
            let parsed = JSON.parse(user);
            var specificObject = parsed.find((i) => i.username === username)
            var costBenefitAnalysisLabel = specificObject.labels.find((i) => i.type === 66)
            var expectedAnalysisLabel = specificObject.labels.find((i) => i.type === 84)
            var actualAnalysisLabel = specificObject.labels.find((i) => i.type === 85)
            var landTypeLabel = specificObject.labels.find((i) => i.type === 56)
            var areaLabel = specificObject.labels.find((i) => i.type === 67)
            var highLandLabel = specificObject.labels.find((i) => i.type === 53)
            var descriptionLabel = specificObject.labels.find((i) => i.type === 68)
            var amountLabel = specificObject.labels.find((i) => i.type === 69)
            var totalCostOfCultivationLabel = specificObject.labels.find((i) => i.type === 70)
            var totalIncomeFromCropLabel = specificObject.labels.find((i) => i.type === 71)
            var productionLabel = specificObject.labels.find((i) => i.type === 72)
            var costPerKgLabel = specificObject.labels.find((i) => i.type === 73)
            var netProfitLabel = specificObject.labels.find((i) => i.type === 74)
            var cancelLabel = specificObject.labels.find((i) => i.type === 65)
            var doneLabel = specificObject.labels.find((i) => i.type === 39)
            var decimalLabel = specificObject.labels.find((i) => i.type === 188)
            var materialLabel = specificObject.labels.find((i) => i.type === 77)
            var productionLossPercentageLabel = specificObject.labels.find((i) => i.type === 218)
            if (this.state.textLanguageChange === '0') {
                this.setState({
                    costBenefitAnalysisLabel: costBenefitAnalysisLabel.nameEnglish,
                    expectedAnalysisLabel: expectedAnalysisLabel.nameEnglish,
                    actualAnalysisLabel: actualAnalysisLabel.nameEnglish,
                    landTypeLabel: landTypeLabel.nameEnglish,
                    areaLabel: areaLabel.nameEnglish,
                    highLandLabel: highLandLabel.nameEnglish,
                    descriptionLabel: descriptionLabel.nameEnglish,
                    amountLabel: amountLabel.nameEnglish,
                    totalCostOfCultivationLabel: totalCostOfCultivationLabel.nameEnglish,
                    totalIncomeFromCropLabel: totalIncomeFromCropLabel.nameEnglish,
                    productionLabel: productionLabel.nameEnglish,
                    costPerKgLabel: costPerKgLabel.nameEnglish,
                    netProfitLabel: netProfitLabel.nameEnglish,
                    cancelLabel: cancelLabel.nameEnglish,
                    doneLabel: doneLabel.nameEnglish,
                    decimalLabel: decimalLabel.nameEnglish,
                    materialLabel: materialLabel.nameEnglish,
                    productionLossPercentageLabel: productionLossPercentageLabel.nameEnglish
                })
            } else if (this.state.textLanguageChange === '1') {
                this.setState({
                    costBenefitAnalysisLabel: costBenefitAnalysisLabel.nameHindi,
                    expectedAnalysisLabel: expectedAnalysisLabel.nameHindi,
                    actualAnalysisLabel: actualAnalysisLabel.nameHindi,
                    landTypeLabel: landTypeLabel.nameHindi,
                    areaLabel: areaLabel.nameHindi,
                    highLandLabel: highLandLabel.nameHindi,
                    descriptionLabel: descriptionLabel.nameHindi,
                    amountLabel: amountLabel.nameHindi,
                    totalCostOfCultivationLabel: totalCostOfCultivationLabel.nameHindi,
                    totalIncomeFromCropLabel: totalIncomeFromCropLabel.nameHindi,
                    productionLabel: productionLabel.nameHindi,
                    costPerKgLabel: costPerKgLabel.nameHindi,
                    netProfitLabel: netProfitLabel.nameHindi,
                    cancelLabel: cancelLabel.nameHindi,
                    doneLabel: doneLabel.nameHindi,
                    decimalLabel: decimalLabel.nameHindi,
                    materialLabel: materialLabel.nameHindi,
                    productionLossPercentageLabel : productionLossPercentageLabel.nameHindi
                })
            } else if (this.state.textLanguageChange === '2') {
                this.setState({
                    costBenefitAnalysisLabel: costBenefitAnalysisLabel.nameHo,
                    expectedAnalysisLabel: expectedAnalysisLabel.nameHo,
                    actualAnalysisLabel: actualAnalysisLabel.nameHo,
                    landTypeLabel: landTypeLabel.nameHo,
                    areaLabel: areaLabel.nameHo,
                    highLandLabel: highLandLabel.nameHo,
                    descriptionLabel: descriptionLabel.nameHo,
                    amountLabel: amountLabel.nameHo,
                    totalCostOfCultivationLabel: totalCostOfCultivationLabel.nameHo,
                    totalIncomeFromCropLabel: totalIncomeFromCropLabel.nameHo,
                    productionLabel: productionLabel.nameHo,
                    costPerKgLabel: costPerKgLabel.nameHo,
                    netProfitLabel: netProfitLabel.nameHo,
                    cancelLabel: cancelLabel.nameHo,
                    doneLabel: doneLabel.nameHo,
                    decimalLabel: decimalLabel.nameHo,
                    materialLabel: materialLabel.nameHo,
                    productionLossPercentageLabel : productionLossPercentageLabel.nameHo
                })
            } else if (this.state.textLanguageChange === '3') {
                this.setState({
                    costBenefitAnalysisLabel: costBenefitAnalysisLabel.nameOdia,
                    expectedAnalysisLabel: expectedAnalysisLabel.nameOdia,
                    actualAnalysisLabel: actualAnalysisLabel.nameOdia,
                    landTypeLabel: landTypeLabel.nameOdia,
                    areaLabel: areaLabel.nameOdia,
                    highLandLabel: highLandLabel.nameOdia,
                    descriptionLabel: descriptionLabel.nameOdia,
                    amountLabel: amountLabel.nameOdia,
                    totalCostOfCultivationLabel: totalCostOfCultivationLabel.nameOdia,
                    totalIncomeFromCropLabel: totalIncomeFromCropLabel.nameOdia,
                    productionLabel: productionLabel.nameOdia,
                    costPerKgLabel: costPerKgLabel.nameOdia,
                    netProfitLabel: netProfitLabel.nameOdia,
                    cancelLabel: cancelLabel.nameOdia,
                    doneLabel: doneLabel.nameOdia,
                    decimalLabel: decimalLabel.nameOdia,
                    materialLabel: materialLabel.nameOdia,
                    productionLossPercentageLabel : productionLossPercentageLabel.nameOdia
                })
            } else if (this.state.textLanguageChange === '4') {
                this.setState({
                    costBenefitAnalysisLabel: costBenefitAnalysisLabel.nameSanthali,
                    expectedAnalysisLabel: expectedAnalysisLabel.nameSanthali,
                    actualAnalysisLabel: actualAnalysisLabel.nameSanthali,
                    landTypeLabel: landTypeLabel.nameSanthali,
                    areaLabel: areaLabel.nameSanthali,
                    highLandLabel: highLandLabel.nameSanthali,
                    descriptionLabel: descriptionLabel.nameSanthali,
                    amountLabel: amountLabel.nameSanthali,
                    totalCostOfCultivationLabel: totalCostOfCultivationLabel.nameSanthali,
                    totalIncomeFromCropLabel: totalIncomeFromCropLabel.nameSanthali,
                    productionLabel: productionLabel.nameSanthali,
                    costPerKgLabel: costPerKgLabel.nameSanthali,
                    netProfitLabel: netProfitLabel.nameSanthali,
                    cancelLabel: cancelLabel.nameSanthali,
                    doneLabel: doneLabel.nameSanthali,
                    decimalLabel: decimalLabel.nameSanthali,
                    materialLabel: materialLabel.nameSanthali,
                    productionLossPercentageLabel : productionLossPercentageLabel.nameSanthali
                })
            }

        } catch (error) {
            alert(error)
        }
        this.setState({ crops: specificObject.crops })
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

    netProfitCalculation = () => {
        var netProfit = parseFloat(this.state.costPerKg - this.state.costOfCultivatinPerTenDecimal - this.state.productionLossPercentage).toFixed(2) //expense - profit
        this.state.netProfit = netProfit
    }

    stepOneScreen = () => {
        this.props.navigation.navigate({
            name: 'StepOneScreen',
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
        //alert(this.state.patchName)
    }

    render() {
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

                <ScrollView>
                    <View style={{ backgroundColor: BaseColor.Red, width: widthToDp("90%"), height: heightToDp("30%"), alignSelf: 'center', marginTop: heightToDp("2%"), borderRadius: 10 }}>
                        <Text style={{ color: 'white', marginLeft: widthToDp("4%"), marginTop: heightToDp('1.5%'), fontSize: widthToDp("5%"), fontFamily: 'Oswald-Medium', height: heightToDp("4%") }}>{this.state.costBenefitAnalysisLabel}</Text>
                        <View style={{ backgroundColor: 'white', width: widthToDp("90%"), height: heightToDp("23.5%"), borderBottomLeftRadius: 10, borderBottomRightRadius: 10, marginTop: heightToDp("2%") }}>
                            <View style={{ flexDirection: 'row' }}>
                                <View style={{ marginTop: heightToDp("2.5%"), marginLeft: widthToDp("2%"), width: widthToDp("30%") }}>
                                    <Text style={{ fontFamily: 'Oswald-Medium', fontSize: widthToDp('3.2%') }}>{this.state.landTypeLabel}</Text>
                                    <Text style={{ fontFamily: 'Oswald-Light', fontSize: widthToDp('3.2%') }}>{this.state.landType}</Text>

                                    <Text style={{ marginTop: heightToDp("2%"), fontFamily: 'Oswald-Medium', fontSize: widthToDp('3.2%') }}>{this.state.areaLabel}</Text>
                                    <Text style={{ fontFamily: 'Oswald-Light', fontSize: widthToDp('3.2%') }}>{this.state.areaLabel} {this.state.farmingAreaInDecimal} {this.state.decimalLabel}</Text>
                                </View>
                                <Image
                                    style={{ height: heightToDp("20%"), width: widthToDp("50%"), marginTop: heightToDp("2%"), marginLeft: widthToDp("7%"), borderRadius: 10 }}
                                    source={{ uri: 'file:///storage/emulated/0/Pictures/Pop/image_' + this.state.imageFile }}
                                />
                            </View>
                        </View>
                    </View>


                    <View style={{ backgroundColor: BaseColor.Red, width: widthToDp("90%"), height: heightToDp("30%"), alignSelf: 'center', marginTop: heightToDp("2%"), borderRadius: 10 }}>
                        <Text style={{ color: 'white', marginLeft: widthToDp("4%"), marginTop: heightToDp('1.5%'), fontSize: widthToDp("5%"), fontFamily: 'Oswald-Medium', height: heightToDp("4%") }}>{this.state.materialLabel}</Text>
                        <View style={{ backgroundColor: 'white', width: widthToDp("90%"), height: heightToDp("23.5%"), borderBottomLeftRadius: 10, borderBottomRightRadius: 10, marginTop: heightToDp("2%") }}>
                            <ScrollView nestedScrollEnabled={true}>
                                <View style={{ marginLeft: widthToDp("4%")}}>
                                    {
                                        this.state.textLanguageChange === '0' ? <Text style={{ fontSize: widthToDp("5%"), fontFamily: 'Oswald-Medium'}}>{this.state.materialEnglish}</Text> : ((this.state.textLanguageChange === '1') ? <Text style={{ fontSize: widthToDp("5%"), fontFamily: 'Oswald-Medium'}}>{this.state.materialHindi}</Text> : ((this.state.textLanguageChange === '2') ? <Text style={{ fontSize: widthToDp("5%"), fontFamily: 'Oswald-Medium'}}>{this.state.materialHo}</Text> : ((this.state.textLanguageChange === '3') ? <Text style={{ fontSize: widthToDp("5%"), fontFamily: 'Oswald-Medium'}}>{this.state.materialOdia}</Text> : ((this.state.textLanguageChange === '4') ? <Text style={{ fontSize: widthToDp("5%"), fontFamily: 'Oswald-Medium'}}>{this.state.materialSanthali}</Text> : null))))
                                    }
                                </View>

                            </ScrollView>
                        </View>
                    </View>


                    <View style={{ backgroundColor: BaseColor.Red, width: widthToDp("90%"), height: heightToDp("40%"), alignSelf: 'center', marginTop: heightToDp("2%"), borderRadius: 10 }}>
                        <Text style={{ color: 'white', marginLeft: widthToDp("4%"), marginTop: heightToDp('1.5%'), fontSize: widthToDp("5%"), fontFamily: 'Oswald-Medium', height: heightToDp("4%") }}>{this.state.expectedAnalysisLabel}</Text>
                        <View style={{ backgroundColor: 'white', width: widthToDp("90%"), height: heightToDp("55%"), borderBottomLeftRadius: 10, borderBottomRightRadius: 10, marginTop: heightToDp("2%") }}>
                            <View style={{ flexDirection: 'row', marginLeft: widthToDp("4%"), marginTop: heightToDp('1%') }}>
                                <View style={{
                                    width
                                        : widthToDp("23%")
                                }}>
                                    <Text style={{
                                        fontFamily: 'Oswald-Medium',
                                        fontSize: widthToDp('3.1%')
                                    }}>{this.state.descriptionLabel}</Text>
                                </View>

                                <Text style={{ marginLeft: widthToDp("30%"), fontFamily: 'Oswald-Medium', fontSize: widthToDp('3.1%') }}>{this.state.amountLabel}</Text>
                            </View>
                            <View style={{ borderBottomColor: 'black', borderBottomWidth: 1, marginTop: heightToDp('1.5%'), width: widthToDp("90%") }}></View>
                            <View style={{ flexDirection: 'row', marginLeft: widthToDp("4%"), marginTop: heightToDp('2%') }}>
                                <View style={{
                                    width
                                        : widthToDp("25%")
                                }}>
                                    <Text style={{ fontFamily: 'Oswald-Medium', fontSize: widthToDp('3.1%') }}>{this.state.totalCostOfCultivationLabel}</Text>
                                </View>

                                <Text style={{ marginLeft: widthToDp("28%"), fontFamily: 'Oswald-Medium', fontSize: widthToDp('3.1%') }}>₹ {this.state.costOfCultivatinPerTenDecimal}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', marginLeft: widthToDp("4%"), marginTop: heightToDp('2%') }}>
                                <View style={{
                                    width
                                        : widthToDp("26%")
                                }}>
                                    <Text style={{ fontFamily: 'Oswald-Medium', fontSize: widthToDp('3.1%') }}>{this.state.totalIncomeFromCropLabel}</Text>
                                </View>

                                <Text style={{ marginLeft: widthToDp("27%"), fontFamily: 'Oswald-Medium', fontSize: widthToDp('3.1%') }}>₹ {this.state.costPerKg}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', marginLeft: widthToDp("4%"), marginTop: heightToDp('2%') }}>
                                <View style={{
                                    width
                                        : widthToDp("25%")
                                }}>
                                    <Text style={{ fontFamily: 'Oswald-Medium', fontSize: widthToDp('3.1%') }}>{this.state.productionLabel}</Text>
                                </View>

                                <Text style={{ marginLeft: widthToDp("28%"), fontFamily: 'Oswald-Medium', fontSize: widthToDp('3.1%') }}>{this.state.productionInKg} Kgs</Text>
                            </View>
                            <View style={{ flexDirection: 'row', marginLeft: widthToDp("4%"), marginTop: heightToDp('2%') }}>
                                <View style={{ width: widthToDp("25%") }}>
                                    <Text style={{ fontFamily: 'Oswald-Medium', fontSize: widthToDp('3.1%') }}>{this.state.productionLossPercentageLabel} @ {this.state.profitLossPercentage}%</Text>
                                </View>

                                <Text style={{ marginLeft: widthToDp("28%"), fontFamily: 'Oswald-Medium', fontSize: widthToDp('3.1%') }}>₹ {this.state.productionLossPercentage}</Text>
                            </View>

                            <View style={{ flexDirection: 'row', marginLeft: widthToDp("4%"), marginTop: heightToDp('2%') }}>
                                <View style={{ width: widthToDp("25%") }}>
                                    <Text style={{ fontFamily: 'Oswald-Medium', fontSize: widthToDp('3.1%') }}>{this.state.costPerKgLabel}</Text>
                                </View>

                                <Text style={{ marginLeft: widthToDp("28%"), fontFamily: 'Oswald-Medium', fontSize: widthToDp('3.1%') }}>₹ {this.state.cost}</Text>
                            </View>
                            <View style={{ borderBottomColor: 'black', borderBottomWidth: 1, marginTop: heightToDp('1.5%'), width: widthToDp("90%") }}></View>
                            <View style={{ flexDirection: 'row', marginLeft: widthToDp("4%"), marginTop: heightToDp('1%') }}>
                                <View style={{ width: widthToDp("25%") }}>
                                    <Text style={{ fontSize: widthToDp("5%"), fontFamily: 'Oswald-Bold', fontSize: widthToDp('3.3%') }}>{this.state.netProfitLabel}</Text>
                                </View>

                                <Text style={{ marginLeft: widthToDp("25%"), fontWeight: 'bold', fontSize: widthToDp("3.3%"), fontFamily: 'Oswald-Bold' }}>₹ {this.state.netProfit}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{ marginBottom: heightToDp("30%") }}></View>
                </ScrollView>
                <View style={{ height: heightToDp("10%") }}>
                    <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                            <View style={{ backgroundColor: "#fff", height: heightToDp("6%"), width: widthToDp("30%"), borderRadius: 100, marginLeft: widthToDp("20%"), marginTop: heightToDp("2%") }}>
                                <Text style={{ fontSize: widthToDp("4%"), color: "#000", marginTop: heightToDp("1.4%"), alignSelf: 'center', fontFamily: 'Oswald-Medium' }}>{this.state.cancelLabel}</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => { this.stepOneScreen() }}>
                            <View style={{ backgroundColor: "#fff", height: heightToDp("6%"), width: widthToDp("30%"), borderRadius: 100, marginLeft: widthToDp("2%"), marginTop: heightToDp("2%") }}>
                                <Text style={{ fontSize: widthToDp("4%"), color: "#000", marginTop: heightToDp("1.4%"), alignSelf: 'center', fontFamily: 'Oswald-Medium' }}>{this.state.doneLabel}</Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                </View>

            </View>
        );
    }
}