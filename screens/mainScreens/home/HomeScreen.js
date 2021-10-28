import React, {useState} from "react";
import {useEffect} from "react";
import {FlatList, Text, TouchableOpacity, View, VirtualizedList} from "react-native";
import { connect } from "react-redux";
import {Badge, Divider, ListItem, Button, Card, SearchBar, ButtonGroup, Input, Overlay} from "react-native-elements";
import {AntDesign, Ionicons, MaterialIcons} from "@expo/vector-icons";
import {getBibs, getUserBibBooks, setShownBib, setShownBook} from "../../../reducers/appSlice";
import ListBib from "../../../components/ListBib";
import DropDownPicker from "react-native-dropdown-picker";

const HomeScreen = (props) => {

    const [visible, setVisible] = useState(false);

    const [bibsList, setBibsList] = useState([])

    const [bIndex, setBIndex] = useState(0);
    const tabs = ['Aktivitäten', 'geteilte Bücherregale']

    const [search, setSearch] = useState("")
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
        {label: 'neuste', value: '1'},
        {label: 'nur Freunde-Bücherregale', value: '2'},
        {label: 'nur Gruppen-Bücherregale', value: '3'}
    ]);

    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        if (!props.bibs.loaded) {
            //props.getBibsDispatch()
        }
    }, [props.userBib, props.bibs])

    useEffect(() => {
        setBibsList(props.bibs.bibsList)
    }, [props.bibs, props.userBib])

    const wait = (timeout) => {
        return new Promise(resolve => setTimeout(resolve, timeout));
    }

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        props.getUserBibBooksDispatch()
        wait(2000).then(() => setRefreshing(false));
    }, []);


    const toggleOverlay = () => {
        setVisible(!visible);
    };

    function getItem (data, index) {
        return data[index]
    }

    function getItemCount (data) {
        return data.length
    }

    function handleAddABibPress() {
        props.navigation.navigate("add a bib")

    }

    return (
        <View style={{paddingTop: 5}}>
            <ButtonGroup buttonStyle={{backgroundColor:"#2b2e32"}} textStyle={{color: "#fdd560"}} selectedTextStyle={{color:"#2b2e32"}} selectedButtonStyle={{backgroundColor: '#fdd560'}} onPress={setBIndex} selectedIndex={bIndex} buttons={tabs} />
            {bIndex === 0 &&
            <View>
                <View style={{paddingRight:11, paddingLeft:11, height:50,paddingTop:5, paddingBottom:20}}>
                    <View style={{height:36, backgroundColor: "lightgrey",borderRadius: 7.5}}>
                        <DropDownPicker
                            placeholder={<View style={{paddingTop:7,flexDirection: "row"}}><MaterialIcons name="sort" size={24} color="grey" /><Text style={{paddingTop:1,color: "grey", fontSize: 18, paddingLeft: 5}}>sortieren nach...</Text></View>}
                            style={{height:36, backgroundColor: "lightgrey",borderRadius: 7.5, borderWidth:0}}
                            containerStyle={{borderWidth:0}}
                            open={open}
                            value={value}
                            items={items}
                            setOpen={setOpen}
                            setValue={setValue}
                            setItems={setItems}
                        />
                    </View>
                </View>
                <View style={{padding: 15}}>
                    <Text>feed</Text>
                </View>
            </View>
            }
            {bIndex === 1 &&
            <View style={{height: "100%"}}>
                <SearchBar
                    containerStyle={{alignSelf: "center",paddingRight:3, paddingLeft:3, height:50, backgroundColor: "transparent",paddingTop:15, paddingBottom:20}}
                    inputStyle={{height:35}}
                    style={{height:35}}
                    inputContainerStyle={{height:35}}
                    placeholder="suche..."
                    onChangeText={value => setSearch(value)}
                    value={search}
                    platform={"ios"}
                    cancelButtonTitle="abbrechen"
                    cancelButtonProps={{color: "#fdd560"}}
                />
                <View>
                    { bibsList.length === 0 &&
                    <Text style={{paddingTop: 100 ,textAlign: 'center', color: "grey"}}>noch keine geteilten Bücherregale...</Text>
                    }
                </View>
                <View style={{height:"69%", paddingTop: 1}}>
                    <VirtualizedList
                        data={bibsList}
                        initialNumToRender={4}
                        renderItem={({item, index}) => <ListBib b={item} index={index} navigation={props.navigation}/>}
                        keyExtractor={(item, index)=> 'key'+index+item.id}
                        getItemCount={getItemCount}
                        getItem={getItem}
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                </View>
                <Divider/>
            </View>
            }
        </View>
    )
}

const mapStateToProps = state => {
    return {
        bibs: state.appReducer.bibs,
        userBib: state.appReducer.userBib,
    }
}

const mapDispatchToProps = dispatch => ({
    setShownBookDispatch(book) {
        dispatch(setShownBook(book))
    },
    getUserBibBooksDispatch() {
        dispatch(getUserBibBooks())
    },
    getBibsDispatch() {
        dispatch(getBibs())
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)