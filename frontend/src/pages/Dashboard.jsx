import { Headers } from '../components/Headers'
import { Balance } from '../components/Balance'
import { ProfileIcon } from '../components/ProfileIcon'
import { User } from '../components/User'
import { useEffect, useState } from 'react'
import axios from 'axios'

export function Dashboard() {
   const [amount, setAmount] = useState("");

   const fetchBalance = async () => { 
      try {
         const res = await axios.get("http://localhost:3000/api/v/accounts/balance", {
            headers: {
               "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
         })
         console.log(res.data);
         if (res.data && res.data.balance !== undefined) {
            setAmount(res.data.balance)
         } else {
            console.error("Balance not found in response: " + res.data)
         }
      } catch (err) {
         alert("some error occured");    
      }
   }
   
   useEffect(() => {
    fetchBalance()
   }, [amount])

   return (
      <div>
         <Headers content={"Payments app"} />
         <ProfileIcon text={'Hello'} userProfile={"userprofile"} />
         <Balance text={"Your balance Rs"} amount={amount} />
         <User/>
      </div>
   )
}