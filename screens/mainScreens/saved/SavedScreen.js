import React, {useState} from "react";
import {useEffect} from "react";
import {Text, TouchableOpacity, View, VirtualizedList} from "react-native";
import { connect } from "react-redux";
import {Button,Badge, ListItem, Tab, TabView} from 'react-native-elements';

const SavedScreen = (props) => {

    const [savedList, setSavedList] = useState([])

    useEffect(() => {
        if (!props.saved.loaded) {
            //nein props.getLeseListeBooksFromServerDispatchAusloeser(props.Communication.urlBase, props.Communication.conf)
        }
    }, [])

    useEffect(() => {
        setSavedList(props.saved.booksList)
    }, [props.book, props.userBib, props.saved])

    function getItem (data, index) {
        return data[index]
    }

    function getItemCount (data) {
        return data.length
    }

    const SavedBook = ({ book, index}) => (
        <View>
            <ListItem.Swipeable
                onPress={() => {
                    handleBookPress(book)
                }}
                rightContent={
                    <Button
                        title="entfernen"
                        icon={{ name: 'delete', color: 'white' }}
                        buttonStyle={{justifyContent: 'center', minHeight: '100%', backgroundColor: 'red' }}
                        onPress={() => {
                            console.log(book)
                        }}
                    />
                }
                key={index+"list-item-swipeable-leseliste"}
                bottomDivider>
                <ListItem.Content>
                    <ListItem.Title>Titel: {book.titel}</ListItem.Title>
                    <ListItem.Subtitle>Author*in: {book.authorName}</ListItem.Subtitle>
                    <ListItem.Subtitle>ISBN: {book.isbn}</ListItem.Subtitle>
                    <ListItem.Subtitle>Erscheinungsdatum: {book.erscheinungsDatum}</ListItem.Subtitle>
                </ListItem.Content>
                <ListItem.Chevron />
            </ListItem.Swipeable>
        </View>
    );

    function handleBookPress(book) {
        props.setShownBookDispatch(book)
        props.navigation.navigate("book")
    }

    return (
        <View>
            <View>
                { savedList.length === 0 &&
                <Text style={{paddingTop: 100 ,textAlign: 'center', color: "grey"}}>deine Leseliste ist noch leer...</Text>
                }
            </View>
            <VirtualizedList
                data={savedList}
                initialNumToRender={5}
                renderItem={({item, index}) => <SavedBook book={item} index={index} />}
                keyExtractor={(item, index)=> 'key'+index+item.id}
                getItemCount={getItemCount}
                getItem={getItem}
            />
        </View>
    )
}

const mapStateToProps = state => {
    return {
        saved: state.appReducer.saved,
        communication: state.appReducer.communication,
        userBib: state.appReducer.userBib
    }
}

const mapDispatchToProps = dispatch => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(SavedScreen)