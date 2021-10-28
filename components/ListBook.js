
import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View, VirtualizedList} from 'react-native';
import {Card, Divider, ListItem, Overlay} from "react-native-elements";
import {Entypo, Ionicons, MaterialIcons} from "@expo/vector-icons";
import {getBibs, getUserBibBooks, setShownBib, setShownBook} from "../reducers/appSlice";
import {connect} from "react-redux";

const ListBook = (props) => {

    function handleBookPress(book) {
        props.setShownBookDispatch(book)
        props.navigation.navigate("book")
    }

    return (
        <View>
            <TouchableOpacity key={props.index+"touch-flaeche-book-listitem"} onPress={() => {
                handleBookPress(props.b)
            }}>
                <ListItem bottomDivider>
                    <ListItem.Content>
                        <ListItem.Title>Titel: {props.b.titel}</ListItem.Title>
                        <ListItem.Subtitle>Author*in: {props.b.authorName}</ListItem.Subtitle>
                        <ListItem.Subtitle>ISBN: {props.b.isbn}</ListItem.Subtitle>
                        <ListItem.Subtitle>Erscheinungsdatum: {props.b.erscheinungsDatum}</ListItem.Subtitle>
                    </ListItem.Content>
                    <ListItem.Chevron />
                </ListItem>
            </TouchableOpacity>
        </View>
    )
};


const mapStateToProps = state => {
    return {
    }
}

const mapDispatchToProps = dispatch => ({
    setShownBookDispatch(book) {
        dispatch(setShownBook(book))
    },
})

export default connect(mapStateToProps, mapDispatchToProps)(ListBook)