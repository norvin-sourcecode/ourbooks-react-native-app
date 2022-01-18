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

const Search = (props) => {

    const [search,setSearch] = useState("")
    const [searchResults, setSearchResults] = useState([])
    const [noSearchResults, setNoSearchResults] = useState(false)
    const [openOverlay, setOpenOverlay] = useState(false)

    useEffect(() => {
        if (props.searchTargetKind === 1) {
            if (props.search.search1.searchResultsList.length === 0) {
                //no Results absicherung 1 TODO
            }
            setSearchResults(props.search.search1.searchResultsList)
            console.log(props.search.search1.searchResultsList)
        }
    }, [props.search.search1.searchResultsList])

    useEffect(() => {
        if (props.searchTargetKind === 2) {
            if (props.search.search2.searchResultsList.length === 0) {
                //no Results absicherung 2 TODO
            }
            setSearchResults(props.search.search2.searchResultsList)
            console.log(props.search.search2.searchResultsList)
        }
    }, [props.search.search2.searchResultsList])

    function getItem (d, index) {
        return d[index]
    }

    function getItemCount (d) {
        return d.length
    }

    return (
        <View style={{ height:"100%", width:"100%"}}>
            <SearchBar
                containerStyle={{alignSelf: "center",paddingRight:3, paddingLeft:3, height:50, backgroundColor: "transparent",paddingTop:24, paddingBottom:20}}
                inputStyle={{height:35, color: "white"}}
                style={{height:35}}
                leftIconContainerStyle={{color: "white"}}
                inputContainerStyle={{height:35, backgroundColor:"#565a63"}}
                placeholder="suche..."
                onChangeText={value => {
                    setSearch(value)
                    if (props.searchTargetKind === 1) {    //1 = bookByTitle
                        props.searchBookByTitleDispatch(search)
                        console.log("searchTargetKind:1")
                    }
                    if (props.searchTargetKind === 2) {    //2 = UserByUsername
                        //props.searchUserByNameDispatch(search)
                        props.searchUserByUsernameDispatch(search)
                        console.log("searchTargetKind:2")
                    }
                }}
                value={search}
                platform={"ios"}
                cancelButtonTitle="abbrechen"
                cancelButtonProps={props.cancelButtonProps}
            />
            <View style={{height:"69%"}}>
                <VirtualizedList
                    style={{paddingTop:15}}
                    data={searchResults}
                    initialNumToRender={9}
                    renderItem={({item, index}) =>
                        <View>
                            {props.searchTargetKind === 1 &&
                                <View>
                                    <View key={index+"list-item-saved-book"} style={{ paddingLeft: 5, paddingRight: 5 }}>
                                        <Card containerStyle={{padding: 0, paddingTop: 0, margin:8, marginBottom:0, borderWidth:0, backgroundColor: "white", borderRadius:10, height:104}}>
                                            <TouchableOpacity onPress={()=> {
                                                props.setShownBookDispatch(item)
                                                props.onBookPress()

                                            }}>
                                                <View style={{flexDirection: "row", height:110}}>
                                                    <View style={{top:-3, left:0}}>
                                                        {item.pictureUrl.length === 0 &&
                                                            <View style={{justifyContent: "center",width: 75, height: 110}}>
                                                                <Text style={{alignSelf: "center"}}>Titel:</Text>
                                                                <Text> </Text>
                                                                <Text style={{alignSelf: "center"}}>{item.titel}</Text>
                                                            </View>
                                                        }
                                                        {item.pictureUrl.length !== 0 &&
                                                            <Card.Image style={{width: 75, height:110, borderBottomLeftRadius:13, borderTopLeftRadius:13}} resizeMode="contain" source={{url:item.pictureUrl}}>
                                                            </Card.Image>
                                                        }
                                                    </View>
                                                    <View style={{flexDirection: "column",justifyContent: "center"}}>
                                                        <Text numberOfLines={1} adjustsFontSizeToFit={true} style={{flexWrap: "nowrap",padding: 10,top:-3, right:-53,alignSelf:"center", fontWeight: "bold", color:"#2b2e32", fontSize: 20}}>{item.titel}</Text>
                                                        <View style={{paddingLeft: 5,paddingTop:5, top:-3, alignSelf:"center", right:-53, alignItems: "center"}}>
                                                            <Text>ISBN: {item.isbn}</Text>
                                                            <Text>Author*in: {item.authorName}</Text>
                                                            <Text>Erscheinungsdatum: {item.erscheinungsDatum}</Text>
                                                        </View>
                                                    </View>
                                                </View>
                                            </TouchableOpacity>
                                        </Card>
                                    </View>
                                </View>
                            }
                            {props.searchTargetKind === 2 &&
                                <View key={index+"list-item-"+Math.random()} style={{paddingLeft: "2.5%", paddingRight:"2.5%", paddingBottom:"5%"}}>
                                    {/*<TouchableOpacity onPress={()=> {*/}
                                    {/*    props.setShownFriendDispatch(item)*/}
                                    {/*    props.onUserPress()*/}

                                    {/*}}>*/}
                                    {/*</TouchableOpacity>*/}
                                    <View style={{backgroundColor: "white", borderRadius: "7.5%"}}>
                                        <View style={{flexDirection:"row",alignItems: "center", justifyContent:"space-between"}}>
                                            <View style={{flexDirection:"row",alignItems: "center"}}>
                                                <Avatar
                                                    containerStyle={{padding: "5%"}}
                                                    rounded
                                                    size="medium"
                                                    source={require("../assets/avatar-placeholder.png")}
                                                />
                                                <Text>{item.username}</Text>
                                            </View>
                                            <View style={{paddingRight: "2.5%"}}>
                                                <CustomFrienRequestButton onPressSend={()=>{console.log("2")}}onPressAbortRequest={()=>{console.log("1")}} />
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            }
                        </View>
                    }
                    keyExtractor={(item, index)=> 'key'+index+Math.random()}
                    getItemCount={getItemCount}
                    getItem={getItem}
                />
            </View>
        </View>
    )
}

const mapStateToProps = state => {
    return {
        book: state.appReducer.book,
        search: state.appReducer.search
    }
}

const mapDispatchToProps = dispatch => ({
    clearSearchDispatch(searchNumber) {
        dispatch(clearSearch(searchNumber))
    },
    searchBookByTitleDispatch(title) {
        dispatch(searchBookByTitle({title:title}))
    },
    setShownBookDispatch(book) {
        dispatch(setShownBook(book))
    },
    setShownFriendDispatch(friend) {
        dispatch(setShownFriend(friend))
    },
    searchUserByUsernameDispatch(username) {
        dispatch(searchUserByUsername({username:username}))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Search)