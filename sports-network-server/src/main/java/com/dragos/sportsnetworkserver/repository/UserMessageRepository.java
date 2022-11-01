package com.dragos.sportsnetworkserver.repository;

import com.dragos.sportsnetworkserver.model.UserMessageDb;
import org.springframework.data.repository.CrudRepository;

public interface UserMessageRepository extends CrudRepository<UserMessageDb, Integer> {
}
