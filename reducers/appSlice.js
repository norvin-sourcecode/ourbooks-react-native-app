import {createSlice, createSelector, createAsyncThunk} from '@reduxjs/toolkit'
import axios from "axios";

const initialState = {
    loaded: false,
    loading: false,
    error: null,
    ourbookLoggedIn: false,
    firebaseLoggedIn: false,
    communication: {
        urlBase: "http://192.168.178.22:8080",
        token: null,
        conf: {
            auth: {
                username: "",
                password: "",
            }}
    },
    registerProcess: {
        success: false,
        loading: false,
        error: null
    },
    firebaseUser: {},
    user: {
        loaded: false,
        loading: false,
        error: null,
        id: 0,
        username: "platzhalter",
        password: "platzhalter",
        firstname: "platzhalter",
        lastname: "platzhalter",
        email: "platzhalter",
    },
    userBib: {
        loaded: false,
        loading: false,
        error: null,
        booksList: [],
    },
    bibs: {
        loaded: false,
        loading: false,
        error: null,
        bibsList: [{
            id: 0,
            name: "testBib1",
            bookclubOwner: 0,
            bookclubMembers: [2345,3454,3566],
            booksList: [{
                auflage: "string",
                authorName: "string",
                erscheinungsDatum: "string",
                id: 1,
                isbn: "string",
                sprache: "string",
                status: 0,
                timeCreated: "2021-10-01",
                titel: "platzhalter_buch",
                pictureUrl: "https://books.google.com/books?id=zyTCAlFPjgYC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
            },{
                auflage: "string",
                authorName: "string",
                erscheinungsDatum: "string",
                id: 0,
                isbn: "string",
                sprache: "string",
                status: 0,
                timeCreated: "2021-10-01",
                titel: "platzhalter_buch",
                pictureUrl: "",
            },{
                auflage: "string",
                authorName: "string",
                erscheinungsDatum: "string",
                id: 1,
                isbn: "string",
                sprache: "string",
                status: 0,
                timeCreated: "2021-10-01",
                titel: "platzhalter_buch",
                pictureUrl: "https://books.google.com/books?id=zyTCAlFPjgYC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
            },{
                auflage: "string",
                authorName: "string",
                erscheinungsDatum: "string",
                id: 0,
                isbn: "string",
                sprache: "string",
                status: 0,
                timeCreated: "2021-10-01",
                titel: "platzhalter_buch",
                pictureUrl: "",
            },{
                auflage: "string",
                authorName: "string",
                erscheinungsDatum: "string",
                id: 1,
                isbn: "string",
                sprache: "string",
                status: 0,
                timeCreated: "2021-10-01",
                titel: "platzhalter_buch",
                pictureUrl: "https://books.google.com/books?id=zyTCAlFPjgYC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
            },{
                auflage: "string",
                authorName: "string",
                erscheinungsDatum: "string",
                id: 0,
                isbn: "string",
                sprache: "string",
                status: 0,
                timeCreated: "2021-10-01",
                titel: "platzhalter_buch",
                pictureUrl: "",
            }]
        },{
            id: 0,
            name: "testBib1",
            bookclubOwner: 0,
            bookclubMembers: [2345,3454,3566],
            booksList: [{
                auflage: "string",
                authorName: "string",
                erscheinungsDatum: "string",
                id: 1,
                isbn: "string",
                sprache: "string",
                status: 0,
                timeCreated: "2021-10-01",
                titel: "platzhalter_buch",
                pictureUrl: "https://books.google.com/books?id=zyTCAlFPjgYC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
            },{
                auflage: "string",
                authorName: "string",
                erscheinungsDatum: "string",
                id: 0,
                isbn: "string",
                sprache: "string",
                status: 0,
                timeCreated: "2021-10-01",
                titel: "platzhalter_buch",
                pictureUrl: "",
            },{
                auflage: "string",
                authorName: "string",
                erscheinungsDatum: "string",
                id: 1,
                isbn: "string",
                sprache: "string",
                status: 0,
                timeCreated: "2021-10-01",
                titel: "platzhalter_buch",
                pictureUrl: "https://books.google.com/books?id=zyTCAlFPjgYC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
            },{
                auflage: "string",
                authorName: "string",
                erscheinungsDatum: "string",
                id: 0,
                isbn: "string",
                sprache: "string",
                status: 0,
                timeCreated: "2021-10-01",
                titel: "platzhalter_buch",
                pictureUrl: "",
            },{
                auflage: "string",
                authorName: "string",
                erscheinungsDatum: "string",
                id: 1,
                isbn: "string",
                sprache: "string",
                status: 0,
                timeCreated: "2021-10-01",
                titel: "platzhalter_buch",
                pictureUrl: "https://books.google.com/books?id=zyTCAlFPjgYC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
            },{
                auflage: "string",
                authorName: "string",
                erscheinungsDatum: "string",
                id: 0,
                isbn: "string",
                sprache: "string",
                status: 0,
                timeCreated: "2021-10-01",
                titel: "platzhalter_buch",
                pictureUrl: "",
            }]
        },{
            id: 0,
            name: "testBib1",
            bookclubOwner: 0,
            bookclubMembers: [2345,3454,3566],
            booksList: [{
                auflage: "string",
                authorName: "string",
                erscheinungsDatum: "string",
                id: 1,
                isbn: "string",
                sprache: "string",
                status: 0,
                timeCreated: "2021-10-01",
                titel: "platzhalter_buch",
                pictureUrl: "https://books.google.com/books?id=zyTCAlFPjgYC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
            },{
                auflage: "string",
                authorName: "string",
                erscheinungsDatum: "string",
                id: 0,
                isbn: "string",
                sprache: "string",
                status: 0,
                timeCreated: "2021-10-01",
                titel: "platzhalter_buch",
                pictureUrl: "",
            },{
                auflage: "string",
                authorName: "string",
                erscheinungsDatum: "string",
                id: 1,
                isbn: "string",
                sprache: "string",
                status: 0,
                timeCreated: "2021-10-01",
                titel: "platzhalter_buch",
                pictureUrl: "https://books.google.com/books?id=zyTCAlFPjgYC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
            },{
                auflage: "string",
                authorName: "string",
                erscheinungsDatum: "string",
                id: 0,
                isbn: "string",
                sprache: "string",
                status: 0,
                timeCreated: "2021-10-01",
                titel: "platzhalter_buch",
                pictureUrl: "",
            },{
                auflage: "string",
                authorName: "string",
                erscheinungsDatum: "string",
                id: 1,
                isbn: "string",
                sprache: "string",
                status: 0,
                timeCreated: "2021-10-01",
                titel: "platzhalter_buch",
                pictureUrl: "https://books.google.com/books?id=zyTCAlFPjgYC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
            },{
                auflage: "string",
                authorName: "string",
                erscheinungsDatum: "string",
                id: 0,
                isbn: "string",
                sprache: "string",
                status: 0,
                timeCreated: "2021-10-01",
                titel: "platzhalter_buch",
                pictureUrl: "",
            },]
        },{
            id: 0,
            name: "testBib1",
            bookclubOwner: 0,
            bookclubMembers: [2345,3454,3566],
            booksList: [{
                auflage: "string",
                authorName: "string",
                erscheinungsDatum: "string",
                id: 1,
                isbn: "string",
                sprache: "string",
                status: 0,
                timeCreated: "2021-10-01",
                titel: "platzhalter_buch",
                pictureUrl: "https://books.google.com/books?id=zyTCAlFPjgYC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
            },{
                auflage: "string",
                authorName: "string",
                erscheinungsDatum: "string",
                id: 0,
                isbn: "string",
                sprache: "string",
                status: 0,
                timeCreated: "2021-10-01",
                titel: "platzhalter_buch",
                pictureUrl: "",
            },{
                auflage: "string",
                authorName: "string",
                erscheinungsDatum: "string",
                id: 1,
                isbn: "string",
                sprache: "string",
                status: 0,
                timeCreated: "2021-10-01",
                titel: "platzhalter_buch",
                pictureUrl: "https://books.google.com/books?id=zyTCAlFPjgYC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
            },{
                auflage: "string",
                authorName: "string",
                erscheinungsDatum: "string",
                id: 0,
                isbn: "string",
                sprache: "string",
                status: 0,
                timeCreated: "2021-10-01",
                titel: "platzhalter_buch",
                pictureUrl: "",
            },{
                auflage: "string",
                authorName: "string",
                erscheinungsDatum: "string",
                id: 1,
                isbn: "string",
                sprache: "string",
                status: 0,
                timeCreated: "2021-10-01",
                titel: "platzhalter_buch",
                pictureUrl: "https://books.google.com/books?id=zyTCAlFPjgYC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
            },{
                auflage: "string",
                authorName: "string",
                erscheinungsDatum: "string",
                id: 0,
                isbn: "string",
                sprache: "string",
                status: 0,
                timeCreated: "2021-10-01",
                titel: "platzhalter_buch",
                pictureUrl: "",
            }]
        },{
            id: 0,
            name: "testBib1",
            bookclubOwner: 0,
            bookclubMembers: [2345,3454,3566],
            booksList: [{
                auflage: "string",
                authorName: "string",
                erscheinungsDatum: "string",
                id: 1,
                isbn: "string",
                sprache: "string",
                status: 0,
                timeCreated: "2021-10-01",
                titel: "platzhalter_buch",
                pictureUrl: "https://books.google.com/books?id=zyTCAlFPjgYC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
            },{
                auflage: "string",
                authorName: "string",
                erscheinungsDatum: "string",
                id: 0,
                isbn: "string",
                sprache: "string",
                status: 0,
                timeCreated: "2021-10-01",
                titel: "platzhalter_buch",
                pictureUrl: "",
            },{
                auflage: "string",
                authorName: "string",
                erscheinungsDatum: "string",
                id: 1,
                isbn: "string",
                sprache: "string",
                status: 0,
                timeCreated: "2021-10-01",
                titel: "platzhalter_buch",
                pictureUrl: "https://books.google.com/books?id=zyTCAlFPjgYC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
            },{
                auflage: "string",
                authorName: "string",
                erscheinungsDatum: "string",
                id: 0,
                isbn: "string",
                sprache: "string",
                status: 0,
                timeCreated: "2021-10-01",
                titel: "platzhalter_buch",
                pictureUrl: "",
            },{
                auflage: "string",
                authorName: "string",
                erscheinungsDatum: "string",
                id: 1,
                isbn: "string",
                sprache: "string",
                status: 0,
                timeCreated: "2021-10-01",
                titel: "platzhalter_buch",
                pictureUrl: "https://books.google.com/books?id=zyTCAlFPjgYC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
            },{
                auflage: "string",
                authorName: "string",
                erscheinungsDatum: "string",
                id: 0,
                isbn: "string",
                sprache: "string",
                status: 0,
                timeCreated: "2021-10-01",
                titel: "platzhalter_buch",
                pictureUrl: "",
            }]
        },]
    },
    bib: {
        loaded: false,
        loading: false,
        error: null,
        booksList: [],
        id: 0,
        name: "",
        bookclubOwner: 0,
        bookclubMembers: [],
    },
    book: {
        loaded: false,
        loading: false,
        error: null,
        auflage: "",
        authorName: "",
        erscheinungsDatum: "",
        id: 0,
        isbn: "",
        sprache: "",
        status: 0,
        timeCreated: "",
        titel: "",
        pictureUrl: "",
        availableAt: [{bookId: 1, username: "yannick"}],
    },
    saved: {
        loaded: false,
        loading: false,
        newlyAddedBooksList: [{
            auflage: "string",
            authorName: "string",
            erscheinungsDatum: "string",
            id: 1,
            isbn: "string",
            sprache: "string",
            status: 0,
            timeCreated: "2021-10-01",
            titel: "platzhalter_buch",
            pictureUrl: "https://books.google.com/books?id=zyTCAlFPjgYC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
        },{
            auflage: "string",
            authorName: "string",
            erscheinungsDatum: "string",
            id: 0,
            isbn: "string",
            sprache: "string",
            status: 0,
            timeCreated: "2021-10-01",
            titel: "platzhalter_buch",
            pictureUrl: "",
        },],
        booksList: [{
            auflage: "string",
            authorName: "string",
            erscheinungsDatum: "string",
            id: 1,
            isbn: "string",
            sprache: "string",
            status: 0,
            timeCreated: "2021-10-01",
            titel: "platzhalter_buch",
            pictureUrl: "https://books.google.com/books?id=zyTCAlFPjgYC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
        },{
            auflage: "string",
            authorName: "string",
            erscheinungsDatum: "string",
            id: 0,
            isbn: "string",
            sprache: "string",
            status: 0,
            timeCreated: "2021-10-01",
            titel: "platzhalter_buch",
            pictureUrl: "",
        },{
            auflage: "string",
            authorName: "string",
            erscheinungsDatum: "string",
            id: 1,
            isbn: "string",
            sprache: "string",
            status: 0,
            timeCreated: "2021-10-01",
            titel: "platzhalter_buch",
            pictureUrl: "https://books.google.com/books?id=zyTCAlFPjgYC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
        },],
        error: null
    },
    friends: {
        loaded: false,
        loading: false,
        error: null,
        friendsList: [],
        requests: {
            loaded: false,
            loading: false,
            error: null,
            requestsList: [],
        }
    },
    process: {
        loaded: false,
        loading: false,
        error: false,
        book: 0,
        bookGiver: 0,
        bookReceiver: 0,
        giveDate: "2021-10-28T17:02:19.778Z",
        id: 0,
        returnDate: "2021-10-28T17:02:19.778Z",
        status: 0
    },
    auseihen: {
        loaded: false,
        loading: false,
        error: null,
        requests: {
            loaded: false,
            loading: false,
            error: null,
            requestsList: [],
        },
        lendingList: [],
        borrowedList: [],

    },
}

