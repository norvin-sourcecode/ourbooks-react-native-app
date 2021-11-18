import React, {useLayoutEffect, useState} from "react";
import {useEffect} from "react";
import {
    FlatList, Image,
    KeyboardAvoidingView,
    Platform,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    VirtualizedList
} from "react-native";
import { connect } from "react-redux";
import {Badge, Divider, ListItem, Button, Card, Avatar, Accessory, Input, Icon, Overlay} from "react-native-elements";
import {AntDesign, Ionicons, MaterialIcons} from "@expo/vector-icons";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import {
    deleteFriend,
    getFriends,
    getUser,
    getUserBibBooks,
    sendFriendRequest,
    setShownBook
} from "../../../reducers/appSlice";
import UserBibCard from "../../../components/UserBibCard";
const FriendsScreen = (props) => {

    const [friendsList, setFriendsList] = useState([])
    const [shownFriend, setShownFriend] = useState({})
    const [newFriendUsername, setNewFriendUsername] = useState("")
    const [newFriendOverlayVisible, setNewFriendOverlayVisible] = useState(false);
    const [friendOverlayVisible, setFriendOverlayVisible] = useState(false);

    const [refreshing, setRefreshing] = useState(false);

    useLayoutEffect(()=>{
        props.navigation.setOptions({
            headerRight: ({}) => (
                <View>
                    <Ionicons style={{right: -14,top:-1}} name="add" size={40} color="#fdd560" onPress={toggleNewFriendOverlay}/>
                </View>
            )
        })
    },[])

    useEffect(() => {
        if (!props.friends.loaded) {
            props.getFriendsDispatch()
        }
    }, [props.friends])

    useEffect(() => {
        const tmp = []
        props.friends.friendsList.map((friend) => {
            tmp.push(friend)
        })
        if (tmp.length === 0) {
            setFriendsList([{
                username: "NOFRIENDS99999999999999999999999",
            }])
        } else {
            setFriendsList(tmp)
        }
    }, [props.friends,props.userBib]);

    const wait = (timeout) => {
        return new Promise(resolve => setTimeout(resolve, timeout));
    }

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        props.getFriendsDispatch()
        wait(2000).then(() => setRefreshing(false));
    }, []);



    const toggleNewFriendOverlay = () => {
        setNewFriendOverlayVisible(!newFriendOverlayVisible);
    };

    const toggleFriendOverlay = (friend) => {
        setShownFriend(friend)
        setFriendOverlayVisible(!friendOverlayVisible);
    };

    function getItem (data, index) {
        return data[index]
    }

    function getItemCount (data) {
        return data.length
    }

    function handelAddFriendPress() {
        if (newFriendUsername.length !== 0) {
            props.sendFriendRequestDispatch(newFriendUsername)
            setNewFriendOverlayVisible(false)
            setNewFriendUsername("")
        } else {
            alert("Eingabe überprüfen")
        }
    }

    function handelRemoveFriendPress(id) {
        props.deleteFriendDispatch(id)
    }

    const Item = ({ friend, index}) => (
        <View>
            {friend.username === "NOFRIENDS99999999999999999999999" &&
            <View style={{height: 450, justifyContent: "center"}}>
                <Text style={{alignSelf:"center"}}>keine Freund*innen</Text>
            </View>
            }
            {friend.username !== "NOFRIENDS99999999999999999999999" &&
            <TouchableOpacity key={index + "touch-flaeche-freundesliste"} onPress={() => {
                toggleFriendOverlay(friend)
            }}>
                <ListItem key={index + "list-item-freundesliste"} bottomDivider>
                    <ListItem.Content>
                        <ListItem.Title>{friend.username}</ListItem.Title>
                    </ListItem.Content>
                </ListItem>
            </TouchableOpacity>
            }
        </View>
    );

    return (
        <View>
            <View>
                <VirtualizedList
                    data={friendsList}
                    initialNumToRender={5}
                    renderItem={({item, index}) => <Item friend={item} index={index} />}
                    keyExtractor={(item, index)=> 'key'+index+item.id}
                    getItemCount={getItemCount}
                    getItem={getItem}
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                />
            </View>
            <Overlay isVisible={newFriendOverlayVisible} onBackdropPress={toggleNewFriendOverlay}>
                <View style={{width: 250}}>
                    <Input placeholder="username" value={newFriendUsername} onChangeText={value => setNewFriendUsername(value)} />
                    <Button title="Freund*in hinzufügen" onPress={handelAddFriendPress} buttonStyle={{backgroundColor: "black"}} />
                </View>
            </Overlay>
            <Overlay isVisible={friendOverlayVisible} onBackdropPress={toggleFriendOverlay}>
                <View style={{width: 250}}>
                    <Text>{shownFriend.username}</Text>
                    <Text>{shownFriend.firstname} {shownFriend.lastname}</Text>
                    <Text>{shownFriend.email}</Text>
                    <Button containerStyle={{paddingTop:10}} title="Freund*in entfernen" onPress={() => {handelRemoveFriendPress(shownFriend.id)}} buttonStyle={{backgroundColor: "black"}} />
                </View>
            </Overlay>
        </View>
    )
}

const mapStateToProps = state => {
    return {
        user: state.appReducer.user,
        friends: state.appReducer.friends,
    }
}

const mapDispatchToProps = dispatch => ({
    sendFriendRequestDispatch(username) {
        dispatch(sendFriendRequest({username: username}))
    },
    getFriendsDispatch() {
        dispatch(getFriends())
    },
    deleteFriendDispatch(id) {
        dispatch(deleteFriend({id: id}))
    },
})

export default connect(mapStateToProps, mapDispatchToProps)(FriendsScreen)