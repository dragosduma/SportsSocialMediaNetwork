import MiniProfile from "./MiniProfile";
import Posts from "./Posts";
import Stories from "./Stories";
import Suggestions from "./Suggestions";
import { useState, useEffect } from "react";
import authService from "../services/auth-service";

export default function Feed() {

    const [currentUser, setCurrentUser] = useState(undefined);

    useEffect(() => {
        const user = authService.getCurrentUser();

        if (user) {
            setCurrentUser(user);
        }
    }, []);

    const logOut = () => {
        AuthService.logout();
    };

    return (
        <main className="grid grid-cols-1 md:grid-cols-3 md:max-w-6xl mx-auto">
            <section className="md:col-span-2">
                {/*stories*/}
                <Stories />

                {/*posts*/}
                <Posts />
            </section>

            <section className="hidden md:inline-grid md:col-span-1">
                <div className="fixed w-[380px]">
                    {/*mini profile*/}
                    <MiniProfile />

                    {/*suggestions*/}
                    <Suggestions />
                </div>
            </section>
        </main>
    );
}
