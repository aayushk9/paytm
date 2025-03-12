import axios from "axios"
import { useState, useEffect } from  'react'
import { useNavigate } from "react-router-dom"
import { Button } from "./Button";

export function User () {
    const [users, setUsers] = useState([]);   
    const [search, setSearch] = useState("")


        useEffect(() => {
            const fetchUsers = async() => {
                try {
                    const res = await axios.get(`http://localhost:3000/api/v/user/bulk?search=${encodeURIComponent(search)}`, {
                      headers: {
                           "Authorization": `Bearer ${localStorage.getItem("token")}`
                      }  
                    })
                    if(res.data.users){   
                      setUsers(res.data.users)
                
                    } else if (res.data.msg === "no user found"){         
                        setUsers([])    
                      alert("no user found")
                    }
                   } catch (err){
                      console.error(err);
                      alert("no user found");
                   }
                }  
                fetchUsers()
        }, [search])  
    
    return (
        <>
         <div>
             Users 
         </div> 

         <div>
            <input type="text" placeholder="search users" onChange={(e) => {
                setSearch(e.target.value)
            }}/>
         </div>
         <div>
           {users.map(user => (<UserComponent user={user}/>))}
           {console.log(users)};
         </div>    
        </>
    )
}

function UserComponent ({user}) {
  const navigate = useNavigate();
    return (
       <div>
          <div>
            <div>
                {user.username}
            </div>
            <div>
               <Button onClick={(e) => {
                  navigate("/send?id=" + user.id + "&name=" + user.username);
               }} buttonName={"Send money"}/>
            </div>
          </div>
       </div>
    )
}