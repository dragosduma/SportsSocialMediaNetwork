package com.dragos.sportsnetworkserver.service;

import com.dragos.sportsnetworkserver.model.PostComment;
import com.dragos.sportsnetworkserver.model.PostCommentDb;
import com.dragos.sportsnetworkserver.repository.PostCommentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PostCommentService {
    @Autowired
    private PostCommentRepository postCommentRepository;
    private UserService userService;

    public PostCommentService (PostCommentRepository postCommentRepository, UserService userService) {
        this.postCommentRepository = postCommentRepository;
        this.userService = userService;
    }

    public PostCommentDb savePostComment(PostComment postComment) {
        String userEmail = userService.getUsernameFromUserDetails();
        int userId = userService.getUserIdFromEmail(userEmail);
        PostCommentDb postCommentDb = PostCommentDb.mapToDbPostComment(postComment, userId);
        return postCommentRepository.save(postCommentDb);
    }
}
