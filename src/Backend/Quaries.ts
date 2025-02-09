import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "@firebase/auth"
import {setDoc, doc, getDoc, updateDoc, serverTimestamp} from "@firebase/firestore"
import {NavigateFunction} from "react-router-dom";
import {auth, db} from "./Firebase";
import {toastErr} from "../utils/toast";
import CatchErr from "../utils/catchErr";
import {authDataType, setLoadingType, userType} from "../Types";
import {defaultUser, setUser} from "../Redux/userSlice";
import {AppDispatch} from "../Redux/store";
import ConvertTime from "../utils/ConvertTime";
import AvatarGenerator from "../utils/avatarGenerator";

const usersColl = "users"
const tasksColl = "tasks"
const taskListColl = "taskList"
const chatsColl = "chats"
const messagesColl = "messages"

// register or signup a user
export function BE_signUp(
    data: authDataType,
    setLoading:  setLoadingType,
    reset: () => void,
    goTo:  NavigateFunction,
    dispatch: AppDispatch
) {
    const {email, password, confirmPassword} = data
    if (email && password){
        if (password === confirmPassword){
            // loading true
            setLoading(true)
            createUserWithEmailAndPassword(auth, email, password)
                .then(async ({user}) => {
                    // generate user avatar with username
                    const imgLink = AvatarGenerator(user.email?.split("@")[0])

                   const userData = await addUserToCollection(
                       user.uid,
                       user.email || "",
                       user.email?.split("@")[0] || "",
                       imgLink
                   )

                    // set user in store
                    dispatch(setUser(userData))

                    setLoading(false)
                    reset()
                    goTo("/dashboard")
                }).catch((err) => {
                CatchErr(err)
                setLoading(false)
            })
        }else toastErr("Passwords must match!", setLoading)
    } else toastErr("Fields shouldn't be left empty!", setLoading)
}

// login a user
export function BE_signIn(
    data: authDataType,
    setLoading:  setLoadingType,
    reset: () => void,
    goTo:  NavigateFunction,
    dispatch: AppDispatch
){
    const {email, password} = data

    // loading true
    setLoading(true)

    signInWithEmailAndPassword(auth, email, password)
        .then(async ({user}) => {

            // TODO: update user isOnline to true
            await updateUserData({id: user.uid, isOnline: true})

            // get user info
            const userData = await getUserData(user.uid)

            //TODO: set user in store and local storage
            dispatch(setUser(userData))

            setLoading(false)
            reset()
            goTo("/dashboard")
        })
        .catch((err) => {
            CatchErr(err)
            setLoading(false)
        })
}

// add user to collection
async function addUserToCollection(
    id: string,
    email: string,
    username: string,
    img: string,
){
    await setDoc(doc(db, usersColl, id), {
        isOnline: true,
        img,
        username,
        email,
        creationTime: serverTimestamp(),
        lastSeen: serverTimestamp(),
        bio: `Hi, my name is ${username}, thanks to Desmond I understand React and Typescript now.`
    })

    return await getUserData(id)
}

// get user information
async function getUserData(id: string): Promise<userType>{
    const userRef = doc(db, usersColl, id)
    const user = await getDoc(userRef)

    if(user.exists()) {
        const { img, isOnline, username, email, bio, creationTime, lastSeen } = user.data()

        return {
            id: user.id,
            img,
            isOnline,
            username,
            email,
            bio,
            creationTime: creationTime ? ConvertTime(creationTime.toDate()) : "no date yet: userinfo",
            lastSeen: lastSeen ? ConvertTime(lastSeen.toDate()) : "no date yet: userinfo",
        }
    }else {
        toastErr("getUserData: user not found")
        return defaultUser
    }
}

// update user info
async function updateUserData({
    id,
    username,
    img,
    isOnline,
    isOffline,
                              }:{
    id?: string;
    username?: string,
    img?: string,
    isOnline?: boolean,
    isOffline?: boolean
}){
    if(!id){
        id = getStorageUser().id
    }

    if(id){
        await updateDoc(doc(db, usersColl, id), {
            ...(username && {username}),
            ...(isOnline && {isOnline}),
            ...(isOffline && {isOnline: false}),
            ...(img && {img}),
            lastSeen: serverTimestamp(),
        })
    }
}

function getStorageUser(){
    const usr = localStorage.getItem("deChat_user")
    if(usr) return JSON.parse(usr)

    return  null
}