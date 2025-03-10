export function Button({buttonName, onClick}) {
    return (
        <div>
          <button onClick={onClick}>{buttonName}</button>
        </div>
    )
}