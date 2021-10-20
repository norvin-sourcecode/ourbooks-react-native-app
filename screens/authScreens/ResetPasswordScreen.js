import React, {useState} from "react";
import {useEffect} from "react";
import {SafeAreaView, Text, View} from "react-native";
import { connect } from "react-redux";
import {Button, Input} from "react-native-elements";
import {AntDesign} from "@expo/vector-icons";

const ResetPasswordScreen = (props) => {
    return (
        <View>
            <Text navigation={props.navigation}>ResetPasswordScreen</Text>
        </View>
    );
}

export default ResetPasswordScreen