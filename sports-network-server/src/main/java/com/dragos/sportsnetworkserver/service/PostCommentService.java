package com.dragos.sportsnetworkserver.service;

import com.dragos.sportsnetworkserver.model.PostComment;
import com.dragos.sportsnetworkserver.model.PostCommentDb;
import com.dragos.sportsnetworkserver.model.RestPostComment;
import com.dragos.sportsnetworkserver.repository.PostCommentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
public class PostCommentService {
    @Autowired
    private PostCommentRepository postCommentRepository;
    private UserService userService;

    public PostCommentService (PostCommentRepository postCommentRepository, UserService userService) {
        this.postCommentRepository = postCommentRepository;
        this.userService = userService;
    }

    public Set<RestPostComment> getCommentsByPostId(int postId) {
        Set<RestPostComment> comments = new HashSet<>();
        Iterable<PostCommentDb> postComments = postCommentRepository.findByPostId(postId);
        for(PostCommentDb postCommentDb : postComments) {
            comments.add(mapToRestPostComment(postCommentDb));
        }
        return comments;
    }

    public List<RestPostComment> findAll() {
        List<RestPostComment> allPostComments = new ArrayList<>();
        Iterable<PostCommentDb> postComments = postCommentRepository.findAll();
        for(PostCommentDb postCommentDb : postComments) {
            allPostComments.add(mapToRestPostComment(postCommentDb));
        }
        return allPostComments;
    }


    public PostCommentDb savePostComment(PostComment postComment) {
        String userEmail = userService.getUsernameFromUserDetails();
        int userId = userService.getUserIdFromEmail(userEmail);
        PostCommentDb postCommentDb = mapToDbPostComment(postComment, userId);
        return postCommentRepository.save(postCommentDb);
    }

    public static PostCommentDb mapToDbPostComment(PostComment postComment, int userId) {
        PostCommentDb p = new PostCommentDb();
        p.setPostId(postComment.getPostId());
        p.setText(postComment.getText());
        p.setPostedBy(userId);
        p.setCreatedAt(LocalDateTime.now());
        return p;
    }


    public RestPostComment mapToRestPostComment(PostCommentDb postCommentDb) {
        return RestPostComment
                .builder()
                .id(postCommentDb.getId())
                .postId(postCommentDb.getPostId())
                .userEmail(userService.getUsernameFromUserDetails())
                .text(postCommentDb.getText())
                .createdAt(postCommentDb.getCreatedAt().atOffset(ZoneOffset.UTC))
                .build();

    }
}
