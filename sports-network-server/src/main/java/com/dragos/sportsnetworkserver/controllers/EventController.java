package com.dragos.sportsnetworkserver.controllers;

import com.dragos.sportsnetworkserver.api.EventApi;
import com.dragos.sportsnetworkserver.model.Event;
import com.dragos.sportsnetworkserver.model.RestEvent;
import com.dragos.sportsnetworkserver.service.EventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin
public class EventController implements EventApi {

    @Autowired
    private EventService eventService;

    private EventController(EventService eventService){
        this.eventService = eventService;
    }

    @Override
    public ResponseEntity<Void> createEvent(Event event) {
        eventService.saveEvent(event);
        return ResponseEntity.ok().build();
    }

    @Override
    public ResponseEntity<Void> deleteEvent(String eventId) {
        eventService.deleteEventById(Integer.parseInt(eventId));
        return ResponseEntity.ok().build();
    }

    @Override
    public ResponseEntity<RestEvent> getEvent(String eventId) {
        return null;
    }

    @Override
    public ResponseEntity<List<RestEvent>> getEvents() {
        return ResponseEntity.ok(eventService.findAll());
    }

    @Override
    public ResponseEntity<Void> updateEvent(String eventId, Event event) {
        return null;
    }
}
