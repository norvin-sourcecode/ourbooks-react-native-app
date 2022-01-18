import React, {useRef, useState} from "react";
import {useEffect} from "react";
import {FlatList, SafeAreaView, Text, TouchableOpacity, View, VirtualizedList, Animated} from "react-native";
import { connect } from "react-redux";
import {Badge, Divider, Button, Card, SearchBar, ButtonGroup, Input, Overlay, Header} from "react-native-elements";
import {AntDesign, Ionicons, MaterialIcons} from "@expo/vector-icons";
import {
    getActivityFeed,
    getBibs,
    getFriendRequests,
    getFriends, getHelperForHomeListBibs, getHelperForHomeListFriends,
    getUserBibBooks,
    setShownBib,
    setShownBook
} from "../../../reducers/appSlice";
import DropDownPicker from "react-native-dropdown-picker";
import {BarCodeScanner} from "expo-barcode-scanner";
import CustomListItem from "../../../components/CustomListItem";


const HomeScreen = (props) => {

    const [visible, setVisible] = useState(false);

    const [bibsList, setBibsList] = useState([])

    const [bIndex, setBIndex] = useState(0);
    const tabs = ['geteilte Bücherregale', 'Aktivitäten']

    const [search, setSearch] = useState("")
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
        {label: 'neuste', value: '1'},
        {label: 'nur Freunde-Bücherregale', value: '2'},
        {label: 'nur Gruppen-Bücherregale', value: '3'}
    ]);

    const [data, setData] = useState([])

    const [data2, setData2] = useState([])

    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        (async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
        })();
    }, []);

    useEffect(() => {
        if (!props.friends.requests.loaded) {
            props.getFriendRequestsDispatch()
        }
        if (!props.friends.loaded) {
            props.getHelperForHomeListFriendsDispatch()
        }
        if (!props.bibs.loaded) {
            props.getHelperForHomeListBibsDispatch()
        }
        if (!props.activity.loaded) {
            props.getActivityFeedDispatch()
        }
    }, [props.friends.requests.loaded, props.bibs.loaded, props.friends.loaded, props.activity.loaded])

    useEffect(() => {
        setData2(props.activity.activityFeed)
        const tmp = []
        props.friends.requests.requestsList.map((request) => {
            tmp.push({kind:1, inhalt: request})
        })
        props.friends.friendsList.map((friend) => {
            tmp.push({kind:3, inhalt: friend})
        })
        props.bibs.bibsList.map((bib) => {
            tmp.push({kind:2, inhalt: bib})
        })
        setData(tmp)
    }, [props.bibs, props.friends, props.activity.activityFeed])

    const wait = (timeout) => {
        return new Promise(resolve => setTimeout(resolve, timeout));
    }

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        props.getHelperForHomeListBibsDispatch()
        props.getFriendRequestsDispatch()
        props.getHelperForHomeListFriendsDispatch()
        wait(1000).then(() => setRefreshing(false));
    }, []);

    const toggleOverlay = () => {
        setVisible(!visible);
    };

    function getItem (d, index) {
        return d[index]
    }

    function getItemCount (d) {
        return d.length
    }

    function handleAddABibPress() {
        props.navigation.navigate("add a bib")
    }

    return (
        <View style={{backgroundColor: "#2b2e32"}}>
            <Header
                centerComponent={{ text: 'Home', style: { color: 'white', fontWeight: "bold", fontSize:20} }}
                containerStyle={{    backgroundColor:"#2b2e32",    justifyContent: 'center', borderBottomWidth:0 }}
                rightComponent={bIndex === 0 && <TouchableOpacity onPress={handleAddABibPress}><Ionicons style={{position:"absolute", top: -8.5, right:-8.5}} name="add-sharp" size={40} color="white"/></TouchableOpacity>}
            />
            <View style={{paddingTop: 5, backgroundColor: "#2b2e32"}}>
                <ButtonGroup containerStyle={{borderWidth:2, borderColor:"white"}} buttonStyle={{backgroundColor:"#2b2e32"}} textStyle={{color: "white"}} selectedTextStyle={{color:"#2b2e32"}} selectedButtonStyle={{backgroundColor: 'white'}} onPress={setBIndex} selectedIndex={bIndex} buttons={tabs} />
                {bIndex === 1 &&
                <View>
                    <View style={{paddingRight:11, paddingLeft:11, height:50,paddingTop:9, paddingBottom:20}}>
                        <View style={{height:36, backgroundColor: "lightgrey",borderRadius: 10}}>
                            <DropDownPicker
                                placeholder={<View style={{paddingTop:7,flexDirection: "row"}}><MaterialIcons name="sort" size={24} color="grey" /><Text style={{paddingTop:1,color: "grey", fontSize: 18, paddingLeft: 5}}>sortieren nach...</Text></View>}
                                style={{height:36, backgroundColor: "#565a63",borderRadius: 10, borderWidth:0}}
                                containerStyle={{borderWidth:0}}
                                open={open}
                                value={value}
                                items={items}
                                setOpen={setOpen}
                                setValue={setValue}
                                setItems={setItems}
                                zIndex={9000}
                                textStyle={{color: "white"}}
                                dropDownContainerStyle={{borderWidth:0, backgroundColor: "#565a63"}}
                            />
                        </View>
                    </View>
                    <View style={{padding: 10,  zIndex : -5 }}>
                        <View style={{height:439, backgroundColor: "white", borderRadius: 10}}>
                            <VirtualizedList
                                data={data2}
                                initialNumToRender={4}
                                renderItem={({item, index}) => <Text navigation={props.navigation}>{item.message}</Text>}
                                keyExtractor={(item, index)=> 'key'+index+item.id}
                                getItemCount={getItemCount}
                                getItem={getItem}
                            />
                        </View>
                    </View>
                </View>
                }
                {bIndex === 0 &&
                <View style={{height: "100%", width: "100%"}}>
                    <SearchBar
                        containerStyle={{alignSelf: "center",paddingRight:3, paddingLeft:3, height:50, backgroundColor: "transparent",paddingTop:24, paddingBottom:20}}
                        inputStyle={{height:35, color: "white"}}
                        style={{height:35}}
                        leftIconContainerStyle={{color: "white"}}
                        inputContainerStyle={{height:35, backgroundColor:"#565a63"}}
                        placeholder="suche..."
                        onChangeText={value => setSearch(value)}
                        value={search}
                        platform={"ios"}
                        cancelButtonTitle="abbrechen"
                        cancelButtonProps={{color: "white"}}
                    />
                    <View>
                        { data.length === 0 &&
                        <Text style={{paddingTop: 100 ,textAlign: 'center', color: "grey"}}>noch keine geteilten Bücherregale...</Text>
                        }
                    </View>
                    <View style={{height:"50%",width:"100%" , paddingTop: 2}}>
                        <VirtualizedList
                            data={data}
                            initialNumToRender={3}
                            renderItem={({item, index}) => <CustomListItem i={item} index={index} navigation={props.navigation}/>}
                            keyExtractor={(item, index)=> 'key'+index+item.id}
                            getItemCount={getItemCount}
                            getItem={getItem}
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                        />
                    </View>
                </View>
                }
            </View>
        </View>
    )
}

const mapStateToProps = state => {
    return {
        bibs: state.appReducer.bibs,
        userBib: state.appReducer.userBib,
        friends: state.appReducer.friends,
        activity: state.appReducer.activity
    }
}

const mapDispatchToProps = dispatch => ({
    setShownBookDispatch(book) {
        dispatch(setShownBook(book))
    },
    getBibsDispatch() {
        dispatch(getBibs())
    },
    getFriendRequestsDispatch() {
        dispatch(getFriendRequests())
    },
    getFriendsDispatch() {
        dispatch(getFriends())
    },
    getHelperForHomeListBibsDispatch() {
        dispatch(getHelperForHomeListBibs())
    },
    getHelperForHomeListFriendsDispatch() {
        dispatch(getHelperForHomeListFriends())
    },
    getActivityFeedDispatch() {
        dispatch(getActivityFeed())
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)