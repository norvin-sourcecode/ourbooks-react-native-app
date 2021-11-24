import React, {useCallback, useState, useLayoutEffect} from "react";
import {useEffect} from "react";
import {Text, TouchableOpacity, View, VirtualizedList} from "react-native";
import { connect } from "react-redux";
import {Badge, Button, ButtonGroup, Divider, Header, ListItem, Overlay} from 'react-native-elements';
import {GiftedChat} from "react-native-gifted-chat";
import {agreeProcess, getGBibBooks, sendMessage, setShownBook} from "../../../reducers/appSlice";
import FirebaseInstance from "../../../config/firebase";
import {AntDesign, Entypo, Ionicons} from "@expo/vector-icons";
import SvgQRCode from "react-native-qrcode-svg";

const ProcessScreen = (props) => {

    const [targetProcess, setTargetProcess] = useState({})

    const [messages, setMessages] = useState([]);

    const [visible, setVisible] = useState(true)

    const [loading, setLoading] = useState(true);

    const [newMessages, setNewMessages] = useState([])
    const [newMessageText, setNewMessageText] = useState("")

    const [bIndex, setBIndex] = useState(0);
    const tabs = ['normale Lizenz','ourbook Licenz']

    const [qrCodeOverlayVisible, setQrCodeOverlayVisible] = useState(false)
    const [cameraOverlayVisible, setCameraOverlayVisible] = useState(false)


    const [counter, setCounter] = useState(0)

    useEffect(() => {
        setTargetProcess(props.process)
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
                    msgArr.push({_id:id, text:text, createdAt:createdAt,system:system, user: {_id:userId, avatar:avatar, name:name}});
                });
                setMessages(msgArr);
                setLoading(false);
            });

        return () => {
            unsubscribe();
            setLoading(false);
        };
    }, []);

    function erhoehen() {
        setCounter(counter+1)
    }

    function verringern() {
        setCounter(counter-1)
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
        return <SvgQRCode value={"OURBOOK;"+props.user.username+";"+props.user.id} />;
    }

    return (
        <View style={{height: "100%", paddingBottom: 28, backgroundColor: "#2b2e32"}}>
            <Header
                centerComponent={{ text: props.process.book.titel, style: { color: '#fdd560', fontWeight: "bold", fontSize:20} }}
                containerStyle={{    backgroundColor:"#2b2e32",    justifyContent: 'center', borderBottomWidth:0 }}
                leftComponent={<TouchableOpacity onPress={() => props.navigation.goBack()}><Ionicons style={{position:"absolute", top: -1.5, left:0}} name="chevron-back" size={30} color="#fdd560"/></TouchableOpacity>}
                rightComponent={
                    <View>
                    {
                    props.process.status === 1 && props.process.bookReceiver === props.user.id &&
                    <TouchableOpacity onPress={() => toggleQrCodeOverlay()}><AntDesign style={{position:"absolute", top: -1.5, right:0}} name="qrcode" size={30} color="#fdd560"/></TouchableOpacity>
                    }
                    {
                    props.process.status === 1 && props.process.bookGiver === props.user.id &&
                    <TouchableOpacity onPress={() => toggleCameraOverlay()}><Entypo style={{position:"absolute", top: -1.5, right:0}} name="camera" size={30} color="#fdd560"/></TouchableOpacity>
                    }
                </View> }
            />
            <Overlay isVisible={qrCodeOverlayVisible} onBackdropPress={toggleQrCodeOverlay} >
                <View style={{borderColor: "white", borderWidth:3,alignSelf: "center",transform: [{scale: 2.5}]}}>
                    <UserQR/>
                </View>
            </Overlay>
            <Overlay isVisible={cameraOverlayVisible} onBackdropPress={toggleCameraOverlay} >
                <View style={{borderColor: "white", borderWidth:3,alignSelf: "center",transform: [{scale: 2.5}]}}>
                    <Text>halölo</Text>
                </View>
            </Overlay>
            {props.process.status === 0 && props.process.bookGiver === props.user.id &&
            <View style={{ paddingRight:10, paddingLeft:10, paddingTop:25,height: "35%"}}>
                <View style={{height: "100%", backgroundColor: "white", justifyContent: "center"}}>
                    <Text>Lizenzvereinbarung:</Text>
                    <Text>wie lange</Text>
                    <View style={{height: 100,width:100, backgroundColor: "black", justifyContent:"center", flexDirection:"row", alignSelf:"center"}}>
                        <Button title="-" onPress={verringern} />
                        <Text style={{color:"white", alignSelf: "center"}}>{counter}</Text>
                        <Button onPress={erhoehen} style={{alignSelf: "center"}} title="+" />
                    </View>
                    <ButtonGroup disabled={true} containerStyle={{borderWidth:2, borderColor:"#fdd560"}} buttonStyle={{backgroundColor:"#2b2e32"}} textStyle={{color: "#fdd560"}} selectedTextStyle={{color:"#2b2e32"}} selectedButtonStyle={{backgroundColor: '#fdd560'}} onPress={setBIndex} selectedIndex={bIndex} buttons={tabs} />
                    <Button title="zustimmen" onPress={()=>{props.agreePocessDispatch(false,[],true,counter, props.process.id)}} />
                </View>
            </View>
            }
            <GiftedChat
                messages={messages}
                onSend={arr => onSend(arr)}
                bottomOffset={50}
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
    }
}

const mapDispatchToProps = dispatch => ({
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
