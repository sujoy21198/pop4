import React, { Component } from 'react'
import { View, Image, TouchableOpacity, FlatList, Linking, ScrollView } from 'react-native'
import BaseColor from '../Core/BaseTheme'
import { Card, Text, Toast } from 'native-base'
import TopLogo from '../assets/TopLogo'
import { widthToDp, heightToDp } from '../Responsive'
import { FlatGrid, SectionGrid } from 'react-native-super-grid'
import Icon from 'react-native-vector-icons/FontAwesome'
import tts from 'react-native-tts'
import base64 from 'react-native-base64'
import axios from 'axios'
import DataAccess from '../Core/DataAccess'
import CustomIndicator from '../Core/CustomIndicator'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Languages from '../Core/Languages'
import LanguageChange from '../Core/LanguageChange'
import HeaderComponent from '../components/HeaderComponent'


export default class AllTransactionScreen extends Component {

    constructor(props) {
        super(props)
        this.state = {
            languages: [],
            moneyManagerData: [],
            textLanguageChange:'',
            allTransactionsLabel:'',
            dateLabel: '',
            incomeLabel: '',
            expenseLabel: '',
            smallGroceryLabel: '',
            goatLivestockLabel: '',
            pigLivestockLabel: '',
            poultryLivestockLabel: '',
            cropLabel: '',
            dryFishSellingLabel: '',
            vegVendingLabel: '',
            netProfitValue: 0,
            netProfitText: '',
            livestockText: '',
            healthText: '',
            agricultureText: '',
            smallBusinessText: '',
            educationText: '',
            savingText: '',
            pensionText: '',
            otherText: ''
        }
        this.state.languages = Languages
        //alert(this.state.value)
    }

    componentDidMount() {
        this.getUserData()
        this.setLanguageOnMount()
        this.loadlabelsFromStorage()
    }