export const register = createAsyncThunk(
    'app/register',
    async (data, { rejectWithValue, getState }) => {
        try {
            const tmpState = getState()
            const response = await axios
                .post(tmpState.appReducer.communication.urlBase+"/user/register", data.userData, {
                    params: {
                        password: data.password.toString()
                    }})
            return response.data
        } catch (err) {
            let error = err
            if (!error.response) {
                throw err
            }
            return rejectWithValue(error.response.data)
        }
    }
)

export const getUser = createAsyncThunk(
    'app/getUser',
    async (data, { rejectWithValue, getState }) => {
        try {
            const tmpState = getState()
            const response = await axios
                .get(tmpState.appReducer.communication.urlBase+"/user", tmpState.appReducer.communication.conf)
            return response.data
        } catch (err) {
            let error = err
            if (!error.response) {
                throw err
            }
            return rejectWithValue(error.response.data)
        }
    }
)

export const getUserBibBooks = createAsyncThunk(
    'app/getUserBibBooks',
    async (data, { rejectWithValue, getState }) => {
        try {
            const tmpState = getState()
            const response = await axios
                .get(tmpState.appReducer.communication.urlBase+"/books", tmpState.appReducer.communication.conf)
            return response.data
        } catch (err) {
            let error = err
            if (!error.response) {
                throw err
            }
            return rejectWithValue(error.response.data)
        }
    }
)

