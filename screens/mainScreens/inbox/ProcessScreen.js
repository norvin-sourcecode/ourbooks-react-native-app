import React, {useCallback, useState, useLayoutEffect} from "react";
import {useEffect} from "react";
import {Text, TouchableOpacity, View, VirtualizedList} from "react-native";
import { connect } from "react-redux";
import {Badge, Button, ButtonGroup, Divider, ListItem} from 'react-native-elements';
import {GiftedChat} from "react-native-gifted-chat";
import {getGBibBooks, setShownBook} from "../../../reducers/appSlice";
import FirebaseInstance from "../../../config/firebase";

const ProcessScreen = (props) => {

    const [targetProcess, setTargetProcess] = useState({})

    const [messages, setMessages] = useState([{
        _id: 1,
        text: 'test',
        createdAt: new Date(),
        user: {
            _id: 2,
            name: 'test test',
        },
    }]);

    const [loading, setLoading] = useState(true);              // Loading state

    useEffect(() => {
        setTargetProcess(props.process)
    }, [props.process])

    useEffect(() => {
        const unsubscribe = FirebaseInstance.firestore()
            .collection('messages')
            .orderBy('createdAt', 'asc')    // Sort by timestamp
            .limitToLast(15)                // Only retrieve the last 15 messages
            .onSnapshot(querySnapshot => {
                const msgArr = [];
                querySnapshot.forEach(doc => {
                    const id = doc.id;
                    const data = doc.data();
                    // Add docId and chat data to chats array
                    msgArr.push({id, ...data});
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

    const onSend = useCallback((messages = []) => {
        setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
    }, [])

    return (
        <View style={{height: "100%", paddingBottom: 28, backgroundColor: "#2b2e32"}}>
            <GiftedChat
                messages={messages}
                onSend={messages => onSend(messages)}
                bottomOffset={50}
                user={{
                    _id: props.user.id,
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
})

export default connect(mapStateToProps, mapDispatchToProps)(ProcessScreen)
