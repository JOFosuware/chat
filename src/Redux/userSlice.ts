import { createSlice } from "@reduxjs/toolkit";
import {userType} from "../Types";

export const defaultUser: userType = {
    id: "",
    username: "",
    email: "",
    isOnline: false,
    img: "",
    creationTime: "",
    lastSeen: "",
    bio: ""
}

const initialState = {
    // user: [],
    currentUser: defaultUser,
    // currentSelectedUser: null,
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action) => {
            const user = action.payload

            // store user in local storage
            localStorage.setItem("deChat_user", JSON.stringify(user))

            // set logged-in user
            state.currentUser = user
        },
        setUsers: (state, action) => {
            // set all users
        },
    },
})

export  const { setUser, setUsers } = userSlice.actions
export default userSlice.reducer