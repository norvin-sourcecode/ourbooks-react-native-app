import React, {useState} from "react";
import {useEffect} from "react";
import {RefreshControl, ScrollView, Text, TouchableOpacity, View, VirtualizedList} from "react-native";
import { connect } from "react-redux";
import {Avatar, Badge, Button, ButtonGroup, Card, Divider, Input, ListItem, SearchBar} from 'react-native-elements';
import {AntDesign} from "@expo/vector-icons";
import {
    clearSearch,
    getBookByIsbn,
    searchBookByTitle,
    searchUserByUsername,
    setShownBook,
    setShownFriend
} from "../reducers/appSlice";
import CustomFrienRequestButton from "./CustomFrienRequestButton";
import Svg, {G, Polygon, Text as SvgText} from "react-native-svg";

const Ribbon = (props) => {

    return (
        <View style={props.containerStyle}>
            <Svg height="70" width="70">
                <Polygon points="0 0, 70 70, 70 40, 30 0" fill="darkgreen" strokeWidth="0" />
                <G rotation="45" origin="130, -20">
                    <SvgText x="100" y="80" fill="white" stroke="white" textAnchor="middle">
                        verfügbar
                    </SvgText>
                </G>
            </Svg>
        </View>
    )
}

const mapStateToProps = state => {
    return {
    }
}

const mapDispatchToProps = dispatch => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(Ribbon)