import React from 'react';
import { ActivityIndicator, Image, Text, TouchableOpacity, View } from 'react-native';
import Video from 'react-native-video';
import BaseColor from '../Core/BaseTheme';
import { heightToDp, widthToDp } from '../Responsive';
import NetInfo from "@react-native-community/netinfo";
import RNFetchBlob from 'rn-fetch-blob';
import { Toast } from 'native-base';
import IonIcon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const videoOverLayIconTouchableStyle = {
    position: 'absolute',
    top: widthToDp('90%'),
    left: widthToDp('45%'),
    justifyContent: 'center',
    alignItems: 'center'
};

const videoOverLayIconStyle = {
    backgroundColor: '#fff',
    borderRadius: 25 / 2,
};

export default class VideoComponent extends React.Component {
    state = {
        stepVideo: "",
        stepVideoLabel: ""
    };

    async componentDidMount() {
        try {
            let user = await AsyncStorage.getItem('cropData');
            let parsed = JSON.parse(user);
            var specificObject = parsed[0]
            var cropSpecificSteps = specificObject.cropSteps.filter((i) => i.cropId === this.props._id)
            let files = await RNFetchBlob.fs.ls(RNFetchBlob.fs.dirs.MovieDir);   
            if(files.includes("video_" + cropSpecificSteps[this.props.stepId].videoFile)) {
                this.setState({stepVideo: "file:///storage/emulated/0/Movies/video_" + cropSpecificSteps[this.props.stepId].videoFile}, () => this.setState({isDownloadingVideo: false}));
            } else {
                this.setState({stepVideo: ""}, () => this.setState({isDownloadingVideo: false}))
            }
        } catch (e) {
            console.log(e);
        }
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


    loadlabelsFromStorage = async () => {
        try {
            let username = await AsyncStorage.getItem('username')
            let user = await AsyncStorage.getItem('labelsData');
            let parsed = JSON.parse(user);
            var specificObject = parsed[0]
            var stepVideoLabel = specificObject.labels.find((i) => i.type === 214)
            if (this.state.textLanguageChange === '0') {
                this.setState({ stepVideoLabel: stepVideoLabel.nameEnglish })
            } else if (this.state.textLanguageChange === '1') {
                this.setState({ stepVideoLabel: stepVideoLabel.nameHindi })
            } else if (this.state.textLanguageChange === '2') {
                this.setState({ stepVideoLabel: stepVideoLabel.nameHo })
            } else if (this.state.textLanguageChange === '3') {
                this.setState({ stepVideoLabel: stepVideoLabel.nameOdia })
            } else if (this.state.textLanguageChange === '4') {
                this.setState({ stepVideoLabel: stepVideoLabel.nameSanthali })
            }
        } catch (error) {
            alert(error)
        }
        //this.setState({ crops: specificObject.crops })
        //this.showData()
    }

    downloadVideo = () => {
        this.setState({isDownloadingVideo: true})
        NetInfo.fetch().then(state => {
            if (state.isConnected) {
                const { config, fs } = RNFetchBlob;
                let MovieDir = fs.dirs.MovieDir;
                let options = {
                    fileCache: true,
                    addAndroidDownloads: {
                        useDownloadManager: true,
                        notification: false,
                        path:
                            MovieDir +
                            '/video_' +
                            this.props.asyncVideoFileName,
                        description: 'Video',
                    }
                };
                config(options)
                    .fetch('GET', "https://tupop.in/app-property/uploads/crops/steps/" + this.props.asyncVideoFileName)
                    .then(async res => {
                        this.setState({
                            stepVideo: "file:///storage/emulated/0/Movies/video_" + this.props.asyncVideoFileName
                        }, () => this.setState({isDownloadingVideo: false}))
                    })
                    .catch((err) => {
                        console.log(err);
                        // Alert.alert('Download Failed', err.message);
                    });
            } else {
                Toast.show({
                    type: 'warning',
                    text: 'Please be online to download the video',
                    duration: 3000
                });
                this.setState({isDownloadingVideo: false});
            }
        });
    }

    render = () => {
        return (
            this.state.stepVideo !== "" ?
            <>
                <View style={{ backgroundColor: BaseColor.Red, width: widthToDp("90%"), height: heightToDp("5%"), alignSelf: 'center', marginTop: heightToDp("2%"), borderTopLeftRadius: 10, borderTopRightRadius: 10 }}>
                    <Text style={{ 
                        color: 'white', 
                        marginLeft: widthToDp("4%"), 
                        marginVertical: heightToDp('1.5%'), 
                        fontSize: widthToDp("5%"), 
                        fontFamily: 'Oswald-Medium' 
                    }}>{this.state.stepVideoLabel}</Text>  
                </View>

                <Video
                    source={{ uri: this.state.stepVideo }}
                    style={{
                        backgroundColor: '#fff',
                        height: heightToDp('21%'),
                        width: widthToDp('90%'),
                        marginLeft: widthToDp("5%"),
                        borderBottomRightRadius: 10,
                        borderBottomLeftRadius: 10
                    }}
                    resizeMode="stretch"
                    controls={false}
                    onLoadStart={() => this.setState({isDownloadingVideo: true})}
                    onLoad={() => this.setState({isDownloadingVideo: false})}
                    paused={this.props.isPlaying}
                    onError={(err) => console.warn(err)}
                />
                <TouchableOpacity
                    style={videoOverLayIconTouchableStyle}
                    onPress={this.props.playOrPauseVideo}
                >
                    <IonIcon
                        name={
                            Platform.OS === 'android' ?
                                `md-${this.props.isPlaying ? "play" : "pause"}` :
                                `ios-${this.props.isPlaying ? "play" : "pause"}`
                        }
                        color={'#1b1b1b'}
                        style={videoOverLayIconStyle}
                        size={25}
                    />
                </TouchableOpacity>
            </> :
            <View style={{ backgroundColor: BaseColor.Red, width: widthToDp("90%"), height: heightToDp("30%"), alignSelf: 'center', marginTop: heightToDp("2%"), borderRadius: 10 }}>
                <Text style={{ 
                    color: 'white', 
                    marginLeft: widthToDp("4%"), 
                    marginVertical: heightToDp('1.5%'), 
                    fontSize: widthToDp("5%"), 
                    fontFamily: 'Oswald-Medium' 
                }}>{this.state.stepVideoLabel}</Text>                            
                {
                    this.state.isDownloadingVideo ?
                    <View
                        style={{
                            flex: 1,
                            backgroundColor: '#fff',
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderBottomLeftRadius: 10,
                            borderBottomRightRadius: 10
                        }}
                    >
                        <ActivityIndicator
                            size={"large"}
                            color="#1b1b1b"
                        />
                    </View>:
                    <TouchableOpacity
                        onPress={this.downloadVideo}
                        style={{
                            flex: 1,
                            backgroundColor: '#fff',
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderBottomLeftRadius: 10,
                            borderBottomRightRadius: 10
                        }}
                    >
                        <Image
                            source={require("../assets/video_thumbnail.png")}
                            style={{
                                backgroundColor: '#fff',
                                height: heightToDp('21%'),
                                width: widthToDp('90%'),
                                resizeMode: 'contain'
                            }}
                        />
                    </TouchableOpacity>
                }
            </View>
        )
    }
}