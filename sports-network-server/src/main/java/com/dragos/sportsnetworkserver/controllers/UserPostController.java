package com.dragos.sportsnetworkserver.controllers;

import com.dragos.sportsnetworkserver.api.UserPostApi;
import com.dragos.sportsnetworkserver.model.UserPost;
import com.dragos.sportsnetworkserver.service.UserPostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class UserPostController implements UserPostApi {
    @Autowired
    private UserPostService userPostService;

    public UserPostController(UserPostService userPostService) {
        this.userPostService = userPostService;
    }

    @Override
    public ResponseEntity<Void> createUserPost(UserPost userPost) {
        return null;
    }

    @Override
    public ResponseEntity<Void> deleteUserPost(String userPostId) {
        return null;
    }

    @Override
    public ResponseEntity<UserPost> getUserPost(String userPostId) {
        return null;
    }

    @Override
    public ResponseEntity<List<UserPost>> getUserPosts() {
        return ResponseEntity.ok(userPostService.findAll());
    }

    @Override
    public ResponseEntity<Void> updateUserPost(String userPostId, UserPost userPost) {
        return null;
    }
}
