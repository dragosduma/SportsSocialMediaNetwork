package com.dragos.sportsnetworkserver.repository;

import com.dragos.sportsnetworkserver.model.UserDb;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface UserRepository extends CrudRepository<UserDb, Integer> {

    Optional<UserDb> findByEmail(String email);
}
