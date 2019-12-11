import React from 'react';
import {Button, Dimensions, StyleSheet, Switch, Text, View} from 'react-native';
import MapView from 'react-native-maps';
import {meters} from './data/meters.js';
import Constants from 'expo-constants';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import getDirections from 'react-native-google-maps-directions';

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
            },
            switchValue: false,
        };
    }

    getTheDatas() {
        // console.log(meters[0]['geom']['coordinates']);
        this.setState({meters: meters})
    }

    handleGetDirections(coords) {
        const data = {
            source: null,
            destination: {...coords},
            params: [
                {
                    key: "travelmode",
                    value: "driving"        // may be "walking", "bicycling" or "transit" as well
                },
            ],
            waypoints: []
        }

        getDirections(data)
    }

    calloutPressed(coords) {
        console.log("CALLOUT PRESSED")
        this.handleGetDirections(coords);
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

    _handleToggleSwitch = () =>
        this.setState(state => ({
            switchValue: !state.switchValue,
        }));

    renderContent = () => {
        return (
            <View>
                <Text>Get directions to your location</Text>

            </View>
        )
    }

    render() {
        // console.log("RE-RENDERING");
        return (
            <MapView
                style={{flex: 1}}
                region={this.state.region}
                showsUserLocation={true}
            >
                {this.state.meters.map((meter, index) => {
                    if (index % 2 === 0 && (!this.state.switchValue ? true : (meter['handicap'] ? true : false))) {

                        // console.log(this.state.meters);
                        const coords = {
                            latitude: meter['geom']['coordinates'][1],
                            longitude: meter['geom']['coordinates'][0],
                        };

                        const a_st = meter['a_st'];
                        const title = a_st ? `${a_st} Street Meter` : 'Parking Meter';

                        const handicap = meter['handicap'];


                        var today = new Date();

                        const space = meter['space'] ? `${meter['space']} parking` : 'Parallel parking'

                        var time = today.toLocaleString('en-US', {hour: 'numeric', minute: 'numeric', hour12: true})

                        // const title = `${a_st ? a_st: }`;
                        const description = `${handicap ? 'Handicap\n' : 'Standard\n'}\n8am-6pm Mon-Sat\nCurrent time: ${time}\nCoords: (${coords['latitude'].toString().substring(0, 5)}, ${coords['longitude'].toString().substring(0, 5)})\n${space}`;

                        return (
                            <MapView.Marker
                                key={index}
                                coordinate={coords}
                                title={title}
                                description={description}
                                showsMyLocationButton={true}
                            >

                                <View style={[styles.markerWrap]}>
                                    <View
                                        style={handicap ? {...styles.marker, backgroundColor: "red"} : styles.marker}/>
                                </View>

                                <MapView.Callout
                                    onPress={() => {
                                        console.log("CALLOUT PRESSED")
                                    }}
                                    style={styles.calloutStyles}
                                >
                                    <Text style={styles.calloutTitle}>
                                        {title}
                                    </Text>
                                    <Text style={styles.calloutText}>
                                        {description}
                                    </Text>
                                    <Button title={'Get Directions'}
                                            onPress={() => this.calloutPressed(coords)}
                                    />
                                </MapView.Callout>
                            </MapView.Marker>
                        );
                    }
                })}

                <View style={{
                    position: 'absolute',
                    bottom: 0,
                    width: Dimensions.get('window').width,
                    height: 60,
                    backgroundColor: "rgba(255,255,255, 0.9)",
                    borderRadius: '10 10 0 0'
                }}/>

                <Text style={{position: 'absolute', bottom: 18, right: 70, fontSize: 22, color: "rgba(0,0,0, 0.5)"}}>Toggle
                    Handicapped</Text>
                <Switch
                    onValueChange={this._handleToggleSwitch}
                    value={this.state.switchValue}
                    trackColor={'blue'}
                    style={{position: 'absolute', bottom: 15, right: 10}}
                />

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
        zIndex: 1,
    },
    calloutTitle: {
        textAlign: 'left',
        fontWeight: 'bold',
        fontSize: 16
    },
    calloutText: {
        textAlign: 'left',
        // fontWeight: 'bold',
    },
    calloutStyles: {
        width: 200,
        flex: 1,
        // position: 'relative',
    },
    buttonContainer: {
        zIndex: 10,
        elevation: 10,
        top: 30,
    },
    button: {
        color: 'black',
        backgroundColor: 'black',
    }
});
