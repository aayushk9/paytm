import { InputBox } from "../components/InputBox"
import { Button } from "../components/Button"
import { useState } from "react"
import axios from 'axios'

export function Update() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    return (
        <div>
            <div>
                Update your username or password
            </div>
           <InputBox label={"Edit username"} placeholder={"joe"} onChange={(e) => {
             setUsername(e.target.value)
           } }/>
           <InputBox label={"Edit password"} placeholder={"****"} onChange={(e) => {
             setPassword(e.target.value)
           }}/>
           <Button buttonName={"Update"} onClick={ async() => {
             try {
               const res = await axios.post("http://localhost:3000/api/v/user/update", {
                   username,
                   password
               }, {
                headers: {
                    "Content-type": "application/json"
                }
               })

               console.log(res.data);

               if(res.data.success){
                   alert("data updates successfully")
               } else {
                alert("enter valid input")
               }
            } catch(err){
                console.log(err);
                alert("some internal error occured. please try later")
            } 
           }}/>
        </div>
    )
}