    loadlabelsFromStorage = async () => {
        try {
            let username = await AsyncStorage.getItem('username')
            let user = await AsyncStorage.getItem('labelsData');
            let parsed = JSON.parse(user);
            var specificObject = parsed[0]
            var allTransactions = specificObject.labels.find((i) => i.type === 44)
            var dateLabel = specificObject.labels.find((i) => i.type === 201)
            var incomeLabel = specificObject.labels.find((i) => i.type === 37)
            var expenseLabel = specificObject.labels.find((i) => i.type === 40)
            var smallGroceryLabel = specificObject.labels.find((i) => i.type === 99)
            var goatLivestockLabel = specificObject.labels.find((i) => i.type === 208)
            var pigLivestockLabel = specificObject.labels.find((i) => i.type === 209)
            var poultryLivestockLabel = specificObject.labels.find((i) => i.type === 210)
            var cropLabel = specificObject.labels.find((i) => i.type === 28)
            var dryFishSellingLabel = specificObject.labels.find((i) => i.type === 100)
            var vegVendingLabel = specificObject.labels.find((i) => i.type === 98)
            var netProfitText = specificObject.labels.find((i) => i.type === 74)
            var livestockText = specificObject.labels.find((i) => i.type === 29)
            var healthText = specificObject.labels.find((i) => i.type === 33)
            var agricultureText = specificObject.labels.find((i) => i.type === 47)
            var smallBusinessText = specificObject.labels.find((i) => i.type === 30)
            var educationText = specificObject.labels.find((i) => i.type === 49)
            var savingText = specificObject.labels.find((i) => i.type === 50)
            var pensionText = specificObject.labels.find((i) => i.type === 51)
            var otherText = specificObject.labels.find((i) => i.type === 52)
            if (this.state.textLanguageChange === '0') {
                //this.state.allTransactionsLabel = allTransactions.nameEnglish
                this.setState({allTransactionsLabel: allTransactions.nameEnglish})
                this.setState({dateLabel: dateLabel.nameEnglish})
                this.setState({incomeLabel: incomeLabel.nameEnglish})
                this.setState({expenseLabel: expenseLabel.nameEnglish})
                this.setState({smallGroceryLabel: smallGroceryLabel.nameEnglish})
                this.setState({goatLivestockLabel: goatLivestockLabel.nameEnglish})
                this.setState({pigLivestockLabel: pigLivestockLabel.nameEnglish})
                this.setState({poultryLivestockLabel: poultryLivestockLabel.nameEnglish})
                this.setState({cropLabel: cropLabel.nameEnglish})
                this.setState({dryFishSellingLabel: dryFishSellingLabel.nameEnglish})
                this.setState({vegVendingLabel: vegVendingLabel.nameEnglish})
                this.setState({netProfitText: netProfitText.nameEnglish})
                this.setState({livestockText: livestockText.nameEnglish})
                this.setState({healthText: healthText.nameEnglish})
                this.setState({agricultureText: agricultureText.nameEnglish})
                this.setState({smallBusinessText: smallBusinessText.nameEnglish})
                this.setState({educationText: educationText.nameEnglish})
                this.setState({savingText: savingText.nameEnglish})
                this.setState({pensionText: pensionText.nameEnglish})
                this.setState({otherText: otherText.nameEnglish})
                // this.state.data[1].name = livestock.nameEnglish
                // this.state.data[2].name = smallBusiness.nameEnglish
                // this.state.data[3].name = health.nameEnglish
                // this.state.data[4].name = education.nameEnglish
                // this.state.data[5].name = loanSavings.nameEnglish
                // this.state.data[6].name = pension.nameEnglish
                // this.state.data[7].name = others.nameEnglish
                // this.setState({ moneyManagerLabel: moneyManagerLabel.nameEnglish })
                // this.setState({ expenseLabel: expenseLabel.nameEnglish })
                // this.setState({ incomeLabel: incomeLabel.nameEnglish })
                // this.setState({ allTransactionLabel: allTransactionLabel.nameEnglish })
            } else if (this.state.textLanguageChange === '1') {
                //this.state.allTransactionsLabel = allTransactions.nameHindi
                this.setState({allTransactionsLabel: allTransactions.nameHindi})
                this.setState({dateLabel: dateLabel.nameHindi})
                this.setState({incomeLabel: incomeLabel.nameHindi})
                this.setState({expenseLabel: expenseLabel.nameHindi})
                this.setState({smallGroceryLabel: smallGroceryLabel.nameHindi})
                this.setState({goatLivestockLabel: goatLivestockLabel.nameHindi})
                this.setState({pigLivestockLabel: pigLivestockLabel.nameHindi})
                this.setState({poultryLivestockLabel: poultryLivestockLabel.nameHindi})
                this.setState({cropLabel: cropLabel.nameHindi})
                this.setState({dryFishSellingLabel: dryFishSellingLabel.nameHindi})
                this.setState({vegVendingLabel: vegVendingLabel.nameHindi})
                this.setState({netProfitText: netProfitText.nameHindi})
                this.setState({livestockText: livestockText.nameHindi})
                this.setState({healthText: healthText.nameHindi})
                this.setState({agricultureText: agricultureText.nameHindi})
                this.setState({smallBusinessText: smallBusinessText.nameHindi})
                this.setState({educationText: educationText.nameHindi})
                this.setState({savingText: savingText.nameHindi})
                this.setState({pensionText: pensionText.nameHindi})
                this.setState({otherText: otherText.nameHindi})
                // this.state.data[1].name = livestock.nameHindi
                // this.state.data[2].name = smallBusiness.nameHindi
                // this.state.data[3].name = health.nameHindi
                // this.state.data[4].name = education.nameHindi
                // this.state.data[5].name = loanSavings.nameHindi
                // this.state.data[6].name = pension.nameHindi
                // this.state.data[7].name = others.nameHindi
            } else if (this.state.textLanguageChange === '2') {
                //this.state.data[0].name = allTransactions.nameHo
                this.setState({allTransactionsLabel: allTransactions.nameHo})
                this.setState({dateLabel: dateLabel.nameHo})
                this.setState({incomeLabel: incomeLabel.nameHo})
                this.setState({expenseLabel: expenseLabel.nameHo})
                this.setState({smallGroceryLabel: smallGroceryLabel.nameHo})
                this.setState({goatLivestockLabel: goatLivestockLabel.nameHo})
                this.setState({pigLivestockLabel: pigLivestockLabel.nameHo})
                this.setState({poultryLivestockLabel: poultryLivestockLabel.nameHo})
                this.setState({cropLabel: cropLabel.nameHo})
                this.setState({dryFishSellingLabel: dryFishSellingLabel.nameHo})
                this.setState({vegVendingLabel: vegVendingLabel.nameHo})
                this.setState({netProfitText: netProfitText.nameHo})
                this.setState({livestockText: livestockText.nameHo})
                this.setState({healthText: healthText.nameHo})
                this.setState({agricultureText: agricultureText.nameHo})
                this.setState({smallBusinessText: smallBusinessText.nameHo})
                this.setState({educationText: educationText.nameHo})
                this.setState({savingText: savingText.nameHo})
                this.setState({pensionText: pensionText.nameHo})
                this.setState({otherText: otherText.nameHo})
                // this.state.data[1].name = livestock.nameHo
                // this.state.data[2].name = smallBusiness.nameHo
                // this.state.data[3].name = health.nameHo
                // this.state.data[4].name = education.nameHo
                // this.state.data[5].name = loanSavings.nameHo
                // this.state.data[6].name = pension.nameHo
                // this.state.data[7].name = others.nameHo
            } else if (this.state.textLanguageChange === '3') {
                //this.state.data[0].name = allTransactions.nameOdia
                this.setState({allTransactionsLabel: allTransactions.nameOdia})
                this.setState({dateLabel: dateLabel.nameOdia})
                this.setState({incomeLabel: incomeLabel.nameOdia})
                this.setState({expenseLabel: expenseLabel.nameOdia})
                this.setState({smallGroceryLabel: smallGroceryLabel.nameOdia})
                this.setState({goatLivestockLabel: goatLivestockLabel.nameOdia})
                this.setState({pigLivestockLabel: pigLivestockLabel.nameOdia})
                this.setState({poultryLivestockLabel: poultryLivestockLabel.nameOdia})
                this.setState({cropLabel: cropLabel.nameOdia})
                this.setState({dryFishSellingLabel: dryFishSellingLabel.nameOdia})
                this.setState({vegVendingLabel: vegVendingLabel.nameOdia})
                this.setState({netProfitText: netProfitText.nameOdia})
                this.setState({livestockText: livestockText.nameOdia})
                this.setState({healthText: healthText.nameOdia})
                this.setState({agricultureText: agricultureText.nameOdia})
                this.setState({smallBusinessText: smallBusinessText.nameOdia})
                this.setState({educationText: educationText.nameOdia})
                this.setState({savingText: savingText.nameOdia})
                this.setState({pensionText: pensionText.nameOdia})
                this.setState({otherText: otherText.nameOdia})
                // this.state.data[1].name = livestock.nameOdia
                // this.state.data[2].name = smallBusiness.nameOdia
                // this.state.data[3].name = health.nameOdia
                // this.state.data[4].name = education.nameOdia
                // this.state.data[5].name = loanSavings.nameOdia
                // this.state.data[6].name = pension.nameOdia
                // this.state.data[7].name = others.nameOdia
            } else if (this.state.textLanguageChange === '4') {
                //this.state.data[0].name = allTransactions.nameSanthali
                this.setState({allTransactionsLabel: allTransactions.nameSanthali})
                this.setState({dateLabel: dateLabel.nameSanthali})
                this.setState({incomeLabel: incomeLabel.nameSanthali})
                this.setState({expenseLabel: expenseLabel.nameSanthali})
                this.setState({smallGroceryLabel: smallGroceryLabel.nameSanthali})
                this.setState({goatLivestockLabel: goatLivestockLabel.nameSanthali})
                this.setState({pigLivestockLabel: pigLivestockLabel.nameSanthali})
                this.setState({poultryLivestockLabel: poultryLivestockLabel.nameSanthali})
                this.setState({cropLabel: cropLabel.nameSanthali})
                this.setState({dryFishSellingLabel: dryFishSellingLabel.nameSanthali})
                this.setState({vegVendingLabel: vegVendingLabel.nameSanthali})
                this.setState({netProfitText: netProfitText.nameSanthali})
                this.setState({livestockText: livestockText.nameSanthali})
                this.setState({healthText: healthText.nameSanthali})
                this.setState({agricultureText: agricultureText.nameSanthali})
                this.setState({smallBusinessText: smallBusinessText.nameSanthali})
                this.setState({educationText: educationText.nameSanthali})
                this.setState({savingText: savingText.nameSanthali})
                this.setState({pensionText: pensionText.nameSanthali})
                this.setState({otherText: otherText.nameSanthali})
                // this.state.data[1].name = livestock.nameSanthali
                // this.state.data[2].name = smallBusiness.nameSanthali
                // this.state.data[3].name = health.nameSanthali
                // this.state.data[4].name = education.nameSanthali
                // this.state.data[5].name = loanSavings.nameSanthali
                // this.state.data[6].name = pension.nameSanthali
                // this.state.data[7].name = others.nameSanthali
            }
            
        } catch (error) {
            alert(error)
        }
        this.setState({ crops: specificObject.crops })
    }

