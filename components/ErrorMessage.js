import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { Overlay} from "react-native-elements";

const ErrorMessage = ({ error, visible }) => {
    if (!error || !visible) {
        return null;
    }
    return <Overlay style={styles.errorOverlay} isVisible={visible}><Text style={styles.errorText}>{error}</Text></Overlay>;
};

const styles = StyleSheet.create({
    errorOverlay: {
        width: "100%",
        height: "100%",
        justifyContent: "center"
    },
    errorText: {
        color: '#d53535',
        fontSize: 20,
        fontWeight: 'bold'
    }
});

export default ErrorMessage;