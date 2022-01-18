
import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View, VirtualizedList} from 'react-native';
import {Button, Card, Divider, ListItem, Overlay} from "react-native-elements";
import {connect} from "react-redux";
import {AntDesign} from "@expo/vector-icons";
import ListProcess from "./ListProcess";
import {respondAusleihenRequest, respondFriendRequest} from "../reducers/appSlice";

const BookCover = (props) => {

    const getWH = () => {
        props.ratio
    }

    return (
        <View>
            <Image style={{width: 75, height:110}} resizeMode="contain" source={{url:props.url}} />
        </View>
    )
};


const mapStateToProps = state => {
    return {
    }
}

const mapDispatchToProps = dispatch => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(BookCover)