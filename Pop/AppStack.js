import 'react-native-gesture-handler';
import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Text, View } from 'react-native';
import LanguageScreen from './Pages/LanguageScreen'
import RegistrationScreen from './Pages/RegistrationScreen'
import SigninScreen from './Pages/SigninScreen'
import DashBoardScreen from './Pages/DashBoardScreen'
import NotificationsScreen from './Pages/NotificationsScreen'
import NotificationDetailsScreen from './Pages/NotificationDetailsScreen'
import KnowledgeCenterScreen from './Pages/KnowledgeCenterScreen'
import CropsScreen from './Pages/CropsScreen'
import LandTypeScreen from './Pages/LandTypeScreen'
import AnalysisScreen from './Pages/AnalysisScreen'
import StepOneScreen from './Pages/StepOneScreen'
import StepTwoScreen from './Pages/StepTwoScreen'
import StepThreeScreen from './Pages/StepThreeScreen'
import StepFourScreen from './Pages/StepFourScreen'
import StepFiveScreen from './Pages/StepFiveScreen'
import StepSixScreen from './Pages/StepSixScreen'
import StepSevenScreen from './Pages/StepSevenScreen'
import StepEightScreen from './Pages/StepEightScreen'
import ActualCultivationCostScreen from './Pages/ActualCultivationCostScreen'
import CostBenifitAnalysisScreen from './Pages/CostBenifitAnalysisScreen'
import LiveStockScreen from './Pages/LiveStockScreen'
import IncomeScreen from './Pages/IncomeScreen'
import GeneralSettingsScreen from './Pages/GeneralSettingsScreen'
import BreedScreen from './Pages/BreedScreen'
import SelectFarmingAreaScreen from './Pages/SelectFarmingAreaScreen'
import ImportantLinksSubCategoryScreen from './Pages/ImportantLinksSubCategoryScreen'
import ImportantLinksScreen from './Pages/ImportantLinksScreen'
import BreedDescriptionScreen from './Pages/BreedDescriptionScreen'
import PatchScreen from './Pages/PatchScreen'
import LiveStockEnterQuantityScreen from './Pages/LiveStockEnterQuantityScreen'
import LiveStockExpectedProfitAnalysisScreen from './Pages/LiveStockExpectedProfitAnalysisScreen'
import ImportantLinksDetailsScreen from './Pages/ImportantLinksDetailsScreen'
import NutritionGardenScreen from './Pages/NutritionGardenScreen'
import NutritionGardenDetailsScreen from './Pages/NutritionGardenDetailsScreen'
import LiveStockStepTwoScreen from './Pages/LiveStockStepTwoScreen'
import LiveStockStepThreeScreen from './Pages/LiveStockStepThreeScreen'
import BreedNewScreen from './Pages/BreedNewScreen'
import LivestockTableScreen from './Pages/LivestockTableScreen'
import PigTableScreen from './Pages/PigTableScreen'
import PultryTableScreen from './Pages/PultryTableScreen'
import ContactScreen from './Pages/ContactScreen'
import SmallBusinessScreen from './Pages/SmallBusinessScreen'
import VaccinationScreen from './Pages/VaccinationScreen'
import DryFishScreen from './Pages/DryFishScreen'
import VegetableVendingScreen from './Pages/VegetableVendingScreen'
import SmallGroceryShopScreen from './Pages/SmallGroceryShopScreen'
import DryFishSellingFirstTable from './Pages/DryFishSellingFirstTable'
import DryFishSellingSecondTableScreen from './Pages/DryFishSellingSecondTableScreen'
import VegetableVendingFirstTableScreen from './Pages/VegetableVendingFirstTableScreen'
import VegetableVendingSecondTableScreen from './Pages/VegetableVendingSecondTableScreen'
import SmallGroceryShopFirstTableScreen from './Pages/SmallGroceryShopFirstTableScreen'
import SmallGroceryShopSecondTableScreen from './Pages/SmallGroceryShopSecondTableScreen'
import MoneyManagerScreen from './Pages/MoneyManagerScreen'
import AllTransactionScreen from './Pages/AllTransactionScreen'
import MoneyManagerCategoriesScreen from './Pages/MoneyManagerCategoriesScreen'
import DynamicLivestockScreen from './Pages/DynamicLivestockScreen'
import ForgetPasswordScreen from './Pages/ForgetPasswordScreen'
import SmallBusinessDetailsScreen from './Pages/SmallBusinessDetailsScreen'
import EditProfile from './Pages/EditProfile';
import MessageScreen from './Pages/MessageScreen'
import VerifyOtpScreen from './Pages/VerifyOtpScreen'
import ResetPasswordScreen from './Pages/ResetPasswordScreen'

