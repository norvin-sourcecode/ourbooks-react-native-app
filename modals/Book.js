import React, {useState} from "react";
import {useEffect} from "react";
import { Text,View, ActivityIndicator, Alert, ScrollView, StyleSheet, TouchableOpacity} from "react-native";
import { connect } from "react-redux";
import {AntDesign, Entypo, FontAwesome, Ionicons} from "@expo/vector-icons";
import {
    Divider,
    CheckBox,
    Button,
    Overlay,
    ButtonGroup,
    Card,
    Tooltip,
    Image,
    BottomSheet
} from "react-native-elements";
import {
    checkIfBookAvailable, checkIfBookPending,
    deleteBookFromSaved,
    deleteBookFromUserBib,
    saveBook,
    sendAusleihenRequest
} from "../reducers/appSlice";
import Svg, {G, Polygon,Text as SvgText} from "react-native-svg";
import Ribbon from "../components/Ribbon";

const Book = (props) => {

    const [loading, setLoading] = useState(false);

    const [targetBook, setTargetBook] = useState({})
    const [saved, setSaved] = useState(false)
    const [inUserBib, setInUserBib] = useState(false)
    const [available, setAvailable] = useState(false)
    const [descriptionOverlayVisible, setDescriptionOverlayVisible] = useState(false);
    const [dotsBottomSheetVisible, setDotsBottomSheetVisible] = useState(false)

    const [defaultBookCoverWidth, setDefaultBookCoverWidth] = useState(160)
    const [defaultBookCoverHeight, setDefaultBookCoverHeight] = useState(275)

    const [dropDownOpen, setDropDownOpen] = useState(false);
    const [dropDownValue, setDropDownValue] = useState(null);
    const [dropDownItems, setDropDownItems] = useState([
        {label: 'ilker', value: 'ilker'},
        {label: 'yannick', value: 'yannick'},
        {label: 'gianluca', value: 'gianluca'}
    ]);

    useEffect(() => {
        if (!props.book.loaded) {
            props.checkIfBookAvailableDispatch(props.book.isbn)
            if (props.book.availableAt.length !== 0) {
                props.checkIfBookIsPendingDispatch(props.book.id)
            }
        }
        if (!props.book.loading && !props.saved.loading) {
            if(props.userBib.booksList.some(book => book.isbn === props.book.isbn)){
                setInUserBib(true)
            } else{
                setInUserBib(false)
            }
            if(props.saved.booksList.some(book => book.isbn === props.book.isbn)) {
                setSaved(true)
            } else {
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
            setLoading(true)
        }
    }, [props.saved, props.book, props.book.loading, props.userBib.booksList, props.book.availableAt])

    useEffect(() => {
        setTargetBook(props.book)
    },[props.book])

    function toggleDescriptionOverlay() {
        setDescriptionOverlayVisible(!descriptionOverlayVisible);
    }

    function toggleDotsBotttomSheet() {
        setDotsBottomSheetVisible(!dotsBottomSheetVisible)
    }

    function savedCheckedBoxPressed() {
        if (!saved) {
            props.saveBookDispatch(targetBook.isbn)
        }
        if (saved) {
            props.deleteBookFromSavedDispatch(targetBook.id)
        }
        setSaved(!saved)
    }

    function checkBoxAvaliablOnPress() {
        setAvailable(!available)
    }

    function coverDimHelper() {
        if (props.book.ratio === null || props.book.ratio === 0) {
            return defaultBookCoverWidth
        } else {
            return defaultBookCoverHeight/props.book.ratio
        }
    }

    function handelAnfageSchickenButtonOnPress() {
        props.sendAusleihenRequestDispatch(targetBook.id, "ausleihanfrage")
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
            {
                cancelable: false
            }
        );
    }

    return (
        <View style={styles.screenContainer}>
            { loading &&
                <View style={styles.activityIndicatorContainer}>
                    <ActivityIndicator style={styles.activityIndicator} size='large' />
                </View>
            }
            { !loading &&
                <View style={styles.contentContainer}>
                    <View style={styles.menuTopBarContainer}>
                        <Text onPress={() => props.navigation.navigate('main')} style={styles.menuTopBarCloseText}>schließen</Text>
                        <View style={styles.menuTopBarRightSideContainer}>
                            <Entypo style={styles.menuTopBarRightSideDotsIcon} name="dots-three-horizontal" size={36} color="black" onPress={()=>toggleDotsBotttomSheet()} />
                            <CheckBox
                                containerStyle={styles.menuTopBarRightSideSavedCheckBox}
                                center
                                checkedIcon={<FontAwesome name="bookmark" size={35} color="black"/>}
                                uncheckedIcon={<FontAwesome name="bookmark-o" size={35} color="black"/>}
                                onPress={savedCheckedBoxPressed}
                                checked={saved}
                            />
                        </View>
                    </View>
                    <View style={styles.bookCoverImageContainer}>
                        <Image style={{alignSelf: "center",width: coverDimHelper(), height: defaultBookCoverHeight}} resizeMode="contain" source={{uri:props.book.pictureUrl}}/>
                        { available &&
                            <Ribbon containerStyle={{position: "absolute", right:"0%", top:"7%"}}/>
                        }
                    </View>
                    {/*
                    <View>
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
                    */}
                    <View style={{paddingTop: "5%"}}>
                        <Text numberOfLines={2} adjustsFontSizeToFit={true} style={{alignSelf: "center",fontWeight: "bold", fontSize: 20}}>{props.book.titel}</Text>
                        <Text style={{paddingTop:"3%", alignSelf: "center", color: "grey", fontSize:15, fontWeight: "bold"}}>{props.book.authorName}</Text>
                    </View>
                    <Divider style={{paddingTop: 15, width: "95%"}}/>
                    <View style={{padding: 15, width: "100%"}}>
                        <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                            <View style={{flexDirection: "column",alignItems: "center"}}>
                                <Text style={{textDecorationLine: 'underline'}}>ISBN:</Text>
                                <Text style={{fontWeight: "bold"}}>{props.book.isbn}</Text>
                            </View>
                            <View style={{flexDirection: "column",alignItems: "center"}}>
                                <Text style={{textDecorationLine: 'underline'}}>Sprache:</Text>
                                <Text style={{fontWeight: "bold"}}>{props.book.sprache}</Text>
                            </View>
                            <View style={{flexDirection: "column", alignItems: "center"}}>
                                <Text style={{textDecorationLine: 'underline'}}>Erscheinungsdatum:</Text>
                                <Text style={{fontWeight: "bold"}}>{props.book.erscheinungsDatum}</Text>
                            </View>
                        </View>
                    </View>
                    <Divider style={{width: "95%"}}/>
                    <View style={{padding:"5%", width: "100%"}} >
                        <TouchableOpacity onPress={toggleDescriptionOverlay} >
                            <Text style={{textDecorationLine: 'underline', color:"grey", fontWeight: "bold"}}>Inhaltsbeschreibung anzeigen...</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{width: "100%", paddingLeft: "3%", paddingRight:"3%"}}>
                        <Button
                        disabled={!available || props.book.pending}
                        onPress={()=>{handelAnfageSchickenButtonOnPress()}}
                        titleStyle={{color: "#fdd560", fontWeight: "bold"}}
                        disabledStyle={{backgroundColor:"#c0c0c0"}}
                        disabledTitleStyle={{color:"white"}}
                        buttonStyle={{height: 50,width: "100%", alignSelf: "center", backgroundColor: "#2b2e32"}}
                        title="Ausleihen"
                        />
                    </View>
                </View>
            }
            { dotsBottomSheetVisible &&
                <View style={{position:"absolute",width: "100%", height:"100%", backgroundColor:"black", opacity:0.4}}/>
            }
            <BottomSheet isVisible={dotsBottomSheetVisible} containerStyle={{backgroundColor: "transparent"}}>
                <View style={{width: "100%"}}>
                    <TouchableOpacity style={{width:"100%", height:350}} onPress={toggleDotsBotttomSheet} />
                    <Button containerStyle={{backgroundColor: "#2b2e32", borderTopRightRadius:15, borderTopLeftRadius:15, borderBottomLeftRadius:0, borderBottomRightRadius:0}} titleStyle={{ color: 'white'}} buttonStyle={{backgroundColor: '#2b2e32', height:50, justifyContent:"flex-start"}} title="zum Bücherregal hinzufügen/entfernen" onPress={toggleDotsBotttomSheet}/>
                    <Button containerStyle={{backgroundColor: "#2b2e32", borderRadius:0}} titleStyle={{ color: 'white'}} buttonStyle={{backgroundColor: '#2b2e32', height:50, justifyContent:"flex-start"}} title="details" onPress={toggleDotsBotttomSheet}/>
                    <Button containerStyle={{backgroundColor: "#2b2e32", borderRadius:0}} titleStyle={{ color: 'white'}} buttonStyle={{backgroundColor: '#2b2e32', height:50, justifyContent:"flex-start"}} title="bearbeiten" onPress={toggleDotsBotttomSheet}/>
                    <Button containerStyle={{backgroundColor: "#2b2e32", borderRadius:0}} titleStyle={{ color: 'white'}} buttonStyle={{backgroundColor: '#2b2e32', height:50, justifyContent:"flex-start"}} title="teilen" onPress={toggleDotsBotttomSheet}/>
                    <Button containerStyle={{backgroundColor: "#2b2e32", borderRadius:0}} titleStyle={{ color: 'white'}} buttonStyle={{backgroundColor: '#2b2e32', height:50, justifyContent:"flex-start"}} title="melden" onPress={toggleDotsBotttomSheet}/>
                    <Button containerStyle={{backgroundColor: "#2b2e32", borderRadius:0}} titleStyle={{ color: 'white', fontWeight: "bold"}} buttonStyle={{backgroundColor: '#2b2e32', height:50}} title="abbrechen" onPress={toggleDotsBotttomSheet}/>
                </View>
            </BottomSheet>
            <Overlay isVisible={descriptionOverlayVisible} onBackdropPress={toggleDescriptionOverlay}>
                <View style={{width:"90%", height:"75%"}}>
                    <Text onPress={toggleDescriptionOverlay} style={{color: "#565a63", fontSize: 15, left: 6, top: 4, textDecorationLine: 'underline', fontWeight: "bold", paddingBottom:"5%"}}>schließen</Text>
                    <ScrollView>
                        <Text>{props.book.description}</Text>
                    </ScrollView>
                </View>
            </Overlay>
        </View>
    )
}

