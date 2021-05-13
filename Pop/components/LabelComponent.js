import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { SafeAreaView, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'
import RNFetchBlob from 'rn-fetch-blob';
import { heightToDp, widthToDp } from '../Responsive';

var Sound = require('react-native-sound');
export default class LabelComponent extends React.Component {
    state = {};

    checkAudioFileExistence = async (audio) => {
        let files = await RNFetchBlob.fs.ls(RNFetchBlob.fs.dirs.PictureDir);
        if(files.includes("/storage/emulated/0/Pictures/pop/image_" + audio)) {
            return true;
        } else {
            return false;
        }
    }
    
    playSound = (audio) => {
        if(this.checkAudioFileExistence(audio)) {
            var sound = new Sound("/storage/emulated/0/Pictures/pop/image_" + audio, Sound.MAIN_BUNDLE, (error) => {
            if (error) {
                console.log('failed to load the sound', error);
                return;
            }
            // loaded successfully
            console.log(
                'duration in seconds: ' + sound.getDuration() + 
                ', number of channels: ' + sound.getNumberOfChannels()
            );
            
            // Play the sound with an onEnd callback
            sound.play((success) => {
                if (success) {
                    console.log('successfully finished playing');
                } else {
                    console.log('playback failed due to audio decoding errors');
                }
            });
            });
        } else return;
    }

    setAudio = async () => {
        try {
            let language = await AsyncStorage.getItem('language')
            let offlineData = JSON.parse(await AsyncStorage.getItem("offlineData"));
            switch(language) {
                case "en" : 
                    this.setState({stepAudio: offlineData[0][this.props.asyncKey][this.props.index].audioEnglish})
                    break;
                case "hi" :
                    this.setState({stepAudio: offlineData[0][this.props.asyncKey][this.props.index].audioHindi})
                    break;
                case "ho" :
                    this.setState({stepAudio: offlineData[0][this.props.asyncKey][this.props.index].audioHo})
                    break;
                case "od" :
                    this.setState({stepAudio: offlineData[0][this.props.asyncKey][this.props.index].audioOdia})
                    break;
                case "san" :
                    this.setState({stepAudio: offlineData[0][this.props.asyncKey][this.props.index].audioSanthali})
                    break;
                default: 
                    break;
            }
        } catch (e) {
            console.log(e);
        }
    }
    componentDidMount = () => !this.props.directData ? this.setAudio() : false

    render = () => (
        <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginHorizontal: widthToDp("3%"), 
            marginVertical: heightToDp(`${this.props.directData ? (this.props.marginVertical ? 1 : ((this.props.isAudioHaving) ? .8 : 1)) : 1.5}%`)
        }}>
            <Text 
                style={{ 
                    color: "#fff", 
                    width: widthToDp(`${
                        this.props.directData ? this.props.labelWidth :
                        this.state.stepAudio ? 77 : 85}%`
                    ),
                    fontSize: widthToDp("4.2%"), 
                    fontFamily: 'Oswald-Medium' 
                }}
            >
                {this.props.directData ? this.props.labelName : this.props.stepName}
            </Text>
            {
                this.props.isAudioHaving &&
                <TouchableOpacity 
                    style={{width: widthToDp(`${this.props.directData ? 15 : 20}%`)}}
                    onPress={
                        !this.props.directData ? () => this.playSound(this.state.stepAudio) :
                        () => this.playSound(this.props.audioFile)
                    }
                >
                    <Icon
                        name="microphone"
                        size={30}
                        color={"#fff"}
                        // onPress={this.playSound}
                    />
                </TouchableOpacity>
            }            
        </View>
    )
}