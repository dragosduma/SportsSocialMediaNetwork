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

        fetchEvents();
    }, []);

    const [events, setEvents] = useState([]);
    const [filteredEvents, setFilteredEvents] = useState([]);

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

    function handleSearch(searchTerm) {
        const filtered = events.filter((event) => {
            return (
                event.eventName.toLowerCase().includes(searchTerm.toLowerCase())
            );
        });

        setFilteredEvents(filtered);
    }

    function clearSearch() {
        setFilteredEvents([]);
    }

    return (
        <Layout>
            <EventFormCard user={currentUser} events={events} onSearch={handleSearch} />
            {filteredEvents.length > 0 ? (
                filteredEvents.map((event) => (
                    <EventCard
                        key={event.id}
                        eventId={event.id}
                        eventName={event.eventName}
                        eventDetails={event.eventDetails}
                        eventDuration={event.eventDuration}
                        eventDateTime={event.eventDateTime}
                        latitude={event.latitude}
                        longitude={event.longitude}
                        participants={event.participants}
                        sportType={event.sportType}
                        username={event.userEmail}
                        user={currentUser}
                    />
                ))
            ) : (
                <>
                    {events.length > 0 ? (
                        events.map((event) => (
                            <EventCard
                                key={event.id}
                                eventId={event.id}
                                eventName={event.eventName}
                                eventDetails={event.eventDetails}
                                eventDuration={event.eventDuration}
                                eventDateTime={event.eventDateTime}
                                latitude={event.latitude}
                                longitude={event.longitude}
                                participants={event.participants}
                                sportType={event.sportType}
                                username={event.userEmail}
                                user={currentUser}
                            />
                        ))
                    ) : (
                        <div>No events found</div>
                    )}
                </>
            )}
            {filteredEvents.length > 0 && (
                <div className="mt-4">
                    <button onClick={clearSearch} className="bg-gray-200 rounded-md px-4 py-2">
                        Clear Search
                    </button>
                </div>
            )}

            <EventModal onPost={fetchEvents}></EventModal>
        </Layout>
    )
}
