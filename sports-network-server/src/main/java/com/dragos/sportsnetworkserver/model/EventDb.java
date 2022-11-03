package com.dragos.sportsnetworkserver.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.time.LocalDateTime;
import java.time.ZoneOffset;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "event")
public class EventDb {
    @Id
    private int id;

    private String sport;

    @Column(name = "event_time")
    private LocalDateTime eventTime;

    private String description;

    @Column(name = "event_duration")
    private LocalDateTime eventDuration;

    public static EventDb mapToDbEvent(Event event) {
        EventDb e = new EventDb();
        e.id = event.getId();
        e.sport = event.getSport();
        e.description = event.getDescription();
        e.eventDuration = event.getEventDuration().toLocalDateTime();
        e.eventTime = event.getEventTime().toLocalDateTime();
        return e;
    }

    public Event mapToRestEvent() {
        return Event
                .builder()
                .id(this.id)
                .sport(this.sport)
                .description(this.description)
                .eventDuration(this.getEventDuration().atOffset(ZoneOffset.UTC))
                .eventTime(this.getEventTime().atOffset(ZoneOffset.UTC))
                .build();
    }

}
