import { useState, useEffect } from "react";
import axios from 'axios'
import { useNavigate } from "react-router-dom";

export function Signup() {
    const [username, setUsername] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    
       const handleSubmit = async(e) => {
           e.preventDefault(); 

          const loginBody = {
            username,
            firstName,
            lastName,
            password
          }
          try {
          const res = await axios.post("http://localhost:3000/api/v/user/signup", loginBody, {
            headers: {
                'Content-type': "application/json"
            }
          })

          console.log(res.data);

          if(res.data.token && res.data.BankBalance){
            // redirect to dashboard 
             navigate("/dashboard")
          } else {
            alert("some error occured")
          }
        } catch (err) {
            console.log(err)
        }
       }
    return (
        <div>
            <form onClick={handleSubmit}> 
                <input
                    placeholder="Enter username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />

                <input
                  placeholder="Enter firstname"
                  type = "text"
                  value={firstName}
                  onChange={(e) => {setFirstName(e.target.value)}}
                />

                <input 
                 placeholder="Enter lastname"
                 type = "text"
                 value= {lastName}
                 onChange={(e) => {setLastName(e.target.value)}}
                />

                <input 
                 placeholder="Enter password"
                 type = "password" 
                 value={password}
                 onChange={(e) => {setPassword(e.target.value)}}
                />

                <button type="submit">Signup</button>
            </form>
        </div>
    )
}