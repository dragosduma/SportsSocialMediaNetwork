package com.dragos.sportsnetworkserver.controllers;

import com.dragos.sportsnetworkserver.api.UserPostApi;
import com.dragos.sportsnetworkserver.model.RestUserPost;
import com.dragos.sportsnetworkserver.model.UserPost;
import com.dragos.sportsnetworkserver.service.UserPostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@CrossOrigin
public class UserPostController implements UserPostApi {
    @Autowired
    private UserPostService userPostService;

    public UserPostController(UserPostService userPostService) {
        this.userPostService = userPostService;
    }

    @Override
    public ResponseEntity<Void> createUserPost(MultipartFile image, String caption) throws IOException {
        userPostService.saveUserPost(image, caption);
        return ResponseEntity.ok().build();
    }


    @Override
    public ResponseEntity<Void> deleteUserPost(String userpostId) {
        userPostService.deleteUserPostById(Integer.parseInt((userpostId)));
        return ResponseEntity.ok().build();
    }

    @Override
    public ResponseEntity<RestUserPost> getUserPost(String userpostId) {
        return null;
    }

    @Override
    public ResponseEntity<List<RestUserPost>> getUserPosts() {
        return ResponseEntity.ok(userPostService.findAll());
    }

    @Override
    public ResponseEntity<Void> updateUserPost(String userpostId, UserPost userPost) {
        userPostService.updateUserPost(Integer.parseInt(userpostId), userPost);
        return ResponseEntity.ok().build();
    }
}
