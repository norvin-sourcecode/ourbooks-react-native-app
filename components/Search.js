import React, {useState} from "react";
import {useEffect} from "react";
import {RefreshControl, ScrollView, Text, TouchableOpacity, View, VirtualizedList} from "react-native";
import { connect } from "react-redux";
import {Badge, Button, ButtonGroup, Divider, Input, ListItem, SearchBar} from 'react-native-elements';
import {AntDesign} from "@expo/vector-icons";
import {clearSearch, getBookByIsbn, searchBookByTitle, setShownBook} from "../reducers/appSlice";

const Search = (props) => {

    const [search,setSearch] = useState("")
    const [searchResults, setSearchResults] = useState([])
    const [noSearchResults, setNoSearchResults] = useState(false)

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
                        console.log("searchTargetKind:2")
                    }
                }}
                value={search}
                platform={"ios"}
                cancelButtonTitle="abbrechen"
                cancelButtonProps={props.cancelButtonProps}
            />
            <VirtualizedList
                data={searchResults}
                initialNumToRender={4}
                renderItem={({item, index}) =>
                    <View>
                        {props.searchTargetKind === 1 &&
                            <Text>{index}: {item.titel}</Text>
                        }
                        {props.searchTargetKind === 2 &&
                            <Text>{index}: {item.username}</Text>
                        }
                    </View>
                }
                keyExtractor={(item, index)=> 'key'+index+Math.random()}
                getItemCount={getItemCount}
                getItem={getItem}
            />
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
})

export default connect(mapStateToProps, mapDispatchToProps)(Search)