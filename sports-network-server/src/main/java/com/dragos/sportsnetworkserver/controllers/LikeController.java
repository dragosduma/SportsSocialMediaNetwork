package com.dragos.sportsnetworkserver.controllers;

import com.dragos.sportsnetworkserver.api.LikeApi;
import com.dragos.sportsnetworkserver.model.Like;
import com.dragos.sportsnetworkserver.model.RestLike;
import com.dragos.sportsnetworkserver.service.LikeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin
public class LikeController implements LikeApi {
    @Autowired
    private LikeService likeService;

    public LikeController(LikeService likeService) {
        this.likeService = likeService;
    }

    @Override
    public ResponseEntity<Void> createLike(Like like) {
        likeService.saveLike(like);
        return ResponseEntity.ok().build();
    }

    @Override
    public ResponseEntity<Void> deleteLike(String likeId) {
        likeService.deleteLikeById(Integer.parseInt(likeId));
        return ResponseEntity.ok().build();
    }

    @Override
    public ResponseEntity<Like> getLike(String likeId) {
        return null;
    }

    @Override
    public ResponseEntity<List<RestLike>> getLikes(Integer postId) {
        List<RestLike> likes = likeService.getLikesByPostId(postId);
        return ResponseEntity.ok(likes);
    }

    @Override
    public ResponseEntity<Void> updateLike(String likeId, Like like) {
        return null;
    }
}
