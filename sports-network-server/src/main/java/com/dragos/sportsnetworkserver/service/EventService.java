package com.dragos.sportsnetworkserver.service;

import com.dragos.sportsnetworkserver.model.Event;
import com.dragos.sportsnetworkserver.model.EventDb;
import com.dragos.sportsnetworkserver.repository.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EventService {
    @Autowired
    private EventRepository eventRepository;

    public EventService(EventRepository eventRepository) {
        this.eventRepository = eventRepository;
    }

    public EventDb saveEvent(Event event) {
        EventDb eventDb = EventDb.mapToDbEvent(event);
        return eventRepository.save(eventDb);
    }

    public Event findById(int id) {
        return eventRepository.findById(id).get().mapToRestEvent();
    }

    public EventDb updateEvent(Event event, int id) {
        EventDb eventDb = eventRepository.findById(id).get();
        return eventRepository.save(eventDb);
    }

    public void deleteEventById(int id) {
        eventRepository.deleteById(id);
    }
}