    getUserData = async () => {
        let totalIncome = 0, totalExpense = 0;
        try {
            var moneyManagerData = []
            let username = await AsyncStorage.getItem('username')
            let user = await AsyncStorage.getItem('user');
            let parsed = JSON.parse(user);
            var specificObject = parsed.find((i) => i.username === username)
            moneyManagerData = specificObject.moneyManagerData;
            console.log(specificObject.moneyManagerData,"money Manager data")
            if(specificObject.moneyManagerData.length > 0) {
                specificObject.moneyManagerData.map(data => {
                    if(data.type==='Income' || data.type==='income') {
                        totalIncome += Number(data.amount);
                    } if(data.type==='Expense' || data.type==='expense') {
                        totalExpense += Number(data.amount);
                    } 
                })
            } 
        } catch (error) {
            console.log(error)
        }
        this.setState({netProfitValue: totalIncome - totalExpense})
        this.setState({ moneyManagerData: moneyManagerData })
    }


    setLanguageOnMount = async() => {
        let defaultLanguage = await AsyncStorage.getItem('language')
        if(defaultLanguage === 'en'){
            this.setState({textLanguageChange : '0'})
            this.loadlabelsFromStorage()
        }else if(defaultLanguage === 'hi'){
            this.setState({textLanguageChange : '1'})
            this.loadlabelsFromStorage()
        }else if(defaultLanguage === 'ho'){
            this.setState({textLanguageChange : '2'})
            this.loadlabelsFromStorage()
        }else if(defaultLanguage === 'od'){
            this.setState({textLanguageChange : '3'})
            this.loadlabelsFromStorage()
        }else if(defaultLanguage === 'san'){
            this.setState({textLanguageChange : '4'})
            this.loadlabelsFromStorage()
        }
    }

