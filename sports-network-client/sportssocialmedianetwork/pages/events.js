import Layout from "../components/Layout";
import EventFormCard from "../components/EventFormCard";
import { useState, useEffect } from "react";
import authService from "../services/auth-service";
import EventCard from "../components/EventCard";
import EventModal from "../components/EventModal";
import eventService from "../services/event-service";

export default function EventsPage() {

    const [currentUser, setCurrentUser] = useState(undefined);


    useEffect(() => {
        const user = authService.getCurrentUser();

        if (user) {
            setCurrentUser(user);
        }
        else {
            authService.logout();
        }
    }, []);

    const [events, setEvents] = useState([]);

    const orderDescending = [...events].sort((a, b) => b.id - a.id);

    function fetchEvents() {
        eventService.getAllEvents().then(
            (response) => {
                setEvents(response.data);
            },
            (error) => {
                console.log(error)
            }
        );
    }


    return (
        <Layout>
            <EventFormCard user={currentUser} />
            {events?.length > 0 &&
                orderDescending.map((events) => (
                    <EventCard
                        key={posts.id}
                        id={posts.id}
                        user={currentUser}
                    />
                ))}
            <EventCard />
            <EventModal onPost={fetchEvents}></EventModal>
        </Layout>
    )
}
