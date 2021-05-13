import React, { Component } from 'react'
import { View, TouchableOpacity, StyleSheet, ScrollView } from 'react-native'
import { Text, Toast } from 'native-base'
import { heightToDp, widthToDp } from '../Responsive'
import BaseColor from '../Core/BaseTheme'
import Logo from '../assets/Logo'
import Icon from 'react-native-vector-icons/AntDesign'
import FloatingLabel from 'react-native-floating-labels'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import RBSheet from "react-native-raw-bottom-sheet"
import axios from 'axios'
import DataAccess from '../Core/DataAccess'
import CustomIndicator from '../Core/CustomIndicator'
import AsyncStorage from '@react-native-async-storage/async-storage'
import LanguageChange from '../Core/LanguageChange'
import DeviceInfo from 'react-native-device-info'
import NetInfo from '@react-native-community/netinfo'
import base64 from 'react-native-base64'
import RNFetchBlob from 'rn-fetch-blob'
import RNFS, { exists } from 'react-native-fs'


export default class SigninScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            phoneNumber: '',
            username: '',
            password: '',
            isLoading: false,
            selectedLanguage: '',
            loadPhoneNumber: false,
            cropScreenImages: [],
            cropStepImages: [],
            cropMaterialImages: [],
            livestockScreenImages: [],
            liveStockStepImages: [],
            breedScreenImages: [],
            importantLinksScreen: [],
            nutritionGardenImages: [],
            smallBusinessImages: [],
            labels: [],
            imageloaded: true,
            imageLoading: true,
            staticImages: []
        }

        this.state.selectedLanguage = this.props.route.params.selectedLanguage
        //alert(this.state.languageCode)
    }

    componentDidMount() {
        this.checkConnectionForCustodian()
        //this.setCustodianNumber()

        //this.getAllData()
        this.downloadImagesForOffline()
        //this.chechStorage()
    }

    // chechStorage = async() => {
    //     try {
    //         let value = await AsyncStorage.getItem('offlineData');
    //         if (value != null){
    //            alert("huah")
    //         }
    //         else {
    //            alert("yippy")
    //        }
    //      } catch (error) {
    //        // Error retrieving data
    //      }
    // }


    checkConnectionForCustodian = async () => {
        let custodianNumber = await AsyncStorage.getItem('cus')
        NetInfo.fetch().then(state => {
            var isConnected = state.isConnected
            console.log(isConnected)
            if (isConnected === true) {
                return this.getCustodianMobileNumber()
            } else {
                var test = custodianNumber.replace(/\"/g, "")
                this.setState({ phoneNumber: test })
                //alert(custodianNumber)
            }
        })
    }

    downloadImagesForOffline = async () => {
        var cropScreenImageArray = [];
        var cropStepImagesArray = []
        var cropMaterialImagesArray = []
        var livestockScreenImagesArray = []
        var liveStockStepImagesArray = []
        var breedScreenImagesArray = []
        var importantLinksScreenArray = []
        var nutritionGardenImagesArray = []
        var smallBusinessImagesArray = []
        var labelArray = []
        var staticImagesArray = []


        await axios.get(DataAccess.BaseUrl + DataAccess.AccessUrl + 'files', {
        }).then(function (response) {
            //console.log(response.data.data)
            var crop = response.data.data.find((i) => i.name === 'crop')
            var cropStep = response.data.data.find((i) => i.name === 'cropStep')
            var cropMaterial = response.data.data.find((i) => i.name === 'cropMaterial')
            var livestock = response.data.data.find((i) => i.name === 'livestock')
            var livestockStep = response.data.data.find((i) => i.name === 'livestockStep')
            var breed = response.data.data.find((i) => i.name === 'breed')
            var importantLink = response.data.data.find((i) => i.name === 'importantLink')
            var nutritionGarden = response.data.data.find((i) => i.name === 'nutritionGarden')
            var smallBusiness = response.data.data.find((i) => i.name === 'smallBusiness')
            var label = response.data.data.find((i) => i.name === 'label')
            var staticImages = response.data.data.find((i) => i.name === 'staticImages')
            cropScreenImageArray = crop.fileNames
            cropStepImagesArray = cropStep.fileNames
            cropMaterialImagesArray = cropMaterial.fileNames
            livestockScreenImagesArray = livestock.fileNames
            liveStockStepImagesArray = livestockStep.fileNames
            breedScreenImagesArray = breed.fileNames
            importantLinksScreenArray = importantLink.fileNames
            nutritionGardenImagesArray = nutritionGarden.fileNames
            smallBusinessImagesArray = smallBusiness.fileNames
            labelArray = label.fileNames
            staticImagesArray = staticImages.fileNames

            //totalImages = cropScreenImageArray.concat(cropStepImagesArray, cropMaterialImagesArray, livestockScreenImagesArray,liveStockStepImagesArray,breedScreenImagesArray,importantLinksScreenArray,nutritionGardenImagesArray,smallBusinessImagesArray)
            //console.log(cropScreenImageArray)
        }).catch(function (error) {
            console.log(error)
        })

        //console.log(cropScreenImageArray)

        //1
        var NewFile = []
        for (var i = 0; i < cropScreenImageArray.length; i++) {
            const checkImage = await RNFS.exists('file:///storage/emulated/0/Pictures/Pop/image_' + cropScreenImageArray[i])

            if (!checkImage) {
                NewFile.push(cropScreenImageArray[i])
                //console.log(cropScreenImageArray[i])
                //console.log(NewFile," AAAAWWWWOOOOOOOOW")

            } else {
                console.log("file exists")
            }
        }
        cropScreenImageArray = NewFile
        console.log(cropScreenImageArray, "hasta la vista")
        //2
        var NewFile = []
        for (var i = 0; i < cropStepImagesArray.length; i++) {
            const checkImage = await RNFS.exists('file:///storage/emulated/0/Pictures/Pop/image_' + cropStepImagesArray[i])

            if (!checkImage) {
                NewFile.push(cropStepImagesArray[i])
                //console.log(cropScreenImageArray[i])
                console.log(NewFile)

            } else {
                console.log("file exists")
            }
        }
        cropStepImagesArray = NewFile
        console.log(cropStepImagesArray, "hasta la vista")
        //3
        var NewFile = []
        for (var i = 0; i < cropMaterialImagesArray.length; i++) {
            const checkImage = await RNFS.exists('file:///storage/emulated/0/Pictures/Pop/image_' + cropMaterialImagesArray[i])

            if (!checkImage) {
                NewFile.push(cropMaterialImagesArray[i])
                //console.log(cropScreenImageArray[i])
                console.log(NewFile)

            } else {
                console.log("file exists")
            }
        }
        cropMaterialImagesArray = NewFile
        console.log(cropMaterialImagesArray, "hasta la vista")
        //4
        var NewFile = []
        for (var i = 0; i < livestockScreenImagesArray.length; i++) {
            const checkImage = await RNFS.exists('file:///storage/emulated/0/Pictures/Pop/image_' + livestockScreenImagesArray[i])

            if (!checkImage) {
                NewFile.push(livestockScreenImagesArray[i])
                //console.log(cropScreenImageArray[i])
                console.log(NewFile)

            } else {
                console.log("file exists")
            }
        }
        livestockScreenImagesArray = NewFile
        console.log(livestockScreenImagesArray, "hasta la vista")
        //5
        var NewFile = []
        for (var i = 0; i < liveStockStepImagesArray.length; i++) {
            const checkImage = await RNFS.exists('file:///storage/emulated/0/Pictures/Pop/image_' + liveStockStepImagesArray[i])

            if (!checkImage) {
                NewFile.push(liveStockStepImagesArray[i])
                //console.log(cropScreenImageArray[i])
                console.log(NewFile)

            } else {
                console.log("file exists")
            }
        }
        liveStockStepImagesArray = NewFile
        console.log(liveStockStepImagesArray, "hasta la vista")
        //6
        var NewFile = []
        for (var i = 0; i < breedScreenImagesArray.length; i++) {
            const checkImage = await RNFS.exists('file:///storage/emulated/0/Pictures/Pop/image_' + breedScreenImagesArray[i])

            if (!checkImage) {
                NewFile.push(breedScreenImagesArray[i])
                //console.log(cropScreenImageArray[i])
                console.log(NewFile)

            } else {
                console.log("file exists")
            }
        }
        breedScreenImagesArray = NewFile
        console.log(breedScreenImagesArray, "hasta la vista")
        //7
        var NewFile = []
        for (var i = 0; i < importantLinksScreenArray.length; i++) {
            const checkImage = await RNFS.exists('file:///storage/emulated/0/Pictures/Pop/image_' + importantLinksScreenArray[i])

            if (!checkImage) {
                NewFile.push(importantLinksScreenArray[i])
                //console.log(cropScreenImageArray[i])
                console.log(NewFile)

            } else {
                console.log("file exists")
            }
        }
        importantLinksScreenArray = NewFile
        console.log(importantLinksScreenArray, "hasta la vista")
        //8
        var NewFile = []
        for (var i = 0; i < nutritionGardenImagesArray.length; i++) {
            const checkImage = await RNFS.exists('file:///storage/emulated/0/Pictures/Pop/image_' + nutritionGardenImagesArray[i])

            if (!checkImage) {
                NewFile.push(nutritionGardenImagesArray[i])
                //console.log(cropScreenImageArray[i])
                console.log(NewFile)

            } else {
                console.log("file exists")
            }
        }
        nutritionGardenImagesArray = NewFile
        console.log(nutritionGardenImagesArray, "hasta la vista")
        //9
        var NewFile = []
        for (var i = 0; i < smallBusinessImagesArray.length; i++) {
            const checkImage = await RNFS.exists('file:///storage/emulated/0/Pictures/Pop/image_' + smallBusinessImagesArray[i])

            if (!checkImage) {
                NewFile.push(smallBusinessImagesArray[i])
                //console.log(cropScreenImageArray[i])
                console.log(NewFile)

            } else {
                console.log("file exists")
            }
        }
        smallBusinessImagesArray = NewFile
        console.log(smallBusinessImagesArray, "hasta la vista")
        //10
        var NewFile = []
        for (var i = 0; i < labelArray.length; i++) {
            const checkImage = await RNFS.exists('file:///storage/emulated/0/Pictures/Pop/image_' + labelArray[i])

            if (!checkImage) {
                NewFile.push(labelArray[i])
                //console.log(cropScreenImageArray[i])
                console.log(NewFile)

            } else {
                console.log("file exists")
            }
        }
        labelArray = NewFile
        console.log(labelArray, "hasta la vista")


        //11
        var NewFile = []
        for (var i = 0; i < staticImagesArray.length; i++) {
            const checkImage = await RNFS.exists('file:///storage/emulated/0/Pictures/Pop/image_' + staticImagesArray[i])

            if (!checkImage) {
                NewFile.push(staticImagesArray[i])
                //console.log(cropScreenImageArray[i])
                console.log(NewFile)

            } else {
                console.log("file exists")
            }
        }
        staticImagesArray = NewFile
        console.log(labelArray, "hasta la vista static")

        this.setState({ cropScreenImages: cropScreenImageArray })
        this.setState({ cropStepImages: cropStepImagesArray })
        this.setState({ cropMaterialImages: cropMaterialImagesArray })
        this.setState({ livestockScreenImages: livestockScreenImagesArray })
        this.setState({ liveStockStepImages: liveStockStepImagesArray })
        this.setState({ breedScreenImages: breedScreenImagesArray })
        this.setState({ importantLinksScreen: importantLinksScreenArray })
        this.setState({ nutritionGardenImages: nutritionGardenImagesArray })
        this.setState({ smallBusinessImages: smallBusinessImagesArray })
        this.setState({ labels: labelArray })
        this.setState({ staticImages: staticImagesArray })
        //console.log(this.state.cropScreenImages,"hi")
        this.getCropImage()
    }


    //1
    getCropImage = () => {
        var cropImages = []
        var fileNames = []
        var imageUrls = []
        var ext = []
        cropImages = this.state.cropScreenImages
        //alert(cropImages.length)
        for (var i = 0; i < cropImages.length; i++) {
            var names = cropImages[i]
            var editedNames = names.substr(0, names.indexOf('.'))
            var extNames = names.substr(names.indexOf('.') + 1)
            console.log(ext)
            console.log(editedNames)
            fileNames.push(editedNames)
            ext.push(extNames)
            imageUrls.push("https://tupop.in/app-property/uploads/crops/" + cropImages[i])
        }

        for (var i = 0; i < imageUrls.length; i++) {
            const { config, fs } = RNFetchBlob;
            let PictureDir = fs.dirs.PictureDir + "/" + "pop";
            let options = {
                fileCache: true,
                addAndroidDownloads: {
                    useDownloadManager: true,
                    notification: false,
                    path:
                        PictureDir +  
                        '/image_' +
                        fileNames[i] + '.' +
                        ext[i],
                    description: 'Image',
                }
            };
            config(options)
                .fetch('GET', imageUrls[i])
                .then(res => {
                    // Showing alert after successful downloading
                    console.log('res -> ', JSON.stringify(res));
                    // alert('Image Downloaded Successfully.');
                });
        }
        console.log(fileNames)
        console.log(imageUrls)
        this.getCropStepImages()
    }

    //2
    getCropStepImages = () => {
        var cropImages = []
        var fileNames = []
        var imageUrls = []
        var ext = []
        cropImages = this.state.cropStepImages
        //alert(cropImages.length)
        for (var i = 0; i < cropImages.length; i++) {
            var names = cropImages[i]
            var editedNames = names.substr(0, names.indexOf('.'))
            var extNames = names.substr(names.indexOf('.') + 1)
            console.log(ext)
            console.log(editedNames)
            fileNames.push(editedNames)
            ext.push(extNames)
            imageUrls.push("https://tupop.in/app-property/uploads/crops/steps/" + cropImages[i])
        }

        for (var i = 0; i < imageUrls.length; i++) {
            const { config, fs } = RNFetchBlob;
            let PictureDir = fs.dirs.PictureDir + "/" + "pop";
            let options = {
                fileCache: true,
                addAndroidDownloads: {
                    useDownloadManager: true,
                    notification: false,
                    path:
                        PictureDir +  
                        '/image_' +
                        fileNames[i] + '.' +
                        ext[i],
                    description: 'Image',
                }
            };
            config(options)
                .fetch('GET', imageUrls[i])
                .then(res => {
                    // Showing alert after successful downloading
                    console.log('res -> ', JSON.stringify(res));
                    // alert('Image Downloaded Successfully.');
                });
        }
        console.log(fileNames)
        console.log(imageUrls)
        this.getcropMaterial()
    }


    //3
    getcropMaterial = () => {
        var cropImages = []
        var fileNames = []
        var imageUrls = []
        var ext = []
        cropImages = this.state.cropMaterialImages
        //alert(cropImages.length)
        for (var i = 0; i < cropImages.length; i++) {
            var names = cropImages[i]
            var editedNames = names.substr(0, names.indexOf('.'))
            var extNames = names.substr(names.indexOf('.') + 1)
            console.log(ext)
            console.log(editedNames)
            fileNames.push(editedNames)
            ext.push(extNames)
            imageUrls.push("https://tupop.in/app-property/uploads/crops/materials/" + cropImages[i])
        }

        for (var i = 0; i < imageUrls.length; i++) {
            const { config, fs } = RNFetchBlob;
            let PictureDir = fs.dirs.PictureDir + "/" + "pop";
            let options = {
                fileCache: true,
                addAndroidDownloads: {
                    useDownloadManager: true,
                    notification: false,
                    path:
                        PictureDir +  
                        '/image_' +
                        fileNames[i] + '.' +
                        ext[i],
                    description: 'Image',
                }
            };
            config(options)
                .fetch('GET', imageUrls[i])
                .then(res => {
                    // Showing alert after successful downloading
                    console.log('res -> ', JSON.stringify(res));
                    // alert('Image Downloaded Successfully.');
                });
        }
        console.log(fileNames)
        console.log(imageUrls)
        this.getlivestock()
    }

    //4
    getlivestock = () => {
        var cropImages = []
        var fileNames = []
        var imageUrls = []
        var ext = []
        cropImages = this.state.livestockScreenImages
        //alert(cropImages.length)
        for (var i = 0; i < cropImages.length; i++) {
            var names = cropImages[i]
            var editedNames = names.substr(0, names.indexOf('.'))
            var extNames = names.substr(names.indexOf('.') + 1)
            console.log(ext)
            console.log(editedNames)
            fileNames.push(editedNames)
            ext.push(extNames)
            imageUrls.push("https://tupop.in/app-property/uploads/livestocks/" + cropImages[i])
        }

        for (var i = 0; i < imageUrls.length; i++) {
            const { config, fs } = RNFetchBlob;
            let PictureDir = fs.dirs.PictureDir + "/" + "pop";
            let options = {
                fileCache: true,
                addAndroidDownloads: {
                    useDownloadManager: true,
                    notification: false,
                    path:
                        PictureDir +  
                        '/image_' +
                        fileNames[i] + '.' +
                        ext[i],
                    description: 'Image',
                }
            };
            config(options)
                .fetch('GET', imageUrls[i])
                .then(res => {
                    // Showing alert after successful downloading
                    console.log('res -> ', JSON.stringify(res));
                    // alert('Image Downloaded Successfully.');
                });
        }
        console.log(fileNames)
        console.log(imageUrls)
        this.getlivestockStep()
    }


    //5
    getlivestockStep = () => {
        var cropImages = []
        var fileNames = []
        var imageUrls = []
        var ext = []
        cropImages = this.state.liveStockStepImages
        //alert(cropImages.length)
        for (var i = 0; i < cropImages.length; i++) {
            var names = cropImages[i]
            var editedNames = names.substr(0, names.indexOf('.'))
            var extNames = names.substr(names.indexOf('.') + 1)
            console.log(ext)
            console.log(editedNames)
            fileNames.push(editedNames)
            ext.push(extNames)
            imageUrls.push("https://tupop.in/app-property/uploads/livestocks/steps/" + cropImages[i])
        }

        for (var i = 0; i < imageUrls.length; i++) {
            const { config, fs } = RNFetchBlob;
            let PictureDir = fs.dirs.PictureDir + "/" + "pop";
            let options = {
                fileCache: true,
                addAndroidDownloads: {
                    useDownloadManager: true,
                    notification: false,
                    path:
                        PictureDir +  
                        '/image_' +
                        fileNames[i] + '.' +
                        ext[i],
                    description: 'Image',
                }
            };
            config(options)
                .fetch('GET', imageUrls[i])
                .then(res => {
                    // Showing alert after successful downloading
                    console.log('res -> ', JSON.stringify(res));
                    // alert('Image Downloaded Successfully.');
                });
        }
        console.log(fileNames)
        console.log(imageUrls)
        this.getbreed()
    }


    //6
    getbreed = () => {
        var cropImages = []
        var fileNames = []
        var imageUrls = []
        var ext = []
        cropImages = this.state.breedScreenImages
        //alert(cropImages.length)
        for (var i = 0; i < cropImages.length; i++) {
            var names = cropImages[i]
            var editedNames = names.substr(0, names.indexOf('.'))
            var extNames = names.substr(names.indexOf('.') + 1)
            console.log(ext)
            console.log(editedNames)
            fileNames.push(editedNames)
            ext.push(extNames)
            imageUrls.push("https://tupop.in/app-property/uploads/livestocks/breeds/" + cropImages[i])
        }

        for (var i = 0; i < imageUrls.length; i++) {
            const { config, fs } = RNFetchBlob;
            let PictureDir = fs.dirs.PictureDir + "/" + "pop";
            let options = {
                fileCache: true,
                addAndroidDownloads: {
                    useDownloadManager: true,
                    notification: false,
                    path:
                        PictureDir +  
                        '/image_' +
                        fileNames[i] + '.' +
                        ext[i],
                    description: 'Image',
                }
            };
            config(options)
                .fetch('GET', imageUrls[i])
                .then(res => {
                    // Showing alert after successful downloading
                    console.log('res -> ', JSON.stringify(res));
                    // alert('Image Downloaded Successfully.');
                });
        }
        console.log(fileNames)
        console.log(imageUrls)
        this.getimportantLink()
    }


    //7
    getimportantLink = () => {
        var cropImages = []
        var fileNames = []
        var imageUrls = []
        var ext = []
        cropImages = this.state.importantLinksScreen
        //alert(cropImages.length)
        for (var i = 0; i < cropImages.length; i++) {
            var names = cropImages[i]
            var editedNames = names.substr(0, names.indexOf('.'))
            var extNames = names.substr(names.indexOf('.') + 1)
            console.log(ext)
            console.log(editedNames)
            fileNames.push(editedNames)
            ext.push(extNames)
            imageUrls.push("https://tupop.in/app-property/uploads/important-links/" + cropImages[i])
        }

        for (var i = 0; i < imageUrls.length; i++) {
            const { config, fs } = RNFetchBlob;
            let PictureDir = fs.dirs.PictureDir + "/" + "pop";
            let options = {
                fileCache: true,
                addAndroidDownloads: {
                    useDownloadManager: true,
                    notification: false,
                    path:
                        PictureDir +  
                        '/image_' +
                        fileNames[i] + '.' +
                        ext[i],
                    description: 'Image',
                }
            };
            config(options)
                .fetch('GET', imageUrls[i])
                .then(res => {
                    // Showing alert after successful downloading
                    console.log('res -> ', JSON.stringify(res));
                    // alert('Image Downloaded Successfully.');
                });
        }
        console.log(fileNames)
        console.log(imageUrls)
        this.getnutritionGarden()
    }



    //8
    getnutritionGarden = () => {
        var cropImages = []
        var fileNames = []
        var imageUrls = []
        var ext = []
        cropImages = this.state.nutritionGardenImages
        //alert(cropImages.length)
        for (var i = 0; i < cropImages.length; i++) {
            var names = cropImages[i]
            var editedNames = names.substr(0, names.indexOf('.'))
            var extNames = names.substr(names.indexOf('.') + 1)
            console.log(ext)
            console.log(editedNames)
            fileNames.push(editedNames)
            ext.push(extNames)
            imageUrls.push("https://tupop.in/app-property/uploads/nutrition-garden/" + cropImages[i])
        }

        for (var i = 0; i < imageUrls.length; i++) {
            const { config, fs } = RNFetchBlob;
            let PictureDir = fs.dirs.PictureDir + "/" + "pop";
            let options = {
                fileCache: true,
                addAndroidDownloads: {
                    useDownloadManager: true,
                    notification: false,
                    path:
                        PictureDir +  
                        '/image_' +
                        fileNames[i] + '.' +
                        ext[i],
                    description: 'Image',
                }
            };
            config(options)
                .fetch('GET', imageUrls[i])
                .then(res => {
                    // Showing alert after successful downloading
                    console.log('res -> ', JSON.stringify(res));
                    // alert('Image Downloaded Successfully.');
                });
        }
        console.log(fileNames)
        console.log(imageUrls)
        this.getsmallBusiness()
    }


    //9
    getsmallBusiness = () => {

        var cropImages = []
        var fileNames = []
        var imageUrls = []
        var ext = []
        cropImages = this.state.smallBusinessImages
        //alert(cropImages.length)
        for (var i = 0; i < cropImages.length; i++) {
            var names = cropImages[i]
            var editedNames = names.substr(0, names.indexOf('.'))
            var extNames = names.substr(names.indexOf('.') + 1)
            console.log(ext)
            console.log(editedNames)
            fileNames.push(editedNames)
            ext.push(extNames)
            imageUrls.push("https://tupop.in/app-property/uploads/small-business/" + cropImages[i])
        }

        for (var i = 0; i < imageUrls.length; i++) {
            const { config, fs } = RNFetchBlob;
            let PictureDir = fs.dirs.PictureDir + "/" + "pop";
            let options = {
                fileCache: true,
                addAndroidDownloads: {
                    useDownloadManager: true,
                    notification: false,
                    path:
                        PictureDir +  
                        '/image_' +
                        fileNames[i] + '.' +
                        ext[i],
                    description: 'Image',
                }
            };
            config(options)
                .fetch('GET', imageUrls[i])
                .then(res => {
                    // Showing alert after successful downloading
                    console.log('res -> ', JSON.stringify(res));
                    //alert('Image Downloaded Successfully.');
                });
        }
        //alert("images downloaded successfully")
        console.log(fileNames)
        console.log(imageUrls)
        this.getLabelAudio()
    }


    //10
    getLabelAudio = () => {

        var cropImages = []
        var fileNames = []
        var imageUrls = []
        var ext = []
        cropImages = this.state.labels
        //alert(cropImages.length)
        for (var i = 0; i < cropImages.length; i++) {
            var names = cropImages[i]
            var editedNames = names.substr(0, names.indexOf('.'))
            var extNames = names.substr(names.indexOf('.') + 1)
            console.log(ext)
            console.log(editedNames)
            fileNames.push(editedNames)
            ext.push(extNames)
            imageUrls.push("https://tupop.in/app-property/uploads/label/" + cropImages[i])
        }

        for (var i = 0; i < imageUrls.length; i++) {
            const { config, fs } = RNFetchBlob;
            let PictureDir = fs.dirs.PictureDir + "/" + "pop";
            let options = {
                fileCache: true,
                addAndroidDownloads: {
                    useDownloadManager: true,
                    notification: false,
                    path:
                        PictureDir +  
                        '/image_' +
                        fileNames[i] + '.' +
                        ext[i],
                    description: 'Image',
                }
            };
            config(options)
                .fetch('GET', imageUrls[i])
                .then(res => {
                    // Showing alert after successful downloading
                    console.log('res -> ', JSON.stringify(res));
                    //alert('Image Downloaded Successfully.');
                });
        }
        // alert("images downloaded successfully")
        // this.setState({ imageloaded: false })
        // if (this.state.imageloaded === false) {
        //     Toast.show({
        //         text: "Images Downloaded Successfully",
        //         duration: 6000,
        //         type: 'success'
        //     })
        // }

        console.log(fileNames)
        console.log(imageUrls)
        this.getStaticImages()
    }

    //11

    getStaticImages = () => {
        //alert("lplplpllplplplplplpl")
        var cropImages = []
        var fileNames = []
        var imageUrls = []
        var ext = []
        cropImages = this.state.staticImages
        //alert(cropImages.length)
        for (var i = 0; i < cropImages.length; i++) {
            var names = cropImages[i]
            var editedNames = names.substr(0, names.indexOf('.'))
            var extNames = names.substr(names.indexOf('.') + 1)
            console.log(ext)
            console.log(editedNames)
            fileNames.push(editedNames)
            ext.push(extNames)
            imageUrls.push("https://tupop.in/app-property/uploads/static/" + cropImages[i])
        }

        for (var i = 0; i < imageUrls.length; i++) {
            const { config, fs } = RNFetchBlob;
            let PictureDir = fs.dirs.PictureDir + "/" + "pop";
            let options = {
                fileCache: true,
                addAndroidDownloads: {
                    useDownloadManager: true,
                    notification: false,
                    path:
                        PictureDir +  
                        '/image_' +
                        fileNames[i] + '.' +
                        ext[i],
                    description: 'Image',
                }
            };
            config(options)
                .fetch('GET', imageUrls[i])
                .then(res => {
                    // Showing alert after successful downloading
                    console.log('res -> ', JSON.stringify(res));
                    //alert('Image Downloaded Successfully.');
                });
        }
        // alert("images downloaded successfully")
        this.setState({ imageloaded: false })
        if (this.state.imageloaded === false) {
            Toast.show({
                text: "Images Downloaded Successfully",
                duration: 6000,
                type: 'success'
            })
        }


        console.log(fileNames)
        console.log(imageUrls)
    }


    guestSignIn = () => {
        this.state.phoneNumber = '9674921880'
        this.state.username = 'Guest'
        this.state.password = '12'
        this.signIn()
        // this.setState({username : 'anonymous@abc.com'})
        // this.setState({password : 'Test@12345'})
    }

    getAllData = async () => {
        var allusername = await AsyncStorage.getItem('username')
        var token = await AsyncStorage.getItem('token')
        var encodedUsername = base64.encode(this.state.username)
        var cropObjectsToBeSaved, cropStepsObjectsToBeSaved, cropsMaterialsObjectsToBeSaved, livestockObjectsToBeSaved, liveStockStepMaterialsObjectsToBeSaved, liveStockBreedsObjectsToBeSaved, breedCategoriesObjectsToBeSaved, importantLinksObjectsToBeSaved, nutrationGradenObjectsToBeSaved, livestockStepObjectsToBeSaved, vaccinationToBeSaved, contactListToBeSaved, dryFishObjectsToBeSaved, vegetableVendingObjectsToBeSaved, smallGroceryShopToBeSaved, labelsObjectsToBeSaved, smallBusinessCategoryObjectsToBeSaved, smallBusinessSubCategoryObjectsToBeSaved;
        await axios.get("https://tupop.in/api/v1//get-all-data", {
            headers: {
                'Content-type': "application/json",
                'X-Information': encodedUsername,
                'Authorization': "POP " + token,
                'Cache-Control': "max-age=2592000"
            }
        }).then(function (response) {
            console.log(response.data, "CROPS NAMES")
            var crops = response.data.crops
            //var cropObjects = crops.substring(1,crops.length-1)
            cropObjectsToBeSaved = crops
            var cropSteps = response.data.cropSteps
            cropStepsObjectsToBeSaved = cropSteps
            var cropsMaterials = response.data.cropsMaterials
            //var cropsMaterialsObjects = cropsMaterials.substring(1,cropsMaterials.length-1)
            cropsMaterialsObjectsToBeSaved = cropsMaterials
            var livestock = response.data.livestock
            //var livestockObjects = livestock.substring(1,livestock.length-1)
            livestockObjectsToBeSaved = livestock
            var liveStockStepMaterials = response.data.liveStockStepMaterials
            //var liveStockStepMaterialsObjects = liveStockStepMaterials.substring(1,liveStockStepMaterials.length-1)
            liveStockStepMaterialsObjectsToBeSaved = liveStockStepMaterials
            var liveStockBreeds = response.data.liveStockBreeds
            //var liveStockBreedsObjects = liveStockBreeds.substring(1,liveStockBreeds.length-1)
            liveStockBreedsObjectsToBeSaved = liveStockBreeds
            var breedCategories = response.data.breedCategories
            //var breedCategoriesObjects = breedCategories.substring(1,breedCategories.length-1)
            breedCategoriesObjectsToBeSaved = breedCategories
            var importantLinks = response.data.importantLinks
            //var importantLinksObjects = importantLinks.substring(1,importantLinks.length-1)
            importantLinksObjectsToBeSaved = importantLinks
            //console.log(importantLinksObjectsToBeSaved)

            var nutrationGraden = response.data.nutrationGraden
            nutrationGradenObjectsToBeSaved = nutrationGraden

            var livestockStep = response.data.livestockStep
            livestockStepObjectsToBeSaved = livestockStep

            var vaccination = response.data.vaccination
            vaccinationToBeSaved = vaccination

            var contactList = response.data.contactList
            contactListToBeSaved = contactList

            var dryFish = response.data.dryFish
            dryFishObjectsToBeSaved = dryFish

            var vegetableVending = response.data.vegetableVending
            vegetableVendingObjectsToBeSaved = vegetableVending

            var smallGroceryShop = response.data.smallGroceryShop
            smallGroceryShopToBeSaved = smallGroceryShop

            var labels = response.data.labels
            labelsObjectsToBeSaved = labels

            var smallBusinessCategory = response.data.smallBusinessCategory
            smallBusinessCategoryObjectsToBeSaved = smallBusinessCategory

            var smallBusinessSubCategory = response.data.smallBusinessSubCategory
            smallBusinessSubCategoryObjectsToBeSaved = smallBusinessSubCategory
        }).catch(function (error) {
            console.log(error)
        })

        const offlineDataToBeSaved = { 'username': this.state.username, 'livestock': livestockObjectsToBeSaved, 'livestockStep': livestockStepObjectsToBeSaved, 'liveStockStepMaterials': liveStockStepMaterialsObjectsToBeSaved, 'liveStockBreeds': liveStockBreedsObjectsToBeSaved, 'breedCategories': breedCategoriesObjectsToBeSaved, 'importantLinks': importantLinksObjectsToBeSaved, 'nutrationGraden': nutrationGradenObjectsToBeSaved, 'vaccination': vaccinationToBeSaved, 'contactList': contactListToBeSaved, 'dryFish': dryFishObjectsToBeSaved, 'vegetableVending': vegetableVendingObjectsToBeSaved, 'smallGroceryShop': smallGroceryShopToBeSaved }
        const numberOfCropsToBeSaved = { 'username': this.state.username, 'crops': cropObjectsToBeSaved }
        const cropDataToBeSaved = { 'username': this.state.username, 'cropSteps': cropStepsObjectsToBeSaved, 'cropsMaterials': cropsMaterialsObjectsToBeSaved }
        const labelsToBeSaved = { 'username': this.state.username, 'labels': labelsObjectsToBeSaved }
        const smallBusinessCategoryToBeSaved = { 'username': this.state.username, 'smallBusinessCategory': smallBusinessCategoryObjectsToBeSaved, 'smallBusinessSubCategory': smallBusinessSubCategoryObjectsToBeSaved }
        // offlineDataToBeSaved.crops.push(cropObjectsToBeSaved) 'cropSteps': cropStepsObjectsToBeSaved, 'cropsMaterials': cropsMaterialsObjectsToBeSaved, 
        // offlineDataToBeSaved.cropsMaterials.push(cropsMaterialsObjectsToBeSaved)
        // offlineDataToBeSaved.livestock.push(livestockObjectsToBeSaved)
        // offlineDataToBeSaved.liveStockStepMaterials.push(liveStockStepMaterialsObjectsToBeSaved)
        // offlineDataToBeSaved.liveStockBreeds.push(liveStockBreedsObjectsToBeSaved)
        // offlineDataToBeSaved.breedCategories.push(breedCategoriesObjectsToBeSaved)
        // offlineDataToBeSaved.importantLinks.push(importantLinksObjectsToBeSaved)

        //SAVING SMALL BUSINESS
        const exsistingSmallBusiness = await AsyncStorage.getItem('smallBusiness')
        let newSmallBusiness = JSON.parse(exsistingSmallBusiness)
        if (!newSmallBusiness) {
            newSmallBusiness = []
        }

        var smallBusinessArr = newSmallBusiness.map(function (item) { return item.username })
        if (smallBusinessArr.includes(this.state.username)) {
            console.log("NO more crops assigned to this user")
        } else {
            newSmallBusiness.push(smallBusinessCategoryToBeSaved)
        }


        await AsyncStorage.setItem("smallBusiness", JSON.stringify(newSmallBusiness))
            .then(() => {

                //alert('‘Offline Data saved successfully’')
                Toast.show({
                    text: "crop Data saved successfully",
                    duration: 3000,
                    type: 'success'
                })
            })
            .catch(() => {
                console.log('‘There was an error saving the product’')
            })

        //SAVING CROPS ONLY
        const exsistingNumberOfCrops = await AsyncStorage.getItem('numberOfCrops')
        let newNumberOfCrops = JSON.parse(exsistingNumberOfCrops)
        if (!newNumberOfCrops) {
            newNumberOfCrops = []
        }

        var numberOfCropsArr = newNumberOfCrops.map(function (item) { return item.username })
        if (numberOfCropsArr.includes(this.state.username)) {
            console.log("NO more crops assigned to this user")
        } else {
            newNumberOfCrops.push(numberOfCropsToBeSaved)
        }


        await AsyncStorage.setItem("numberOfCrops", JSON.stringify(newNumberOfCrops))
            .then(() => {

                //alert('‘Offline Data saved successfully’')
                Toast.show({
                    text: "crop Data saved successfully",
                    duration: 3000,
                    type: 'success'
                })
            })
            .catch(() => {
                console.log('‘There was an error saving the product’')
            })

        //SAVING OFFLINE DATA
        const exsistingOfflineData = await AsyncStorage.getItem('offlineData')
        let newOfflineData = JSON.parse(exsistingOfflineData)
        if (!newOfflineData) {
            newOfflineData = []
        }

        var offlineArr = newOfflineData.map(function (item) { return item.username })
        if (offlineArr.includes(this.state.username)) {
            console.log("NO")
        } else {
            newOfflineData.push(offlineDataToBeSaved)
        }


        await AsyncStorage.setItem("offlineData", JSON.stringify(newOfflineData))
            .then(() => {
                // this.props.navigation.reset({
                //     index: 0,
                //     routes: [
                //         { name: "DashBoardScreen" }
                //     ]
                // });
                //alert('‘Offline Data saved successfully’')
                Toast.show({
                    text: "Offline Data saved successfully",
                    duration: 3000,
                    type: 'success'
                })
            })
            .catch(() => {
                console.log('‘There was an error saving the product’')
            })



        //SAVING CROP DATA
        const exsistingCropData = await AsyncStorage.getItem('cropData')
        let newCropData = JSON.parse(exsistingCropData)
        if (!newCropData) {
            newCropData = []
        }

        var offlineArr = newCropData.map(function (item) { return item.username })
        if (offlineArr.includes(this.state.username)) {
            console.log("NO more crops assigned to this user")
        } else {
            newCropData.push(cropDataToBeSaved)
        }


        await AsyncStorage.setItem("cropData", JSON.stringify(newCropData))
            .then(() => {

                //alert('‘Offline Data saved successfully’')
                Toast.show({
                    text: "crop Data saved successfully",
                    duration: 3000,
                    type: 'success'
                })
            })
            .catch(() => {
                console.log('‘There was an error saving the product’')
            })


        //SAVING LABELS
        const exsistingLabelsData = await AsyncStorage.getItem('labelsData')
        let newLabelsData = JSON.parse(exsistingLabelsData)
        if (!newLabelsData) {
            newLabelsData = []
        }

        var labelsArr = newLabelsData.map(function (item) { return item.username })
        if (labelsArr.includes(this.state.username)) {
            console.log("NO")
        } else {
            newLabelsData.push(labelsToBeSaved)
        }


        await AsyncStorage.setItem("labelsData", JSON.stringify(newLabelsData))
            .then(() => {

                this.props.navigation.reset({
                    index: 0,
                    routes: [
                        { name: "DashBoardScreen" }
                    ]
                });
                //alert("labels saved in device")
                //alert('‘Offline Data saved successfully’')
                Toast.show({
                    text: "labels Data saved successfully",
                    duration: 3000,
                    type: 'success'
                })
            })
            .catch(() => {
                console.log('‘There was an error saving the product’')
            })

    }

    setCustodianNumber = async () => {
        let cus = await AsyncStorage.getItem("cus")
        this.setState({ loadPhoneNumber: false })
        this.setState({ phoneNumber: cus })
    }

    checkConnection = () => {
        NetInfo.fetch().then(state => {
            var isConnected = state.isConnected
            console.log(isConnected)
            if (isConnected === true) {
                return this.signIn()
            } else {
                return this.offlineMode()
            }
        })
    }

    offlineMode = async () => {
        // let user = await AsyncStorage.getItem('user')
        // let parsed = JSON.stringify(user)
        // console.log(JSON.stringify(parsed))
        // var specificObject = parsed.find((i) => i.username === this.state.username)
        // console.log(specificObject.username)
        try {
            //var count = 8
            var offlinePassword
            let user = await AsyncStorage.getItem('user');
            let parsed = JSON.parse(user);
            console.log(JSON.stringify(parsed))
            var specificObject = parsed.find((i) => i.username === this.state.username)
            console.log(specificObject.password)
            offlinePassword = specificObject.password
            if (offlinePassword === this.state.password) {
                AsyncStorage.setItem('username', this.state.username)
                this.props.navigation.reset({
                    index: 0,
                    routes: [
                        { name: "DashBoardScreen" }
                    ]
                });
            } else {
                Toast.show({
                    type: 'danger',
                    text: 'please enter a valid password',
                    duration: 6000
                })
            }
            // var valueArr = parsed.map(function(item){ return item.userId });
            // alert(valueArr)
            // var specificObject = parsed.find((i) => i.userId === count)
            // console.log(specificObject.userId)

            //console.log(specificObject.userId = count+1)
            // console.log(specificObject.userId = 6)
            //await AsyncStorage.setItem('products',JSON.stringify(parsed))


            //alert(parsed[0].item = "bitch")
            // await AsyncStorage.setItem('products',JSON.stringify(parsed))
            // console.log(JSON.stringify(parsed))
            //alert(JSON.stringify(parsed));
            // console.log(JSON.stringify(parsed))
        }
        catch (error) {
            Toast.show({
                type: 'danger',
                text: "Invalid username/password",
                duration: 6000
            })
        }

    }

    getCustodianMobileNumber = async () => {

        let deviceId = await DeviceInfo.getAndroidId()
        //alert(deviceId)
        //var load = true
        //this.setState({ loadPhoneNumber: true })
        var phone
        await axios.get(DataAccess.BaseUrl + DataAccess.AccessUrl + DataAccess.CustodianNumber + deviceId, {
        }).then(function (response) {
            //load = false
            ///alert(response.data.msg)
            console.log(response.data.status,"kokokokokokookokoko")
            if (response.data.status === 1) {
                phone = response.data.data.phone
                AsyncStorage.setItem("cus", JSON.stringify(response.data.data.phone))
            }

        }).catch(function (error) {
            console.log(error)
        })

        // if (load === false) {
        //     this.setState({ loadPhoneNumber: false })
        // }
        this.setState({ phoneNumber: phone })
    }

    signIn = async () => {
        let deviceId = await DeviceInfo.getAndroidId()
        var load = true
        this.setState({ isLoading: true })
        var name = this.state.username
        var redirect = false
        var saveOffline = false
        var status


        if (this.state.username.trim() === '') {
            this.setState({ isLoading: false })
            return Toast.show({
                text: "please enter username",
                type: 'danger',
                duration: 3000
            })
        } else if (this.state.password.trim() === '') {
            this.setState({ isLoading: false })
            return Toast.show({
                text: "please enter password",
                type: 'danger',
                duration: 3000
            })
        }

        await axios.post(DataAccess.BaseUrl + DataAccess.AccessUrl + DataAccess.SignIn, {
            phone: this.state.phoneNumber,
            username: this.state.username,
            password: this.state.password,
            deviceId: deviceId
        }, {
            headers: {

                'Content-type': 'application/json'
            }
        }).then(function (response) {
            // console.log(response.data.data._id)
            // console.log(response.data.data.name)
            // console.log(response.data.data.token)
            // console.log(response.data.data.type)
            // console.log(response.data.data.username)
            if (response.data.status === 1) {
                console.log("yes")
                status = response.data.status
                saveOffline = true
                //redirect = true
                Toast.show({
                    text: "Welcome" + " " + name,
                    type: 'success',
                    duration: 3000
                })
                AsyncStorage.setItem("_id", response.data.data._id)
                AsyncStorage.setItem("name", response.data.data.name)
                AsyncStorage.setItem("token", response.data.data.token)
                AsyncStorage.setItem("username", response.data.data.username)
                AsyncStorage.setItem("age", String(response.data.data.age))
                AsyncStorage.setItem("phone", String(response.data.data.phone))                
                AsyncStorage.setItem("state", response.data.data.state)
                AsyncStorage.setItem("district", response.data.data.district)
                AsyncStorage.setItem("panchayat", response.data.data.panchayat)
                AsyncStorage.setItem("village", response.data.data.village)
                //AsyncStorage.setItem("block", response.data.data.block[0].block)
            } else {
                load = false
                Toast.show({
                    text: response.data.msg,
                    type: 'danger',
                    duration: 3000
                })
            }

        }).catch(function (error) {
            load = false
            console.log(error)
        })

        if (load === false) {
            this.setState({ isLoading: false })
        }

        let _id = await AsyncStorage.getItem('_id')
        let reqname = await AsyncStorage.getItem('name')
        let token = await AsyncStorage.getItem('token')
        let username = await AsyncStorage.getItem('username')

        const userToBeSaved = { '_id': _id, 'name': reqname, 'password': this.state.password, 'token': token, 'username': username, 'syncStatus': false, 'lowLand': [], 'highLand': [], 'mediumLand': [], 'patchData': [], 'patch': [], 'cropData': [], 'livestockData': [], 'moneyManagerData': [], 'costBenifitAnalysis': [] }
        const exsistingUser = await AsyncStorage.getItem('user')
        let newUser = JSON.parse(exsistingUser)
        if (!newUser) {
            newUser = []
        }

        var valueArr = newUser.map(function (item) { return item._id })
        if (valueArr.includes(_id)) {
            console.log("NO")
            // Toast.show({
            //     text: "Invalid username/password",
            //     type: 'danger',
            //     duration: 6000
            // })
        } else {
            newUser.push(userToBeSaved)
        }

        await AsyncStorage.setItem("user", JSON.stringify(newUser))
            .then(() => {
                console.log('‘It was saved successfully’')
            })
            .catch(() => {
                console.log('‘There was an error saving the product’')
            })

        // if (redirect === true) {
        //     // this.props.navigation.navigate({
        //     //     name: 'DashBoardScreen'
        //     // })
        //     this.props.navigation.reset({
        //         index: 0,
        //         routes: [
        //             { name: "DashBoardScreen" }
        //         ]
        //     });
        // }

        if (saveOffline === true) {
            await AsyncStorage.removeItem('offlineData')
            await AsyncStorage.removeItem('cropData')
            Toast.show({
                text: "Please wait while we save your data",
                type: 'success',
                duration: 6000
            })
            this.getAllData()
            // try {
            //     let offlineData = await AsyncStorage.getItem('offlineData');
            //     let cropData = await AsyncStorage.getItem('cropData');
            //     let labelsData = await AsyncStorage.getItem('labelsData');
            //     if (offlineData != null && cropData != null && labelsData != null) {
            //         Toast.show({
            //             text: "Welcome" + " " + name,
            //             type: 'success',
            //             duration: 3000
            //         })
            //         this.props.navigation.reset({
            //             index: 0,
            //             routes: [
            //                 { name: "DashBoardScreen" }
            //             ]
            //         });
            //     }
            //     else {
            //         Toast.show({
            //             text: "Please wait while we save your data",
            //             type: 'success',
            //             duration: 6000
            //         })
            //         this.getAllData()
            //     }
            // } catch (error) {
            //     console.log(error)
            // }

        } else if (status != 1) {
            Toast.show({
                text: "Invalid username/password",
                type: 'danger',
                duration: 6000
            })
        }

    }

    displayData = async () => {
        try {
            //var count = 8
            let user = await AsyncStorage.getItem('cropData');
            let parsed = JSON.parse(user);
            console.log(JSON.stringify(parsed))

        }
        catch (error) {
            Toast.show({
                type: 'danger',
                text: error,
                duration: 6000
            })
        }
    }


    navigateToRegistration = () => {
        LanguageChange.setLanguage(this.state.selectedLanguage)
        this.props.navigation.navigate('RegistrationScreen')
        this.props.navigation.navigate({
            name: 'RegistrationScreen',
            params: { selectedLanguage: this.state.selectedLanguage }
        })
    }

    render() {
        return (
            <KeyboardAwareScrollView style={{ backgroundColor: BaseColor.BackgroundColor, flex: 1 }}
                keyboardShouldPersistTaps='handled'
            >
                <View >
                    <View style={{ marginTop: heightToDp("3%"), alignSelf: "center" }}>
                        <Logo />
                    </View>
                    <View style={{ marginTop: heightToDp("5%") }}>
                        <Text style={{ fontSize: widthToDp("7%"), alignSelf: 'center', fontFamily: 'Oswald-SemiBold' }}>{LanguageChange.signIn}</Text>
                    </View>
                    {
                        this.state.imageloaded ? <View>
                            <View style={{ marginTop: heightToDp("5%") }}>
                                <CustomIndicator IsLoading={this.state.imageLoading} />
                                <View style={{ marginTop: heightToDp("5%"), alignSelf: 'center' }}>
                                    <Text style={{ fontSize: widthToDp("6%"), fontFamily: 'Oswald-Medium' }}>Please wait while image is downloading</Text>
                                </View>
                            </View>

                        </View> :
                            <View>
                                <View style={{ marginTop: heightToDp("5%"), marginLeft: widthToDp("8%") }}>
                                    {
                                        this.state.loadPhoneNumber ? <CustomIndicator IsLoading={this.state.loadPhoneNumber} /> : null
                                    }
                                    <Text style={{ fontSize: widthToDp("4.6%"), marginLeft: widthToDp("2%"), fontFamily: 'Oswald-Medium' }}>{this.state.phoneNumber}</Text>
                                    <View style={{ borderBottomColor: 'black', borderBottomWidth: 1, marginTop: heightToDp('0.1%'), width: widthToDp("80%"), marginLeft: widthToDp("2%") }}></View>
                                </View>
                                {/* <View style={{ marginTop: heightToDp("5%"), marginLeft: widthToDp("10%") }}>
                    <Text style={{ fontSize: widthToDp("5%") }}>CONTACT NUMBER</Text>
                </View>
                <View style={{ marginTop: heightToDp("1%"), marginLeft: widthToDp("10%") }}>
                    <Text style={{ fontSize: widthToDp("6%") }}>1234567890</Text>
                </View>
                <View style={{ borderBottomColor: 'black', borderBottomWidth: 1, marginTop: heightToDp('1.5%'), width: widthToDp("80%"), alignSelf: 'center' }}></View> */}
                                <ScrollView>
                                    <View style={{ marginTop: heightToDp("2%"), marginLeft: widthToDp("10%") }}>
                                        <FloatingLabel
                                            labelStyle={styles.labelInput}
                                            inputStyle={styles.input}
                                            style={styles.formInput}
                                            // onBlur={this.onBlur}
                                            onChangeText={(text) => { this.setState({ username: text }) }}
                                        >{LanguageChange.username}</FloatingLabel>
                                    </View>
                                    {/* <View style={{ borderBottomColor: 'black', borderBottomWidth: 1, marginTop: heightToDp('1.5%'), width: widthToDp("80%"), alignSelf: 'center' }}></View> */}
                                    <View style={{ marginTop: heightToDp("2%"), marginLeft: widthToDp("10%"), flexDirection: 'row' }}>
                                        <FloatingLabel
                                            labelStyle={styles.labelInput}
                                            inputStyle={styles.input}
                                            style={styles.formInput}
                                            password={true}

                                            onChangeText={(text) => { this.setState({ password: text }) }}
                                        // onBlur={this.onBlur}
                                        >{LanguageChange.password}</FloatingLabel>
                                    </View>
                                    {/* <View style={{ borderBottomColor: 'black', borderBottomWidth: 1, marginTop: heightToDp('1.5%'), width: widthToDp("80%"), alignSelf: 'center' }}></View> */}
                                    <TouchableOpacity onPress={() => { this.props.navigation.navigate("ForgetPasswordScreen") }}>
                                        <View style={{ marginLeft: widthToDp("50%"), marginTop: heightToDp("0.5%"), width: widthToDp("37%") }}>
                                            <Text style={{ fontFamily: 'Oswald-Medium', fontSize: widthToDp("4%") }}>{LanguageChange.forgotPassword}</Text>
                                        </View>
                                    </TouchableOpacity>
                                    {
                                        this.state.isLoading ? <CustomIndicator IsLoading={this.state.isLoading} /> : null
                                    }
                                    <TouchableOpacity onPress={() => this.checkConnection()} disabled={this.state.isLoading}>
                                        <View style={{ backgroundColor: BaseColor.SecondaryColor, marginTop: heightToDp("5%"), width: widthToDp("37%"), alignSelf: 'center', height: heightToDp("5%"), borderRadius: 100 }}>
                                            <Text style={{ alignSelf: 'center', marginTop: heightToDp("0.5%"), fontWeight: '500', fontSize: widthToDp("5%"), fontFamily: 'Oswald-Medium' }}>{LanguageChange.signIn}</Text>
                                        </View>
                                    </TouchableOpacity>
                                    <View style={{ flexDirection: 'row', alignSelf: 'center', marginTop: heightToDp('1.5%') }}>
                                        <Text style={{ fontFamily: 'Oswald-Medium' }}>{LanguageChange.noAccount}</Text>
                                        <TouchableOpacity onPress={() => this.navigateToRegistration()}>
                                            <Text style={{ color: BaseColor.Red, fontFamily: 'Oswald-Medium' }}> {LanguageChange.pleaseSignUp}</Text>
                                        </TouchableOpacity>
                                    </View>

                                    <View style={{ borderBottomColor: BaseColor.Stroke, borderBottomWidth: 1, marginTop: heightToDp('1.5%'), width: widthToDp("100%") }}></View>

                                    <TouchableOpacity onPress={() => this.guestSignIn()} disabled={this.state.isLoading}>
                                        <View style={{ backgroundColor: BaseColor.SecondaryColor, marginTop: heightToDp("3%"), width: widthToDp("37%"), alignSelf: 'center', height: heightToDp("5%"), borderRadius: 100 }}>
                                            <Text style={{ alignSelf: 'center', marginTop: heightToDp("0.4%"), fontWeight: '500', fontSize: widthToDp("5%"), fontFamily: 'Oswald-Medium' }}>{LanguageChange.guestSignIn}</Text>
                                        </View>
                                    </TouchableOpacity>
                                    <View style={{ marginTop: 20 }}></View>
                                </ScrollView>
                            </View>
                    }
                </View>
            </KeyboardAwareScrollView>
        );
    }
}

var styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
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