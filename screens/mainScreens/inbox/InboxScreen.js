import React, {useCallback, useState} from "react";
import {useEffect} from "react";
import {RefreshControl, Text, TouchableOpacity, View, VirtualizedList} from "react-native";
import { connect } from "react-redux";
import {Badge, Button, ButtonGroup, Divider, ListItem} from 'react-native-elements';
import {AntDesign} from "@expo/vector-icons";
import {
    getAusleihenRequests, getBorrowingProcesses,
    getFriendRequests, getLendingProcesses,
    respondAusleihenRequest,
    respondFriendRequest, setShownProcess
} from "../../../reducers/appSlice";
import ListProcess from "../../../components/ListProcess";

const InboxScreen = (props) => {

    const [index, setIndex] = useState(0);
    const tabs = ['verliehen', 'geliehen']
    const [refreshing, setRefreshing] = useState(false);
    const [requestsList, setRequestsList] = useState([])

    const [lendingList, setLendingList] = useState([])
    const [borrowedList, setBorrowedList] = useState([])

    const [neuLaden, setNeuLaden] = useState(false)

    useEffect(() => {
        if (!props.ausleihen.requests.loaded) {
            props.getAusleihenRequestsDispatch()
        }
        if (!props.ausleihen.loaded) {
            props.getAusleihenRequestsDispatch()
            props.getLendingProcessesDispatch()
            props.getBorrowingProcessesDispatch()
        }
    }, [props.ausleihen.requests.loaded, props.ausleihen.requests.loaded, neuLaden] )

    useEffect(() => {
        const tmp = []
        props.ausleihen.requests.requestsList.map((request) => {
            tmp.push(request)
        })
        if (tmp.length === 0) {
            setRequestsList([{
                "id": 0,
                "message": "NOREQUESTS",
                "receiver": 0,
                "sender": 0
            }])
        } else {
            setRequestsList(tmp)
        }
        setLendingList(props.ausleihen.lendingList)
        setBorrowedList(props.ausleihen.borrowedList)
    }, [ props.ausleihen.requests, props.ausleihen.lendingList])

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


    function getItem (data, index) {
        return data[index]
    }

    function getItemCount (data) {
        return data.length
    }

    const handelAcceptRequestPress = (request) => {
        props.resondAusleihenRequestsDispatch(request.id, true)
        setNeuLaden(!neuLaden)
    }

    const handelDeclineRequestPress = (request) => {
        props.resondAusleihenRequestsDispatch(request.id, false)
        props.getAusleihenRequestsDispatch()
        setNeuLaden(!neuLaden)
    }

    const ItemContainer = ({item, index}) => {
    }

    const Request = ({ request, index}) => (
        <View>
            {request.message === "NOREQUESTS" &&
            <View></View>
            }
            {request.message !== "NOREQUESTS" &&
            <ListItem key={index+"list-item-request"} bottomDivider>
                <ListItem.Content>
                    <View style={{width: "100%", flexDirection: "row", flexWrap: "nowrap", justifyContent: "space-between"}}>
                        <View style={{width: "75%",alignSelf: "center"}}>
                            <Text style={{fontWeight: "bold"}}>{request.message}</Text>
                        </View>
                        <View style={{flexDirection: "row", flexWrap: "nowrap"}}>
                            <AntDesign style={{paddingRight: 10}} name="checkcircle" size={35} color="orange" onPress={() => {handelAcceptRequestPress(request)}}/>
                            <AntDesign name="closecircle" size={35} color="orange" onPress={() => {handelDeclineRequestPress(request)}} />
                        </View>
                    </View>
                </ListItem.Content>
            </ListItem>
            }
        </View>
    );

    return (
        <View style={{paddingTop: 5}}>
            <ButtonGroup buttonStyle={{backgroundColor:"#2b2e32"}} textStyle={{color: "#fdd560"}} selectedTextStyle={{color:"#2b2e32"}} selectedButtonStyle={{backgroundColor: '#fdd560'}} onPress={setIndex} selectedIndex={index} buttons={tabs} />
            <Divider style={{paddingTop: 5}}/>
            {index === 0 &&
            <View>
                <VirtualizedList
                    data={requestsList}
                    initialNumToRender={5}
                    renderItem={({item, index}) => <Request request={item} index={index} />}
                    keyExtractor={(item, index)=> 'key'+index+item.id}
                    getItemCount={getItemCount}
                    getItem={getItem}
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                />
                <Divider/>
                <VirtualizedList
                    data={lendingList}
                    initialNumToRender={5}
                    renderItem={({item, index}) => <ListProcess p={item} index={index} navigation={props.navigation} />}
                    keyExtractor={(item, index)=> 'key'+index+item.id}
                    getItemCount={getItemCount}
                    getItem={getItem}
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                />
            </View>
            }
            {index === 1 &&
            <View>
                <VirtualizedList
                    data={borrowedList}
                    initialNumToRender={5}
                    renderItem={({item, index}) => <ListProcess p={item} index={index} navigation={props.navigation} />}
                    keyExtractor={(item, index)=> 'key'+index+item.id}
                    getItemCount={getItemCount}
                    getItem={getItem}
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