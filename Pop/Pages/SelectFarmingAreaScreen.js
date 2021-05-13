import React, { Component } from 'react'
import { View, Image, TouchableOpacity, FlatList, ImageBackground } from 'react-native'
import { Input } from 'react-native-elements'
import BaseColor from '../Core/BaseTheme'
import { Card, Text } from 'native-base'
import TopLogo from '../assets/TopLogo'
import { widthToDp, heightToDp } from '../Responsive'
import { FlatGrid, SectionGrid } from 'react-native-super-grid'
import Icon from 'react-native-vector-icons/FontAwesome'
import Icon2 from 'react-native-vector-icons/AntDesign'
import Icon3 from 'react-native-vector-icons/EvilIcons'
import Languages from '../Core/Languages'
import AsyncStorage from '@react-native-async-storage/async-storage'
import HeaderComponent from '../components/HeaderComponent'


export default class SelectFarmingAreaScreen extends Component {

    constructor(props) {
        super(props)
        this.state = {
            landType: '',
            _id: '',
            horizontalCounter: 0,
            verticalCounter: 0,
            cropName:'',
            imageFile:'',
            patchName:'',
            languages:[],
            farmingAreaLabel: '',
            submitText: '',
            measureLabel: '',
            decimalProduce:'',
            cultivationExpense:'',
            costPer:'',
            profitLossPercentage:''
        }
        this.state.landType = this.props.route.params.landType
        this.state._id = this.props.route.params._id
        this.state.cropName = this.props.route.params.cropName
        this.state.imageFile = this.props.route.params.imageFile
        this.state.patchName = this.props.route.params.patchName
        this.state.languages = Languages
        //alert(this.state.cropName)
    }
    componentDidMount(){
        this.setLanguageOnMount()
        this.getPricesOfCrops()
    }

    getPricesOfCrops = async() => {
        try{
            let user = await AsyncStorage.getItem('numberOfCrops');
            let parsed = JSON.parse(user);
            var specificObject = parsed[0]
            var specificCrops = specificObject.crops.find((i) => i._id === this.state._id)
            this.state.decimalProduce = specificCrops.decimalProduce
            this.state.cultivationExpense = specificCrops.cultivationExpense
            this.state.costPer = specificCrops.costPer
            this.state.profitLossPercentage = specificCrops.profitLossPercentage
            //console.log(this.state.decimalProduce, "SelectFarmingArea")
        }catch(error){
            console.log(error,'SelectFarmingAreaScreen')
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
            var farmingAreaLabel = specificObject.labels.find((i) => i.type === 59)
            var submitText = specificObject.labels.find((i) => i.type === 61)
            var measureLabel = specificObject.labels.find((i) => i.type === 60)
            // var message = specificObject.labels.find((i) => i.type === 26)
            // var generalSettings = specificObject.labels.find((i) => i.type === 27)
            // var pension = specificObject.labels.find((i) => i.type === 51)
            // var others = specificObject.labels.find((i) => i.type === 52)
            if (this.state.textLanguageChange === '0') {
                this.setState({ farmingAreaLabel: farmingAreaLabel.nameEnglish })
                this.setState({ submitText: submitText.nameEnglish })
                this.setState({ measureLabel: measureLabel.nameEnglish })
            } else if (this.state.textLanguageChange === '1') {
                this.setState({ farmingAreaLabel: farmingAreaLabel.nameHindi })
                this.setState({ submitText: submitText.nameHindi })
                this.setState({ measureLabel: measureLabel.nameHindi })
            } else if (this.state.textLanguageChange === '2') {
                this.setState({ farmingAreaLabel: farmingAreaLabel.nameHo })
                this.setState({ submitText: submitText.nameHo })
                this.setState({ measureLabel: measureLabel.nameHo })
            } else if (this.state.textLanguageChange === '3') {
                this.setState({ farmingAreaLabel: farmingAreaLabel.nameOdia })
                this.setState({ submitText: submitText.nameOdia })
                this.setState({ measureLabel: measureLabel.nameOdia })
            } else if (this.state.textLanguageChange === '4') {
                this.setState({ farmingAreaLabel: farmingAreaLabel.nameSanthali })
                this.setState({ submitText: submitText.nameSanthali })
                this.setState({ measureLabel: measureLabel.nameSanthali })
            }
        } catch (error) {
            alert(error)
        }
        //this.setState({ crops: specificObject.crops })
        //this.showData()
    }

