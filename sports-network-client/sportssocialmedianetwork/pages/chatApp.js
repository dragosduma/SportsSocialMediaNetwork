import Sidebar from "../chat/components/Sidebar"
import Chat from "../chat/components/Chat"
import { AuthContextProvider } from "../context/AuthContext";
import { ChatContextProvider } from '../context/ChatContext';

export default function ChatApp() {

    return (
        <AuthContextProvider>
            <ChatContextProvider>
                <div className="home">
                    <div className="container">
                        <Sidebar />
                        <Chat />
                    </div>
                </div>
            </ChatContextProvider>
        </AuthContextProvider>
    )
}