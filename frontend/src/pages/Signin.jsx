import { Headers } from '../components/Headers'
import { InputBox } from '../components/InputBox'
import { Button } from '../components/Button'
import { BottomWarning } from '../components/BottomWarning'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

export function Signin() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("");
    const navigate = useNavigate()

    return (
        <div>
            <Headers content={"payment methods"} />
            <InputBox label={"username"} placeholder={"joe"} onChange={(e) => {
                setUsername(e.target.value)
            }} />
            <InputBox label={"password"} placeholder={"*****"} onChange={(e) => {
                setPassword(e.target.value)
            }} />
            <Button buttonName={"Login"} onClick={async () => {
                try {
                    const res = await axios.post("http://localhost:3000/api/v/user/login", {
                        username,
                        password
                    }, {
                        headers: {
                            "Content-Type": "application/json"
                        }
                    })

                    if (res.data.token) {
                        localStorage.setItem("token", res.data.token);
                        navigate("/dashboard")
                    } else if (res.data.error === "Invalid input") {
                        alert("not valid inputs")
                    } else if(res.data.msg === "wrong password"){
                        alert("wrong password")  
                    } else {
                        alert("internal issue please try later")
                    }
                } catch (err) {  
                    console.error("Signup Error:", err);
                }
            }} />   
            <BottomWarning text={"Don't have an account?"} buttonText={"Signup"} to={"/"} />
        </div>
    )
}   