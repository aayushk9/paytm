export function Button({onClick, buttonName}) {
    return (
        <div>
          <button onClick={onClick}>{buttonName}</button>
        </div>
    )
}