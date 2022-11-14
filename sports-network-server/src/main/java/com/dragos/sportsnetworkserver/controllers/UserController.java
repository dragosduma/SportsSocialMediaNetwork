package com.dragos.sportsnetworkserver.controllers;

import com.dragos.sportsnetworkserver.api.UserApi;
import com.dragos.sportsnetworkserver.model.User;
import com.dragos.sportsnetworkserver.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin
public class UserController implements UserApi {

    @Autowired
    private UserService userService;

    private UserController(UserService userService) {
        this.userService = userService;
    }

    @Override
    public ResponseEntity<Void> createUser(User user) {
        userService.saveUser(user);
        return ResponseEntity.ok().build();
    }

    @Override
    public ResponseEntity<Void> deleteUser(String userId) {
        userService.deleteUserById(Integer.parseInt((userId)));
        return ResponseEntity.ok().build();
    }

    @Override
    public ResponseEntity<User> getUser(String userId) {
        return ResponseEntity.ok(userService.findById(Integer.parseInt(userId)));
    }

    @Override
    public ResponseEntity<List<User>> getUsers() {
        return ResponseEntity.ok(userService.findAll());
    }

    @Override
    public ResponseEntity<Void> updateUser(String userId, User user) {
        return null;
    }
}