export const getSaved = createAsyncThunk(
    'app/getSaved',
    async (data, { rejectWithValue, getState }) => {
        try {
            const tmpState = getState()
            const response = await axios
                .get(tmpState.appReducer.communication.urlBase+"/books/forReadingList", tmpState.appReducer.communication.conf)
            return response.data
        } catch (err) {
            let error = err
            if (!error.response) {
                throw err
            }
            return rejectWithValue(error.response.data)
        }
    }
)

export const getNewlyAdded = createAsyncThunk(
    'app/getNewlyAdded',
    async (data, { rejectWithValue, getState }) => {
        try {
            const tmpState = getState()
            const response = await axios
                .get(tmpState.appReducer.communication.urlBase+"/books/newlyAdded/1", tmpState.appReducer.communication.conf)
            return response.data
        } catch (err) {
            let error = err
            if (!error.response) {
                throw err
            }
            return rejectWithValue(error.response.data)
        }
    }
)

export const getBibs = createAsyncThunk(
    'app/getBibs',
    async (data, { rejectWithValue, getState }) => {
        try {
            const tmpState = getState()
            const response = await axios
                .get(tmpState.appReducer.communication.urlBase+"/bookclub", tmpState.appReducer.communication.conf)
            return response.data
        } catch (err) {
            let error = err
            if (!error.response) {
                throw err
            }
            return rejectWithValue(error.response.data)
        }
    }
)