    languageChangeFunction = async(data) => {
        
        if(data === 'en'){
            AsyncStorage.setItem('language','en')
            this.setState({textLanguageChange : '0'})
            this.loadlabelsFromStorage()
        }else if(data === 'hi'){
            this.setState({textLanguageChange : '1'})
            AsyncStorage.setItem('language','hi')
            this.loadlabelsFromStorage()
        }else if(data === 'ho'){
            this.setState({textLanguageChange : '2'})
            AsyncStorage.setItem('language','ho')
            this.loadlabelsFromStorage()
        }else if(data === 'od'){
            this.setState({textLanguageChange : '3'})
            AsyncStorage.setItem('language','od')
            this.loadlabelsFromStorage()
        }else if(data === 'san'){
            AsyncStorage.setItem('language','san')
            this.setState({textLanguageChange : '4'})
            this.loadlabelsFromStorage()
        }
    }

    editTransactionHistory = (item, index) => {
        this.props.navigation.navigate(
            "IncomeScreen", {
                "profitType" : item.type, 
                "nameEnglish" : item.category,
                "willEdit" : true,
                "category" : 
                    item.category==="Small Grocery Shop" ? this.state.smallGroceryLabel : 
                    item.category==="Goat livestock" ? this.state.goatLivestockLabel : 
                    item.category==="Poultry livestock" ? this.state.poultryLivestockLabel : 
                    item.category==="Pig livestock" ? this.state.pigLivestockLabel : 
                    item.category==="Crops" ? this.state.cropLabel : 
                    item.category==="DryFish Selling" ? this.state.dryFishSellingLabel : (
                        item.category==="Vegetable vending" || item.category==="Vegetable Vending"
                    ) ? this.state.vegVendingLabel : item.category==="Health" ? this.state.healthText : (
                        item.category==="Live Stock" || item.category==="Livestock"
                    ) ? this.state.livestockText : 
                    item.category==="Agriculture" ? this.state.agricultureText : 
                    item.category==="Small Business" ? this.state.smallBusinessText : 
                    item.category==="Education" ? this.state.educationText : 
                    item.category==="Loan savings" ? this.state.savingText : 
                    item.category==="Pension" ? this.state.pensionText : 
                    item.category==="Others" ? this.state.otherText : item.category,
                index,
                "type": item.type,
                "amount": item.amount,
                "date": item.date,
                "isIncomeOrExpense": item.isIncomeOrExpense
            }
        )
    }