    languageChangeFunction = async (data) => {

        if (data === 'en') {
            AsyncStorage.setItem('language', 'en')
            this.setState({ textLanguageChange: '0' })
            this.props.navigation.reset({
                index: 0,
                routes: [{ name: "DashBoardScreen" }]
            });
        } else if (data === 'hi') {
            this.setState({ textLanguageChange: '1' })
            AsyncStorage.setItem('language', 'hi')
            this.props.navigation.reset({
                index: 0,
                routes: [{ name: "DashBoardScreen" }]
            });
        } else if (data === 'ho') {
            this.setState({ textLanguageChange: '2' })
            AsyncStorage.setItem('language', 'ho')
            this.props.navigation.reset({
                index: 0,
                routes: [{ name: "DashBoardScreen" }]
            });
        } else if (data === 'od') {
            this.setState({ textLanguageChange: '3' })
            AsyncStorage.setItem('language', 'od')
            this.props.navigation.reset({
                index: 0,
                routes: [{ name: "DashBoardScreen" }]
            });
        } else if (data === 'san') {
            AsyncStorage.setItem('language', 'san')
            this.setState({ textLanguageChange: '4' })
            this.props.navigation.reset({
                index: 0,
                routes: [{ name: "DashBoardScreen" }]
            });
        }
    }

    verticalCounterControl = (operation) => {
        if (operation === 'plus') {
            this.setState({ verticalCounter: this.state.verticalCounter + 1 })
        } else if (operation === 'minus') {
            if(this.state.verticalCounter <= 0){
                return alert("Not Allowed")
            }else{
                this.setState({ verticalCounter: this.state.verticalCounter -1 })
            }
        }
    }

    horizontalCounterControl = (operation) => {
        if (operation === 'plus') {
            this.setState({ horizontalCounter: this.state.horizontalCounter + 1 })
        } else if (operation === 'minus') {
            if(this.state.horizontalCounter <= 0){
                return alert("Not Allowed")
            }else{
                this.setState({ horizontalCounter: this.state.horizontalCounter -1 })
            }
        }
    }

