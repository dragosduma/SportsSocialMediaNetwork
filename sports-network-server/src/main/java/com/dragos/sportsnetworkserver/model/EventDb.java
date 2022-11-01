package com.dragos.sportsnetworkserver.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.time.OffsetDateTime;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "event")
public class EventDb {
    @Id
    private int id;

    private String sport;

    @Column(name="event_time")
    private OffsetDateTime eventTime;

    private String description;

    @Column(name = "event_duration")
    private OffsetDateTime eventDuration;

    public static EventDb mapToDbEvent(Event event) {
        EventDb e = new EventDb();
        e.id=event.getId();
        e.sport=e.getSport();
        e.description=event.getDescription();
        e.eventDuration= e.getEventDuration();
        e.eventTime=e.getEventTime();
        return e;
    }

    public Event mapToRestEvent(){
        return Event
                .builder()
                .id(this.id)
                .sport(this.sport)
                .description(this.description)
                .eventDuration(this.eventDuration)
                .eventTime(this.eventTime)
                .build();
    }

}
