import {createSlice, createSelector, createAsyncThunk} from '@reduxjs/toolkit'
import axios from "axios";

const initialState = {
    loaded: false,
    loading: false,
    error: null,
    ourbookLoggedIn: false,
    firebaseLoggedIn: false,
    communication: {
        urlBase: "",//"https://ourbooktest3-n52mpekfgq-ey.a.run.app",
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
        favoriteBooks: {
            fBook1: null,
            fBook2: null,
            fBook3: null,
        }
    },
    bibs: {
        loaded: false,
        loading: false,
        error: null,
        bibsList: []
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
        availableAt: [],
        pending: false,
        ratio: 0,
        description: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.",
    },
    saved: {
        loaded: false,
        loading: false,
        newlyAddedBooksList: [],
        booksList: [],
        error: null
    },
    friends: {
        loaded: false,
        loading: false,
        error: null,
        friend: {},
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
        status: 0,
        needReload: false

    },
    ausleihen: {
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
    activity:{
        loaded: false,
        loading: false,
        error: null,
        activityFeed: []
    },
    search: {
        search1: {
            loaded: false,
            loading: false,
            error: null,
            searchResultsList: [],
            searchResultsPage: 1
        },
        search2: {
            loaded: false,
            loading: false,
            error: null,
            searchResultsList: [],
            searchResultsPage: 1
        },
    }
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

export const sendPushToken = createAsyncThunk(
    'app/sendPushToken',
    async (data, { rejectWithValue, getState }) => {
        try {
            const tmpState = getState()
            const response = await axios
                .post(tmpState.appReducer.communication.urlBase+"/user/pushToken/"+data.pushToken,null, tmpState.appReducer.communication.conf)
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

export const searchBookByTitle = createAsyncThunk(
    'app/searchBookByTitle',
    async (data, { rejectWithValue, getState }) => {
        try {
            const tmpState = getState()
            const response = await axios
                .get(tmpState.appReducer.communication.urlBase+"/books/searchOnlineTitle/"+data.title, tmpState.appReducer.communication.conf)
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

export const searchUserByUsername = createAsyncThunk(
    'app/searchUserByUsername',
    async (data, { rejectWithValue, getState }) => {
        try {
            const tmpState = getState()
            const response = await axios
                .get(tmpState.appReducer.communication.urlBase+"/user/getUserByNameFiltered/"+data.username, tmpState.appReducer.communication.conf)
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

export const getFriendById = createAsyncThunk(
    'app/getFriendById',
    async (data, { rejectWithValue, getState }) => {
        try {
            const tmpState = getState()
            const response = await axios
                .get(tmpState.appReducer.communication.urlBase+"/user/getUserById/+"+data.id, tmpState.appReducer.communication.conf)
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

export const getBooksForBib = createAsyncThunk(
    'app/getBooksForBib',
    async (data, { rejectWithValue, getState }) => {
        try {
            const tmpState = getState()
            const response = await axios
                .get(tmpState.appReducer.communication.urlBase+"/books/forBookClub/"+data.id, tmpState.appReducer.communication.conf)
            return {books: response.data, bibId: data.id}
        } catch (err) {
            let error = err
            if (!error.response) {
                throw err
            }
            return rejectWithValue(error.response.data)
        }
    }
)

export const getBooksOfUser = createAsyncThunk(
    'app/getBooksOfUser',
    async (data, { rejectWithValue, getState }) => {
        try {
            const tmpState = getState()
            const response = await axios
                .get(tmpState.appReducer.communication.urlBase+"/books/forUser/"+data.id, tmpState.appReducer.communication.conf)
            return {books: response.data, friendId: data.id}
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
                .get(tmpState.appReducer.communication.urlBase+"/books/wishedFor", tmpState.appReducer.communication.conf)
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

export const getActivityFeed = createAsyncThunk(
    'app/getActivityFeed',
    async (data, { rejectWithValue, getState }) => {
        try {
            const tmpState = getState()
            const response = await axios
                .get(tmpState.appReducer.communication.urlBase+"/books/newlyAdded", tmpState.appReducer.communication.conf)
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
                .post(tmpState.appReducer.communication.urlBase+"/request/newGetBookRequest", {
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
                .get(tmpState.appReducer.communication.urlBase+"/process/lend", tmpState.appReducer.communication.conf)
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

export const getBorrowingProcesses = createAsyncThunk(
    'app/getBorrowingProcesses',
    async (data, { rejectWithValue, getState }) => {
        try {
            const tmpState = getState()
            const response = await axios
                .get(tmpState.appReducer.communication.urlBase+"/process/borrowed", tmpState.appReducer.communication.conf)
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

export const checkIfBookPending = createAsyncThunk(
    'app/checkIfBookPending',
    async (data, { rejectWithValue, getState }) => {
        try {
            const tmpState = getState()
            const response = await axios
                .get(tmpState.appReducer.communication.urlBase+"/books/alreadySend/"+data.id, tmpState.appReducer.communication.conf)
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

export const sendMessage = createAsyncThunk(
    'app/sendMessage',
    async (data, { rejectWithValue, getState }) => {
        try {
            const tmpState = getState()
            const response = await axios
                .post(tmpState.appReducer.communication.urlBase+"/messages/create",null,{
                    auth:  tmpState.appReducer.communication.conf.auth,
                    params: {
                        chatId: data.chatId,
                        text: data.text
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

export const createNewGBib = createAsyncThunk(
    'app/createNewGBib',
    async (data, { rejectWithValue, getState }) => {
        try {
            const tmpState = getState()
            const response = await axios
                .post(tmpState.appReducer.communication.urlBase+"/bookclub/createNew", {id:Math.random(), name: data.name, bookclubOwner: data.bookclubOwner, bookclubMembers: data.bookclubMembers},tmpState.appReducer.communication.conf)
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

export const getHelperForHomeListFriends = createAsyncThunk(
    'app/getHelperForHomeListFriends',
    async (data, { rejectWithValue, getState }) => {
        try {
            const tmpState = getState()
            const response = await axios
                .get(tmpState.appReducer.communication.urlBase+"/friend/bookShelves", tmpState.appReducer.communication.conf)
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

export const getHelperForHomeListBibs= createAsyncThunk(
    'app/getHelperForHomeListBibs',
    async (data, { rejectWithValue, getState }) => {
        try {
            const tmpState = getState()
            const response = await axios
                .get(tmpState.appReducer.communication.urlBase+"/bookclub/bookShelves",tmpState.appReducer.communication.conf)
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

export const getProcessById= createAsyncThunk(
    'app/getProcessById',
    async (data, { rejectWithValue, getState }) => {
        try {
            const tmpState = getState()
            const response = await axios
                .get(tmpState.appReducer.communication.urlBase+"/process/"+data.id,tmpState.appReducer.communication.conf)
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

export const agreeProcess= createAsyncThunk(
    'app/agreeProcess',
    async (data, { rejectWithValue, getState }) => {
        try {
            const tmpState = getState()
            const response = await axios
                .post(tmpState.appReducer.communication.urlBase+"/process/agree/"+data.processId,{
                    keep: data.keep,
                    bookClubs: data.bookClubs,
                    returnToGiver: data.returnToGiver,
                    weeksUsageTime: data.weeksUsageTime,
                } ,tmpState.appReducer.communication.conf)
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

export const setProcessDelivered = createAsyncThunk(
    'app/setProcessDelivered',
    async (data, { rejectWithValue, getState }) => {
        try {
            const tmpState = getState()
            const response = await axios
                .get(tmpState.appReducer.communication.urlBase+"/process/delivered/"+data.id,tmpState.appReducer.communication.conf)
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

export const setProcessReturned = createAsyncThunk(
    'app/setProcessReturned',
    async (data, { rejectWithValue, getState }) => {
        try {
            const tmpState = getState()
            const response = await axios
                .get(tmpState.appReducer.communication.urlBase+"/process/returned/"+data.id,tmpState.appReducer.communication.conf)
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
        setShownFriend: (state, action) => {
            state.friends.friend = action.payload
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
            state.process.needReload = false
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
            state.book.ratio = action.payload.ratio
            state.book.pending = false
            state.book.description = action.payload.description
        },
        setFavoriteBookByNum: (state, action) => {
            if (action.payload.number === 1) {
                state.userBib.favoriteBooks.fBook1 = action.payload.book
            }
            if (action.payload.number === 2) {
                state.userBib.favoriteBooks.fBook2 = action.payload.book
            }
            if (action.payload.number === 3) {
                state.userBib.favoriteBooks.fBook3 = action.payload.book
            }
        },
        setShownBib:(state, action) => {
            state.bib.id = action.payload.id
            state.bib.name = action.payload.name
            state.bib.bookclubOwner = action.payload.bookclubOwner
            state.bib.bookclubMembers = action.payload.bookclubMembers
        },
        clearSearch: (state, action) => {
            if (action.payload.searchNumber === 1){
                state.search.search1 = {
                    loaded: false,
                    loading: false,
                    error: null,
                    searchResultsList: [],
                    searchResultsPage: 1
                }
            }
            if (action.payload.searchNumber === 2){
                state.search.search2 = {
                    loaded: false,
                    loading: false,
                    error: null,
                    searchResultsList: [],
                    searchResultsPage: 1
                }
            }
        }
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
        [getFriendById.pending]: (state) => {
            state.friends.loaded = false
            state.friends.loading = true
            state.friends.error = null
        },
        [getFriendById.fulfilled]: (state, { payload }) => {
            state.friends.loaded = true
            state.friends.loading = false
            state.friends.error = null
            state.friends.friend = {
                id: payload.id,
                username: payload.username,
                firstname: payload.firstname,
                lastname: payload.lastname,
                email: payload.email,
                active: payload.active,
                token: null,
            }
        },
        [getFriendById.rejected]: (state, action ) => {
            state.friends.loaded = false
            state.friends.loading = false
            state.friends.error = action.payload
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
        [getBooksForBib.pending]: (state) => {
            state.bibs.loaded = false
            state.bibs.loading = true
            state.bibs.error = null
        },
        [getBooksForBib.fulfilled]: (state, { payload }) => {
            state.bibs.loaded = true
            state.bibs.loading = false
            state.bibs.error = null
            state.bibs.bibsList.map((bib) => {
                if (bib.id === payload.bibId) {
                    bib.booksList = payload.books
                }
            })
        },
        [getBooksForBib.rejected]: (state, action ) => {
            state.bibs.loaded = false
            state.bibs.loading = false
            state.bibs.error = action.payload
        },

        [getBooksOfUser.pending]: (state) => {
            state.friends.loaded = false
            state.friends.loading = true
            state.friends.error = null
        },
        [getBooksOfUser.fulfilled]: (state, { payload }) => {
            state.friends.loaded = true
            state.friends.loading = false
            state.friends.error = null
            state.friends.friendsList.map((friend) => {
                if (friend.id === payload.friendId) {
                    friend.booksList = payload.books
                }
            })
        },
        [getBooksOfUser.rejected]: (state, action ) => {
            state.friends.loaded = false
            state.friends.loading = false
            state.friends.error = action.payload
        },
        [getSaved.pending]: (state) => {
            state.saved.loaded = false
            state.saved.loading = true
            state.saved.error = null
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
            const newFriendsList = []
            payload.map(friend => {
                const newFriend = {
                    id: friend.id,
                    username: friend.username,
                    firstname: friend.firstname,
                    lastname: friend.lastname,
                    email: friend.email,
                    active: friend.active,
                    token: null,
                    booksList: []
                }
                newFriendsList.push(newFriend)
            })
            state.friends.friendsList = newFriendsList
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
            state.ausleihen.requests.loaded = false
            state.ausleihen.requests.loading = true
            state.ausleihen.requests.error = null
        },
        [getAusleihenRequests.fulfilled]: (state, { payload }) => {
            state.ausleihen.requests.loaded = true
            state.ausleihen.requests.loading = false
            state.ausleihen.requests.error = null
            state.ausleihen.requests.requestsList = payload
        },
        [getAusleihenRequests.rejected]: (state, action ) => {
            state.ausleihen.requests.loaded = false
            state.ausleihen.requests.loading = false
            state.ausleihen.requests.error = action.payload
        },
        [sendAusleihenRequest.pending]: (state) => {
            state.ausleihen.requests.loaded = false
            state.ausleihen.requests.loading = true
            state.ausleihen.requests.error = null
            state.book.loaded = false
        },
        [sendAusleihenRequest.fulfilled]: (state, { payload }) => {
            state.ausleihen.requests.loaded = true
            state.ausleihen.requests.loading = false
            state.ausleihen.requests.error = null
        },
        [sendAusleihenRequest.rejected]: (state, action ) => {
            state.ausleihen.requests.loaded = false
            state.ausleihen.requests.loading = false
            state.ausleihen.requests.error = action.payload
        },
        [respondAusleihenRequest.pending]: (state) => {
            state.ausleihen.requests.loaded = false
            state.ausleihen.requests.loading = true
            state.ausleihen.requests.error = null
        },
        [respondAusleihenRequest.fulfilled]: (state, { payload }) => {
            state.ausleihen.requests.loaded = true
            state.ausleihen.requests.loading = false
            state.ausleihen.requests.error = null
            state.ausleihen.loaded = false
        },
        [respondAusleihenRequest.rejected]: (state, action ) => {
            state.ausleihen.requests.loaded = false
            state.ausleihen.requests.loading = false
            state.ausleihen.requests.error = action.payload
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
            state.ausleihen.loaded = false
            state.ausleihen.loading = true
            state.ausleihen.error = null
        },
        [getLendingProcesses.fulfilled]: (state, { payload }) => {
            state.ausleihen.loaded = true
            state.ausleihen.loading = false
            state.ausleihen.lendingList = payload
        },
        [getLendingProcesses.rejected]: (state, action ) => {
            state.ausleihen.loaded = false
            state.ausleihen.loading = false
            state.ausleihen.error = action.payload
        },
        [getBorrowingProcesses.pending]: (state) => {
            state.ausleihen.loaded = false
            state.ausleihen.loading = true
            state.ausleihen.error = null
        },
        [getBorrowingProcesses.fulfilled]: (state, { payload }) => {
            state.ausleihen.loaded = true
            state.ausleihen.loading = false
            state.ausleihen.borrowedList = payload
        },
        [getBorrowingProcesses.rejected]: (state, action ) => {
            state.ausleihen.loaded = false
            state.ausleihen.loading = false
            state.ausleihen.error = action.payload
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
            state.book.ratio = payload.ratio
            state.book.timeCreated = payload.timeCreated
            state.book.titel = payload.titel
            state.book.pictureUrl = payload.pictureUrl
            state.book.availableAt = []
            state.book.pending = false
            state.book.description = payload.description
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
        [checkIfBookPending.pending]: (state) => {
            state.book.loaded = false
            state.book.loading = true
            state.book.error = null
        },
        [checkIfBookPending.fulfilled]: (state, { payload }) => {
            state.book.loaded = true
            state.book.loading = false
            state.book.error = null
            state.book.pending = payload
        },
        [checkIfBookPending.rejected]: (state, action ) => {
            state.userBib.loaded = false
            state.userBib.loading = false
            state.userBib.error = action.payload
        },
        [sendMessage.pending]: (state) => {
            state.ausleihen.loaded = false
            state.ausleihen.loading = true
            state.ausleihen.error = null
        },
        [sendMessage.fulfilled]: (state, { payload }) => {
            state.ausleihen.loaded = true
            state.ausleihen.loading = false
            state.ausleihen.error = null
        },
        [sendMessage.rejected]: (state, action ) => {
            state.ausleihen.loaded = false
            state.ausleihen.loading = false
            state.ausleihen.error = action.payload
        },
        [getHelperForHomeListFriends.pending]: (state) => {
            state.friends.loaded = false
            state.friends.loading = true
            state.friends.error = null
        },
        [getHelperForHomeListFriends.fulfilled]: (state, { payload }) => {
            state.friends.loaded = true
            state.friends.loading = false
            state.friends.error = null
            state.friends.friendsList = payload
        },
        [getHelperForHomeListFriends.rejected]: (state, action ) => {
            state.friends.loaded = false
            state.friends.loading = false
            state.friends.error = action.payload
        },
        [getHelperForHomeListBibs.pending]: (state) => {
            state.bibs.loaded = false
            state.bibs.loading = true
            state.bibs.error = null
        },
        [getHelperForHomeListBibs.fulfilled]: (state, { payload }) => {
            state.bibs.loaded = true
            state.bibs.loading = false
            state.bibs.error = null
            state.bibs.bibsList = payload
        },
        [getHelperForHomeListBibs.rejected]: (state, action ) => {
            state.bibs.loaded = false
            state.bibs.loading = false
            state.bibs.error = action.payload
        },
        [getActivityFeed.pending]: (state) => {
            state.activity.loaded = false
            state.activity.loading = true
            state.activity.error = null
        },
        [getActivityFeed.fulfilled]: (state, { payload }) => {
            state.activity.loaded = true
            state.activity.loading = false
            state.activity.error = null
            state.activity.activityFeed = payload
        },
        [getActivityFeed.rejected]: (state, action ) => {
            state.activity.loaded = false
            state.activity.loading = false
            state.activity.error = action.payload
        },
        [agreeProcess.pending]: (state) => {
            state.process.loaded = false
            state.process.loading = true
            state.process.error = null
            state.process.needReload = false
        },
        [agreeProcess.fulfilled]: (state, { payload }) => {
            state.process.loaded = true
            state.process.loading = false
            state.process.error = null
            state.process.book = payload.book
            state.process.bookGiver = payload.bookGiver
            state.process.bookReceiver = payload.bookReceiver
            state.process.giveDate = payload.giveDate
            state.process.id = payload.id
            state.process.returnDate = payload.returnDate
            state.process.status = payload.status
            state.process.needReload = false
        },
        [agreeProcess.rejected]: (state, action ) => {
            state.process.loaded = false
            state.process.loading = false
            state.process.error = action.payload
            state.process.needReload = false
        },
        [getProcessById.pending]: (state) => {
            state.process.loaded = false
            state.process.loading = true
            state.process.error = null
            state.process.needReload = false
        },
        [getProcessById.fulfilled]: (state, { payload }) => {
            state.process.loaded = true
            state.process.loading = false
            state.process.error = null
            state.process.book = payload.book
            state.process.bookGiver = payload.bookGiver
            state.process.bookReceiver = payload.bookReceiver
            state.process.giveDate = payload.giveDate
            state.process.id = payload.id
            state.process.returnDate = payload.returnDate
            state.process.status = payload.status
            state.process.needReload = false
        },
        [getProcessById.rejected]: (state, action ) => {
            state.process.loaded = false
            state.process.loading = false
            state.process.error = action.payload
            state.process.needReload = false
        },
        [setProcessDelivered.pending]: (state) => {
            state.process.loaded = false
            state.process.loading = true
            state.process.error = null
            state.process.needReload = false
        },
        [setProcessDelivered.fulfilled]: (state, { payload }) => {
            state.process.loaded = true
            state.process.loading = false
            state.process.error = null
            state.process.book = payload.book
            state.process.bookGiver = payload.bookGiver
            state.process.bookReceiver = payload.bookReceiver
            state.process.giveDate = payload.giveDate
            state.process.id = payload.id
            state.process.returnDate = payload.returnDate
            state.process.status = payload.status
            state.process.needReload = false
        },
        [setProcessDelivered.rejected]: (state, action ) => {
            state.process.loaded = false
            state.process.loading = false
            state.process.error = action.payload
            state.process.needReload = false
        },
        [setProcessReturned.pending]: (state) => {
            state.process.loaded = false
            state.process.loading = true
            state.process.error = null
            state.process.needReload = false
        },
        [setProcessReturned.fulfilled]: (state, { payload }) => {
            state.process.loaded = true
            state.process.loading = false
            state.process.error = null
            state.process.book = payload.book
            state.process.bookGiver = payload.bookGiver
            state.process.bookReceiver = payload.bookReceiver
            state.process.giveDate = payload.giveDate
            state.process.id = payload.id
            state.process.returnDate = payload.returnDate
            state.process.status = payload.status
            state.process.needReload = false
        },
        [setProcessReturned.rejected]: (state, action ) => {
            state.process.loaded = false
            state.process.loading = false
            state.process.error = action.payload
            state.process.needReload = false
        },
        [createNewGBib.pending]: (state) => {
            state.bib.loaded = false
            state.bib.loading = true
            state.bib.error = null
        },
        [createNewGBib.fulfilled]: (state, { payload }) => {
            state.bib.loaded = true
            state.bib.loading = false
            state.bib.error = null
            state.bibs.loaded = false
        },
        [createNewGBib.rejected]: (state, action ) => {
            state.bib.loaded = false
            state.bib.loading = false
            state.bib.error = action.payload
        },
        [searchBookByTitle.pending]: (state) => {
            state.search.search1.loaded = false
            state.search.search1.loading = true
            state.search.search1.error = null
        },
        [searchBookByTitle.fulfilled]: (state, { payload }) => {
            state.search.search1.loaded = true
            state.search.search1.loading = false
            state.search.search1.error = null
            state.search.search1.searchResultsList = payload
        },
        [searchBookByTitle.rejected]: (state, action ) => {
            state.search.search1.loaded = false
            state.search.search1.loading = false
            state.search.search1.error = action.payload
        },
        [searchUserByUsername.pending]: (state) => {
            state.search.search2.loaded = false
            state.search.search2.loading = true
            state.search.search2.error = null
        },
        [searchUserByUsername.fulfilled]: (state, { payload }) => {
            state.search.search2.loaded = true
            state.search.search2.loading = false
            state.search.search2.error = null
            state.search.search2.searchResultsList = payload
        },
        [searchUserByUsername.rejected]: (state, action ) => {
            state.search.search2.loaded = false
            state.search.search2.loading = false
            state.search.search2.error = action.payload
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
    firebaseLoginFailure,
    clearSearch,
    setShownFriend,
    setFavoriteBookByNum,
} = appSlice.actions

export default appSlice.reducer