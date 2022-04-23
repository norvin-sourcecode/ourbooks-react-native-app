
import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View, VirtualizedList} from 'react-native';
import {Button, Card, Divider, ListItem, Overlay} from "react-native-elements";
import {AntDesign, Entypo, Ionicons, MaterialIcons} from "@expo/vector-icons";
import {
    deleteFriend,
    getBibs,
    getBooksForBib, getBooksOfUser,
    getFriendById,
    getUserBibBooks,
    respondFriendRequest,
    setShownBib,
    setShownBook
} from "../reducers/appSlice";
import {connect} from "react-redux";
import BookCover from "./BookCover";

const CustomFeedItem = (props) => {

    const [feedPostOverlayVisible, setFeedPostOverlayVisible] = useState(false);

    useEffect(() => {
        console.log(props.item)
        if (props.item.kind === 0) {       //bibs

        }
        if (props.item === 1) {       //friends

        }
        if (props.item === 2) {       //friendrequests

        }
        if (props.item === 3) {       //bibRequests

        }
    },[props.item, props.bibs])

    function handleFeedPress(book) {
        props.setShownBookDispatch(book)
        props.navigation.navigate("book")
    }

    function postTime() {
        const timeCreated =  Math.floor((new Date().getTime() - props.item.timeCreated) / (60*60*24*1000))
        if ( timeCreated < 1) {
            return Math.floor(24 * timeCreated) + "h"
        } else {
            return timeCreated+"d"
        }
    }

    const FeedPost = ({ book, index}) => (
        <ListItem key={index+"list-item-home-userBib-booksList"} containerStyle={{backgroundColor: "transparent"}}>
            <Card key={index+"list-item-card-home-userBib-booksList"} containerStyle={{margin: 0, padding: 0}}>
                <TouchableOpacity key={index+"touch-flaeche-home-userBib-booksList"} onPress={() => {
                    handleFeedPress(book)
                }}>
                    <View>
                        {book.pictureUrl.length === 0 &&
                        <View style={{justifyContent: "center",width: 75, height: 110}}>
                            <Text style={{alignSelf: "center"}}>Titel:</Text>
                            <Text> </Text>
                            <Text style={{alignSelf: "center"}}>{book.titel}</Text>
                        </View>
                        }
                        {book.pictureUrl.length !== 0 &&
                            <BookCover url={book.pictureUrl} ratio={book.ratio}/>
                        // <Card.Image style={{width: 75, height:110}} resizeMode="contain" source={{url:book.pictureUrl}}>
                        // </Card.Image>
                        }
                    </View>
                </TouchableOpacity>
            </Card>
            <Text style={{fontSize: 18, textAlign:'center', flex:1}}>{props.item.message}</Text>
            <Text style={{fontSize: 11, textAlign:'right'}}>{postTime()}</Text>
        </ListItem>
    );

    return (
        <View key={props.index+"feedListItem"} style={{ paddingLeft: 2, paddingRight: 2 }}>
            <Card containerStyle={{padding: 0, paddingTop: 0, margin:8, marginBottom:0, borderWidth:0, backgroundColor: "white", borderRadius:10}}>
                <FeedPost book={props.item.book} index={props.index}/>
            </Card>
        </View>
    )
};


const mapStateToProps = state => {
    return {
        user: state.appReducer.user,
    }
}

const mapDispatchToProps = dispatch => ({
    setShownBookDispatch(book) {
        dispatch(setShownBook(book))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(CustomFeedItem)