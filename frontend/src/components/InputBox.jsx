export function InputBox({label, placeholder, onChange}) {
   return (
    <div>
       {label}
       <div>
         <input onChange={onChange} type="text" placeholder={placeholder}/>
       </div>
    </div>
   )
}