const Stack = createStackNavigator();

function AppStack(){
    return(
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="LanguageScreen" component={LanguageScreen} options={{ headerShown: false }}/>
                <Stack.Screen name="RegistrationScreen" component={RegistrationScreen} options={{ headerShown: false }}/>
                <Stack.Screen name="SigninScreen" component={SigninScreen} options={{ headerShown: false }}/>
                <Stack.Screen name="DashBoardScreen" component={DashBoardScreen} options={{ headerShown: false }}/>
                <Stack.Screen name="NotificationsScreen" component={NotificationsScreen} options={{ headerShown: false }}/>
                <Stack.Screen name="NotificationDetailsScreen" component={NotificationDetailsScreen} options={{ headerShown: false }}/>
                <Stack.Screen name="KnowledgeCenterScreen" component={KnowledgeCenterScreen} options={{ headerShown: false }}/>
                <Stack.Screen name="CropsScreen" component={CropsScreen} options={{ headerShown: false }}/>
                <Stack.Screen name="LandTypeScreen" component={LandTypeScreen} options={{ headerShown: false }}/>
                <Stack.Screen name="AnalysisScreen" component={AnalysisScreen} options={{ headerShown: false }}/>
                <Stack.Screen name="StepOneScreen" component={StepOneScreen} options={{ headerShown: false }}/>
                <Stack.Screen name="StepTwoScreen" component={StepTwoScreen} options={{ headerShown: false }}/>
                <Stack.Screen name="StepThreeScreen" component={StepThreeScreen} options={{ headerShown: false }}/>
                <Stack.Screen name="StepFourScreen" component={StepFourScreen} options={{ headerShown: false }}/>
                <Stack.Screen name="StepFiveScreen" component={StepFiveScreen} options={{ headerShown: false }}/>
                <Stack.Screen name="StepSixScreen" component={StepSixScreen} options={{ headerShown: false }}/>
                <Stack.Screen name="StepSevenScreen" component={StepSevenScreen} options={{ headerShown: false }}/>
                <Stack.Screen name="StepEightScreen" component={StepEightScreen} options={{ headerShown: false }}/>
                <Stack.Screen name="ActualCultivationCostScreen" component={ActualCultivationCostScreen} options={{ headerShown: false }} />
                <Stack.Screen name="CostBenifitAnalysisScreen" component={CostBenifitAnalysisScreen} options={{ headerShown: false }}/>
                <Stack.Screen name="LiveStockScreen" component={LiveStockScreen} options={{ headerShown: false }}/>
                <Stack.Screen name="IncomeScreen" component={IncomeScreen} options={{ headerShown: false }}/>
                <Stack.Screen name="GeneralSettingsScreen" component={GeneralSettingsScreen} options={{ headerShown: false }}/>
                <Stack.Screen name="BreedScreen" component={BreedScreen} options={{ headerShown: false }}/>
                <Stack.Screen name="SelectFarmingAreaScreen" component={SelectFarmingAreaScreen} options={{ headerShown: false }}/>
                <Stack.Screen name="ImportantLinksScreen" component={ImportantLinksScreen} options={{ headerShown: false }}/>
                <Stack.Screen name="ImportantLinksSubCategoryScreen" component={ImportantLinksSubCategoryScreen} options={{ headerShown: false }}/>
                <Stack.Screen name="BreedDescriptionScreen" component={BreedDescriptionScreen} options={{ headerShown: false }}/>
                <Stack.Screen name="PatchScreen" component={PatchScreen} options={{ headerShown: false }}/>
                <Stack.Screen name="LiveStockEnterQuantityScreen" component={LiveStockEnterQuantityScreen} options={{ headerShown: false }}/>
                <Stack.Screen name="LiveStockExpectedProfitAnalysisScreen" component={LiveStockExpectedProfitAnalysisScreen} options={{ headerShown: false }}/>
                <Stack.Screen name="ImportantLinksDetailsScreen" component={ImportantLinksDetailsScreen} options={{ headerShown: false }}/>
                <Stack.Screen name="NutritionGardenScreen" component={NutritionGardenScreen} options={{ headerShown: false }}/>
                <Stack.Screen name="NutritionGardenDetailsScreen" component={NutritionGardenDetailsScreen} options={{ headerShown: false }}/>
                <Stack.Screen name="LiveStockStepTwoScreen" component={LiveStockStepTwoScreen} options={{ headerShown: false }}/>
                <Stack.Screen name="LiveStockStepThreeScreen" component={LiveStockStepThreeScreen} options={{ headerShown: false }}/>
                <Stack.Screen name="BreedNewScreen" component={BreedNewScreen} options={{ headerShown: false }}/>
                <Stack.Screen name="LivestockTableScreen" component={LivestockTableScreen} options={{ headerShown: false }}/>
                <Stack.Screen name="PigTableScreen" component={PigTableScreen} options={{ headerShown: false }}/>
                <Stack.Screen name="PultryTableScreen" component={PultryTableScreen} options={{ headerShown: false }}/>
                <Stack.Screen name="ContactScreen" component={ContactScreen} options={{ headerShown: false }}/>
                <Stack.Screen name="SmallBusinessScreen" component={SmallBusinessScreen} options={{ headerShown: false }}/>
                <Stack.Screen name="VaccinationScreen" component={VaccinationScreen} options={{ headerShown: false }}/>
                <Stack.Screen name="DryFishScreen" component={DryFishScreen} options={{ headerShown: false }}/>
                <Stack.Screen name="VegetableVendingScreen" component={VegetableVendingScreen} options={{ headerShown: false }}/>
                <Stack.Screen name="SmallGroceryShopScreen" component={SmallGroceryShopScreen} options={{ headerShown: false }}/>
                <Stack.Screen name="DryFishSellingFirstTable" component={DryFishSellingFirstTable} options={{ headerShown: false }}/>
                <Stack.Screen name="DryFishSellingSecondTableScreen" component={DryFishSellingSecondTableScreen} options={{ headerShown: false }}/>
                <Stack.Screen name="VegetableVendingFirstTableScreen" component={VegetableVendingFirstTableScreen} options={{ headerShown: false }}/>
                <Stack.Screen name="VegetableVendingSecondTableScreen" component={VegetableVendingSecondTableScreen} options={{ headerShown: false }}/>
                <Stack.Screen name="SmallGroceryShopFirstTableScreen" component={SmallGroceryShopFirstTableScreen} options={{ headerShown: false }}/>
                <Stack.Screen name="SmallGroceryShopSecondTableScreen" component={SmallGroceryShopSecondTableScreen} options={{ headerShown: false }}/>
                <Stack.Screen name="MoneyManagerScreen" component={MoneyManagerScreen} options={{ headerShown: false }}/>
                <Stack.Screen name="AllTransactionScreen" component={AllTransactionScreen} options={{ headerShown: false }}/>
                <Stack.Screen name="MoneyManagerCategoriesScreen" component={MoneyManagerCategoriesScreen} options={{ headerShown: false }}/>
                <Stack.Screen name="DynamicLivestockScreen" component={DynamicLivestockScreen} options={{ headerShown: false }} />
                <Stack.Screen name="ForgetPasswordScreen" component={ForgetPasswordScreen} options={{headerShown:false}}/>
                <Stack.Screen name="SmallBusinessDetailsScreen" component={SmallBusinessDetailsScreen} options={{headerShown:false}}/>
                <Stack.Screen name="EditProfile" component={EditProfile} options={{headerShown: false}}/>
                <Stack.Screen name = 'MessageScreen' component={MessageScreen} options= {{headerShown: false}}/>
                <Stack.Screen name="VerifyOtpScreen" component={VerifyOtpScreen} options={{headerShown: false}}/>
                <Stack.Screen name="ResetPasswordScreen" component={ResetPasswordScreen} options={{headerShown: false}}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default AppStack;