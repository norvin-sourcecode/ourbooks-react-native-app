import React, {useState} from "react";
import {useEffect} from "react";
import {Text, TouchableOpacity, View, VirtualizedList} from "react-native";
import { connect } from "react-redux";
import {Badge, Button, ButtonGroup, Divider, ListItem} from 'react-native-elements';
import {AntDesign} from "@expo/vector-icons";
import {getAusleihenRequests, getFriendRequests, respondFriendRequest} from "../../../reducers/appSlice";

const InboxScreen = (props) => {

    const [index, setIndex] = useState(0);
    const tabs = ['Anfragen', 'Ausleihen']

    const [requestsList, setRequestsList] = useState([])

    useEffect(() => {
        if (!props.friends.requests.loaded) {
            props.getFriendRequestsDispatch()
        }
        if (!props.auseihen.requests.loaded) {
            props.getAusleihenRequestsDispatch()
        }
    }, [props.friends.requests.loaded, props.auseihen.requests.loaded] )

    useEffect(() => {
        const interval = setInterval(async () => {
            props.getFriendRequestsDispatch()
            props.getAusleihenRequestsDispatch()
        }, 5000);

        return () => {
            clearInterval(interval);
        };
    }, [])

    useEffect(() => {
        const tmp = []
        props.friends.requests.requestsList.map((request) => {
            tmp.push(request)
        })
        props.auseihen.requests.requestsList.map((request) => {
            tmp.push(request)
        })
        setRequestsList(tmp)
        console.log(tmp)
        // setFriendRequests(props.friends.requests.requestsList)
        // setAusleihenRequests(props.auseihen.requests.requestsList)
    }, [props.friends.requests.requestsList, props.auseihen.requests.requestsList])

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
        </View>
    );

    return (
        <View style={{paddingTop: 5}}>
            <ButtonGroup buttonStyle={{backgroundColor:"#fdd560"}} textStyle={{color: "#565a63"}} selectedTextStyle={{color:"#fdd560"}} selectedButtonStyle={{backgroundColor: '#2b2e32'}} onPress={setIndex} selectedIndex={index} buttons={tabs} />
            <Divider style={{paddingTop: 5}}/>
            {index === 0 &&
            <View>
                <VirtualizedList
                    data={requestsList}
                    initialNumToRender={5}
                    renderItem={({item, index}) => <FriendRequest request={item} index={index} />}
                    keyExtractor={(item, index)=> 'key'+index+item.id}
                    getItemCount={getItemCount}
                    getItem={getItem}
                />
            </View>
            }
            {index === 1 &&
            <View>
                <Text>ausleihen</Text>
            </View>
            }
        </View>
    )
}

const mapStateToProps = state => {
    return {
        friends: state.appReducer.friends,
        user: state.appReducer.user,
        auseihen: state.appReducer.auseihen,
    }
}

const mapDispatchToProps = dispatch => ({
    getFriendRequestsDispatch() {
        dispatch(getFriendRequests())
    },
    getAusleihenRequestsDispatch() {
        dispatch(getAusleihenRequests())
    },
    respondFriendRequestDispatch(id, accept) {
        dispatch(respondFriendRequest({id: id, accept: accept}))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(InboxScreen)