    submitDimensions = () => {
        var length = this.state.horizontalCounter * 5
        var width = this.state.verticalCounter * 5
        var farmingAreaInSqFeet = length*width
        var farmingAreaInDecimal = parseFloat(farmingAreaInSqFeet/436).toFixed(2)
        var productionInKg = parseFloat((this.state.decimalProduce/10)* farmingAreaInDecimal).toFixed(2)
        var costOfCultivatinPerTenDecimal = parseFloat((this.state.cultivationExpense/10)* farmingAreaInDecimal).toFixed(2)//expense
        var costPerKg = parseFloat(this.state.costPer * productionInKg).toFixed(2) //income
        var productionLossPercentage = parseFloat(productionInKg * (this.state.profitLossPercentage / 100) * this.state.costPer).toFixed(2)
        
            this.props.navigation.navigate({
                name: 'AnalysisScreen',
                params: {
                    landType: this.state.landType,
                    _id: this.state._id,
                    imageFile: this.state.imageFile,
                    cropName: this.state.cropName,
                    farmingAreaInDecimal: farmingAreaInDecimal,
                    costOfCultivatinPerTenDecimal: costOfCultivatinPerTenDecimal,
                    costPerKg: costPerKg,
                    productionInKg:productionInKg,
                    cost: this.state.costPer,
                    patchName : this.state.patchName,
                    productionLossPercentage : productionLossPercentage
                }
            })



        // if(this.state.cropName === 'Bitter Gourd'){
        //     var length = this.state.horizontalCounter * 5
        //     var width = this.state.verticalCounter * 5
        //     var farmingAreaInSqFeet = length*width
        //     var farmingAreaInDecimal = parseFloat(farmingAreaInSqFeet/436).toFixed(2)
        //     var productionInKg = parseFloat((400/10)* farmingAreaInDecimal).toFixed(2)
        //     var costOfCultivatinPerTenDecimal = parseFloat((2810/10)* farmingAreaInDecimal).toFixed(2)//expense
        //     var costPerKg = parseFloat(40 * productionInKg).toFixed(2) //income

        //     this.props.navigation.navigate({
        //         name: 'AnalysisScreen',
        //         params: {
        //             landType: this.state.landType,
        //             _id: this.state._id,
        //             imageFile: this.state.imageFile,
        //             cropName: this.state.cropName,
        //             farmingAreaInDecimal: farmingAreaInDecimal,
        //             costOfCultivatinPerTenDecimal: costOfCultivatinPerTenDecimal,
        //             costPerKg: costPerKg,
        //             productionInKg:productionInKg,
        //             cost: 40,
        //             patchName : this.state.patchName
        //         }
        //     })

        //     //alert(this.state.patchName)

        // }else if(this.state.cropName === 'Chilli'){
        //     var length = this.state.horizontalCounter * 5
        //     var width = this.state.verticalCounter * 5
        //     var farmingAreaInSqFeet = length*width
        //     var farmingAreaInDecimal = parseFloat(farmingAreaInSqFeet/436).toFixed(2)
        //     var productionInKg = parseFloat((400/10)* farmingAreaInDecimal).toFixed(2)
        //     var costOfCultivatinPerTenDecimal = parseFloat((2810/10)* farmingAreaInDecimal).toFixed(2)//expense
        //     var costPerKg = parseFloat(40 * productionInKg).toFixed(2) //income

        //     this.props.navigation.navigate({
        //         name: 'AnalysisScreen',
        //         params: {
        //             landType: this.state.landType,
        //             _id: this.state._id,
        //             imageFile: this.state.imageFile,
        //             cropName: this.state.cropName,
        //             farmingAreaInDecimal: farmingAreaInDecimal,
        //             costOfCultivatinPerTenDecimal: costOfCultivatinPerTenDecimal,
        //             costPerKg: costPerKg,
        //             productionInKg:productionInKg,
        //             cost: 40,
        //             patchName : this.state.patchName
        //         }
        //     })

        // }else if(this.state.cropName === 'Onion'){
        //     var length = this.state.horizontalCounter * 5
        //     var width = this.state.verticalCounter * 5
        //     var farmingAreaInSqFeet = length*width
        //     var farmingAreaInDecimal = parseFloat(farmingAreaInSqFeet/436).toFixed(2)
        //     var productionInKg = parseFloat((400/10)* farmingAreaInDecimal).toFixed(2)
        //     var costOfCultivatinPerTenDecimal = parseFloat((2810/10)* farmingAreaInDecimal).toFixed(2)//expense
        //     var costPerKg = parseFloat(35 * productionInKg).toFixed(2) //income

        //     this.props.navigation.navigate({
        //         name: 'AnalysisScreen',
        //         params: {
        //             landType: this.state.landType,
        //             _id: this.state._id,
        //             imageFile: this.state.imageFile,
        //             cropName: this.state.cropName,
        //             farmingAreaInDecimal: farmingAreaInDecimal,
        //             costOfCultivatinPerTenDecimal: costOfCultivatinPerTenDecimal,
        //             costPerKg: costPerKg,
        //             productionInKg:productionInKg,
        //             cost: 35,
        //             patchName : this.state.patchName
        //         }
        //     })

        // }else if(this.state.cropName === 'Paddy'){
        //     var length = this.state.horizontalCounter * 5
        //     var width = this.state.verticalCounter * 5
        //     var farmingAreaInSqFeet = length*width
        //     var farmingAreaInDecimal = parseFloat(farmingAreaInSqFeet/436).toFixed(2)
        //     var productionInKg = parseFloat((400/10)* farmingAreaInDecimal).toFixed(2)
        //     var costOfCultivatinPerTenDecimal = parseFloat((2810/10)* farmingAreaInDecimal).toFixed(2)//expense
        //     var costPerKg = parseFloat(25 * productionInKg).toFixed(2) //income

        //     this.props.navigation.navigate({
        //         name: 'AnalysisScreen',
        //         params: {
        //             landType: this.state.landType,
        //             _id: this.state._id,
        //             imageFile: this.state.imageFile,
        //             cropName: this.state.cropName,
        //             farmingAreaInDecimal: farmingAreaInDecimal,
        //             costOfCultivatinPerTenDecimal: costOfCultivatinPerTenDecimal,
        //             costPerKg: costPerKg,
        //             productionInKg:productionInKg,
        //             cost: 25,
        //             patchName : this.state.patchName
        //         }
        //     })

        // }else if(this.state.cropName === 'Tomato'){
        //     var length = this.state.horizontalCounter * 5
        //     var width = this.state.verticalCounter * 5
        //     var farmingAreaInSqFeet = length*width
        //     var farmingAreaInDecimal = parseFloat(farmingAreaInSqFeet/436).toFixed(2)
        //     var productionInKg = parseFloat((400/10)* farmingAreaInDecimal).toFixed(2)
        //     var costOfCultivatinPerTenDecimal = parseFloat((2810/10)* farmingAreaInDecimal).toFixed(2)//expense
        //     var costPerKg = parseFloat(35 * productionInKg).toFixed(2) //income

        //     this.props.navigation.navigate({
        //         name: 'AnalysisScreen',
        //         params: {
        //             landType: this.state.landType,
        //             _id: this.state._id,
        //             imageFile: this.state.imageFile,
        //             cropName: this.state.cropName,
        //             farmingAreaInDecimal: farmingAreaInDecimal,
        //             costOfCultivatinPerTenDecimal: costOfCultivatinPerTenDecimal,
        //             costPerKg: costPerKg,
        //             productionInKg:productionInKg,
        //             cost: 35,
        //             patchName : this.state.patchName
        //         }
        //     })
        // }
    }


