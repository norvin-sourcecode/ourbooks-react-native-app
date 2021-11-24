import React, {useCallback, useState} from "react";
import {useEffect} from "react";
import {RefreshControl, Text, TouchableOpacity, View, VirtualizedList} from "react-native";
import { connect } from "react-redux";
import {Badge, Button, ButtonGroup, Divider, Header, ListItem} from 'react-native-elements';
import {AntDesign, Ionicons} from "@expo/vector-icons";
import {
    getAusleihenRequests, getBorrowingProcesses,
    getFriendRequests, getLendingProcesses,
    respondAusleihenRequest,
    respondFriendRequest, setShownProcess
} from "../../../reducers/appSlice";
import ListProcess from "../../../components/ListProcess";
import CustomListItem from "../../../components/CustomListItem";
import CustomProcessListItem from "../../../components/CustomProcessListItem";

const InboxScreen = (props) => {

    const [bIndex, setBIndex] = useState(0);
    const tabs = ['geliehen', 'verliehen']
    const [refreshing, setRefreshing] = useState(false);

    const [data1, setData1] = useState([])
    const [data2, setData2] = useState([])


    const [requestsList, setRequestsList] = useState([])

    const [lendingList, setLendingList] = useState([])
    const [borrowedList, setBorrowedList] = useState([])

    useEffect(() => {
        if (!props.ausleihen.requests.loaded) {
            props.getAusleihenRequestsDispatch()
        }
        if (!props.ausleihen.loaded) {
            props.getAusleihenRequestsDispatch()
            props.getLendingProcessesDispatch()
            props.getBorrowingProcessesDispatch()
        }
    }, [props.ausleihen.requests.loaded, props.ausleihen.requests.loaded, ] )

    useEffect(() => {
        const tmp1 = []
        const tmp2 = []
        props.ausleihen.borrowedList.map((borrowProcess) => {
            tmp1.push({kind:1, inhalt:borrowProcess})
        })
        props.ausleihen.requests.requestsList.map((request) => {
            tmp2.push({kind:2, inhalt:request})
        })
        props.ausleihen.lendingList.map((lendingProcess) => {
            tmp2.push({kind:3, inhalt:lendingProcess})
        })
        setData1(tmp1)
        setData2(tmp2)
    }, [ props.ausleihen.requests, props.ausleihen.lendingList, props.ausleihen.borrowedList])

    const wait = (timeout) => {
        return new Promise(resolve => setTimeout(resolve, timeout));
    }

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        props.getFriendRequestsDispatch()
        props.getAusleihenRequestsDispatch()
        props.getBorrowingProcessesDispatch()
        wait(2000).then(() => setRefreshing(false));
    }, []);


    function getItem (d, index) {
        return d[index]
    }

    function getItemCount (d) {
        return d.length
    }

    return (
        <View style={{backgroundColor: "#2b2e32", height:"100%"}}>
            <Header
                centerComponent={{ text: 'Inbox', style: { color: '#fdd560', fontWeight: "bold", fontSize:20} }}
                containerStyle={{    backgroundColor:"#2b2e32",    justifyContent: 'center', borderBottomWidth:0 }}
            />
            <ButtonGroup containerStyle={{borderWidth:2, borderColor:"#fdd560"}} buttonStyle={{backgroundColor:"#2b2e32"}} textStyle={{color: "#fdd560"}} selectedTextStyle={{color:"#2b2e32"}} selectedButtonStyle={{backgroundColor: '#fdd560'}} onPress={setBIndex} selectedIndex={bIndex} buttons={tabs} />
            {bIndex === 1 &&
            <View style={{height: "100%"}}>
                <VirtualizedList
                    data={data2}
                    initialNumToRender={5}
                    renderItem={({item, index}) =>  <CustomProcessListItem i={item} index={index} navigation={props.navigation} />}
                    keyExtractor={(item, index)=> 'key'+index+item.id}
                    getItemCount={getItemCount}
                    getItem={getItem}
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                />
            </View>
            }
            {bIndex === 0 &&
            <View style={{height: "100%"}}>
                <VirtualizedList
                    data={data1}
                    initialNumToRender={4}
                    renderItem={({item, index}) => <CustomProcessListItem i={item} index={index} navigation={props.navigation} />}
                    keyExtractor={(item, index)=> 'key'+index+item.id}
                    getItemCount={getItemCount}
                    getItem={getItem}
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                />
            </View>
            }
        </View>
    )
}

const mapStateToProps = state => {
    return {
        friends: state.appReducer.friends,
        user: state.appReducer.user,
        ausleihen: state.appReducer.ausleihen,
    }
}

const mapDispatchToProps = dispatch => ({
    getFriendRequestsDispatch() {
        dispatch(getFriendRequests())
    },
    setShownProcessDispatch(process) {
        dispatch(setShownProcess(process))
    },
    getAusleihenRequestsDispatch() {
        dispatch(getAusleihenRequests())
    },
    resondAusleihenRequestsDispatch(id, accept) {
        dispatch(respondAusleihenRequest({id: id, accept: accept}))
    },
    respondFriendRequestDispatch(id, accept) {
        dispatch(respondFriendRequest({id: id, accept: accept}))
    },
    getLendingProcessesDispatch() {
        dispatch(getLendingProcesses())
    },
    getBorrowingProcessesDispatch() {
        dispatch(getBorrowingProcesses())
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(InboxScreen)