import React from 'react';
import { Provider } from 'react-redux'
import store from "./config/store";

import RootNavigation from "./navigation/RootNavigation";

const App = (props) =>{

    return (
        <Provider store={store}>
            <RootNavigation/>
        </Provider>
    )
}

export default App
