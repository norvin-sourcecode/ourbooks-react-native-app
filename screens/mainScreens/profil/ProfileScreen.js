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

const ProfilScreen = (props) => {

    const [friendsList, setFriendsList] = useState([])
    const [shownFriend, setShownFriend] = useState({})
    const [newFriendUsername, setNewFriendUsername] = useState("")
    const [newFriendOverlayVisible, setNewFriendOverlayVisible] = useState(false);
    const [friendOverlayVisible, setFriendOverlayVisible] = useState(false);
    const [userBibBooksList, setUserBibBooksList] = useState([])

    useEffect(() => {
        if (!props.friends.loaded) {
            props.getFriendsDispatch()
        }
        // const interval = setInterval(async () => {
        //     props.getFriendsDispatch()
        // }, 5000);
    }, [props.friends])

    useEffect(() => {
        setFriendsList(props.friends.friendsList)
    }, [props.friends,props.userBib]);


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
                            <TouchableOpacity style={{paddingBottom: 3,flexDirection: "row", justifyContent: "space-between"}} onPress={()=>{props.navigation.navigate("profilFriends")}}>
                                <Text>Freund*innen:</Text>
                                <Text style={{fontWeight: "bold",}}>{friendsList.length}</Text>
                            </TouchableOpacity>
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
                <UserBibCard navigation={props.navigation}/>
            </View>
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
    },
    setShownBookDispatch(book) {
        dispatch(setShownBook(book))
    },
    getUserBibBooksDispatch() {
        dispatch(getUserBibBooks())
    },
})

export default connect(mapStateToProps, mapDispatchToProps)(ProfilScreen)