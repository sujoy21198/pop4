import React, { Component } from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import BaseColor from '../Core/BaseTheme'
import { Card, Text } from 'native-base'
import TopLogo from '../assets/TopLogo'
import { widthToDp, heightToDp } from '../Responsive'
import FloatingLabel from 'react-native-floating-labels'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Icon from 'react-native-vector-icons/FontAwesome'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Languages from '../Core/Languages'
import HeaderComponent from '../components/HeaderComponent'


export default class ActualCultivationCost extends Component {

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
            stepsSum: '',
            actualCultivationCostLabel: '',
            languages: '',
            productionInKgLabel: '',
            sellingPriceLabel: '',
            expenseLabel: '',
            submitLabel: ''
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
        this.state.languages = Languages
    }

    componentDidMount() {
        this.getSumOfSteps()
        this.setLanguageOnMount()
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

    loadlabelsFromStorage = async () => {
        try {
            let username = await AsyncStorage.getItem('username')
            let user = await AsyncStorage.getItem('labelsData');
            let parsed = JSON.parse(user);
            var specificObject = parsed.find((i) => i.username === username)
            var submitLabel = specificObject.labels.find((i) => i.type === 61)
            var actualCultivationCostLabel = specificObject.labels.find((i) => i.type === 80)
            var productionInKgLabel = specificObject.labels.find((i) => i.type === 81)
            var sellingPriceLabel = specificObject.labels.find((i) => i.type === 82)
            var expenseLabel = specificObject.labels.find((i) => i.type === 83)
            if (this.state.textLanguageChange === '0') {
                this.setState({ 
                    actualCultivationCostLabel: actualCultivationCostLabel.nameEnglish,
                    productionInKgLabel: productionInKgLabel.nameEnglish,
                    sellingPriceLabel: sellingPriceLabel.nameEnglish,
                    expenseLabel: expenseLabel.nameEnglish,
                    submitLabel: submitLabel.nameEnglish,
                })
            } else if (this.state.textLanguageChange === '1') {
                this.setState({ 
                    actualCultivationCostLabel: actualCultivationCostLabel.nameHindi,
                    productionInKgLabel: productionInKgLabel.nameHindi,
                    sellingPriceLabel: sellingPriceLabel.nameHindi,
                    expenseLabel: expenseLabel.nameHindi,
                    submitLabel: submitLabel.nameHindi,
                })
            } else if (this.state.textLanguageChange === '2') {
                this.setState({ 
                    actualCultivationCostLabel: actualCultivationCostLabel.nameHo,
                    productionInKgLabel: productionInKgLabel.nameHo,
                    sellingPriceLabel: sellingPriceLabel.nameHo,
                    expenseLabel: expenseLabel.nameHo,
                    submitLabel: submitLabel.nameHo,
                })
            } else if (this.state.textLanguageChange === '3') {
                this.setState({ 
                    actualCultivationCostLabel: actualCultivationCostLabel.nameOdia,
                    productionInKgLabel: productionInKgLabel.nameOdia,
                    sellingPriceLabel: sellingPriceLabel.nameOdia,
                    expenseLabel: expenseLabel.nameOdia,
                    submitLabel: submitLabel.nameOdia,
                })
            } else if (this.state.textLanguageChange === '4') {
                this.setState({ 
                    actualCultivationCostLabel: actualCultivationCostLabel.nameSanthali,
                    productionInKgLabel: productionInKgLabel.nameSanthali,
                    sellingPriceLabel: sellingPriceLabel.nameSanthali,
                    expenseLabel: expenseLabel.nameSanthali,
                    submitLabel: submitLabel.nameSanthali,
                })
            }

        } catch (error) {
            alert(error)
        }
        this.setState({ crops: specificObject.crops })
    }

    getSumOfSteps = async () => {
        try {
            var sum = 0
            let username = await AsyncStorage.getItem('username')
            let user = await AsyncStorage.getItem('user')
            let parsed = JSON.parse(user)
            var specific = parsed.find((i) => i.username === username)
            var specificPatch = specific.patch.find((i) => i.patchName === this.state.patchName)
            var step1 = Number.isNaN(parseInt(specificPatch.step1)) ? 0 : specificPatch.step1
            var step2 = Number.isNaN(parseInt(specificPatch.step2)) ? 0 : specificPatch.step2
            var step3 = Number.isNaN(parseInt(specificPatch.step3)) ? 0 : specificPatch.step3
            var step4 = Number.isNaN(parseInt(specificPatch.step4)) ? 0 : specificPatch.step4
            var step5 = Number.isNaN(parseInt(specificPatch.step5)) ? 0 : specificPatch.step5
            var step6 = Number.isNaN(parseInt(specificPatch.step6)) ? 0 : specificPatch.step6
            var step7 = Number.isNaN(parseInt(specificPatch.step7)) ? 0 : specificPatch.step7
            var step8 = Number.isNaN(parseInt(specificPatch.step8)) ? 0 : specificPatch.step8
            sum = parseInt(step1) + parseInt(step2) + parseInt(step3) + parseInt(step4) + parseInt(step5) + parseInt(step6) + parseInt(step7) + parseInt(step8)
            this.setState({ stepsSum: sum })
            console.log(this.state.stepsSum)
            console.log(specificPatch)
        } catch (error) {
            console.log(error, "ActualCultCostScreen")
        }
    }

    test = (data) => {
        this.state.actualCulCostScreenCostPerKg = data
        //alert(this.state.actualCulCostScreenCostPerKg)
    }

    calculation = (data) => {
        var total = parseInt(data) + Number.parseInt(this.state.stepsSum)
        this.state.actualCulCostScreenTotalExpense = total
        console.log(this.state.actualCulCostScreenTotalExpense)
    }

    nextScreen = () => {
        this.state.actualCulCostScreenTotalExpense = this.state.stepsSum
        //alert(Number.parseInt(this.state.actualCulCostScreenCostPerKg))
        this.props.navigation.navigate({
            name: 'CostBenifitAnalysisScreen',
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
                netProfit: this.state.netProfit,
                actualCulCostScreenProductionInKg: this.state.actualCulCostScreenProductionInKg,
                actualCulCostScreenCostPerKg: this.state.actualCulCostScreenCostPerKg,
                actualCulCostScreenTotalExpense: this.state.actualCulCostScreenTotalExpense
            }
        })
    }
    render() {
        return (
            <KeyboardAwareScrollView style={{ backgroundColor: BaseColor.BackgroundColor, flex: 1 }}>
                <View >
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
                    <Text style={{ fontSize: widthToDp("6%"), marginLeft: widthToDp("3%"), marginTop: heightToDp("1%"), fontFamily: 'Oswald-Medium' }}>{this.state.actualCultivationCostLabel}</Text>

                    <View style={{ backgroundColor: 'white', height: heightToDp("50%"), width: widthToDp("95%"), alignSelf: 'center', marginTop: heightToDp("3%"), borderRadius: 10 }}>
                        <Text style={{ fontFamily: 'Oswald-Light', marginLeft: widthToDp("2%"), marginTop: heightToDp("1%") }}>{this.state.productionInKgLabel}</Text>
                        <View style={{ marginTop: heightToDp("2.5%"), marginLeft: widthToDp("1%") }}>
                            <FloatingLabel
                                labelStyle={styles.labelInput}
                                inputStyle={styles.input}
                                style={styles.formInput}
                                keyboardType='numeric'
                                onChangeText={(text) => { this.setState({ actualCulCostScreenProductionInKg: text }) }}
                            // onBlur={this.onBlur}
                            >KG</FloatingLabel>
                        </View>

                        <Text style={{ fontFamily: 'Oswald-Light', marginLeft: widthToDp("2%"), marginTop: heightToDp("1%") }}>{this.state.sellingPriceLabel}</Text>
                        <View style={{ marginTop: heightToDp("2.5%"), marginLeft: widthToDp("1%") }}>
                            <FloatingLabel
                                labelStyle={styles.labelInput}
                                inputStyle={styles.input}
                                style={styles.formInput}
                                keyboardType='numeric'
                                onChangeText={(text) => { this.test(text) }}
                            // onBlur={this.onBlur}
                            >₹</FloatingLabel>
                        </View>

                        <Text style={{ fontFamily: 'Oswald-Light', marginLeft: widthToDp("2%"), marginTop: heightToDp("1%") }}>{this.state.expenseLabel}</Text>
                        <View style={{ marginTop: heightToDp("2%"), marginLeft: widthToDp("1%") }}>
                            {/* <FloatingLabel
                                labelStyle={styles.labelInput}
                                inputStyle={styles.input}
                                style={styles.formInput}
                                keyboardType='numeric'
                                onChangeText={(text) => { this.calculation(text) }}
                            // onBlur={this.onBlur}
                            >₹ {this.state.stepsSum}</FloatingLabel> */}
                            <Text style={{
                                color: '#000',
                                fontSize: widthToDp("4.6%"),
                                fontFamily: 'Oswald-Medium',
                                marginLeft: widthToDp("3%")
                            }}>₹ {this.state.stepsSum}</Text>
                            <View style={{ borderBottomColor: 'black', borderBottomWidth: 1, marginTop: heightToDp('1.5%'), width: widthToDp("92%") }}></View>
                        </View>

                    </View>

                    <View style={{ height: heightToDp("10%") }}>
                        <TouchableOpacity onPress={() => { this.nextScreen() }}>
                            <View style={{ backgroundColor: "#fff", height: heightToDp("6%"), width: widthToDp("30%"), borderRadius: 100, alignSelf: 'center', marginTop: heightToDp("2%") }}>
                                <Text style={{ fontSize: widthToDp("4%"), color: "#000", marginTop: heightToDp("1.4%"), alignSelf: 'center', fontFamily: 'Oswald-Medium' }}>{this.state.submitLabel}</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
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
        width: widthToDp("90%"),
        alignSelf: 'center'
    },
    input: {
        borderWidth: 0,
        height: heightToDp("6%"),
        fontSize: widthToDp("5%"),
        fontFamily: 'Oswald-Light'
    }
});
