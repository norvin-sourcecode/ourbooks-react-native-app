import React, {useCallback, useState, useLayoutEffect} from "react";
import {useEffect} from "react";
import {Text, TouchableOpacity, View, VirtualizedList} from "react-native";
import { connect } from "react-redux";
import {Badge, Button, ButtonGroup, Divider, Header, ListItem} from 'react-native-elements';
import {GiftedChat} from "react-native-gifted-chat";
import {getGBibBooks, setShownBook} from "../../../reducers/appSlice";
import ListBook from "../../../components/ListBook";
import {AntDesign, Ionicons} from "@expo/vector-icons";

const BibScreen = (props) => {

    const [bIndex, setBIndex] = useState(0);
    const tabs = ['Aktivitäten', 'Bücher']

    const [booksList, setBooksList] = useState([])
    const [targetBib, setTargetBib] = useState({})

    useEffect(() => {
        setTargetBib(props.bib)
        if (!props.bib.loaded) {
            //props.getGBibBooksDispatch(props.bib.id)
        }
    }, [props.bib])

    useEffect(() => {
        setBooksList(props.bib.booksList)
    }, [props.bib] )

    useEffect(() => {
        props.navigation.setOptions({ title: props.bib.name})
    }, [props.bib.name])

    function getItem (data, i) {
        return data[i]
    }

    function getItemCount (data) {
        return data.length
    }

    return (
        <View style={{backgroundColor: "#2b2e32"}}>
            <Header
                centerComponent={{ text: props.bib.name, style: { color: 'white', fontWeight: "bold", fontSize:20} }}
                containerStyle={{    backgroundColor:"#2b2e32",    justifyContent: 'center', borderBottomWidth:0 }}
                rightComponent={<TouchableOpacity onPress={() => props.navigation.goBack()}><AntDesign style={{position:"absolute", top: -1.5, right:0}} name="setting" size={30} color="white" /></TouchableOpacity>}
                leftComponent={<TouchableOpacity onPress={() => props.navigation.goBack()}><Ionicons style={{position:"absolute", top: -1.5, left:0}} name="chevron-back" size={30} color="white"/></TouchableOpacity>}

            />
            <View style={{paddingTop: 5}}>
                <ButtonGroup containerStyle={{borderWidth:2, borderColor:"white"}} buttonStyle={{backgroundColor:"#2b2e32"}} textStyle={{color: "white"}} selectedTextStyle={{color:"#2b2e32"}} selectedButtonStyle={{backgroundColor: 'white'}} onPress={setBIndex} selectedIndex={bIndex} buttons={tabs} />
            </View>
            <View style={{height: "100%"}}>
                {bIndex === 0 &&
                <View>
                    <Text>feed</Text>
                </View>
                // <View style={{height: "100%", paddingBottom: 60}}>
                //     <GiftedChat
                //
                //         messages={messages}
                //         onSend={messages => onSend(messages)}
                //         bottomOffset={50}
                //         user={{
                //             _id: 1,
                //         }}
                //     />
                // </View>
                }
                {bIndex === 1 &&
                <View>
                    <VirtualizedList
                        data={booksList}
                        initialNumToRender={5}
                        renderItem={({item, i}) => <ListBook b={item} index={i} navigation={props.navigation} />}
                        keyExtractor={(item, i)=> 'key'+i+item.id}
                        getItemCount={getItemCount}
                        getItem={getItem}
                    />
                </View>
                }
            </View>
        </View>

    )
}

const mapStateToProps = state => {
    return {
        bib: state.appReducer.bib,
        userBib: state.appReducer.userBib,
        saved: state.appReducer.saved,
    }
}

const mapDispatchToProps = dispatch => ({
    setShownBookDispatch(book) {
        dispatch(setShownBook(book))
    },
    getGBibBooksDispatch(id) {
        dispatch(getGBibBooks({id: id}))
    },
})

export default connect(mapStateToProps, mapDispatchToProps)(BibScreen)

// <ButtonGroup buttonStyle={{backgroundColor:"#2b2e32"}} textStyle={{color: "#fdd560"}} selectedTextStyle={{color:"#2b2e32"}} selectedButtonStyle={{backgroundColor: '#fdd560'}} onPress={setBIndex} selectedIndex={bIndex} buttons={tabs} />
// {bIndex === 0 &&