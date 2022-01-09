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
    const [friendOverlayVisible, setFriendOverlayVisible] = useState(false);
    const [userBibBooksList, setUserBibBooksList] = useState([])

    const [qrCodeOverlayVisible, setQrCodeOverlayVisible] = useState(false)

    useEffect(() => {
    }, [props.friends])

    useEffect(() => {
        setFriendsList(props.friends.friendsList)
    }, [props.friends,props.userBib]);

    const toggleQrCodeOverlay = () => {
        setQrCodeOverlayVisible(!qrCodeOverlayVisible);
    };

    function UserQR() {
        return <SvgQRCode value={"OURBOOK;"+props.user.username+";"+props.user.id} />;
    }

    return (
        <View style={{backgroundColor: "#2b2e32", height:"100%"}}>
            <Header
                centerComponent={{ text: props.user.username, style: { color: 'white', fontWeight: "bold", fontSize:20} }}
                containerStyle={{    backgroundColor:"#2b2e32",    justifyContent: 'center', borderBottomWidth:0 }}
                leftComponent={<TouchableOpacity onPress={() => props.navigation.navigate('profilFriends')}><AntDesign style={{position:"absolute", top: -1.5, left:0}} name="adduser" size={30} color="white"/></TouchableOpacity>}
                rightComponent={<TouchableOpacity onPress={() => toggleQrCodeOverlay()}><AntDesign style={{position:"absolute", top: -1.5, right:0}} name="qrcode" size={30} color="white"/></TouchableOpacity>}
            />
            <View style={{ padding:15, flexDirection:"row",justifyContent: "space-evenly"}}>
                <Avatar rounded
                        size="xlarge"
                        source={require("./avatar-placeholder.png")}
                />
            </View>
            <View style={{ padding:15,justifyContent:"center", paddingTop:20}}>
                <View style={{paddingBottom: 3,flexDirection: "row", justifyContent: "space-between"}}>
                    <Text style={{alignSelf: "center",fontWeight: "bold", paddingBottom: 10, color:"white"}}>Freund*innen:</Text>
                    <Text style={{alignSelf: "center",fontWeight: "bold", paddingBottom: 10, color:"white"}}>{friendsList.length}</Text>
                </View>
                <View style={{paddingBottom: 3,flexDirection: "row", justifyContent: "space-between"}}>
                    <Text style={{alignSelf: "center",fontWeight: "bold", paddingBottom: 10, color:"white"}}>Bücher:</Text>
                    <Text style={{alignSelf: "center",fontWeight: "bold", paddingBottom: 10, color:"white"}}>{props.userBib.booksList.length}</Text>
                </View>
            </View>
            <View style={{paddingTop: 5}}>
                <Card containerStyle={{borderRadius:10}}>
                    <Text style={{ color: '#2b2e32', fontWeight: "bold", fontSize:20, alignSelf: "center"}}>Nutzer-Bücherregal</Text>
                    <UserBibCard navigation={props.navigation}/>
                </Card>
            </View>
            <Overlay isVisible={qrCodeOverlayVisible} onBackdropPress={toggleQrCodeOverlay} >
                <View style={{borderColor: "white", borderWidth:3,alignSelf: "center",transform: [{scale: 2.5}]}}>
                    <UserQR/>
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
    },
    setShownBookDispatch(book) {
        dispatch(setShownBook(book))
    },
    getUserBibBooksDispatch() {
        dispatch(getUserBibBooks())
    },
})

export default connect(mapStateToProps, mapDispatchToProps)(ProfilScreen)