    // submitDimensions = () => {
    //     var verticalCal
    //     var horizontalCal
    //     var vertical = this.state.vertical
    //     var horizontal = this.state.horizontal

    //     verticalCal = vertical * 5
    //     horizontalCal = horizontal * 5

    //     // this.setState({verticalCal : verticalCal})
    //     // this.setState({horizontalCal : horizontalCal})
    //     this.state.verticalCal = verticalCal
    //     this.state.horizontalCal = horizontalCal

    //     var farmingAreaInSquareFeet = verticalCal * horizontalCal
    //     var farmingAreaInDecimal = parseFloat(farmingAreaInSquareFeet / 436).toFixed(2)

    //     // this.setState({farmingAreaInSquareFeet : farmingAreaInSquareFeet})
    //     // this.setState({farmingAreaInDecimal : farmingAreaInDecimal})


    //     this.state.farmingAreaInSquareFeet = farmingAreaInSquareFeet
    //     this.state.farmingAreaInDecimal = farmingAreaInDecimal

    //     //10 decimal produces : 400 KG
    //     var productionInKg = Math.round(40 * farmingAreaInDecimal)

    //     // this.setState({productionInKg : productionInKg})
    //     this.state.productionInKg = productionInKg

    //     //Expense / Cost of cultivation per 10 decimal of land : Rs. 2810
    //     var expense = 281 * farmingAreaInDecimal

    //     // this.setState({expense : expense})
    //     this.state.expense = expense

    //     //Cost per KG : Rs. 35 (assumed)
    //     var totalIncomeFromCrop = Math.round(35 * productionInKg).toFixed(2)

    //     //this.setState({totalIncomeFromCrop : totalIncomeFromCrop})
    //     this.state.totalIncomeFromCrop = totalIncomeFromCrop


    //     if (!this.state.vertical) {
    //         return alert("enter a value")
    //     } else if (!this.state.horizontal) {
    //         return alert("enter a value")
    //     }

