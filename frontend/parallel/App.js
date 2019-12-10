import React from 'react';
import {Animated, Dimensions, StyleSheet, View} from 'react-native';
import MapView from 'react-native-maps';
// import $ from 'jquery';
import {meters} from './data/meters.js';

export default class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            markers: [],
            meters: [],
        };
    }

    getTheDatas() {
        console.log(meters[0]['geom']['coordinates']);
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

    componentDidMount() {
        this.fetchMarkerData();
        this.getTheDatas();
    }

    render() {
        return (
            <MapView
                style={{flex: 1}}
                region={{
                    latitude: 40.813618,
                    longitude: -96.702599,
                    latitudeDelta: 0.0222,
                    longitudeDelta: 0.0221,
                }}
            >
                {this.state.isLoading ? null : this.state.meters.map((meter, index) => {
                    // console.log(this.state.meters);
                    const coords = {
                        latitude: meter['geom']['coordinates'][1],
                        longitude: meter['geom']['coordinates'][0],
                    };

                    const metadata = `Status: hi\nOther: hello`;
                    const title = 'title';

                    return (
                        <MapView.Marker
                            key={index}
                            coordinate={coords}
                            title={title}
                            description={metadata}
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
