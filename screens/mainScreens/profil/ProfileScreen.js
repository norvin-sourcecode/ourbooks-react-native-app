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
import SvgQRCode from 'react-native-qrcode-svg';
import { connect } from "react-redux";
import {
    Badge,
    Divider,
    ListItem,
    Button,
    Card,
    Avatar,
    Accessory,
    Input,
    Icon,
    Overlay,
    Header
} from "react-native-elements";
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

    function SimpleQR() {
        return <SvgQRCode value="123" />;
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
        <View style={{backgroundColor: "#2b2e32"}}>
            <Header
                centerComponent={{ text: 'Profil', style: { color: '#fdd560', fontWeight: "bold", fontSize:20} }}
                containerStyle={{    backgroundColor:"#2b2e32",    justifyContent: 'center', borderBottomWidth:0 }}
                rightComponent={<TouchableOpacity onPress={() => props.navigation.navigate('profilSettings')}><AntDesign style={{position:"absolute", top: -1.5, right:0}} name="setting" size={30} color="#fdd560"/></TouchableOpacity>}
            />
            <View style={{ padding:10, flexDirection:"row",justifyContent: "space-evenly"}}>
                <Avatar rounded
                        size="large"
                        source={require("./avatar-placeholder.png")}
                />
                <Text style={{alignSelf: "center",fontWeight: "bold", paddingBottom: 10, color:"#fdd560", fontSize:20}}>{props.user.username}</Text>
            </View>
            <View style={{ padding:10,justifyContent:"center"}}>
                <View style={{paddingBottom: 3,flexDirection: "row", justifyContent: "space-between"}}>
                    <Text style={{alignSelf: "center",fontWeight: "bold", paddingBottom: 10, color:"#fdd560"}}>Freund*innen:</Text>
                    <Text style={{alignSelf: "center",fontWeight: "bold", paddingBottom: 10, color:"#fdd560"}}>{friendsList.length}</Text>
                </View>
                <View style={{paddingBottom: 3,flexDirection: "row", justifyContent: "space-between"}}>
                    <Text style={{alignSelf: "center",fontWeight: "bold", paddingBottom: 10, color:"#fdd560"}}>Bücher:</Text>
                    <Text style={{alignSelf: "center",fontWeight: "bold", paddingBottom: 10, color:"#fdd560"}}>{props.userBib.booksList.length}</Text>
                </View>
            </View>
            <Card style={{height:"59%"}} wrapperStyle={{height:"59%"}} containerStyle={{height:"59%", flexDirection:"column"}}>
                <View style={{flexDirection:"row", width:"100%", height:"100%"}}>
                    <View style={{flexDirection:"column", width:"50%", height:"100%"}}>
                        <View style={{width:"100%", height:"50%"}}>

                            <View style={{alignSelf: "center", paddingTop: 35,transform: [{scale: 1.5}]}}>
                                <SimpleQR/>
                            </View>
                        </View>
                    </View>
                    <View style={{flexDirection:"column", width:"50%", height:"100%"}}>
                        <View style={{width:"100%", height:"50%"}}>

                        </View>
                        <View style={{width:"100%", height:"50%"}}>

                        </View>
                    </View>
                </View>
                <UserBibCard navigation={props.navigation}/>
                {/*<View style={{paddingBottom: 15,flexDirection: "row", justifyContent: "space-between", height:"60%", backgroundColor:"red"}}>*/}
                {/*    <View style={{justifyContent: 'space-between',width: "50%"}}>*/}
                {/*        <Avatar rounded*/}
                {/*                size="xlarge"*/}
                {/*                source={require("./avatar-placeholder.png")}*/}
                {/*        />*/}
                {/*        <View style={{alignItems: "center",paddingTop:45, transform: [{scale: 1.5}]}}>*/}
                {/*            <SimpleQR/>*/}
                {/*        </View>*/}
                {/*    </View>*/}
                {/*    <View style={{paddingLeft: 10,justifyContent: 'space-evenly', width: "50%", height:"100%"}}>*/}
                {/*        <View style={{width: "100%",height:"100%", flexDirection:"column", backgroundColor:"blue"}}>*/}
                {/*            <View style={{height:"50%", justifyContent: "space-evenly"}}>*/}
                {/*                <Text style={{alignSelf: "flex-start",fontWeight: "bold", paddingBottom: 10}}>{props.user.username}</Text>*/}
                {/*                <View style={{width: "100%"}}>*/}
                {/*                    <TouchableOpacity style={{paddingBottom: 3,flexDirection: "row", justifyContent: "space-between"}} onPress={()=>{props.navigation.navigate("profilFriends")}}>*/}
                {/*                        <Text>Freund*innen:</Text>*/}
                {/*                        <Text style={{fontWeight: "bold",}}>{friendsList.length}</Text>*/}
                {/*                    </TouchableOpacity>*/}
                {/*                    <Divider/>*/}
                {/*                    <View style={{paddingTop: 3,flexDirection: "row", justifyContent: "space-between"}}>*/}
                {/*                        <Text>Bücher:</Text>*/}
                {/*                        <Text style={{fontWeight: "bold",}}>{props.userBib.booksList.length}</Text>*/}
                {/*                    </View>*/}
                {/*                </View>*/}
                {/*            </View>*/}
                {/*            <View style={{height:"50%"}}>*/}

                {/*            </View>*/}
                {/*        </View>*/}
                {/*    </View>*/}
                {/*</View>*/}
            </Card>
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