import React, {useRef, useState} from "react";
import {useEffect} from "react";
import {Text, TouchableOpacity, View, Image, ActivityIndicator, Easing, Alert, ScrollView} from "react-native";
import { connect } from "react-redux";
import {AntDesign, FontAwesome, Ionicons} from "@expo/vector-icons";
import {Divider, CheckBox, Button, Overlay, ButtonGroup, Card, Tooltip} from "react-native-elements";

import {Picker} from "@react-native-picker/picker";
import DropDownPicker from 'react-native-dropdown-picker';
import {AnimatedCircularProgress} from "react-native-circular-progress";
import Animated, {cancelAnimation, useSharedValue} from "react-native-reanimated";
import {Circle} from "react-native-svg";
import {deleteBookFromSaved, deleteBookFromUserBib, saveBook} from "../reducers/appSlice";

const Book = (props) => {



    const [saved, setSaved] = useState(false)
    const [inUserBib, setInUserBib] = useState(false)
    const [available, setAvailable] = useState(false)

    const [visible, setVisible] = useState(false);
    const [targetBook, setTargetBook] = useState({})

    const [loading, setLoading] = useState(false);

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
        {label: 'ilker', value: 'ilker'},
        {label: 'yannick', value: 'yannick'},
        {label: 'gianluca', value: 'gianluca'}
    ]);

    useEffect(() => {
        if (!props.book.loading) {
            if(props.userBib.booksList.some(book => book.id === props.book.id)){
                setInUserBib(true)
            } else{
                setInUserBib(false)
            }
            console.log(props.saved.booksList)
            console.log(props.book)
            if(props.saved.booksList.some(book => book.isbn === props.book.isbn)) {
                setSaved(true)
            } else {
                console.log(props.book.isbn)
                setSaved(false)
            }
            if (props.book.availableAt.length !== 0) {
                setAvailable(true)
            } else {
                setAvailable(false)
            }
            setTargetBook(props.book)
            setLoading(false)
        } else {
            console.log("hier")
            setLoading(true)
        }
    }, [props.saved, props.book, props.book.loading, props.userBib.booksList, props.book.availableAt])

    useEffect(() => {
        setTargetBook(props.book)
    },[props.book])

    const toggleOverlay = () => {
        setVisible(!visible);
    };

    function savedCheckedBoxPressed() {
        if (!saved) {
            props.saveBookDispatch(targetBook.isbn)
        }
        if (saved) {
            props.deleteBookFromSavedDispatch(targetBook.id)
        }
        setSaved(!saved)
    }

    function checkBoxUserBibOnPress() {
        // if (!inUserBib) {
        //     props.addBookToUserBibDispatchAusloeser(props.Communication.urlBase, props.Communication.conf, {
        //         auflage: targetBook.auflage,
        //         authorName: targetBook.authorName,
        //         erscheinungsDatum: targetBook.erscheinungsDatum,
        //         id: 0,
        //         isbn: targetBook.isbn,
        //         sprache: targetBook.sprache,
        //         status: 0,
        //         timeCreated: "0",
        //         titel: targetBook.titel,
        //         pictureUrl: targetBook.pictureUrl,
        //     })
        // }
        // if (inUserBib) {
        //     console.log(targetBook.id)
        //     props.deleteBookByIdFromServerDispatchAusloeser(props.Communication.urlBase,props.Communication.conf, targetBook.id)
        // }
        setInUserBib(!inUserBib)
    }

    function handelAnfageSchickenButtonOnPress() {
        console.log("anfrage schicken an "+value)
        // props.sendGetBookRequestDispatchAusloeser(props.Communication.urlBase, props.Communication.conf, valueBookId, valueUsername)
    }

    function checkBoxAvaliablOnPress() {
        setAvailable(!available)
    }

    function handleRemoveBookFromUserBibPressed() {
        Alert.alert(
            "Buch entfernen",
            "Möchten Sie das Buch wiklich aus dem Bücherregal entfernen?",
            [
                {
                    text: "abbrechen",
                },
                {
                    text: "OK",
                    onPress: () => props.deleteBookFromUserBibDispatch(targetBook.id)

                },
            ],
            { cancelable: false }
        );
    }

    return (
        <View style={{flex: 1, alignItems: "center", width: "100%"}}>
            <View style={{paddingLeft: 10,paddingTop: 10,paddingRight: 10,width:"100%" ,flexDirection: "row", justifyContent: "space-between"}}>
                <View>
                    <Text onPress={() => props.navigation.navigate('main')} style={{color: "#565a63", fontSize:15,left: 6,top:4, textDecorationLine: 'underline', fontWeight: "bold"}}>schließen</Text>
                </View>
                <View style={{flexDirection: "row"}}>
                    <Ionicons style={{top: 2,right: 9}} name="share-outline" size={36} color="black" />
                    <CheckBox
                        containerStyle={{top: 5,padding: 0, margin: 0}}
                        center
                        checkedIcon={<FontAwesome name="bookmark" size={35} color="black" />}
                        uncheckedIcon={<FontAwesome name="bookmark-o" size={35} color="black" />}
                        onPress={savedCheckedBoxPressed}
                        checked={saved}
                    />
                </View>
            </View>
            <View>
                <Card containerStyle={{alignSelf: "center",padding: 0}}>
                    <Card.Image style={{alignSelf: "center",width: 128, height:200}}  resizeMode="cover" source={{url:props.book.pictureUrl}}/>
                </Card>
                <Text style={{position: "absolute",top: 85,left: 163, fontWeight: "bold", color: "#2b2e32", fontSize: 12}}>Verfügbarkeit:</Text>
                { inUserBib &&
                <View>
                    <Ionicons style={{position: "absolute", bottom: 60, right: -75}} name="library" size={50} color="black" />
                    <Text style={{position: "absolute", bottom: 40, right: -80, textDecorationLine: "underline", color: "red"}} onPress={()=>{handleRemoveBookFromUserBibPressed()}}>entfernen</Text>
                </View>
                }
                { !inUserBib &&
                <CheckBox
                    containerStyle={{bottom: 45,left: 9,position: "absolute", width: "100%", backgroundColor: "transparent" , borderColor: "transparent"}}
                    size={50}
                    disabled={true}
                    center
                    checkedIcon={<AntDesign name="checkcircle" size={50} color="darkgreen" />}
                    uncheckedIcon={<AntDesign name="closecircle" size={50} color="darkred" />}
                    onPress={checkBoxAvaliablOnPress}
                    checked={available}
                />
                }
            </View>
            <View style={{paddingTop: 15}}>
                <Text numberOfLines={1} adjustsFontSizeToFit={true}  style={{ flexWrap: "nowrap",alignSelf: "center",fontWeight: "bold", fontSize: 20}}>{props.book.titel}</Text>
                <Text style={{paddingTop: 5, alignSelf: "center", color: "grey"}}>ISBN: {props.book.isbn}</Text>
            </View>
            <Divider style={{paddingTop: 15, width: "95%"}}/>
            <View style={{padding: 15, width: "100%"}}>
                <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                    <View style={{flexDirection: "column",alignItems: "center"}}>
                        <Text style={{textDecorationLine: 'underline'}}>Author*in:</Text>
                        <Text style={{ fontWeight: "bold"}}>{props.book.authorName}</Text>
                    </View>
                    <View style={{flexDirection: "column",alignItems: "center"}}>
                        <Text style={{textDecorationLine: 'underline'}}>Sprache:</Text>
                        <Text style={{ fontWeight: "bold"}}>{props.book.sprache}</Text>
                    </View>
                    <View style={{flexDirection: "column", alignItems: "center"}}>
                        <Text style={{textDecorationLine: 'underline'}}>Erscheinungsdatum:</Text>
                        <Text style={{ fontWeight: "bold"}}>{props.book.erscheinungsDatum}</Text>
                    </View>
                </View>
            </View>
            <Divider style={{ width: "95%"}}/>
            <View style={{padding:10}}>
                <View style={{borderColor: "lightgray", borderWidth: 0.75, borderRadius: 5,padding: 5, width: "100%", height: 130}}>
                    <Text style={{paddingBottom: 10, textDecorationLine: 'underline'}}>Inhalt:</Text>
                    <ScrollView>
                        <Text>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.</Text>
                    </ScrollView>
                </View>
            </View>
            <View style={{width: "100%", padding: 10, paddingTop:5}}>
                <Button
                    disabled={!available}
                    onPress={()=>{console.log("ausleihen")}}
                    titleStyle={{color: "#fdd560", fontWeight: "bold"}}
                    disabledStyle={{backgroundColor:"#c0c0c0"}}
                    disabledTitleStyle={{color:"white"}}
                    buttonStyle={{height: 50,width: "100%", alignSelf: "center", backgroundColor: "#2b2e32"}}
                    title="Ausleihen" />
            </View>
        </View>
    )
}

const mapStateToProps = state => {
    return {
        userBib: state.appReducer.userBib,
        book: state.appReducer.book,
        saved: state.appReducer.saved,
        auseihen: state.appReducer.auseihen,
    }
}

const mapDispatchToProps = dispatch => ({
    saveBookDispatch(isbn) {
        dispatch(saveBook({isbn: isbn}))
    },
    deleteBookFromSavedDispatch(id) {
        dispatch(deleteBookFromSaved({id: id}))
    },
    deleteBookFromUserBibDispatch(id) {
        dispatch(deleteBookFromUserBib({id: id}))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Book)