import {Text, TouchableOpacity, View} from "react-native";
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
        props.navigation.navigate("ProcessScreen2")
    }

    return (
        <View>
            {props.p.status === 99 &&
            <View style={{height: 450, justifyContent: "center"}}>
                <Text style={{alignSelf: "center"}}>keine Anfragen</Text>
            </View>
            }
            {props.p.status !== 99 &&
            <TouchableOpacity onPress={() => {
                handleProcessPress(props.p)
            }}>
                <ListItem key={props.index + "list-item-process"} bottomDivider>
                    <ListItem.Content>
                        <View style={{width: "100%"}}>
                            <Text style={{fontWeight: "bold"}}>{props.p.book}</Text>
                            <Text>{props.p.bookReceiver}</Text>
                            <Text>{props.p.giveDate}</Text>
                            <Text>{props.p.returnDate}</Text>
                            <Text>{props.p.status}</Text>
                        </View>
                    </ListItem.Content>
                </ListItem>
            </TouchableOpacity>

            }
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