export const getFriends = createAsyncThunk(
    'app/getFriends',
    async (data, { rejectWithValue, getState }) => {
        try {
            const tmpState = getState()
            const response = await axios
                .get(tmpState.appReducer.communication.urlBase+"/friend", tmpState.appReducer.communication.conf)
            return response.data
        } catch (err) {
            let error = err
            if (!error.response) {
                throw err
            }
            return rejectWithValue(error.response.data)
        }
    }
)

export const getFriendRequests = createAsyncThunk(
    'app/getFriendRequests',
    async (data, { rejectWithValue, getState }) => {
        try {
            const tmpState = getState()
            const response = await axios
                .get(tmpState.appReducer.communication.urlBase+"/requests/friendRequests", tmpState.appReducer.communication.conf)
            return response.data
        } catch (err) {
            let error = err
            if (!error.response) {
                throw err
            }
            return rejectWithValue(error.response.data)
        }
    }
)

export const deleteFriend = createAsyncThunk(
    'app/deleteFriend',
    async (data, { rejectWithValue, getState }) => {
        try {
            const tmpState = getState()
            const response = await axios
                .delete(tmpState.appReducer.communication.urlBase+"/friend/"+data.id, tmpState.appReducer.communication.conf)
            return response.data
        } catch (err) {
            let error = err
            if (!error.response) {
                throw err
            }
            return rejectWithValue(error.response.data)
        }
    }
)

export const sendFriendRequest = createAsyncThunk(
    'app/sendFriendRequest',
    async (data, { rejectWithValue, getState }) => {
        try {
            const tmpState = getState()
            const response = await axios
                .post(tmpState.appReducer.communication.urlBase+"/request/newFriendRequest/"+data.username, null, tmpState.appReducer.communication.conf)
            return response.data
        } catch (err) {
            let error = err
            if (!error.response) {
                throw err
            }
            return rejectWithValue(error.response.data)
        }
    }
)

export const respondFriendRequest = createAsyncThunk(
    'app/respondFriendRequest',
    async (data, { rejectWithValue, getState }) => {
        try {
            const tmpState = getState()
            const response = await axios
                .post(tmpState.appReducer.communication.urlBase+"/request/respondFriendRequest/"+data.id, null, {
                    auth:  tmpState.appReducer.communication.conf.auth,
                    params: {
                        accept: data.accept
                    }})
            return response.data
        } catch (err) {
            let error = err
            if (!error.response) {
                throw err
            }
            return rejectWithValue(error.response.data)
        }
    }
)

export const getAusleihenRequests = createAsyncThunk(
    'app/getAusleihenRequests',
    async (data, { rejectWithValue, getState }) => {
        try {
            const tmpState = getState()
            const response = await axios
                .get(tmpState.appReducer.communication.urlBase+"/requests/getBookRequests", tmpState.appReducer.communication.conf)
            return response.data
        } catch (err) {
            let error = err
            if (!error.response) {
                throw err
            }
            return rejectWithValue(error.response.data)
        }
    }
)



