
import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View, VirtualizedList} from 'react-native';
import {Button, Card, Divider, ListItem, Overlay} from "react-native-elements";
import {Entypo, Ionicons, MaterialIcons} from "@expo/vector-icons";
import {getBibs, getUserBibBooks, setShownBib, setShownBook} from "../reducers/appSlice";
import {connect} from "react-redux";

const CustomFrienRequestButton = (props) => {

    const [freundschaftsanfrageSendenButtonSwitcher, setFreundschaftsanfrageSendenButtonSwitcher] = useState(false)

    const checker = () => {
        setFreundschaftsanfrageSendenButtonSwitcher(!freundschaftsanfrageSendenButtonSwitcher)
        return freundschaftsanfrageSendenButtonSwitcher ? props.onPressAbortRequest() : props.onPressSend()
    }

    const styleChecker = () => {
        return freundschaftsanfrageSendenButtonSwitcher ? {backgroundColor:"#aeb4b4", width: 185} : {backgroundColor:"#2b2e32", width: 185}
    }

    return (
        <View>
            <Button title={freundschaftsanfrageSendenButtonSwitcher ? "Freundschaftsanfrage gesendet" : "Freundschaftsanfrage senden"} titleStyle={{fontSize: 12}} raised={true} onPress={checker} buttonStyle={styleChecker()} />
        </View>
    )
};


const mapStateToProps = state => {
    return {
    }
}

const mapDispatchToProps = dispatch => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(CustomFrienRequestButton)