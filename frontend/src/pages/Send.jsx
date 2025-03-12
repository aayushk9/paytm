import { Headers } from '../components/Headers'
import { ProfileIcon } from '../components/ProfileIcon'
import { InputBox } from '../components/InputBox'
import { useSearchParams } from 'react-router-dom'
import axios from 'axios'
import { useState } from 'react'

export function Send() {
    const [searchParams] = useSearchParams()
    const [amount, setAmount] = useState(0);
    const id = searchParams.get('id');
    const name = searchParams.get("name")

    return  (
        <div>
             <Headers content={"Send money"} />
             <ProfileIcon userProfile={name[0].toUpperCase()} sendMoneyTo={name}/>
            <InputBox label={"Amount (in Rs)"} placeholder={"Enter amount"} onChange={(e) => {
                setAmount(e.target.value)
            }}/>
            <button onClick={ async() => {
                const res = await axios.post("http://localhost:3000/api/v/accounts/transfer", {
                    to: id,
                    amount: amount
                 }, {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token")
                    }
                 })

                 if(res.data.success){
                     alert("transaction successfull")
                 }
            }}>Initiate transfer</button>
        </div>
    )
}