export const sendAusleihenRequest = createAsyncThunk(
    'app/sendAusleihenRequest',
    async (data, { rejectWithValue, getState }) => {
        try {
            const tmpState = getState()
            const response = await axios
                .post(tmpState.appReducer.communication.urlBase+"/requests/newGetBookRequest", {
                    bookId: data.bookId,
                    id: 0,
                    message: data.message
                }, tmpState.appReducer.communication.conf)
            return response.data
        } catch (err) {
            let error = err
            if (!error.response) {
                throw err
            }
            return rejectWithValue(error.response.data)
        }
    }
)

export const respondAusleihenRequest = createAsyncThunk(
    'app/respondFriendRequest',
    async (data, { rejectWithValue, getState }) => {
        try {
            const tmpState = getState()
            const response = await axios
                .post(tmpState.appReducer.communication.urlBase+"/request/respondGetBookRequest/"+data.id, null, {
                    auth:  tmpState.appReducer.communication.conf.auth,
                    params: {
                        accept: data.accept
                    }})
            return response.data
        } catch (err) {
            let error = err
            if (!error.response) {
                throw err
            }
            return rejectWithValue(error.response.data)
        }
    }
)

export const getLendingProcesses = createAsyncThunk(
    'app/getLendingProcesses',
    async (data, { rejectWithValue, getState }) => {
        try {
            const tmpState = getState()
            const response = await axios
                .get(tmpState.appReducer.communication.urlBase+"/process/lend", {auth:tmpState.appReducer.communication.conf.auth})
            console.log(response.data)
            return response.data
        } catch (err) {
            let error = err
            if (!error.response) {
                throw err
            }
            return rejectWithValue(error.response.data)
        }
    }
)


export const addBookToUserBib = createAsyncThunk(
    'app/addBookToUserBib',
    async (data, { rejectWithValue, getState }) => {
        try {
            const tmpState = getState()
            const response = await axios
                .post(tmpState.appReducer.communication.urlBase+"/books/createBook",data.book, tmpState.appReducer.communication.conf)
            return response.data
        } catch (err) {
            let error = err
            if (!error.response) {
                throw err
            }
            return rejectWithValue(error.response.data)
        }
    }
)


export const getBookByIsbn = createAsyncThunk(
    'app/getBookByIsbn',
    async (data, { rejectWithValue, getState }) => {
        try {
            const tmpState = getState()
            const response = await axios
                .get(tmpState.appReducer.communication.urlBase+"/books/searchOnlineISBN/"+data.isbn, tmpState.appReducer.communication.conf)
            return response.data
        } catch (err) {
            let error = err
            if (!error.response) {
                throw err
            }
            return rejectWithValue(error.response.data)
        }
    }
)

export const deleteBookFromUserBib = createAsyncThunk(
    'app/deleteBookFromUserBib',
    async (data, { rejectWithValue, getState }) => {
        try {
            const tmpState = getState()
            const response = await axios
                .delete(tmpState.appReducer.communication.urlBase+"/books/"+data.id, tmpState.appReducer.communication.conf)
            return response.data
        } catch (err) {
            let error = err
            if (!error.response) {
                throw err
            }
            return rejectWithValue(error.response.data)
        }
    }
)

export const saveBook = createAsyncThunk(
    'app/saveBook',
    async (data, { rejectWithValue, getState }) => {
        try {
            const tmpState = getState()
            const response = await axios
                .post(tmpState.appReducer.communication.urlBase+"/readingList/addBookByIsbn/"+data.isbn,null, tmpState.appReducer.communication.conf)
            return response.data
        } catch (err) {
            let error = err
            if (!error.response) {
                throw err
            }
            return rejectWithValue(error.response.data)
        }
    }
)

export const deleteBookFromSaved = createAsyncThunk(
    'app/deleteBookFromSaved',
    async (data, { rejectWithValue, getState }) => {
        try {
            const tmpState = getState()
            const response = await axios
                .delete(tmpState.appReducer.communication.urlBase+"/readingList/removeBook/"+data.id, tmpState.appReducer.communication.conf)
            return response.data
        } catch (err) {
            let error = err
            if (!error.response) {
                throw err
            }
            return rejectWithValue(error.response.data)
        }
    }
)

export const getGBibBooks = createAsyncThunk(
    'app/getGBibBooks',
    async (data, { rejectWithValue, getState }) => {
        try {
            const tmpState = getState()
            const response = await axios
                .get(tmpState.appReducer.communication.urlBase+"/books/forBookClub/"+data.id, tmpState.appReducer.communication.conf)
            return response.data
        } catch (err) {
            let error = err
            if (!error.response) {
                throw err
            }
            return rejectWithValue(error.response.data)
        }
    }
)

