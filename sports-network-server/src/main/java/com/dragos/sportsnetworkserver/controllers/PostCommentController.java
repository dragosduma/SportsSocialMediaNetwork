package com.dragos.sportsnetworkserver.controllers;

import com.dragos.sportsnetworkserver.api.PostCommentApi;
import com.dragos.sportsnetworkserver.model.PostComment;
import com.dragos.sportsnetworkserver.service.PostCommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin
public class PostCommentController implements PostCommentApi {
    @Autowired
    private PostCommentService postCommentService;

    public PostCommentController(PostCommentService postCommentService) {
        this.postCommentService = postCommentService;
    }

    @Override
    public ResponseEntity<Void> createPostComment(PostComment postComment) {
        postCommentService.savePostComment(postComment);
        return  ResponseEntity.ok().build();
    }

    @Override
    public ResponseEntity<PostComment> getPostComment(String postCommentId) {
        return null;
    }

    @Override
    public ResponseEntity<List<PostComment>> getPostComments() {
        return null;
    }

    @Override
    public ResponseEntity<Void> updatePostComment(String postCommentId, PostComment postComment) {
        return null;
    }
}