    //     this.props.navigation.navigate({
    //         name: 'AnalysisScreen',
    //         params: {
    //             landType: this.state.landType,
    //             farmingAreaInDecimal: this.state.farmingAreaInDecimal,
    //             expense: this.state.expense,
    //             totalIncomeFromCrop: this.state.totalIncomeFromCrop,
    //             productionInKg: this.state.productionInKg,
    //             _id: this.state._id
    //         }
    //     })
    // }


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
                    <TouchableOpacity onPress= {() => this.languageChangeFunction(this.state.languages[3].id)}>
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
                <Text style={{ marginLeft: widthToDp("3%"), marginTop: heightToDp("2%"), fontSize: widthToDp("7%"), fontFamily: 'Oswald-Medium' }}>{this.state.farmingAreaLabel}</Text>
                <View style={{ backgroundColor: BaseColor.Red, borderRadius: 20, height: heightToDp("40%"), width: widthToDp("80%"), alignSelf: 'center', marginTop: heightToDp('1.5%') }}>
                    {/* <ImageBackground 
                    source={{uri:'https://shramajeewiki.com/images/English/00214136.jpg'}}
                    imageStyle={{borderRadius:20}}
                    style={{width:widthToDp("80%"),height:heightToDp("40%")}}>
                        
                    </ImageBackground> */}
                    <Text style={{ color: 'white', marginLeft: widthToDp("6%"), marginTop: heightToDp("1%"), fontSize: widthToDp("4.5%"), fontFamily: 'Oswald-Light',height:heightToDp("5%") }}>{this.state.measureLabel}</Text>
                    <View style={{ backgroundColor: 'white', height: heightToDp("28%"), width: widthToDp("70%"), alignSelf: 'center', marginTop: heightToDp("4%"), borderRadius: 20 }}>
                        <View style={{ flexDirection: 'row', marginTop: heightToDp("2%"), marginLeft: widthToDp("4%") }}>
                            <Image
                                source={require('../assets/5FeetLongStick-Horizental.png')}
                                style={{ height: heightToDp("10%"), width: widthToDp("6%") }}
                            />
                            <View style={{ borderWidth: 1, width: widthToDp("35%"), marginLeft: widthToDp("20%"), height: heightToDp("7%"), flexDirection: 'row', borderRadius: 11 }}>
                                <TouchableOpacity onPress={() => { this.horizontalCounterControl('minus') }}>
                                    <View style={{ backgroundColor: 'black', width: widthToDp("10%"), borderTopLeftRadius: 10, borderBottomLeftRadius: 10, height: heightToDp("6.7%") }}>
                                        <Icon2
                                            name='minus'
                                            style={{ color: 'white', marginTop: heightToDp("2%"), alignSelf: 'center' }}
                                            size={25}
                                        />
                                    </View>
                                </TouchableOpacity>
                                <View style={{ width: widthToDp("15%") }}>
                                    <Text style={{ marginTop: heightToDp("0.2%"), fontSize: widthToDp("7%"), fontFamily: 'Oswald-Medium', alignSelf: 'center' }}>{this.state.horizontalCounter}</Text>
                                </View>
                                <TouchableOpacity onPress={() => { this.horizontalCounterControl('plus') }}>
                                    <View style={{ backgroundColor: 'black', width: widthToDp("10%"), borderTopRightRadius: 10, borderBottomRightRadius: 10, height: heightToDp("6.7%") }}>
                                        <Icon2
                                            name='plus'
                                            style={{ color: 'white', marginTop: heightToDp("2%"), alignSelf: 'center' }}
                                            size={25}
                                        />
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={{ flexDirection: 'row', marginTop: heightToDp("6%"), marginLeft: widthToDp("4%") }}>
                            <Image
                                source={require('../assets/5FeetLongStick-Vertical.png')}
                                style={{ height: heightToDp("3%"), width: widthToDp("18%") }}
                            />
                            <View style={{ borderWidth: 1, width: widthToDp("35%"), marginLeft: widthToDp("6.7%"), height: heightToDp("7%"), flexDirection: 'row', borderRadius: 11 }}>
                                <TouchableOpacity onPress={() => { this.verticalCounterControl('minus') }}>
                                    <View style={{ backgroundColor: 'black', width: widthToDp("10%"), borderTopLeftRadius: 10, borderBottomLeftRadius: 10, height: heightToDp("6.7%") }}>
                                        <Icon2
                                            name='minus'
                                            style={{ color: 'white', marginTop: heightToDp("2%"), alignSelf: 'center' }}
                                            size={25}
                                        />
                                    </View>
                                </TouchableOpacity>
                                <View style={{ width: widthToDp("15%") }}>
                                    <Text style={{ marginTop: heightToDp("0.5%"), fontSize: widthToDp("7%"), fontFamily: 'Oswald-Medium', alignSelf: 'center' }}>{this.state.verticalCounter}</Text>
                                </View>
                                <TouchableOpacity onPress={() => { this.verticalCounterControl('plus') }}>
                                    <View style={{ backgroundColor: 'black', width: widthToDp("10%"), borderTopRightRadius: 10, borderBottomRightRadius: 10, height: heightToDp("6.7%") }}>
                                        <Icon2
                                            name='plus'
                                            style={{ color: 'white', marginTop: heightToDp("2%"), alignSelf: 'center' }}
                                            size={25}
                                        />
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>


                    </View>
                </View>
                <TouchableOpacity onPress={() => this.submitDimensions()}>
                    <View style={{ backgroundColor: BaseColor.SecondaryColor, marginTop: heightToDp("3%"), width: widthToDp("37%"), alignSelf: 'center', height: heightToDp("5%"), borderRadius: 100 }}>
                        <Text style={{ alignSelf: 'center', fontWeight: '500', fontSize: widthToDp("5%"), fontFamily: 'Oswald-Medium' }}>{this.state.submitText}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}