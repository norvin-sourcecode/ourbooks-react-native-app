import React, {useState} from "react";
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
import {AntDesign, Ionicons} from "@expo/vector-icons";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import {deleteFriend, getFriends, getUser, getUserBibBooks, sendFriendRequest} from "../../../reducers/appSlice";

const ProfilScreen = (props) => {

    const [friendsList, setFriendsList] = useState([])
    const [shownFriend, setShownFriend] = useState({})
    const [newFriendUsername, setNewFriendUsername] = useState("")
    const [newFriendOverlayVisible, setNewFriendOverlayVisible] = useState(false);
    const [friendOverlayVisible, setFriendOverlayVisible] = useState(false);

    useEffect(() => {
        if (!props.friends.loaded) {
            props.getFriendsDispatch()
        }
    }, [props.friends])

    useEffect(() => {
        setFriendsList(props.friends.friendsList)
    }, [props.friends]);


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
            <TouchableOpacity key={index+"touch-flaeche-freundesliste"} onPress={() => {
                toggleFriendOverlay(friend)
            }}>
                <ListItem key={index+"list-item-freundesliste"} bottomDivider>
                    <ListItem.Content>
                        <ListItem.Title>{friend.username}</ListItem.Title>
                    </ListItem.Content>
                </ListItem>
            </TouchableOpacity>
        </View>
    );

    return (
        <View>
            <Card>
                <View style={{paddingBottom: 15,flexDirection: "row", justifyContent: "space-between"}}>
                    <Avatar rounded
                            size="xlarge"
                            source={require("./avatar-placeholder.png")}
                    />
                    <View style={{paddingLeft: 10,justifyContent: 'space-evenly', width: "50%"}}>
                        <Text style={{alignSelf: "flex-start",fontWeight: "bold", paddingBottom: 10}}>{props.user.username}</Text>
                        <View style={{width: "100%"}}>
                            <View style={{paddingBottom: 3,flexDirection: "row", justifyContent: "space-between"}}>
                                <Text>Freunde:</Text>
                                <Text style={{fontWeight: "bold",}}>{friendsList.length}</Text>
                            </View>
                            <Divider/>
                            <View style={{paddingTop: 3,flexDirection: "row", justifyContent: "space-between"}}>
                                <Text>Bücher:</Text>
                                <Text style={{fontWeight: "bold",}}>{props.userBib.booksList.length}</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </Card>
            <View>
                <View style={{alignSelf: "center",width: "90%",flexDirection: "row", justifyContent: "space-between"}}>
                    <Text style={{padding: 15, fontWeight: "bold", fontSize: 17}}>Freunde:</Text>
                    <View style={{justifyContent: "center"}}>
                        <Ionicons name="add" size={35} color="black" onPress={toggleNewFriendOverlay}/>
                    </View>
                </View>
                <Divider style={{alignSelf: "center",width: "90%"}}/>
                <VirtualizedList
                    data={friendsList}
                    initialNumToRender={5}
                    renderItem={({item, index}) => <Item friend={item} index={index} />}
                    keyExtractor={(item, index)=> 'key'+index+item.id}
                    getItemCount={getItemCount}
                    getItem={getItem}
                />
                <Divider style={{alignSelf: "center",width: "90%"}}/>
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
        userBib: state.appReducer.userBib,
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
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(ProfilScreen)