import {ActivityIndicator, Alert, Text, View, StyleSheet, Button, TouchableOpacity} from "react-native";
import React, {useEffect, useState} from "react";
import { connect } from "react-redux";
import {addBookToUserBib, getBookByIsbn, saveBook, sendFriendRequest} from "../reducers/appSlice";
import {ButtonGroup, Card, Input, Overlay} from "react-native-elements";
import {AntDesign, Ionicons, MaterialIcons} from "@expo/vector-icons";
import {BarCodeScanner} from "expo-barcode-scanner";

const AddABookToSaved = (props) => {

    const [newBookTitel, setNewBookTitel] = useState("");
    const [newBookAuthorName, setNewBookAuthorName] = useState("");
    const [newBookErscheinungsDatum, setNewBookErscheinungsDatum] = useState("");
    const [newBookAuflage, setNewBookAuflage] = useState("");
    const [newBookSprache, setNewBookSprache] = useState("");
    const [newBookIsbn, setNewBookIsbn] = useState("");

    const [howToAddIndex, setHowToAddIndexIndex] = useState(0);

    const howToAddButtons = ['ISBN scannen', 'online suchen', 'manuell eingeben']

    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(true);

    const [visible, setVisible] = useState(false);

    useEffect(() => {
        (async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    const toggleOverlay = () => {
        setVisible(!visible);
    };

    const handleISBNscanned = ({ type, data }) => {
        setScanned(true);
        props.getBookByIsbnDispatch(data)
        setVisible(true)
        //props.getBookByIsbnFromServerDispatchAusloeser(props.Communication.urlBase,props.Communication.conf, data)
        //props.navigation.navigate("book")
        // alert(`type: ${type} & data: ${data} gescannt`);
    };

    function handelSavedBookPressed(book) {
        if(props.saved.booksList.some(book => book.isbn === props.book.isbn)){
            Alert.alert(
                "Dieses Buch ist schon in deiner Leseliste gespeichert-...",
                null,
                [
                    {
                        text: "OK",
                        onPress: () => setVisible(false)


                    },
                ],
                { cancelable: false }
            );
        } else{
            props.saveBookDispatch(book.isbn)
            setVisible(false)
        }
    }

    if (hasPermission === null) {
        return <Text>Kamerazugriff wird angefragt</Text>;
    }
    if (hasPermission === false) {
        return <Text>kein Kamerazugriff</Text>;
    }

    return (
        <View style={{flex: 1, alignItems: "center", width: "100%"}}>
            <View style={{width: "100%",height:"90%"}}>
                { howToAddIndex === 0 &&
                <View style={{flex: 1, flexDirection: 'column', justifyContent: 'center', width: "100%"}}>
                    <BarCodeScanner
                        onBarCodeScanned={scanned ? undefined : handleISBNscanned}
                        style={StyleSheet.absoluteFillObject}
                    />
                    <View style={{position: "absolute", top: "2%", left: "2%"}}>
                        <View>
                            <Text onPress={() => props.navigation.navigate('main')} style={{color: "#fdd560", fontSize:15,left: 6,top:4, textDecorationLine: 'underline', fontWeight: "bold"}}>schließen</Text>
                        </View>
                    </View>
                    {scanned && !visible && <Button title={'Antippen zum Scannen'} onPress={() => setScanned(false)} />}
                </View>
                }
            </View>
            <View style={{ width: "100%", height: "10%", justifyContent: "center"}}>
                <ButtonGroup buttonStyle={{backgroundColor:"#2b2e32"}} textStyle={{color: "#fdd560"}} selectedTextStyle={{color:"#2b2e32"}} selectedButtonStyle={{backgroundColor: '#fdd560'}} onPress={setHowToAddIndexIndex} selectedIndex={howToAddIndex} buttons={howToAddButtons} />
            </View>
            <Overlay isVisible={visible} overlayStyle={{backgroundColor: "transparent"}} >
                {props.book.loading &&
                <View style={{flex: 1, justifyContent: 'center', alignItems: "center", backgroundColor: "transparent"}}>
                    <ActivityIndicator size='large' />
                </View>
                }
                {!props.book.loading &&
                <View style={{backgroundColor: "white"}}>
                    <View style={{position: "absolute", flexDirection: "row", justifyContent: "space-between", width: "100%", top: -17.5}} >
                        <TouchableOpacity style={{left: -17.5,height: 35, width: 35, borderRadius: 17.5, backgroundColor: "white"}} onPress={()=>{setVisible(false)}}>
                            <AntDesign name="closecircle" size={35} color="darkred"/>
                        </TouchableOpacity>
                        <TouchableOpacity style={{right: -17.5,height: 35, width: 35, borderRadius: 17.5, backgroundColor: "white"}} onPress={() => {handelSavedBookPressed(props.book)}}>
                            <AntDesign name="checkcircle" size={35} color="darkgreen" />
                        </TouchableOpacity>
                    </View>
                    <View>
                        <Card containerStyle={{alignSelf: "center", padding:0}}>
                            <Card.Image style={{alignSelf: "center",width: 128, height:200}}  resizeMode="cover" source={{url:props.book.pictureUrl}}/>
                        </Card>
                        <Text numberOfLines={1} adjustsFontSizeToFit={true}  style={{ flexWrap: "nowrap",alignSelf: "center",fontWeight: "bold", fontSize: 20, paddingTop:10}}>{props.book.titel}</Text>
                        <Text style={{paddingTop: 5, alignSelf: "center", color: "grey"}}>ISBN: {props.book.isbn}</Text>
                        <View style={{padding: 15}}>
                            <View style={{flexDirection: "column"}}>
                                <View style={{flexDirection: "row",justifyContent: "space-between"}}>
                                    <Text style={{textDecorationLine: 'underline'}}>Author*in:</Text>
                                    <Text style={{ fontWeight: "bold"}}>{props.book.authorName}</Text>
                                </View>
                                <View style={{flexDirection: "row",justifyContent: "space-between"}}>
                                    <Text style={{textDecorationLine: 'underline'}}>Sprache:</Text>
                                    <Text style={{ fontWeight: "bold"}}>{props.book.sprache}</Text>
                                </View>
                                <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                                    <Text style={{textDecorationLine: 'underline'}}>Erscheinungsdatum:</Text>
                                    <Text style={{ fontWeight: "bold"}}>{props.book.erscheinungsDatum}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
                }
            </Overlay>
        </View>
    );
}

const mapStateToProps = state => {
    return {
        book: state.appReducer.book,
        saved: state.appReducer.saved,
    }
}

const mapDispatchToProps = dispatch => ({
    getBookByIsbnDispatch(isbn) {
        dispatch(getBookByIsbn({isbn: isbn}))
    },
    saveBookDispatch(isbn) {
        dispatch(saveBook({isbn: isbn}))
    },
})

export default connect(mapStateToProps, mapDispatchToProps)(AddABookToSaved)