import {toastErr, toastInfo} from "./toast";

export default function CatchErr(err: {code?: string}){
    switch (err.code) {
        case "auth/invalid-email":
            toastErr("invalid email")
            break
        case "auth/weak-password":
            toastErr("password should be at least 6 characters")
            break
        case "auth/user-not-found":
            toastErr("user not found")
            break
        case "auth/email-already-in-use":
            toastErr("email already exists")
            break
        case "auth/wrong-password":
            toastErr("wrong password")
            break
        case "auth/requires-recent-login":
            toastInfo("logout and login before updating your profile")
            break
        case "auth/invalid-credential":
            toastErr("Invalid user credentials")
            break
        case "permission-denied":
            toastErr("missing or insufficient permissions")
            break
        default:
            toastErr("An error occurred!")
            console.log(err, err.code)
    }
}