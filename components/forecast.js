const React = require('react-native');
const {
    StyleSheet,
    Text,
    View
    } = React;


const Forecast = ({main, description, temp}) => {
    return (
        <View>
            <Text style={styles.bigText}>
                {main}
            </Text>
            <Text style={styles.mainText}>
                {`Current conditions: ${description}`}
            </Text>
            <Text style={styles.bigText}>
                {temp}°C
            </Text>
        </View>
    )
};

const styles = StyleSheet.create({
    bigText: {
        flex: 2,
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
        color: '#FFFFFF'
    },
    mainText: {
        flex: 1,
        fontSize: 16,
        textAlign: 'center',
        color: '#FFF'
    }
});

module.exports = Forecast;
