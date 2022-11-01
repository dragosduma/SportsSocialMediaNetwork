package com.dragos.sportsnetworkserver.repository;

import com.dragos.sportsnetworkserver.model.UserPostDb;
import org.springframework.data.repository.CrudRepository;

public interface UserPostRepository extends CrudRepository<UserPostDb, Integer> {
}
