import React, {useCallback, useState, useLayoutEffect} from "react";
import {useEffect} from "react";
import {Text, TouchableOpacity, View, VirtualizedList} from "react-native";
import { connect } from "react-redux";
import {Badge, Button, ButtonGroup, Divider, ListItem} from 'react-native-elements';
import {GiftedChat} from "react-native-gifted-chat";
import {getGBibBooks, sendMessage, setShownBook} from "../../../reducers/appSlice";
import FirebaseInstance from "../../../config/firebase";

const ProcessScreen = (props) => {

    const [targetProcess, setTargetProcess] = useState({})

    const [messages, setMessages] = useState([]);

    const [loading, setLoading] = useState(true);

    const [newMessages, setNewMessages] = useState([])
    const [newMessageText, setNewMessageText] = useState("")

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
                    msgArr.push({_id:id, text:text, createdAt:createdAt, user: {_id:userId, avatar:avatar, name:name}});
                });
                setMessages(msgArr);
                setLoading(false);
            });

        return () => {
            unsubscribe();
            setLoading(false);
        };
    }, []);

    useEffect(() => {
        props.navigation.setOptions({
            title: props.process.book.toString()
        })
    }, [props.process.book])

    const onSend = useCallback((arr = []) => {
        arr.map(msg => {
            props.sendMessageDispatch(props.process.id, msg.text)
        })
    }, [])

    return (
        <View style={{height: "100%", paddingBottom: 28, backgroundColor: "#2b2e32"}}>
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
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(ProcessScreen)