    deleteTransactionHistory = async (item, index) => {
        let localMoneyManagerData = this.state.moneyManagerData;
        localMoneyManagerData.length > 0 &&
        localMoneyManagerData.map((element, key) => {
            if(Number(key) === Number(index)) {
                localMoneyManagerData.splice(key, 1);
                if((element.type==="income" || element.type==="Income")) {
                    this.setState({netProfitValue: this.state.netProfitValue - Number(element.amount)});
                } else {
                    this.setState({netProfitValue: this.state.netProfitValue + Number(element.amount)});
                }
                
            }
        });
        let username = await AsyncStorage.getItem('username')
        let user = JSON.parse(await AsyncStorage.getItem("user"));
        let specificData = user.find((i) => i.username === username)
        
        //console.log(specificData.moneyManagerData)
        specificData.moneyManagerData = localMoneyManagerData;
        await AsyncStorage.setItem("user", JSON.stringify(user));
    }

    render() {
        var moneyManagerData = []
        moneyManagerData = this.state.moneyManagerData
        return (
            <View style={{ backgroundColor: BaseColor.BackgroundColor, flex: 1 }}>
                <HeaderComponent
                    navigation={this.props.navigation}
                />

                <View style={{ flexDirection: 'row', marginTop: heightToDp("1%"), marginLeft: widthToDp("1%") }}>
                    <TouchableOpacity onPress={() =>this.languageChangeFunction(this.state.languages[0].id)}>
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
                <Text style={{ marginLeft: widthToDp("3%"), marginTop: heightToDp("2%"), fontSize: widthToDp("7%"), fontFamily: 'Oswald-Medium' }}>{this.state.allTransactionsLabel}</Text>
                <ScrollView>
                {
                    moneyManagerData.map((i, key) => {
                        return (
                            <View style={{ backgroundColor: 'white', paddingVertical: widthToDp('5%'), alignSelf: 'center', width: widthToDp("85%"), borderRadius: 20, marginTop: heightToDp("3%"), paddingRight: widthToDp('2%'), justifyContent: 'center' }}>
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        justifyContent: 'flex-end',
                                        marginTop: widthToDp("-2%")
                                    }}
                                >
                                    {
                                        i.isIncomeOrExpense &&
                                        <TouchableOpacity
                                            onPress={() => this.editTransactionHistory(i, key)}
                                        >
                                            <Icon
                                                name="edit"
                                                size={20}
                                                color={"blue"}
                                            />
                                        </TouchableOpacity>
                                    }                                        
                                    <TouchableOpacity
                                        onPress={() => this.deleteTransactionHistory(i, key)}
                                    >
                                        <Icon
                                            name="trash"
                                            size={20}
                                            color={"#ff0000"}
                                            style={{paddingLeft: widthToDp("2%")}}
                                        />
                                    </TouchableOpacity>
                                </View>
                                <View style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    marginBottom: widthToDp('5%')
                                }}>
                                    <Text style={{ marginLeft: widthToDp("3%"), fontSize: widthToDp("4%"), fontFamily: 'Oswald-Light' }}>{this.state.dateLabel + ": " + i.date}</Text>
                                    <Text style={{ marginLeft: widthToDp("3%"), fontSize: widthToDp("4%"), fontFamily: 'Oswald-Light' }}>{(i.type==="Income" || i.type==="income") ? this.state.incomeLabel : (i.type==="Expense" || i.type==="expense") ? this.state.expenseLabel : i.type}</Text>
                                </View>                                
                                <View style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                }}>
                                    <Text style={{ marginLeft: widthToDp("3%"), fontSize: widthToDp("5%"), fontFamily: 'Oswald-Medium' }}>{i.category==="Small Grocery Shop" ? this.state.smallGroceryLabel : i.category==="Goat livestock" ? this.state.goatLivestockLabel : i.category==="Poultry livestock" ? this.state.poultryLivestockLabel : i.category==="Pig livestock" ? this.state.pigLivestockLabel : i.category==="Crops" ? this.state.cropLabel : i.category==="DryFish Selling" ? this.state.dryFishSellingLabel : (i.category==="Vegetable vending" || i.category==="Vegetable Vending") ? this.state.vegVendingLabel : i.category==="Health" ? this.state.healthText : (i.category==="Live Stock" || i.category==="Livestock") ? this.state.livestockText : i.category==="Agriculture" ? this.state.agricultureText : i.category==="Small Business" ? this.state.smallBusinessText : i.category==="Education" ? this.state.educationText : i.category==="Loan savings" ? this.state.savingText : i.category==="Pension" ? this.state.pensionText : i.category==="Others" ? this.state.otherText : i.category}</Text>
                                    <Text style={{ marginLeft: widthToDp("3%"), fontSize: widthToDp("5%"), fontFamily: 'Oswald-Medium' }}>{i.amount ? "₹ " + i.amount : ""}</Text>
                                </View>
                            </View>
                        )
                    })
                }
                <Text style={{ 
                    textAlign: 'center', 
                    marginTop: widthToDp('5%'), 
                    fontSize: widthToDp("5%"), 
                    fontFamily: 'Oswald-Medium',
                    fontWeight: 'bold',
                    color: '#000' 
                }}>
                    {this.state.netProfitText} = 
                    <Text style={{
                        fontFamily: 'Oswald-Light',
                        fontSize: widthToDp("4.5%"), 
                        fontWeight: 'bold',
                        color: '#000'
                    }}>  ₹ {this.state.netProfitValue}</Text>
                </Text>
                <View style={{margin:20}}></View>
                </ScrollView>
                

            </View>
        );
    }
}