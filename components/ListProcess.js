import {Image, Text, TouchableOpacity, View} from "react-native";
import {ListItem} from "react-native-elements";
import React from "react";
import {
    getAusleihenRequests,
    getFriendRequests, getLendingProcesses,
    respondAusleihenRequest,
    respondFriendRequest,
    setShownProcess
} from "../reducers/appSlice";
import {connect} from "react-redux";

const ListProcess = (props) => {

    function handleProcessPress(process) {
        props.setShownProcessDispatch(process)
        props.navigation.navigate("processScreenTest")
    }

    return (
        <View>
            <TouchableOpacity onPress={() => {
                handleProcessPress(props.p)
            }}>
                <ListItem key={props.index + "list-item-process"} bottomDivider>
                    <ListItem.Content>
                        <View style={{flexDirection: "row"}}>
                            <Image style={{alignSelf: "center",width: 64, height:100}} resizeMode="cover" source={{url:props.p.book.pictureUrl}}/>
                            <View style={{width: "100%"}}>
                                <Text style={{fontWeight: "bold"}}>{props.p.book.titel}</Text>
                                <Text>{props.p.bookReceiver}</Text>
                                <Text>{props.p.giveDate}</Text>
                                <Text>{props.p.returnDate}</Text>
                                <Text>{props.p.status}</Text>
                            </View>
                        </View>
                    </ListItem.Content>
                    <ListItem.Chevron style={{color:"black"}} />
                </ListItem>
            </TouchableOpacity>

        </View>
    )}

const mapStateToProps = state => {
    return {
    }
}

const mapDispatchToProps = dispatch => ({
    setShownProcessDispatch(process) {
        dispatch(setShownProcess(process))
    },
})

export default connect(mapStateToProps, mapDispatchToProps)(ListProcess)