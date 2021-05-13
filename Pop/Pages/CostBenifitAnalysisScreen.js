import React, { Component } from 'react'
import { View, Image, TouchableOpacity, FlatList, ScrollView } from 'react-native'
import BaseColor from '../Core/BaseTheme'
import { Card, Text, Toast } from 'native-base'
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

export default class CostBenifitAnalysisScreen extends Component {

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
            materialPrice: '',
            numberOfSteps: '',
            pageNumber: '05',
            patchName: '',
            landType: '',
            farmingAreaInDecimal: '',
            costOfCultivatinPerTenDecimal: '',
            costPerKg: '',
            productionInKg: '',
            cost: '',
            netProfit: '',
            actualCulCostScreenProductionInKg: '',
            actualCulCostScreenCostPerKg: '',
            actualCulCostScreenTotalExpense: '',
            totalincomefromcrop: '',
            profit: '',
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
            exitLabel: '',
            highLandLabel: '',
            areaLabel: '',
            decimalLabel: '',
            languages: ''
        }
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
        this.state.actualCulCostScreenProductionInKg = this.props.route.params.actualCulCostScreenProductionInKg
        this.state.actualCulCostScreenCostPerKg = this.props.route.params.actualCulCostScreenCostPerKg
        this.state.actualCulCostScreenTotalExpense = this.props.route.params.actualCulCostScreenTotalExpense
        this.state.languages = Languages
        var value1 = this.state.actualCulCostScreenProductionInKg
        var value2 = this.state.actualCulCostScreenCostPerKg
        this.state.totalincomefromcrop = value1 * value2

        var income = this.state.totalincomefromcrop
        var expense = this.state.actualCulCostScreenTotalExpense
        this.state.profit = income - expense


    }

    componentDidMount = () => {

        this.setLanguageOnMount()
        //this.setExitFlag()
    }


    setExitFlag = async () => {
        let username = await AsyncStorage.getItem('username')
        let user = await AsyncStorage.getItem('user');
        let parsed = JSON.parse(user);
        var specificObject = parsed.find((i) => i.username === username)
        var patchSpecific = specificObject.patch.find((i) => i.patchName === this.state.patchName)
        patchSpecific.completed = true
        await AsyncStorage.setItem('user', JSON.stringify(parsed))
        console.log(patchSpecific.completed)
        //console.log(patchSpecific.completed = true)

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
            var exitLabel = specificObject.labels.find((i) => i.type === 186)
            var decimalLabel = specificObject.labels.find((i) => i.type === 188)
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
                    exitLabel: exitLabel.nameEnglish,
                    decimalLabel: decimalLabel.nameEnglish,
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
                    exitLabel: exitLabel.nameHindi,
                    decimalLabel: decimalLabel.nameHindi,
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
                    exitLabel: exitLabel.nameHo,
                    decimalLabel: decimalLabel.nameHo,
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
                    exitLabel: exitLabel.nameOdia,
                    decimalLabel: decimalLabel.nameOdia,
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
                    exitLabel: exitLabel.nameSanthali,
                    decimalLabel: decimalLabel.nameSanthali,
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



    goToHomeScreen = async () => {
        try {
            var date = new Date().getDate()
            var month = new Date().getMonth() + 1
            var year = new Date().getFullYear()
            const expenseObject = { 'type': 'expense', 'category': 'Crops', 'amount': this.state.actualCulCostScreenTotalExpense, 'date': date + "/" + month + "/" + year }
            const incomeObject = { 'type': 'income', 'category': 'Crops', 'amount': this.state.totalincomefromcrop, 'date': date + "/" + month + "/" + year }
            let username = await AsyncStorage.getItem('username')
            let user = await AsyncStorage.getItem('user');
            let parsed = JSON.parse(user);
            var specificObject = parsed.find((i) => i.username === username)
            specificObject.moneyManagerData.push(expenseObject)
            specificObject.moneyManagerData.push(incomeObject)
            await AsyncStorage.setItem('user', JSON.stringify(parsed))
            console.log(specificObject.moneyManagerData)
        } catch (error) {
            console.log(error)
        }
        Toast.show({
            text: "Your data has been saved in MONEY MANAGER under ALL TRANSACTIONS",
            duration: 3000,
            type: 'success'
        });
        this.props.navigation.reset({
            index: 0,
            routes: [{ name: "DashBoardScreen" }]
        })

        this.setExitFlag()

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
                        <Text style={{ color: 'white', marginLeft: widthToDp("4%"), marginTop: heightToDp('1.5%'), fontSize: widthToDp("5%"), fontFamily: 'Oswald-Medium', height: heightToDp("3.5%") }}>{this.state.costBenefitAnalysisLabel}</Text>
                        <View style={{ backgroundColor: 'white', width: widthToDp("90%"), height: heightToDp("23.5%"), borderBottomLeftRadius: 10, borderBottomRightRadius: 10, marginTop: heightToDp("2%") }}>
                            <View style={{ flexDirection: 'row' }}>
                                <View style={{ marginTop: heightToDp("4%"), marginLeft: widthToDp("2%") }}>
                                    <Text style={{ fontFamily: 'Oswald-Medium' }}>{this.state.landTypeLabel}</Text>
                                    <Text style={{ fontFamily: 'Oswald-Light' }}>{this.state.landType}</Text>

                                    <Text style={{ marginTop: heightToDp("3%"), fontFamily: 'Oswald-Medium' }}>{this.state.areaLabel}</Text>
                                    <Text style={{ fontFamily: 'Oswald-Light' }}>{this.state.areaLabel} {this.state.farmingAreaInDecimal} {this.state.decimalLabel}</Text>
                                </View>
                                <Image
                                    style={{ height: heightToDp("20%"), width: widthToDp("50%"), marginTop: heightToDp("2%"), marginLeft: widthToDp("7%"), borderRadius: 10 }}
                                    source={{ uri: DataAccess.BaseUrl + DataAccess.CropImage + this.state.imageFile }}
                                />
                            </View>
                        </View>
                    </View>


                    <View style={{ backgroundColor: BaseColor.Red, width: widthToDp("90%"), height: heightToDp("50%"), alignSelf: 'center', marginTop: heightToDp("2%"), borderRadius: 10 }}>
                        <Text style={{ color: 'white', marginLeft: widthToDp("4%"), marginTop: heightToDp('1.5%'), fontSize: widthToDp("5%"), fontFamily: 'Oswald-Medium', height: heightToDp("3.5%") }}>{this.state.expectedAnalysisLabel}</Text>
                        <View style={{ backgroundColor: 'white', width: widthToDp("90%"), height: heightToDp("43%"), borderBottomLeftRadius: 10, borderBottomRightRadius: 10, marginTop: heightToDp("2%") }}>
                            <View style={{ flexDirection: 'row', marginLeft: widthToDp("4%"), marginTop: heightToDp('1%') }}>
                                <View style={{ width: widthToDp("60%") }}>
                                    <Text style={{ fontFamily: 'Oswald-Medium', fontSize: widthToDp('3.1%') }}>{this.state.descriptionLabel}</Text>
                                </View>
                                <View style={{ width: widthToDp("30%") }}>
                                    <Text style={{ fontFamily: 'Oswald-Medium', fontSize: widthToDp('3.1%') }}>{this.state.amountLabel}</Text>
                                </View>


                            </View>
                            <View style={{ borderBottomColor: 'black', borderBottomWidth: 1, marginTop: heightToDp('1.5%'), width: widthToDp("90%") }}></View>
                            <View style={{ flexDirection: 'row', marginLeft: widthToDp("4%"), marginTop: heightToDp('2%') }}>
                                <View style={{ width: widthToDp("60%") }}>
                                    <Text style={{ fontFamily: 'Oswald-Medium', fontSize: widthToDp('3.1%') }}>{this.state.totalCostOfCultivationLabel}</Text>
                                </View>
                                <View style={{ width: widthToDp("30%") }}>
                                    <Text style={{ marginLeft: widthToDp("0%"), fontFamily: 'Oswald-Medium', fontSize: widthToDp('3.1%') }}>₹ {this.state.costOfCultivatinPerTenDecimal}</Text>
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row', marginLeft: widthToDp("4%"), marginTop: heightToDp('2%') }}>
                                <View style={{ width: widthToDp("60%") }}>
                                    <Text style={{ fontFamily: 'Oswald-Medium', fontSize: widthToDp('3.1%') }}>{this.state.totalIncomeFromCropLabel}</Text>
                                </View>
                                <View style={{ width: widthToDp('30%') }}>
                                    <Text style={{ fontFamily: 'Oswald-Medium', fontSize: widthToDp('3.1%') }}>₹ {this.state.costPerKg}</Text>
                                </View>

                            </View>
                            <View style={{ flexDirection: 'row', marginLeft: widthToDp("4%"), marginTop: heightToDp('2%') }}>
                                <View style={{ width: widthToDp("60%") }}>
                                    <Text style={{ fontFamily: 'Oswald-Medium', fontSize: widthToDp('3.1%') }}>{this.state.productionLabel}</Text>
                                </View>
                                <View style={{ width: widthToDp('30%') }}>
                                    <Text style={{ fontFamily: 'Oswald-Medium', fontSize: widthToDp('3.1%') }}>{this.state.productionInKg} KG</Text>
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row', marginLeft: widthToDp("4%"), marginTop: heightToDp('2%') }}>
                                <View style={{ width: widthToDp('60%') }}>
                                    <Text style={{ fontFamily: 'Oswald-Medium', fontSize: widthToDp('3.1%') }}>{this.state.costPerKgLabel}</Text>
                                </View>
                                <View style={{ width: widthToDp('30%') }}>
                                    <Text style={{ fontFamily: 'Oswald-Medium', fontSize: widthToDp('3.1%') }}>₹ {this.state.cost}</Text>
                                </View>

                            </View>
                            <View style={{ borderBottomColor: 'black', borderBottomWidth: 1, marginTop: heightToDp('1.5%'), width: widthToDp("90%") }}></View>
                            <View style={{ flexDirection: 'row', marginTop: heightToDp('1%'), alignSelf: 'center', marginLeft: widthToDp("6%"), }}>
                                <View style={{ width: widthToDp('60%') }}>
                                    <Text style={{ fontSize: widthToDp("5%"), fontFamily: 'Oswald-Bold', fontSize: widthToDp('3.3%') }}>{this.state.netProfitLabel}</Text>
                                </View>
                                <View style={{ width: widthToDp('30%'), fontSize: widthToDp('3.3%') }}>
                                    <Text style={{ fontWeight: 'bold', fontSize: widthToDp("3.3%"), fontFamily: 'Oswald-Bold' }}>₹ {this.state.netProfit}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={{ backgroundColor: BaseColor.Red, width: widthToDp("90%"), height: heightToDp("65%"), alignSelf: 'center', marginTop: heightToDp("2%"), borderRadius: 10 }}>
                        <Text style={{ color: 'white', marginLeft: widthToDp("4%"), marginTop: heightToDp('1.5%'), fontSize: widthToDp("5%"), fontFamily: 'Oswald-Medium' }}>{this.state.actualAnalysisLabel}</Text>
                        <View style={{ backgroundColor: 'white', width: widthToDp("90%"), height: heightToDp("54%"), borderBottomLeftRadius: 10, borderBottomRightRadius: 10, marginTop: heightToDp("2%") }}>
                            <View style={{ flexDirection: 'row', marginLeft: widthToDp("4%"), marginTop: heightToDp('1%') }}>
                                <View style={{ width: widthToDp('60%') }}>
                                    <Text style={{ fontFamily: 'Oswald-Medium', fontSize: widthToDp('3.1%') }}>{this.state.descriptionLabel}</Text>
                                </View>
                                <View style={{ width: widthToDp('30%') }}>
                                    <Text style={{ fontFamily: 'Oswald-Medium', fontSize: widthToDp('3.1%') }}>{this.state.amountLabel}</Text>
                                </View>
                            </View>
                            <View style={{ borderBottomColor: 'black', borderBottomWidth: 1, marginTop: heightToDp('1.5%'), width: widthToDp("90%") }}></View>
                            <View style={{ flexDirection: 'row', marginLeft: widthToDp("4%"), marginTop: heightToDp('2%') }}>
                                <View style={{ width: widthToDp("60%") }}>
                                    <Text style={{ fontFamily: 'Oswald-Medium', fontSize: widthToDp('3.1%') }}>{this.state.totalCostOfCultivationLabel}</Text>
                                </View>

                                <View style={{ width: widthToDp("30%") }}>
                                    <Text style={{ fontFamily: 'Oswald-Medium', fontSize: widthToDp('3.1%') }}>{this.state.actualCulCostScreenTotalExpense ? "₹ " + this.state.actualCulCostScreenTotalExpense : ""}</Text>
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row', marginLeft: widthToDp("4%"), marginTop: heightToDp('2%') }}>
                                <View style={{ width: widthToDp("60%") }}>
                                    <Text style={{ fontFamily: 'Oswald-Medium', fontSize: widthToDp('3.1%') }}>{this.state.totalIncomeFromCropLabel}</Text>
                                </View>
                                <View style={{ width: widthToDp("30%") }}>
                                    <Text style={{ fontFamily: 'Oswald-Medium', fontSize: widthToDp('3.1%') }}>₹ {this.state.totalincomefromcrop}</Text>
                                </View>

                            </View>
                            <View style={{ flexDirection: 'row', marginLeft: widthToDp("4%"), marginTop: heightToDp('2%') }}>
                                <View style={{ width: widthToDp("60%") }}>
                                    <Text style={{ fontFamily: 'Oswald-Medium', fontSize: widthToDp('3.1%') }}>{this.state.productionLabel}</Text>
                                </View>
                                <View style={{ width: widthToDp("30%") }}>
                                    <Text style={{ fontFamily: 'Oswald-Medium', fontSize: widthToDp('3.1%') }}>{this.state.actualCulCostScreenProductionInKg} KG</Text>
                                </View>

                            </View>
                            <View style={{ flexDirection: 'row', marginLeft: widthToDp("4%"), marginTop: heightToDp('2%') }}>
                                <View style={{ width: widthToDp("60%") }}>
                                    <Text style={{ fontFamily: 'Oswald-Medium', fontSize: widthToDp('3.1%') }}>{this.state.costPerKgLabel}</Text>
                                </View>
                                <View style={{ width: widthToDp("30%") }}>
                                    <Text style={{ fontFamily: 'Oswald-Medium', fontSize: widthToDp('3.1%') }}>₹ {this.state.actualCulCostScreenCostPerKg}</Text>
                                </View>
                            </View>
                            <View style={{ borderBottomColor: 'black', borderBottomWidth: 1, marginTop: heightToDp('1.5%'), width: widthToDp("90%") }}></View>
                            <View style={{ flexDirection: 'row', alignSelf: 'center', marginTop: heightToDp('1%'), marginLeft: widthToDp('6%') }}>
                                <View style={{ width: widthToDp("60%") }}>
                                    <Text style={{ fontSize: widthToDp("5%"), fontFamily: 'Oswald-Bold', fontSize: widthToDp('3.3%') }}>{this.state.netProfitLabel}</Text>
                                </View>
                                <View style={{ width: widthToDp("30%") }}>
                                    <Text style={{ fontWeight: 'bold', fontSize: widthToDp("3.3%"), fontFamily: 'Oswald-Bold' }}>₹ {this.state.profit}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={{ marginBottom: heightToDp("10%") }}></View>
                </ScrollView>
                <View style={{ height: heightToDp("10%") }}>
                    <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                            <View style={{ backgroundColor: "#fff", height: heightToDp("6%"), width: widthToDp("30%"), borderRadius: 100, marginLeft: widthToDp("20%"), marginTop: heightToDp("2%") }}>
                                <Text style={{ fontSize: widthToDp("4%"), color: "#000", marginTop: heightToDp("1.4%"), alignSelf: 'center', fontFamily: 'Oswald-Medium' }}>{this.state.cancelLabel}</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.goToHomeScreen()}>
                            <View style={{ backgroundColor: "#fff", height: heightToDp("6%"), paddingHorizontal: widthToDp("5%"), borderRadius: 100, marginLeft: widthToDp("2%"), marginTop: heightToDp("2%") }}>
                                <Text style={{ fontSize: widthToDp("4%"), color: "#000", marginTop: heightToDp("1.4%"), alignSelf: 'center', fontFamily: 'Oswald-Medium' }}>{this.state.exitLabel}</Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                </View>

            </View>
        );
    }
}