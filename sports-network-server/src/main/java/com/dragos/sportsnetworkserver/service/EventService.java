package com.dragos.sportsnetworkserver.service;

import com.dragos.sportsnetworkserver.model.Event;
import com.dragos.sportsnetworkserver.model.EventDb;
import com.dragos.sportsnetworkserver.model.Location;
import com.dragos.sportsnetworkserver.model.SportType;
import com.dragos.sportsnetworkserver.repository.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EventService {
    @Autowired
    private EventRepository eventRepository;
    private UserService userService;

    public EventService(EventRepository eventRepository, UserService userService) {
        this.eventRepository = eventRepository;
        this.userService = userService;
    }

    public EventDb saveEvent(Event event) {
        String userEmail = userService.getUsernameFromUserDetails();
        int userId = userService.getUserIdFromEmail(userEmail);
        EventDb eventDb = mapToDbEvent(event, userId);
        return eventRepository.save(eventDb);
    }

    public Event findById(int id) {
        return null;
    }

    public EventDb updateEvent(Event event, int id) {
        return null;
    }

    public void deleteEventById(int id) {

    }

    private static EventDb mapToDbEvent(Event event, int userId) {
        EventDb e = new EventDb();
        e.setCreator(userId);
        e.setEventName(event.getName());
        e.setEventDetails(event.getDetails());
        e.setEventDateTime(event.getEventDateTime().toLocalDateTime());
        e.setEventDuration(event.getDuration());
        Location location = new Location(event.getLatitude(), event.getLongitude());
        e.setLocation(location);
        SportType sportType = SportType.fromString(event.getSportType());
        e.setSportType(sportType);
        return e;
    }
}
