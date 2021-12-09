
import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View, VirtualizedList} from 'react-native';
import {Button, Card, Divider, ListItem, Overlay} from "react-native-elements";
import {connect} from "react-redux";
import {AntDesign} from "@expo/vector-icons";
import ListProcess from "./ListProcess";
import {respondAusleihenRequest, respondFriendRequest} from "../reducers/appSlice";

const CustomProcessListItem = (props) => {

    const handelAcceptRequestPress = (request) => {
        props.resondAusleihenRequestsDispatch(request.id, true)
    }

    const handelDeclineRequestPress = (request) => {
        props.resondAusleihenRequestsDispatch(request.id, false)
    }

    return (
        <View key={props.index+"viewlistbibuwsprocessitwem"} style={{ paddingLeft: 2, paddingRight: 2, backgroundColor:"transparent" }}>
            <Card containerStyle={{padding: 0, paddingTop: 0, margin:8, marginBottom:0, borderWidth:0, backgroundColor: "white", borderRadius:10}}>
                { props.i.kind === 1 &&
                <View>
                    <View>
                        <Card>
                            <ListProcess p={props.i.inhalt} index={props.index} navigation={props.navigation} />
                        </Card>
                    </View>
                </View>
                }
                {props.i.kind === 2 &&
                <View style={{borderRadius:10}}>
                    <ListItem key={props.index+"list-item-reqsdfgduest"} bottomDivider>
                        <ListItem.Content>
                            <View style={{flexDirection:"row"}}>
                                <View style={{width: "100%", flexDirection: "row", flexWrap: "nowrap", justifyContent: "space-between"}}>
                                    <View style={{width: "75%",alignSelf: "center"}}>
                                        <Text style={{fontWeight: "bold"}}>{props.i.inhalt.message}</Text>
                                    </View>
                                    <View style={{flexDirection: "row", flexWrap: "nowrap"}}>
                                        <AntDesign style={{paddingRight: 10}} name="checkcircle" size={35} color="orange" onPress={() => {handelAcceptRequestPress(props.i.inhalt)}}/>
                                        <AntDesign name="closecircle" size={35} color="orange" onPress={() => {handelDeclineRequestPress(props.i.inhalt)}} />
                                    </View>
                                </View>
                            </View>
                        </ListItem.Content>
                    </ListItem>
                </View>
                }
                { props.i.kind === 3 &&
                <View>
                    <ListProcess p={props.i.inhalt} index={props.index} navigation={props.navigation} />
                </View>
                }
            </Card>
        </View>
    )
};


const mapStateToProps = state => {
    return {
    }
}

const mapDispatchToProps = dispatch => ({
    resondAusleihenRequestsDispatch(id, accept) {
        dispatch(respondAusleihenRequest({id: id, accept: accept}))
    },
    respondFriendRequestDispatch(id, accept) {
        dispatch(respondFriendRequest({id: id, accept: accept}))
    },
})

export default connect(mapStateToProps, mapDispatchToProps)(CustomProcessListItem)