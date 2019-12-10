import React from 'react';
import {Animated, Dimensions, StyleSheet, View} from 'react-native';
import MapView from 'react-native-maps';
// import $ from 'jquery';
import {meters} from './data/metersShort.js';
import Constants from 'expo-constants';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

export default class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            markers: [],
            meters: [],
            userLocation: null,
            region: {
                latitude: 40.813618,
                longitude: -96.702599,
                latitudeDelta: 0.0222,
                longitudeDelta: 0.0221,
            }
        };
    }

    getTheDatas() {
        // console.log(meters[0]['geom']['coordinates']);
        this.setState({meters: meters})


    }

    fetchMarkerData() {
        fetch('https://feeds.citibikenyc.com/stations/stations.json')
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    isLoading: false,
                    markers: responseJson.stationBeanList,
                });
            })
            .catch((error) => {
                console.log(error);
            });
    }

    _getLocationAsync = async () => {
        let {status} = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
            this.setState({
                errorMessage: 'Permission to access location was denied',
            });
        }

        let location = await Location.getCurrentPositionAsync({});
        console.log(location['coords']);
        this.setState({
            region: {
                latitude: location['coords']['latitude'],
                longitude: location['coords']['longitude'],
                latitudeDelta: 0.0222,
                longitudeDelta: 0.0221,
            }
        });
    };

    componentDidMount() {
        this.fetchMarkerData();
        this.getTheDatas();

        if (Platform.OS === 'android' && !Constants.isDevice) {
            this.setState({
                errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
            });
        } else {
            this._getLocationAsync();
        }
    }

    render() {
        // console.log("RE-RENDERING");
        return (
            <MapView
                style={{flex: 1}}
                region={this.state.region}
                showsUserLocation={true}
            >
                {this.state.isLoading ? null : this.state.meters.map((meter, index) => {
                    // console.log(this.state.meters);
                    const coords = {
                        latitude: meter['geom']['coordinates'][1],
                        longitude: meter['geom']['coordinates'][0],
                    };

                    const description = `Status: hi\nOther: hello`;
                    const title = 'titles';

                    return (
                        <MapView.Marker
                            key={index}
                            coordinate={coords}
                            title={title}
                            description={description}
                        >

                            <Animated.View style={[styles.markerWrap]}>
                                <View style={styles.marker}/>
                            </Animated.View>
                        </MapView.Marker>
                    );
                })}

            </MapView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    mapStyle: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    marker: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: "rgba(130,4,150, 0.9)",
    },
    markerWrap: {
        alignItems: "center",
        justifyContent: "center",
    },
});
