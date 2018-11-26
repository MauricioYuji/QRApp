import React, { Component } from 'react';
import { Text, View, StyleSheet, Alert, Dimensions, Linking } from 'react-native';
import { Constants, BarCodeScanner, Permissions, CameraFillMode } from 'expo';

export default class LinksScreen extends Component {
    static navigationOptions = {
        header: null,
    };
    state = {
        hasCameraPermission: null
    };

    componentDidMount() {
        this._requestCameraPermission();
    }

    _requestCameraPermission = async () => {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({
            hasCameraPermission: status === 'granted',
        });
    };

    _handleBarCodeRead = data => {
        //Alert.alert(
        //    'Scan successful!',
        //    JSON.stringify(data)
        //);
        console.log(data.data);
        Linking.openURL(data.data);
    };
    render() {
        const { width, height } = Dimensions.get('window');
        return (
            <View style={styles.container}>
                {this.state.hasCameraPermission === null ?
                    <Text>Requesting for camera permission</Text> :
                    this.state.hasCameraPermission === false ?
                        <Text>Camera permission is not granted</Text> :
                        <BarCodeScanner
                            onBarCodeRead={this._handleBarCodeRead}
                            style={{ width, height }}
                            onException={this.handleException}
                            cameraFillMode={"fit"}
                        />
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ecf0f1',
    }
});
