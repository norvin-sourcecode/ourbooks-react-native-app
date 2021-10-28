import React, {useCallback, useState, useLayoutEffect} from "react";
import {useEffect} from "react";
import {Text, TouchableOpacity, View, VirtualizedList} from "react-native";
import { connect } from "react-redux";
import {Badge, Button, ButtonGroup, Divider, ListItem} from 'react-native-elements';
import {GiftedChat} from "react-native-gifted-chat";
import {getGBibBooks, setShownBook} from "../../../reducers/appSlice";
import ListBook from "../../../components/ListBook";

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
        <View style={{height: "100%"}}>
            <View style={{paddingTop: 5}}>
                <ButtonGroup buttonStyle={{backgroundColor:"#2b2e32"}} textStyle={{color: "#fdd560"}} selectedTextStyle={{color:"#2b2e32"}} selectedButtonStyle={{backgroundColor: '#fdd560'}} onPress={setBIndex} selectedIndex={bIndex} buttons={tabs} />
                <Divider style={{paddingTop: 5}}/>
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