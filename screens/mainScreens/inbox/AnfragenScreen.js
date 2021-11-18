import React, {useState} from "react";
import {useEffect} from "react";
import {RefreshControl, Text, TouchableOpacity, View, VirtualizedList} from "react-native";
import { connect } from "react-redux";
import {Badge, Button, ButtonGroup, Divider, ListItem} from 'react-native-elements';
import {AntDesign} from "@expo/vector-icons";
import {getAusleihenRequests, getFriendRequests, respondFriendRequest} from "../../../reducers/appSlice";

const AnfragenScreen = (props) => {

    const [refreshing, setRefreshing] = useState(false);
    const [requestsList, setRequestsList] = useState([])

    useEffect(() => {
        if (!props.friends.requests.loaded) {
            props.getFriendRequestsDispatch()
        }
    }, [props.friends.requests.loaded] )

    useEffect(() => {
        const tmp = []
        props.friends.requests.requestsList.map((request) => {
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
    }, [props.friends.requests])


    const wait = (timeout) => {
        return new Promise(resolve => setTimeout(resolve, timeout));
    }

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        props.getFriendRequestsDispatch()
        wait(2000).then(() => setRefreshing(false));
    }, []);


    function getItem (data, index) {
        return data[index]
    }

    function getItemCount (data) {
        return data.length
    }

    const handelAcceptFriendRequestPress = (id) => {
        props.respondFriendRequestDispatch(id, true)
    }

    const handelDeclineFriendRequestPress = (id) => {
        props.respondFriendRequestDispatch(id, false)
    }

    const FriendRequest = ({ request, index}) => (
        <View>
            {request.message === "NOREQUESTS" &&
            <View style={{height: 450, justifyContent: "center"}}>
                <Text style={{alignSelf:"center"}}>keine Anfragen</Text>
            </View>
            }
            {request.message !== "NOREQUESTS" &&
            <ListItem key={index+"list-item-friendrequest"} bottomDivider>
                <ListItem.Content>
                    <View style={{width: "100%", flexDirection: "row", flexWrap: "nowrap", justifyContent: "space-between"}}>
                        <View style={{width: "75%",alignSelf: "center"}}>
                            <Text style={{fontWeight: "bold"}}>{request.message}</Text>
                        </View>
                        <View style={{flexDirection: "row", flexWrap: "nowrap"}}>
                            <AntDesign style={{paddingRight: 10}} name="checkcircle" size={35} color="orange" onPress={() => {handelAcceptFriendRequestPress(request.id)}}/>
                            <AntDesign name="closecircle" size={35} color="orange" onPress={() => {handelDeclineFriendRequestPress(request.id)}} />
                        </View>
                    </View>
                </ListItem.Content>
            </ListItem>
            }
        </View>
    );

    return (
        <View style={{paddingTop: 5}}>
            <View>
                <VirtualizedList
                    data={requestsList}
                    initialNumToRender={5}
                    renderItem={({item, index}) => <FriendRequest request={item} index={index} />}
                    keyExtractor={(item, index)=> 'key'+index+item.id}
                    getItemCount={getItemCount}
                    getItem={getItem}
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                />
            </View>
        </View>
    )
}

const mapStateToProps = state => {
    return {
        friends: state.appReducer.friends,
        user: state.appReducer.user,
    }
}

const mapDispatchToProps = dispatch => ({
    getFriendRequestsDispatch() {
        dispatch(getFriendRequests())
    },
    respondFriendRequestDispatch(id, accept) {
        dispatch(respondFriendRequest({id: id, accept: accept}))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(AnfragenScreen)