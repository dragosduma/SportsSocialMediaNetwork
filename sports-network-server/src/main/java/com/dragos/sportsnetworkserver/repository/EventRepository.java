package com.dragos.sportsnetworkserver.repository;

import com.dragos.sportsnetworkserver.model.EventDb;
import org.springframework.data.repository.CrudRepository;

public interface EventRepository extends CrudRepository<EventDb, Integer> {
}
