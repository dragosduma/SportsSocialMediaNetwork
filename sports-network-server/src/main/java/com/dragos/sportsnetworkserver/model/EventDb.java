package com.dragos.sportsnetworkserver.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "event")
public class EventDb {
    @Id
    private int id;

    @Column(name="event_name")
    private String eventName;

    @Column(name="event_details")
    private String eventDetails;

    @Column(name = "event_datetime")
    private LocalDateTime eventDateTime;

    @Column(name = "event_duration")
    private int eventDuration;

    @Enumerated(EnumType.STRING)
    @Column(name = "sport_type")
    private SportType sportType;

    @Column(name="user_id")
    private int creator;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable (
            name="event_has_user",
            joinColumns = @JoinColumn(name = "event_id"),
            inverseJoinColumns = @JoinColumn(name = "user_id"))
    private List<UserDb> participants = new ArrayList<>();

    @Embedded
    @AttributeOverrides({
            @AttributeOverride(name = "latitude", column=@Column(name = "latitude")),
            @AttributeOverride(name = "longitude", column=@Column(name= "longitude"))
    })
    private Location location;
}