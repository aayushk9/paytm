import { Link } from "react-router-dom"

export function BottomWarning({text, buttonText, to}) {
    return (
    <div>
     <div className="text-sm">
       {text}
     </div>
     <Link className="text-sm hover:text-blue-300" to={to}>
       {buttonText}
     </Link>
    </div>
   )
}