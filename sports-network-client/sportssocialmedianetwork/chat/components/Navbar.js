import { AuthContext } from "../../context/AuthContext"
import { useContext } from "react"

export default function Navbar() {
    const { currentUser } = useContext(AuthContext)
    return (
        <div className='navbar'>
            <span className="logo">Chat App</span>
            <div className="user">
                <img src="https://images.pexels.com/photos/863988/pexels-photo-863988.jpeg" alt="" />
                {currentUser && <span>{currentUser.displayName}</span>}
            </div>
        </div>
    )
}