const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        alignItems: "center",
        width: "100%"
    },
    activityIndicatorContainer: {
        justifyContent: "center",
        alignItems: "center",
        flex: 1
    },
    contentContainer: {
        flex: 1,
        alignItems: "center",
        width: "100%",
        height: "100%"
    },
    activityIndicator: {
        alignSelf: "center"
    },
    menuTopBarContainer: {
        paddingLeft: 10,
        paddingTop: 10,
        paddingRight: 10,
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between"
    },
    menuTopBarCloseText: {
        color: "#565a63",
        fontSize: 18,
        left: "20%",
        top: "3%",
        textDecorationLine: 'underline',
        fontWeight: "bold"
    },
    menuTopBarRightSideContainer: {
        flexDirection: "row"
    },
    menuTopBarRightSideDotsIcon: {
        top: 2, right: 9
    },
    menuTopBarRightSideSavedCheckBox: {
        top: 5,
        padding: 0,
        margin: 0
    },
    bookCoverImageContainer: {
        paddingTop:"5%",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.7,
        shadowRadius: 4.65,
        elevation: 6,}
});


const mapStateToProps = state => {
    return {
        userBib: state.appReducer.userBib,
        book: state.appReducer.book,
        saved: state.appReducer.saved,
        auseihen: state.appReducer.auseihen,
    }
}

const mapDispatchToProps = dispatch => ({
    checkIfBookIsPendingDispatch(id) {
        dispatch(checkIfBookPending({
            id:id
        }))
    },
    saveBookDispatch(isbn) {
        dispatch(saveBook({
            isbn: isbn
        }))
    },
    deleteBookFromSavedDispatch(id) {
        dispatch(deleteBookFromSaved({
            id: id
        }))
    },
    deleteBookFromUserBibDispatch(id) {
        dispatch(deleteBookFromUserBib({
            id: id
        }))
    },
    checkIfBookAvailableDispatch(isbn) {
        dispatch(checkIfBookAvailable({
            isbn:isbn
        }))
    },
    sendAusleihenRequestDispatch(bookId, message) {
        dispatch(sendAusleihenRequest({
            bookId: bookId,
            message: message
        }))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Book)