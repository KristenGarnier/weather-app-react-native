/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
const Forecast = require('./components/forecast');
var {
    StyleSheet,
    Text,
    View,
    TextInput,
    Image
    } = React;

var WeatherProject = React.createClass({
    getInitialState(){
        return {
            zip: '',
            forecast: null,
            error: null
        }
    },
    render() {
        let content = null, displayError = null;
        if (this.state.forecast !== null) {
            content = <Forecast main={this.state.forecast.main}
                                description={this.state.forecast.description}
                                temp={this.state.forecast.temp}/>;
        }

        return (
            <View style={styles.container}>
                <Image
                    source={this.state.forecast !== null ? this._imageState(this.state.forecast.main) : this._imageState('none')}
                    resizeMode="cover"
                    style={styles.backdrop}>
                    <View style={styles.overlay}>
                        { this.state.error !== null ?
                            <Text style={styles.textError}>
                                {this.state.error}
                            </Text>
                            : null }
                        <View style={styles.row}>
                            <Text style={styles.mainText}>
                                Current weather for
                            </Text>
                            <View style={styles.zipContainer}>
                                <TextInput style={[styles.zipCode, styles.mainText]}
                                           onSubmitEditing={this._handleTextChange}
                                            autoCorrect={false}
                                />
                            </View>
                        </View>
                        {content}
                    </View>
                </Image>
            </View>
        );
    },
    _handleTextChange(event){
        const zip = event.nativeEvent.text;
        if(!Number.isInteger(Number(zip))){
            this.setState({
                zip: zip
            });

            fetch(`http://api.openweathermap.org/data/2.5/weather?q=${zip}&units=metric&APPID=abbba24e579d0e8961e400dec6240d75`)
                .then(res => res.json())
                .then(resJson => {
                    console.log(resJson);
                    this.setState({
                        forecast: {
                            main: resJson.weather[0].main,
                            description: resJson.weather[0].description,
                            temp: resJson.main.temp
                        },
                        error: null
                    });
                })
                .catch(err => {
                    this.setState({
                        error: 'Impossible to find town'
                    });
                    return console.warn(err)
                });
        } else {
            this.setState({
                error: 'Wrong city name format'
            });
        }

    },

    _imageState(action){
        switch (action.toLowerCase()) {
            case 'clouds':
                return require('./img/cloudy.jpg');
                break;
            case 'rain':
                return require('./img/rain.jpg');
                break;
            case 'clear':
                return require('./img/clear.jpg')
            default:
                return require('./img/sun_flowers.png');
                break;
        }
    }
});

const baseFontSize = 16;
var styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    input: {
        fontSize: 20,
        borderWidth: 2,
        height: 40,
    },
    overlay: {
        paddingTop: 5,
        backgroundColor: '#000000',
        opacity: 0.5,
        flexDirection: 'column',
        alignItems: 'center'
    },
    row: {
        padding: 30
    },
    zipCode: {
        width: 150,
        height: baseFontSize,
        color: '#FFFFFF',
        textAlign: 'center'
    },
    zipContainer: {
        flex: 1,
        borderBottomColor: '#DDDDDD',
        borderBottomWidth: 1,
        marginLeft: 5,
        marginTop: 3
    },
    mainText: {
        flex: 1,
        fontSize: baseFontSize,
        color: '#FFFFFF',
        textAlign: 'center'
    },
    textError: {
        flex: 1,
        fontSize: baseFontSize - 2,
        color: '#FF0000',
        marginTop: 50
    },
    backdrop: {
        flex: 1,
        flexDirection: 'column'
    }
});

module.exports = WeatherProject;

