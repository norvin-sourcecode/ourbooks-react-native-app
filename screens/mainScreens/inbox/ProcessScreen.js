import React, {useCallback, useState, useLayoutEffect} from "react";
import {useEffect} from "react";
import {Alert, StyleSheet, Text, TouchableOpacity, View, VirtualizedList} from "react-native";
import { connect } from "react-redux";
import {Badge, Button, ButtonGroup, Divider, Header, ListItem, Overlay} from 'react-native-elements';
import {GiftedChat} from "react-native-gifted-chat";
import {
    agreeProcess,
    getFriendById,
    getGBibBooks,
    getProcessById,
    sendMessage, setProcessDelivered, setProcessReturned,
    setShownBook
} from "../../../reducers/appSlice";
import FirebaseInstance from "../../../config/firebase";
import {AntDesign, Entypo, Ionicons} from "@expo/vector-icons";
import SvgQRCode from "react-native-qrcode-svg";
import {BarCodeScanner} from "expo-barcode-scanner";

const ProcessScreen = (props) => {

    const [targetProcess, setTargetProcess] = useState({})

    const [messages, setMessages] = useState([]);

    const [visible, setVisible] = useState(true)

    const [loading, setLoading] = useState(true);

    const [newMessages, setNewMessages] = useState([])
    const [newMessageText, setNewMessageText] = useState("")

    const [bIndex, setBIndex] = useState(0);
    const tabs = ['normale Lizenz', 'ourbook Licenz']

    const [qrCodeOverlayVisible, setQrCodeOverlayVisible] = useState(false)
    const [cameraOverlayVisible, setCameraOverlayVisible] = useState(false)

    const [scanned, setScanned] = useState(false);

    const [counter, setCounter] = useState(0)

    useEffect(() => {
        if (props.process.needReload) {
            props.getProcessByIdDispatch(props.process.id)
        }
        setTargetProcess(props.process)
    }, [props.process])

    useEffect(() => {
        setTargetProcess(props.process)
        props.getFriendByIdDispatch(props.process.bookReceiver)
    }, [props.process])

    useEffect(() => {
        const unsubscribe = FirebaseInstance.firestore()
            .collection('chats')
            .doc(props.process.id.toString())
            .collection("messages")
            .orderBy('createdAt', 'desc')    // Sort by timestamp
            .limitToLast(15)                // Only retrieve the last 15 messages
            .onSnapshot(querySnapshot => {
                const msgArr = [];
                querySnapshot.forEach(doc => {
                    const id = doc.id;
                    const data = doc.data();
                    const text = data.text;
                    const dateMessage = data.createdAt;
                    let createdAt = new Date(dateMessage)
                    createdAt = Date.UTC(0,0,0,0,0,dateMessage.seconds,0)
                    const userId = data.userId
                    const name = data.username;
                    const avatar = data.avatar;
                    const system = data.system;
                    msgArr.push({
                        _id: id,
                        text: text,
                        createdAt: createdAt,
                        system: system,
                        user: {_id: userId, avatar: avatar, name: name}
                    });
                });
                setMessages(msgArr);
                setLoading(false);
            });

        return () => {
            unsubscribe();
            setLoading(false);
        };
    }, []);

    const handleQRcodeScanned = ({type, data}) => {
        setScanned(true);
        if (data.split(";")[0] === "OURBOOK") {
            if (data.split(";")[3] === "DELIVER") {
                Alert.alert(
                    "Übergabe bestätigen?",
                    "Titel:\n" + props.process.book.titel + "\nLeiher*in:\n" + props.friends.friend.firstname + " " + props.friends.friend.lastname,
                    [
                        {
                            text: "abbrechen",
                            onPress: () => {
                                setScanned(false)
                            }
                        },
                        {
                            text: "OK",
                            onPress: () => {
                                props.setProcessDeliveredDispatch(props.process.id)
                            }

                        },
                    ],
                    {cancelable: false}
                );
            }
            if (data.split(";")[3] === "RETURN") {
                Alert.alert(
                    "Rückgabe bestätigen?",
                    "Titel:\n" + props.process.book.titel + "\nLeiher*in:\n" + props.friends.friend.firstname + " " + props.friends.friend.lastname,
                    [
                        {
                            text: "abbrechen",
                            onPress: () => {
                                setScanned(false)
                            }
                        },
                        {
                            text: "OK",
                            onPress: () => {
                                props.setProcessReturnedDispatch(props.process.id)
                            }

                        },
                    ],
                    {cancelable: false}
                );
            }
        } else {

        }
        //setVisible(true)
        //props.getBookByIsbnFromServerDispatchAusloeser(props.Communication.urlBase,props.Communication.conf, data)
        //props.navigation.navigate("book")
        // alert(`type: ${type} & data: ${data} gescannt`);
    };

    function erhoehen() {
        if (counter < 6) {
            setCounter(counter + 1)
        }
    }

    function verringern() {
        if (counter > 0) {
            setCounter(counter - 1)
        }
    }

    const onSend = useCallback((arr = []) => {
        arr.map(msg => {
            props.sendMessageDispatch(props.process.id, msg.text)
        })
    }, [])

    const toggleQrCodeOverlay = () => {
        setQrCodeOverlayVisible(!qrCodeOverlayVisible);
    };

    const toggleCameraOverlay = () => {
        setCameraOverlayVisible(!cameraOverlayVisible);
    };

    function UserQR() {
        if (props.process.status === 1) {
            return <SvgQRCode value={"OURBOOK;" + props.user.username + ";" + props.user.id + ";" + "DELIVER"}/>;
        }
        if (props.process.status === 2) {
            return <SvgQRCode value={"OURBOOK;" + props.user.username + ";" + props.user.id + ";" + "RETURN"}/>;
        }
    }

    const wochenSchreibweise = () => {
        return counter > 1 ? "n" : ""
    }

    const verleihButtonOnPress = () => {
        Alert.alert(
            "Buch verleihen",
            "Möchten Sie das Buch wiklich für " + counter + " Woche" + wochenSchreibweise() + " an " + props.friends.friend.firstname + " " + props.friends.friend.lastname + " verleihen?",
            [
                {
                    text: "abbrechen",
                },
                {
                    text: "OK",
                    onPress: () => {
                        props.agreePocessDispatch(false, [], true, counter, props.process.id)
                    }

                },
            ],
            {cancelable: false}
        );
    }

    // const renderSystemMessage = () => {
    //     return (
    //
    //     )
    // }

    const renderChatFooter = () => {

        const licenceRendered = () => {
            return props.process.status === 0 && props.process.bookGiver === props.user.id ? "40%" : 0
        }

        return (
            <View style={{height: licenceRendered(), padding:10}}>
                <View style={{backgroundColor: "#fdd560", borderRadius:10, height: "100%", width: "100%"}}>
                    <Text style={{color: "#2b2e32", fontWeight: "bold", paddingTop:5, alignSelf:"center", fontSize: 40}}>Lizenzvertrag</Text>
                    <Text style={{color: "#2b2e32", alignSelf:"center", paddingTop:10, paddingBottom:10}}>Verleihzeit: (in Wochen)</Text>
                    <View style={{flexDirection: "row", justifyContent: "space-evenly", paddingBottom:10}}>
                        <TouchableOpacity style={{alignSelf:"center"}} onPress={verringern}>
                            <AntDesign name="minuscircleo" size={40} color="black" />
                        </TouchableOpacity>
                        <View style={{alignSelf:"center", borderWidth:3, width: 55, height: 55, borderRadius:"50%", justifyContent: "center"}}>
                            <Text style={{color:"#2b2e32",fontWeight:"bold", alignSelf: "center", fontSize: 40}}>{counter}</Text>
                        </View>
                        <TouchableOpacity style={{alignSelf:"center"}} onPress={erhoehen}>
                            <AntDesign name="pluscircleo" size={40} color="black" />
                        </TouchableOpacity>
                    </View>
                    <Button
                        disabled={counter === 0}
                        onPress={verleihButtonOnPress}
                        titleStyle={{color: "#fdd560", fontWeight: "bold"}}
                        disabledStyle={{backgroundColor:"#c0c0c0"}}
                        disabledTitleStyle={{color:"white"}}
                        buttonStyle={{height: 40,width: "95%", alignSelf: "center", backgroundColor: "#2b2e32"}}
                        title="verleihen!"
                    />
                    {/*<View style={{backgroundColor: "black", justifyContent:"center", flexDirection:"row", alignSelf:"center"}}>*/}
                    {/*    <Button title="-" onPress={verringern} />*/}
                    {/*    <Text style={{color:"white", alignSelf: "center"}}>{counter}</Text>*/}
                    {/*    <Button onPress={erhoehen} style={{alignSelf: "center"}} title="+" />*/}
                    {/*</View>*/}
                </View>
            </View>
        )
    }

    return (
        <View style={{height: "100%", backgroundColor: "#2b2e32", flex:1}}>
            <Header
                centerComponent={{ text: props.process.book.titel, style: { color: 'white', fontWeight: "bold", fontSize:20} }}
                containerStyle={{    backgroundColor:"#2b2e32",    justifyContent: 'center', borderBottomWidth:0 }}
                leftComponent={<TouchableOpacity onPress={() => props.navigation.goBack()}><Ionicons style={{position:"absolute", top: -1.5, left:0}} name="chevron-back" size={30} color="white"/></TouchableOpacity>}
                rightComponent={
                    <View>
                    {
                    (props.process.status === 1 || props.process.status === 2) && props.process.bookReceiver === props.user.id &&
                    <TouchableOpacity onPress={() => toggleQrCodeOverlay()}><AntDesign style={{position:"absolute", top: -1.5, right:0}} name="qrcode" size={30} color="#fdd560"/></TouchableOpacity>
                    }
                    {
                    (props.process.status === 1 || props.process.status === 2) && props.process.bookGiver === props.user.id &&
                    <TouchableOpacity onPress={() => toggleCameraOverlay()}><Entypo style={{position:"absolute", top: -1.5, right:0}} name="camera" size={30} color="#fdd560"/></TouchableOpacity>
                    }
                </View> }
            />
            <Overlay isVisible={qrCodeOverlayVisible} onBackdropPress={toggleQrCodeOverlay} >
                <View style={{borderColor: "white", borderWidth:3,alignSelf: "center",transform: [{scale: 2.5}]}}>
                    <UserQR/>
                </View>
            </Overlay>
            <Overlay isVisible={cameraOverlayVisible} onBackdropPress={toggleCameraOverlay} overlayStyle={{height: "50%", width: "90%"}}>
                <View style={{borderColor: "white", borderWidth:1, flex: 1, flexDirection: 'column', justifyContent: 'center'}}>
                    <BarCodeScanner
                        onBarCodeScanned={scanned ? undefined : handleQRcodeScanned}
                        style={StyleSheet.absoluteFillObject}
                    />
                </View>
            </Overlay>
            <GiftedChat
                messages={messages}
                onSend={arr => onSend(arr)}
                renderChatFooter={renderChatFooter}
             //   renderSystemMessage={renderSystemMessage}
                user={{
                    _id: props.user.id,
                    name: props.user.username,
                    avatar: "test",
                }}
            />
        </View>
    )
}

const mapStateToProps = state => {
    return {
        user: state.appReducer.user,
        process: state.appReducer.process,
        friends: state.appReducer.friends,
    }
}

const mapDispatchToProps = dispatch => ({
    setProcessDeliveredDispatch(id) {
        dispatch(setProcessDelivered({id:id}))
    },
    setProcessReturnedDispatch(id) {
        dispatch(setProcessReturned({id:id}))
    },
    getProcessByIdDispatch(id) {
        dispatch(getProcessById({id:id}))
    },
    getFriendByIdDispatch(id) {
        dispatch(getFriendById({id:id}))
    },
    setShownBookDispatch(book) {
        dispatch(setShownBook(book))
    },
    sendMessageDispatch(chatId, text) {
        dispatch(sendMessage({chatId:chatId,text:text}))
    },
    agreePocessDispatch( keep, bookClubs, returnToGiver, weeksUsageTime, processId) {
        dispatch(agreeProcess({ keep: keep, bookClubs: bookClubs, returnToGiver: returnToGiver, weeksUsageTime: weeksUsageTime,processId:processId}))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(ProcessScreen)
