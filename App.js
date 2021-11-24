import React, {useRef, useState} from 'react';
import { Provider } from 'react-redux'
import store from "./config/store";

import RootNavigation from "./navigation/RootNavigation";
import * as Notifications from "expo-notifications";

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
    }),
});

// Notifications.scheduleNotificationAsync({
//     content: {
//         title: "Time's up!",
//         body: 'Change sides!',
//     },
//     trigger: {
//         seconds: 5,
//     },
// });

const App = (props) =>{

    return (
        <Provider store={store}>
            <RootNavigation/>
        </Provider>
    )
}

export default App
