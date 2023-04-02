package com.dragos.sportsnetworkserver.service;

import com.dragos.sportsnetworkserver.model.*;
import com.dragos.sportsnetworkserver.repository.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.ZoneOffset;
import java.util.ArrayList;
import java.util.List;

@Service
public class EventService {
    @Autowired
    private EventRepository eventRepository;
    private UserService userService;

    public EventService(EventRepository eventRepository, UserService userService) {
        this.eventRepository = eventRepository;
        this.userService = userService;
    }

    public List<RestEvent> findAll() {
        List<RestEvent> allEvents = new ArrayList<>();
        Iterable<EventDb> events = eventRepository.findAll();
        for(EventDb eventDb : events){
            allEvents.add(mapToRestEvent(eventDb));
        }
        return allEvents;
    }

    public EventDb saveEvent(Event event) {
        String userEmail = userService.getUsernameFromUserDetails();
        int userId = userService.getUserIdFromEmail(userEmail);
        EventDb eventDb = mapToDbEvent(event, userId);
        return eventRepository.save(eventDb);
    }

    public RestEvent findById(int id) {
        EventDb eventDb = eventRepository.findById(id).get();
        return mapToRestEvent(eventDb);
    }

    public EventDb updateEvent(Event event, int id) {
        return null;
    }

    public void deleteEventById(int id) {

    }

    public void addParticipantToEvent(String eventId) {
        String username = userService.getUsernameFromUserDetails();
        UserDb userDb = userService.getUserFromUsername(username);

        EventDb eventDb = eventRepository.findById(Integer.parseInt(eventId)).orElse(null);
        if (eventDb != null) {
            List<UserDb> participants = eventDb.getParticipants();
            if (!participants.contains(userDb)) {
                participants.add(userDb);
                eventDb.setParticipants(participants);
                eventRepository.save(eventDb);
            }
        }
    }

    public List<User> getParticipantsForEvent(String eventId) {
        RestEvent restEvent = findById(Integer.parseInt(eventId));
        return restEvent.getParticipants();
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

    private RestEvent mapToRestEvent(EventDb eventDb) {
        List<UserDb> dbUsers = eventDb.getParticipants();
        List<User> users = new ArrayList<>();

        for(UserDb userDb : dbUsers) {
            User user = userService.mapToRestUser(userDb);
            users.add(user);
        }

        return RestEvent
                .builder()
                .id(eventDb.getId())
                .userEmail(userService.getUsernameFromId(eventDb.getCreator()))
                .eventDateTime(eventDb.getEventDateTime().atOffset(ZoneOffset.UTC))
                .eventDetails(eventDb.getEventDetails())
                .eventDuration(eventDb.getEventDuration())
                .eventName(eventDb.getEventName())
                .latitude(eventDb.getLocation() != null ? eventDb.getLocation().getLatitude() : null)
                .longitude(eventDb.getLocation() != null ? eventDb.getLocation().getLongitude() : null)
                .participants(users)
                .sportType(eventDb.getSportType().toString())
                .build();
    }
}
