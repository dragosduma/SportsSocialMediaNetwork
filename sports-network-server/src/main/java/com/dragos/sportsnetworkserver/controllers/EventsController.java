package com.dragos.sportsnetworkserver.controllers;
import com.dragos.sportsnetworkserver.api.EventApi;
import com.dragos.sportsnetworkserver.model.Event;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class EventsController implements EventApi {

    @Override
    public ResponseEntity<Void> createEvent(Event event) {
        return null;
    }

    @Override
    public ResponseEntity<Void> deleteEvent(String eventId) {
        return null;
    }

    @Override
    public ResponseEntity<Event> getEvent(String eventId) {
        return null;
    }

    @Override
    public ResponseEntity<List<Event>> getEvents() {
        return null;
    }

    @Override
    public ResponseEntity<Void> updateEvent(String eventId, Event event) {
        return null;
    }
}
