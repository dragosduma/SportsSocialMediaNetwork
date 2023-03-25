package com.dragos.sportsnetworkserver.service;

import com.dragos.sportsnetworkserver.model.RestUserPost;
import com.dragos.sportsnetworkserver.model.UserPost;
import com.dragos.sportsnetworkserver.model.UserPostDb;
import com.dragos.sportsnetworkserver.repository.UserPostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.util.ArrayList;
import java.util.List;

@Service
public class UserPostService {
    @Autowired
    private UserPostRepository userPostRepository;
    private UserService userService;

    public UserPostService (UserPostRepository userPostRepository, UserService userService) {
        this.userPostRepository = userPostRepository;
        this.userService = userService;
    }

    public List<RestUserPost> findAll() {
        List<RestUserPost> allUserPosts = new ArrayList<>();
        Iterable<UserPostDb> userPosts = userPostRepository.findAll();
        for(UserPostDb userPostDb : userPosts) {
            allUserPosts.add(mapToRestUserPost(userPostDb));
        }
        return allUserPosts;
    }

    public UserPostDb saveUserPost(MultipartFile fileName, String caption) throws IOException {
        String userEmail = userService.getUsernameFromUserDetails();
        int userId = userService.getUserIdFromEmail(userEmail);
        UserPostDb userPostDb = mapToDbUserPost(fileName, caption, userId);
        return userPostRepository.save(userPostDb);
    }

    public UserPostDb findById(int id) {
        return userPostRepository.findById(id).get();
    }

    public void deleteUserPostById(int id) {
        userPostRepository.deleteById(id);
    }

    public UserPostDb updateUserPost(int id, UserPost userPost) {
        if(userPostRepository.findById(id).isPresent()) {
            UserPostDb existingPost = userPostRepository.findById(id).get();
            existingPost.setCaption(userPost.getCaption());
            existingPost.setUpdatedAt(LocalDateTime.now());
            return userPostRepository.save(existingPost);
        } else {
            return null;
        }
    }

    public int getUserIdFromPostId(int postId) {
        UserPostDb userPostDb = findById(postId);
        int userId = userPostDb.getUserId();
        return userId;
    }

    private static UserPostDb mapToDbUserPost(MultipartFile file, String caption, int id) throws IOException {
        UserPostDb u = new UserPostDb();
        u.setCaption(caption);
        u.setImage(file.getBytes());
        u.setCreatedAt(LocalDateTime.now());
        u.setUpdatedAt(LocalDateTime.now());
        u.setUserId(id);
        return u;
    }

    private RestUserPost mapToRestUserPost(UserPostDb userPostDb) {
        return RestUserPost
                .builder()
                .caption(userPostDb.getCaption())
                .image(userPostDb.getImage())
                .id(userPostDb.getId())
                .createdAt(userPostDb.getCreatedAt().atOffset(ZoneOffset.UTC))
                .updatedAt(userPostDb.getUpdatedAt().atOffset(ZoneOffset.UTC))
                .userEmail(userService.getUsernameFromId(userPostDb.getUserId()))
                .build();
    }

}
