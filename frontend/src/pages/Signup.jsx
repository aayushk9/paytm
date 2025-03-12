import { useState} from "react";
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import { Headers } from '../components/Headers'
import { InputBox } from '../components/InputBox'
import { Button } from '../components/Button'
import { BottomWarning } from '../components/BottomWarning'

export function Signup() {
    const [username, setUsername] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center justify-center">
          <Headers content={"Payments app"}/>
          <InputBox onChange={(e) => {
            setUsername(e.target.value)
          }}  label={"username"} placeholder="ayushdev"/> 
          <InputBox onChange={(e) => {
            setFirstName(e.target.value)
          }} label={"firstname"} placeholder="Aayush"/>
          <InputBox onChange={(e) => {
            setLastName(e.target.value)
          }} label={"lastname"} placeholder="Kokate" />
          <InputBox onChange={(e) => {
            setPassword(e.target.value)
          }} label={"password"} placeholder="******"/>
          <Button buttonName={"Submit"} onClick={async () => {
            try {
             const res = await axios.post("http://localhost:3000/api/v/user/signup", {
              username,
              firstName,
              lastName,
              password
             }, {
              headers: {
                "Content-Type": "application/json"
              }
             }  
            )
            console.log(res.data);   
              if(res.data.token){
                localStorage.setItem("token", res.data.token)
                navigate("/dashboard")
              } else if(res.data.msg == "please go to login route"){
                alert("user exists")
              } else if(res.data.msg == "username already exists please choose other username") {
                alert("username already taken")
              } else {
                alert("password must contain atleast 8 character")
              }
            } catch(err) {
              console.log(err)     
              alert("error signing up")   
            }            
          }}
          />
         <BottomWarning text={"Already have an account"} buttonText={"login"} to={'/login'}/> 
        </div>
    )
}