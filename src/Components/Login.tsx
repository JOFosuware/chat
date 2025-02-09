import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import Input from "./Input";
import Button from "./Button";
import {BE_signIn, BE_signUp} from "../Backend/Quaries";
import {useDispatch} from "react-redux";
import {AppDispatch} from "../Redux/store";
import {authDataType} from "../Types";

export default function Login() {
    const [login, setLogin] = useState(true)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [signUpLoading, setSignUpLoading] = useState(false)
    const [signInLoading, setSignInLoading] = useState(false)
    const goTo = useNavigate()
    const dispatch = useDispatch<AppDispatch>()

    const handleSignIn = () => {
        const data = {
            email,
            password
        }

        auth(data, BE_signIn, setSignInLoading)
    }

    const handleSignup = () => {
        const data = {
            email,
            password,
            confirmPassword
        }

        auth(data, BE_signUp, setSignUpLoading)
    }

    const auth = (
        data: authDataType,
        func: any,
        setLoading: React.Dispatch<React.SetStateAction<boolean>>
    ) => {
        func(data, setLoading, reset, goTo, dispatch)
    }

    const reset = () => {
        setEmail("")
        setPassword("")
        setConfirmPassword("")
    }

  return (
      <div className="w-full md:w-[450px]">
          <h1 className="text-white text-center font-bold text-4xl md:text-6xl mb-10">
              {login ? "Login" : "Register"}
          </h1>
          <div className="flex flex-col gap-3 bg-white w-full p-6 min-h-[150px] rounded-xl drop-shadow-xl">
              <Input name="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
              <Input name="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
              {!login && <Input name="confirm-password" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>}
              {login ? (<>
                  <Button text="Login" onClick={handleSignIn} loading={signInLoading}/>
                  <Button onClick={() => setLogin(false)} text="Register" secondary/>
              </>): (<>
                  <Button text="Register" onClick={handleSignup} loading={signUpLoading} secondary/>
                  <Button onClick={() => setLogin(true)} text="Login"/>
              </>)}
          </div>
      </div>
  );
}