export const checkIfBookAvailable = createAsyncThunk(
    'app/checkIfBookAvailable',
    async (data, { rejectWithValue, getState }) => {
        try {
            const tmpState = getState()
            const response = await axios
                .get(tmpState.appReducer.communication.urlBase+"/books/available/"+data.isbn, tmpState.appReducer.communication.conf)
            return response.data
        } catch (err) {
            let error = err
            if (!error.response) {
                throw err
            }
            return rejectWithValue(error.response.data)
        }
    }
)

const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        clearStatesForLogout: state => initialState,
        setLoaded: (state, action) => {
            state.loaded = action.payload
        },
        setUrlBase:(state, action) => {
            state.communication.urlBase = action.payload
        },
        setConf:(state, action) => {
            state.communication.conf.auth.username = action.payload.username
            state.communication.conf.auth.password = action.payload.password
        },
        firebaseLoginSuccess: (state, action) => {
            state.firebaseUser = action.payload
            state.firebaseLoggedIn = true
        },
        firebaseLoginFailure: (state, action) => {
            state.firebaseUser = null
            state.firebaseLoggedIn = false
        },
        setShownProcess:(state, action) => {
            state.process.loaded = false
            state.process.loading = false
            state.process.error = null
            state.process.book = action.payload.book
            state.process.bookGiver = action.payload.bookGiver
            state.process.bookReceiver = action.payload.bookReceiver
            state.process.giveDate = action.payload.giveDate
            state.process.id = action.payload.id
            state.process.returnDate = action.payload.returnDate
            state.process.status = action.payload.status
        },
        setShownBook:(state, action) => {
            state.book.loaded = false
            state.book.loading = false
            state.book.error = null
            state.book.authorName = action.payload.authorName
            state.book.erscheinungsDatum = action.payload.erscheinungsDatum
            state.book.id = action.payload.id
            state.book.isbn = action.payload.isbn
            state.book.sprache = action.payload.sprache
            state.book.status = action.payload.status
            state.book.timeCreated = action.payload.timeCreated
            state.book.titel = action.payload.titel
            state.book.pictureUrl = action.payload.pictureUrl
            state.book.availableAt = []
        },
        setShownBib:(state, action) => {
            state.bib.id = action.payload.id
            state.bib.name = action.payload.name
            state.bib.bookclubOwner = action.payload.bookclubOwner
            state.bib.bookclubMembers = action.payload.bookclubMembers
        },
    },
    extraReducers: {
        [register.pending]: (state) => {
            state.registerProcess.success = false
            state.registerProcess.loading = true
            state.registerProcess.error = null
        },
        [register.fulfilled]: (state, { payload }) => {
            state.registerProcess.success = true
            state.registerProcess.loading = false
            state.registerProcess.error = null
        },
        [register.rejected]: (state, action ) => {
            state.registerProcess.success = false
            state.registerProcess.loading = false
            state.registerProcess.error = action.payload
        },
        [getUser.pending]: (state) => {
            state.user.loaded = false
            state.user.loading = true
            state.user.error = null
        },
        [getUser.fulfilled]: (state, { payload }) => {
            state.user.loaded = true
            state.user.loading = false
            state.user.error = null
            state.user.id = payload.id
            state.user.username = payload.username
            state.user.firstname = payload.firstname
            state.user.lastname = payload.lastname
            state.user.email = payload.email
            state.communication.token = payload.token
            state.ourbookLoggedIn = true
        },
        [getUser.rejected]: (state, action ) => {
            state.user.loaded = false
            state.user.loading = false
            state.user.error = action.payload
        },
        [getUserBibBooks.pending]: (state) => {
            state.userBib.loaded = false
            state.userBib.loading = true
            state.userBib.error = null
        },
        [getUserBibBooks.fulfilled]: (state, { payload }) => {
            state.userBib.loaded = true
            state.userBib.loading = false
            state.userBib.error = null
            state.userBib.booksList = payload
        },
        [getUserBibBooks.rejected]: (state, action ) => {
            state.userBib.loaded = false
            state.userBib.loading = false
            state.userBib.error = action.payload
        },
        [getSaved.pending]: (state) => {
            state.saved.loaded = false
            state.saved.loading = true
            state.saved.error = null
        },
        [getSaved.fulfilled]: (state, { payload }) => {
            state.saved.loaded = true
            state.saved.loading = false
            state.saved.error = null
            state.saved.booksList = payload
        },
        [getSaved.rejected]: (state, action ) => {
            state.saved.loaded = false
            state.saved.loading = false
            state.saved.error = action.payload
        },
        [getNewlyAdded.pending]: (state) => {
            state.saved.loaded = false
            state.saved.loading = true
            state.saved.error = null
        },
        [getNewlyAdded.fulfilled]: (state, { payload }) => {
            state.saved.loaded = true
            state.saved.loading = false
            state.saved.error = null
            state.saved.newlyAddedBooksList = payload
        },
        [getNewlyAdded.rejected]: (state, action ) => {
            state.saved.loaded = false
            state.saved.loading = false
            state.saved.error = action.payload
        },
        [getBibs.pending]: (state) => {
            state.bibs.loaded = false
            state.bibs.loading = true
            state.bibs.error = null
        },
        [getBibs.fulfilled]: (state, { payload }) => {
            state.bibs.loaded = true
            state.bibs.loading = false
            state.bibs.error = null
            const newBibsList = []
            payload.map(bib => {
                const newBib = {
                    id: bib.id,
                    name: bib.name,
                    bookclubOwner: bib.bookclubOwner,
                    bookclubMembers: bib.bookclubMembers,
                    booksList: []
                }
                newBibsList.push(newBib)
            })
            state.bibs.bibsList = newBibsList
        },
        [getBibs.rejected]: (state, action ) => {
            state.bibs.loaded = false
            state.bibs.loading = false
            state.bibs.error = action.payload
        },
        [getFriends.pending]: (state) => {
            state.friends.loaded = false
            state.friends.loading = true
            state.friends.error = null
        },
        [getFriends.fulfilled]: (state, { payload }) => {
            state.friends.loaded = true
            state.friends.loading = false
            state.friends.error = null
            state.friends.friendsList = payload
        },
        [getFriends.rejected]: (state, action ) => {
            state.friends.loaded = false
            state.friends.loading = false
            state.friends.error = action.payload
        },
        [deleteFriend.pending]: (state) => {
            state.friends.loaded = false
            state.friends.loading = true
            state.friends.error = null
        },
        [deleteFriend.fulfilled]: (state, { payload }) => {
            state.friends.loaded = false
            state.friends.loading = false
            state.friends.error = null
        },
        [deleteFriend.rejected]: (state, action ) => {
            state.friends.loaded = false
            state.friends.loading = false
            state.friends.error = action.payload
        },
        [getFriendRequests.pending]: (state) => {
            state.friends.requests.loaded = false
            state.friends.requests.loading = true
            state.friends.requests.error = null
        },
        [getFriendRequests.fulfilled]: (state, { payload }) => {
            state.friends.requests.loaded = true
            state.friends.requests.loading = false
            state.friends.requests.error = null
            state.friends.requests.requestsList = payload
        },
        [getFriendRequests.rejected]: (state, action ) => {
            state.friends.requests.loaded = false
            state.friends.requests.loading = false
            state.friends.requests.error = action.payload
        },
        [getAusleihenRequests.pending]: (state) => {
            state.auseihen.requests.loaded = false
            state.auseihen.requests.loading = true
            state.auseihen.requests.error = null
        },
        [getAusleihenRequests.fulfilled]: (state, { payload }) => {
            state.auseihen.requests.loaded = true
            state.auseihen.requests.loading = false
            state.auseihen.requests.error = null
            state.auseihen.requests.requestsList = payload
        },
        [getAusleihenRequests.rejected]: (state, action ) => {
            state.auseihen.requests.loaded = false
            state.auseihen.requests.loading = false
            state.auseihen.requests.error = action.payload
        },
        [sendAusleihenRequest.pending]: (state) => {
            state.auseihen.requests.loaded = false
            state.auseihen.requests.loading = true
            state.auseihen.requests.error = null
        },
        [sendAusleihenRequest.fulfilled]: (state, { payload }) => {
            state.auseihen.requests.loaded = true
            state.auseihen.requests.loading = false
            state.auseihen.requests.error = null
        },
        [sendAusleihenRequest.rejected]: (state, action ) => {
            state.auseihen.requests.loaded = false
            state.auseihen.requests.loading = false
            state.auseihen.requests.error = action.payload
        },
        [respondAusleihenRequest.pending]: (state) => {
            state.auseihen.requests.loaded = false
            state.auseihen.requests.loading = true
            state.auseihen.requests.error = null
        },
        [respondAusleihenRequest.fulfilled]: (state, { payload }) => {
            state.auseihen.requests.loaded = true
            state.auseihen.requests.loading = false
            state.auseihen.requests.error = null
            state.auseihen.loaded = false
        },
        [respondAusleihenRequest.rejected]: (state, action ) => {
            state.auseihen.requests.loaded = false
            state.auseihen.requests.loading = false
            state.auseihen.requests.error = action.payload
        },
        [sendFriendRequest.pending]: (state) => {
            state.friends.requests.loaded = false
            state.friends.requests.loading = true
            state.friends.requests.error = null
        },
        [sendFriendRequest.fulfilled]: (state, { payload }) => {
            state.friends.requests.loaded = true
            state.friends.requests.loading = false
            state.friends.requests.error = null
        },
        [sendFriendRequest.rejected]: (state, action ) => {
            state.friends.requests.loaded = false
            state.friends.requests.loading = false
            state.friends.requests.error = action.payload
        },
        [respondFriendRequest.pending]: (state) => {
            state.friends.requests.loaded = false
            state.friends.requests.loading = true
            state.friends.requests.error = null
        },
        [respondFriendRequest.fulfilled]: (state, { payload }) => {
            state.friends.loaded = false
            state.friends.requests.loaded = false
            state.friends.requests.loading = false
            state.friends.requests.error = null
        },
        [respondFriendRequest.rejected]: (state, action ) => {
            state.friends.requests.loaded = false
            state.friends.requests.loading = false
            state.friends.requests.error = action.payload
        },
        [getLendingProcesses.pending]: (state) => {
            state.auseihen.loaded = false
            state.auseihen.loading = true
            state.auseihen.error = null
        },
        [getLendingProcesses.fulfilled]: (state, { payload }) => {
            state.auseihen.loaded = false
            state.auseihen.loading = false
            state.auseihen.lendingList = payload
        },
        [getLendingProcesses.rejected]: (state, action ) => {
            state.auseihen.loaded = false
            state.auseihen.loading = false
            state.auseihen.error = action.payload
        },
        [addBookToUserBib.pending]: (state) => {
            state.book.loaded = false
            state.book.loading = true
            state.book.error = null
        },
        [addBookToUserBib.fulfilled]: (state, { payload }) => {
            state.book.loaded = true
            state.book.loading = false
            state.userBib.loaded = false
            state.book.error = null
        },
        [addBookToUserBib.rejected]: (state, action ) => {
            state.book.loaded = false
            state.book.loading = false
            state.book.error = action.payload
        },
        [getBookByIsbn.pending]: (state) => {
            state.book.loaded = false
            state.book.loading = true
            state.book.error = null
        },
        [getBookByIsbn.fulfilled]: (state, { payload }) => {
            state.book.loaded = true
            state.book.loading = false
            state.book.error = null
            state.book.auflage = payload.auflage
            state.book.authorName = payload.authorName
            state.book.erscheinungsDatum = payload.erscheinungsDatum
            state.book.id = payload.id
            state.book.isbn = payload.isbn
            state.book.sprache = payload.sprache
            state.book.status = payload.status
            state.book.timeCreated = payload.timeCreated
            state.book.titel = payload.titel
            state.book.pictureUrl = payload.pictureUrl
            state.book.availableAt = []
        },
        [getBookByIsbn.rejected]: (state, action ) => {
            state.book.loaded = false
            state.book.loading = false
            state.book.error = action.payload
        },
        [deleteBookFromUserBib.pending]: (state) => {
            state.book.loaded = false
            state.book.loading = true
            state.book.error = null
        },
        [deleteBookFromUserBib.fulfilled]: (state, { payload }) => {
            state.book.loaded = true
            state.book.loading = false
            state.userBib.loaded = false
            state.book.error = null
        },
        [deleteBookFromUserBib.rejected]: (state, action ) => {
            state.book.loaded = false
            state.book.loading = false
            state.book.error = action.payload
        },
        [saveBook.pending]: (state) => {
            state.book.loaded = false
            state.book.loading = true
            state.book.error = null
        },
        [saveBook.fulfilled]: (state, { payload }) => {
            state.book.loaded = true
            state.book.loading = false
            state.saved.loaded = false
            state.book.error = null
        },
        [saveBook.rejected]: (state, action ) => {
            state.book.loaded = false
            state.book.loading = false
            state.book.error = action.payload
        },
        [deleteBookFromSaved.pending]: (state) => {
            state.book.loaded = false
            state.book.loading = true
            state.book.error = null
        },
        [deleteBookFromSaved.fulfilled]: (state, { payload }) => {
            state.book.loaded = true
            state.book.loading = false
            state.saved.loaded = false
            state.book.error = null
        },
        [deleteBookFromSaved.rejected]: (state, action ) => {
            state.book.loaded = false
            state.book.loading = false
            state.book.error = action.payload
        },
        [getGBibBooks.pending]: (state) => {
            state.bib.loaded = false
            state.bib.loading = true
            state.bib.error = null
        },
        [getGBibBooks.fulfilled]: (state, { payload }) => {
            state.bib.loaded = true
            state.bib.loading = false
            state.bib.error = null
            state.bib.booksList = payload
        },
        [getGBibBooks.rejected]: (state, action ) => {
            state.bib.loaded = false
            state.bib.loading = false
            state.bib.error = action.payload
        },
        [checkIfBookAvailable.pending]: (state) => {
            state.book.loaded = false
            state.book.loading = true
            state.book.error = null
        },
        [checkIfBookAvailable.fulfilled]: (state, { payload }) => {
            state.book.loaded = true
            state.book.loading = false
            state.book.error = null
            state.book.availableAt = payload
        },
        [checkIfBookAvailable.rejected]: (state, action ) => {
            state.userBib.loaded = false
            state.userBib.loading = false
            state.userBib.error = action.payload
        },
    },
})

export const {
    setUrlBase,
    setConf,
    setLoaded,
    setShownBook,
    setShownBib,
    setShownProcess,
    clearStatesForLogout,
    firebaseLoginSuccess,
    firebaseLoginFailure
} = appSlice.actions

export default appSlice.reducer